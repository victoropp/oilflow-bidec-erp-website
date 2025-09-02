import { NextRequest } from 'next/server';

// Simple in-memory rate limiting (for production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Max requests per window
  keyGenerator?: (request: NextRequest) => string; // Custom key generator
}

export class RateLimit {
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  async check(request: NextRequest): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
    const key = this.config.keyGenerator ? this.config.keyGenerator(request) : this.getDefaultKey(request);
    const now = Date.now();
    
    // Clean up expired entries
    this.cleanup();
    
    const entry = rateLimitStore.get(key);
    
    if (!entry) {
      // First request from this key
      rateLimitStore.set(key, {
        count: 1,
        resetTime: now + this.config.windowMs,
      });
      
      return {
        allowed: true,
        remaining: this.config.maxRequests - 1,
        resetTime: now + this.config.windowMs,
      };
    }
    
    if (now > entry.resetTime) {
      // Window has expired, reset
      rateLimitStore.set(key, {
        count: 1,
        resetTime: now + this.config.windowMs,
      });
      
      return {
        allowed: true,
        remaining: this.config.maxRequests - 1,
        resetTime: now + this.config.windowMs,
      };
    }
    
    // Within the window
    if (entry.count >= this.config.maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: entry.resetTime,
      };
    }
    
    entry.count++;
    
    return {
      allowed: true,
      remaining: this.config.maxRequests - entry.count,
      resetTime: entry.resetTime,
    };
  }

  private getDefaultKey(request: NextRequest): string {
    // Use IP address as the default key
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
    return `rate_limit:${ip}`;
  }

  private cleanup() {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
      if (now > entry.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }
}

// Pre-configured rate limiters
export const demoApiRateLimit = new RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5, // 5 demo requests per 15 minutes per IP
});

export const generalApiRateLimit = new RateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 60, // 60 requests per minute per IP
});

// Security validation
export class SecurityValidator {
  static validateDemoRequest(data: any): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Email validation
    if (!data.email || typeof data.email !== 'string') {
      errors.push('Invalid email');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push('Invalid email format');
    } else if (data.email.length > 254) {
      errors.push('Email too long');
    }
    
    // Phone validation
    if (!data.phone || typeof data.phone !== 'string') {
      errors.push('Invalid phone number');
    } else if (data.phone.length > 20) {
      errors.push('Phone number too long');
    }
    
    // String length validation
    const stringFields = {
      firstName: 50,
      lastName: 50,
      company: 100,
      jobTitle: 100,
      currentSoftware: 100,
      challenges: 2000,
      additionalNotes: 1000,
    };
    
    for (const [field, maxLength] of Object.entries(stringFields)) {
      if (data[field] && typeof data[field] === 'string' && data[field].length > maxLength) {
        errors.push(`${field} is too long (max ${maxLength} characters)`);
      }
    }
    
    // Content validation (basic spam/malicious content detection)
    const suspiciousPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, // Script tags
      /javascript:/gi,
      /data:text\/html/gi,
      /vbscript:/gi,
      /<iframe/gi,
      /on\w+\s*=/gi, // Event handlers like onclick=
    ];
    
    const textFields = [data.firstName, data.lastName, data.company, data.jobTitle, data.challenges, data.additionalNotes];
    for (const field of textFields) {
      if (field && typeof field === 'string') {
        for (const pattern of suspiciousPatterns) {
          if (pattern.test(field)) {
            errors.push('Invalid content detected');
            break;
          }
        }
      }
    }
    
    // Enum validation
    const validCompanySizes = ['1-50', '51-200', '201-1000', '1000+'];
    if (data.companySize && !validCompanySizes.includes(data.companySize)) {
      errors.push('Invalid company size');
    }
    
    const validIndustries = [
      'petroleum-trading',
      'depot-operations', 
      'vessel-management',
      'banking-integration',
      'financial-services',
      'other'
    ];
    if (data.industry && !validIndustries.includes(data.industry)) {
      errors.push('Invalid industry');
    }
    
    const validTimes = ['morning', 'afternoon', 'flexible'];
    if (data.preferredTime && !validTimes.includes(data.preferredTime)) {
      errors.push('Invalid preferred time');
    }
    
    // Date validation
    if (data.preferredDate) {
      const date = new Date(data.preferredDate);
      const now = new Date();
      const maxFutureDate = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000); // 1 year from now
      
      if (isNaN(date.getTime())) {
        errors.push('Invalid preferred date');
      } else if (date < now) {
        errors.push('Preferred date must be in the future');
      } else if (date > maxFutureDate) {
        errors.push('Preferred date too far in the future');
      }
    }
    
    return {
      valid: errors.length === 0,
      errors,
    };
  }

  static getClientInfo(request: NextRequest) {
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ip = forwarded ? forwarded.split(',')[0] : realIp || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const referer = request.headers.get('referer');
    
    return {
      ip: ip.trim(),
      userAgent,
      referer,
    };
  }

  static isValidAPIKey(apiKey?: string): boolean {
    if (!process.env.DEMO_API_SECRET) return true; // No API key required in dev
    return apiKey === process.env.DEMO_API_SECRET;
  }
}

export default RateLimit;