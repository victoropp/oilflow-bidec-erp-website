import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Ship, MapPin, FileText, Clock, CheckCircle, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Vessel Operations Management | OilFlow BIDEC',
  description: 'Complete vessel management system for Ghana petroleum operations. From nomination to discharge with integrated logistics and documentation.',
  keywords: 'vessel management Ghana, petroleum logistics, vessel scheduling, discharge monitoring, maritime operations ERP',
};

const features = [
  {
    icon: Ship,
    title: 'Vessel Scheduling',
    description: 'Advanced scheduling system for vessel nominations, berth allocation, and discharge planning.',
  },
  {
    icon: MapPin,
    title: 'Port Operations',
    description: 'Integrated port operations management with real-time berth availability and logistics coordination.',
  },
  {
    icon: FileText,
    title: 'Documentation Workflow',
    description: 'Automated documentation processing for customs, regulatory, and commercial requirements.',
  },
  {
    icon: Clock,
    title: 'Discharge Monitoring',
    description: 'Real-time discharge monitoring with automated batch creation and quality certificate management.',
  },
  {
    icon: CheckCircle,
    title: 'Quality Control',
    description: 'Integrated quality testing workflow with specification compliance and certificate validation.',
  },
  {
    icon: BarChart3,
    title: 'Performance Analytics',
    description: 'Comprehensive analytics on vessel performance, discharge rates, and operational efficiency.',
  }
];

const operationalSteps = [
  {
    step: '1',
    title: 'Vessel Nomination',
    description: 'Submit vessel nominations with cargo details, ETA, and documentation requirements.',
    details: ['Cargo manifest validation', 'Documentation checklist', 'Berth reservation', 'Regulatory notifications']
  },
  {
    step: '2',
    title: 'Arrival & Inspection',
    description: 'Automated arrival processing with inspection scheduling and compliance verification.',
    details: ['Port clearance', 'Safety inspection', 'Quality sampling', 'Documentation review']
  },
  {
    step: '3',
    title: 'Discharge Operations',
    description: 'Real-time discharge monitoring with automated batch tracking and quality control.',
    details: ['Real-time monitoring', 'Batch creation', 'Quality testing', 'Loss calculation']
  },
  {
    step: '4',
    title: 'Completion & Billing',
    description: 'Automated completion processing with invoice generation and performance reporting.',
    details: ['Final reconciliation', 'Invoice generation', 'Performance metrics', 'Documentation archival']
  }
];

const benefits = [
  'Reduce vessel turnaround time by up to 30%',
  'Automated regulatory compliance documentation',
  'Real-time discharge monitoring and reporting',
  'Integrated quality control workflows',
  'Complete audit trail for all operations',
  'Optimized berth utilization and scheduling'
];

export default function VesselOperationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
              Complete Vessel
              <span className="text-primary-600"> Operations Management</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Streamline your vessel operations from nomination to discharge. Integrated logistics, 
              automated documentation, and real-time monitoring for Ghana's petroleum ports.
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
              Comprehensive Vessel Management
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Our vessel operations system provides end-to-end management of maritime petroleum operations.
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

      {/* Operational Process Section */}
      <section className="py-20 bg-primary-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Streamlined Vessel Workflow
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Our system guides vessels through every step of the discharge process with automated workflows and real-time monitoring.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {operationalSteps.map((step) => (
              <div key={step.step} className="bg-white rounded-xl p-8 shadow-lg border border-neutral-200">
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-xl font-bold">{step.step}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-semibold text-neutral-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-neutral-600 mb-4">
                      {step.description}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {step.details.map((detail) => (
                    <li key={detail} className="flex items-center text-sm text-neutral-600">
                      <CheckCircle className="h-4 w-4 text-primary-500 mr-2 flex-shrink-0" />
                      {detail}
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
                Optimize Your Port Operations
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                Our vessel operations system delivers measurable improvements in efficiency, compliance, and operational visibility.
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
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-display font-semibold mb-6">
                Key Performance Metrics
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">30%</div>
                  <div className="text-sm opacity-90">Faster Turnaround</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">99%</div>
                  <div className="text-sm opacity-90">Documentation Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">24/7</div>
                  <div className="text-sm opacity-90">Real-time Monitoring</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">100%</div>
                  <div className="text-sm opacity-90">Regulatory Compliance</div>
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
              Transform Your Vessel Operations
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Join Ghana's leading petroleum companies using our vessel operations system 
              to optimize port efficiency and ensure regulatory compliance.
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