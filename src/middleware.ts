import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/security/rateLimit';
import { securityHeaders } from '@/lib/security/headers';
import { threatDetection } from '@/lib/security/threatDetection';
import { geoBlocking } from '@/lib/security/geoBlocking';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const clientIP = request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   '127.0.0.1';
  const userAgent = request.headers.get('user-agent') || '';
  const origin = request.headers.get('origin') || '';
  const referer = request.headers.get('referer') || '';

  try {
    // 1. Security Headers
    const secureResponse = securityHeaders.apply(response, request);

    // 2. Rate Limiting
    const rateLimitResult = await rateLimit.check(clientIP, request.nextUrl.pathname);
    if (!rateLimitResult.allowed) {
      return new NextResponse(
        JSON.stringify({
          error: 'Rate limit exceeded',
          retryAfter: rateLimitResult.resetTime
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': rateLimitResult.resetTime?.toString() || '60',
            'X-RateLimit-Limit': rateLimitResult.limit?.toString() || '100',
            'X-RateLimit-Remaining': rateLimitResult.remaining?.toString() || '0',
          },
        }
      );
    }

    // 3. Threat Detection
    const threatResult = await threatDetection.analyze({
      ip: clientIP,
      userAgent,
      path: request.nextUrl.pathname,
      method: request.method,
      origin,
      referer,
      headers: Object.fromEntries(request.headers.entries())
    });

    if (threatResult.blocked) {
      // Log security event
      console.warn('Security threat detected:', {
        ip: clientIP,
        threat: threatResult.threat,
        severity: threatResult.severity,
        timestamp: new Date().toISOString()
      });

      return new NextResponse(
        JSON.stringify({
          error: 'Access denied',
          code: 'SECURITY_THREAT_DETECTED'
        }),
        {
          status: 403,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // 4. Geographic Blocking (if enabled)
    const geoResult = await geoBlocking.check(clientIP);
    if (geoResult.blocked) {
      return new NextResponse(
        JSON.stringify({
          error: 'Access not available in your region',
          code: 'GEO_BLOCKED'
        }),
        {
          status: 451, // Unavailable For Legal Reasons
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // 5. API Route Protection
    if (request.nextUrl.pathname.startsWith('/api/')) {
      return handleAPIProtection(request, secureResponse);
    }

    // 6. Static Asset Protection
    if (request.nextUrl.pathname.match(/\.(js|css|json|txt)$/)) {
      return handleAssetProtection(request, secureResponse);
    }

    return secureResponse;

  } catch (error) {
    console.error('Middleware error:', error);
    
    // Fail securely - allow request but log error
    return NextResponse.next();
  }
}

async function handleAPIProtection(request: NextRequest, response: NextResponse): Promise<NextResponse> {
  const apiKey = request.headers.get('x-api-key');
  const authToken = request.headers.get('authorization');
  const contentType = request.headers.get('content-type');

  // Enhanced API validation for sensitive endpoints
  if (request.nextUrl.pathname.startsWith('/api/demo') || 
      request.nextUrl.pathname.startsWith('/api/contact')) {
    
    // Validate content type for POST requests
    if (request.method === 'POST' && !contentType?.includes('application/json')) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid content type' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check for required headers
    const requiredHeaders = ['user-agent', 'accept'];
    for (const header of requiredHeaders) {
      if (!request.headers.get(header)) {
        return new NextResponse(
          JSON.stringify({ error: 'Missing required headers' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // Add request ID for tracking
    response.headers.set('x-request-id', crypto.randomUUID());
  }

  // Chatbot API protection
  if (request.nextUrl.pathname.startsWith('/api/chatbot')) {
    const sessionId = request.headers.get('x-session-id');
    if (!sessionId) {
      return new NextResponse(
        JSON.stringify({ error: 'Session ID required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate session format
    if (!/^[a-zA-Z0-9_-]+$/.test(sessionId) || sessionId.length < 8) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid session format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }

  return response;
}

async function handleAssetProtection(request: NextRequest, response: NextResponse): Promise<NextResponse> {
  // Prevent direct access to sensitive files
  const sensitivePatterns = [
    /\.env/,
    /config\./,
    /secret/,
    /private/,
    /api-key/,
    /database/
  ];

  const pathname = request.nextUrl.pathname.toLowerCase();
  if (sensitivePatterns.some(pattern => pattern.test(pathname))) {
    return new NextResponse('Not Found', { status: 404 });
  }

  // Add cache headers for static assets
  if (pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  // Prevent hotlinking for images
  const referer = request.headers.get('referer');
  if (pathname.match(/\.(png|jpg|jpeg|gif|svg)$/) && referer) {
    const refererHost = new URL(referer).hostname;
    const requestHost = request.nextUrl.hostname;
    
    if (refererHost !== requestHost && !isAllowedDomain(refererHost)) {
      return new NextResponse('Forbidden', { status: 403 });
    }
  }

  return response;
}

function isAllowedDomain(domain: string): boolean {
  const allowedDomains = [
    'localhost',
    'oilflow.bidec.com',
    'bidec.com',
    process.env.NEXT_PUBLIC_DOMAIN
  ].filter(Boolean);

  return allowedDomains.includes(domain);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Include API routes and all pages
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
    '/api/:path*'
  ],
};