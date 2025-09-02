# Admin System Documentation

## Table of Contents
1. [System Overview](#system-overview)
2. [Architecture](#architecture)
3. [Access Methods](#access-methods)
4. [Authentication System](#authentication-system)
5. [Database Schema](#database-schema)
6. [API Endpoints](#api-endpoints)
7. [Security Features](#security-features)
8. [User Roles & Permissions](#user-roles--permissions)
9. [Frontend Components](#frontend-components)
10. [Deployment Guide](#deployment-guide)

---

## System Overview

The OilFlow BIDEC Admin System is a comprehensive dashboard for managing demo requests, tracking sales leads, and monitoring system activity. Built with Next.js 15, React 19, and TypeScript, it provides a secure, production-ready interface for internal team management.

### Key Features
- **Demo Request Management**: View, filter, update, and export demo requests
- **Real-time Statistics**: Track conversion rates and request metrics
- **Email Integration**: Automatic notifications via Resend
- **Role-Based Access**: Separate permissions for admin and sales teams
- **Audit Logging**: Complete activity tracking
- **Rate Limiting**: Protection against abuse

---

## Architecture

### Technology Stack
```
Frontend:
- Next.js 15.5.2 (with Turbopack)
- React 19.1.1
- TypeScript 5.5.3
- Tailwind CSS 3.4.6
- Framer Motion 11.x

Backend:
- Next.js API Routes (App Router)
- Prisma ORM 6.15.0
- PostgreSQL (Port 5439)
- NextAuth.js 4.24.11

Services:
- Resend (Email)
- Winston (Logging)
- Zod (Validation)
```

### Project Structure
```
src/
├── app/
│   ├── admin/
│   │   ├── login/          # Login page
│   │   ├── dashboard/      # Main dashboard
│   │   └── page.tsx        # Admin router
│   └── api/
│       ├── admin/
│       │   └── demo-requests/  # Admin API endpoints
│       ├── auth/
│       │   └── [...nextauth]/  # Authentication
│       └── demo/              # Public demo API
├── components/
│   ├── admin/
│   │   ├── admin-access-trigger.tsx
│   │   └── dashboard components...
│   └── layout/
│       └── header.tsx       # Navigation with admin button
├── lib/
│   ├── auth.ts             # NextAuth configuration
│   ├── database.ts         # Prisma client
│   ├── email.ts           # Email service
│   ├── logger.ts          # Logging service
│   └── rate-limit.ts      # Rate limiting
├── middleware/
│   └── auth.ts            # Authentication middleware
└── prisma/
    └── schema.prisma      # Database schema
```

---

## Access Methods

### 1. Navigation Menu (Primary Access)
- **Location**: Main navigation bar
- **Visibility**: Always visible to all users
- **Access**: Requires authentication
- **Button**: Dark-themed with shield icon
- **URL**: Links to `/admin/login`

### 2. Direct URL Access
- **Login Page**: `/admin/login`
- **Dashboard**: `/admin/dashboard` (requires auth)
- **Bookmarkable**: Yes

### 3. Keyboard Shortcut
- **Windows/Linux**: `Ctrl + Shift + A`
- **Mac**: `Cmd + Shift + A`
- **Action**: Opens admin login page
- **Works From**: Any page on the site

### 4. Secret Footer Access (Backup)
- **Method**: Triple-click on copyright text
- **Visual**: Small dot (•) appears next to copyright
- **Hover**: Shows lock icon
- **Purpose**: Emergency access if main methods fail

---

## Authentication System

### Configuration (`src/lib/auth.ts`)
```typescript
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        // Validate against hardcoded users
        // In production: Use database lookup
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token && session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    }
  }
};
```

### Default Credentials (Development)
```javascript
Admin Access:
- Email: admin@oilflowbidec.com
- Password: admin123
- Role: admin

Sales Access:
- Email: sales@oilflowbidec.com
- Password: sales123
- Role: sales
```

**⚠️ IMPORTANT**: Change these credentials in production!

---

## Database Schema

### Demo Request Model
```prisma
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
}
```

### Status Flow
```
pending → contacted → scheduled → completed
                 ↓
            cancelled
```

---

## API Endpoints

### Admin Demo Requests API
**Base URL**: `/api/admin/demo-requests`

#### GET - Fetch Demo Requests
```http
GET /api/admin/demo-requests?status=pending&limit=50&offset=0
```

**Query Parameters**:
- `status`: all | pending | contacted | scheduled | completed | cancelled
- `industry`: Filter by industry
- `companySize`: Filter by company size
- `dateFrom`: Start date (ISO 8601)
- `dateTo`: End date (ISO 8601)
- `search`: Search term
- `limit`: Results per page (default: 50)
- `offset`: Pagination offset
- `sortBy`: createdAt | preferredDate | company | status
- `sortOrder`: asc | desc

**Response**:
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "total": 100,
    "limit": 50,
    "offset": 0,
    "hasMore": true
  },
  "statistics": {
    "total": 100,
    "pending": 40,
    "contacted": 30,
    "scheduled": 20,
    "completed": 10,
    "cancelled": 0
  }
}
```

#### PUT - Update Demo Request Status
```http
PUT /api/admin/demo-requests
```

**Body**:
```json
{
  "requestId": "demo_xxx",
  "status": "contacted",
  "notes": "Called customer, scheduled for next week"
}
```

#### POST - Get Single Demo Request
```http
POST /api/admin/demo-requests
```

**Body**:
```json
{
  "requestId": "demo_xxx"
}
```

#### DELETE - Delete Demo Request (Admin Only)
```http
DELETE /api/admin/demo-requests
```

**Body**:
```json
{
  "requestId": "demo_xxx"
}
```

---

## Security Features

### 1. Authentication Middleware
```typescript
// src/middleware/auth.ts
export class AuthMiddleware {
  static async requireAuth(request: NextRequest)
  static async requireRole(request: NextRequest, allowedRoles: string[])
  static async requireAdmin(request: NextRequest)
  static async requireSalesOrAdmin(request: NextRequest)
}
```

### 2. Rate Limiting
- **Demo API**: 5 requests per 15 minutes per IP
- **Admin API**: Protected by authentication
- **Implementation**: In-memory store with automatic cleanup

### 3. Input Validation
- **Zod Schemas**: All inputs validated
- **XSS Protection**: HTML tags stripped
- **SQL Injection**: Prevented by Prisma ORM
- **Email Validation**: RFC-compliant validation

### 4. Logging
- **Winston Logger**: Structured logging
- **Log Levels**: info, warn, error
- **File Rotation**: Daily rotation, 7-day retention
- **Performance Metrics**: Response times tracked

### 5. Security Headers
```javascript
// next.config.js
headers: [
  'X-Frame-Options: DENY',
  'X-Content-Type-Options: nosniff',
  'Referrer-Policy: origin-when-cross-origin',
  'Permissions-Policy: camera=(), microphone=(), geolocation=()'
]
```

---

## User Roles & Permissions

### Admin Role
- ✅ View all demo requests
- ✅ Update request status
- ✅ Add follow-up notes
- ✅ Delete requests
- ✅ Export data
- ✅ View all statistics
- ✅ Access system logs

### Sales Role
- ✅ View all demo requests
- ✅ Update request status
- ✅ Add follow-up notes
- ❌ Delete requests
- ✅ Export data
- ✅ View statistics
- ❌ Access system logs

### Public Users
- ❌ No access to admin features
- ✅ Can submit demo requests
- ✅ Can view public pages

---

## Frontend Components

### Dashboard Components
```
src/app/admin/dashboard/
├── page.tsx                 # Main dashboard page
├── DashboardStats.tsx       # Statistics cards
├── DemoRequestsTable.tsx    # Data table
├── FilterBar.tsx            # Advanced filtering
└── ExportButton.tsx         # CSV export
```

### Key Features
- **Real-time Updates**: Auto-refresh every 30 seconds
- **Advanced Filtering**: Multi-criteria search
- **Bulk Actions**: Update multiple requests
- **CSV Export**: Download filtered data
- **Responsive Design**: Mobile-optimized

---

## Deployment Guide

### Environment Variables
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5439/dbname"

# Authentication
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="generate-secure-secret"

# Email Service
RESEND_API_KEY="re_your_api_key"
ADMIN_EMAIL="admin@yourdomain.com"
SALES_TEAM_EMAILS="sales1@domain.com,sales2@domain.com"

# Security
ADMIN_SECRET_KEY="generate-secure-key"
RATE_LIMIT_ENABLED="true"

# Logging
LOG_LEVEL="info"
LOG_DIR="./logs"
```

### Database Setup
```bash
# Install PostgreSQL
# Configure to run on port 5439

# Run migrations
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate

# Seed initial data (optional)
npx prisma db seed
```

### Production Checklist
- [ ] Update default credentials
- [ ] Configure PostgreSQL with SSL
- [ ] Set up Resend API key
- [ ] Configure NEXTAUTH_SECRET
- [ ] Enable HTTPS
- [ ] Set up monitoring
- [ ] Configure backup strategy
- [ ] Test rate limiting
- [ ] Review security headers
- [ ] Set up log aggregation

### Build and Deploy
```bash
# Build for production
npm run build

# Start production server
npm run start

# Or deploy to Vercel
vercel deploy --prod
```

---

## Maintenance

### Regular Tasks
1. **Daily**: Check error logs
2. **Weekly**: Review demo request metrics
3. **Monthly**: Archive old requests
4. **Quarterly**: Security audit

### Monitoring
- Server uptime
- Database performance
- API response times
- Error rates
- Email delivery status

### Backup Strategy
- Database: Daily automated backups
- Logs: Weekly rotation
- Configuration: Version controlled

---

## Troubleshooting

### Common Issues

#### Database Connection Failed
```
Error: Can't reach database server at localhost:5439
```
**Solution**: Ensure PostgreSQL is running on port 5439

#### Authentication Not Working
```
Error: Invalid email or password
```
**Solution**: Check credentials match configuration in `lib/auth.ts`

#### Rate Limit Exceeded
```
Error: Too many requests
```
**Solution**: Wait 15 minutes or clear rate limit cache

#### Email Not Sending
```
Error: Failed to send email
```
**Solution**: Verify Resend API key is configured

---

## Support

For technical support or questions:
- Internal Slack: #tech-support
- Documentation: `/docs` folder
- GitHub Issues: [repository]/issues

---

**Last Updated**: December 2024
**Version**: 1.0.0
**Maintained By**: Development Team