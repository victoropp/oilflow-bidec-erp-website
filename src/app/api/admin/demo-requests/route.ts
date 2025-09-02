import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { DatabaseService, prisma } from '@/lib/database';
import { AuthMiddleware } from '@/middleware/auth';
import Logger from '@/lib/logger';
import { z } from 'zod';

// Validation schemas
const getRequestsSchema = z.object({
  status: z.enum(['all', 'pending', 'contacted', 'scheduled', 'completed', 'cancelled']).optional(),
  industry: z.string().optional(),
  companySize: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  search: z.string().optional(),
  limit: z.string().optional(),
  offset: z.string().optional(),
  sortBy: z.enum(['createdAt', 'preferredDate', 'company', 'status']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

const updateRequestSchema = z.object({
  requestId: z.string(),
  status: z.enum(['pending', 'contacted', 'scheduled', 'completed', 'cancelled']),
  notes: z.string().optional(),
});

// GET - Fetch all demo requests with advanced filtering
export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Authentication
    const authResult = await AuthMiddleware.requireSalesOrAdmin(request);
    if (authResult instanceof NextResponse) return authResult;
    const user = authResult;

    // Parse and validate query parameters
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams.entries());
    
    const validation = getRequestsSchema.safeParse(params);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid query parameters',
          errors: validation.error.errors,
        },
        { status: 400 }
      );
    }

    const filters = validation.data;

    // Build database query
    const where: any = {};
    
    if (filters.status && filters.status !== 'all') {
      where.status = filters.status;
    }
    
    if (filters.industry && filters.industry !== 'all') {
      where.industry = filters.industry;
    }
    
    if (filters.companySize && filters.companySize !== 'all') {
      where.companySize = filters.companySize;
    }
    
    if (filters.dateFrom || filters.dateTo) {
      where.createdAt = {};
      if (filters.dateFrom) where.createdAt.gte = new Date(filters.dateFrom);
      if (filters.dateTo) where.createdAt.lte = new Date(filters.dateTo);
    }
    
    if (filters.search) {
      where.OR = [
        { firstName: { contains: filters.search, mode: 'insensitive' } },
        { lastName: { contains: filters.search, mode: 'insensitive' } },
        { email: { contains: filters.search, mode: 'insensitive' } },
        { company: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    // Execute query with pagination
    const limit = filters.limit ? parseInt(filters.limit) : 50;
    const offset = filters.offset ? parseInt(filters.offset) : 0;
    const sortBy = filters.sortBy || 'createdAt';
    const sortOrder = filters.sortOrder || 'desc';

    const [demoRequests, total] = await Promise.all([
      prisma.demoRequest.findMany({
        where,
        include: {
          emailLogs: {
            orderBy: { sentAt: 'desc' },
            take: 5,
          },
        },
        orderBy: { [sortBy]: sortOrder },
        take: limit,
        skip: offset,
      }),
      prisma.demoRequest.count({ where }),
    ]);

    // Calculate statistics
    const stats = await prisma.demoRequest.groupBy({
      by: ['status'],
      _count: true,
    });

    const statsMap = stats.reduce((acc, stat) => {
      acc[stat.status] = stat._count;
      return acc;
    }, {} as Record<string, number>);

    // Log successful access
    Logger.info('Admin accessed demo requests', {
      userId: user.id,
      userRole: user.role,
      requestCount: demoRequests.length,
      filters: filters,
      responseTime: Date.now() - startTime,
    });

    return NextResponse.json({
      success: true,
      data: demoRequests,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + demoRequests.length < total,
      },
      statistics: {
        total,
        pending: statsMap['pending'] || 0,
        contacted: statsMap['contacted'] || 0,
        scheduled: statsMap['scheduled'] || 0,
        completed: statsMap['completed'] || 0,
        cancelled: statsMap['cancelled'] || 0,
      },
    });

  } catch (error) {
    Logger.error('Admin demo requests API error', error, {
      endpoint: '/api/admin/demo-requests',
      method: 'GET',
      responseTime: Date.now() - startTime,
    });

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch demo requests',
        error: process.env.NODE_ENV === 'development' ? String(error) : undefined,
      },
      { status: 500 }
    );
  }
}

// PUT - Update demo request status
export async function PUT(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Authentication
    const authResult = await AuthMiddleware.requireSalesOrAdmin(request);
    if (authResult instanceof NextResponse) return authResult;
    const user = authResult;

    // Parse and validate body
    const body = await request.json();
    const validation = updateRequestSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid request data',
          errors: validation.error.errors,
        },
        { status: 400 }
      );
    }

    const { requestId, status, notes } = validation.data;

    // Check if request exists
    const existingRequest = await prisma.demoRequest.findUnique({
      where: { requestId },
    });

    if (!existingRequest) {
      return NextResponse.json(
        {
          success: false,
          message: 'Demo request not found',
          error: 'NOT_FOUND',
        },
        { status: 404 }
      );
    }

    // Update the request
    const updateData: any = { 
      status,
      updatedAt: new Date(),
    };
    
    // Add timestamp fields based on status
    switch (status) {
      case 'contacted':
        if (!existingRequest.contactedAt) {
          updateData.contactedAt = new Date();
        }
        break;
      case 'scheduled':
        if (!existingRequest.scheduledAt) {
          updateData.scheduledAt = new Date();
        }
        break;
      case 'completed':
        if (!existingRequest.completedAt) {
          updateData.completedAt = new Date();
        }
        break;
    }
    
    // Add follow-up notes if provided
    if (notes) {
      updateData.followUpNotes = existingRequest.followUpNotes 
        ? `${existingRequest.followUpNotes}\n\n[${new Date().toISOString()}] ${user.name}: ${notes}`
        : `[${new Date().toISOString()}] ${user.name}: ${notes}`;
    }

    const updatedRequest = await prisma.demoRequest.update({
      where: { requestId },
      data: updateData,
      include: {
        emailLogs: {
          orderBy: { sentAt: 'desc' },
          take: 5,
        },
      },
    });

    // Log the update
    Logger.info('Demo request status updated', {
      userId: user.id,
      userRole: user.role,
      requestId,
      oldStatus: existingRequest.status,
      newStatus: status,
      notes: notes ? 'included' : 'none',
      responseTime: Date.now() - startTime,
    });

    return NextResponse.json({
      success: true,
      data: updatedRequest,
      message: `Demo request status updated to ${status}`,
    });

  } catch (error) {
    Logger.error('Admin demo request update error', error, {
      endpoint: '/api/admin/demo-requests',
      method: 'PUT',
      responseTime: Date.now() - startTime,
    });

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update demo request',
        error: process.env.NODE_ENV === 'development' ? String(error) : undefined,
      },
      { status: 500 }
    );
  }
}

// POST - Get detailed view of a single demo request
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Authentication
    const authResult = await AuthMiddleware.requireSalesOrAdmin(request);
    if (authResult instanceof NextResponse) return authResult;
    const user = authResult;

    // Parse body
    const body = await request.json();
    const { requestId } = body;

    if (!requestId) {
      return NextResponse.json(
        {
          success: false,
          message: 'Request ID is required',
          error: 'VALIDATION_ERROR',
        },
        { status: 400 }
      );
    }

    // Get demo request with all related data
    const demoRequest = await prisma.demoRequest.findUnique({
      where: { requestId },
      include: {
        emailLogs: {
          orderBy: { sentAt: 'desc' },
        },
      },
    });

    if (!demoRequest) {
      return NextResponse.json(
        {
          success: false,
          message: 'Demo request not found',
          error: 'NOT_FOUND',
        },
        { status: 404 }
      );
    }

    // Get API usage for this request
    const apiUsage = await prisma.apiUsage.findMany({
      where: {
        endpoint: '/api/demo',
        ipAddress: demoRequest.ipAddress || '',
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    // Log access
    Logger.info('Demo request details accessed', {
      userId: user.id,
      userRole: user.role,
      requestId,
      responseTime: Date.now() - startTime,
    });

    return NextResponse.json({
      success: true,
      data: {
        ...demoRequest,
        apiUsage,
      },
    });

  } catch (error) {
    Logger.error('Admin demo request detail error', error, {
      endpoint: '/api/admin/demo-requests',
      method: 'POST',
      responseTime: Date.now() - startTime,
    });

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch demo request details',
        error: process.env.NODE_ENV === 'development' ? String(error) : undefined,
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete a demo request (admin only)
export async function DELETE(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Authentication - Admin only
    const authResult = await AuthMiddleware.requireAdmin(request);
    if (authResult instanceof NextResponse) return authResult;
    const user = authResult;

    // Parse body
    const body = await request.json();
    const { requestId } = body;

    if (!requestId) {
      return NextResponse.json(
        {
          success: false,
          message: 'Request ID is required',
          error: 'VALIDATION_ERROR',
        },
        { status: 400 }
      );
    }

    // Check if request exists
    const existingRequest = await prisma.demoRequest.findUnique({
      where: { requestId },
    });

    if (!existingRequest) {
      return NextResponse.json(
        {
          success: false,
          message: 'Demo request not found',
          error: 'NOT_FOUND',
        },
        { status: 404 }
      );
    }

    // Delete related email logs first
    await prisma.emailLog.deleteMany({
      where: { demoRequestId: existingRequest.id },
    });

    // Delete the demo request
    await prisma.demoRequest.delete({
      where: { requestId },
    });

    // Log the deletion
    Logger.warn('Demo request deleted', {
      userId: user.id,
      userRole: user.role,
      requestId,
      deletedCompany: existingRequest.company,
      deletedEmail: existingRequest.email,
      responseTime: Date.now() - startTime,
    });

    return NextResponse.json({
      success: true,
      message: 'Demo request deleted successfully',
    });

  } catch (error) {
    Logger.error('Admin demo request delete error', error, {
      endpoint: '/api/admin/demo-requests',
      method: 'DELETE',
      responseTime: Date.now() - startTime,
    });

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete demo request',
        error: process.env.NODE_ENV === 'development' ? String(error) : undefined,
      },
      { status: 500 }
    );
  }
}