'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Play, CheckCircle, TrendingUp, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedCounter } from '@/components/ui/animated-counter';

const stats = [
  { label: 'Operations Managed', value: 500, suffix: '+', icon: TrendingUp },
  { label: 'Cost Reduction', value: 35, suffix: '%', icon: CheckCircle },
  { label: 'Compliance Rate', value: 99.9, suffix: '%', icon: Shield },
  { label: 'Process Efficiency', value: 40, suffix: '%', icon: Zap },
];

const floatingElements = [
  { delay: 0, x: 20, y: -30 },
  { delay: 0.5, x: -40, y: 20 },
  { delay: 1, x: 30, y: 40 },
  { delay: 1.5, x: -20, y: -20 },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Animated background shapes */}
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-primary-200/20 to-secondary-200/20 blur-3xl"
            style={{
              left: `${20 + index * 20}%`,
              top: `${30 + index * 15}%`,
            }}
            animate={{
              x: [0, element.x, 0],
              y: [0, element.y, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              delay: element.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
              >
                <Zap className="h-4 w-4 mr-2" />
                Petroleum Trading ERP for Ghana
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-5xl lg:text-7xl font-bold text-neutral-900 leading-tight"
              >
                Master Your{' '}
                <span className="text-gradient">
                  Petroleum Trading
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-xl text-neutral-600 leading-relaxed max-w-2xl"
              >
                Comprehensive ERP for petroleum trading in Ghana. Features batch management, 
                daily delivery tracking, price-out system, vessel management, and seamless 
                Ghana banking integration with dual currency support (GHS/USD).
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/request-demo">
                <Button size="lg" className="group">
                  Request Demo
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link href="/watch-demo">
                <Button variant="outline" size="lg" className="group">
                  <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-wrap items-center gap-6 pt-8"
            >
              <div className="flex items-center space-x-2 text-sm text-neutral-500">
                <CheckCircle className="h-4 w-4 text-accent-500" />
                <span>Ghana Banking Integration</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-neutral-500">
                <CheckCircle className="h-4 w-4 text-accent-500" />
                <span>IFRS Compliant</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-neutral-500">
                <CheckCircle className="h-4 w-4 text-accent-500" />
                <span>Dual Currency Support</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Statistics & Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20"
                >
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className="h-6 w-6 text-primary-500" />
                    <div className="text-2xl font-bold text-neutral-900">
                      <AnimatedCounter
                        from={0}
                        to={stat.value}
                        duration={2}
                        delay={1 + index * 0.1}
                      />
                      {stat.suffix}
                    </div>
                  </div>
                  <div className="text-sm text-neutral-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Central illustration placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="relative bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/30"
            >
              <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="w-16 h-16 mx-auto border-4 border-primary-300 border-t-primary-600 rounded-full"
                  />
                  <div className="text-sm text-neutral-600">
                    Interactive Demo Preview
                  </div>
                </div>
              </div>
              
              {/* Floating action button */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.5 }}
                className="absolute -bottom-4 -right-4"
              >
                <Link href="/watch-demo">
                  <Button
                    size="lg"
                    variant="gradient"
                    className="rounded-full shadow-2xl hover:shadow-3xl group"
                  >
                    <Play className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-neutral-300 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-neutral-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}