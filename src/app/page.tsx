import React from 'react';
import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/hero-section';
import { FeaturesSection } from '@/components/sections/features-section';
import { BenefitsSection } from '@/components/sections/benefits-section';
import { ROICalculatorSection } from '@/components/sections/roi-calculator-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { CTASection } from '@/components/sections/cta-section';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Petroleum Trading ERP | Ghana Banking Integration | BIDEC ERP',
  description: 'Specialized ERP for petroleum trading companies in Ghana. Features batch management, daily delivery tracking, price-out system, dual currency support (GHS/USD), and Ghana banking integration.',
  keywords: [
    'petroleum trading ERP Ghana',
    'batch management system',
    'daily delivery tracking',
    'price-out system petroleum',
    'Ghana banking integration ERP',
    'dual currency ERP GHS USD',
    'petroleum sales allocation',
    'vessel management system',
    'depot management Ghana',
    'tank monitoring system',
    'IFRS compliance ERP',
    'petroleum trading software',
  ],
  openGraph: {
    title: 'Petroleum Trading ERP | Ghana Banking Integration | BIDEC ERP',
    description: 'Specialized ERP for petroleum trading companies in Ghana. Features batch management, price-out system, and dual currency support.',
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/og-home.jpg`,
        width: 1200,
        height: 630,
        alt: 'OilFlow BIDEC ERP - Petroleum Trading Management for Ghana',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Petroleum Trading ERP | Ghana Banking Integration | BIDEC ERP',
    description: 'Specialized ERP for petroleum trading companies in Ghana.',
    images: [`${siteConfig.url}/og-home.jpg`],
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
      <ROICalculatorSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}