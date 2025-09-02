# Technical Implementation Details

## Admin System Technical Documentation

### Table of Contents
1. [Authentication Implementation](#authentication-implementation)
2. [Database Configuration](#database-configuration)
3. [API Implementation](#api-implementation)
4. [Frontend Architecture](#frontend-architecture)
5. [Security Implementation](#security-implementation)
6. [Performance Optimizations](#performance-optimizations)
7. [Testing Strategy](#testing-strategy)
8. [Deployment Configuration](#deployment-configuration)

---

## Authentication Implementation

### NextAuth.js Configuration

**File**: `src/lib/auth.ts`

```typescript
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const adminUsers = [
  { 
    id: '1',
    email: 'admin@oilflowbidec.com',
    password: 'admin123', // Hash in production
    name: 'Admin User',
    role: 'admin'
  },
  {
    id: '2', 
    email: 'sales@oilflowbidec.com',
    password: 'sales123', // Hash in production
    name: 'Sales Team',
    role: 'sales'
  }
];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      authorize: async (credentials) => {
        const user = adminUsers.find(
          u => u.email === credentials?.email && 
               u.password === credentials?.password
        );
        return user || null;
      }
    })
  ],
  session: { strategy: 'jwt', maxAge: 24 * 60 * 60 },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token.role = user.role;
      return token;
    },
    session: async ({ session, token }) => {
      if (token && session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  }
};
```

### Session Provider Setup

**File**: `src/components/providers/session-provider.tsx`

```typescript
'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

export function NextAuthProvider({ 
  children, 
  session 
}: { 
  children: ReactNode;
  session?: any;
}) {
  return (
    <SessionProvider session={session} refetchInterval={0}>
      {children}
    </SessionProvider>
  );
}
```

---

## Database Configuration

### Prisma Schema

**File**: `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model DemoRequest {
  id                String    @id @default(cuid())
  requestId         String    @unique
  
  // Personal Information
  firstName         String
  lastName          String
  email             String
  phone             String
  
  // Company Information
  company           String
  jobTitle          String
  companySize       String
  industry          String
  currentSoftware   String?
  
  // Business Information
  challenges        String
  additionalNotes   String?
  
  // Scheduling
  preferredDate     String
  preferredTime     String
  
  // Metadata
  consent           Boolean   @default(true)
  ipAddress         String?
  userAgent         String?
  status            String    @default("pending")
  
  // Timestamps
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  // Follow-up tracking
  followUpNotes     String?
  contactedAt       DateTime?
  scheduledAt       DateTime?
  completedAt       DateTime?
  
  // Relations
  emailLogs         EmailLog[]
  
  @@map("demo_requests")
}

model EmailLog {
  id          String    @id @default(cuid())
  demoRequestId String?
  emailType   String
  recipient   String
  subject     String
  status      String
  provider    String
  providerId  String?
  error       String?
  sentAt      DateTime  @default(now())
  
  demoRequest DemoRequest? @relation(fields: [demoRequestId], references: [id])
  
  @@map("email_logs")
}

model ApiUsage {
  id          String    @id @default(cuid())
  endpoint    String
  method      String
  ipAddress   String
  userAgent   String?
  status      Int
  responseTime Int?
  error       String?
  createdAt   DateTime  @default(now())
  
  @@map("api_usage")
}
```

### Database Service Layer

**File**: `src/lib/database.ts`

```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export class DatabaseService {
  static async createDemoRequest(data: any) {
    return prisma.demoRequest.create({ data });
  }

  static async logApiUsage(data: any) {
    return prisma.apiUsage.create({ data });
  }

  static async logEmailSent(data: any) {
    return prisma.emailLog.create({ data });
  }
}
```

---

## API Implementation

### Admin API Routes

**File**: `src/app/api/admin/demo-requests/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database';
import { AuthMiddleware } from '@/middleware/auth';
import Logger from '@/lib/logger';

// GET - Fetch demo requests with filtering
export async function GET(request: NextRequest) {
  const authResult = await AuthMiddleware.requireSalesOrAdmin(request);
  if (authResult instanceof NextResponse) return authResult;

  const { searchParams } = new URL(request.url);
  const filters = Object.fromEntries(searchParams.entries());

  const where: any = {};
  
  // Build dynamic filters
  if (filters.status && filters.status !== 'all') {
    where.status = filters.status;
  }
  
  if (filters.search) {
    where.OR = [
      { firstName: { contains: filters.search, mode: 'insensitive' } },
      { lastName: { contains: filters.search, mode: 'insensitive' } },
      { email: { contains: filters.search, mode: 'insensitive' } },
      { company: { contains: filters.search, mode: 'insensitive' } },
    ];
  }

  const [demoRequests, total] = await Promise.all([
    prisma.demoRequest.findMany({
      where,
      include: { emailLogs: { take: 5 } },
      orderBy: { createdAt: 'desc' },
      take: 50,
      skip: 0,
    }),
    prisma.demoRequest.count({ where }),
  ]);

  return NextResponse.json({
    success: true,
    data: demoRequests,
    total,
  });
}

// PUT - Update demo request status
export async function PUT(request: NextRequest) {
  const authResult = await AuthMiddleware.requireSalesOrAdmin(request);
  if (authResult instanceof NextResponse) return authResult;

  const { requestId, status, notes } = await request.json();

  const updatedRequest = await prisma.demoRequest.update({
    where: { requestId },
    data: {
      status,
      updatedAt: new Date(),
      followUpNotes: notes,
      ...(status === 'contacted' && { contactedAt: new Date() }),
      ...(status === 'scheduled' && { scheduledAt: new Date() }),
      ...(status === 'completed' && { completedAt: new Date() }),
    },
  });

  return NextResponse.json({
    success: true,
    data: updatedRequest,
  });
}
```

---

## Frontend Architecture

### Dashboard Component Structure

**File**: `src/app/admin/dashboard/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function AdminDashboard() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/admin/login');
    },
  });

  const [demoRequests, setDemoRequests] = useState([]);
  const [filters, setFilters] = useState({
    status: 'all',
    search: '',
  });

  useEffect(() => {
    fetchDemoRequests();
  }, [filters]);

  const fetchDemoRequests = async () => {
    const params = new URLSearchParams(filters);
    const response = await fetch(`/api/admin/demo-requests?${params}`);
    const data = await response.json();
    setDemoRequests(data.data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard UI */}
    </div>
  );
}
```

### Navigation Integration

**File**: `src/components/layout/header.tsx`

```typescript
// Admin Portal Button - Always visible
<Link href="/admin/login">
  <Button 
    variant="outline" 
    size="sm"
    className="flex items-center gap-2 bg-gray-900 text-white"
    title="Admin Portal - Staff Access Only"
  >
    <Shield className="h-4 w-4" />
    Admin Portal
  </Button>
</Link>
```

---

## Security Implementation

### Rate Limiting

**File**: `src/lib/rate-limit.ts`

```typescript
class RateLimiter {
  private attempts: Map<string, { count: number; resetTime: number }>;
  
  constructor(
    private maxAttempts: number,
    private windowMs: number
  ) {
    this.attempts = new Map();
    this.startCleanupTimer();
  }

  async check(request: NextRequest) {
    const ip = this.getClientIp(request);
    const now = Date.now();
    const record = this.attempts.get(ip);

    if (!record || now > record.resetTime) {
      this.attempts.set(ip, {
        count: 1,
        resetTime: now + this.windowMs,
      });
      return { allowed: true, remaining: this.maxAttempts - 1 };
    }

    if (record.count >= this.maxAttempts) {
      return { 
        allowed: false, 
        remaining: 0,
        resetTime: record.resetTime 
      };
    }

    record.count++;
    return { 
      allowed: true, 
      remaining: this.maxAttempts - record.count 
    };
  }
}

export const demoApiRateLimit = new RateLimiter(5, 15 * 60 * 1000);
```

### Input Validation

**File**: `src/lib/rate-limit.ts`

```typescript
export class SecurityValidator {
  static validateDemoRequest(data: any) {
    const errors: string[] = [];
    
    // Check for XSS attempts
    const htmlPattern = /<[^>]*>/g;
    const fields = ['firstName', 'lastName', 'company', 'challenges'];
    
    for (const field of fields) {
      if (data[field] && htmlPattern.test(data[field])) {
        errors.push(`${field} contains invalid HTML`);
      }
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push('Invalid email format');
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }
}
```

---

## Performance Optimizations

### Next.js 15 Configuration

**File**: `next.config.js`

```javascript
const nextConfig = {
  // Next.js 15 with Turbopack
  reactStrictMode: true,
  
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
    ];
  },
};
```

### Database Query Optimization

```typescript
// Parallel queries for better performance
const [demoRequests, total, stats] = await Promise.all([
  prisma.demoRequest.findMany({
    where,
    include: { emailLogs: { take: 5 } },
    take: limit,
    skip: offset,
  }),
  prisma.demoRequest.count({ where }),
  prisma.demoRequest.groupBy({
    by: ['status'],
    _count: true,
  }),
]);
```

---

## Testing Strategy

### Unit Tests

```typescript
// __tests__/api/admin.test.ts
describe('Admin API', () => {
  it('should require authentication', async () => {
    const response = await fetch('/api/admin/demo-requests');
    expect(response.status).toBe(401);
  });

  it('should return demo requests for authenticated users', async () => {
    // Mock authentication
    const response = await fetch('/api/admin/demo-requests', {
      headers: { Authorization: 'Bearer token' },
    });
    expect(response.status).toBe(200);
  });
});
```

### Integration Tests

```typescript
// __tests__/integration/dashboard.test.tsx
import { render, screen } from '@testing-library/react';
import Dashboard from '@/app/admin/dashboard/page';

describe('Admin Dashboard', () => {
  it('should redirect unauthenticated users', () => {
    render(<Dashboard />);
    expect(window.location.pathname).toBe('/admin/login');
  });
});
```

---

## Deployment Configuration

### Environment Variables

```bash
# .env.production
DATABASE_URL="postgresql://user:pass@host:5439/db?sslmode=require"
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="[generate-with-openssl-rand-base64-32]"
RESEND_API_KEY="re_production_key"
ADMIN_EMAIL="admin@yourdomain.com"
SALES_TEAM_EMAILS="sales@yourdomain.com"
LOG_LEVEL="info"
NODE_ENV="production"
```

### Docker Configuration

```dockerfile
# Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
RUN npm ci --production
EXPOSE 3000
CMD ["npm", "start"]
```

### CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - run: npm test
      - name: Deploy to Vercel
        run: vercel deploy --prod
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

---

## Monitoring & Logging

### Winston Logger Configuration

```typescript
// src/lib/logger.ts
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error' 
    }),
    new winston.transports.File({ 
      filename: 'logs/combined.log' 
    }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ],
});

export default logger;
```

### Performance Monitoring

```typescript
// Middleware for response time tracking
export async function middleware(request: NextRequest) {
  const startTime = Date.now();
  
  const response = NextResponse.next();
  
  const responseTime = Date.now() - startTime;
  response.headers.set('X-Response-Time', `${responseTime}ms`);
  
  // Log slow requests
  if (responseTime > 1000) {
    Logger.warn('Slow request detected', {
      path: request.url,
      responseTime,
    });
  }
  
  return response;
}
```

---

**Last Updated**: December 2024
**Version**: 1.0.0
**Framework**: Next.js 15.5.2 with React 19.1.1