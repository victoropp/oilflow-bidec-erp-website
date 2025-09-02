import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Shield, FileCheck, TrendingUp, AlertTriangle, CheckCircle, Calculator, BarChart3, Globe, Book, Award, Settings, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'IFRS Compliance Framework | OilFlow BIDEC',
  description: 'Comprehensive IFRS compliance system for Ghana petroleum operations. Automated revenue recognition, lease accounting, financial instruments management, and regulatory reporting.',
  keywords: 'IFRS compliance Ghana, petroleum accounting standards, revenue recognition IFRS 15, lease accounting IFRS 16, financial instruments IFRS 9, inventory valuation IAS 2',
};

const complianceModules = [
  {
    icon: Calculator,
    title: 'Revenue Recognition (IFRS 15)',
    standard: 'IFRS 15',
    description: 'Automated revenue recognition validation ensuring compliance with IFRS 15 standards for petroleum sales and service contracts.',
    capabilities: [
      'Performance obligation identification',
      'Transaction price allocation',
      'Revenue timing validation',
      'Contract modification handling',
      'Variable consideration tracking',
      'Disclosure requirement automation'
    ],
    keyFeatures: [
      'Five-step revenue model automation',
      'Contract asset and liability tracking',
      'Customer advance payment handling',
      'Multi-element arrangement support'
    ]
  },
  {
    icon: FileCheck,
    title: 'Lease Accounting (IFRS 16)',
    standard: 'IFRS 16',
    description: 'Complete lease accounting compliance with automated lease classification, measurement, and financial statement presentation.',
    capabilities: [
      'Lease contract identification',
      'Right-of-use asset calculation',
      'Lease liability measurement',
      'Depreciation schedule automation',
      'Interest expense calculation',
      'Modification impact assessment'
    ],
    keyFeatures: [
      'Operating vs finance lease classification',
      'Lease term determination',
      'Discount rate calculation',
      'Variable payment processing'
    ]
  },
  {
    icon: TrendingUp,
    title: 'Financial Instruments (IFRS 9)',
    standard: 'IFRS 9',
    description: 'Comprehensive management of financial instruments with automated classification, measurement, and impairment calculations.',
    capabilities: [
      'Instrument classification (AC, FVOCI, FVPL)',
      'Expected credit loss modeling',
      'Hedge accounting validation',
      'Fair value measurement',
      'Impairment provision calculation',
      'Derecognition criteria assessment'
    ],
    keyFeatures: [
      'Business model assessment',
      'SPPI test automation',
      'ECL staging and calculation',
      'Hedge effectiveness testing'
    ]
  },
  {
    icon: BarChart3,
    title: 'Inventory Valuation (IAS 2)',
    standard: 'IAS 2',
    description: 'Accurate inventory valuation and cost tracking in accordance with IAS 2 standards for petroleum products.',
    capabilities: [
      'Cost flow assumption management',
      'Net realizable value assessment',
      'Write-down calculation',
      'Cost allocation methodology',
      'Inventory count reconciliation',
      'Obsolescence provision tracking'
    ],
    keyFeatures: [
      'FIFO/Weighted average costing',
      'Lower of cost or NRV application',
      'Inventory aging analysis',
      'Cost component tracking'
    ]
  },
  {
    icon: Shield,
    title: 'Compliance Reporting Engine',
    standard: 'Multiple Standards',
    description: 'Automated generation of IFRS-compliant financial reports and disclosures with built-in validation checks.',
    capabilities: [
      'Automated disclosure generation',
      'Comparative period handling',
      'Note preparation assistance',
      'Validation rule enforcement',
      'Audit trail maintenance',
      'Exception reporting'
    ],
    keyFeatures: [
      'Financial statement automation',
      'Note disclosure templates',
      'Compliance dashboard',
      'Exception management workflow'
    ]
  },
  {
    icon: AlertTriangle,
    title: 'Compliance Dashboard',
    standard: 'Monitoring Framework',
    description: 'Real-time compliance monitoring with proactive alerts and comprehensive audit reporting capabilities.',
    capabilities: [
      'Real-time compliance scoring',
      'Automated alert generation',
      'Risk assessment matrices',
      'Regulatory update tracking',
      'Performance benchmarking',
      'Audit preparation tools'
    ],
    keyFeatures: [
      'Executive compliance dashboard',
      'Risk heat maps',
      'Compliance trend analysis',
      'Regulatory change management'
    ]
  }
];

const standardsFramework = [
  {
    category: 'Revenue Standards',
    standards: [
      { code: 'IFRS 15', title: 'Revenue from Contracts with Customers', coverage: 'Complete automation' },
      { code: 'IAS 18', title: 'Revenue (Legacy support)', coverage: 'Transition assistance' }
    ]
  },
  {
    category: 'Asset Standards',
    standards: [
      { code: 'IFRS 16', title: 'Leases', coverage: 'Full compliance engine' },
      { code: 'IAS 2', title: 'Inventories', coverage: 'Automated valuation' },
      { code: 'IAS 16', title: 'Property, Plant and Equipment', coverage: 'Depreciation automation' }
    ]
  },
  {
    category: 'Financial Instruments',
    standards: [
      { code: 'IFRS 9', title: 'Financial Instruments', coverage: 'Complete framework' },
      { code: 'IFRS 7', title: 'Financial Instruments Disclosures', coverage: 'Automated disclosures' }
    ]
  },
  {
    category: 'Presentation Standards',
    standards: [
      { code: 'IAS 1', title: 'Presentation of Financial Statements', coverage: 'Format automation' },
      { code: 'IAS 7', title: 'Statement of Cash Flows', coverage: 'Automated generation' }
    ]
  }
];

const complianceMetrics = [
  { metric: 'IFRS Standards Covered', value: '15+' },
  { metric: 'Automated Validation Rules', value: '500+' },
  { metric: 'Compliance Accuracy', value: '99.9%' },
  { metric: 'Audit Preparation Time', value: '75% Reduction' },
  { metric: 'Regulatory Updates', value: 'Real-time' },
  { metric: 'Financial Close Acceleration', value: '60% Faster' }
];

const validationChecks = [
  'Revenue recognition timing validation',
  'Lease classification accuracy verification',
  'Financial instrument categorization checks',
  'Inventory valuation method consistency',
  'Disclosure completeness verification',
  'Comparative period consistency validation',
  'Related party transaction identification',
  'Segment reporting accuracy checks',
  'Fair value measurement validation',
  'Impairment testing automation'
];

const auditFeatures = [
  {
    title: 'Comprehensive Audit Trails',
    description: 'Complete transaction tracking with immutable audit logs',
    icon: Book
  },
  {
    title: 'Automated Documentation',
    description: 'Self-documenting processes with compliance evidence',
    icon: FileCheck
  },
  {
    title: 'Exception Reporting',
    description: 'Proactive identification and resolution of compliance issues',
    icon: AlertTriangle
  },
  {
    title: 'Regulatory Updates',
    description: 'Automatic updates for changing IFRS requirements',
    icon: Settings
  }
];

const workflowSteps = [
  {
    step: 1,
    title: 'Transaction Capture',
    description: 'Automatic capture and classification of all business transactions',
    details: 'System identifies transaction types and applies appropriate IFRS treatment rules'
  },
  {
    step: 2,
    title: 'Standards Application',
    description: 'Automated application of relevant IFRS standards and validation rules',
    details: 'Built-in compliance engine ensures correct accounting treatment for each transaction'
  },
  {
    step: 3,
    title: 'Validation & Verification',
    description: 'Comprehensive validation checks against IFRS requirements',
    details: 'Multi-layer validation ensures accuracy and completeness of financial reporting'
  },
  {
    step: 4,
    title: 'Financial Statement Generation',
    description: 'Automated preparation of IFRS-compliant financial statements',
    details: 'Generated statements include all required disclosures and comparative information'
  },
  {
    step: 5,
    title: 'Compliance Monitoring',
    description: 'Ongoing monitoring and alerting for compliance deviations',
    details: 'Proactive identification of potential issues with corrective action workflows'
  },
  {
    step: 6,
    title: 'Audit Preparation',
    description: 'Comprehensive audit support with documentation and evidence',
    details: 'Complete audit trail and supporting documentation readily available for review'
  }
];

export default function IFRSCompliancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
              IFRS Compliance
              <span className="text-primary-600"> Framework</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Ensure complete IFRS compliance with our comprehensive accounting framework. 
              Automate revenue recognition, lease accounting, financial instruments management, and regulatory reporting 
              for Ghana's petroleum industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-demo">
                <Button size="lg" className="w-full sm:w-auto">
                  See Compliance Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Contact Experts
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Modules Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Comprehensive IFRS Compliance Suite
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Our compliance framework covers all major IFRS standards with automated validation, 
              measurement, and reporting capabilities specifically designed for petroleum operations.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {complianceModules.map((module) => {
              const Icon = module.icon;
              return (
                <div
                  key={module.title}
                  className="bg-white rounded-xl border border-neutral-200 p-8 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-1 rounded">
                      {module.standard}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-display font-semibold text-neutral-900 mb-3">
                    {module.title}
                  </h3>
                  <p className="text-neutral-600 mb-6 leading-relaxed">
                    {module.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-neutral-800 mb-3 text-sm">Key Capabilities:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {module.capabilities.map((capability) => (
                        <div key={capability} className="flex items-center text-xs text-neutral-600">
                          <CheckCircle className="h-3 w-3 text-primary-500 mr-2 flex-shrink-0" />
                          {capability}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-neutral-800 mb-3 text-sm">Automated Features:</h4>
                    <ul className="space-y-1">
                      {module.keyFeatures.map((feature) => (
                        <li key={feature} className="text-xs text-neutral-600 flex items-center">
                          <span className="w-1 h-1 bg-primary-500 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Standards Framework */}
      <section className="py-20 bg-primary-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Complete IFRS Standards Coverage
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Our framework provides comprehensive coverage of all relevant IFRS standards 
              with specialized implementation for petroleum industry requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {standardsFramework.map((category) => (
              <div key={category.category} className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">{category.category}</h3>
                <div className="space-y-4">
                  {category.standards.map((standard) => (
                    <div key={standard.code} className="border-b border-neutral-100 pb-3 last:border-b-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-primary-600 text-sm">{standard.code}</span>
                        <Award className="h-4 w-4 text-primary-500" />
                      </div>
                      <h4 className="text-sm font-medium text-neutral-800 mb-1">{standard.title}</h4>
                      <p className="text-xs text-neutral-600">{standard.coverage}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Compliance Performance Metrics
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Our IFRS compliance framework delivers measurable results in accuracy, efficiency, and audit readiness.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {complianceMetrics.map((metric) => (
              <div key={metric.metric} className="bg-white rounded-xl p-8 text-center shadow-lg border border-neutral-200">
                <div className="text-3xl font-bold text-primary-600 mb-2">{metric.value}</div>
                <div className="text-neutral-700 font-medium">{metric.metric}</div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-200">
            <h3 className="text-2xl font-display font-semibold text-neutral-900 mb-6 text-center">
              Automated Validation Checks
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {validationChecks.map((check) => (
                <div key={check} className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary-500 mr-3 flex-shrink-0" />
                  <span className="text-neutral-700 text-sm">{check}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Audit and Reporting Features */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
              Advanced Audit & Reporting Capabilities
            </h2>
            <p className="text-lg text-neutral-300 max-w-3xl mx-auto">
              Streamline audit processes and ensure regulatory compliance with comprehensive 
              documentation and automated reporting features.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {auditFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="text-center">
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-neutral-300 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compliance Workflow */}
      <section className="py-20 bg-primary-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Automated Compliance Workflow
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Our system automates the entire compliance process, from transaction capture to audit preparation, 
              ensuring accuracy and efficiency at every step.
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

      {/* Benefits & ROI */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-6">
                Measurable Compliance Benefits
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                Our IFRS compliance framework delivers significant improvements in financial reporting accuracy, 
                audit efficiency, and regulatory confidence for Ghana petroleum companies.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Improved Accuracy</h3>
                    <p className="text-neutral-600 text-sm">Eliminate manual errors with automated compliance validation and calculation engines</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Faster Close Cycles</h3>
                    <p className="text-neutral-600 text-sm">Accelerate financial close with automated reporting and validation processes</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <Shield className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Audit Confidence</h3>
                    <p className="text-neutral-600 text-sm">Comprehensive audit trails and documentation provide complete transparency</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                    <Globe className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Regulatory Confidence</h3>
                    <p className="text-neutral-600 text-sm">Stay current with evolving IFRS standards through automated updates</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-200">
              <h3 className="text-2xl font-display font-semibold text-neutral-900 mb-6">
                Implementation ROI
              </h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-neutral-100">
                  <span className="font-medium text-neutral-700">Audit Preparation Time</span>
                  <span className="text-2xl font-bold text-green-600">-75%</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-neutral-100">
                  <span className="font-medium text-neutral-700">Compliance Errors</span>
                  <span className="text-2xl font-bold text-green-600">-95%</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-neutral-100">
                  <span className="font-medium text-neutral-700">Financial Close Time</span>
                  <span className="text-2xl font-bold text-green-600">-60%</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-neutral-100">
                  <span className="font-medium text-neutral-700">Manual Processing</span>
                  <span className="text-2xl font-bold text-green-600">-85%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-neutral-700">Regulatory Confidence</span>
                  <span className="text-2xl font-bold text-primary-600">+100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration & Technical Specs */}
      <section className="py-20 bg-primary-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
                Technical Specifications & Integration
              </h2>
              <p className="text-lg text-neutral-600">
                Built on enterprise-grade technology with seamless integration capabilities for existing financial systems.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg border border-neutral-200">
                <h3 className="text-xl font-display font-semibold text-neutral-900 mb-6">Core Framework</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium text-neutral-700">IFRS Standards</span>
                    <span className="text-neutral-600 text-sm">15+ Standards</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-neutral-700">Validation Rules</span>
                    <span className="text-neutral-600 text-sm">500+ Automated Checks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-neutral-700">Compliance Engine</span>
                    <span className="text-neutral-600 text-sm">Real-time Processing</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-neutral-700">Audit Trails</span>
                    <span className="text-neutral-600 text-sm">Immutable Logging</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-neutral-700">Reporting</span>
                    <span className="text-neutral-600 text-sm">Automated Generation</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg border border-neutral-200">
                <h3 className="text-xl font-display font-semibold text-neutral-900 mb-6">System Integration</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium text-neutral-700">ERP Integration</span>
                    <span className="text-neutral-600 text-sm">Native & API Support</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-neutral-700">Financial Systems</span>
                    <span className="text-neutral-600 text-sm">Real-time Sync</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-neutral-700">Regulatory Updates</span>
                    <span className="text-neutral-600 text-sm">Automatic Deployment</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-neutral-700">Data Security</span>
                    <span className="text-neutral-600 text-sm">Enterprise Grade</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-neutral-700">Scalability</span>
                    <span className="text-neutral-600 text-sm">Multi-entity Support</span>
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
              Achieve Complete IFRS Compliance Today
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Join forward-thinking petroleum companies in Ghana who trust our IFRS compliance framework 
              to ensure accuracy, efficiency, and regulatory confidence in their financial reporting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-demo">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Request Compliance Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary-700">
                  Speak with Experts
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}