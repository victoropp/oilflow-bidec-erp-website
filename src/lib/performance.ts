// Performance monitoring and optimization utilities

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  // Measure and track Core Web Vitals
  trackWebVitals() {
    if (typeof window === 'undefined') return;

    // Track Largest Contentful Paint (LCP)
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.set('LCP', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // Track First Input Delay (FID)
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        this.metrics.set('FID', entry.processingStart - entry.startTime);
      });
    }).observe({ entryTypes: ['first-input'] });

    // Track Cumulative Layout Shift (CLS)
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      let clsValue = 0;
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      this.metrics.set('CLS', clsValue);
    }).observe({ entryTypes: ['layout-shift'] });
  }

  // Track custom performance metrics
  mark(name: string) {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark(name);
    }
  }

  measure(name: string, startMark: string, endMark?: string) {
    if (typeof window !== 'undefined' && window.performance) {
      if (endMark) {
        window.performance.measure(name, startMark, endMark);
      } else {
        window.performance.measure(name, startMark);
      }
      
      const measure = window.performance.getEntriesByName(name)[0];
      this.metrics.set(name, measure.duration);
      return measure.duration;
    }
    return 0;
  }

  getMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics);
  }

  // Send metrics to analytics
  sendMetrics() {
    if (typeof window !== 'undefined' && window.gtag) {
      const metrics = this.getMetrics();
      Object.entries(metrics).forEach(([name, value]) => {
        window.gtag('event', 'performance_metric', {
          metric_name: name,
          metric_value: Math.round(value),
        });
      });
    }
  }
}

// Image optimization helpers
export const imageOptimization = {
  // Generate responsive image srcSet
  generateSrcSet(src: string, sizes: number[]): string {
    return sizes
      .map(size => `${src}?w=${size}&q=80 ${size}w`)
      .join(', ');
  },

  // Generate sizes attribute for responsive images
  generateSizes(breakpoints: { size: string; width: string }[]): string {
    return breakpoints
      .map(bp => `(max-width: ${bp.size}) ${bp.width}`)
      .join(', ');
  },

  // Default responsive configurations for common use cases
  hero: {
    sizes: '100vw',
    quality: 85,
    priority: true,
    placeholder: 'blur' as const,
  },
  
  feature: {
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    quality: 80,
    loading: 'lazy' as const,
  },

  thumbnail: {
    sizes: '(max-width: 768px) 50vw, 25vw',
    quality: 75,
    loading: 'lazy' as const,
  },
};

// Preload critical resources
export function preloadCriticalResources() {
  if (typeof window === 'undefined') return;

  // Preload critical fonts
  const fontPreloads = [
    '/fonts/inter-var.woff2',
    '/fonts/space-grotesk-var.woff2',
  ];

  fontPreloads.forEach(font => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.href = font;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });

  // Preload critical images
  const criticalImages = [
    '/images/hero-background.webp',
    '/images/logo.svg',
  ];

  criticalImages.forEach(image => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = image;
    document.head.appendChild(link);
  });
}

// Lazy loading utilities
export function createIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
) {
  if (typeof window === 'undefined') return null;

  return new IntersectionObserver(callback, {
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  });
}

// Bundle analysis helper
export function logBundleInfo() {
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    console.log('🚀 Performance Metrics:');
    console.log('📦 Bundle loaded at:', new Date().toISOString());
    
    // Log performance timing
    window.addEventListener('load', () => {
      const perfData = window.performance.timing;
      const loadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log(`⚡ Page load time: ${loadTime}ms`);
    });
  }
}

// Critical resource hints
export const resourceHints = {
  // DNS prefetch for external domains
  dnsPrefetch: [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://images.ctfassets.net',
    'https://www.google-analytics.com',
  ],
  
  // Preconnect to critical third-party origins
  preconnect: [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ],
  
  // Module preload for critical JavaScript
  modulePreload: [
    '/js/critical.js',
  ],
};