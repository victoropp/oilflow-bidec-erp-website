# Deployment Guide

## Quick Deploy to Vercel

### 1. Prerequisites
- Vercel account
- GitHub repository
- Environment variables configured

### 2. Deploy Steps

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### 3. Environment Variables Setup

In Vercel Dashboard, add these environment variables:

#### Contentful CMS
```
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=your_space_id
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=your_access_token
CONTENTFUL_MANAGEMENT_TOKEN=your_management_token
```

#### Analytics
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

#### Form Handling
```
NEXT_PUBLIC_FORMSPREE_ENDPOINT=your_endpoint
SENDGRID_API_KEY=your_sendgrid_key
```

#### Feature Flags
```
NEXT_PUBLIC_ENABLE_DEMO_MODE=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

### 4. Domain Configuration

1. Add custom domain in Vercel dashboard
2. Configure DNS records:
   - A record: `185.199.108.153`
   - A record: `185.199.109.153`
   - A record: `185.199.110.153`
   - A record: `185.199.111.153`
3. Enable HTTPS (automatic with Vercel)

### 5. Performance Configuration

#### Vercel Settings
- Enable Edge Functions for API routes
- Configure ISR for dynamic content
- Set up Image Optimization

#### CDN Configuration
- Global CDN enabled by default
- Edge caching for static assets
- Smart compression

### 6. Monitoring Setup

#### Vercel Analytics
- Enable in Vercel dashboard
- Configure custom events
- Set up performance alerts

#### External Monitoring
```bash
# Add monitoring services
npm install @sentry/nextjs
npm install @datadog/browser-rum
```

## Alternative Deployment Options

### AWS Amplify

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Initialize
amplify init

# Add hosting
amplify add hosting

# Deploy
amplify publish
```

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=out
```

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

## Post-Deployment Checklist

### Performance
- [ ] Lighthouse score > 90
- [ ] Core Web Vitals passing
- [ ] Image optimization working
- [ ] Bundle size optimized

### SEO
- [ ] Meta tags correct
- [ ] Sitemap accessible
- [ ] Robots.txt configured
- [ ] Structured data valid

### Analytics
- [ ] Google Analytics tracking
- [ ] Conversion events firing
- [ ] Performance monitoring active
- [ ] Error tracking setup

### Security
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Content Security Policy active
- [ ] Environment variables secure

### Functionality
- [ ] Demo booking working
- [ ] Contact forms functional
- [ ] ROI calculator operational
- [ ] Mobile responsive
- [ ] Cross-browser tested

## Monitoring & Maintenance

### Performance Monitoring
```bash
# Run performance audits
npm run build
npm run start
npx lighthouse http://localhost:3000 --view
```

### Security Scanning
```bash
# Security audit
npm audit

# Dependency checking
npx depcheck
```

### Content Updates
- Contentful webhook triggers revalidation
- Automatic ISR for updated content
- Manual revalidation via API

### Backup Strategy
- Database backups (if applicable)
- Environment variables backup
- Code repository redundancy
- Content backup from Contentful