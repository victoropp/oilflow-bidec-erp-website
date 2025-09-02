import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Brain, TrendingUp, AlertTriangle, Target, BarChart3, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'AI-Powered Executive Insights | OilFlow BIDEC',
  description: 'Revolutionary AI-driven analytics for petroleum trading. Predictive insights, anomaly detection, and automated recommendations for strategic decision-making.',
  keywords: 'AI petroleum ERP, predictive analytics Ghana, business intelligence, anomaly detection, executive insights',
};

const aiFeatures = [
  {
    icon: TrendingUp,
    title: 'Predictive Revenue Forecasting',
    description: 'Advanced AI models analyze historical patterns and market conditions to provide accurate 30-90 day revenue predictions with confidence scoring.',
  },
  {
    icon: AlertTriangle,
    title: 'Anomaly Detection System',
    description: 'Intelligent monitoring that automatically identifies unusual patterns in operations, transactions, or financial metrics before they become problems.',
  },
  {
    icon: Lightbulb,
    title: 'AI Business Recommendations',
    description: 'Receive actionable recommendations based on comprehensive data analysis, with impact assessment and implementation guidance.',
  },
  {
    icon: Target,
    title: 'Performance Benchmarking',
    description: 'Compare your operations against industry standards with AI-powered scoring and improvement suggestions.',
  },
  {
    icon: BarChart3,
    title: 'Executive KPI Dashboard',
    description: 'Real-time executive dashboard with AI-generated insights, trend analysis, and predictive alerts for proactive management.',
  },
  {
    icon: Brain,
    title: 'Machine Learning Optimization',
    description: 'Continuously improving algorithms that learn from your business patterns to provide increasingly accurate predictions.',
  }
];

const benefits = [
  'Make data-driven decisions with confidence',
  'Identify problems before they impact business',
  'Optimize operations based on AI recommendations',
  'Stay ahead of market trends and competitors',
  'Reduce risks through predictive analytics',
  'Improve profitability with intelligent insights'
];

const useCases = [
  {
    title: 'Revenue Optimization',
    scenario: 'AI analyzes trading patterns, market conditions, and customer behavior to identify revenue opportunities.',
    result: 'Increased revenue through optimized pricing and customer targeting.'
  },
  {
    title: 'Risk Prevention',
    scenario: 'Anomaly detection identifies unusual transaction patterns or operational deviations in real-time.',
    result: 'Prevented losses through early detection and intervention.'
  },
  {
    title: 'Strategic Planning',
    scenario: 'Predictive analytics forecast market demand and operational requirements for better planning.',
    result: 'Improved resource allocation and inventory management.'
  }
];

export default function AIInsightsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
              <Brain className="h-4 w-4 mr-2" />
              Next-Generation Intelligence
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
              AI-Powered
              <span className="text-primary-600"> Executive Insights</span>
            </h1>
            
            <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your petroleum trading operations with revolutionary AI analytics that predict, 
              detect, and recommend - giving you the competitive edge in Ghana's dynamic market.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-demo">
                <Button size="lg" className="w-full sm:w-auto">
                  See AI in Action
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Talk to Experts
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
              Intelligence That Drives Success
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Our AI engine analyzes millions of data points to deliver insights that would take teams of analysts weeks to uncover.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200 hover:shadow-xl transition-all">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-purple-600" />
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

      {/* Use Cases */}
      <section className="py-20 bg-primary-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              AI in Action
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              See how our AI transforms petroleum trading operations with real-world applications.
            </p>
          </div>

          <div className="space-y-8">
            {useCases.map((useCase) => (
              <div key={useCase.title} className="bg-white rounded-xl p-8 shadow-lg border border-neutral-200">
                <h3 className="text-2xl font-semibold text-neutral-900 mb-4">{useCase.title}</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-neutral-700 mb-2">Scenario</h4>
                    <p className="text-neutral-600">{useCase.scenario}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-700 mb-2">Result</h4>
                    <p className="text-green-600 font-medium">{useCase.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-12 text-center">
              Transform Your Decision Making
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-4" />
                  <p className="text-lg text-neutral-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-primary-600">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
              Ready to Harness the Power of AI?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Join the future of petroleum trading with AI-powered insights that give you 
              the competitive advantage you need to succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-demo">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Schedule AI Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-purple-700">
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