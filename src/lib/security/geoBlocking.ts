// Geographic Blocking and Access Control System
// Implements country-based access restrictions and compliance requirements

interface GeoBlockingResult {
  blocked: boolean;
  country?: string;
  region?: string;
  reason?: string;
  allowedActions?: string[];
}

interface GeoBlockingConfig {
  blockedCountries: string[];
  allowedCountries: string[];
  restrictedCountries: string[];
  complianceRegions: Record<string, string[]>;
  defaultAction: 'allow' | 'block';
}

interface IPGeoData {
  country: string;
  countryCode: string;
  region: string;
  city: string;
  continent: string;
  timezone: string;
  isVPN?: boolean;
  isProxy?: boolean;
  isTor?: boolean;
  isHosting?: boolean;
  accuracy?: number;
}

class GeoBlockingService {
  private config: GeoBlockingConfig;
  private geoCache: Map<string, { data: IPGeoData; timestamp: number }> = new Map();
  private complianceCache: Map<string, { compliant: boolean; timestamp: number }> = new Map();

  constructor(config?: Partial<GeoBlockingConfig>) {
    this.config = this.getDefaultConfig(config);
    this.startCacheCleanup();
  }

  private getDefaultConfig(userConfig?: Partial<GeoBlockingConfig>): GeoBlockingConfig {
    const defaultConfig: GeoBlockingConfig = {
      // Countries with known high-risk or restricted access
      blockedCountries: [
        // Add countries based on your compliance requirements
        // This is just an example - customize based on your needs
      ],
      
      // Explicitly allowed countries (empty means all non-blocked are allowed)
      allowedCountries: [],
      
      // Countries with restricted access (require additional verification)
      restrictedCountries: [
        // Countries requiring special compliance measures
      ],
      
      // Compliance requirements by region
      complianceRegions: {
        'EU': ['GDPR', 'COOKIE_CONSENT', 'DATA_PROTECTION'],
        'US': ['CCPA', 'COPPA'],
        'CA': ['PIPEDA'],
        'AU': ['PRIVACY_ACT'],
        'BR': ['LGPD'],
        'IN': ['PDPB'],
        'CN': ['PIPL', 'CYBERSECURITY_LAW'],
        'RU': ['PERSONAL_DATA_LAW'],
        'JP': ['APPI'],
        'KR': ['PIPA']
      },
      
      // Default action when country is unknown
      defaultAction: 'allow'
    };

    return { ...defaultConfig, ...userConfig };
  }

  private startCacheCleanup(): void {
    setInterval(() => {
      const now = Date.now();
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours

      // Clean geo cache
      for (const [ip, data] of this.geoCache.entries()) {
        if (now - data.timestamp > maxAge) {
          this.geoCache.delete(ip);
        }
      }

      // Clean compliance cache
      for (const [key, data] of this.complianceCache.entries()) {
        if (now - data.timestamp > maxAge) {
          this.complianceCache.delete(key);
        }
      }
    }, 60 * 60 * 1000); // Run every hour
  }

  public async check(ip: string): Promise<GeoBlockingResult> {
    try {
      // Skip private/local IPs
      if (this.isPrivateIP(ip)) {
        return {
          blocked: false,
          country: 'Local',
          reason: 'Private IP address'
        };
      }

      // Get geographic data
      const geoData = await this.getGeoData(ip);
      if (!geoData) {
        return {
          blocked: this.config.defaultAction === 'block',
          reason: 'Unable to determine location'
        };
      }

      // Check if country is explicitly blocked
      if (this.config.blockedCountries.includes(geoData.countryCode)) {
        return {
          blocked: true,
          country: geoData.country,
          region: geoData.region,
          reason: 'Country is blocked'
        };
      }

      // Check if country is explicitly allowed
      if (this.config.allowedCountries.length > 0 && 
          !this.config.allowedCountries.includes(geoData.countryCode)) {
        return {
          blocked: true,
          country: geoData.country,
          region: geoData.region,
          reason: 'Country not in allowed list'
        };
      }

      // Check for VPN/Proxy/Tor usage (higher risk)
      if (geoData.isVPN || geoData.isProxy || geoData.isTor) {
        return {
          blocked: false, // Allow but flag for additional monitoring
          country: geoData.country,
          region: geoData.region,
          reason: 'VPN/Proxy detected - additional monitoring applied',
          allowedActions: ['read'] // Restrict to read-only actions
        };
      }

      // Check for hosting/datacenter IPs (potential bots)
      if (geoData.isHosting) {
        return {
          blocked: false,
          country: geoData.country,
          region: geoData.region,
          reason: 'Datacenter IP detected - rate limited',
          allowedActions: ['read', 'limited_interaction']
        };
      }

      // Check restricted countries (require additional compliance)
      if (this.config.restrictedCountries.includes(geoData.countryCode)) {
        return {
          blocked: false,
          country: geoData.country,
          region: geoData.region,
          reason: 'Restricted country - compliance required',
          allowedActions: ['read', 'compliance_required']
        };
      }

      // Default: allow access
      return {
        blocked: false,
        country: geoData.country,
        region: geoData.region
      };

    } catch (error) {
      console.warn('Geo-blocking check failed:', error);
      
      // Fail-safe: allow access but log the error
      return {
        blocked: false,
        reason: 'Geo-blocking service error'
      };
    }
  }

  private async getGeoData(ip: string): Promise<IPGeoData | null> {
    // Check cache first
    const cached = this.geoCache.get(ip);
    if (cached && Date.now() - cached.timestamp < 24 * 60 * 60 * 1000) {
      return cached.data;
    }

    try {
      // In production, you would use a real geolocation service
      // like MaxMind GeoIP2, IPinfo, ipapi.co, etc.
      const geoData = await this.fetchGeoDataFromService(ip);
      
      if (geoData) {
        // Cache the result
        this.geoCache.set(ip, {
          data: geoData,
          timestamp: Date.now()
        });
      }

      return geoData;
    } catch (error) {
      console.warn('Failed to fetch geo data for IP:', ip, error);
      return null;
    }
  }

  private async fetchGeoDataFromService(ip: string): Promise<IPGeoData | null> {
    // This is a placeholder implementation
    // In production, integrate with a real geolocation service
    
    try {
      // Example using ipapi.co (free tier available)
      const response = await fetch(`https://ipapi.co/${ip}/json/`, {
        method: 'GET',
        headers: {
          'User-Agent': 'OilFlow-BIDEC-ERP/1.0'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.reason || 'Geolocation service error');
      }

      return {
        country: data.country_name || 'Unknown',
        countryCode: data.country_code || 'XX',
        region: data.region || 'Unknown',
        city: data.city || 'Unknown',
        continent: data.continent_code || 'Unknown',
        timezone: data.timezone || 'Unknown',
        isVPN: false, // Would come from service that detects VPNs
        isProxy: false, // Would come from service that detects proxies
        isTor: false, // Would come from service that detects Tor
        isHosting: data.org?.toLowerCase().includes('hosting') || 
                   data.org?.toLowerCase().includes('datacenter') || 
                   data.org?.toLowerCase().includes('cloud'),
        accuracy: data.accuracy || 0
      };
    } catch (error) {
      // Fallback: Basic geolocation based on IP ranges (very limited)
      return this.getBasicGeoData(ip);
    }
  }

  private getBasicGeoData(ip: string): IPGeoData {
    // Very basic country detection based on known IP ranges
    // This is extremely limited and should not be used in production
    
    const basicGeoData: IPGeoData = {
      country: 'Unknown',
      countryCode: 'XX',
      region: 'Unknown',
      city: 'Unknown',
      continent: 'Unknown',
      timezone: 'Unknown',
      accuracy: 10 // Low accuracy
    };

    // Add basic detection for common ranges (educational purposes only)
    if (ip.startsWith('8.8.') || ip.startsWith('4.4.')) {
      basicGeoData.country = 'United States';
      basicGeoData.countryCode = 'US';
      basicGeoData.continent = 'NA';
    }

    return basicGeoData;
  }

  private isPrivateIP(ip: string): boolean {
    const privateRanges = [
      /^127\./,           // Loopback
      /^192\.168\./,      // Private Class C
      /^10\./,            // Private Class A
      /^172\.(1[6-9]|2\d|3[01])\./,  // Private Class B
      /^::1$/,            // IPv6 loopback
      /^fc00:/,           // IPv6 unique local
      /^fe80:/,           // IPv6 link-local
    ];

    return privateRanges.some(pattern => pattern.test(ip));
  }

  public async getComplianceRequirements(ip: string): Promise<string[]> {
    const geoData = await this.getGeoData(ip);
    if (!geoData) return [];

    // Check cache
    const cacheKey = `compliance_${geoData.countryCode}`;
    const cached = this.complianceCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < 24 * 60 * 60 * 1000) {
      return cached.compliant ? this.getRequirementsForCountry(geoData.countryCode) : [];
    }

    const requirements = this.getRequirementsForCountry(geoData.countryCode);
    
    // Cache the result
    this.complianceCache.set(cacheKey, {
      compliant: requirements.length > 0,
      timestamp: Date.now()
    });

    return requirements;
  }

  private getRequirementsForCountry(countryCode: string): string[] {
    // Check EU countries
    const euCountries = [
      'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 
      'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 
      'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE'
    ];

    if (euCountries.includes(countryCode)) {
      return this.config.complianceRegions['EU'] || [];
    }

    // Check specific country requirements
    return this.config.complianceRegions[countryCode] || [];
  }

  public isEUCountry(countryCode: string): boolean {
    const euCountries = [
      'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 
      'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 
      'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE'
    ];
    return euCountries.includes(countryCode);
  }

  public updateConfig(newConfig: Partial<GeoBlockingConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  public getConfig(): GeoBlockingConfig {
    return { ...this.config };
  }

  public getStats(): {
    cachedGeoData: number;
    cachedCompliance: number;
    config: GeoBlockingConfig;
  } {
    return {
      cachedGeoData: this.geoCache.size,
      cachedCompliance: this.complianceCache.size,
      config: this.config
    };
  }

  public clearCache(): void {
    this.geoCache.clear();
    this.complianceCache.clear();
  }
}

// Export singleton instance
export const geoBlocking = new GeoBlockingService();

// Export factory function for custom configurations
export const createGeoBlocking = (config?: Partial<GeoBlockingConfig>) => 
  new GeoBlockingService(config);