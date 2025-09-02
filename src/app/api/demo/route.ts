import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { DatabaseService } from '@/lib/database';
import { EmailService } from '@/lib/email';
import { demoApiRateLimit, SecurityValidator } from '@/lib/rate-limit';

const demoRequestSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email().max(254),
  phone: z.string().min(10).max(20),
  company: z.string().min(2).max(100),
  jobTitle: z.string().min(2).max(100),
  companySize: z.enum(['1-50', '51-200', '201-1000', '1000+']),
  industry: z.enum([
    'petroleum-trading',
    'depot-operations',
    'vessel-management',
    'banking-integration',
    'financial-services',
    'other'
  ]),
  currentSoftware: z.string().max(100).optional(),
  challenges: z.string().min(10).max(2000),
  preferredDate: z.string(),
  preferredTime: z.enum(['morning', 'afternoon', 'flexible']),
  additionalNotes: z.string().max(1000).optional(),
  consent: z.boolean().refine(val => val === true),
});

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  let responseStatus = 200;
  let errorMessage = '';

  try {
    // Get client information for security and logging
    const clientInfo = SecurityValidator.getClientInfo(request);

    // Rate limiting
    const rateLimitResult = await demoApiRateLimit.check(request);
    if (!rateLimitResult.allowed) {
      responseStatus = 429;
      errorMessage = 'Rate limit exceeded';
      
      await DatabaseService.logApiUsage({
        endpoint: '/api/demo',
        method: 'POST',
        ipAddress: clientInfo.ip,
        userAgent: clientInfo.userAgent,
        status: 429,
        responseTime: Date.now() - startTime,
        error: 'Rate limit exceeded',
      });

      return NextResponse.json(
        {
          success: false,
          message: 'Too many requests. Please try again in 15 minutes.',
          retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000),
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    
    // Additional security validation
    const securityValidation = SecurityValidator.validateDemoRequest(body);
    if (!securityValidation.valid) {
      responseStatus = 400;
      errorMessage = `Security validation failed: ${securityValidation.errors.join(', ')}`;
      
      await DatabaseService.logApiUsage({
        endpoint: '/api/demo',
        method: 'POST',
        ipAddress: clientInfo.ip,
        userAgent: clientInfo.userAgent,
        status: 400,
        responseTime: Date.now() - startTime,
        error: errorMessage,
      });

      return NextResponse.json(
        {
          success: false,
          message: 'Invalid request data',
          errors: securityValidation.errors,
        },
        { status: 400 }
      );
    }

    // Schema validation
    const validatedData = demoRequestSchema.parse(body);
    
    // Generate unique request ID with collision-resistant format
    const requestId = `demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Production logging with structured data
    console.log(`[DEMO_REQUEST] Processing new request`, {
      requestId,
      company: validatedData.company,
      email: validatedData.email,
      industry: validatedData.industry,
      timestamp: new Date().toISOString(),
      ip: clientInfo.ip,
    });
    
    // Save to database with transaction support
    const demoRequest = await DatabaseService.createDemoRequest({
      requestId,
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email,
      phone: validatedData.phone,
      company: validatedData.company,
      jobTitle: validatedData.jobTitle,
      companySize: validatedData.companySize,
      industry: validatedData.industry,
      currentSoftware: validatedData.currentSoftware,
      challenges: validatedData.challenges,
      additionalNotes: validatedData.additionalNotes,
      preferredDate: validatedData.preferredDate,
      preferredTime: validatedData.preferredTime,
      ipAddress: clientInfo.ip,
      userAgent: clientInfo.userAgent,
    });

    console.log(`[DEMO_REQUEST] Successfully saved to database`, {
      requestId,
      databaseId: demoRequest.id,
      company: validatedData.company,
    });

    // Send emails concurrently
    const [customerEmailResult, salesEmailResult] = await Promise.allSettled([
      EmailService.sendDemoConfirmationEmail(validatedData, requestId, demoRequest.id),
      EmailService.sendSalesTeamNotification(validatedData, requestId, demoRequest.id),
    ]);

    // Log email results with production-grade logging
    if (customerEmailResult.status === 'fulfilled') {
      console.log(`[EMAIL_SERVICE] Customer confirmation sent`, {
        requestId,
        recipient: validatedData.email,
        status: 'success',
      });
    } else {
      console.error(`[EMAIL_SERVICE] Customer confirmation failed`, {
        requestId,
        recipient: validatedData.email,
        error: customerEmailResult.reason,
        status: 'failed',
      });
    }

    if (salesEmailResult.status === 'fulfilled') {
      console.log(`[EMAIL_SERVICE] Sales notification sent`, {
        requestId,
        status: 'success',
      });
    } else {
      console.error(`[EMAIL_SERVICE] Sales notification failed`, {
        requestId,
        error: salesEmailResult.reason,
        status: 'failed',
      });
    }

    // Log successful API usage
    await DatabaseService.logApiUsage({
      endpoint: '/api/demo',
      method: 'POST',
      ipAddress: clientInfo.ip,
      userAgent: clientInfo.userAgent,
      status: 200,
      responseTime: Date.now() - startTime,
    });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Demo request submitted successfully',
        requestId,
        data: {
          id: demoRequest.id,
          requestId: demoRequest.requestId,
          createdAt: demoRequest.createdAt,
          emailStatus: {
            customerEmail: customerEmailResult.status === 'fulfilled' ? 'sent' : 'failed',
            salesEmail: salesEmailResult.status === 'fulfilled' ? 'sent' : 'failed',
          },
        },
      },
      { 
        status: 200,
        headers: {
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': (rateLimitResult.remaining - 1).toString(),
          'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
        },
      }
    );

  } catch (error) {
    console.error('[DEMO_REQUEST] API error occurred', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    });
    
    responseStatus = 500;
    if (error instanceof z.ZodError) {
      responseStatus = 400;
      errorMessage = `Validation error: ${error.errors.map(e => e.message).join(', ')}`;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = 'Unknown error occurred';
    }

    // Log error
    const clientInfo = SecurityValidator.getClientInfo(request);
    await DatabaseService.logApiUsage({
      endpoint: '/api/demo',
      method: 'POST',
      ipAddress: clientInfo.ip,
      userAgent: clientInfo.userAgent,
      status: responseStatus,
      responseTime: Date.now() - startTime,
      error: errorMessage,
    });
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid input data',
          errors: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to process demo request. Please try again.',
        ...(process.env.NODE_ENV === 'development' && { 
          error: error instanceof Error ? error.message : 'Unknown error' 
        }),
      },
      { status: responseStatus }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Basic API info endpoint
    const clientInfo = SecurityValidator.getClientInfo(request);
    
    await DatabaseService.logApiUsage({
      endpoint: '/api/demo',
      method: 'GET',
      ipAddress: clientInfo.ip,
      userAgent: clientInfo.userAgent,
      status: 200,
    });

    return NextResponse.json(
      {
        service: 'OilFlow BIDEC Demo API',
        version: '1.0.0',
        status: 'operational',
        endpoints: {
          'POST /api/demo': 'Submit demo request',
          'GET /api/demo': 'API information',
        },
        rateLimit: {
          windowMs: 15 * 60 * 1000, // 15 minutes
          maxRequests: 5,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[DEMO_API] GET endpoint error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function HEAD() {
  return new Response(null, { status: 200 });
}