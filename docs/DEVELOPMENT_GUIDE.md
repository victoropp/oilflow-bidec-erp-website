# Development Guide - OilFlow BIDEC ERP Website

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Start development server
npm run dev
```

## Project Structure Explained

### `/src/app/` - Next.js 14 App Router
- **layout.tsx**: Root layout with providers, fonts, and global configuration
- **page.tsx**: Homepage with all main sections
- **request-demo/**: Demo booking flow with form and features
- **api/**: Backend API routes for form handling
- **sitemap.ts**: SEO sitemap generation
- **robots.ts**: Search engine directives
- **manifest.ts**: PWA configuration

### `/src/components/` - React Components

#### `/sections/` - Page Sections
- **hero-section.tsx**: Main landing hero with animations and stats
- **features-section.tsx**: Petroleum-specific feature showcase
- **benefits-section.tsx**: Business benefits and industry stats  
- **roi-calculator-section.tsx**: Interactive ROI calculation tool
- **testimonials-section.tsx**: Client testimonials carousel
- **cta-section.tsx**: Conversion-focused call-to-action
- **demo-features.tsx**: Demo page feature highlights

#### `/layout/` - Layout Components
- **header.tsx**: Responsive navigation with dropdown menus
- **footer.tsx**: Comprehensive footer with links and contact info

#### `/forms/` - Form Components
- **demo-booking-form.tsx**: Demo request form with validation

#### `/ui/` - Reusable UI Components
- **button.tsx**: Configurable button component with variants
- **logo.tsx**: Animated SVG logo component
- **animated-counter.tsx**: Number animation component

### `/src/lib/` - Utility Libraries
- **utils.ts**: Common utility functions (cn, formatters, validators)
- **analytics.ts**: GA4 tracking, conversion events, lead scoring
- **contentful.ts**: CMS integration and content fetching
- **performance.ts**: Core Web Vitals monitoring and optimization
- **seo.ts**: SEO metadata generation and structured data

### `/src/config/` - Configuration
- **site.ts**: Site-wide configuration and constants

### `/src/types/` - TypeScript Definitions
- **global.d.ts**: Global type definitions and interfaces

## Key Features Implementation

### 1. Animated Hero Section
```typescript
// Framer Motion animations with staggered effects
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

// Floating background elements
animate={{
  x: [0, 30, 0],
  y: [0, -20, 0],
  scale: [1, 1.1, 1],
}}
```

### 2. Interactive ROI Calculator
```typescript
// Real-time calculations with industry benchmarks
const calculateROI = () => {
  const efficiencyImprovement = 0.25; // 25%
  const costReductionRate = 0.15; // 15%
  const annualBenefit = costSavings + efficiencyGains;
  const roi = ((annualBenefit - implementationCost) / implementationCost) * 100;
};
```

### 3. Form Validation & Submission
```typescript
// Zod schema validation
const demoBookingSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  // ... other validations
});

// React Hook Form integration
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(demoBookingSchema),
});
```

### 4. Performance Monitoring
```typescript
// Core Web Vitals tracking
new PerformanceObserver((list) => {
  const entries = list.getEntries();
  const lastEntry = entries[entries.length - 1];
  trackMetric('LCP', lastEntry.startTime);
}).observe({ entryTypes: ['largest-contentful-paint'] });
```

## Development Workflow

### 1. Environment Setup
```bash
# Required Node.js version
node --version # Should be 18+

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your actual values
```

### 2. Development Commands
```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript checking
npm run test         # Run Jest tests
npm run analyze      # Bundle analysis
```

### 3. Code Quality Checks
```bash
# Pre-commit checks
npm run lint && npm run type-check && npm run test

# Format code
npx prettier --write .

# Check bundle size
npm run analyze
```

## Performance Optimization Checklist

### ✅ Images
- [x] WebP/AVIF format support
- [x] Responsive image sizes
- [x] Lazy loading below fold
- [x] Placeholder blur effects
- [x] Critical image preloading

### ✅ Fonts
- [x] Variable font usage
- [x] Font-display: swap
- [x] Preload critical fonts
- [x] Subset optimization

### ✅ JavaScript
- [x] Code splitting by route
- [x] Dynamic imports for heavy components
- [x] Tree shaking enabled
- [x] Bundle size monitoring

### ✅ CSS
- [x] Critical CSS extraction
- [x] Tailwind CSS optimization
- [x] Unused style removal
- [x] CSS-in-JS optimization

## SEO Optimization Checklist

### ✅ Technical SEO
- [x] Semantic HTML structure
- [x] Meta tags optimization
- [x] Open Graph implementation
- [x] Twitter Cards setup
- [x] Structured data (JSON-LD)
- [x] XML sitemap generation
- [x] Robots.txt optimization

### ✅ Content SEO
- [x] Petroleum industry keywords
- [x] Title tag optimization
- [x] Meta description optimization
- [x] Header tag hierarchy
- [x] Internal linking structure

### ✅ Performance SEO
- [x] Mobile-first design
- [x] Page speed optimization
- [x] Core Web Vitals compliance
- [x] Accessibility standards

## Deployment Process

### 1. Vercel Deployment (Recommended)
```bash
# Connect to Vercel
vercel login
vercel link

# Deploy to production
vercel --prod
```

### 2. Environment Configuration
Set up these environment variables in Vercel dashboard:
- Contentful credentials
- Analytics tracking IDs
- Form handling endpoints
- Feature flags

### 3. Domain Setup
1. Add custom domain in Vercel
2. Configure DNS records
3. Enable automatic HTTPS
4. Set up redirects if needed

### 4. Post-Deployment Verification
- [ ] All pages load correctly
- [ ] Forms submit successfully
- [ ] Analytics tracking works
- [ ] Performance metrics meet targets
- [ ] SEO elements are present

## Testing Strategy

### Unit Tests
```bash
# Run tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test -- --coverage
```

### Performance Tests
```bash
# Lighthouse CI
npm install -g @lhci/cli
lhci autorun

# Bundle analysis
npm run analyze
```

### Manual Testing Checklist
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility
- [ ] Form validation
- [ ] Animation performance
- [ ] Accessibility features

## Content Management Workflow

### 1. Contentful Setup
1. Create Contentful account
2. Set up content types (Blog, Case Study, Feature)
3. Configure webhooks for revalidation
4. Add content and publish

### 2. Content Types
```typescript
// Blog Post content type
interface BlogPostContent {
  title: string;
  slug: string;
  excerpt: string;
  content: any; // Rich text
  featuredImage: any;
  publishedDate: string;
  tags: string[];
}
```

### 3. Content Fetching
```typescript
// Static generation with ISR
export const revalidate = 3600; // 1 hour

export default async function BlogPage() {
  const posts = await getBlogPosts(10);
  return <BlogListing posts={posts} />;
}
```

## Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npm run type-check
```

#### Performance Issues
```bash
# Analyze bundle
npm run analyze

# Check Core Web Vitals
npx lighthouse http://localhost:3000

# Monitor in development
npm run dev -- --turbo
```

#### Deployment Issues
```bash
# Check environment variables
vercel env ls

# View deployment logs
vercel logs

# Test production build locally
npm run build && npm run start
```

## Best Practices

### Component Development
- Use TypeScript for all components
- Implement proper error boundaries
- Follow React best practices
- Use semantic HTML elements

### Performance
- Lazy load non-critical components
- Optimize images before upload
- Monitor bundle size changes
- Use React.memo for expensive components

### SEO
- Include relevant keywords naturally
- Optimize for user intent
- Maintain fast loading times
- Ensure mobile-first design

### Accessibility
- Use semantic HTML
- Provide alt text for images
- Ensure keyboard navigation
- Maintain color contrast ratios

## Support & Resources

### Documentation
- [Next.js 14 Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Contentful](https://www.contentful.com/developers/docs/)

### Community
- Next.js Discord
- Vercel Community
- Stack Overflow

### Monitoring Tools
- Vercel Analytics
- Google Analytics 4
- Google Search Console
- Lighthouse CI