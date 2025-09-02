'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Target, 
  TrendingDown, 
  PiggyBank, 
  Calculator, 
  BarChart3, 
  ShieldCheck,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const benefits = [
  {
    icon: Calculator,
    title: 'Advanced Price-Out System',
    description: 'Optimize petroleum pricing with comprehensive cost allocation and profit analysis tailored for Ghana market dynamics.',
    metrics: ['Real-time pricing', 'Cost optimization', 'Profit maximization'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: PiggyBank,
    title: 'Ghana Banking Integration',
    description: 'Seamless integration with Ghana banking systems for automated reconciliation and dual currency management.',
    metrics: ['Bank reconciliation', 'GHS/USD support', 'Automated processing'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: ShieldCheck,
    title: 'IFRS Compliance',
    description: 'Maintain full IFRS compliance with automated financial reporting and audit trail management for Ghana operations.',
    metrics: ['IFRS compliant', 'Audit trails', 'Ghana regulations'],
    color: 'from-purple-500 to-violet-500',
  },
  {
    icon: BarChart3,
    title: 'Complete Batch Tracking',
    description: 'Track petroleum batches from vessel arrival to customer delivery with real-time status and allocation management.',
    metrics: ['Real-time tracking', 'Delivery optimization', 'Customer allocation'],
    color: 'from-orange-500 to-amber-500',
  },
];

const industryStats = [
  { value: '50+', label: 'Petroleum Traders', sublabel: 'In Ghana market' },
  { value: 'GHS/USD', label: 'Dual Currency', sublabel: 'Real-time conversion' },
  { value: '99.9%', label: 'Banking Uptime', sublabel: 'Ghana integration' },
  { value: '24/7', label: 'Ghana Support', sublabel: 'Local expertise' },
];

export function BenefitsSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-accent-100 text-accent-700 rounded-full text-sm font-medium mb-6">
            <Target className="h-4 w-4 mr-2" />
            Business Benefits
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold text-neutral-900 mb-6">
            Built for{' '}
            <span className="text-gradient">Ghana Petroleum Trading</span>
          </h2>
          
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Our specialized ERP delivers tangible benefits for petroleum trading operations 
            in Ghana, with local banking integration and regulatory compliance.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-200 hover:shadow-xl hover:border-primary-200 transition-all duration-300 h-full">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${benefit.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon className="h-8 w-8" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-display font-semibold text-neutral-900 mb-4">
                  {benefit.title}
                </h3>
                
                <p className="text-neutral-600 leading-relaxed mb-6">
                  {benefit.description}
                </p>

                {/* Metrics */}
                <div className="space-y-2">
                  {benefit.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="flex items-center text-sm text-neutral-700">
                      <CheckCircle className="h-4 w-4 text-accent-500 mr-2 flex-shrink-0" />
                      <span>{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Industry Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-neutral-900 to-neutral-800 rounded-2xl p-8 lg:p-12 text-white relative overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-3xl lg:text-4xl font-display font-bold mb-4">
                Trusted in Ghana Petroleum Market
              </h3>
              <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
                Leading petroleum trading companies in Ghana trust OilFlow BIDEC ERP 
                for their operations and banking integration.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {industryStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-neutral-300 font-medium mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-neutral-400">
                    {stat.sublabel}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/case-studies">
                <Button variant="secondary" size="lg" className="group">
                  View Case Studies
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}