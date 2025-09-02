import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Truck, Navigation, Users, Bell, MapPin, Clock, BarChart3, Shield, CheckCircle, Zap, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Daily Delivery Management ERP | OilFlow BIDEC Ghana',
  description: 'Streamlined daily delivery operations with route optimization, real-time tracking, driver management and customer notifications for Ghana petroleum distribution.',
  keywords: 'daily delivery, route optimization, delivery tracking, driver management, customer notifications, Ghana petroleum delivery ERP',
};

const keyFeatures = [
  {
    icon: Navigation,
    title: 'Route Optimization',
    description: 'Intelligent route planning with traffic analysis, fuel efficiency optimization, and delivery scheduling.',
    benefits: ['AI-powered route planning', 'Traffic pattern analysis', 'Fuel efficiency optimization', 'Multi-stop scheduling']
  },
  {
    icon: MapPin,
    title: 'Real-time Tracking',
    description: 'Live GPS tracking of all delivery vehicles with real-time updates and customer notifications.',
    benefits: ['Live GPS tracking', 'Delivery status updates', 'Geofencing alerts', 'Customer notifications']
  },
  {
    icon: Users,
    title: 'Driver Management',
    description: 'Comprehensive driver management with performance tracking, training records, and compliance monitoring.',
    benefits: ['Driver performance metrics', 'Training management', 'License tracking', 'Safety compliance']
  },
  {
    icon: Bell,
    title: 'Customer Communications',
    description: 'Automated customer notifications with delivery updates, estimated arrival times, and digital confirmations.',
    benefits: ['Automated SMS/Email alerts', 'ETA notifications', 'Digital delivery proof', 'Customer feedback']
  }
];

const deliveryMetrics = [
  {
    title: 'On-time Delivery',
    description: 'Achieve exceptional delivery punctuality rates',
    metric: '98%',
    improvement: 'on-time rate'
  },
  {
    title: 'Route Efficiency',
    description: 'Optimize delivery routes and reduce fuel costs',
    metric: '30%',
    improvement: 'cost savings'
  },
  {
    title: 'Customer Satisfaction',
    description: 'Improve customer experience with transparency',
    metric: '95%',
    improvement: 'satisfaction rate'
  },
  {
    title: 'Delivery Speed',
    description: 'Accelerate delivery completion times',
    metric: '40%',
    improvement: 'faster deliveries'
  }
];

const deliveryWorkflow = [
  {
    step: '01',
    title: 'Order Processing',
    description: 'Automated order processing with customer validation and inventory checking',
    icon: BarChart3
  },
  {
    step: '02',
    title: 'Route Planning',
    description: 'Intelligent route optimization with traffic analysis and fuel efficiency',
    icon: Navigation
  },
  {
    step: '03',
    title: 'Dispatch & Track',
    description: 'Real-time dispatch with live tracking and customer notifications',
    icon: Truck
  },
  {
    step: '04',
    title: 'Completion',
    description: 'Digital proof of delivery with customer confirmation and reporting',
    icon: CheckCircle
  }
];

const ghanaOperations = [
  {
    title: 'Greater Accra Coverage',
    description: 'Complete coverage of Accra, Tema, and surrounding areas with optimized urban delivery',
    coverage: '100%',
    areas: ['Accra Metropolitan', 'Tema', 'Ga East', 'Ga West', 'Ashaiman']
  },
  {
    title: 'Ashanti Region',
    description: 'Comprehensive delivery network covering Kumasi and surrounding commercial centers',
    coverage: '95%',
    areas: ['Kumasi Metropolitan', 'Obuasi', 'Ejisu', 'Mampong', 'Bekwai']
  },
  {
    title: 'Western & Central',
    description: 'Strategic coverage of industrial and commercial hubs in Western and Central regions',
    coverage: '85%',
    areas: ['Takoradi', 'Cape Coast', 'Tarkwa', 'Winneba', 'Elmina']
  }
];

const mobileFeatures = [
  'Mobile driver application for Android/iOS',
  'Digital delivery confirmation',
  'Photo and signature capture',
  'Customer feedback collection',
  'Real-time communication',
  'Offline capability for remote areas',
  'Emergency alert system',
  'Performance dashboard'
];

const customerBenefits = [
  {
    title: 'Delivery Transparency',
    description: 'Real-time visibility into delivery status and estimated arrival times',
    icon: Clock
  },
  {
    title: 'Flexible Scheduling',
    description: 'Customer-preferred delivery windows and rescheduling options',
    icon: Bell
  },
  {
    title: 'Digital Experience',
    description: 'Paperless delivery confirmations and digital receipts',
    icon: Smartphone
  }
];

export default function DailyDeliveryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
              Smart Petroleum
              <span className="text-primary-600"> Daily Delivery</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Streamlined daily delivery operations with route optimization, real-time tracking, 
              and automated customer communications built for Ghana's petroleum distribution network.
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
              Complete Delivery Management Suite
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Every feature designed to optimize petroleum delivery operations across Ghana's diverse geography and customer base.
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

      {/* Delivery Workflow */}
      <section className="py-20 bg-primary-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Optimized Delivery Process
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Streamlined workflow that ensures efficient delivery operations from order to completion.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {deliveryWorkflow.map((step) => {
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
              Outstanding Delivery Performance
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Our daily delivery management system consistently delivers exceptional results across all key performance indicators.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {deliveryMetrics.map((metric) => (
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

      {/* Ghana Coverage Areas */}
      <section className="py-20 bg-primary-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Comprehensive Ghana Coverage
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Extensive delivery network covering Ghana's major commercial and industrial centers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {ghanaOperations.map((region) => (
              <div key={region.title} className="bg-white rounded-xl p-8 shadow-lg border border-neutral-200">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-primary-600 mb-2">
                    {region.coverage}
                  </div>
                  <p className="text-sm text-primary-700 font-medium">coverage area</p>
                </div>
                <h3 className="text-xl font-display font-semibold text-neutral-900 mb-4 text-center">
                  {region.title}
                </h3>
                <p className="text-neutral-600 text-center mb-6 leading-relaxed">
                  {region.description}
                </p>
                <div className="space-y-2">
                  <h4 className="font-medium text-neutral-900 mb-2">Key Areas:</h4>
                  {region.areas.map((area) => (
                    <div key={area} className="flex items-center text-sm text-neutral-600">
                      <MapPin className="w-4 h-4 text-primary-600 mr-2 flex-shrink-0" />
                      {area}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Benefits */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Enhanced Customer Experience
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Our delivery management system transforms the customer experience with transparency, flexibility, and digital convenience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {customerBenefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="bg-white rounded-xl p-8 text-center shadow-lg border border-neutral-200">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-neutral-900 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mobile & Technology */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
                Mobile-First Driver Experience
              </h2>
              <p className="text-lg text-neutral-300 mb-8">
                Our mobile application empowers drivers with all the tools they need for efficient delivery operations, 
                including offline capabilities for Ghana's connectivity challenges.
              </p>
              <div className="grid grid-cols-1 gap-3">
                {mobileFeatures.map((feature) => (
                  <div key={feature} className="flex items-center">
                    <Smartphone className="w-5 h-5 text-primary-400 mr-3 flex-shrink-0" />
                    <span className="text-neutral-200">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-primary-600 rounded-2xl p-8">
              <h3 className="text-2xl font-display font-semibold mb-6">
                Technology Advantages
              </h3>
              <div className="space-y-4">
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Offline Capability</h4>
                  <p className="text-sm opacity-90">Continue operations even with poor connectivity</p>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Real-time Sync</h4>
                  <p className="text-sm opacity-90">Instant data synchronization when connected</p>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Local Language</h4>
                  <p className="text-sm opacity-90">Support for local languages and cultural preferences</p>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Low Bandwidth</h4>
                  <p className="text-sm opacity-90">Optimized for Ghana's network infrastructure</p>
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
              Seamless Integration Ecosystem
            </h2>
            <p className="text-lg text-neutral-600 mb-12">
              Our daily delivery management integrates perfectly with all OilFlow BIDEC modules and external systems for complete operational visibility.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200">
                <BarChart3 className="w-12 h-12 text-primary-600 mb-4" />
                <h3 className="text-lg font-display font-semibold text-neutral-900 mb-3">
                  Inventory Integration
                </h3>
                <p className="text-neutral-600 text-sm">
                  Real-time inventory updates and automated stock level monitoring across all delivery operations.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200">
                <Shield className="w-12 h-12 text-primary-600 mb-4" />
                <h3 className="text-lg font-display font-semibold text-neutral-900 mb-3">
                  Financial Reconciliation
                </h3>
                <p className="text-neutral-600 text-sm">
                  Automatic financial reconciliation with Ghana banking systems and payment processing.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200">
                <Zap className="w-12 h-12 text-primary-600 mb-4" />
                <h3 className="text-lg font-display font-semibold text-neutral-900 mb-3">
                  Analytics & Reporting
                </h3>
                <p className="text-neutral-600 text-sm">
                  Advanced analytics and reporting for performance optimization and business intelligence.
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
              Transform Your Daily Delivery Operations
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Experience the power of intelligent delivery management with route optimization, real-time tracking, 
              and enhanced customer communications designed for Ghana's petroleum distribution needs.
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