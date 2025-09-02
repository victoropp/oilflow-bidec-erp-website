import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { securityMonitoring } from '@/lib/security/monitoring';

// Validation schema for security events
const securityEventSchema = z.object({
  type: z.enum(['threat', 'violation', 'breach', 'anomaly', 'compliance']),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  source: z.string().min(1),
  description: z.string().min(1),
  metadata: z.record(z.any()).optional().default({})
});

const querySchema = z.object({
  type: z.string().optional(),
  severity: z.string().optional(),
  resolved: z.string().transform(val => val === 'true').optional(),
  source: z.string().optional(),
  limit: z.string().transform(val => parseInt(val, 10)).optional()
});

export async function POST(request: NextRequest) {
  try {
    // Get client information
    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     '127.0.0.1';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Parse request body
    const body = await request.json();
    const validatedData = securityEventSchema.parse(body);

    // Add client information to metadata
    const eventData = {
      ...validatedData,
      source: validatedData.source || clientIP,
      metadata: {
        ...validatedData.metadata,
        clientIP,
        userAgent,
        requestTime: new Date().toISOString(),
        endpoint: request.nextUrl.pathname
      }
    };

    // Record the security event
    const eventId = await securityMonitoring.recordEvent(eventData);

    return NextResponse.json(
      {
        success: true,
        eventId,
        message: 'Security event recorded successfully'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Security log API error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid security event data',
          errors: error.errors
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to record security event'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());
    const validatedQuery = querySchema.parse(queryParams);

    // Get security events
    const events = securityMonitoring.getEvents(validatedQuery);

    // Get security metrics
    const metrics = securityMonitoring.getMetrics();

    return NextResponse.json(
      {
        success: true,
        data: {
          events: events.map(event => ({
            id: event.id,
            timestamp: event.timestamp,
            type: event.type,
            severity: event.severity,
            source: event.source,
            description: event.description,
            resolved: event.resolved,
            resolvedAt: event.resolvedAt,
            responseActions: event.responseActions.length
          })),
          metrics,
          total: events.length
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Security log query error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid query parameters',
          errors: error.errors
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to retrieve security events'
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventId, action } = body;

    if (!eventId || !action) {
      return NextResponse.json(
        {
          success: false,
          message: 'Event ID and action are required'
        },
        { status: 400 }
      );
    }

    let success = false;

    switch (action) {
      case 'resolve':
        success = await securityMonitoring.resolveEvent(eventId);
        break;
      default:
        return NextResponse.json(
          {
            success: false,
            message: 'Invalid action'
          },
          { status: 400 }
        );
    }

    if (success) {
      return NextResponse.json(
        {
          success: true,
          message: 'Event updated successfully'
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to update event'
        },
        { status: 404 }
      );
    }

  } catch (error) {
    console.error('Security log update error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update security event'
      },
      { status: 500 }
    );
  }
}