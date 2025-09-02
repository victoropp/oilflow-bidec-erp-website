import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
}

export function generateSEO({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  section,
  tags,
}: SEOProps): Metadata {
  const fullTitle = title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`;
  const fullUrl = url ? `${siteConfig.url}${url}` : siteConfig.url;
  const ogImage = image || siteConfig.ogImage;

  // Default petroleum industry keywords
  const defaultKeywords = [
    'petroleum ERP',
    'oil and gas software',
    'energy management system',
    'upstream software',
    'downstream software',
    'midstream operations',
    'petroleum operations management',
    'energy industry ERP',
    'oil field management',
    'refinery operations',
    'compliance software',
    'petroleum analytics',
  ];

  const allKeywords = [...defaultKeywords, ...keywords];

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: allKeywords,
    authors: authors?.map(name => ({ name })) || [{ name: 'BIDEC Solutions' }],
    creator: 'BIDEC Solutions',
    publisher: 'BIDEC Solutions',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors && { authors }),
      ...(section && { section }),
      ...(tags && { tags }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      creator: '@bidec_erp',
      site: '@bidec_erp',
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };

  return metadata;
}

// Generate structured data for different page types
export const structuredData = {
  // Organization schema
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.company.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    foundingDate: siteConfig.company.founded,
    numberOfEmployees: siteConfig.company.employees,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address.street,
      addressLocality: siteConfig.contact.address.city,
      addressRegion: siteConfig.contact.address.state,
      postalCode: siteConfig.contact.address.zip,
      addressCountry: siteConfig.contact.address.country,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.contact.phone,
      email: siteConfig.contact.email,
      contactType: 'customer service',
      availableLanguage: 'English',
    },
    sameAs: [
      siteConfig.links.linkedin,
      siteConfig.links.twitter,
    ],
  },

  // Software application schema
  softwareApplication: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'OilFlow BIDEC ERP',
    description: siteConfig.description,
    url: siteConfig.url,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      category: 'Enterprise Software',
      eligibleCustomerType: 'Business',
    },
    provider: {
      '@type': 'Organization',
      name: siteConfig.company.name,
      url: siteConfig.url,
    },
    featureList: [
      'Real-time petroleum operations monitoring',
      'Compliance management and reporting',
      'Asset tracking and maintenance',
      'Financial management and reporting',
      'Supply chain optimization',
      'Environmental monitoring',
      'Safety management systems',
    ],
  },

  // Product schema
  product: (productName: string, description: string, price?: string) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: productName,
    description,
    brand: {
      '@type': 'Brand',
      name: 'BIDEC',
    },
    manufacturer: {
      '@type': 'Organization',
      name: siteConfig.company.name,
    },
    ...(price && {
      offers: {
        '@type': 'Offer',
        price,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
    }),
  }),

  // Article schema for blog posts
  article: (
    headline: string,
    description: string,
    datePublished: string,
    dateModified: string,
    authorName: string,
    image?: string
  ) => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image: image || siteConfig.ogImage,
    datePublished,
    dateModified,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.company.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
  }),

  // FAQ schema
  faq: (questions: Array<{ question: string; answer: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(qa => ({
      '@type': 'Question',
      name: qa.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: qa.answer,
      },
    })),
  }),

  // Website schema
  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.company.name,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  },
};

// Generate breadcrumb structured data
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

// Petroleum industry specific keywords for different pages
export const petroleumKeywords = {
  upstream: [
    'upstream petroleum operations',
    'oil exploration software',
    'drilling management system',
    'production optimization',
    'reservoir management',
    'well planning software',
    'seismic data management',
    'upstream ERP solution',
  ],
  midstream: [
    'midstream operations',
    'pipeline management software',
    'transportation logistics',
    'storage facility management',
    'petroleum distribution',
    'midstream ERP system',
    'oil transport optimization',
  ],
  downstream: [
    'downstream petroleum processing',
    'refinery management software',
    'petrochemical operations',
    'product distribution',
    'downstream ERP solution',
    'refining optimization',
    'petroleum marketing',
  ],
  compliance: [
    'petroleum regulatory compliance',
    'environmental compliance software',
    'safety management system',
    'HSE reporting',
    'regulatory reporting automation',
    'compliance tracking software',
  ],
  general: [
    'petroleum industry software',
    'oil and gas ERP',
    'energy sector management',
    'petroleum operations optimization',
    'oil company software solutions',
    'energy industry digitization',
  ],
};