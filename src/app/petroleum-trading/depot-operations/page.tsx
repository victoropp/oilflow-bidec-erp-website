import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BarChart3, Gauge, Shield, Truck, Database, AlertCircle, MapPin, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Depot Operations Management ERP | OilFlow BIDEC Ghana',
  description: 'Comprehensive depot management with tank monitoring, inventory control, distribution planning and safety compliance for Ghana petroleum operations.',
  keywords: 'depot management, tank monitoring, inventory control, distribution planning, safety compliance, Ghana petroleum depot ERP',
};

const keyFeatures = [
  {
    icon: Gauge,
    title: 'Real-time Tank Monitoring',
    description: 'Advanced tank monitoring with automated gauge readings, temperature tracking, and capacity management.',
    benefits: ['Automated gauge readings', 'Temperature monitoring', 'Capacity optimization', 'Loss detection alerts']
  },
  {
    icon: Database,
    title: 'Inventory Control System',
    description: 'Comprehensive inventory management with real-time stock levels, automated reordering, and product segregation.',
    benefits: ['Real-time stock levels', 'Automated reordering', 'Product segregation', 'Expiry date tracking']
  },
  {
    icon: Truck,
    title: 'Distribution Planning',
    description: 'Intelligent distribution planning with route optimization, load scheduling, and delivery tracking.',
    benefits: ['Route optimization', 'Load scheduling', 'Delivery tracking', 'Customer prioritization']
  },
  {
    icon: Shield,
    title: 'Safety & Compliance',
    description: 'Built-in safety protocols and regulatory compliance monitoring for Ghana petroleum standards.',
    benefits: ['Safety protocol enforcement', 'Compliance monitoring', 'Incident reporting', 'Environmental tracking']
  }
];

const operationalMetrics = [
  {
    title: 'Storage Efficiency',
    description: 'Maximize tank utilization and minimize storage costs',
    metric: '95%',
    improvement: 'capacity utilization'
  },
  {
    title: 'Distribution Speed',
    description: 'Accelerate product dispatch and delivery scheduling',
    metric: '40%',
    improvement: 'faster dispatch'
  },
  {
    title: 'Safety Compliance',
    description: 'Maintain perfect safety records with automated monitoring',
    metric: '100%',
    improvement: 'compliance rate'
  },
  {
    title: 'Cost Reduction',
    description: 'Reduce operational costs through optimization',
    metric: '25%',
    improvement: 'cost savings'
  }
];

const depotWorkflow = [
  {
    step: '01',
    title: 'Product Reception',
    description: 'Automated product receiving with quality checks and tank allocation',
    icon: Database
  },
  {
    step: '02',
    title: 'Storage Management',
    description: 'Intelligent tank management with monitoring and optimization',
    icon: Gauge
  },
  {
    step: '03',
    title: 'Quality Control',
    description: 'Continuous quality monitoring and compliance verification',
    icon: Shield
  },
  {
    step: '04',
    title: 'Distribution',
    description: 'Efficient product dispatch with route planning and tracking',
    icon: Truck
  }
];

const safetyFeatures = [
  'Automated fire suppression system integration',
  'Environmental spill detection and response',
  'Personnel safety tracking and alerts',
  'Equipment maintenance scheduling',
  'Emergency response procedures',
  'Regulatory inspection readiness',
  'Hazardous material handling protocols',
  'Safety training compliance tracking'
];

const ghanaCompliance = [
  {
    title: 'NPA Standards',
    description: 'Full compliance with National Petroleum Authority depot operation requirements',
    icon: Shield
  },
  {
    title: 'EPA Regulations',
    description: 'Environmental compliance monitoring and automated reporting',
    icon: AlertCircle
  },
  {
    title: 'Fire Service Requirements',
    description: 'Integration with Ghana National Fire Service safety protocols',
    icon: CheckCircle
  }
];

export default function DepotOperationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
              Advanced Petroleum
              <span className="text-primary-600"> Depot Operations</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Comprehensive depot management with tank monitoring, inventory control, distribution planning, 
              and safety compliance designed specifically for Ghana's petroleum storage facilities.
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
              Complete Depot Management Suite
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Every feature engineered for the unique requirements of Ghana's petroleum storage and distribution facilities.
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
                    <h4 className="font-medium text-neutral-900 mb-3">Key Capabilities:</h4>
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

      {/* Depot Workflow */}
      <section className="py-20 bg-primary-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Streamlined Depot Operations
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Integrated workflow management that optimizes every aspect of your depot operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {depotWorkflow.map((step) => {
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

      {/* Operational Metrics */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Proven Operational Excellence
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Our depot management solution delivers measurable improvements across all key performance indicators.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {operationalMetrics.map((metric) => (
              <div key={metric.title} className="bg-white rounded-xl p-6 text-center shadow-lg border border-neutral-200">
                <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">
                  {metric.metric}
                </div>
                <p className="text-sm text-primary-700 font-medium mb-3">
                  {metric.improvement}
                </p>
                <h3 className="font-display font-semibold text-neutral-900 mb-2">
                  {metric.title}
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ghana Compliance Section */}
      <section className="py-20 bg-primary-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Ghana Regulatory Compliance
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Built-in compliance with all Ghana petroleum depot regulations and safety standards.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {ghanaCompliance.map((compliance) => {
              const Icon = compliance.icon;
              return (
                <div key={compliance.title} className="bg-white rounded-xl p-8 text-center shadow-lg border border-neutral-200">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-neutral-900 mb-4">
                    {compliance.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {compliance.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Safety Features Section */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
                Comprehensive Safety Management
              </h2>
              <p className="text-lg text-neutral-300 mb-8">
                Advanced safety protocols and monitoring systems ensure the highest standards of safety 
                across all depot operations in accordance with Ghana safety regulations.
              </p>
              <div className="grid grid-cols-1 gap-3">
                {safetyFeatures.map((feature) => (
                  <div key={feature} className="flex items-center">
                    <Shield className="w-5 h-5 text-primary-400 mr-3 flex-shrink-0" />
                    <span className="text-neutral-200">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-primary-600 rounded-2xl p-8">
              <h3 className="text-2xl font-display font-semibold mb-6">
                Why Safety is Critical
              </h3>
              <div className="space-y-4">
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Protect Personnel</h4>
                  <p className="text-sm opacity-90">Ensure worker safety with automated monitoring and alerts</p>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Prevent Incidents</h4>
                  <p className="text-sm opacity-90">Proactive risk management and emergency response systems</p>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Maintain Operations</h4>
                  <p className="text-sm opacity-90">Avoid costly shutdowns and regulatory penalties</p>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Community Trust</h4>
                  <p className="text-sm opacity-90">Build confidence with local communities and stakeholders</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Benefits */}
      <section className="py-20 bg-primary-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-6">
              Seamless System Integration
            </h2>
            <p className="text-lg text-neutral-600 mb-12">
              Our depot operations module integrates seamlessly with all OilFlow BIDEC modules and external systems.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200">
                <BarChart3 className="w-12 h-12 text-primary-600 mb-4" />
                <h3 className="text-lg font-display font-semibold text-neutral-900 mb-3">
                  Financial Integration
                </h3>
                <p className="text-neutral-600 text-sm">
                  Automatic cost tracking and financial reporting with Ghana banking system integration.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200">
                <MapPin className="w-12 h-12 text-primary-600 mb-4" />
                <h3 className="text-lg font-display font-semibold text-neutral-900 mb-3">
                  Location Intelligence
                </h3>
                <p className="text-neutral-600 text-sm">
                  GPS tracking and mapping integration for delivery optimization and asset management.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200">
                <Clock className="w-12 h-12 text-primary-600 mb-4" />
                <h3 className="text-lg font-display font-semibold text-neutral-900 mb-3">
                  Real-time Synchronization
                </h3>
                <p className="text-neutral-600 text-sm">
                  Live data sync with batch management, vessel operations, and delivery systems.
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
              Transform Your Depot Operations Today
            </h2>
            <p className="text-lg opacity-90 mb-8">
              See how our comprehensive depot management solution can optimize efficiency, enhance safety, 
              and ensure compliance for your petroleum storage facilities in Ghana.
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