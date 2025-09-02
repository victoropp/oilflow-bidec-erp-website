# OilFlow BIDEC ERP Website

A production-ready, high-performance website for OilFlow BIDEC ERP - Ghana's leading petroleum trading ERP solution built by industry veterans.

## 🚀 Tech Stack

- **Framework**: Next.js 15.5.2 with App Router & Turbopack
- **React**: 19.1.1 with latest features
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Authentication**: NextAuth.js with Prisma adapter
- **Database**: PostgreSQL with Prisma ORM
- **Forms**: React Hook Form + Zod validation
- **Email**: Resend for transactional emails
- **Analytics**: Vercel Analytics & Speed Insights
- **Deployment**: Vercel with global CDN

## 🏗️ Project Structure

```
src/
├── app/                          # Next.js 15 App Router
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Homepage
│   ├── about/                   # About page
│   ├── contact/                 # Contact page  
│   ├── careers/                 # Careers page
│   ├── pricing/                 # Pricing page
│   ├── resources/               # Resources page
│   ├── request-demo/            # Demo booking page
│   ├── admin/                   # Admin portal pages
│   │   ├── login/              # Admin login
│   │   ├── dashboard/          # Admin dashboard
│   │   └── users/              # User management
│   ├── api/                     # API routes
│   │   ├── auth/               # NextAuth endpoints
│   │   ├── admin/              # Admin API routes
│   │   ├── demo/               # Demo booking API
│   │   └── contact/            # Contact form API
│   ├── solutions/               # Solution pages
│   │   ├── ai-insights/        # AI insights page
│   │   ├── analytics/          # Analytics suite page
│   │   ├── command-palette/    # Command palette page
│   │   └── [other-solutions]/  # Other solution pages
│   └── petroleum-trading/       # Petroleum trading pages
│       ├── batch-management/   # Batch management page
│       ├── sales-allocation/   # Sales allocation page
│       └── [other-features]/   # Other feature pages
├── components/
│   ├── admin/                  # Admin-specific components
│   ├── forms/                  # Form components
│   ├── layout/                 # Layout components (Header, Footer)
│   ├── providers/              # Context providers
│   ├── sections/               # Page sections
│   └── ui/                     # Reusable UI components
├── lib/                        # Utility libraries
│   ├── auth.ts                 # Authentication logic
│   ├── database.ts             # Database utilities
│   ├── email.ts                # Email service
│   ├── logger.ts               # Logging utilities
│   ├── rate-limit.ts           # Rate limiting
│   └── chatbot/                # Chatbot functionality
├── middleware/                 # Next.js middleware
├── prisma/                     # Database schema and migrations
├── config/                     # Configuration files
└── styles/                     # Global styles
```

## 🎨 Design System

### Colors
- **Primary**: Professional blue (#0ea5e9) - Trust and stability
- **Secondary**: Energy yellow (#facc15) - Innovation and energy
- **Accent**: Success green (#22c55e) - Growth and efficiency
- **Industry Colors**: Oil and gas themed palette

### Typography
- **Display**: Space Grotesk - Modern, technical headings
- **Body**: Inter - Highly readable body text
- **Code**: Fira Code - Technical specifications

### Components
- Fully responsive design system
- Accessible components (WCAG 2.1 AA)
- Dark/light mode support
- Animation-first approach with Framer Motion

## 🔧 Performance Optimizations

### Core Web Vitals
- **LCP**: Optimized images with Next.js Image component
- **FID**: Code splitting and lazy loading
- **CLS**: Reserved space for dynamic content

### Strategies
- Image optimization with WebP/AVIF formats
- Font optimization with variable fonts
- Critical CSS inlining
- Bundle analysis with @next/bundle-analyzer
- CDN optimization through Vercel Edge Network

### Caching
- Static generation for marketing pages
- Incremental Static Regeneration for CMS content
- API route caching with appropriate cache headers

## 📈 SEO Optimization

### On-Page SEO
- Semantic HTML structure
- Optimized meta tags and Open Graph
- Structured data (JSON-LD) for rich snippets
- XML sitemap generation
- Robots.txt optimization

### Technical SEO
- Mobile-first responsive design
- Page speed optimization (90+ Lighthouse score)
- Accessibility compliance
- Schema markup for petroleum industry

### Content Strategy
- Industry-specific keyword targeting
- Conversion-focused copywriting
- Authority building through case studies
- Technical content for petroleum professionals

## 🛡️ Security Features

- Content Security Policy (CSP)
- XSS protection headers
- CSRF protection for forms
- Secure cookie configuration
- Environment variable protection

## 🔧 Development

### Prerequisites
- Node.js 18+ 
- npm 8+

### Setup
```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript type checking
- `npm run analyze` - Bundle analysis

### Environment Variables
See `.env.example` for required environment variables including:
- Contentful CMS credentials
- Analytics tracking IDs
- Form handling endpoints
- Feature flags

## 📊 Analytics & Tracking

### Conversion Tracking
- Demo request submissions
- Contact form completions
- ROI calculator usage
- Feature page engagement
- Pricing page visits

### Performance Monitoring
- Core Web Vitals tracking
- Custom performance metrics
- Error boundary reporting
- User behavior analytics

### Lead Scoring
- Page visit scoring
- Engagement time tracking
- Action-based scoring
- Qualification criteria

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment Setup
1. Configure environment variables in Vercel dashboard
2. Set up Contentful webhooks for content updates
3. Configure custom domain and SSL
4. Set up analytics and monitoring

### Performance Monitoring
- Vercel Analytics for performance insights
- Google Analytics 4 for user behavior
- Custom performance monitoring for business metrics

## 🎯 Conversion Optimization

### Landing Page Strategy
- Above-the-fold demo CTA
- Trust signals and social proof
- Interactive ROI calculator
- Industry-specific messaging

### Form Optimization
- Progressive disclosure
- Real-time validation
- Security assurance
- Mobile-optimized experience

### A/B Testing
- Built-in A/B testing utilities
- Conversion rate optimization
- User experience testing
- Performance impact analysis

## 📱 Mobile Experience

- Progressive Web App (PWA) capabilities
- Offline functionality for key features
- Touch-optimized interactions
- Fast loading on mobile networks

## 🔍 SEO Keywords Strategy

### Primary Keywords
- "petroleum ERP software"
- "oil and gas operations management"
- "upstream ERP solution"
- "downstream processing software"

### Long-tail Keywords
- "petroleum compliance management system"
- "oil field operations software"
- "refinery management ERP"
- "energy industry digital transformation"

## 📞 Support & Maintenance

### Monitoring
- Uptime monitoring with alerts
- Performance regression detection
- Error tracking and reporting
- Security vulnerability scanning

### Updates
- Automated security updates
- Regular dependency updates
- Content freshness monitoring
- Feature usage analytics

## 🏆 Industry Compliance

- SOC 2 Type II compliance ready
- GDPR privacy compliance
- Accessibility standards (WCAG 2.1 AA)
- Industry-specific regulatory support