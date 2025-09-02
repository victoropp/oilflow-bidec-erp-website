// Security Configuration and Integration Layer
// Central configuration for all security services and features

import { createIPProtection } from './ipProtection';
import { securityMonitoring } from './monitoring';
import { gdprCompliance } from '../compliance/gdpr';

interface SecurityConfig {
  ipProtection: {
    enabled: boolean;
    enableContentProtection: boolean;
    enableRightClickDisable: boolean;
    enableConsoleBlocking: boolean;
    enableDevToolsDetection: boolean;
    enableWatermarking: boolean;
    enableObfuscation: boolean;
  };
  
  rateLimit: {
    enabled: boolean;
    apiLimits: {
      demo: { windowMs: number; max: number; };
      contact: { windowMs: number; max: number; };
      chatbot: { windowMs: number; max: number; };
    };
    globalLimit: { windowMs: number; max: number; };
  };

  threatDetection: {
    enabled: boolean;
    autoBlock: boolean;
    logThreats: boolean;
    alertOnCritical: boolean;
  };

  gdpr: {
    enabled: boolean;
    cookieConsent: boolean;
    dataRetention: number; // days
    automaticCleanup: boolean;
  };

  monitoring: {
    enabled: boolean;
    logLevel: 'debug' | 'info' | 'warn' | 'error';
    alertRules: boolean;
    webhooks: Record<string, string>;
  };

  headers: {
    strictTransportSecurity: boolean;
    contentSecurityPolicy: boolean;
    frameOptions: boolean;
    contentTypeOptions: boolean;
    referrerPolicy: boolean;
    permissionsPolicy: boolean;
  };

  geoBlocking: {
    enabled: boolean;
    blockedCountries: string[];
    restrictedCountries: string[];
    euCompliance: boolean;
  };
}

class SecurityConfigurationService {
  private config: SecurityConfig;
  private environment: 'development' | 'staging' | 'production';

  constructor() {
    this.environment = (process.env.NODE_ENV as any) || 'development';
    this.config = this.getEnvironmentConfig();
    this.initializeSecurity();
  }

  private getEnvironmentConfig(): SecurityConfig {
    const baseConfig: SecurityConfig = {
      ipProtection: {
        enabled: true,
        enableContentProtection: true,
        enableRightClickDisable: true,
        enableConsoleBlocking: true,
        enableDevToolsDetection: true,
        enableWatermarking: true,
        enableObfuscation: true
      },
      
      rateLimit: {
        enabled: true,
        apiLimits: {
          demo: { windowMs: 15 * 60 * 1000, max: 3 },
          contact: { windowMs: 15 * 60 * 1000, max: 5 },
          chatbot: { windowMs: 60 * 1000, max: 20 }
        },
        globalLimit: { windowMs: 60 * 1000, max: 100 }
      },

      threatDetection: {
        enabled: true,
        autoBlock: true,
        logThreats: true,
        alertOnCritical: true
      },

      gdpr: {
        enabled: true,
        cookieConsent: true,
        dataRetention: 1095, // 3 years
        automaticCleanup: true
      },

      monitoring: {
        enabled: true,
        logLevel: 'info',
        alertRules: true,
        webhooks: {}
      },

      headers: {
        strictTransportSecurity: true,
        contentSecurityPolicy: true,
        frameOptions: true,
        contentTypeOptions: true,
        referrerPolicy: true,
        permissionsPolicy: true
      },

      geoBlocking: {
        enabled: false, // Disabled by default, enable based on requirements
        blockedCountries: [],
        restrictedCountries: [],
        euCompliance: true
      }
    };

    // Environment-specific overrides
    switch (this.environment) {
      case 'development':
        return {
          ...baseConfig,
          ipProtection: {
            ...baseConfig.ipProtection,
            enableConsoleBlocking: false,
            enableDevToolsDetection: false
          },
          monitoring: {
            ...baseConfig.monitoring,
            logLevel: 'debug'
          },
          headers: {
            ...baseConfig.headers,
            strictTransportSecurity: false // No HTTPS in dev
          }
        };

      case 'staging':
        return {
          ...baseConfig,
          ipProtection: {
            ...baseConfig.ipProtection,
            enableConsoleBlocking: false
          },
          monitoring: {
            ...baseConfig.monitoring,
            logLevel: 'info'
          }
        };

      case 'production':
        return {
          ...baseConfig,
          monitoring: {
            ...baseConfig.monitoring,
            logLevel: 'warn',
            webhooks: {
              admin_alerts: process.env.SECURITY_WEBHOOK_ADMIN || '',
              security_logs: process.env.SECURITY_WEBHOOK_LOGS || ''
            }
          }
        };

      default:
        return baseConfig;
    }
  }

  private initializeSecurity(): void {
    // Initialize IP Protection if enabled
    if (this.config.ipProtection.enabled && typeof window !== 'undefined') {
      const ipProtection = createIPProtection(this.config.ipProtection);
      
      // Add watermarks if enabled
      if (this.config.ipProtection.enableWatermarking) {
        ipProtection.addWatermark({
          text: `© ${new Date().getFullYear()} BIDEC - OilFlow ERP - Confidential`,
          opacity: 0.1,
          fontSize: '14px',
          color: '#666',
          position: 'center'
        });
      }
    }

    // Initialize monitoring webhooks
    if (this.config.monitoring.enabled) {
      Object.entries(this.config.monitoring.webhooks).forEach(([name, url]) => {
        if (url) {
          securityMonitoring.addWebhook(name, url);
        }
      });
    }

    // Log security initialization
    console.log(`Security framework initialized for ${this.environment} environment`);
  }

  public getConfig(): SecurityConfig {
    return { ...this.config };
  }

  public updateConfig(updates: Partial<SecurityConfig>): void {
    this.config = { ...this.config, ...updates };
  }

  public isFeatureEnabled(feature: string): boolean {
    const parts = feature.split('.');
    let current: any = this.config;
    
    for (const part of parts) {
      if (current[part] === undefined) return false;
      current = current[part];
    }
    
    return current === true;
  }

  public getEnvironment(): string {
    return this.environment;
  }

  public async recordSecurityEvent(eventData: {
    type: 'threat' | 'violation' | 'breach' | 'anomaly' | 'compliance';
    severity: 'low' | 'medium' | 'high' | 'critical';
    source: string;
    description: string;
    metadata?: Record<string, any>;
  }): Promise<string> {
    if (!this.config.monitoring.enabled) {
      return '';
    }

    return await securityMonitoring.recordEvent({
      ...eventData,
      metadata: eventData.metadata || {}
    });
  }

  public async logGDPREvent(eventData: {
    action: string;
    userId: string;
    details: any;
  }): Promise<void> {
    if (!this.config.gdpr.enabled || !this.config.monitoring.enabled) {
      return;
    }

    await this.recordSecurityEvent({
      type: 'compliance',
      severity: 'medium',
      source: eventData.userId,
      description: `GDPR ${eventData.action}`,
      metadata: {
        regulation: 'GDPR',
        action: eventData.action,
        ...eventData.details
      }
    });
  }

  public getCSPNonce(): string {
    // Generate a new nonce for CSP
    return Buffer.from(crypto.getRandomValues(new Uint8Array(16))).toString('base64');
  }

  public validateSecurityHeaders(headers: Record<string, string>): {
    valid: boolean;
    missing: string[];
    recommendations: string[];
  } {
    const requiredHeaders = [
      'x-frame-options',
      'x-content-type-options',
      'referrer-policy'
    ];

    const recommendedHeaders = [
      'strict-transport-security',
      'content-security-policy',
      'permissions-policy',
      'cross-origin-embedder-policy',
      'cross-origin-opener-policy'
    ];

    const missing = requiredHeaders.filter(header => 
      !headers[header] && !headers[header.toLowerCase()]
    );

    const recommendations = recommendedHeaders.filter(header => 
      !headers[header] && !headers[header.toLowerCase()]
    );

    return {
      valid: missing.length === 0,
      missing,
      recommendations
    };
  }

  public generateSecurityReport(): {
    environment: string;
    config: SecurityConfig;
    features: {
      enabled: string[];
      disabled: string[];
    };
    recommendations: string[];
  } {
    const flattenConfig = (obj: any, prefix = ''): string[] => {
      const keys: string[] = [];
      for (const [key, value] of Object.entries(obj)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          keys.push(...flattenConfig(value, fullKey));
        } else if (typeof value === 'boolean') {
          keys.push(fullKey);
        }
      }
      return keys;
    };

    const allFeatures = flattenConfig(this.config);
    const enabled = allFeatures.filter(feature => this.isFeatureEnabled(feature));
    const disabled = allFeatures.filter(feature => !this.isFeatureEnabled(feature));

    const recommendations: string[] = [];
    
    if (!this.isFeatureEnabled('threatDetection.enabled')) {
      recommendations.push('Enable threat detection for better security');
    }
    
    if (!this.isFeatureEnabled('gdpr.enabled')) {
      recommendations.push('Enable GDPR compliance for EU users');
    }
    
    if (!this.isFeatureEnabled('monitoring.enabled')) {
      recommendations.push('Enable security monitoring for incident response');
    }

    if (this.environment === 'production' && !this.isFeatureEnabled('headers.strictTransportSecurity')) {
      recommendations.push('Enable HSTS in production environment');
    }

    return {
      environment: this.environment,
      config: this.config,
      features: {
        enabled,
        disabled
      },
      recommendations
    };
  }
}

// Export singleton instance
export const securityConfig = new SecurityConfigurationService();

// Export configuration type
export type { SecurityConfig };

// Helper functions for common security operations
export const SecurityUtils = {
  generateSecureToken: (length: number = 32): string => {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  },

  hashData: async (data: string): Promise<string> => {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  },

  sanitizeInput: (input: string): string => {
    return input
      .replace(/[<>\"']/g, '')
      .replace(/javascript:/gi, '')
      .replace(/data:/gi, '')
      .trim()
      .slice(0, 1000); // Limit length
  },

  validateEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  },

  isValidUUID: (uuid: string): boolean => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }
};