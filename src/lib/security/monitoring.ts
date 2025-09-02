// Security Monitoring and Incident Response System
// Comprehensive security event monitoring, alerting, and automated response

interface SecurityEvent {
  id: string;
  timestamp: string;
  type: 'threat' | 'violation' | 'breach' | 'anomaly' | 'compliance';
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  description: string;
  metadata: Record<string, any>;
  resolved: boolean;
  resolvedAt?: string;
  responseActions: ResponseAction[];
}

interface ResponseAction {
  id: string;
  action: 'block_ip' | 'rate_limit' | 'alert_admin' | 'log_event' | 'quarantine' | 'notify_user';
  timestamp: string;
  success: boolean;
  details: Record<string, any>;
}

interface AlertRule {
  id: string;
  name: string;
  condition: (event: SecurityEvent) => boolean;
  actions: ResponseAction['action'][];
  cooldown: number; // minutes
  enabled: boolean;
  lastTriggered?: string;
}

interface SecurityMetrics {
  totalEvents: number;
  eventsBySeverity: Record<string, number>;
  eventsByType: Record<string, number>;
  responseTime: {
    average: number;
    median: number;
    p95: number;
  };
  incidentStats: {
    active: number;
    resolved: number;
    mttr: number; // Mean Time to Resolution in minutes
  };
}

class SecurityMonitoringService {
  private events: Map<string, SecurityEvent> = new Map();
  private alertRules: Map<string, AlertRule> = new Map();
  private webhookEndpoints: Map<string, string> = new Map();
  private metricsBuffer: SecurityEvent[] = [];
  private readonly maxEvents = 10000; // Keep last 10k events in memory
  private readonly maxBufferSize = 1000;

  constructor() {
    this.initializeAlertRules();
    this.startMetricsAggregation();
    this.startEventCleanup();
  }

  private initializeAlertRules(): void {
    const rules: AlertRule[] = [
      {
        id: 'critical_threat',
        name: 'Critical Threat Detected',
        condition: (event) => event.severity === 'critical',
        actions: ['block_ip', 'alert_admin', 'log_event'],
        cooldown: 0, // No cooldown for critical threats
        enabled: true
      },
      {
        id: 'high_severity_burst',
        name: 'High Severity Event Burst',
        condition: (event) => {
          // Check for multiple high severity events from same source in short time
          const recentEvents = Array.from(this.events.values())
            .filter(e => 
              e.source === event.source &&
              e.severity === 'high' &&
              Date.now() - new Date(e.timestamp).getTime() < 5 * 60 * 1000 // 5 minutes
            );
          return recentEvents.length >= 3;
        },
        actions: ['rate_limit', 'alert_admin', 'log_event'],
        cooldown: 15,
        enabled: true
      },
      {
        id: 'repeated_violations',
        name: 'Repeated Security Violations',
        condition: (event) => {
          if (event.type !== 'violation') return false;
          
          const violations = Array.from(this.events.values())
            .filter(e => 
              e.source === event.source &&
              e.type === 'violation' &&
              Date.now() - new Date(e.timestamp).getTime() < 60 * 60 * 1000 // 1 hour
            );
          return violations.length >= 5;
        },
        actions: ['block_ip', 'alert_admin'],
        cooldown: 60,
        enabled: true
      },
      {
        id: 'gdpr_compliance_breach',
        name: 'GDPR Compliance Breach',
        condition: (event) => 
          event.type === 'compliance' && 
          event.metadata.regulation === 'GDPR',
        actions: ['alert_admin', 'log_event', 'notify_user'],
        cooldown: 0,
        enabled: true
      },
      {
        id: 'data_breach_indicator',
        name: 'Potential Data Breach',
        condition: (event) => 
          event.type === 'breach' ||
          (event.metadata.dataAccess === true && event.severity === 'high'),
        actions: ['block_ip', 'alert_admin', 'quarantine', 'log_event'],
        cooldown: 0,
        enabled: true
      },
      {
        id: 'anomaly_pattern',
        name: 'Anomalous Behavior Pattern',
        condition: (event) => {
          if (event.type !== 'anomaly') return false;
          
          // Check for multiple anomalies from same source
          const anomalies = Array.from(this.events.values())
            .filter(e => 
              e.source === event.source &&
              e.type === 'anomaly' &&
              Date.now() - new Date(e.timestamp).getTime() < 30 * 60 * 1000 // 30 minutes
            );
          return anomalies.length >= 3;
        },
        actions: ['rate_limit', 'log_event'],
        cooldown: 30,
        enabled: true
      }
    ];

    rules.forEach(rule => {
      this.alertRules.set(rule.id, rule);
    });
  }

  private startMetricsAggregation(): void {
    // Aggregate metrics every 5 minutes
    setInterval(() => {
      this.aggregateMetrics();
    }, 5 * 60 * 1000);
  }

  private startEventCleanup(): void {
    // Clean up old events every hour
    setInterval(() => {
      this.cleanupOldEvents();
    }, 60 * 60 * 1000);
  }

  public async recordEvent(eventData: Omit<SecurityEvent, 'id' | 'timestamp' | 'resolved' | 'responseActions'>): Promise<string> {
    const event: SecurityEvent = {
      ...eventData,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      resolved: false,
      responseActions: []
    };

    // Store event
    this.events.set(event.id, event);
    this.metricsBuffer.push(event);

    // Trim buffer if too large
    if (this.metricsBuffer.length > this.maxBufferSize) {
      this.metricsBuffer = this.metricsBuffer.slice(-this.maxBufferSize);
    }

    // Check alert rules
    await this.processAlertRules(event);

    // Log to console for debugging
    this.logEvent(event);

    return event.id;
  }

  private async processAlertRules(event: SecurityEvent): Promise<void> {
    for (const rule of this.alertRules.values()) {
      if (!rule.enabled) continue;

      // Check cooldown
      if (rule.lastTriggered) {
        const lastTrigger = new Date(rule.lastTriggered).getTime();
        const cooldownMs = rule.cooldown * 60 * 1000;
        if (Date.now() - lastTrigger < cooldownMs) {
          continue;
        }
      }

      // Evaluate condition
      try {
        if (rule.condition(event)) {
          await this.executeResponseActions(event, rule);
          rule.lastTriggered = new Date().toISOString();
        }
      } catch (error) {
        console.error(`Error evaluating alert rule ${rule.id}:`, error);
      }
    }
  }

  private async executeResponseActions(event: SecurityEvent, rule: AlertRule): Promise<void> {
    const responses: ResponseAction[] = [];

    for (const actionType of rule.actions) {
      const response: ResponseAction = {
        id: crypto.randomUUID(),
        action: actionType,
        timestamp: new Date().toISOString(),
        success: false,
        details: {}
      };

      try {
        switch (actionType) {
          case 'block_ip':
            response.success = await this.blockIP(event.source, event);
            response.details = { ip: event.source, reason: event.description };
            break;

          case 'rate_limit':
            response.success = await this.applyRateLimit(event.source, event);
            response.details = { ip: event.source, limit: 'restricted' };
            break;

          case 'alert_admin':
            response.success = await this.alertAdmin(event, rule);
            response.details = { rule: rule.name, severity: event.severity };
            break;

          case 'log_event':
            response.success = await this.logSecurityEvent(event);
            response.details = { logged: true };
            break;

          case 'quarantine':
            response.success = await this.quarantineSource(event.source, event);
            response.details = { quarantined: true, source: event.source };
            break;

          case 'notify_user':
            response.success = await this.notifyUser(event);
            response.details = { notified: true };
            break;
        }

        responses.push(response);
        console.log(`Security response action executed: ${actionType} - ${response.success ? 'Success' : 'Failed'}`);
      } catch (error) {
        response.success = false;
        response.details = { error: error instanceof Error ? error.message : 'Unknown error' };
        responses.push(response);
        console.error(`Failed to execute response action ${actionType}:`, error);
      }
    }

    // Update event with response actions
    event.responseActions = responses;
    this.events.set(event.id, event);
  }

  private async blockIP(ip: string, event: SecurityEvent): Promise<boolean> {
    try {
      // In production, this would integrate with your firewall/WAF
      // For now, we'll add to a blocked IPs list
      console.warn(`SECURITY ACTION: Blocking IP ${ip} due to ${event.description}`);
      
      // You would typically call your infrastructure API here
      // await this.firewallAPI.blockIP(ip);
      
      return true;
    } catch (error) {
      console.error('Failed to block IP:', error);
      return false;
    }
  }

  private async applyRateLimit(ip: string, event: SecurityEvent): Promise<boolean> {
    try {
      console.warn(`SECURITY ACTION: Applying strict rate limit to IP ${ip}`);
      
      // This would integrate with your rate limiting service
      // await this.rateLimitService.restrictIP(ip);
      
      return true;
    } catch (error) {
      console.error('Failed to apply rate limit:', error);
      return false;
    }
  }

  private async alertAdmin(event: SecurityEvent, rule: AlertRule): Promise<boolean> {
    try {
      const alert = {
        title: `🚨 Security Alert: ${rule.name}`,
        message: `${event.description}\n\nSeverity: ${event.severity}\nSource: ${event.source}\nTime: ${event.timestamp}`,
        event: event,
        rule: rule.name
      };

      // Send to admin notification channels
      console.error('ADMIN ALERT:', alert);
      
      // In production, send to Slack, email, PagerDuty, etc.
      await this.sendToWebhook('admin_alerts', alert);
      
      return true;
    } catch (error) {
      console.error('Failed to send admin alert:', error);
      return false;
    }
  }

  private async logSecurityEvent(event: SecurityEvent): Promise<boolean> {
    try {
      // In production, send to SIEM, log aggregation service, etc.
      console.log('SECURITY EVENT LOGGED:', {
        id: event.id,
        timestamp: event.timestamp,
        type: event.type,
        severity: event.severity,
        source: event.source,
        description: event.description
      });
      
      // Send to external logging service
      await this.sendToWebhook('security_logs', event);
      
      return true;
    } catch (error) {
      console.error('Failed to log security event:', error);
      return false;
    }
  }

  private async quarantineSource(source: string, event: SecurityEvent): Promise<boolean> {
    try {
      console.warn(`SECURITY ACTION: Quarantining source ${source}`);
      
      // In production, this would isolate the source from sensitive resources
      // await this.accessControlService.quarantine(source);
      
      return true;
    } catch (error) {
      console.error('Failed to quarantine source:', error);
      return false;
    }
  }

  private async notifyUser(event: SecurityEvent): Promise<boolean> {
    try {
      // Notify affected users about security events
      console.log(`SECURITY NOTIFICATION: Notifying user about ${event.description}`);
      
      return true;
    } catch (error) {
      console.error('Failed to notify user:', error);
      return false;
    }
  }

  private async sendToWebhook(endpoint: string, data: any): Promise<void> {
    const url = this.webhookEndpoints.get(endpoint);
    if (!url) return;

    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.warn(`Failed to send to webhook ${endpoint}:`, error);
    }
  }

  private logEvent(event: SecurityEvent): void {
    const logLevel = this.getLogLevel(event.severity);
    const logMessage = `[${event.type.toUpperCase()}] ${event.description} (${event.source})`;
    
    switch (logLevel) {
      case 'error':
        console.error(logMessage, event.metadata);
        break;
      case 'warn':
        console.warn(logMessage, event.metadata);
        break;
      case 'info':
        console.info(logMessage, event.metadata);
        break;
      default:
        console.log(logMessage, event.metadata);
    }
  }

  private getLogLevel(severity: string): 'error' | 'warn' | 'info' | 'debug' {
    switch (severity) {
      case 'critical':
      case 'high':
        return 'error';
      case 'medium':
        return 'warn';
      case 'low':
        return 'info';
      default:
        return 'debug';
    }
  }

  private aggregateMetrics(): void {
    if (this.metricsBuffer.length === 0) return;

    const metrics = this.calculateMetrics();
    
    // In production, send to monitoring service
    console.log('Security Metrics:', metrics);
    
    // Reset buffer after aggregation
    this.metricsBuffer = [];
  }

  private calculateMetrics(): SecurityMetrics {
    const events = Array.from(this.events.values());
    const now = Date.now();

    const eventsBySeverity: Record<string, number> = {
      low: 0,
      medium: 0,
      high: 0,
      critical: 0
    };

    const eventsByType: Record<string, number> = {
      threat: 0,
      violation: 0,
      breach: 0,
      anomaly: 0,
      compliance: 0
    };

    const responseTimes: number[] = [];
    let activeIncidents = 0;
    let resolvedIncidents = 0;
    let totalResolutionTime = 0;

    events.forEach(event => {
      eventsBySeverity[event.severity]++;
      eventsByType[event.type]++;

      if (event.resolved) {
        resolvedIncidents++;
        if (event.resolvedAt) {
          const resolutionTime = new Date(event.resolvedAt).getTime() - new Date(event.timestamp).getTime();
          totalResolutionTime += resolutionTime;
          responseTimes.push(resolutionTime);
        }
      } else if (event.severity === 'high' || event.severity === 'critical') {
        activeIncidents++;
      }
    });

    // Calculate response time statistics
    responseTimes.sort((a, b) => a - b);
    const average = responseTimes.length > 0 
      ? responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length 
      : 0;
    const median = responseTimes.length > 0 
      ? responseTimes[Math.floor(responseTimes.length / 2)] 
      : 0;
    const p95 = responseTimes.length > 0 
      ? responseTimes[Math.floor(responseTimes.length * 0.95)] 
      : 0;

    const mttr = resolvedIncidents > 0 
      ? totalResolutionTime / resolvedIncidents / (1000 * 60) // Convert to minutes
      : 0;

    return {
      totalEvents: events.length,
      eventsBySeverity,
      eventsByType,
      responseTime: {
        average: Math.round(average / 1000), // Convert to seconds
        median: Math.round(median / 1000),
        p95: Math.round(p95 / 1000)
      },
      incidentStats: {
        active: activeIncidents,
        resolved: resolvedIncidents,
        mttr: Math.round(mttr)
      }
    };
  }

  private cleanupOldEvents(): void {
    const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    let deletedCount = 0;

    for (const [id, event] of this.events.entries()) {
      const eventTime = new Date(event.timestamp).getTime();
      if (eventTime < sevenDaysAgo || this.events.size > this.maxEvents) {
        this.events.delete(id);
        deletedCount++;
      }
    }

    if (deletedCount > 0) {
      console.log(`Cleaned up ${deletedCount} old security events`);
    }
  }

  // Public API methods
  public async resolveEvent(eventId: string): Promise<boolean> {
    const event = this.events.get(eventId);
    if (!event) return false;

    event.resolved = true;
    event.resolvedAt = new Date().toISOString();
    this.events.set(eventId, event);

    return true;
  }

  public getEvent(eventId: string): SecurityEvent | undefined {
    return this.events.get(eventId);
  }

  public getEvents(filter?: {
    type?: string;
    severity?: string;
    resolved?: boolean;
    source?: string;
    limit?: number;
  }): SecurityEvent[] {
    let events = Array.from(this.events.values());

    if (filter) {
      if (filter.type) events = events.filter(e => e.type === filter.type);
      if (filter.severity) events = events.filter(e => e.severity === filter.severity);
      if (filter.resolved !== undefined) events = events.filter(e => e.resolved === filter.resolved);
      if (filter.source) events = events.filter(e => e.source === filter.source);
    }

    // Sort by timestamp descending
    events.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    if (filter?.limit) {
      events = events.slice(0, filter.limit);
    }

    return events;
  }

  public getMetrics(): SecurityMetrics {
    return this.calculateMetrics();
  }

  public addWebhook(name: string, url: string): void {
    this.webhookEndpoints.set(name, url);
  }

  public removeWebhook(name: string): boolean {
    return this.webhookEndpoints.delete(name);
  }

  public updateAlertRule(ruleId: string, updates: Partial<AlertRule>): boolean {
    const rule = this.alertRules.get(ruleId);
    if (!rule) return false;

    Object.assign(rule, updates);
    this.alertRules.set(ruleId, rule);
    return true;
  }

  public getAlertRules(): AlertRule[] {
    return Array.from(this.alertRules.values());
  }
}

// Export singleton instance
export const securityMonitoring = new SecurityMonitoringService();

// Export types
export type {
  SecurityEvent,
  ResponseAction,
  AlertRule,
  SecurityMetrics
};