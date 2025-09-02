'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Package, 
  Truck, 
  DollarSign, 
  Ship, 
  Building2, 
  Gauge,
  Calculator,
  BarChart3,
  ShieldCheck,
  PiggyBank,
  FileText,
  Users,
  Settings,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Package,
    title: 'Batch Management',
    description: 'Complete tracking and management of petroleum batches from arrival to delivery with real-time status monitoring.',
    category: 'Operations',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Truck,
    title: 'Daily Delivery System',
    description: 'Streamlined daily delivery tracking with automated allocation and real-time logistics management.',
    category: 'Logistics',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: DollarSign,
    title: 'Price-Out System',
    description: 'Advanced pricing engine for petroleum products with comprehensive cost allocation and profit analysis.',
    category: 'Pricing',
    color: 'from-purple-500 to-violet-500',
  },
  {
    icon: Ship,
    title: 'Vessels Management',
    description: 'Complete vessel operations management including scheduling, tracking, and cargo documentation.',
    category: 'Vessels',
    color: 'from-orange-500 to-amber-500',
  },
  {
    icon: Building2,
    title: 'Depots Management',
    description: 'Comprehensive depot operations with inventory tracking, capacity management, and transfer coordination.',
    category: 'Infrastructure',
    color: 'from-red-500 to-pink-500',
  },
  {
    icon: Gauge,
    title: 'Tank Monitoring',
    description: 'Real-time tank level monitoring, capacity tracking, and automated alerts for optimal inventory management.',
    category: 'Monitoring',
    color: 'from-teal-500 to-cyan-500',
  },
  {
    icon: Calculator,
    title: 'Sales Allocation',
    description: 'Intelligent sales allocation system with batch-based distribution and customer-specific requirements.',
    category: 'Sales',
    color: 'from-indigo-500 to-blue-500',
  },
  {
    icon: PiggyBank,
    title: 'Ghana Banking Integration',
    description: 'Seamless integration with Ghana banking systems including automated reconciliation and transaction processing.',
    category: 'Banking',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: BarChart3,
    title: 'Dual Currency System',
    description: 'Complete dual currency support (GHS/USD) with real-time FX rates and automated currency conversion.',
    category: 'Finance',
    color: 'from-slate-500 to-gray-500',
  },
  {
    icon: ShieldCheck,
    title: 'IFRS Compliance',
    description: 'Full IFRS compliance framework with automated financial reporting and audit trail management.',
    category: 'Compliance',
    color: 'from-emerald-500 to-green-500',
  },
  {
    icon: FileText,
    title: 'Financial Reporting',
    description: 'Comprehensive financial reporting with general ledger, accounts payable/receivable, and tax management.',
    category: 'Reporting',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Users,
    title: 'HR & Payroll',
    description: 'Integrated human resources and payroll management with Ghana-specific compliance and regulations.',
    category: 'Human Resources',
    color: 'from-violet-500 to-purple-500',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export function FeaturesSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
            <Settings className="h-4 w-4 mr-2" />
            Petroleum Trading ERP Modules
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold text-neutral-900 mb-6">
            Specialized for{' '}
            <span className="text-gradient">Ghana Petroleum Trading</span>
          </h2>
          
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Our ERP platform is specifically built for petroleum trading operations in Ghana, 
            featuring batch management, vessel operations, and seamless banking integration.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group"
            >
              <div className="card-hover p-8 h-full relative overflow-hidden">
                {/* Background gradient */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-5 rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700`} />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-6 w-6" />
                  </div>

                  {/* Category */}
                  <div className="text-xs font-medium text-primary-500 uppercase tracking-wide mb-2">
                    {feature.category}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-display font-semibold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-neutral-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <Link href="/solutions">
            <Button size="lg" variant="outline" className="group">
              Explore All Features
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}