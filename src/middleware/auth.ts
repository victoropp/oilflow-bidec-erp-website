import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Logger from '@/lib/logger';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'sales' | 'user';
}

export class AuthMiddleware {
  static async validateSession(request: NextRequest): Promise<AuthUser | null> {
    try {
      const session = await getServerSession(authOptions);
      
      if (!session?.user) {
        Logger.warn('Unauthorized access attempt', {
          endpoint: request.url,
          method: request.method,
          ip: request.headers.get('x-forwarded-for') || 'unknown',
        });
        return null;
      }

      return {
        id: (session.user as any).id || '',
        email: session.user.email || '',
        name: session.user.name || '',
        role: (session.user as any).role || 'user',
      };
    } catch (error) {
      Logger.error('Session validation error', error, {
        endpoint: request.url,
        method: request.method,
      });
      return null;
    }
  }

  static async requireAuth(request: NextRequest): Promise<AuthUser | NextResponse> {
    const user = await this.validateSession(request);
    
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Authentication required',
          error: 'UNAUTHORIZED',
        },
        { status: 401 }
      );
    }

    return user;
  }

  static async requireRole(
    request: NextRequest, 
    allowedRoles: string[]
  ): Promise<AuthUser | NextResponse> {
    const user = await this.requireAuth(request);
    
    if (user instanceof NextResponse) {
      return user;
    }

    if (!allowedRoles.includes(user.role)) {
      Logger.warn('Insufficient permissions', {
        userId: user.id,
        userRole: user.role,
        requiredRoles: allowedRoles,
        endpoint: request.url,
      });

      return NextResponse.json(
        {
          success: false,
          message: 'Insufficient permissions',
          error: 'FORBIDDEN',
        },
        { status: 403 }
      );
    }

    return user;
  }

  static async requireAdmin(request: NextRequest): Promise<AuthUser | NextResponse> {
    return this.requireRole(request, ['admin']);
  }

  static async requireSalesOrAdmin(request: NextRequest): Promise<AuthUser | NextResponse> {
    return this.requireRole(request, ['admin', 'sales']);
  }
}