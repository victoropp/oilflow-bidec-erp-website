// Advanced Rate Limiting Implementation
// Provides DDoS protection and API abuse prevention

interface RateLimitRule {
  windowMs: number;  // Time window in milliseconds
  max: number;       // Maximum requests per window
  skipFailedRequests?: boolean;
  skipSuccessfulRequests?: boolean;
  keyGenerator?: (clientId: string, path: string) => string;
}

interface RateLimitResult {
  allowed: boolean;
  limit?: number;
  remaining?: number;
  resetTime?: number;
  retryAfter?: string;
}

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

class RateLimitService {
  private store: RateLimitStore = {};
  protected rules: Map<string, RateLimitRule> = new Map();
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.initializeRules();
    this.startCleanup();
  }

  private initializeRules(): void {
    // API endpoints - more restrictive
    this.rules.set('/api/demo', {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 3 // 3 demo requests per 15 minutes per IP
    });

    this.rules.set('/api/contact', {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 5 // 5 contact requests per 15 minutes per IP
    });

    this.rules.set('/api/chatbot', {
      windowMs: 60 * 1000, // 1 minute
      max: 20 // 20 messages per minute per IP
    });

    // General API protection
    this.rules.set('/api/*', {
      windowMs: 60 * 1000, // 1 minute
      max: 60 // 60 requests per minute per IP
    });

    // Page requests
    this.rules.set('/*', {
      windowMs: 60 * 1000, // 1 minute
      max: 100 // 100 page requests per minute per IP
    });

    // Aggressive protection for suspicious patterns
    this.rules.set('/admin', {
      windowMs: 60 * 60 * 1000, // 1 hour
      max: 1 // Only 1 attempt per hour
    });

    this.rules.set('/.env', {
      windowMs: 24 * 60 * 60 * 1000, // 24 hours
      max: 0 // Block completely
    });
  }

  private findMatchingRule(path: string): RateLimitRule | null {
    // First check for exact matches
    if (this.rules.has(path)) {
      return this.rules.get(path)!;
    }

    // Then check for wildcard matches
    for (const [pattern, rule] of this.rules.entries()) {
      if (pattern.endsWith('*')) {
        const prefix = pattern.slice(0, -1);
        if (path.startsWith(prefix)) {
          return rule;
        }
      }
    }

    return null;
  }

  private generateKey(clientId: string, path: string, rule?: RateLimitRule): string {
    if (rule?.keyGenerator) {
      return rule.keyGenerator(clientId, path);
    }
    return `${clientId}:${path}`;
  }

  private startCleanup(): void {
    // Clean up expired entries every 5 minutes
    this.cleanupInterval = setInterval(() => {
      const now = Date.now();
      const keysToDelete: string[] = [];

      for (const [key, data] of Object.entries(this.store)) {
        if (data.resetTime <= now) {
          keysToDelete.push(key);
        }
      }

      keysToDelete.forEach(key => delete this.store[key]);
      
      if (keysToDelete.length > 0) {
        console.log(`Cleaned up ${keysToDelete.length} expired rate limit entries`);
      }
    }, 5 * 60 * 1000);
  }

  public async check(clientId: string, path: string): Promise<RateLimitResult> {
    const rule = this.findMatchingRule(path);
    
    if (!rule) {
      return { allowed: true };
    }

    // Special case: blocked paths
    if (rule.max === 0) {
      return {
        allowed: false,
        limit: 0,
        remaining: 0,
        resetTime: Date.now() + rule.windowMs
      };
    }

    const key = this.generateKey(clientId, path, rule);
    const now = Date.now();
    const windowStart = now - rule.windowMs;

    // Get or initialize store entry
    let entry = this.store[key];
    if (!entry || entry.resetTime <= now) {
      entry = {
        count: 0,
        resetTime: now + rule.windowMs
      };
      this.store[key] = entry;
    }

    // Increment counter
    entry.count++;

    const remaining = Math.max(0, rule.max - entry.count);
    const allowed = entry.count <= rule.max;

    const result: RateLimitResult = {
      allowed,
      limit: rule.max,
      remaining,
      resetTime: entry.resetTime
    };

    if (!allowed) {
      const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
      result.retryAfter = retryAfter.toString();
      
      // Log rate limit violation
      console.warn('Rate limit exceeded:', {
        clientId,
        path,
        count: entry.count,
        limit: rule.max,
        resetTime: new Date(entry.resetTime).toISOString()
      });
    }

    return result;
  }

  public addRule(path: string, rule: RateLimitRule): void {
    this.rules.set(path, rule);
  }

  public removeRule(path: string): boolean {
    return this.rules.delete(path);
  }

  public getStats(): { totalKeys: number; rules: number } {
    return {
      totalKeys: Object.keys(this.store).length,
      rules: this.rules.size
    };
  }

  public reset(clientId?: string, path?: string): void {
    if (clientId && path) {
      const key = this.generateKey(clientId, path);
      delete this.store[key];
    } else if (clientId) {
      // Reset all entries for a specific client
      Object.keys(this.store).forEach(key => {
        if (key.startsWith(clientId + ':')) {
          delete this.store[key];
        }
      });
    } else {
      // Reset all
      this.store = {};
    }
  }

  public destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
    this.store = {};
  }
}

// Adaptive rate limiting based on threat level
class AdaptiveRateLimiter extends RateLimitService {
  private threatLevels: Map<string, number> = new Map();
  private baseLimits: Map<string, RateLimitRule> = new Map();

  constructor() {
    super();
    this.initializeAdaptiveRules();
  }

  private initializeAdaptiveRules(): void {
    // Store base limits for adaptation
    for (const [path, rule] of this.rules.entries()) {
      this.baseLimits.set(path, { ...rule });
    }
  }

  public updateThreatLevel(clientId: string, level: number): void {
    this.threatLevels.set(clientId, Math.max(0, Math.min(1, level)));
    this.adaptLimitsForClient(clientId, level);
  }

  private adaptLimitsForClient(clientId: string, threatLevel: number): void {
    // Higher threat level = lower limits
    const reductionFactor = Math.max(0.1, 1 - threatLevel);

    for (const [path, baseRule] of this.baseLimits.entries()) {
      const adaptedRule = {
        ...baseRule,
        max: Math.floor(baseRule.max * reductionFactor),
        windowMs: Math.floor(baseRule.windowMs * (1 + threatLevel)) // Longer window for higher threat
      };

      this.rules.set(path, adaptedRule);
    }
  }

  public getThreatLevel(clientId: string): number {
    return this.threatLevels.get(clientId) || 0;
  }
}

// Distributed rate limiting for production environments
class DistributedRateLimit {
  private localLimiter: RateLimitService;
  private redisClient: any; // Redis client for distributed storage

  constructor(redisClient?: any) {
    this.localLimiter = new RateLimitService();
    this.redisClient = redisClient;
  }

  public async check(clientId: string, path: string): Promise<RateLimitResult> {
    if (!this.redisClient) {
      // Fallback to local rate limiting
      return this.localLimiter.check(clientId, path);
    }

    try {
      return await this.checkDistributed(clientId, path);
    } catch (error) {
      console.warn('Distributed rate limiting failed, falling back to local:', error);
      return this.localLimiter.check(clientId, path);
    }
  }

  private async checkDistributed(clientId: string, path: string): Promise<RateLimitResult> {
    // Implementation would use Redis for distributed rate limiting
    // This is a placeholder for the distributed implementation
    const key = `ratelimit:${clientId}:${path}`;
    
    // Use Redis INCR with TTL for atomic rate limiting
    const pipeline = this.redisClient.pipeline();
    pipeline.incr(key);
    pipeline.expire(key, 60); // 1 minute TTL
    
    const results = await pipeline.exec();
    const count = results[0][1];
    
    const rule = this.localLimiter['findMatchingRule'](path);
    if (!rule) {
      return { allowed: true };
    }

    return {
      allowed: count <= rule.max,
      limit: rule.max,
      remaining: Math.max(0, rule.max - count),
      resetTime: Date.now() + 60000
    };
  }
}

// Export instances
export const rateLimit = new RateLimitService();
export const adaptiveRateLimit = new AdaptiveRateLimiter();
export const createDistributedRateLimit = (redisClient?: any) => 
  new DistributedRateLimit(redisClient);