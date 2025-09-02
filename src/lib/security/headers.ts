// Security Headers Implementation
// Comprehensive HTTP security headers to protect against common attacks

import { NextRequest, NextResponse } from 'next/server';

export interface SecurityHeadersConfig {
  contentSecurityPolicy?: string;
  strictTransportSecurity?: string;
  xFrameOptions?: string;
  xContentTypeOptions?: string;
  referrerPolicy?: string;
  permissionsPolicy?: string;
  crossOriginEmbedderPolicy?: string;
  crossOriginOpenerPolicy?: string;
  crossOriginResourcePolicy?: string;
  xXSSProtection?: string;
  customHeaders?: Record<string, string>;
}

class SecurityHeadersService {
  private config: SecurityHeadersConfig;
  private nonce: string;

  constructor(config: Partial<SecurityHeadersConfig> = {}) {
    this.config = this.getDefaultConfig(config);
    this.nonce = this.generateNonce();
  }

  private getDefaultConfig(userConfig: Partial<SecurityHeadersConfig>): SecurityHeadersConfig {
    const defaultConfig: SecurityHeadersConfig = {
      // Content Security Policy - Strictest possible while maintaining functionality
      contentSecurityPolicy: this.buildCSP(),
      
      // Strict Transport Security - Force HTTPS for 2 years including subdomains
      strictTransportSecurity: 'max-age=63072000; includeSubDomains; preload',
      
      // X-Frame-Options - Prevent clickjacking
      xFrameOptions: 'DENY',
      
      // X-Content-Type-Options - Prevent MIME type sniffing
      xContentTypeOptions: 'nosniff',
      
      // Referrer Policy - Control referrer information
      referrerPolicy: 'strict-origin-when-cross-origin',
      
      // Permissions Policy - Control browser features
      permissionsPolicy: this.buildPermissionsPolicy(),
      
      // Cross-Origin Embedder Policy
      crossOriginEmbedderPolicy: 'require-corp',
      
      // Cross-Origin Opener Policy
      crossOriginOpenerPolicy: 'same-origin',
      
      // Cross-Origin Resource Policy
      crossOriginResourcePolicy: 'same-site',
      
      // X-XSS-Protection (legacy but still useful for older browsers)
      xXSSProtection: '1; mode=block',
      
      // Custom security headers
      customHeaders: {
        'X-DNS-Prefetch-Control': 'off',
        'X-Download-Options': 'noopen',
        'X-Permitted-Cross-Domain-Policies': 'none',
        'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet, noimageindex',
        'X-Request-ID': crypto.randomUUID(),
        'X-Content-Duration': '30',
        'X-Frame-Source': 'SAMEORIGIN',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Surrogate-Control': 'no-store'
      }
    };

    return { ...defaultConfig, ...userConfig };
  }

  private buildCSP(): string {
    const nonce = this.nonce;
    
    // Build comprehensive CSP policy
    const csp = [
      "default-src 'self'",
      `script-src 'self' 'unsafe-eval' 'nonce-${nonce}' https://vercel.live https://*.vercel-scripts.com https://va.vercel-scripts.com`,
      "script-src-elem 'self' 'unsafe-inline' https://vercel.live https://*.vercel-scripts.com https://va.vercel-scripts.com https://fonts.googleapis.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: https: blob:",
      "media-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "connect-src 'self' https://vitals.vercel-insights.com https://vercel.live wss://ws-us3.pusher.com https://sockjs-us3.pusher.com",
      "worker-src 'self' blob:",
      "manifest-src 'self'",
      "prefetch-src 'self'",
      "navigate-to 'self'",
      "upgrade-insecure-requests",
      "block-all-mixed-content"
    ].join('; ');

    return csp;
  }

  private buildPermissionsPolicy(): string {
    // Disable potentially dangerous browser features
    const policies = [
      'accelerometer=()',
      'ambient-light-sensor=()',
      'autoplay=()',
      'battery=()',
      'camera=()',
      'cross-origin-isolated=()',
      'display-capture=()',
      'document-domain=()',
      'encrypted-media=()',
      'execution-while-not-rendered=()',
      'execution-while-out-of-viewport=()',
      'fullscreen=()',
      'geolocation=()',
      'gyroscope=()',
      'keyboard-map=()',
      'magnetometer=()',
      'microphone=()',
      'midi=()',
      'navigation-override=()',
      'payment=()',
      'picture-in-picture=()',
      'publickey-credentials-get=()',
      'screen-wake-lock=()',
      'sync-xhr=()',
      'usb=()',
      'web-share=()',
      'xr-spatial-tracking=()'
    ];

    return policies.join(', ');
  }

  private generateNonce(): string {
    return Buffer.from(crypto.getRandomValues(new Uint8Array(16))).toString('base64');
  }

  public apply(response: NextResponse, request: NextRequest): NextResponse {
    // Apply all security headers
    Object.entries(this.getSecurityHeaders(request)).forEach(([key, value]) => {
      if (value) {
        response.headers.set(key, value);
      }
    });

    // Add request-specific headers
    this.addRequestSpecificHeaders(response, request);

    return response;
  }

  private getSecurityHeaders(request: NextRequest): Record<string, string> {
    const headers: Record<string, string> = {};

    // Content Security Policy
    if (this.config.contentSecurityPolicy) {
      headers['Content-Security-Policy'] = this.config.contentSecurityPolicy;
    }

    // HSTS
    if (this.config.strictTransportSecurity && request.nextUrl.protocol === 'https:') {
      headers['Strict-Transport-Security'] = this.config.strictTransportSecurity;
    }

    // Frame Options
    if (this.config.xFrameOptions) {
      headers['X-Frame-Options'] = this.config.xFrameOptions;
    }

    // Content Type Options
    if (this.config.xContentTypeOptions) {
      headers['X-Content-Type-Options'] = this.config.xContentTypeOptions;
    }

    // Referrer Policy
    if (this.config.referrerPolicy) {
      headers['Referrer-Policy'] = this.config.referrerPolicy;
    }

    // Permissions Policy
    if (this.config.permissionsPolicy) {
      headers['Permissions-Policy'] = this.config.permissionsPolicy;
    }

    // Cross-Origin Policies
    if (this.config.crossOriginEmbedderPolicy) {
      headers['Cross-Origin-Embedder-Policy'] = this.config.crossOriginEmbedderPolicy;
    }

    if (this.config.crossOriginOpenerPolicy) {
      headers['Cross-Origin-Opener-Policy'] = this.config.crossOriginOpenerPolicy;
    }

    if (this.config.crossOriginResourcePolicy) {
      headers['Cross-Origin-Resource-Policy'] = this.config.crossOriginResourcePolicy;
    }

    // XSS Protection
    if (this.config.xXSSProtection) {
      headers['X-XSS-Protection'] = this.config.xXSSProtection;
    }

    // Custom headers
    if (this.config.customHeaders) {
      Object.assign(headers, this.config.customHeaders);
    }

    return headers;
  }

  private addRequestSpecificHeaders(response: NextResponse, request: NextRequest): void {
    // Add vary header for caching
    response.headers.set('Vary', 'Origin, Accept-Encoding, Accept, X-Requested-With');

    // Add security timestamp
    response.headers.set('X-Security-Timestamp', new Date().toISOString());

    // Add request tracking
    response.headers.set('X-Request-ID', crypto.randomUUID());

    // Content security for API routes
    if (request.nextUrl.pathname.startsWith('/api/')) {
      response.headers.set('X-Content-Type-Options', 'nosniff');
      response.headers.set('X-Frame-Options', 'DENY');
      response.headers.set('X-XSS-Protection', '1; mode=block');
      
      // Disable caching for sensitive API endpoints
      if (this.isSensitiveEndpoint(request.nextUrl.pathname)) {
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');
      }
    }

    // Static asset optimization
    if (this.isStaticAsset(request.nextUrl.pathname)) {
      response.headers.set('X-Frame-Options', 'DENY');
      response.headers.set('X-Content-Type-Options', 'nosniff');
    }
  }

  private isSensitiveEndpoint(pathname: string): boolean {
    const sensitivePatterns = [
      '/api/demo',
      '/api/contact',
      '/api/chatbot',
      '/api/admin',
      '/api/auth'
    ];

    return sensitivePatterns.some(pattern => pathname.startsWith(pattern));
  }

  private isStaticAsset(pathname: string): boolean {
    return /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|pdf|zip)$/i.test(pathname);
  }

  public getNonce(): string {
    return this.nonce;
  }

  public updateConfig(newConfig: Partial<SecurityHeadersConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  public getConfig(): SecurityHeadersConfig {
    return { ...this.config };
  }

  // Method to validate CSP violations (for reporting)
  public validateCSPViolation(violation: any): boolean {
    // In production, you would send CSP violations to your security monitoring service
    const allowedSources = [
      'https://vercel.live',
      'https://va.vercel-scripts.com',
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];

    if (violation['blocked-uri'] && !allowedSources.some(source => 
      violation['blocked-uri'].startsWith(source))) {
      console.warn('CSP Violation detected:', violation);
      return false;
    }

    return true;
  }
}

// Advanced security headers for different environments
class EnvironmentSecurityHeaders extends SecurityHeadersService {
  constructor(environment: 'development' | 'staging' | 'production') {
    const config = EnvironmentSecurityHeaders.getEnvironmentConfig(environment);
    super(config);
  }

  private static getEnvironmentConfig(env: string): Partial<SecurityHeadersConfig> {
    switch (env) {
      case 'development':
        return {
          contentSecurityPolicy: "default-src 'self' 'unsafe-eval' 'unsafe-inline'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'",
          strictTransportSecurity: '', // Disable HSTS in development
          customHeaders: {
            'X-Environment': 'development',
            'X-Debug-Mode': 'enabled'
          }
        };

      case 'staging':
        return {
          customHeaders: {
            'X-Environment': 'staging',
            'X-Debug-Mode': 'limited'
          }
        };

      case 'production':
        return {
          customHeaders: {
            'X-Environment': 'production',
            'X-Debug-Mode': 'disabled',
            'X-Powered-By': '', // Remove server information
          }
        };

      default:
        return {};
    }
  }
}

// Export instances
const environment = process.env.NODE_ENV as 'development' | 'staging' | 'production' || 'production';
export const securityHeaders = new EnvironmentSecurityHeaders(environment);
export const createSecurityHeaders = (config?: Partial<SecurityHeadersConfig>) => 
  new SecurityHeadersService(config);