// Global type definitions

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string,
      config?: Record<string, any>
    ) => void;
    dataLayer: Record<string, any>[];
  }
}

// Contentful types
export interface ContentfulAsset {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    file: {
      url: string;
      details: {
        size: number;
        image?: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    };
  };
}

export interface ContentfulEntry<T = any> {
  sys: {
    id: string;
    contentType: {
      sys: {
        id: string;
      };
    };
    createdAt: string;
    updatedAt: string;
  };
  fields: T;
}

// Form types
export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  message: string;
  subject: string;
  consent: boolean;
}

export interface DemoRequestData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  companySize: string;
  industry: string;
  currentSoftware?: string;
  challenges: string;
  preferredDate: string;
  preferredTime: string;
  additionalNotes?: string;
  consent: boolean;
}

// ROI Calculator types
export interface ROIInputs {
  annualRevenue: number;
  employees: number;
  currentEfficiency: number;
  operationalCosts: number;
  currentSoftwareCosts?: number;
  complianceCosts?: number;
}

export interface ROIResults {
  costSavings: number;
  efficiencyGains: number;
  paybackPeriod: number;
  roi: number;
  annualBenefit: number;
  implementationCost: number;
  netBenefit: number;
}

// Navigation types
export interface NavigationItem {
  name: string;
  href: string;
  submenu?: NavigationItem[];
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

// Feature types
export interface Feature {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  benefits: string[];
  useCases: string[];
  techSpecs?: string[];
}

// Testimonial types
export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  title: string;
  company: string;
  companySize: string;
  industry: string;
  rating: number;
  results: {
    efficiency: string;
    costs: string;
    compliance: string;
  };
  image?: string;
  featured?: boolean;
}

// Case study types
export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  company: {
    name: string;
    size: string;
    industry: string;
    location: string;
  };
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
    description: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    title: string;
  };
  image: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
}

// Blog post types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    bio: string;
    image: string;
  };
  publishedAt: string;
  updatedAt: string;
  featuredImage: string;
  tags: string[];
  category: string;
  readTime: number;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

// Analytics types
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

export interface UserBehaviorData {
  sessionId: string;
  userId?: string;
  pageViews: number;
  timeSpent: number;
  interactions: number;
  scrollDepth: number;
  conversionEvents: string[];
  leadScore: number;
}

export {};