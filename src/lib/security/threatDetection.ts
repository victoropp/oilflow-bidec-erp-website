// Advanced Threat Detection System
// AI-powered threat analysis and pattern recognition for security monitoring

interface ThreatAnalysisRequest {
  ip: string;
  userAgent: string;
  path: string;
  method: string;
  origin?: string;
  referer?: string;
  headers: Record<string, string>;
}

interface ThreatAnalysisResult {
  blocked: boolean;
  threat?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  reasons: string[];
  score: number;
}

interface ThreatPattern {
  name: string;
  pattern: RegExp | ((request: ThreatAnalysisRequest) => boolean);
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  score: number;
}

class ThreatDetectionService {
  private patterns: ThreatPattern[] = [];
  private ipReputationCache: Map<string, { reputation: number; timestamp: number }> = new Map();
  private userAgentCache: Map<string, { threat: boolean; timestamp: number }> = new Map();
  private requestHistory: Map<string, Array<{ timestamp: number; path: string }>> = new Map();
  private blockedIPs: Set<string> = new Set();
  private whitelist: Set<string> = new Set();

  constructor() {
    this.initializeThreatPatterns();
    this.initializeWhitelist();
    this.startCleanupTimer();
  }

  private initializeThreatPatterns(): void {
    this.patterns = [
      // SQL Injection patterns
      {
        name: 'SQL_INJECTION',
        pattern: /(\b(union|select|insert|delete|update|drop|create|alter|exec|execute)\b)|(['";](\s)*(union|select|insert|delete|update|drop|create|alter))|(\bor\b\s+\b\d+\s*=\s*\d+)|(\band\b\s+\b\d+\s*=\s*\d+)/i,
        severity: 'high',
        description: 'SQL injection attempt detected',
        score: 80
      },

      // XSS patterns
      {
        name: 'XSS_ATTACK',
        pattern: /(<script[^>]*>[\s\S]*?<\/script>)|(<iframe[^>]*>)|(<object[^>]*>)|(<embed[^>]*>)|(<link[^>]*>)|javascript:|vbscript:|onload=|onerror=|onclick=/i,
        severity: 'high',
        description: 'Cross-site scripting (XSS) attempt detected',
        score: 75
      },

      // Path traversal
      {
        name: 'PATH_TRAVERSAL',
        pattern: /(\.\.[\/\\])|(\.\.[%2f|%2F|%5c|%5C])|(%2e%2e[\/\\])|(%2e%2e%2f)|(%2e%2e%5c)/i,
        severity: 'medium',
        description: 'Path traversal attempt detected',
        score: 60
      },

      // Command injection
      {
        name: 'COMMAND_INJECTION',
        pattern: /(\||;|&&|\$\(|\`)|(\bcat\b|\bls\b|\bps\b|\bwhoami\b|\buname\b|\bid\b|\bpwd\b|\becho\b)/i,
        severity: 'high',
        description: 'Command injection attempt detected',
        score: 85
      },

      // Sensitive file access
      {
        name: 'SENSITIVE_FILE_ACCESS',
        pattern: /(\/etc\/passwd)|(\/etc\/shadow)|(\.env)|(config\.php)|(web\.config)|(\.htaccess)|(wp-config\.php)/i,
        severity: 'medium',
        description: 'Attempt to access sensitive files',
        score: 50
      },

      // Bot detection
      {
        name: 'MALICIOUS_BOT',
        pattern: (request: ThreatAnalysisRequest) => {
          const maliciousBots = [
            'sqlmap', 'nmap', 'nikto', 'dirb', 'gobuster', 'ffuf', 
            'burpsuite', 'owasp zap', 'nessus', 'openvas', 'metasploit',
            'python-requests', 'curl', 'wget', 'libwww-perl'
          ];
          const userAgent = request.userAgent.toLowerCase();
          return maliciousBots.some(bot => userAgent.includes(bot));
        },
        severity: 'high',
        description: 'Malicious bot or scanner detected',
        score: 70
      },

      // Rapid requests (potential DDoS)
      {
        name: 'RAPID_REQUESTS',
        pattern: (request: ThreatAnalysisRequest) => {
          const history = this.requestHistory.get(request.ip) || [];
          const now = Date.now();
          const recentRequests = history.filter(req => now - req.timestamp < 10000); // Last 10 seconds
          
          return recentRequests.length > 50; // More than 50 requests in 10 seconds
        },
        severity: 'medium',
        description: 'Potential DDoS or rapid request pattern detected',
        score: 40
      },

      // Suspicious request patterns
      {
        name: 'SUSPICIOUS_HEADERS',
        pattern: (request: ThreatAnalysisRequest) => {
          const suspiciousHeaders = ['x-forwarded-for', 'x-real-ip', 'x-originating-ip'];
          const headers = Object.keys(request.headers).map(h => h.toLowerCase());
          
          // Multiple forwarding headers might indicate proxy chaining to hide origin
          const forwardingHeaders = headers.filter(h => suspiciousHeaders.includes(h));
          return forwardingHeaders.length > 2;
        },
        severity: 'low',
        description: 'Suspicious header pattern detected',
        score: 20
      },

      // Missing common headers
      {
        name: 'MISSING_HEADERS',
        pattern: (request: ThreatAnalysisRequest) => {
          const requiredHeaders = ['accept', 'accept-language', 'accept-encoding'];
          const headers = Object.keys(request.headers).map(h => h.toLowerCase());
          
          const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
          return missingHeaders.length >= 2; // Missing 2 or more common headers
        },
        severity: 'low',
        description: 'Missing common browser headers (potential bot)',
        score: 25
      },

      // API abuse patterns
      {
        name: 'API_ABUSE',
        pattern: (request: ThreatAnalysisRequest) => {
          if (!request.path.startsWith('/api/')) return false;
          
          const history = this.requestHistory.get(request.ip) || [];
          const now = Date.now();
          const apiRequests = history.filter(req => 
            req.path.startsWith('/api/') && 
            now - req.timestamp < 60000 // Last minute
          );
          
          return apiRequests.length > 20; // More than 20 API requests per minute
        },
        severity: 'medium',
        description: 'API abuse pattern detected',
        score: 55
      },

      // Reconnaissance attempts
      {
        name: 'RECONNAISSANCE',
        pattern: (request: ThreatAnalysisRequest) => {
          const reconPaths = [
            '/admin', '/.git', '/.svn', '/backup', '/test', '/dev', 
            '/debug', '/config', '/setup', '/install', '/wp-admin',
            '/phpmyadmin', '/adminer', '/kibana', '/grafana'
          ];
          
          return reconPaths.some(path => request.path.toLowerCase().includes(path));
        },
        severity: 'medium',
        description: 'Reconnaissance or directory enumeration attempt',
        score: 45
      }
    ];
  }

  private initializeWhitelist(): void {
    // Add trusted IPs to whitelist
    const trustedIPs = [
      '127.0.0.1',
      '::1',
      // Add your monitoring services, CDNs, etc.
      // Vercel edge network IPs would go here in production
    ];

    trustedIPs.forEach(ip => this.whitelist.add(ip));
  }

  private startCleanupTimer(): void {
    // Clean up old cache entries every 10 minutes
    setInterval(() => {
      const now = Date.now();
      const maxAge = 30 * 60 * 1000; // 30 minutes

      // Clean IP reputation cache
      for (const [ip, data] of this.ipReputationCache.entries()) {
        if (now - data.timestamp > maxAge) {
          this.ipReputationCache.delete(ip);
        }
      }

      // Clean user agent cache
      for (const [ua, data] of this.userAgentCache.entries()) {
        if (now - data.timestamp > maxAge) {
          this.userAgentCache.delete(ua);
        }
      }

      // Clean request history
      for (const [ip, history] of this.requestHistory.entries()) {
        const recentHistory = history.filter(req => now - req.timestamp < maxAge);
        if (recentHistory.length === 0) {
          this.requestHistory.delete(ip);
        } else {
          this.requestHistory.set(ip, recentHistory);
        }
      }
    }, 10 * 60 * 1000);
  }

  public async analyze(request: ThreatAnalysisRequest): Promise<ThreatAnalysisResult> {
    // Check whitelist first
    if (this.whitelist.has(request.ip)) {
      return {
        blocked: false,
        severity: 'low',
        confidence: 1,
        reasons: ['IP is whitelisted'],
        score: 0
      };
    }

    // Check if IP is already blocked
    if (this.blockedIPs.has(request.ip)) {
      return {
        blocked: true,
        threat: 'BLOCKED_IP',
        severity: 'critical',
        confidence: 1,
        reasons: ['IP is in blocklist'],
        score: 100
      };
    }

    // Update request history
    this.updateRequestHistory(request);

    // Analyze patterns
    const results: Array<{ pattern: ThreatPattern; matched: boolean }> = [];
    let totalScore = 0;
    const reasons: string[] = [];

    for (const pattern of this.patterns) {
      let matched = false;

      if (pattern.pattern instanceof RegExp) {
        // Test against path, user agent, and header values
        const testStrings = [
          request.path,
          request.userAgent,
          request.origin || '',
          request.referer || '',
          ...Object.values(request.headers)
        ].join(' ');

        matched = pattern.pattern.test(testStrings);
      } else if (typeof pattern.pattern === 'function') {
        try {
          matched = pattern.pattern(request);
        } catch (error) {
          console.warn(`Error evaluating threat pattern ${pattern.name}:`, error);
          matched = false;
        }
      }

      if (matched) {
        totalScore += pattern.score;
        reasons.push(pattern.description);
        results.push({ pattern, matched: true });
      }
    }

    // Additional reputation checks
    const reputationScore = await this.checkIPReputation(request.ip);
    totalScore += reputationScore;

    if (reputationScore > 0) {
      reasons.push(`IP reputation score: ${reputationScore}`);
    }

    // Determine threat level and blocking decision
    const { severity, blocked } = this.calculateThreatLevel(totalScore);
    const confidence = Math.min(totalScore / 100, 1); // Normalize to 0-1

    // Auto-block high-risk IPs
    if (blocked && severity === 'critical') {
      this.blockedIPs.add(request.ip);
      console.warn(`IP ${request.ip} has been auto-blocked due to critical threat level`);
    }

    // Log threat analysis
    if (totalScore > 30 || blocked) {
      console.warn('Threat detected:', {
        ip: request.ip,
        path: request.path,
        userAgent: request.userAgent,
        score: totalScore,
        severity,
        blocked,
        reasons,
        timestamp: new Date().toISOString()
      });
    }

    return {
      blocked,
      threat: blocked ? this.identifyPrimaryThreat(results) : undefined,
      severity,
      confidence,
      reasons,
      score: totalScore
    };
  }

  private updateRequestHistory(request: ThreatAnalysisRequest): void {
    const history = this.requestHistory.get(request.ip) || [];
    history.push({
      timestamp: Date.now(),
      path: request.path
    });

    // Keep only last 100 requests per IP
    if (history.length > 100) {
      history.splice(0, history.length - 100);
    }

    this.requestHistory.set(request.ip, history);
  }

  private async checkIPReputation(ip: string): Promise<number> {
    // Check cache first
    const cached = this.ipReputationCache.get(ip);
    if (cached && Date.now() - cached.timestamp < 60 * 60 * 1000) { // 1 hour cache
      return cached.reputation;
    }

    let reputationScore = 0;

    try {
      // Check against known bad IP patterns
      if (this.isKnownBadIP(ip)) {
        reputationScore += 50;
      }

      // Check against private/local IPs (should be allowed but flagged for logging)
      if (this.isPrivateIP(ip)) {
        reputationScore -= 10; // Slightly reduce threat for private IPs
      }

      // In production, you would integrate with threat intelligence feeds
      // like VirusTotal, AbuseIPDB, etc.
      // reputationScore += await this.checkExternalThreatFeed(ip);

    } catch (error) {
      console.warn('Error checking IP reputation:', error);
    }

    // Cache the result
    this.ipReputationCache.set(ip, {
      reputation: reputationScore,
      timestamp: Date.now()
    });

    return reputationScore;
  }

  private isKnownBadIP(ip: string): boolean {
    // Patterns for commonly abused IP ranges
    const badPatterns = [
      /^10\.0\.0\.1$/, // Common router IP (might be suspicious if from external)
      /^192\.168\.1\.1$/, // Common router IP
      // Add more patterns based on your threat intelligence
    ];

    return badPatterns.some(pattern => pattern.test(ip));
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

  private calculateThreatLevel(score: number): { severity: 'low' | 'medium' | 'high' | 'critical'; blocked: boolean } {
    if (score >= 80) {
      return { severity: 'critical', blocked: true };
    } else if (score >= 60) {
      return { severity: 'high', blocked: true };
    } else if (score >= 40) {
      return { severity: 'medium', blocked: false };
    } else {
      return { severity: 'low', blocked: false };
    }
  }

  private identifyPrimaryThreat(results: Array<{ pattern: ThreatPattern; matched: boolean }>): string {
    const matchedPatterns = results.filter(r => r.matched);
    if (matchedPatterns.length === 0) return 'UNKNOWN';

    // Return the highest severity threat
    const sortedThreats = matchedPatterns.sort((a, b) => {
      const severityOrder = { 'low': 1, 'medium': 2, 'high': 3, 'critical': 4 };
      return severityOrder[b.pattern.severity] - severityOrder[a.pattern.severity];
    });

    return sortedThreats[0].pattern.name;
  }

  public addToBlocklist(ip: string): void {
    this.blockedIPs.add(ip);
  }

  public removeFromBlocklist(ip: string): boolean {
    return this.blockedIPs.delete(ip);
  }

  public addToWhitelist(ip: string): void {
    this.whitelist.add(ip);
  }

  public removeFromWhitelist(ip: string): boolean {
    return this.whitelist.delete(ip);
  }

  public getStats(): {
    blockedIPs: number;
    whitelistedIPs: number;
    cachedReputations: number;
    activeHistories: number;
    totalPatterns: number;
  } {
    return {
      blockedIPs: this.blockedIPs.size,
      whitelistedIPs: this.whitelist.size,
      cachedReputations: this.ipReputationCache.size,
      activeHistories: this.requestHistory.size,
      totalPatterns: this.patterns.length
    };
  }
}

// Export singleton instance
export const threatDetection = new ThreatDetectionService();