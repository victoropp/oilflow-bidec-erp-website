import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, DollarSign, Globe, RefreshCw, TrendingUp, Shield, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Dual Currency System (GHS/USD) | OilFlow BIDEC',
  description: 'Native dual currency support for Ghana petroleum operations. Real-time FX rates, automated conversion, and multi-currency reporting.',
  keywords: 'dual currency Ghana, GHS USD ERP, foreign exchange petroleum, multi-currency accounting, Ghana cedis dollar',
};

export default function DualCurrencyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
              Dual Currency
              <span className="text-primary-600"> GHS/USD System</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Native support for Ghana Cedis and US Dollar operations with real-time foreign exchange rates, 
              automated currency conversion, and comprehensive multi-currency reporting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-demo">
                <Button size="lg" className="w-full sm:w-auto">
                  See Currency Demo
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

      {/* Features Grid */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Complete Multi-Currency Solution
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Handle all aspects of dual currency operations with automated FX management and regulatory compliance.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl border border-neutral-200 p-8 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                <DollarSign className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-display font-semibold text-neutral-900 mb-4">
                Native GHS/USD Support
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Built-in support for Ghana Cedis and US Dollar with seamless currency switching and dual display options.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-neutral-200 p-8 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                <RefreshCw className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-display font-semibold text-neutral-900 mb-4">
                Real-time FX Rates
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Live foreign exchange rates from Bank of Ghana and major financial institutions with automatic updates.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-neutral-200 p-8 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                <Globe className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-display font-semibold text-neutral-900 mb-4">
                Automated Conversion
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Smart currency conversion with configurable rules, rounding options, and audit trails for all conversions.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-neutral-200 p-8 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-display font-semibold text-neutral-900 mb-4">
                Multi-Currency Reporting
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Comprehensive reporting in both currencies with variance analysis and FX impact assessment.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-neutral-200 p-8 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-display font-semibold text-neutral-900 mb-4">
                Regulatory Compliance
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Full compliance with Ghana's foreign exchange regulations and Bank of Ghana reporting requirements.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-neutral-200 p-8 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-display font-semibold text-neutral-900 mb-4">
                FX Risk Management
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Advanced tools for foreign exchange risk assessment, hedging strategies, and exposure management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Currency Dashboard Preview */}
      <section className="py-20 bg-primary-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-6">
              Real-time Currency Dashboard
            </h2>
            <p className="text-lg text-neutral-600 mb-12">
              Monitor exchange rates, currency positions, and FX exposure with our comprehensive dashboard.
            </p>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-200">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-2xl font-bold text-neutral-900 mb-2">GHS 15.50</div>
                  <div className="text-sm text-neutral-600">Current USD Rate</div>
                  <div className="text-xs text-green-600 mt-1">+0.25% today</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-neutral-900 mb-2">$2.5M</div>
                  <div className="text-sm text-neutral-600">USD Exposure</div>
                  <div className="text-xs text-blue-600 mt-1">Well hedged</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-neutral-900 mb-2">GHS 38.75M</div>
                  <div className="text-sm text-neutral-600">Equivalent Value</div>
                  <div className="text-xs text-neutral-500 mt-1">Real-time</div>
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
              Master Multi-Currency Operations
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Transform your dual currency operations with automated FX management, 
              real-time rates, and comprehensive regulatory compliance.
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