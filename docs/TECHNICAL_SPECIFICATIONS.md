# OilFlow BIDEC ERP Website - Technical Specifications

## Architecture Overview

### Frontend Architecture
- **Framework**: Next.js 14+ with App Router
- **Rendering**: Static Site Generation (SSG) + Incremental Static Regeneration (ISR)
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth interactions
- **State Management**: React Context + Local State
- **Form Handling**: React Hook Form + Zod validation

### Performance Targets
- **Lighthouse Score**: 95+ across all metrics
- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms

### SEO Requirements
- **Petroleum Industry Keywords**: 50+ targeted keywords
- **Meta Tags**: Comprehensive Open Graph and Twitter Cards
- **Structured Data**: JSON-LD for rich snippets
- **Sitemap**: Dynamic XML sitemap generation
- **Robots.txt**: Optimized for search engines

## Component Architecture

### Layout Structure
```
├── Header (Fixed navigation with submenu)
├── Main Content Area
│   ├── Hero Section (Animated, conversion-focused)
│   ├── Features Section (Grid layout, hover effects)
│   ├── Benefits Section (Statistics, testimonials)
│   ├── ROI Calculator (Interactive form)
│   ├── Testimonials (Carousel, social proof)
│   └── CTA Section (Multiple conversion paths)
└── Footer (Comprehensive links, contact info)
```

### Component Specifications

#### Hero Section
- **Purpose**: Primary conversion driver
- **Features**: 
  - Animated statistics counters
  - Gradient backgrounds with floating elements
  - Dual CTA buttons (Demo + Video)
  - Trust indicators and certifications
- **Performance**: Critical above-the-fold content
- **Animations**: Staggered entry animations, floating elements

#### Features Section
- **Purpose**: Feature showcase and education
- **Layout**: Responsive grid (1-3 columns)
- **Interactions**: Hover effects, icon animations
- **Content**: 9 core petroleum-specific features
- **Performance**: Lazy loaded below fold

#### ROI Calculator
- **Purpose**: Lead qualification and engagement
- **Functionality**: 
  - Real-time calculations
  - Industry-specific metrics
  - Visual results display
  - Lead scoring integration
- **Validations**: Zod schema validation
- **Analytics**: Conversion tracking

## Performance Optimization Strategy

### Image Optimization
```typescript
// Next.js Image component with optimization
<Image
  src="/hero-image.jpg"
  alt="Petroleum operations dashboard"
  width={1200}
  height={630}
  priority={true} // Above fold
  placeholder="blur"
  formats={['image/avif', 'image/webp']}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### Code Splitting
- **Route-based**: Automatic with Next.js App Router
- **Component-based**: Dynamic imports for heavy components
- **Third-party**: Separate chunks for analytics and tracking

### Caching Strategy
```typescript
// Static pages (24 hours)
export const revalidate = 86400;

// Dynamic content (1 hour)
export const revalidate = 3600;

// API routes with caching headers
res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
```

### Bundle Optimization
- **Tree Shaking**: Remove unused code
- **Bundle Analysis**: Track bundle size changes
- **Critical CSS**: Inline above-the-fold styles
- **Font Optimization**: Variable fonts with font-display: swap

## SEO Implementation

### Meta Tags Structure
```typescript
export const metadata: Metadata = {
  title: 'Petroleum ERP Solutions | Oil & Gas Operations Management',
  description: 'Transform petroleum operations with OilFlow BIDEC ERP...',
  keywords: ['petroleum ERP', 'oil and gas software', ...],
  openGraph: {
    title: '...',
    description: '...',
    images: [{ url: '...', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    // ...
  },
};
```

### Structured Data
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "OilFlow BIDEC ERP",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "category": "Enterprise Software"
  }
}
```

### Keyword Strategy
- **Primary**: petroleum ERP, oil and gas software
- **Secondary**: upstream operations, downstream processing
- **Long-tail**: petroleum compliance management system
- **Local**: Houston petroleum software, Texas oil ERP

## Security Implementation

### Headers Configuration
```javascript
// next.config.js security headers
headers: [
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
]
```

### Form Security
- **CSRF Protection**: Built-in with Next.js
- **Input Validation**: Zod schema validation
- **Rate Limiting**: API route protection
- **Data Sanitization**: XSS prevention

## Analytics & Tracking

### Conversion Events
```typescript
// Demo request tracking
conversionEvents.demoRequested(companySize, industry);

// ROI calculator usage
conversionEvents.roiCalculated(revenue, employees);

// Content engagement
conversionEvents.contentEngagement(contentType, timeSpent);
```

### Performance Monitoring
```typescript
// Core Web Vitals tracking
PerformanceMonitor.getInstance().trackWebVitals();

// Custom metrics
performance.mark('hero-rendered');
performance.measure('hero-load-time', 'navigation-start', 'hero-rendered');
```

### Lead Scoring
```typescript
// Behavioral scoring
const score = LeadScoring.calculateScore([
  'pageView',
  'demoRequest', 
  'roiCalculation',
  'multiplePages'
]);

const quality = LeadScoring.getLeadQuality(score); // 'qualified', 'hot', 'warm', 'cold'
```

## Content Management

### Contentful Integration
- **Content Types**: Blog posts, case studies, features, testimonials
- **Rich Text**: React renderer for formatted content
- **Assets**: Optimized image delivery
- **Webhooks**: Automatic revalidation on content updates

### Content Strategy
```typescript
// Automated content fetching
const posts = await getBlogPosts(6); // Latest 6 posts
const caseStudies = await getCaseStudies(3); // Featured case studies
const features = await getFeatures('upstream'); // Category-specific features
```

## Mobile Optimization

### Responsive Design
- **Breakpoints**: Mobile-first approach
- **Touch Targets**: 44px minimum size
- **Navigation**: Collapsible mobile menu
- **Forms**: Touch-optimized inputs

### Progressive Web App
- **Manifest**: Complete PWA configuration
- **Service Worker**: Offline functionality
- **App Icons**: Multiple sizes and formats
- **Install Prompt**: Native app-like experience

## Development Workflow

### Code Quality
```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Testing
npm run test

# Bundle analysis
npm run analyze
```

### Git Workflow
1. Feature branches from `main`
2. Pull request reviews required
3. Automated testing on PRs
4. Deployment on merge to `main`

### Environment Management
- **Development**: Local with hot reload
- **Staging**: Preview deployments on Vercel
- **Production**: Optimized build with monitoring

## API Integration Patterns

### Contentful API
```typescript
// Static data fetching
export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map(post => ({ slug: post.fields.slug }));
}

// Dynamic data with ISR
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  return generateSEO({
    title: post.fields.title,
    description: post.fields.excerpt,
  });
}
```

### Form API Routes
```typescript
// Validated API endpoints
export async function POST(request: NextRequest) {
  const data = demoRequestSchema.parse(await request.json());
  // Process form submission
  return NextResponse.json({ success: true });
}
```

## Monitoring & Analytics

### Performance Metrics
- Page load times
- Conversion rates by traffic source
- User engagement metrics
- Form completion rates

### Business Metrics
- Demo request volume
- Lead quality scores
- ROI calculator usage
- Feature interest tracking

### Error Monitoring
- JavaScript error tracking
- API failure monitoring
- Performance regression alerts
- Uptime monitoring

## Scalability Considerations

### Traffic Handling
- **CDN**: Global edge caching
- **Compression**: Gzip/Brotli compression
- **Image Optimization**: Automatic format selection
- **API Caching**: Intelligent cache invalidation

### Content Scaling
- **ISR**: Handle high-traffic content updates
- **Database**: Prepared for user data storage
- **Search**: Ready for content search implementation
- **Internationalization**: Structure ready for i18n

## Security Best Practices

### Data Protection
- **GDPR Compliance**: Privacy controls and consent
- **Data Encryption**: HTTPS everywhere
- **Input Validation**: Server-side validation
- **Rate Limiting**: API protection

### Infrastructure Security
- **Environment Variables**: Secure secret management
- **Dependencies**: Regular security audits
- **Headers**: Security header configuration
- **Monitoring**: Security event logging