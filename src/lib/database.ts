import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

// Database service functions
export class DatabaseService {
  static async createDemoRequest(data: {
    requestId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    jobTitle: string;
    companySize: string;
    industry: string;
    currentSoftware?: string;
    challenges: string;
    additionalNotes?: string;
    preferredDate: string;
    preferredTime: string;
    ipAddress?: string;
    userAgent?: string;
  }) {
    try {
      const demoRequest = await prisma.demoRequest.create({
        data: {
          requestId: data.requestId,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          company: data.company,
          jobTitle: data.jobTitle,
          companySize: data.companySize,
          industry: data.industry,
          currentSoftware: data.currentSoftware,
          challenges: data.challenges,
          additionalNotes: data.additionalNotes,
          preferredDate: data.preferredDate,
          preferredTime: data.preferredTime,
          ipAddress: data.ipAddress,
          userAgent: data.userAgent,
        },
      });
      return demoRequest;
    } catch (error) {
      console.error('Database error creating demo request:', error);
      throw new Error('Failed to save demo request to database');
    }
  }

  static async logEmailSent(data: {
    demoRequestId?: string;
    emailType: 'confirmation' | 'sales_notification' | 'reminder' | 'follow_up';
    recipient: string;
    subject: string;
    status: 'sent' | 'failed' | 'bounced' | 'delivered';
    provider: string;
    providerId?: string;
    error?: string;
  }) {
    try {
      const emailLog = await prisma.emailLog.create({
        data: {
          demoRequestId: data.demoRequestId,
          emailType: data.emailType,
          recipient: data.recipient,
          subject: data.subject,
          status: data.status,
          provider: data.provider,
          providerId: data.providerId,
          error: data.error,
        },
      });
      return emailLog;
    } catch (error) {
      console.error('Database error logging email:', error);
      // Don't throw here - email logging failure shouldn't break the main flow
    }
  }

  static async logApiUsage(data: {
    endpoint: string;
    method: string;
    ipAddress: string;
    userAgent?: string;
    status: number;
    responseTime?: number;
    error?: string;
  }) {
    try {
      const apiUsage = await prisma.apiUsage.create({
        data: {
          endpoint: data.endpoint,
          method: data.method,
          ipAddress: data.ipAddress,
          userAgent: data.userAgent,
          status: data.status,
          responseTime: data.responseTime,
          error: data.error,
        },
      });
      return apiUsage;
    } catch (error) {
      console.error('Database error logging API usage:', error);
      // Don't throw here - API usage logging failure shouldn't break the main flow
    }
  }

  static async getDemoRequests(filters?: {
    status?: string;
    industry?: string;
    companySize?: string;
    dateFrom?: Date;
    dateTo?: Date;
    limit?: number;
    offset?: number;
  }) {
    try {
      const where: any = {};

      if (filters?.status) where.status = filters.status;
      if (filters?.industry) where.industry = filters.industry;
      if (filters?.companySize) where.companySize = filters.companySize;
      if (filters?.dateFrom || filters?.dateTo) {
        where.createdAt = {};
        if (filters.dateFrom) where.createdAt.gte = filters.dateFrom;
        if (filters.dateTo) where.createdAt.lte = filters.dateTo;
      }

      const demoRequests = await prisma.demoRequest.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: filters?.limit || 50,
        skip: filters?.offset || 0,
        include: {
          emailLogs: {
            orderBy: { sentAt: 'desc' },
          },
        },
      });

      const total = await prisma.demoRequest.count({ where });

      return {
        data: demoRequests,
        total,
        hasMore: (filters?.offset || 0) + demoRequests.length < total,
      };
    } catch (error) {
      console.error('Database error getting demo requests:', error);
      throw new Error('Failed to retrieve demo requests from database');
    }
  }

  static async updateDemoRequestStatus(
    requestId: string,
    status: 'pending' | 'contacted' | 'scheduled' | 'completed' | 'cancelled',
    notes?: string
  ) {
    try {
      const updateData: any = { status };
      
      if (status === 'contacted') updateData.contactedAt = new Date();
      if (status === 'scheduled') updateData.scheduledAt = new Date();
      if (status === 'completed') updateData.completedAt = new Date();
      if (notes) updateData.followUpNotes = notes;

      const demoRequest = await prisma.demoRequest.update({
        where: { requestId },
        data: updateData,
      });

      return demoRequest;
    } catch (error) {
      console.error('Database error updating demo request:', error);
      throw new Error('Failed to update demo request status');
    }
  }

  static async getEmailLogs(demoRequestId?: string, limit = 50) {
    try {
      const where = demoRequestId ? { demoRequestId } : {};
      
      const emailLogs = await prisma.emailLog.findMany({
        where,
        orderBy: { sentAt: 'desc' },
        take: limit,
        include: {
          demoRequest: {
            select: {
              requestId: true,
              firstName: true,
              lastName: true,
              company: true,
            },
          },
        },
      });

      return emailLogs;
    } catch (error) {
      console.error('Database error getting email logs:', error);
      throw new Error('Failed to retrieve email logs');
    }
  }
}

export default DatabaseService;