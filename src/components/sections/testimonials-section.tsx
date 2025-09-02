'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const testimonials = [
  {
    id: 1,
    quote: "OilFlow BIDEC ERP transformed our petroleum trading operations in Ghana. The batch management and price-out system gave us complete control over our trading margins.",
    author: "Kwame Asante",
    title: "Managing Director",
    company: "Ghana Petroleum Traders Ltd",
    companySize: "150+ employees",
    industry: "Petroleum Trading",
    rating: 5,
    results: {
      efficiency: "Enhanced",
      costs: "Reduced",
      compliance: "Excellent"
    },
    image: "/testimonials/kwame-asante.jpg",
  },
  {
    id: 2,
    quote: "The Ghana banking integration is seamless. Dual currency support and real-time FX rates have streamlined our financial operations significantly.",
    author: "Akosua Osei",
    title: "Finance Director",
    company: "West Africa Energy Trading",
    companySize: "80+ employees", 
    industry: "Banking Integration",
    rating: 5,
    results: {
      efficiency: "Improved",
      costs: "Lowered",
      compliance: "Outstanding"
    },
    image: "/testimonials/akosua-osei.jpg",
  },
  {
    id: 3,
    quote: "The vessel and depot management modules are game-changing. We now have real-time visibility into our entire supply chain from vessel arrival to customer delivery.",
    author: "John Mensah",
    title: "Operations Manager",
    company: "Accra Depot Services",
    companySize: "200+ employees",
    industry: "Depot Operations", 
    rating: 5,
    results: {
      efficiency: "Optimized",
      costs: "Decreased",
      compliance: "Exceptional"
    },
    image: "/testimonials/john-mensah.jpg",
  },
  {
    id: 4,
    quote: "IFRS compliance and financial reporting are now automated. The system handles our complex dual currency transactions and regulatory reporting effortlessly.",
    author: "Grace Nkrumah",
    title: "Chief Financial Officer",
    company: "Golden Petroleum Ghana",
    companySize: "300+ employees",
    industry: "Financial Services",
    rating: 5,
    results: {
      efficiency: "Streamlined",
      costs: "Minimized",
      compliance: "Superior"
    },
    image: "/testimonials/grace-nkrumah.jpg",
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="section-padding bg-gradient-to-br from-neutral-900 to-neutral-800 text-white" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-white/10 text-white rounded-full text-sm font-medium mb-6">
            <Star className="h-4 w-4 mr-2" />
            Client Success Stories
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Trusted by{' '}
            <span className="bg-gradient-to-r from-secondary-400 to-accent-400 bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </h2>
          
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            See how petroleum companies worldwide are transforming their operations 
            and achieving remarkable results with OilFlow BIDEC ERP.
          </p>
        </motion.div>

        {/* Main Testimonial Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-white/10">
            {/* Quote Icon */}
            <Quote className="h-12 w-12 text-secondary-400 mb-6 opacity-60" />
            
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Testimonial Content */}
              <div className="lg:col-span-2">
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                {/* Quote */}
                <blockquote className="text-xl lg:text-2xl text-white leading-relaxed mb-6 font-medium">
                  "{currentTestimonial.quote}"
                </blockquote>
                
                {/* Author Info */}
                <div className="space-y-1">
                  <div className="font-semibold text-white text-lg">
                    {currentTestimonial.author}
                  </div>
                  <div className="text-neutral-300">
                    {currentTestimonial.title}
                  </div>
                  <div className="text-secondary-400 font-medium">
                    {currentTestimonial.company}
                  </div>
                  <div className="text-sm text-neutral-400">
                    {currentTestimonial.companySize} • {currentTestimonial.industry}
                  </div>
                </div>
              </div>

              {/* Results Stats */}
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/10">
                <h4 className="font-semibold text-white mb-4 text-center">
                  Achieved Results
                </h4>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent-400">
                      {currentTestimonial.results.efficiency}
                    </div>
                    <div className="text-xs text-neutral-300">Efficiency Gain</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">
                      {currentTestimonial.results.costs}
                    </div>
                    <div className="text-xs text-neutral-300">Cost Reduction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">
                      {currentTestimonial.results.compliance}
                    </div>
                    <div className="text-xs text-neutral-300">Compliance Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prevTestimonial}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? 'bg-secondary-400 w-8'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200"
              aria-label="Next testimonial"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">500+</div>
            <div className="text-neutral-300">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">4.9/5</div>
            <div className="text-neutral-300">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">99.9%</div>
            <div className="text-neutral-300">Uptime SLA</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">24/7</div>
            <div className="text-neutral-300">Support</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}