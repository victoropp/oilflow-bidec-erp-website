# OilFlow BIDEC ERP Website - Deployment Guide

## 🚀 Quick Deploy to Vercel

### 1. Prerequisites
- GitHub account 
- Vercel account (can sign up with GitHub)
- Node.js 18+ (for local development)

### 2. Environment Variables Required

Create these environment variables in your Vercel dashboard:

```bash
# Database Configuration
DATABASE_URL="your-production-database-url"

# Authentication
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-secret-key-here"

# Email Service (Resend)
RESEND_API_KEY="your-resend-api-key"

# Admin System
ADMIN_DEFAULT_EMAIL="admin@oilflowbidec.com"
ADMIN_DEFAULT_PASSWORD="secure-password"

# Optional: Rate Limiting
UPSTASH_REDIS_REST_URL="your-upstash-redis-url"
UPSTASH_REDIS_REST_TOKEN="your-upstash-redis-token"

# Site Configuration
NEXT_PUBLIC_SITE_URL="https://your-domain.com"
NODE_ENV="production"
```

### 3. Deploy Steps

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Deploy OilFlow BIDEC ERP Website"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Import your repository
   - Add environment variables
   - Deploy

3. **Post-Deployment**:
   - Set up custom domain
   - Configure SSL (automatic with Vercel)
   - Test all functionality

## 🛠️ Manual Deployment Setup

### Database Setup
1. Create a PostgreSQL database (recommended: Neon, Supabase, or Railway)
2. Run Prisma migrations:
   ```bash
   npx prisma db push
   npx prisma generate
   ```

### Email Setup
1. Sign up for [Resend](https://resend.com)
2. Verify your sending domain
3. Get API key from dashboard

### Admin System
1. First login creates admin user with provided credentials
2. Access admin panel at `/admin/login`
3. Manage users and content through admin dashboard

## 🔧 Local Development

```bash
# Clone repository
git clone https://github.com/victoropp/oilflow-bidec-erp-website.git

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Run development server
npm run dev
```

## 📊 Production Optimizations

- **Next.js 15.5.2** with Turbopack for fast builds
- **React 19.1.1** with latest optimizations
- **Image optimization** with Next.js Image component
- **Font optimization** with next/font
- **Bundle analysis** available with `npm run analyze`

## 🔒 Security Features

- **NextAuth.js** for secure authentication
- **Rate limiting** with Upstash Redis
- **Form validation** with Zod
- **SQL injection protection** with Prisma ORM
- **CORS protection** built into Next.js

## 📈 Analytics & Monitoring

- **Vercel Analytics** for performance monitoring
- **Error boundaries** for graceful error handling
- **Logging** with Winston for debugging
- **Performance monitoring** with Core Web Vitals

## 🌍 CDN & Performance

- **Global CDN** through Vercel Edge Network
- **Static generation** for marketing pages
- **Dynamic imports** for code splitting
- **Caching strategies** optimized for performance

## 🚨 Important Notes

- **Database**: Ensure DATABASE_URL is properly formatted for Prisma
- **Admin Access**: First user created with ADMIN_DEFAULT_EMAIL becomes admin
- **Security**: Change all default passwords in production
- **Backups**: Set up regular database backups
- **Monitoring**: Monitor error logs and performance metrics

## 📞 Support

For deployment issues:
1. Check Vercel build logs
2. Verify environment variables
3. Test database connectivity
4. Review error boundaries and logging

## 🎯 Domain Configuration

### Custom Domain Setup
1. Add domain in Vercel dashboard
2. Configure DNS records
3. SSL certificates are automatically provisioned
4. Update NEXTAUTH_URL environment variable

### Recommended Domains
- `oilflowbidec.com` (primary)
- `bidecerp.com` (alternative)
- `oilflowbidec.gh` (Ghana-specific)

## 🔄 CI/CD Pipeline

The project is configured for automatic deployment:
- **Push to main** → Automatic deployment to production
- **Pull requests** → Preview deployments
- **Branch deployments** → Development environments
- **Rollback support** → Easy revert to previous versions

---

**Deployment Status**: ✅ Ready for Production  
**Last Updated**: 2025-01-02