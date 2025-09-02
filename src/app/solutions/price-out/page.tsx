import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calculator, TrendingUp, Target, DollarSign, BarChart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Price-Out System for Petroleum Trading | OilFlow BIDEC',
  description: 'Advanced pricing engine for Ghana petroleum operations. Real-time market integration, margin optimization, and dynamic cost allocation.',
  keywords: 'petroleum pricing system, Ghana fuel prices, margin optimization, cost allocation, petroleum ERP pricing',
};

const features = [
  {
    icon: Calculator,
    title: 'Dynamic Pricing Engine',
    description: 'Advanced algorithms calculate optimal prices based on costs, market conditions, and margin targets.',
  },
  {
    icon: TrendingUp,
    title: 'Real-time Market Data',
    description: 'Live integration with global petroleum markets for accurate and competitive pricing decisions.',
  },
  {
    icon: Target,
    title: 'Margin Optimization',
    description: 'Intelligent margin calculation ensuring profitability while maintaining market competitiveness.',
  },
  {
    icon: DollarSign,
    title: 'Cost Allocation',
    description: 'Comprehensive cost tracking including transportation, storage, handling, and regulatory fees.',
  },
  {
    icon: BarChart,
    title: 'Price Analytics',
    description: 'Detailed analytics and reporting on pricing performance, trends, and margin analysis.',
  },
  {
    icon: Zap,
    title: 'Automated Updates',
    description: 'Real-time price updates across all systems ensuring consistency and accuracy.',
  }
];

const pricingComponents = [
  { component: 'Product Cost', description: 'Base petroleum product cost from suppliers' },
  { component: 'Transportation', description: 'Vessel, pipeline, and trucking costs' },
  { component: 'Storage & Handling', description: 'Depot operations and handling fees' },
  { component: 'Regulatory Fees', description: 'Ghana petroleum regulatory charges' },
  { component: 'Insurance', description: 'Product and liability insurance costs' },
  { component: 'Margin', description: 'Target profit margin optimization' }
];

const benefits = [
  'Maximize profit margins while staying competitive',
  'Real-time pricing updates across all channels',
  'Automated cost allocation and margin calculation',
  'Comprehensive price analytics and reporting',
  'Integration with Ghana regulatory requirements',
  'Support for GHS and USD pricing'
];

export default function PriceOutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
              Intelligent Petroleum
              <span className="text-primary-600"> Pricing System</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Optimize your pricing strategy with our advanced price-out system. Real-time market integration, 
              automated cost allocation, and intelligent margin optimization for maximum profitability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-demo">
                <Button size="lg" className="w-full sm:w-auto">
                  See Pricing Demo
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
              Advanced Pricing Capabilities
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Our price-out system combines market intelligence with operational costs to deliver optimal pricing strategies.
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

      {/* Pricing Components Section */}
      <section className="py-20 bg-primary-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-6">
                Comprehensive Cost Analysis
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                Our system tracks and allocates all cost components to ensure accurate pricing and optimal margin management.
              </p>
              <div className="space-y-4">
                {pricingComponents.map((item) => (
                  <div key={item.component} className="flex items-start">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 mt-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-neutral-900">{item.component}</h4>
                      <p className="text-neutral-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-200">
              <h3 className="text-2xl font-display font-semibold text-neutral-900 mb-6">
                Key Benefits
              </h3>
              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start">
                    <div className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <div className="w-2 h-2 bg-primary-600 rounded-full" />
                    </div>
                    <span className="text-neutral-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Process Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Automated Pricing Workflow
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Our system automates the entire pricing process from cost calculation to market distribution.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Cost Collection</h3>
              <p className="text-sm text-neutral-600">
                Automatic collection of all cost components from integrated systems
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Market Analysis</h3>
              <p className="text-sm text-neutral-600">
                Real-time market data integration for competitive intelligence
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Price Optimization</h3>
              <p className="text-sm text-neutral-600">
                Intelligent algorithms optimize prices for maximum profitability
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Distribution</h3>
              <p className="text-sm text-neutral-600">
                Automated price updates across all sales channels and systems
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
              Proven Results
            </h2>
            <p className="text-lg text-neutral-300 max-w-3xl mx-auto">
              Our pricing system delivers measurable improvements in profitability and operational efficiency.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-400 mb-2">15%</div>
              <div className="text-neutral-300">Average Margin Improvement</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-400 mb-2">95%</div>
              <div className="text-neutral-300">Pricing Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-400 mb-2">24/7</div>
              <div className="text-neutral-300">Real-time Updates</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-400 mb-2">100%</div>
              <div className="text-neutral-300">Regulatory Compliance</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
              Optimize Your Pricing Strategy Today
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Join Ghana's leading petroleum companies using our price-out system to maximize profitability 
              while maintaining competitive market positions.
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