import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BarChart3, TrendingUp, PieChart, Activity, Target, Clock, FileText, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Advanced Analytics Suite | OilFlow BIDEC',
  description: 'Comprehensive business intelligence and analytics for petroleum trading. Real-time KPI monitoring, performance metrics, and predictive insights.',
  keywords: 'business analytics Ghana, petroleum KPIs, trading analytics, performance dashboard, business intelligence',
};

const analyticsFeatures = [
  {
    icon: BarChart3,
    title: 'Real-Time KPI Dashboard',
    description: 'Monitor critical business metrics with live updates on revenue, volume traded, profit margins, and operational efficiency.',
  },
  {
    icon: TrendingUp,
    title: 'Financial Health Scoring',
    description: 'Comprehensive financial analysis with automated health scores, ratio analysis, and cash flow monitoring.',
  },
  {
    icon: PieChart,
    title: 'Product Mix Analytics',
    description: 'Deep insights into product performance, sales distribution, and margin analysis across all petroleum products.',
  },
  {
    icon: Activity,
    title: 'Regional Performance Tracking',
    description: 'Analyze market share, growth trends, and competitive positioning across different geographical regions.',
  },
  {
    icon: Target,
    title: 'Operational Excellence Tracking',
    description: 'Monitor product levels, depot operations, batch movements, and overall operational efficiency indicators.',
  },
  {
    icon: FileText,
    title: 'Automated Report Generation',
    description: 'Schedule and generate comprehensive reports for executives, operations, compliance, and financial teams.',
  },
];

const kpiCategories = [
  {
    title: 'Financial Metrics',
    metrics: [
      'Revenue & Profit Tracking',
      'Cash Flow Analysis',
      'Current & Debt-to-Equity Ratios',
      'Return on Equity (ROE)',
      'Operating Margin Analysis',
      'Currency Performance (GHS/USD)',
    ],
  },
  {
    title: 'Operational Metrics',
    metrics: [
      'Product Level Monitoring',
      'Batch Processing Efficiency',
      'Depot Throughput Analysis',
      'Vessel Operations Tracking',
      'Inventory Accuracy Metrics',
      'Daily Delivery Performance',
    ],
  },
  {
    title: 'Trading Metrics',
    metrics: [
      'Daily Trading Volumes',
      'Market Share Analysis',
      'Customer Retention Rates',
      'Price Competitiveness Index',
      'Product Mix Optimization',
      'Seasonal Trend Analysis',
    ],
  },
  {
    title: 'Customer Analytics',
    metrics: [
      'Customer Profitability Analysis',
      'Segmentation & Behavior',
      'Credit Risk Assessment',
      'Payment Pattern Analysis',
      'Customer Lifetime Value',
      'Satisfaction Scoring',
    ],
  },
];

const reportTypes = [
  'Executive Summary Dashboard',
  'Monthly Financial Reports',
  'Daily Trading Volume Analysis',
  'Vessel Operations Report',
  'Compliance & Audit Reports',
  'Customer Performance Reports',
  'Inventory Movement Analysis',
  'Profit & Loss Statements',
];

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              <BarChart3 className="h-4 w-4 mr-2" />
              Business Intelligence Platform
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
              Advanced Analytics
              <span className="text-primary-600"> Suite</span>
            </h1>
            
            <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your petroleum trading data into actionable insights with comprehensive 
              analytics, real-time KPI monitoring, and automated reporting designed for Ghana's market.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-demo">
                <Button size="lg" className="w-full sm:w-auto">
                  See Analytics Demo
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
              Complete Analytics Platform
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Every tool you need to monitor, analyze, and optimize your petroleum trading operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {analyticsFeatures.map((feature) => {
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

      {/* KPI Categories */}
      <section className="py-20 bg-blue-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Comprehensive KPI Tracking
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Monitor every aspect of your business with industry-specific metrics designed for petroleum trading.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {kpiCategories.map((category) => (
              <div key={category.title} className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200">
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">{category.title}</h3>
                <ul className="space-y-2">
                  {category.metrics.map((metric) => (
                    <li key={metric} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                      <span className="text-neutral-700">{metric}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Intelligent Dashboard Design
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Customizable dashboards that adapt to your role and responsibilities.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 p-8">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">6</div>
                <p className="text-neutral-600">Dashboard Views</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
                <p className="text-neutral-600">KPI Metrics</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">Real-time</div>
                <p className="text-neutral-600">Data Updates</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6">
              <h3 className="font-semibold text-neutral-900 mb-4">Role-Based Dashboards</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded p-4">
                  <h4 className="font-medium text-neutral-800 mb-2">Executive View</h4>
                  <p className="text-sm text-neutral-600">High-level KPIs, financial summaries, and strategic metrics</p>
                </div>
                <div className="bg-white rounded p-4">
                  <h4 className="font-medium text-neutral-800 mb-2">Operations View</h4>
                  <p className="text-sm text-neutral-600">Product monitoring, batch tracking, vessel operations, and depot management</p>
                </div>
                <div className="bg-white rounded p-4">
                  <h4 className="font-medium text-neutral-800 mb-2">Financial View</h4>
                  <p className="text-sm text-neutral-600">Cash flow, profitability analysis, and financial ratios</p>
                </div>
                <div className="bg-white rounded p-4">
                  <h4 className="font-medium text-neutral-800 mb-2">Trading View</h4>
                  <p className="text-sm text-neutral-600">Market analysis, volume trends, and pricing insights</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Report Types */}
      <section className="py-20 bg-neutral-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Automated Reporting
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Generate and schedule reports automatically with customizable templates.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-neutral-200">
              <h3 className="text-xl font-semibold text-neutral-900 mb-6">Available Report Templates</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {reportTypes.map((report) => (
                  <div key={report} className="flex items-center">
                    <FileText className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-neutral-700">{report}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-neutral-900 mb-3">Export Formats</h4>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-white rounded-full text-sm">PDF Reports</span>
                  <span className="px-3 py-1 bg-white rounded-full text-sm">Excel Spreadsheets</span>
                  <span className="px-3 py-1 bg-white rounded-full text-sm">CSV Data</span>
                  <span className="px-3 py-1 bg-white rounded-full text-sm">JSON API</span>
                  <span className="px-3 py-1 bg-white rounded-full text-sm">Email Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-12 text-center">
              Why Our Analytics Matter
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-4 mt-2" />
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Data-Driven Decisions</h3>
                  <p className="text-neutral-600">Make informed strategic decisions based on real-time data and predictive insights.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-4 mt-2" />
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Performance Optimization</h3>
                  <p className="text-neutral-600">Identify bottlenecks and optimize operations for maximum efficiency.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-4 mt-2" />
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Risk Management</h3>
                  <p className="text-neutral-600">Early warning systems and alerts for potential issues before they impact business.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-4 mt-2" />
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Competitive Advantage</h3>
                  <p className="text-neutral-600">Stay ahead with market intelligence and competitive positioning insights.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-4 mt-2" />
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Regulatory Compliance</h3>
                  <p className="text-neutral-600">Automated compliance reporting and audit trail maintenance.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-4 mt-2" />
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Time Savings</h3>
                  <p className="text-neutral-600">Automated reporting saves hours of manual data compilation and analysis.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-primary-600">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
              Transform Data Into Strategic Advantage
            </h2>
            <p className="text-lg opacity-90 mb-8">
              See how our analytics suite can revolutionize your decision-making process 
              and drive business growth in Ghana's petroleum market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-demo">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Schedule Analytics Demo
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