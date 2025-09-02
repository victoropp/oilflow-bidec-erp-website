import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Droplets, BarChart3, ShieldCheck, Clock, Database, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Petroleum Batch Management ERP | OilFlow BIDEC Ghana',
  description: 'Complete petroleum batch tracking from vessel discharge to final delivery. Monitor quality, losses, and automate reconciliation for Ghana petroleum operations.',
  keywords: 'batch management, petroleum tracking, vessel discharge, quality control, inventory reconciliation, Ghana petroleum ERP',
};

const keyFeatures = [
  {
    icon: Droplets,
    title: 'Real-time Batch Tracking',
    description: 'Track every petroleum batch from vessel discharge through storage to final delivery with complete traceability.',
    benefits: ['Complete product genealogy', 'Real-time location tracking', 'Automatic batch splitting', 'Cross-contamination prevention']
  },
  {
    icon: ShieldCheck,
    title: 'Quality Management',
    description: 'Comprehensive quality control with automated testing workflows and compliance monitoring.',
    benefits: ['Automated quality alerts', 'Specification compliance', 'Certificate management', 'Regulatory reporting']
  },
  {
    icon: BarChart3,
    title: 'Loss Monitoring & Analytics',
    description: 'Advanced loss detection and analysis with predictive insights for operational optimization.',
    benefits: ['Evaporation loss tracking', 'Theft detection alerts', 'Variance analysis', 'Cost impact assessment']
  },
  {
    icon: Database,
    title: 'Automated Reconciliation',
    description: 'Streamlined reconciliation processes with automatic variance detection and reporting.',
    benefits: ['Book vs physical reconciliation', 'Automated variance reports', 'Exception handling', 'Audit trail maintenance']
  }
];

const businessBenefits = [
  {
    title: 'Inventory Accuracy',
    description: 'Achieve 99.5% inventory accuracy with real-time tracking',
    metric: '99.5%',
    improvement: 'accuracy achieved'
  },
  {
    title: 'Loss Reduction',
    description: 'Reduce operational losses through early detection and monitoring',
    metric: '30%',
    improvement: 'loss reduction'
  },
  {
    title: 'Compliance Efficiency',
    description: 'Automate regulatory reporting and quality compliance',
    metric: '75%',
    improvement: 'time saved'
  },
  {
    title: 'Reconciliation Speed',
    description: 'Accelerate monthly reconciliation processes',
    metric: '5x',
    improvement: 'faster processing'
  }
];

const workflowSteps = [
  {
    step: '01',
    title: 'Vessel Discharge',
    description: 'Automatic batch creation upon vessel discharge with complete documentation',
    icon: Droplets
  },
  {
    step: '02',
    title: 'Quality Testing',
    description: 'Integrated quality management with automated testing workflows',
    icon: ShieldCheck
  },
  {
    step: '03',
    title: 'Storage Tracking',
    description: 'Real-time monitoring in storage tanks with loss detection',
    icon: Database
  },
  {
    step: '04',
    title: 'Distribution',
    description: 'Batch splitting and tracking through distribution network',
    icon: TrendingUp
  }
];

const complianceFeatures = [
  'NPA batch reporting requirements',
  'EPA environmental compliance tracking',
  'Bank of Ghana foreign exchange documentation',
  'Customs and excise duty calculations',
  'Quality specification adherence',
  'Audit trail for regulatory inspections'
];

export default function BatchManagementPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
              Complete Petroleum
              <span className="text-primary-600"> Batch Management</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Track every petroleum batch from vessel discharge to final delivery with complete traceability, 
              quality control, and automated reconciliation built for Ghana's petroleum industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-demo">
                <Button size="lg" className="w-full sm:w-auto">
                  Request Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/petroleum-trading">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  View All Solutions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Comprehensive Batch Management
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Every feature designed specifically for Ghana's petroleum trading operations and regulatory requirements.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {keyFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-white rounded-xl border border-neutral-200 p-8 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start mb-6">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <Icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-display font-semibold text-neutral-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-neutral-600 mb-4 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-neutral-900 mb-3">Key Benefits:</h4>
                    <div className="space-y-2">
                      {feature.benefits.map((benefit) => (
                        <div key={benefit} className="flex items-center text-sm text-neutral-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-20 bg-primary-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Batch Management Workflow
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Streamlined processes that guide your petroleum batches through every stage of operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflowSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="bg-white rounded-xl p-6 text-center shadow-lg border border-neutral-200 relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mt-4 mb-4">
                    <Icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-neutral-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Business Benefits */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Measurable Business Impact
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Our batch management solution delivers quantifiable results for Ghana's petroleum companies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {businessBenefits.map((benefit) => (
              <div key={benefit.title} className="bg-white rounded-xl p-6 text-center shadow-lg border border-neutral-200">
                <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">
                  {benefit.metric}
                </div>
                <p className="text-sm text-primary-700 font-medium mb-3">
                  {benefit.improvement}
                </p>
                <h3 className="font-display font-semibold text-neutral-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
                Ghana Regulatory Compliance Built-In
              </h2>
              <p className="text-lg text-neutral-300 mb-8">
                Our batch management system ensures full compliance with all Ghana petroleum regulations, 
                from NPA reporting to environmental compliance tracking.
              </p>
              <div className="space-y-4">
                {complianceFeatures.map((feature) => (
                  <div key={feature} className="flex items-center">
                    <ShieldCheck className="w-5 h-5 text-primary-400 mr-3 flex-shrink-0" />
                    <span className="text-neutral-200">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-primary-600 rounded-2xl p-8">
              <h3 className="text-2xl font-display font-semibold mb-6">
                Why Compliance Matters
              </h3>
              <div className="space-y-4">
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Avoid Penalties</h4>
                  <p className="text-sm opacity-90">Prevent costly regulatory fines and operational shutdowns</p>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Maintain Licenses</h4>
                  <p className="text-sm opacity-90">Ensure continuous operations with up-to-date compliance</p>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Build Trust</h4>
                  <p className="text-sm opacity-90">Demonstrate reliability to partners and stakeholders</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 bg-primary-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-6">
              Seamless Integration with Your Operations
            </h2>
            <p className="text-lg text-neutral-600 mb-12">
              Our batch management module integrates perfectly with all other OilFlow BIDEC modules and your existing systems.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200">
                <TrendingUp className="w-12 h-12 text-primary-600 mb-4" />
                <h3 className="text-lg font-display font-semibold text-neutral-900 mb-3">
                  Financial Integration
                </h3>
                <p className="text-neutral-600 text-sm">
                  Automatic cost allocation and financial reporting integration with Ghana banking systems.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200">
                <Clock className="w-12 h-12 text-primary-600 mb-4" />
                <h3 className="text-lg font-display font-semibold text-neutral-900 mb-3">
                  Real-time Updates
                </h3>
                <p className="text-neutral-600 text-sm">
                  Live data synchronization across vessel operations, depot management, and delivery systems.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200">
                <AlertTriangle className="w-12 h-12 text-primary-600 mb-4" />
                <h3 className="text-lg font-display font-semibold text-neutral-900 mb-3">
                  Smart Alerts
                </h3>
                <p className="text-neutral-600 text-sm">
                  Proactive notifications for quality issues, loss thresholds, and compliance requirements.
                </p>
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
              Ready to Transform Your Batch Management?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              See how our comprehensive batch management solution can improve accuracy, reduce losses, 
              and ensure compliance for your petroleum operations in Ghana.
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