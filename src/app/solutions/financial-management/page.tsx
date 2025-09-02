import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calculator, PieChart, FileText, TrendingUp, Shield, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Financial Management System | OilFlow BIDEC',
  description: 'Comprehensive financial management for Ghana petroleum operations. IFRS compliance, automated reporting, and integrated accounting systems.',
  keywords: 'petroleum financial management Ghana, IFRS compliance, automated accounting, financial reporting ERP, Ghana petroleum finance',
};

const financialModules = [
  {
    icon: Calculator,
    title: 'General Ledger',
    description: 'Multi-currency general ledger with real-time posting and comprehensive chart of accounts.',
    features: ['Multi-currency support', 'Real-time posting', 'Automated journal entries', 'Comprehensive reporting']
  },
  {
    icon: FileText,
    title: 'Accounts Payable/Receivable',
    description: 'Complete AP/AR management with automated workflows and aging analysis.',
    features: ['Invoice automation', 'Payment processing', 'Credit management', 'Aging reports']
  },
  {
    icon: PieChart,
    title: 'Financial Reporting',
    description: 'Automated financial statement generation with IFRS compliance and regulatory reporting.',
    features: ['IFRS compliance', 'Automated statements', 'Regulatory reports', 'Custom dashboards']
  },
  {
    icon: TrendingUp,
    title: 'Fixed Assets',
    description: 'Complete fixed asset management with depreciation calculation and maintenance tracking.',
    features: ['Asset tracking', 'Depreciation calculation', 'Maintenance scheduling', 'Disposal management']
  },
  {
    icon: Shield,
    title: 'Internal Controls',
    description: 'Comprehensive internal controls and audit trails for financial transparency.',
    features: ['Segregation of duties', 'Approval workflows', 'Audit trails', 'Risk management']
  }
];

const complianceFeatures = [
  'International Financial Reporting Standards (IFRS)',
  'Ghana Revenue Authority (GRA) tax compliance',
  'Bank of Ghana reporting requirements',
  'Securities and Exchange Commission (SEC) regulations',
  'National Petroleum Authority (NPA) financial reporting',
  'Environmental Protection Agency (EPA) cost tracking'
];

const reportingCapabilities = [
  {
    category: 'Financial Statements',
    reports: ['Balance Sheet', 'Income Statement', 'Cash Flow Statement', 'Statement of Equity']
  },
  {
    category: 'Regulatory Reports',
    reports: ['GRA Tax Returns', 'BOG Statistical Returns', 'NPA Financial Reports', 'SEC Compliance Reports']
  },
  {
    category: 'Management Reports',
    reports: ['Profitability Analysis', 'Cost Center Reports', 'Budget vs Actual', 'Key Performance Indicators']
  },
  {
    category: 'Analytical Reports',
    reports: ['Trend Analysis', 'Variance Reports', 'Financial Ratios', 'Forecasting Reports']
  }
];

export default function FinancialManagementPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
              Comprehensive Financial
              <span className="text-primary-600"> Management</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Streamline your financial operations with our integrated financial management system. 
              IFRS compliant, automated reporting, and built specifically for Ghana's petroleum industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-demo">
                <Button size="lg" className="w-full sm:w-auto">
                  See Financial Demo
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

      {/* Financial Modules */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Complete Financial Suite
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Our financial management system includes all modules needed for comprehensive financial control.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {financialModules.map((module) => {
              const Icon = module.icon;
              return (
                <div
                  key={module.title}
                  className="bg-white rounded-xl border border-neutral-200 p-8 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-neutral-900 mb-4">
                    {module.title}
                  </h3>
                  <p className="text-neutral-600 mb-6 leading-relaxed">
                    {module.description}
                  </p>
                  <ul className="space-y-2">
                    {module.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-neutral-600">
                        <CheckCircle className="h-4 w-4 text-primary-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-20 bg-primary-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-6">
                Full Regulatory Compliance
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                Our system ensures complete compliance with all Ghana financial and petroleum regulations, 
                automatically generating required reports and maintaining audit trails.
              </p>
              <ul className="space-y-4">
                {complianceFeatures.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Shield className="h-6 w-6 text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-200">
              <h3 className="text-2xl font-display font-semibold text-neutral-900 mb-6">
                Compliance Benefits
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-2">Automated Compliance</h4>
                  <p className="text-neutral-600 text-sm">Reduce compliance risks with automated regulatory reporting</p>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-2">Audit Readiness</h4>
                  <p className="text-neutral-600 text-sm">Complete audit trails and documentation always ready</p>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-2">Real-time Updates</h4>
                  <p className="text-neutral-600 text-sm">Stay current with changing regulations automatically</p>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-2">Cost Reduction</h4>
                  <p className="text-neutral-600 text-sm">Eliminate manual compliance processes and reduce costs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reporting Capabilities */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Comprehensive Reporting Suite
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Generate all required financial reports automatically, from statutory filings to management dashboards.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reportingCapabilities.map((category) => (
              <div key={category.category} className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200">
                <h3 className="font-semibold text-neutral-900 mb-4">{category.category}</h3>
                <ul className="space-y-2">
                  {category.reports.map((report) => (
                    <li key={report} className="text-neutral-600 text-sm">
                      • {report}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Benefits */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
              Seamless Integration
            </h2>
            <p className="text-lg text-neutral-300 max-w-3xl mx-auto">
              Our financial management system integrates seamlessly with all operational modules for real-time financial visibility.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calculator className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Real-time Financials</h3>
              <p className="text-neutral-300">
                Financial data updates automatically from operational transactions
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Unified Reporting</h3>
              <p className="text-neutral-300">
                Combined operational and financial reports for complete business insight
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Advanced Analytics</h3>
              <p className="text-neutral-300">
                Powerful analytics combining financial and operational data
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
              Transform Your Financial Operations
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Experience the power of integrated financial management designed specifically 
              for Ghana's petroleum industry. Ensure compliance while gaining real-time insights.
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