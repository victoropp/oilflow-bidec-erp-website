import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Droplets, Ship, BarChart3, DollarSign, Globe, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Petroleum Trading ERP Solutions for Ghana | OilFlow BIDEC',
  description: 'Comprehensive ERP solutions for Ghana\'s petroleum trading industry. From vessel operations to financial management, built for local market needs.',
  keywords: 'Ghana petroleum ERP, oil trading software, petroleum industry Ghana, fuel distribution ERP, energy sector solutions',
};

const industryModules = [
  {
    icon: Droplets,
    title: 'Batch Management',
    description: 'Complete petroleum batch tracking from vessel discharge to final delivery with real-time inventory monitoring.',
    features: ['Vessel discharge tracking', 'Quality management', 'Loss monitoring', 'Automated reconciliation'],
    href: '/petroleum-trading/batch-management',
  },
  {
    icon: Ship,
    title: 'Vessel Operations',
    description: 'End-to-end vessel management from nomination to discharge with integrated logistics and documentation.',
    features: ['Vessel scheduling', 'Port operations', 'Discharge monitoring', 'Documentation workflow'],
    href: '/petroleum-trading/vessel-operations',
  },
  {
    icon: BarChart3,
    title: 'Depot Operations',
    description: 'Comprehensive depot management with tank monitoring, inventory control, and distribution planning.',
    features: ['Tank monitoring', 'Inventory control', 'Distribution planning', 'Safety compliance'],
    href: '/petroleum-trading/depot-operations',
  },
  {
    icon: DollarSign,
    title: 'Daily Delivery',
    description: 'Streamlined daily delivery operations with route optimization and real-time tracking capabilities.',
    features: ['Route optimization', 'Real-time tracking', 'Driver management', 'Customer notifications'],
    href: '/petroleum-trading/daily-delivery',
  }
];

const ghanaSpecificFeatures = [
  {
    title: 'Ghana Regulatory Compliance',
    description: 'Built-in compliance with NPA, EPA, and other regulatory requirements specific to Ghana\'s petroleum sector.',
    icon: Shield,
  },
  {
    title: 'Local Banking Integration',
    description: 'Direct integration with major Ghanaian banks including GCB, Ecobank, and Standard Chartered for seamless financial operations.',
    icon: Globe,
  },
  {
    title: 'Dual Currency Support',
    description: 'Native GHS/USD operations with real-time exchange rates from Bank of Ghana and automated currency conversion.',
    icon: DollarSign,
  }
];

const marketInsights = [
  { metric: '60%', description: 'Market share of clients using our ERP' },
  { metric: '50+', description: 'Petroleum companies trust our solutions' },
  { metric: '15M+', description: 'Liters managed daily across our platform' },
  { metric: '99.9%', description: 'System uptime ensuring continuous operations' }
];

export default function PetroleumTradingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
              Ghana's Leading
              <span className="text-primary-600"> Petroleum Trading</span> ERP
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Purpose-built for Ghana's petroleum industry. From vessel operations to financial management, 
              our comprehensive ERP solution streamlines every aspect of your petroleum trading operations.
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

      {/* Industry Modules Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Complete Petroleum Trading Suite
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Our integrated modules cover every aspect of petroleum trading operations in Ghana.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {industryModules.map((module) => {
              const Icon = module.icon;
              return (
                <div
                  key={module.title}
                  className="bg-white rounded-xl border border-neutral-200 p-8 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-start mb-6">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <Icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-display font-semibold text-neutral-900 mb-2">
                        {module.title}
                      </h3>
                      <p className="text-neutral-600 mb-4 leading-relaxed">
                        {module.description}
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium text-neutral-900 mb-3">Key Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {module.features.map((feature) => (
                        <div key={feature} className="flex items-center text-sm text-neutral-600">
                          <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link href={module.href}>
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

      {/* Ghana-Specific Features */}
      <section className="py-20 bg-primary-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Built for Ghana's Market
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Our solutions are specifically designed to address the unique requirements of Ghana's petroleum industry.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {ghanaSpecificFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="bg-white rounded-xl p-8 shadow-lg border border-neutral-200 text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-8 w-8 text-primary-600" />
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

      {/* Market Leadership */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Leading Ghana's Petroleum Digital Transformation
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Trusted by Ghana's leading petroleum companies to digitize and optimize their operations.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            {marketInsights.map((insight) => (
              <div key={insight.metric} className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200">
                <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">
                  {insight.metric}
                </div>
                <p className="text-neutral-600 text-sm">
                  {insight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Challenges Section */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
                Solving Real Industry Challenges
              </h2>
              <p className="text-lg text-neutral-300 mb-8">
                Ghana's petroleum industry faces unique challenges. Our ERP solution addresses these head-on with 
                innovative technology and deep industry expertise.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-400 rounded-full mr-3 mt-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Regulatory Complexity</h4>
                    <p className="text-sm text-neutral-300">Automated compliance with NPA, EPA, and banking regulations</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-400 rounded-full mr-3 mt-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Currency Fluctuations</h4>
                    <p className="text-sm text-neutral-300">Real-time FX management and automated hedging strategies</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-400 rounded-full mr-3 mt-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Supply Chain Complexity</h4>
                    <p className="text-sm text-neutral-300">Integrated vessel, depot, and distribution management</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-400 rounded-full mr-3 mt-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Financial Integration</h4>
                    <p className="text-sm text-neutral-300">Seamless banking integration with local financial institutions</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-primary-600 rounded-2xl p-8">
              <h3 className="text-2xl font-display font-semibold mb-6">
                Why Choose OilFlow BIDEC?
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-white rounded-full mr-4" />
                  <span>Purpose-built for Ghana's petroleum sector</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-white rounded-full mr-4" />
                  <span>Deep integration with local banking systems</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-white rounded-full mr-4" />
                  <span>Comprehensive regulatory compliance</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-white rounded-full mr-4" />
                  <span>Proven track record with leading companies</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-white rounded-full mr-4" />
                  <span>24/7 local support and maintenance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
              Ready to Transform Your Petroleum Operations?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Join Ghana's leading petroleum companies who have already transformed their operations 
              with our comprehensive ERP solution. Get started today.
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