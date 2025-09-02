'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Video, 
  Users, 
  Clock, 
  CheckCircle, 
  Star,
  Shield,
  Headphones,
  FileText
} from 'lucide-react';

const demoHighlights = [
  {
    icon: Video,
    title: 'Live Interactive Demo',
    description: 'Experience the full platform with real petroleum industry scenarios and data.',
  },
  {
    icon: Users,
    title: 'Expert Consultation',
    description: 'Meet with our petroleum industry specialists and solution architects.',
  },
  {
    icon: Clock,
    title: '45-Minute Session',
    description: 'Comprehensive walkthrough of features relevant to your operations.',
  },
  {
    icon: FileText,
    title: 'Custom ROI Analysis',
    description: 'Receive a detailed ROI report based on your specific requirements.',
  },
];

const testimonialQuotes = [
  {
    quote: "The demo convinced us immediately. We could see exactly how BIDEC ERP would solve our petroleum trading challenges in Ghana.",
    author: "Kwame Asante",
    title: "Managing Director",
    company: "Ghana Petroleum Traders Ltd",
    rating: 5,
  },
  {
    quote: "Best ERP demo I've ever seen. The batch management and Ghana banking integration were exactly what we needed.",
    author: "Akosua Osei",
    title: "Finance Director", 
    company: "West Africa Energy Trading",
    rating: 5,
  },
];

const demoProcess = [
  {
    step: 1,
    title: 'Discovery Call',
    description: 'We start by understanding your current operations, challenges, and goals.',
    duration: '10 min',
  },
  {
    step: 2,
    title: 'Live Demonstration',
    description: 'See OilFlow BIDEC ERP in action with scenarios relevant to your business.',
    duration: '25 min',
  },
  {
    step: 3,
    title: 'Q&A Session',
    description: 'Ask questions and discuss implementation, pricing, and next steps.',
    duration: '10 min',
  },
];

export function DemoFeatures() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <h1 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
          See OilFlow BIDEC ERP{' '}
          <span className="text-gradient">in Action</span>
        </h1>
        <p className="text-xl text-neutral-600 leading-relaxed">
          Experience how our petroleum ERP solution can transform your operations 
          with a personalized, interactive demonstration.
        </p>
      </div>

      {/* Demo Highlights */}
      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 border border-primary-100">
        <h3 className="text-xl font-display font-semibold text-neutral-900 mb-4">
          What to Expect
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {demoHighlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="flex items-start space-x-3"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                <highlight.icon className="h-4 w-4 text-primary-600" />
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 text-sm">
                  {highlight.title}
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Demo Process */}
      <div>
        <h3 className="text-xl font-display font-semibold text-neutral-900 mb-6">
          Demo Process
        </h3>
        <div className="space-y-4">
          {demoProcess.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="flex items-center space-x-4 p-4 bg-white rounded-xl border border-neutral-200"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {step.step}
              </div>
              <div className="flex-grow">
                <h4 className="font-semibold text-neutral-900">{step.title}</h4>
                <p className="text-sm text-neutral-600">{step.description}</p>
              </div>
              <div className="text-xs text-neutral-500 font-medium">
                {step.duration}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div>
        <h3 className="text-xl font-display font-semibold text-neutral-900 mb-6">
          What Our Clients Say
        </h3>
        <div className="space-y-4">
          {testimonialQuotes.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + 0.1 * index }}
              className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm"
            >
              <div className="flex items-center mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-neutral-600 italic mb-4 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div>
                <div className="font-semibold text-neutral-900">{testimonial.author}</div>
                <div className="text-sm text-neutral-500">
                  {testimonial.title} at {testimonial.company}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-neutral-900 rounded-xl p-6 text-white">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <Shield className="h-6 w-6 text-accent-400 mx-auto mb-2" />
            <div className="text-sm font-medium">Enterprise Security</div>
            <div className="text-xs text-neutral-400">SOC 2 Type II</div>
          </div>
          <div>
            <Headphones className="h-6 w-6 text-accent-400 mx-auto mb-2" />
            <div className="text-sm font-medium">24/7 Support</div>
            <div className="text-xs text-neutral-400">Global Coverage</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}