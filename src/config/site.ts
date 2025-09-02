export const siteConfig = {
  name: 'OilFlow BIDEC ERP - Petroleum Operations Management System',
  description: 'Advanced ERP solution for petroleum operations. Streamline upstream, midstream, and downstream processes with real-time analytics, compliance tracking, and operational efficiency tools.',
  url: 'https://oilflow-bidec-erp.com',
  ogImage: 'https://oilflow-bidec-erp.com/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/bidec_erp',
    linkedin: 'https://linkedin.com/company/bidec',
    github: 'https://github.com/bidec',
  },
  contact: {
    email: 'info@bidec-erp.com',
    phone: '+44 7442 852675',
    phoneGhana: '+233 248769377',
    address: {
      street: '123 Energy Plaza',
      city: 'Houston',
      state: 'TX',
      zip: '77002',
      country: 'USA',
    },
  },
  company: {
    name: 'BIDEC Solutions',
    founded: '2015',
    employees: '500+',
    headquarters: 'Houston, TX',
  },
  features: {
    enableDemoMode: process.env.NEXT_PUBLIC_ENABLE_DEMO_MODE === 'true',
    enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  },
} as const;

export type SiteConfig = typeof siteConfig;