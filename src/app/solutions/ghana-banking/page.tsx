import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Building2, CreditCard, Shield, Zap, CheckCircle, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Ghana Banking Integration | OilFlow BIDEC',
  description: 'Seamless integration with major Ghanaian banks. Automated payments, reconciliation, and treasury management for petroleum operations.',
  keywords: 'Ghana banking integration, petroleum ERP banking, automated payments Ghana, treasury management, bank reconciliation',
};

const bankingFeatures = [
  {
    icon: Building2,
    title: 'Multi-Bank Connectivity',
    description: 'Direct integration with major Ghanaian banks including GCB, Ecobank, Standard Chartered, and more.',
  },
  {
    icon: CreditCard,
    title: 'Payment Processing',
    description: 'Automated payment processing with bulk transfers, standing orders, and real-time transaction tracking.',
  },
  {
    icon: Shield,
    title: 'Secure Transactions',
    description: 'Bank-grade security with multi-factor authentication and encrypted communication protocols.',
  },
  {
    icon: Zap,
    title: 'Real-time Reconciliation',
    description: 'Automatic bank statement reconciliation with intelligent matching and exception handling.',
  },
  {
    icon: BarChart3,
    title: 'Treasury Management',
    description: 'Comprehensive treasury management with cash flow forecasting and liquidity optimization.',
  },
  {
    icon: CheckCircle,
    title: 'Compliance & Reporting',
    description: 'Automated compliance reporting for Bank of Ghana and other regulatory requirements.',
  }
];

const supportedBanks = [
  { name: 'Ghana Commercial Bank (GCB)', logo: '🏦', features: ['API Integration', 'Bulk Payments', 'Real-time Notifications'] },
  { name: 'Ecobank Ghana', logo: '🏢', features: ['Direct Debit', 'Trade Finance', 'Multi-currency'] },
  { name: 'Standard Chartered', logo: '🏛️', features: ['Treasury Services', 'FX Trading', 'Cash Management'] },
  { name: 'Fidelity Bank', logo: '🏪', features: ['SME Banking', 'Online Banking', 'Mobile Alerts'] },
  { name: 'CAL Bank', logo: '🏬', features: ['Corporate Banking', 'Trade Services', 'Investment Banking'] },
  { name: 'UMB', logo: '🏭', features: ['Merchant Banking', 'Asset Management', 'Advisory Services'] }
];

const benefits = [
  'Eliminate manual bank reconciliation processes',
  'Real-time visibility into cash positions',
  'Automated regulatory compliance reporting',
  'Reduced transaction processing time by 80%',
  'Enhanced fraud detection and prevention',
  'Integrated foreign exchange management'
];

export default function GhanaBankingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
              Ghana Banking
              <span className="text-primary-600"> Integration</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Seamlessly connect with major Ghanaian banks for automated payments, real-time reconciliation, 
              and comprehensive treasury management. Built specifically for Ghana's banking ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-demo">
                <Button size="lg" className="w-full sm:w-auto">
                  See Banking Demo
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
              Comprehensive Banking Solutions
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Our banking integration provides complete financial connectivity for Ghana's petroleum industry.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {bankingFeatures.map((feature) => {
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

      {/* Supported Banks Section */}
      <section className="py-20 bg-primary-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Integrated with Leading Banks
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Direct integration with Ghana's major banking institutions for seamless financial operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportedBanks.map((bank) => (
              <div key={bank.name} className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">{bank.logo}</div>
                  <h3 className="font-semibold text-neutral-900">{bank.name}</h3>
                </div>
                <ul className="space-y-2">
                  {bank.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-neutral-600">
                      <CheckCircle className="h-4 w-4 text-primary-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-6">
                Transform Your Financial Operations
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                Our banking integration eliminates manual processes and provides real-time financial visibility 
                across all your banking relationships.
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
                Integration Capabilities
              </h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-neutral-700">Payment Processing</span>
                  <span className="text-primary-600 font-semibold">Real-time</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-neutral-700">Bank Reconciliation</span>
                  <span className="text-primary-600 font-semibold">Automated</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-neutral-700">FX Rate Updates</span>
                  <span className="text-primary-600 font-semibold">Live Feed</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-neutral-700">Compliance Reporting</span>
                  <span className="text-primary-600 font-semibold">Automatic</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-neutral-700">Security Level</span>
                  <span className="text-primary-600 font-semibold">Bank-grade</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Flow Section */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
              Streamlined Banking Workflow
            </h2>
            <p className="text-lg text-neutral-300 max-w-3xl mx-auto">
              Our system automates the entire banking process from payment initiation to reconciliation.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Payment Initiation</h3>
              <p className="text-sm text-neutral-300">
                Automated payment creation from invoices and purchase orders
              </p>
            </div>
            
            <div>
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">Bank Processing</h3>
              <p className="text-sm text-neutral-300">
                Secure transmission to bank with real-time status updates
              </p>
            </div>
            
            <div>
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Transaction Monitoring</h3>
              <p className="text-sm text-neutral-300">
                Live tracking of transaction status and notifications
              </p>
            </div>
            
            <div>
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">4</span>
              </div>
              <h3 className="font-semibold mb-2">Auto Reconciliation</h3>
              <p className="text-sm text-neutral-300">
                Automatic matching and reconciliation of bank statements
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
              Streamline Your Banking Operations
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Join leading petroleum companies in Ghana who have revolutionized their financial operations 
              with our comprehensive banking integration.
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