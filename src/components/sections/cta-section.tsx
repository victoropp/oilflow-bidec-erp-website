'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Calendar, Phone, MessageCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ctaOptions = [
  {
    icon: Calendar,
    title: 'Schedule Demo',
    description: 'Get a personalized demo tailored to your petroleum operations',
    href: '/request-demo',
    buttonText: 'Book Demo',
    primary: true,
  },
  {
    icon: Phone,
    title: 'Speak with Expert',
    description: 'Talk directly with our petroleum industry specialists',
    href: '/contact',
    buttonText: 'Contact Sales',
    primary: false,
  },
  {
    icon: MessageCircle,
    title: 'Ask Questions',
    description: 'Get answers about pricing, features, and implementation',
    href: '/contact',
    buttonText: 'Get Answers',
    primary: false,
  },
];

const guarantees = [
  'No long-term contracts required',
  '30-day money-back guarantee',
  'Free migration assistance',
  'Dedicated implementation team',
];

export function CTASection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section className="section-padding bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 text-white relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary-300/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Ready to Transform Your{' '}
            <span className="bg-gradient-to-r from-secondary-200 to-accent-200 bg-clip-text text-transparent">
              Petroleum Operations?
            </span>
          </h2>
          
          <p className="text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
            Join industry leaders who have already revolutionized their operations 
            with OilFlow BIDEC ERP. Start your transformation today.
          </p>
        </motion.div>

        {/* CTA Options */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {ctaOptions.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className={`group relative ${
                option.primary 
                  ? 'bg-white text-neutral-900 shadow-2xl' 
                  : 'bg-white/10 backdrop-blur-sm border border-white/20'
              } rounded-2xl p-8 hover:transform hover:-translate-y-2 transition-all duration-300`}
            >
              {option.primary && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-secondary-400 text-neutral-900 px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${
                option.primary 
                  ? 'bg-primary-100 text-primary-600' 
                  : 'bg-white/20 text-white'
              } group-hover:scale-110 transition-transform duration-300`}>
                <option.icon className="h-8 w-8" />
              </div>
              
              <h3 className={`text-xl font-display font-semibold mb-3 ${
                option.primary ? 'text-neutral-900' : 'text-white'
              }`}>
                {option.title}
              </h3>
              
              <p className={`mb-6 leading-relaxed ${
                option.primary ? 'text-neutral-600' : 'text-primary-100'
              }`}>
                {option.description}
              </p>
              
              <Link href={option.href}>
                <Button
                  variant={option.primary ? 'default' : 'secondary'}
                  className="w-full group-hover:shadow-lg"
                  size="lg"
                >
                  {option.buttonText}
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Guarantees */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
        >
          <h3 className="text-2xl font-display font-semibold text-center mb-8">
            Our Commitment to Your Success
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guarantees.map((guarantee, index) => (
              <motion.div
                key={guarantee}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="flex items-center space-x-3 text-primary-100"
              >
                <CheckCircle className="h-5 w-5 text-accent-400 flex-shrink-0" />
                <span className="text-sm">{guarantee}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-primary-200 mb-6">
            Ready to get started? It takes less than 2 minutes to schedule your demo.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/request-demo">
              <Button variant="secondary" size="xl" className="group">
                Get Started Now
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Link href="/pricing">
              <Button variant="ghost" size="xl" className="text-white border-white/30 hover:bg-white/10">
                View Pricing
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}