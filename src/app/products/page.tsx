import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Package, DollarSign, FileText, Shield, Users, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Complete ERP Product Suite | OilFlow BIDEC Ghana',
  description: 'Explore our comprehensive petroleum ERP product modules: Operations, Financial, Compliance, and HR systems designed for Ghana\'s petroleum industry.',
  keywords: 'petroleum ERP modules, Ghana oil software products, ERP product suite, petroleum operations software, financial ERP modules',
};

const productCategories = [
  {
    icon: Package,
    title: 'Petroleum Operations',
    description: 'Core operational modules for petroleum trading and logistics',
    modules: [
      {
        name: 'Batch Management',
        description: 'Complete petroleum batch tracking from vessel to delivery',
        features: ['Real-time tracking', 'Quality management', 'Loss monitoring', 'Automated reconciliation']
      },
      {
        name: 'Vessel Operations',
        description: 'End-to-end vessel management and port operations',
        features: ['Vessel scheduling', 'Discharge monitoring', 'Documentation workflow', 'Port integration']
      },
      {
        name: 'Daily Delivery',
        description: 'Streamlined delivery operations and route optimization',
        features: ['Route planning', 'Real-time tracking', 'Driver management', 'Customer notifications']
      },
      {
        name: 'Depot Management',
        description: 'Comprehensive depot operations and tank monitoring',
        features: ['Tank monitoring', 'Inventory control', 'Safety compliance', 'Distribution planning']
      },
      {
        name: 'Sales Allocation',
        description: 'Smart allocation of petroleum products to sales orders',
        features: ['Automated allocation', 'Quality matching', 'Delivery optimization', 'Customer prioritization']
      }
    ],
    href: '/products/petroleum-modules',
    color: 'bg-blue-500'
  },
  {
    icon: DollarSign,
    title: 'Financial Management',
    description: 'Comprehensive financial systems with Ghana-specific features',
    modules: [
      {
        name: 'Accounts Payable/Receivable',
        description: 'Complete AP/AR management with automated workflows',
        features: ['Invoice automation', 'Payment processing', 'Aging reports', 'Credit management']
      },
      {
        name: 'General Ledger',
        description: 'Multi-currency general ledger with real-time reporting',
        features: ['Multi-currency support', 'Real-time posting', 'Journal entries', 'Financial statements']
      },
      {
        name: 'Ghana Banking Integration',
        description: 'Direct integration with major Ghanaian banks',
        features: ['Multi-bank connectivity', 'Automated reconciliation', 'Payment processing', 'Cash management']
      },
      {
        name: 'Dual Currency System',
        description: 'Native GHS/USD operations with real-time FX rates',
        features: ['GHS/USD support', 'Real-time rates', 'Automated conversion', 'FX risk management']
      },
      {
        name: 'Fixed Assets',
        description: 'Complete fixed asset management and depreciation',
        features: ['Asset tracking', 'Depreciation calculation', 'Maintenance scheduling', 'Disposal management']
      }
    ],
    href: '/products/financial-modules',
    color: 'bg-green-500'
  },
  {
    icon: Shield,
    title: 'Compliance & Reporting',
    description: 'Regulatory compliance and financial reporting systems',
    modules: [
      {
        name: 'IFRS Framework',
        description: 'Complete IFRS compliance and reporting automation',
        features: ['IFRS standards', 'Automated reporting', 'Audit trails', 'Compliance monitoring']
      },
      {
        name: 'Regulatory Reporting',
        description: 'Automated reporting for Ghana petroleum regulations',
        features: ['NPA reporting', 'EPA compliance', 'Tax reporting', 'Statistical returns']
      },
      {
        name: 'Audit System',
        description: 'Comprehensive audit trails and internal controls',
        features: ['Complete audit trails', 'Internal controls', 'Risk assessment', 'Compliance tracking']
      },
      {
        name: 'Corporate Tax',
        description: 'Automated corporate tax calculation and filing',
        features: ['Tax calculation', 'Filing automation', 'Compliance tracking', 'Penalty management']
      }
    ],
    href: '/products/compliance-modules',
    color: 'bg-purple-500'
  },
  {
    icon: Users,
    title: 'Human Resources',
    description: 'Complete HR and payroll management for petroleum companies',
    modules: [
      {
        name: 'Human Resources',
        description: 'Comprehensive HR management system',
        features: ['Employee records', 'Performance management', 'Leave management', 'Training tracking']
      },
      {
        name: 'Payroll System',
        description: 'Advanced payroll processing with Ghana tax compliance',
        features: ['Payroll processing', 'Tax compliance', 'Benefits management', 'Statutory reporting']
      },
      {
        name: 'Time & Attendance',
        description: 'Integrated time tracking and attendance management',
        features: ['Time tracking', 'Shift management', 'Overtime calculation', 'Attendance monitoring']
      }
    ],
    href: '/products/hr-modules',
    color: 'bg-orange-500'
  }
];

const integrationFeatures = [
  {
    title: 'Real-time Data Flow',
    description: 'All modules share data in real-time for consistent information across the organization'
  },
  {
    title: 'Single Database',
    description: 'One unified database eliminates data silos and ensures data integrity'
  },
  {
    title: 'Unified Reporting',
    description: 'Cross-module reporting provides comprehensive business insights'
  },
  {
    title: 'Workflow Automation',
    description: 'Automated workflows span across modules for seamless operations'
  }
];

const technicalSpecs = [
  { spec: 'Architecture', value: 'Cloud-native, microservices' },
  { spec: 'Database', value: 'PostgreSQL with real-time replication' },
  { spec: 'Security', value: 'Bank-grade encryption and authentication' },
  { spec: 'Integration', value: 'REST APIs and webhooks' },
  { spec: 'Mobile Access', value: 'Native iOS and Android apps' },
  { spec: 'Reporting', value: 'Real-time dashboards and analytics' },
  { spec: 'Compliance', value: 'SOC 2, ISO 27001, Ghana regulations' },
  { spec: 'Uptime SLA', value: '99.9% guaranteed availability' }
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
              Complete ERP
              <span className="text-primary-600"> Product Suite</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover our comprehensive range of ERP modules designed specifically for Ghana's petroleum industry. 
              From operations to compliance, we cover every aspect of your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-demo">
                <Button size="lg" className="w-full sm:w-auto">
                  Explore Products
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

      {/* Product Categories */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Four Comprehensive Product Categories
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Our ERP suite is organized into four main categories, each containing specialized modules 
              for different aspects of petroleum operations.
            </p>
          </div>

          <div className="space-y-16">
            {productCategories.map((category, index) => {
              const Icon = category.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={category.title} className={`grid lg:grid-cols-2 gap-12 items-start ${!isEven ? 'lg:grid-flow-dense' : ''}`}>
                  <div className={isEven ? 'lg:order-1' : 'lg:order-2'}>
                    <div className="flex items-center mb-6">
                      <div className={`w-16 h-16 ${category.color} rounded-lg flex items-center justify-center mr-4`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-display font-bold text-neutral-900">
                          {category.title}
                        </h3>
                        <p className="text-neutral-600">{category.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {category.modules.map((module) => (
                        <div key={module.name} className="border-l-4 border-primary-200 pl-6">
                          <h4 className="font-semibold text-neutral-900 mb-2">{module.name}</h4>
                          <p className="text-neutral-600 text-sm mb-3">{module.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {module.features.map((feature) => (
                              <span key={feature} className="px-2 py-1 bg-neutral-100 text-neutral-600 rounded text-xs">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8">
                      <Link href={category.href}>
                        <Button variant="outline">
                          Explore {category.title}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                  
                  <div className={isEven ? 'lg:order-2' : 'lg:order-1'}>
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-200">
                      <h4 className="font-semibold text-neutral-900 mb-4">Module Highlights</h4>
                      <div className="space-y-3">
                        {category.modules.slice(0, 3).map((module) => (
                          <div key={module.name} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                            <span className="font-medium text-neutral-700">{module.name}</span>
                            <ArrowRight className="h-4 w-4 text-neutral-400" />
                          </div>
                        ))}
                      </div>
                      {category.modules.length > 3 && (
                        <p className="text-sm text-neutral-500 mt-3">
                          +{category.modules.length - 3} more modules
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Integration Features */}
      <section className="py-20 bg-primary-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Seamless Integration Across All Modules
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Our modules work together as a unified system, ensuring data consistency and operational efficiency.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {integrationFeatures.map((feature) => (
              <div key={feature.title} className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200 text-center">
                <h3 className="font-semibold text-neutral-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-6">
                Built on Modern Technology
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                Our ERP platform is built using cutting-edge technology to ensure scalability, 
                security, and performance for Ghana's petroleum industry.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <BarChart3 className="h-6 w-6 text-primary-600 mr-3" />
                  <span className="text-neutral-700">Cloud-native architecture for maximum reliability</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-6 w-6 text-primary-600 mr-3" />
                  <span className="text-neutral-700">Bank-grade security and data protection</span>
                </div>
                <div className="flex items-center">
                  <Package className="h-6 w-6 text-primary-600 mr-3" />
                  <span className="text-neutral-700">Microservices for flexible deployment</span>
                </div>
                <div className="flex items-center">
                  <FileText className="h-6 w-6 text-primary-600 mr-3" />
                  <span className="text-neutral-700">RESTful APIs for seamless integrations</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-200">
              <h3 className="text-2xl font-display font-semibold text-neutral-900 mb-6">
                Technical Specifications
              </h3>
              <div className="space-y-4">
                {technicalSpecs.map((spec) => (
                  <div key={spec.spec} className="flex justify-between items-center py-2 border-b border-neutral-100 last:border-b-0">
                    <span className="font-medium text-neutral-700">{spec.spec}</span>
                    <span className="text-neutral-600 text-sm">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
              See Our Products in Action
            </h2>
            <p className="text-lg text-neutral-300 max-w-3xl mx-auto">
              Experience the power of our integrated ERP suite with interactive demos and live showcases.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-neutral-800 rounded-xl p-8 border border-neutral-700">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Live Demo</h3>
              <p className="text-neutral-300 mb-6">
                See our petroleum operations modules in action with real-time data
              </p>
              <Button variant="outline" className="border-neutral-600 text-white hover:bg-white hover:text-neutral-900">
                Request Demo
              </Button>
            </div>
            
            <div className="bg-neutral-800 rounded-xl p-8 border border-neutral-700">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Financial Demo</h3>
              <p className="text-neutral-300 mb-6">
                Explore our financial modules including Ghana banking integration
              </p>
              <Button variant="outline" className="border-neutral-600 text-white hover:bg-white hover:text-neutral-900">
                Financial Demo
              </Button>
            </div>
            
            <div className="bg-neutral-800 rounded-xl p-8 border border-neutral-700">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Compliance Tour</h3>
              <p className="text-neutral-300 mb-6">
                Discover our compliance and reporting capabilities for Ghana regulations
              </p>
              <Button variant="outline" className="border-neutral-600 text-white hover:bg-white hover:text-neutral-900">
                Compliance Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
              Ready to Explore Our Product Suite?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Discover how our comprehensive ERP modules can transform your petroleum operations. 
              Schedule a personalized demo to see the products that best fit your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-demo">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Schedule Product Demo
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