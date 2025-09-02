import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Truck, MapPin, Clock, BarChart3, CheckCircle, FileText, Globe, DollarSign, Users, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Daily Delivery Tracking System | OilFlow BIDEC',
  description: 'Advanced daily delivery and lifting management for Ghana petroleum terminals. Track actual product movements, manage depot operations, and optimize customer deliveries.',
  keywords: 'petroleum daily delivery Ghana, lifting tracking, depot operations, petroleum distribution, batch allocation, inventory management',
};

const deliveryFeatures = [
  {
    icon: Truck,
    title: 'Daily Lifting Management',
    description: 'Track and manage daily liftings at all terminals and depots with real-time visibility into product movements and customer allocations.',
    capabilities: [
      'Real-time lifting status updates',
      'Multi-terminal coordination',
      'Customer allocation tracking',
      'Product quality verification'
    ]
  },
  {
    icon: MapPin,
    title: 'Depot Operations Control',
    description: 'Comprehensive depot operations management with integrated waybill tracking and destination routing optimization.',
    capabilities: [
      'Depot waybill number generation',
      'Destination routing optimization',
      'Loading bay management',
      'Tank allocation planning'
    ]
  },
  {
    icon: FileText,
    title: 'Customer Request Processing',
    description: 'Streamlined customer request management with automated order processing and delivery scheduling.',
    capabilities: [
      'Customer request number tracking',
      'Order priority management',
      'Delivery schedule optimization',
      'Customer communication portal'
    ]
  },
  {
    icon: BarChart3,
    title: 'Batch Allocation Engine',
    description: 'Intelligent batch allocation system that optimizes product assignments based on quality requirements and logistics constraints.',
    capabilities: [
      'Automated batch selection',
      'Quality-based allocation',
      'Inventory optimization',
      'Loss minimization algorithms'
    ]
  },
  {
    icon: DollarSign,
    title: 'Multi-Currency Support',
    description: 'Complete dual-currency operations support for USD and GHS transactions with real-time exchange rate integration.',
    capabilities: [
      'Dual currency pricing',
      'Real-time exchange rates',
      'Multi-currency reporting',
      'Currency risk management'
    ]
  },
  {
    icon: Shield,
    title: 'Compliance & Audit',
    description: 'Comprehensive audit trails and regulatory compliance for all delivery operations and product movements.',
    capabilities: [
      'Complete transaction audit trails',
      'Regulatory compliance reporting',
      'Quality certificate management',
      'Environmental compliance tracking'
    ]
  }
];

const saleTypes = [
  {
    type: 'SPOT',
    description: 'Immediate delivery sales for urgent customer requirements',
    features: ['Real-time pricing', 'Instant allocation', 'Express processing', 'Premium availability']
  },
  {
    type: 'CONTRACT',
    description: 'Long-term contract deliveries with predetermined terms and schedules',
    features: ['Volume guarantees', 'Price stability', 'Delivery scheduling', 'Performance tracking']
  },
  {
    type: 'TENDER',
    description: 'Government and large corporate tender fulfillment with compliance tracking',
    features: ['Tender specification compliance', 'Documentation management', 'Performance bonds', 'Milestone tracking']
  },
  {
    type: 'SWAP',
    description: 'Product exchange operations with quality matching and logistics optimization',
    features: ['Quality matching', 'Location optimization', 'Cost balancing', 'Settlement tracking']
  }
];

const operationalMetrics = [
  { metric: 'Daily Lifting Capacity', value: '50,000+ MT' },
  { metric: 'Terminal Integration', value: '15+ Locations' },
  { metric: 'Customer Management', value: '500+ Active' },
  { metric: 'Batch Allocation Accuracy', value: '99.8%' },
  { metric: 'Delivery Scheduling', value: 'Real-time' },
  { metric: 'Compliance Reporting', value: 'Automated' }
];

const workflowSteps = [
  {
    step: 1,
    title: 'Customer Request',
    description: 'Customer submits delivery request with specifications',
    details: 'System generates unique customer request number and validates product availability'
  },
  {
    step: 2,
    title: 'Batch Allocation',
    description: 'Automated batch selection based on quality and location',
    details: 'AI-powered allocation engine selects optimal batches meeting customer specifications'
  },
  {
    step: 3,
    title: 'Lifting Scheduling',
    description: 'Optimize lifting schedule across multiple terminals',
    details: 'Coordinate with depot operations to minimize waiting time and maximize efficiency'
  },
  {
    step: 4,
    title: 'Product Movement',
    description: 'Real-time tracking of actual product movements',
    details: 'Live updates on lifting progress with automatic inventory reconciliation'
  },
  {
    step: 5,
    title: 'Delivery Confirmation',
    description: 'Automated delivery confirmation and documentation',
    details: 'Generate delivery certificates and update customer accounts automatically'
  },
  {
    step: 6,
    title: 'Settlement & Reporting',
    description: 'Automated financial settlement and compliance reporting',
    details: 'Process payments and generate required regulatory and management reports'
  }
];

const benefits = [
  'Reduce delivery cycle time by up to 40%',
  'Eliminate manual lifting coordination errors',
  'Real-time visibility across all terminals',
  'Automated compliance with NPA regulations',
  'Optimize inventory utilization and minimize losses',
  'Streamline customer service operations',
  'Comprehensive audit trails for all transactions',
  'Multi-currency operations with risk management'
];

export default function DailyDeliveryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
              Advanced Daily Delivery
              <span className="text-primary-600"> Tracking System</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Streamline your petroleum distribution operations with comprehensive daily delivery management. 
              Track actual product movements, optimize depot operations, and ensure seamless customer service across Ghana's petroleum network.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-demo">
                <Button size="lg" className="w-full sm:w-auto">
                  See Delivery Demo
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

      {/* Core Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Complete Delivery Operations Control
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Our daily delivery system provides end-to-end management of petroleum distribution operations, 
              from customer requests to final delivery confirmation.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {deliveryFeatures.map((feature) => {
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
                  <p className="text-neutral-600 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.capabilities.map((capability) => (
                      <li key={capability} className="flex items-center text-sm text-neutral-600">
                        <CheckCircle className="h-4 w-4 text-primary-500 mr-2 flex-shrink-0" />
                        {capability}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sale Types Section */}
      <section className="py-20 bg-primary-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Complete Sale Type Management
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Handle all types of petroleum sales with specialized workflows for each sale category, 
              ensuring optimal processing and compliance for every transaction type.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {saleTypes.map((saleType) => (
              <div key={saleType.type} className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200 hover:shadow-xl transition-shadow">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-lg font-bold text-primary-600">{saleType.type}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">{saleType.type} Sales</h3>
                  <p className="text-neutral-600 text-sm mb-4">{saleType.description}</p>
                </div>
                <ul className="space-y-2">
                  {saleType.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-neutral-600">
                      <CheckCircle className="h-3 w-3 text-primary-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operational Metrics */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Proven Performance Metrics
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Our daily delivery system delivers measurable results for petroleum distributors across Ghana, 
              optimizing operations and ensuring reliable service delivery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {operationalMetrics.map((metric) => (
              <div key={metric.metric} className="bg-white rounded-xl p-8 text-center shadow-lg border border-neutral-200">
                <div className="text-3xl font-bold text-primary-600 mb-2">{metric.value}</div>
                <div className="text-neutral-700 font-medium">{metric.metric}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
                Transform Your Distribution Operations
              </h2>
              <p className="text-lg text-neutral-300 mb-8">
                Our daily delivery system delivers measurable improvements in operational efficiency, 
                customer satisfaction, and regulatory compliance for Ghana petroleum distributors.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-primary-900 rounded-2xl p-8">
              <h3 className="text-2xl font-display font-semibold mb-6">
                Key Integration Points
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Globe className="h-6 w-6 text-primary-400 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Terminal Systems</h4>
                    <p className="text-neutral-400 text-sm">Seamless integration with tank gauging and loading systems</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="h-6 w-6 text-primary-400 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Customer Portal</h4>
                    <p className="text-neutral-400 text-sm">Self-service portal for request submission and tracking</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <BarChart3 className="h-6 w-6 text-primary-400 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Analytics Dashboard</h4>
                    <p className="text-neutral-400 text-sm">Real-time performance monitoring and business intelligence</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <DollarSign className="h-6 w-6 text-primary-400 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Financial Systems</h4>
                    <p className="text-neutral-400 text-sm">Automated invoicing and payment processing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Process */}
      <section className="py-20 bg-primary-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Streamlined Delivery Workflow
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Our system automates the entire delivery process, from customer request to final settlement, 
              ensuring efficiency and accuracy at every step.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workflowSteps.map((step) => (
              <div key={step.step} className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                  <span className="text-lg font-bold text-primary-600">{step.step}</span>
                </div>
                <h3 className="text-xl font-display font-semibold text-neutral-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-neutral-600 mb-4 text-sm leading-relaxed">
                  {step.description}
                </p>
                <p className="text-neutral-500 text-xs leading-relaxed">
                  {step.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
                Technical Specifications
              </h2>
              <p className="text-lg text-neutral-600">
                Built with enterprise-grade technology for reliability, scalability, and security.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg border border-neutral-200">
                <h3 className="text-xl font-display font-semibold text-neutral-900 mb-6">Core Capabilities</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium text-neutral-700">Lifting Tracking</span>
                    <span className="text-neutral-600 text-sm">Real-time across terminals</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-neutral-700">Batch Allocation</span>
                    <span className="text-neutral-600 text-sm">AI-powered optimization</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-neutral-700">Customer Management</span>
                    <span className="text-neutral-600 text-sm">Complete lifecycle tracking</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-neutral-700">Currency Support</span>
                    <span className="text-neutral-600 text-sm">USD/GHS with live rates</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-neutral-700">Reporting</span>
                    <span className="text-neutral-600 text-sm">Automated compliance</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg border border-neutral-200">
                <h3 className="text-xl font-display font-semibold text-neutral-900 mb-6">Integration Features</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium text-neutral-700">Terminal Systems</span>
                    <span className="text-neutral-600 text-sm">Tank gauging, loading bays</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-neutral-700">Quality Management</span>
                    <span className="text-neutral-600 text-sm">LIMS integration</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-neutral-700">Financial Systems</span>
                    <span className="text-neutral-600 text-sm">Automated invoicing</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-neutral-700">Customer Portal</span>
                    <span className="text-neutral-600 text-sm">Self-service capabilities</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-neutral-700">Mobile Access</span>
                    <span className="text-neutral-600 text-sm">Field operations support</span>
                  </div>
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
              Optimize Your Delivery Operations Today
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Join leading petroleum distributors in Ghana who trust our daily delivery system to streamline operations, 
              improve customer service, and ensure regulatory compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-demo">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Request Live Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary-700">
                  Contact Sales Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}