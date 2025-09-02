import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Ship, Anchor, FileText, Clock, MapPin, BarChart3, AlertTriangle, CheckCircle, Globe, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Vessel Operations Management ERP | OilFlow BIDEC Ghana',
  description: 'End-to-end vessel management from nomination to discharge with integrated logistics, documentation, and port operations for Ghana petroleum trading.',
  keywords: 'vessel operations, ship management, port operations, discharge monitoring, vessel scheduling, Ghana petroleum vessel ERP',
};

const keyFeatures = [
  {
    icon: Ship,
    title: 'Vessel Scheduling & Planning',
    description: 'Comprehensive vessel scheduling with berth planning, cargo optimization, and port coordination.',
    benefits: ['Automated berth allocation', 'Cargo load planning', 'Port coordination', 'Schedule optimization']
  },
  {
    icon: Anchor,
    title: 'Port Operations Management',
    description: 'Streamlined port operations with real-time monitoring, customs integration, and discharge tracking.',
    benefits: ['Real-time port monitoring', 'Customs integration', 'Discharge tracking', 'Demurrage management']
  },
  {
    icon: BarChart3,
    title: 'Discharge Monitoring',
    description: 'Advanced discharge monitoring with quality control, quantity verification, and loss tracking.',
    benefits: ['Quality control checks', 'Quantity verification', 'Loss tracking', 'Certificate generation']
  },
  {
    icon: FileText,
    title: 'Documentation Workflow',
    description: 'Complete documentation management from bills of lading to customs clearance and certificates.',
    benefits: ['Digital documentation', 'Customs clearance', 'Certificate management', 'Audit trail']
  }
];

const vesselMetrics = [
  {
    title: 'Discharge Efficiency',
    description: 'Reduce vessel discharge time and port costs',
    metric: '35%',
    improvement: 'faster discharge'
  },
  {
    title: 'Documentation Speed',
    description: 'Accelerate customs and regulatory documentation',
    metric: '60%',
    improvement: 'faster processing'
  },
  {
    title: 'Cost Optimization',
    description: 'Minimize demurrage and port charges',
    metric: '45%',
    improvement: 'cost reduction'
  },
  {
    title: 'Compliance Rate',
    description: 'Maintain perfect regulatory compliance',
    metric: '100%',
    improvement: 'compliance achieved'
  }
];

const vesselWorkflow = [
  {
    step: '01',
    title: 'Vessel Nomination',
    description: 'Automated vessel nomination with supplier coordination and contract management',
    icon: Ship
  },
  {
    step: '02',
    title: 'Port Scheduling',
    description: 'Intelligent port scheduling with berth allocation and resource planning',
    icon: Clock
  },
  {
    step: '03',
    title: 'Discharge Operations',
    description: 'Real-time discharge monitoring with quality control and quantity tracking',
    icon: BarChart3
  },
  {
    step: '04',
    title: 'Documentation',
    description: 'Complete documentation workflow with customs clearance and certification',
    icon: FileText
  }
];

const portOperations = [
  {
    title: 'Tema Oil Refinery',
    description: 'Integrated operations with TOR facilities and infrastructure',
    capabilities: ['Direct pipeline connections', 'Specialized berth management', 'Quality control integration']
  },
  {
    title: 'Takoradi Port',
    description: 'Western region petroleum import operations and logistics',
    capabilities: ['Multi-berth coordination', 'Storage tank allocation', 'Distribution network access']
  },
  {
    title: 'Bulk Oil Storage & Transportation (BOST)',
    description: 'Strategic petroleum reserve operations and commercial storage',
    capabilities: ['Reserve management', 'Commercial storage', 'Strategic stock monitoring']
  }
];

const complianceFeatures = [
  'Ghana Ports and Harbours Authority integration',
  'Customs (GRA) electronic documentation',
  'Ghana Standards Authority quality certificates',
  'Environmental Protection Agency compliance',
  'Ghana Shipping Authority vessel clearance',
  'National Petroleum Authority reporting',
  'Maritime and Docks Workers Union coordination',
  'International Maritime Organization standards'
];

export default function VesselOperationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
              Complete Petroleum
              <span className="text-primary-600"> Vessel Operations</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              End-to-end vessel management from nomination to discharge with integrated logistics, 
              documentation workflow, and port operations designed for Ghana's petroleum import operations.
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
              End-to-End Vessel Management
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Comprehensive vessel operations management tailored for Ghana's petroleum import infrastructure and regulatory environment.
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
                    <h4 className="font-medium text-neutral-900 mb-3">Core Capabilities:</h4>
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

      {/* Vessel Operations Workflow */}
      <section className="py-20 bg-primary-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Optimized Vessel Operations Flow
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Streamlined processes that guide vessels through every stage from nomination to final discharge.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {vesselWorkflow.map((step) => {
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

      {/* Performance Metrics */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Exceptional Operational Results
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Our vessel operations management delivers significant improvements in efficiency, compliance, and cost control.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {vesselMetrics.map((metric) => (
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

      {/* Ghana Port Operations */}
      <section className="py-20 bg-primary-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Ghana Port Integration
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Specialized integration with Ghana's major petroleum handling facilities and port infrastructure.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {portOperations.map((port) => (
              <div key={port.title} className="bg-white rounded-xl p-8 shadow-lg border border-neutral-200">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Anchor className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-display font-semibold text-neutral-900 mb-4 text-center">
                  {port.title}
                </h3>
                <p className="text-neutral-600 text-center mb-6 leading-relaxed">
                  {port.description}
                </p>
                <div className="space-y-2">
                  {port.capabilities.map((capability) => (
                    <div key={capability} className="flex items-center text-sm text-neutral-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {capability}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance & Documentation */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
                Complete Regulatory Compliance
              </h2>
              <p className="text-lg text-neutral-300 mb-8">
                Integrated compliance management with all Ghana maritime, customs, and petroleum authorities 
                ensures smooth vessel operations and regulatory adherence.
              </p>
              <div className="grid grid-cols-1 gap-3">
                {complianceFeatures.map((feature) => (
                  <div key={feature} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary-400 mr-3 flex-shrink-0" />
                    <span className="text-neutral-200">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-primary-600 rounded-2xl p-8">
              <h3 className="text-2xl font-display font-semibold mb-6">
                Why Compliance Excellence Matters
              </h3>
              <div className="space-y-4">
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Avoid Delays</h4>
                  <p className="text-sm opacity-90">Prevent costly vessel delays and demurrage charges</p>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Ensure Clearance</h4>
                  <p className="text-sm opacity-90">Smooth customs and regulatory clearance processes</p>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Maintain Licenses</h4>
                  <p className="text-sm opacity-90">Keep all operational licenses and permits current</p>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Build Reputation</h4>
                  <p className="text-sm opacity-90">Establish trusted relationships with all authorities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Integration */}
      <section className="py-20 bg-primary-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-6">
              Advanced Technology Integration
            </h2>
            <p className="text-lg text-neutral-600 mb-12">
              Cutting-edge technology integration that connects vessel operations with all aspects of your petroleum trading business.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200">
                <Globe className="w-12 h-12 text-primary-600 mb-4" />
                <h3 className="text-lg font-display font-semibold text-neutral-900 mb-3">
                  Satellite Tracking
                </h3>
                <p className="text-neutral-600 text-sm">
                  Real-time vessel tracking with GPS and satellite communication for complete visibility.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200">
                <Zap className="w-12 h-12 text-primary-600 mb-4" />
                <h3 className="text-lg font-display font-semibold text-neutral-900 mb-3">
                  IoT Monitoring
                </h3>
                <p className="text-neutral-600 text-sm">
                  Internet of Things sensors for cargo monitoring, quality control, and equipment status.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200">
                <MapPin className="w-12 h-12 text-primary-600 mb-4" />
                <h3 className="text-lg font-display font-semibold text-neutral-900 mb-3">
                  AI Optimization
                </h3>
                <p className="text-neutral-600 text-sm">
                  Artificial intelligence for route optimization, schedule planning, and predictive maintenance.
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
              Revolutionize Your Vessel Operations
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Transform your vessel operations with our comprehensive management solution designed specifically 
              for Ghana's petroleum import operations and regulatory environment.
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