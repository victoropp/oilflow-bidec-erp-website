import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Target, Package, Users, Zap, Clock, BarChart3, Calculator, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Sales Allocation System | OilFlow BIDEC',
  description: 'Advanced multi-method sales allocation system for petroleum trading. Intelligent batch allocation with customer prioritization, multiple allocation methods, and automated inventory management.',
  keywords: 'sales allocation Ghana, petroleum inventory management, batch allocation system, customer priority allocation, inventory optimization',
};

const allocationFeatures = [
  {
    icon: Target,
    title: 'Multi-Method Allocation Engine',
    description: 'Sophisticated allocation system supporting FIFO, LIFO, Weighted Average, Specific Batch, Proportional, and Customer Priority methods based on business requirements.',
  },
  {
    icon: Package,
    title: 'Intelligent Batch Matching',
    description: 'Advanced matching algorithm that allocates petroleum batches to sales orders based on product specifications, quality requirements, and strategic business rules.',
  },
  {
    icon: Calculator,
    title: 'Dual Currency COGS Tracking',
    description: 'Granular cost tracking with provisional and final pricing support, maintaining accurate inventory valuation in both GHS and USD currencies.',
  },
  {
    icon: Users,
    title: 'Customer Priority Matrix',
    description: 'Advanced customer classification system (Export, Commercial, Retail, Internal, Spot) with configurable priority weighting for optimal allocation decisions.',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Availability Engine',
    description: 'Live tracking of batch availability across all depots with instant updates for allocated, available, and delivered quantities.',
  },
  {
    icon: Zap,
    title: 'Business Rule Automation',
    description: 'Configurable allocation rules supporting multiple methods with weighted scoring for cost optimization, quality matching, and customer priority.',
  },
];

const allocationProcess = [
  {
    step: '1',
    title: 'Sales Order Creation',
    description: 'Customer places order with product specifications, quantity, delivery requirements, and priority classification.',
  },
  {
    step: '2',
    title: 'Method Selection & Analysis',
    description: 'System selects optimal allocation method (FIFO, LIFO, Customer Priority, etc.) and analyzes available batches across all depots.',
  },
  {
    step: '3',
    title: 'Batch Allocation Engine',
    description: 'Multi-criteria algorithm processes allocation considering quality specs, customer priority, cost optimization, and business rules.',
  },
  {
    step: '4',
    title: 'COGS Allocation & Tracking',
    description: 'Granular cost tracking with provisional pricing creates binding reservations and updates real-time availability across all locations.',
  },
  {
    step: '5',
    title: 'AP/AR Integration & Reporting',
    description: 'Automatic journal entries for accounts payable/receivable with dual currency precision and margin impact analysis.',
  },
];

const benefits = [
  'Support multiple allocation methods for different business scenarios',
  'Reduce manual allocation errors with automated intelligent matching',
  'Optimize customer satisfaction through priority-based allocation',
  'Maintain accurate dual currency cost flows for financial reporting',
  'Maximize profitability through strategic allocation method selection',
  'Ensure complete traceability from batch to customer delivery',
  'Real-time visibility into allocation performance across all depots',
  'Automated AP/AR integration with margin impact notifications',
];

const keyMetrics = [
  {
    title: 'Allocation Success Rate',
    description: 'Percentage of sales orders successfully allocated using optimal methods',
    importance: 'Measures system efficiency across all allocation methodologies',
  },
  {
    title: 'Method Optimization Score',
    description: 'Effectiveness of allocation method selection for different scenarios',
    importance: 'Critical for maximizing profitability and cost management',
  },
  {
    title: 'Customer Priority Fulfillment',
    description: 'Success rate in meeting priority customer requirements (Export, Commercial, Retail)',
    importance: 'Ensures strategic customer relationship management and retention',
  },
  {
    title: 'COGS Accuracy & Traceability',
    description: 'Precision in batch-to-sale cost tracking with complete audit trails',
    importance: 'Essential for financial reporting accuracy and regulatory compliance',
  },
];

export default function SalesAllocationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              <Target className="h-4 w-4 mr-2" />
              Intelligent Inventory Management
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
              Sales Allocation
              <span className="text-primary-600"> System</span>
            </h1>
            
            <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your petroleum inventory management with advanced multi-method allocation engine. 
              Support FIFO, LIFO, Customer Priority, and Specific Batch methods with complete traceability 
              and intelligent automation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-demo">
                <Button size="lg" className="w-full sm:w-auto">
                  See Allocation Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Multi-Method Allocation Engine
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Sophisticated allocation system supporting six different methods to match your specific business requirements and optimize profitability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allocationFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200 hover:shadow-xl transition-all">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">
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

      {/* Allocation Process */}
      <section className="py-20 bg-blue-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              How Multi-Method Allocation Works
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              From method selection to AP/AR integration - see how our intelligent system processes allocations with complete traceability and dual currency precision.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {allocationProcess.map((step, index) => (
                <div key={step.step} className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {step.step}
                    </div>
                  </div>
                  <div className="ml-6 flex-1">
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">{step.title}</h3>
                    <p className="text-neutral-600 leading-relaxed">{step.description}</p>
                  </div>
                  {index < allocationProcess.length - 1 && (
                    <div className="hidden md:block w-px h-16 bg-neutral-200 ml-6 mt-12" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Performance Metrics That Matter
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Track the metrics that drive successful petroleum trading operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {keyMetrics.map((metric) => (
              <div key={metric.title} className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200">
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">{metric.title}</h3>
                <p className="text-neutral-600 mb-4">{metric.description}</p>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-800 font-medium">Why It Matters:</p>
                  <p className="text-sm text-blue-700">{metric.importance}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-neutral-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-12 text-center">
              Transform Your Allocation Process
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-4 mt-2" />
                  <p className="text-lg text-neutral-700">{benefit}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-blue-100 rounded-xl p-8 text-center">
              <CheckCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-neutral-900 mb-4">
                Complete Batch-to-Sale Traceability
              </h3>
              <p className="text-lg text-neutral-700">
                Our allocation system ensures every gram sold can be traced back to specific batches 
                with granular COGS tracking, dual currency precision, and automated AP/AR integration 
                for complete financial transparency and regulatory compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-primary-600">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
              Ready to Optimize Your Allocations?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Transform your sales allocation process with multi-method intelligence and 
              complete batch traceability for Ghana's petroleum trading operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-demo">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Schedule Allocation Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-blue-700">
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