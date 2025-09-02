import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BarChart3, Database, DollarSign, Shield, Globe, Users, Brain, Command, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'ERP Solutions for Ghana Petroleum Trading | OilFlow BIDEC',
  description: 'Comprehensive ERP solutions designed specifically for Ghana\'s petroleum industry. Batch management, financial systems, compliance, and banking integration.',
  keywords: 'Ghana ERP, petroleum trading software, batch management, IFRS compliance, dual currency, banking integration',
};

const solutions = [
  {
    icon: BarChart3,
    title: 'Batch Management',
    description: 'Complete petroleum batch tracking from vessel discharge to final delivery. Real-time inventory monitoring with automated reconciliation.',
    features: ['Vessel discharge tracking', 'Inventory reconciliation', 'Quality management', 'Loss monitoring'],
    href: '/solutions/batch-management',
    category: 'Operations'
  },
  {
    icon: DollarSign,
    title: 'Price-Out System',
    description: 'Dynamic pricing engine for petroleum products with real-time market integration and margin optimization.',
    features: ['Real-time pricing', 'Margin optimization', 'Market integration', 'Cost allocation'],
    href: '/solutions/price-out',
    category: 'Trading'
  },
  {
    icon: Globe,
    title: 'Vessel Operations',
    description: 'End-to-end vessel management from nomination to discharge with integrated logistics and documentation.',
    features: ['Vessel scheduling', 'Discharge monitoring', 'Documentation workflow', 'Logistics coordination'],
    href: '/solutions/vessel-operations',
    category: 'Operations'
  },
  {
    icon: Shield,
    title: 'Ghana Banking Integration',
    description: 'Seamless integration with major Ghanaian banks for automated payments, reconciliation, and treasury management.',
    features: ['Multi-bank connectivity', 'Automated reconciliation', 'Treasury management', 'Payment processing'],
    href: '/solutions/ghana-banking',
    category: 'Financial'
  },
  {
    icon: Database,
    title: 'Dual Currency System',
    description: 'Native support for GHS/USD operations with real-time FX rates and automated currency conversion.',
    features: ['GHS/USD support', 'Real-time FX rates', 'Automated conversion', 'Multi-currency reporting'],
    href: '/solutions/dual-currency',
    category: 'Financial'
  },
  {
    icon: Users,
    title: 'Financial Management',
    description: 'Comprehensive financial suite with IFRS compliance, automated reporting, and integrated accounting.',
    features: ['IFRS compliance', 'Automated reporting', 'General ledger', 'Fixed assets'],
    href: '/solutions/financial-management',
    category: 'Financial'
  },
  {
    icon: Brain,
    title: 'AI-Powered Executive Insights',
    description: 'Revolutionary AI-driven analytics providing predictive insights, anomaly detection, and automated business recommendations for strategic decision-making.',
    features: ['30-90 day revenue forecasting', 'Anomaly detection & alerts', 'AI business recommendations', 'Performance benchmarking'],
    href: '/solutions/ai-insights',
    category: 'Intelligence'
  },
  {
    icon: Command,
    title: 'Command Palette Navigation',
    description: 'Modern command-driven interface for lightning-fast navigation and operations, reducing task completion time dramatically.',
    features: ['Quick navigation', 'Smart search', 'Keyboard shortcuts', 'Action commands'],
    href: '/solutions/command-palette',
    category: 'Operations'
  },
  {
    icon: TrendingUp,
    title: 'Advanced Analytics Suite',
    description: 'Comprehensive business intelligence with customer profitability analysis, seasonal patterns, and trading performance insights.',
    features: ['Customer profitability', 'Seasonal analytics', 'Trading performance', 'Predictive forecasting'],
    href: '/solutions/analytics',
    category: 'Intelligence'
  }
];

const categories = ['All', 'Operations', 'Trading', 'Financial', 'Intelligence'];

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
              ERP Solutions Built for
              <span className="text-primary-600"> Ghana Petroleum</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Comprehensive, integrated solutions designed specifically for Ghana's petroleum trading industry. 
              From batch management to banking integration, we've got your operations covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-demo">
                <Button size="lg" className="w-full sm:w-auto">
                  Request Demo
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

      {/* Solutions Grid */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Integrated ERP Modules
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Each module is designed to work seamlessly together, providing a unified view of your petroleum trading operations.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {solutions.map((solution) => {
              const Icon = solution.icon;
              return (
                <div
                  key={solution.title}
                  className="bg-white rounded-xl border border-neutral-200 p-8 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-center mb-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="ml-4">
                      <span className="text-sm font-medium text-primary-600 uppercase tracking-wide">
                        {solution.category}
                      </span>
                      <h3 className="text-xl font-display font-semibold text-neutral-900">
                        {solution.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-neutral-600 mb-6 leading-relaxed">
                    {solution.description}
                  </p>

                  <ul className="space-y-2 mb-8">
                    {solution.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-neutral-600">
                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link href={solution.href}>
                    <Button variant="outline" className="w-full group-hover:bg-primary-50 group-hover:border-primary-200 group-hover:text-primary-700">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 bg-primary-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-6">
              Seamlessly Integrated Ecosystem
            </h2>
            <p className="text-lg text-neutral-600 mb-12">
              All our solutions work together as a unified system, eliminating data silos and ensuring 
              consistent, accurate information across your entire organization.
            </p>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-200">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Database className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Integrated Platform</h3>
                  <p className="text-sm text-neutral-600">
                    Centralized system for streamlined operations management
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Real-time Updates</h3>
                  <p className="text-sm text-neutral-600">
                    Changes in one module instantly update across all systems
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Unified Workflow</h3>
                  <p className="text-sm text-neutral-600">
                    Streamlined processes from trading to financial reporting
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
              Ready to Transform Your Operations?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              See how our integrated ERP solutions can streamline your petroleum trading operations 
              and drive business growth in Ghana's dynamic market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-demo">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Schedule Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary-700">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}