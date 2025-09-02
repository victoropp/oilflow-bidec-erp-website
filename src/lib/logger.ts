import winston from 'winston';
import { DatabaseService } from './database';

// Create Winston logger
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'oilflow-demo-api' },
  transports: [
    // Error logs
    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 10,
    }),
    // Combined logs
    new winston.transports.File({ 
      filename: 'logs/combined.log',
      maxsize: 5242880, // 5MB
      maxFiles: 10,
    }),
  ],
});

// Add console transport for development
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

export interface LogContext {
  requestId?: string;
  userId?: string;
  ip?: string;
  userAgent?: string;
  endpoint?: string;
  method?: string;
  responseTime?: number;
  statusCode?: number;
  [key: string]: any;
}

export class Logger {
  static info(message: string, context: LogContext = {}) {
    logger.info(message, { ...context, timestamp: new Date().toISOString() });
  }

  static warn(message: string, context: LogContext = {}) {
    logger.warn(message, { ...context, timestamp: new Date().toISOString() });
  }

  static error(message: string, error?: Error | unknown, context: LogContext = {}) {
    const errorInfo = error instanceof Error 
      ? { error: error.message, stack: error.stack }
      : { error: String(error) };
    
    logger.error(message, { 
      ...context, 
      ...errorInfo,
      timestamp: new Date().toISOString() 
    });
  }

  static debug(message: string, context: LogContext = {}) {
    logger.debug(message, { ...context, timestamp: new Date().toISOString() });
  }

  // Specialized logging methods
  static async logDemoRequest(data: {
    requestId: string;
    email: string;
    company: string;
    industry: string;
    ip?: string;
    userAgent?: string;
    success: boolean;
    responseTime?: number;
    error?: string;
  }) {
    const message = data.success 
      ? `Demo request submitted successfully: ${data.requestId}`
      : `Demo request failed: ${data.requestId}`;

    const context: LogContext = {
      requestId: data.requestId,
      email: data.email,
      company: data.company,
      industry: data.industry,
      ip: data.ip,
      userAgent: data.userAgent,
      responseTime: data.responseTime,
      endpoint: '/api/demo',
      method: 'POST',
      statusCode: data.success ? 200 : 500,
    };

    if (data.success) {
      this.info(message, context);
    } else {
      this.error(message, data.error, context);
    }
  }

  static async logEmailSent(data: {
    type: 'confirmation' | 'sales_notification' | 'reminder';
    recipient: string;
    requestId?: string;
    success: boolean;
    provider: string;
    providerId?: string;
    error?: string;
  }) {
    const message = data.success
      ? `Email sent successfully: ${data.type} to ${data.recipient}`
      : `Email failed: ${data.type} to ${data.recipient}`;

    const context: LogContext = {
      emailType: data.type,
      recipient: data.recipient,
      requestId: data.requestId,
      provider: data.provider,
      providerId: data.providerId,
    };

    if (data.success) {
      this.info(message, context);
    } else {
      this.error(message, data.error, context);
    }
  }

  static logRateLimit(data: {
    ip: string;
    endpoint: string;
    method: string;
    remaining: number;
    resetTime: Date;
  }) {
    this.warn(`Rate limit hit: ${data.ip}`, {
      ip: data.ip,
      endpoint: data.endpoint,
      method: data.method,
      remaining: data.remaining,
      resetTime: data.resetTime.toISOString(),
    });
  }

  static logSecurityViolation(data: {
    ip: string;
    userAgent?: string;
    endpoint: string;
    method: string;
    violation: string;
    data?: any;
  }) {
    this.warn(`Security violation detected: ${data.violation}`, {
      ip: data.ip,
      userAgent: data.userAgent,
      endpoint: data.endpoint,
      method: data.method,
      violation: data.violation,
      suspiciousData: data.data,
    });
  }

  static logPerformanceMetric(data: {
    operation: string;
    duration: number;
    success: boolean;
    context?: any;
  }) {
    const message = `Performance metric: ${data.operation} took ${data.duration}ms`;
    
    if (data.duration > 5000) { // Slow operation (>5s)
      this.warn(message, {
        operation: data.operation,
        duration: data.duration,
        success: data.success,
        slow: true,
        ...data.context,
      });
    } else {
      this.debug(message, {
        operation: data.operation,
        duration: data.duration,
        success: data.success,
        ...data.context,
      });
    }
  }

  // Database health check
  static async logDatabaseHealth() {
    try {
      const startTime = Date.now();
      // Simple database ping
      await DatabaseService.getDemoRequests({ limit: 1 });
      const responseTime = Date.now() - startTime;
      
      this.info(`Database health check passed`, {
        responseTime,
        status: 'healthy',
      });
    } catch (error) {
      this.error('Database health check failed', error, {
        status: 'unhealthy',
      });
    }
  }

  // API health metrics
  static getHealthMetrics() {
    return {
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      timestamp: new Date().toISOString(),
      nodeVersion: process.version,
      environment: process.env.NODE_ENV,
    };
  }
}

// Error handling middleware
export function createErrorHandler() {
  return (error: Error, req: any, res: any, next: any) => {
    Logger.error('Unhandled error', error, {
      url: req.url,
      method: req.method,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
    });
    
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && {
          error: error.message,
          stack: error.stack,
        }),
      });
    }
    
    next(error);
  };
}

// Graceful shutdown handler
export function setupGracefulShutdown() {
  const gracefulShutdown = (signal: string) => {
    Logger.info(`Received ${signal}, starting graceful shutdown`);
    
    // Close database connections, cleanup, etc.
    setTimeout(() => {
      Logger.info('Graceful shutdown completed');
      process.exit(0);
    }, 10000); // 10 second timeout
  };

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
}

export default Logger;