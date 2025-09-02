import React from 'react';
import { Metadata } from 'next';
import { DemoBookingForm } from '@/components/forms/demo-booking-form';
import { DemoFeatures } from '@/components/sections/demo-features';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Request a Demo - OilFlow BIDEC ERP',
  description: 'Schedule a personalized demo of OilFlow BIDEC ERP. See how our petroleum operations management system can transform your business processes.',
  keywords: [
    'petroleum ERP demo',
    'oil and gas software demo',
    'ERP demonstration',
    'petroleum operations demo',
    'BIDEC ERP trial',
  ],
  openGraph: {
    title: 'Request a Demo - OilFlow BIDEC ERP',
    description: 'Schedule a personalized demo of OilFlow BIDEC ERP.',
    url: `${siteConfig.url}/request-demo`,
  },
};

export default function RequestDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50 pt-20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start py-16">
          <DemoFeatures />
          <DemoBookingForm />
        </div>
      </div>
    </div>
  );
}