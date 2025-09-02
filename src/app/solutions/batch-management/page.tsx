import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Package, BarChart3, CheckCircle, TrendingUp, Database, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Petroleum Batch Management System | OilFlow BIDEC',
  description: 'Advanced batch tracking system for Ghana petroleum operations. Real-time inventory monitoring, automated reconciliation, and quality management.',
  keywords: 'petroleum batch tracking, inventory management Ghana, petroleum ERP, batch reconciliation, quality management',
};

const features = [
  {
    icon: Package,
    title: 'Complete Batch Lifecycle',
    description: 'Track every petroleum batch from vessel discharge to final delivery with complete audit trails and documentation.',
  },
  {
    icon: BarChart3,
    title: 'Real-time Inventory',
    description: 'Live inventory monitoring with automatic updates from all receipt and delivery points across your network.',
  },
  {
    icon: CheckCircle,
    title: 'Quality Assurance',
    description: 'Integrated quality testing workflows with specification compliance and certificate management.',
  },
  {
    icon: TrendingUp,
    title: 'Loss Monitoring',
    description: 'Advanced analytics to identify and minimize operational losses with detailed variance reporting.',
  },
  {
    icon: Database,
    title: 'Automated Reconciliation',
    description: 'Automatic batch reconciliation with configurable tolerance levels and exception handling.',
  },
  {
    icon: Shield,
    title: 'Compliance Tracking',
    description: 'Comprehensive compliance monitoring for regulatory requirements and industry standards.',
  }
];

const benefits = [
  'Reduce inventory discrepancies by up to 95%',
  'Eliminate manual batch tracking errors',
  'Real-time visibility across all locations',
  'Automated regulatory compliance reporting',
  'Streamlined quality control processes',
  'Complete audit trail for all transactions'
];

const specifications = [
  { label: 'Batch Tracking', value: 'Real-time across all facilities' },
  { label: 'Integration', value: 'Tank gauging systems, LIMS' },
  { label: 'Reconciliation', value: 'Automated with configurable tolerances' },
  { label: 'Quality Management', value: 'Full specification compliance' },
  { label: 'Loss Analysis', value: 'Advanced analytics and reporting' },
  { label: 'Compliance', value: 'Ghana petroleum regulations' }
];

export default function BatchManagementPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
              Advanced Petroleum
              <span className="text-primary-600"> Batch Management</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Take complete control of your petroleum inventory with our advanced batch tracking system. 
              From vessel discharge to final delivery, monitor every drop with precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-demo">
                <Button size="lg" className="w-full sm:w-auto">
                  See Live Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Comprehensive Batch Control
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Our batch management system provides end-to-end visibility and control over your petroleum inventory operations.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-white rounded-xl border border-neutral-200 p-8 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-neutral-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-primary-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-6">
                Proven Results for Ghana Petroleum Operations
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                Our batch management system delivers measurable improvements in operational efficiency, 
                inventory accuracy, and regulatory compliance.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-200">
              <h3 className="text-2xl font-display font-semibold text-neutral-900 mb-6">
                System Specifications
              </h3>
              <div className="space-y-4">
                {specifications.map((spec) => (
                  <div key={spec.label} className="flex justify-between items-center py-2 border-b border-neutral-100 last:border-b-0">
                    <span className="font-medium text-neutral-700">{spec.label}</span>
                    <span className="text-neutral-600 text-sm">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Flow Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Streamlined Batch Workflow
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Our system automates the entire batch management process, from initial receipt to final delivery.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Vessel Receipt</h3>
              <p className="text-sm text-neutral-600">
                Automatic batch creation upon vessel discharge with quality certificates
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Quality Testing</h3>
              <p className="text-sm text-neutral-600">
                Integrated testing workflow with automatic specification compliance
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Inventory Allocation</h3>
              <p className="text-sm text-neutral-600">
                Smart allocation to orders based on quality requirements and logistics
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">4</span>
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Delivery & Reconciliation</h3>
              <p className="text-sm text-neutral-600">
                Automated delivery tracking with real-time inventory reconciliation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
              Transform Your Inventory Management Today
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Join leading petroleum companies in Ghana who trust our batch management system 
              to optimize their operations and ensure regulatory compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-demo">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Request Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary-700">
                  Get Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}