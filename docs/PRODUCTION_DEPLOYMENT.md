# Production Deployment Guide - OilFlow BIDEC Demo System

## 🚀 Production-Ready Features

The demo scheduling system is now fully implemented with enterprise-grade features:

### ✅ Completed Production Features

1. **📧 Email Service (Resend)**
   - Professional HTML email templates
   - Customer confirmation emails
   - Sales team notifications
   - Email delivery logging and monitoring

2. **🗄️ PostgreSQL Database**
   - Full schema with relationships
   - Demo request storage
   - Email logging
   - API usage analytics
   - Status tracking and follow-up management

3. **🛡️ Security & Rate Limiting**
   - IP-based rate limiting (5 requests per 15 minutes)
   - Input validation and sanitization
   - XSS protection
   - SQL injection prevention
   - Malicious content detection

4. **📊 Logging & Monitoring**
   - Winston-based logging system
   - Database health monitoring
   - Performance metrics
   - Error tracking
   - API usage analytics

5. **🔒 Data Protection**
   - GDPR-compliant data handling
   - Secure client information storage
   - User consent tracking

## 🔧 Production Setup Instructions

### 1. Database Setup

#### Option A: Local PostgreSQL
```bash
# Install PostgreSQL
# Create database
createdb oilflow_demo_requests

# Update .env.local
DATABASE_URL="postgresql://postgres:password@localhost:5439/oilflow_demo_requests?schema=public"
```

#### Option B: Hosted PostgreSQL (Recommended)
```bash
# Neon (Recommended)
DATABASE_URL="postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/oilflow_demo?sslmode=require"

# Supabase
DATABASE_URL="postgresql://postgres:password@db.xxx.supabase.co:5432/postgres"

# Railway
DATABASE_URL="postgresql://postgres:password@containers-us-west-xxx.railway.app:5432/railway"
```

#### Run Database Migration
```bash
npx prisma migrate deploy
npx prisma generate
```

### 2. Email Service Setup

#### Get Resend API Key
1. Visit [Resend.com](https://resend.com)
2. Create account and verify domain
3. Get API key

#### Update Environment Variables
```bash
# .env.local or .env.production
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com
SALES_TEAM_EMAIL=sales@yourdomain.com
```

### 3. Environment Variables

Create `.env.production` for production deployment:

```bash
# Database
DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"

# Email Service
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@yourdomain.com

# Admin Contacts
ADMIN_EMAIL=admin@yourdomain.com
SALES_TEAM_EMAIL=sales@yourdomain.com

# Security
DEMO_API_SECRET=your-production-secret-key-2024
NEXTAUTH_SECRET=your-production-nextauth-secret

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXTAUTH_URL=https://yourdomain.com

# Optional: Rate Limiting with Redis
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_redis_token

# Feature Flags
NEXT_PUBLIC_ENABLE_DEMO_MODE=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

### 4. Build and Deploy

#### Build for Production
```bash
npm run build
npm start
```

#### Deploy to Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Set environment variables in Vercel dashboard
```

#### Deploy to Other Platforms

**Netlify:**
```bash
npm run build
# Upload ./out directory
```

**Docker:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📈 Monitoring & Maintenance

### 1. Database Monitoring

#### Check Demo Requests
```sql
-- Recent demo requests
SELECT * FROM demo_requests 
ORDER BY created_at DESC 
LIMIT 10;

-- Requests by status
SELECT status, COUNT(*) 
FROM demo_requests 
GROUP BY status;

-- Email delivery status
SELECT el.email_type, el.status, COUNT(*) 
FROM email_logs el 
GROUP BY el.email_type, el.status;
```

#### Performance Queries
```sql
-- API usage analytics
SELECT endpoint, method, AVG(response_time), COUNT(*)
FROM api_usage 
WHERE created_at >= NOW() - INTERVAL '24 hours'
GROUP BY endpoint, method;

-- Rate limit violations
SELECT ip_address, COUNT(*)
FROM api_usage 
WHERE status = 429
AND created_at >= NOW() - INTERVAL '24 hours'
GROUP BY ip_address;
```

### 2. Log Monitoring

#### View Logs
```bash
# Error logs
tail -f logs/error.log

# All logs
tail -f logs/combined.log

# Filter by demo requests
grep "Demo request" logs/combined.log
```

#### Log Rotation (Production)
```bash
# Add to crontab
0 0 * * * /usr/sbin/logrotate /path/to/logrotate.conf
```

### 3. Health Checks

#### API Health Check
```bash
curl https://yourdomain.com/api/demo
```

#### Database Health
```sql
SELECT 'healthy' as status, NOW() as timestamp;
```

## 🔔 Alerting & Notifications

### 1. Email Delivery Monitoring

Set up alerts for:
- Failed email deliveries
- High bounce rates
- Unresponsive email service

### 2. Database Monitoring

Monitor:
- Connection pool usage
- Query performance
- Disk space usage
- Backup status

### 3. API Monitoring

Track:
- Response times > 5 seconds
- Error rates > 5%
- Rate limit violations
- Unusual traffic patterns

## 📊 Analytics & Reporting

### 1. Demo Request Analytics

```sql
-- Monthly demo requests
SELECT 
  DATE_TRUNC('month', created_at) as month,
  COUNT(*) as total_requests,
  COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_demos
FROM demo_requests 
GROUP BY month 
ORDER BY month DESC;

-- Industry breakdown
SELECT industry, COUNT(*), 
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) as percentage
FROM demo_requests 
GROUP BY industry;
```

### 2. Email Performance

```sql
-- Email delivery rates
SELECT 
  email_type,
  COUNT(*) as total_sent,
  COUNT(CASE WHEN status = 'sent' THEN 1 END) as delivered,
  ROUND(COUNT(CASE WHEN status = 'sent' THEN 1 END) * 100.0 / COUNT(*), 2) as delivery_rate
FROM email_logs 
GROUP BY email_type;
```

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Errors**
   ```bash
   # Check connection string
   # Verify database is running
   # Check firewall settings
   ```

2. **Email Delivery Issues**
   ```bash
   # Verify API key is correct
   # Check domain verification
   # Review email logs
   ```

3. **Rate Limiting Issues**
   ```bash
   # Check Redis connection
   # Review rate limit configuration
   # Monitor API usage patterns
   ```

### Performance Optimization

1. **Database Optimization**
   - Add indexes on frequently queried columns
   - Implement connection pooling
   - Set up read replicas for analytics

2. **Caching**
   - Implement Redis caching
   - Add CDN for static assets
   - Cache API responses where appropriate

3. **Monitoring**
   - Set up APM tools (New Relic, Datadog)
   - Implement custom metrics
   - Monitor resource usage

## 📋 Maintenance Checklist

### Daily
- [ ] Review error logs
- [ ] Check email delivery rates
- [ ] Monitor API response times

### Weekly  
- [ ] Review demo request analytics
- [ ] Check database performance
- [ ] Update rate limit configurations if needed

### Monthly
- [ ] Generate performance reports
- [ ] Review and optimize database queries
- [ ] Update dependencies and security patches
- [ ] Backup database and logs

## 🔐 Security Considerations

### Production Security Checklist

- [ ] Enable HTTPS with valid SSL certificate
- [ ] Set secure environment variables
- [ ] Implement proper CORS policies
- [ ] Enable security headers
- [ ] Regular security audits
- [ ] Monitor for suspicious activities
- [ ] Implement proper access controls
- [ ] Regular database backups
- [ ] Keep dependencies updated

The system is now production-ready with enterprise-grade reliability, security, and monitoring capabilities!