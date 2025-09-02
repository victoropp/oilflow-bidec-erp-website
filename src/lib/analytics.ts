// Analytics and tracking utilities

// Google Analytics 4 configuration
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Page view tracking
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID!, {
      page_path: url,
    });
  }
};

// Event tracking
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Conversion tracking events
export const conversionEvents = {
  // Demo requests
  demoRequested: (companySize?: string, industry?: string) => {
    event({
      action: 'demo_requested',
      category: 'conversion',
      label: `${companySize || 'unknown'}_${industry || 'unknown'}`,
    });
  },

  // Form submissions
  contactFormSubmitted: (formType: string) => {
    event({
      action: 'contact_form_submitted',
      category: 'engagement',
      label: formType,
    });
  },

  // ROI calculator usage
  roiCalculated: (annualRevenue: number, employees: number) => {
    event({
      action: 'roi_calculated',
      category: 'engagement',
      label: `revenue_${annualRevenue}_employees_${employees}`,
    });
  },

  // Content engagement
  contentEngagement: (contentType: string, timeSpent: number) => {
    event({
      action: 'content_engagement',
      category: 'engagement',
      label: contentType,
      value: Math.round(timeSpent),
    });
  },

  // Video interactions
  videoPlayed: (videoId: string, position: number) => {
    event({
      action: 'video_play',
      category: 'engagement',
      label: videoId,
      value: position,
    });
  },

  videoCompleted: (videoId: string) => {
    event({
      action: 'video_complete',
      category: 'engagement',
      label: videoId,
    });
  },

  // Navigation tracking
  navigationClick: (linkText: string, destination: string) => {
    event({
      action: 'navigation_click',
      category: 'navigation',
      label: `${linkText}_to_${destination}`,
    });
  },

  // Feature interest tracking
  featureInterest: (featureName: string, action: string) => {
    event({
      action: 'feature_interest',
      category: 'product',
      label: `${featureName}_${action}`,
    });
  },
};

// User behavior tracking
export class UserBehaviorTracker {
  private startTime: number;
  private interactions: number = 0;
  private scrollDepth: number = 0;

  constructor() {
    this.startTime = Date.now();
    this.setupScrollTracking();
    this.setupInteractionTracking();
  }

  private setupScrollTracking() {
    if (typeof window === 'undefined') return;

    let ticking = false;
    
    const updateScrollDepth = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const depth = Math.round((scrolled / maxScroll) * 100);
      
      if (depth > this.scrollDepth) {
        this.scrollDepth = depth;
        
        // Track scroll milestones
        if (depth >= 25 && depth < 50) {
          event({
            action: 'scroll_depth',
            category: 'engagement',
            label: '25_percent',
          });
        } else if (depth >= 50 && depth < 75) {
          event({
            action: 'scroll_depth',
            category: 'engagement',
            label: '50_percent',
          });
        } else if (depth >= 75 && depth < 90) {
          event({
            action: 'scroll_depth',
            category: 'engagement',
            label: '75_percent',
          });
        } else if (depth >= 90) {
          event({
            action: 'scroll_depth',
            category: 'engagement',
            label: '90_percent',
          });
        }
      }
      
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDepth);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  private setupInteractionTracking() {
    if (typeof window === 'undefined') return;

    const trackInteraction = () => {
      this.interactions++;
    };

    // Track clicks, touches, and key presses
    window.addEventListener('click', trackInteraction, { passive: true });
    window.addEventListener('touchstart', trackInteraction, { passive: true });
    window.addEventListener('keydown', trackInteraction, { passive: true });
  }

  // Send engagement data when user leaves
  sendEngagementData(pagePath: string) {
    const timeSpent = Date.now() - this.startTime;
    const engagementScore = Math.min(
      (this.interactions / 10) * 0.4 + 
      (this.scrollDepth / 100) * 0.4 + 
      (Math.min(timeSpent / 60000, 5) / 5) * 0.2,
      1
    );

    event({
      action: 'page_engagement',
      category: 'engagement',
      label: pagePath,
      value: Math.round(engagementScore * 100),
    });

    // Send time on page
    event({
      action: 'time_on_page',
      category: 'engagement',
      label: pagePath,
      value: Math.round(timeSpent / 1000), // in seconds
    });
  }
}

// Lead scoring based on actions
export class LeadScoring {
  private static scores = {
    pageView: 1,
    demoRequest: 50,
    contactForm: 30,
    roiCalculation: 25,
    videoWatch: 15,
    resourceDownload: 20,
    pricingView: 35,
    multiplePages: 10,
    returnVisitor: 15,
  };

  static calculateScore(actions: string[]): number {
    return actions.reduce((total, action) => {
      return total + (this.scores[action as keyof typeof this.scores] || 0);
    }, 0);
  }

  static getLeadQuality(score: number): 'cold' | 'warm' | 'hot' | 'qualified' {
    if (score >= 80) return 'qualified';
    if (score >= 50) return 'hot';
    if (score >= 25) return 'warm';
    return 'cold';
  }
}

// A/B testing utilities
export class ABTesting {
  static getVariant(testName: string, variants: string[]): string {
    if (typeof window === 'undefined') return variants[0];
    
    const userId = this.getUserId();
    const hash = this.hashCode(`${testName}_${userId}`);
    const index = Math.abs(hash) % variants.length;
    
    return variants[index];
  }

  private static getUserId(): string {
    if (typeof window === 'undefined') return 'server';
    
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = Math.random().toString(36).substring(2, 15);
      localStorage.setItem('userId', userId);
    }
    return userId;
  }

  private static hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }

  static trackVariant(testName: string, variant: string) {
    event({
      action: 'ab_test_view',
      category: 'ab_testing',
      label: `${testName}_${variant}`,
    });
  }
}

// Heat mapping and user session recording (placeholder for integration)
export const heatMapping = {
  // Initialize heat mapping service (e.g., Hotjar, Fullstory)
  init: () => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      // Initialize your heat mapping service here
      console.log('Heat mapping service initialized');
    }
  },

  // Track specific interactions
  trackInteraction: (element: string, action: string) => {
    event({
      action: 'element_interaction',
      category: 'ux',
      label: `${element}_${action}`,
    });
  },
};