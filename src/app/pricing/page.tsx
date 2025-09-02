import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, Star, Users, Building, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'ERP Pricing Plans for Ghana Petroleum Industry | OilFlow BIDEC',
  description: 'Transparent pricing for petroleum ERP solutions in Ghana. Flexible plans for small depots to large petroleum companies. Request custom quote.',
  keywords: 'petroleum ERP pricing Ghana, oil trading software cost, ERP pricing plans, Ghana petroleum software pricing, batch management pricing',
};

const pricingPlans = [
  {
    name: 'Starter',
    icon: Users,
    description: 'Perfect for small petroleum depots and distributors',
    monthlyPrice: 'Contact Us',
    yearlyPrice: 'Custom Quote',
    savings: 'Volume Discounts',
    features: [
      'Basic batch management',
      'Inventory tracking (up to 3 products)',
      'Daily delivery management',
      'Basic reporting',
      'Email support',
      'Up to 10 users',
      'Single depot location',
      'Mobile app access',
      'Basic training included'
    ],
    limitations: [
      'No vessel operations',
      'Limited integrations',
      'Basic analytics only'
    ],
    cta: 'Start Free Trial',
    popular: false
  },
  {
    name: 'Professional',
    icon: Building,
    description: 'Comprehensive solution for medium petroleum companies',
    monthlyPrice: 'Contact Us',
    yearlyPrice: 'Custom Quote',
    savings: 'Competitive Rates',
    features: [
      'Full batch management suite',
      'Vessel operations management',
      'Multi-product inventory (unlimited)',
      'Advanced price-out system',
      'Ghana banking integration',
      'Dual currency (GHS/USD)',
      'Up to 50 users',
      'Multiple depot locations',
      'Advanced reporting & analytics',
      'Priority support',
      'Comprehensive training',
      'Regulatory compliance tools'
    ],
    limitations: [
      'Limited to 5 bank integrations',
      'Standard API access'
    ],
    cta: 'Request Demo',
    popular: true
  },
  {
    name: 'Enterprise',
    icon: Zap,
    description: 'Full-featured solution for large petroleum corporations',
    monthlyPrice: 'Custom',
    yearlyPrice: 'Custom Pricing',
    savings: 'Volume Discounts',
    features: [
      'All Professional features',
      'Advanced vessel scheduling',
      'Complete financial suite',
      'IFRS compliance automation',
      'Unlimited bank integrations',
      'Custom integrations',
      'Unlimited users',
      'Multi-country operations',
      'AI-powered analytics',
      '24/7 dedicated support',
      'Custom training programs',
      'Compliance automation',
      'Advanced security features',
      'Custom workflows',
      'White-label options'
    ],
    limitations: [],
    cta: 'Contact Sales',
    popular: false
  }
];

const addOnServices = [
  {
    name: 'Additional User Licenses',
    description: 'Extra user seats beyond plan limits',
    pricing: 'Competitive Rates'
  },
  {
    name: 'Extra Bank Integrations',
    description: 'Additional banking connections',
    pricing: 'Custom Pricing'
  },
  {
    name: 'Custom Integrations',
    description: 'Third-party system integrations',
    pricing: 'Quote Available'
  },
  {
    name: 'Premium Support',
    description: '24/7 phone and priority support',
    pricing: 'Enterprise Package'
  },
  {
    name: 'Advanced Training',
    description: 'On-site training and certification',
    pricing: 'Contact Sales'
  },
  {
    name: 'Data Migration',
    description: 'Professional data migration services',
    pricing: 'Project-Based Quote'
  }
];

const implementationPackages = [
  {
    name: 'Self-Service Implementation',
    duration: '2-4 weeks',
    description: 'For technical teams who prefer to implement independently',
    includes: [
      'System setup guide',
      'Video tutorials',
      'Email support',
      'Basic configuration'
    ],
    price: 'Included in plan'
  },
  {
    name: 'Guided Implementation',
    duration: '4-8 weeks',
    description: 'Recommended for most organizations',
    includes: [
      'Dedicated implementation manager',
      'System configuration',
      'Data migration assistance',
      'User training sessions',
      'Go-live support'
    ],
    price: 'Custom Quote'
  },
  {
    name: 'White Glove Implementation',
    duration: '8-12 weeks',
    description: 'Comprehensive implementation with full customization',
    includes: [
      'Full project management',
      'Custom configuration',
      'Complete data migration',
      'Extensive training program',
      'Custom integrations',
      'Post-launch optimization'
    ],
    price: 'Enterprise Pricing'
  }
];

const faqs = [
  {
    question: 'What is included in the pricing?',
    answer: 'All plans include the core ERP platform, cloud hosting, regular updates, and standard support. Implementation and additional services are priced separately.'
  },
  {
    question: 'Are there any setup or hidden fees?',
    answer: 'No hidden fees. All costs are transparent. Setup fees only apply to implementation packages, which are optional for the Starter plan.'
  },
  {
    question: 'Can we switch between plans?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at your next billing cycle.'
  },
  {
    question: 'Do you offer discounts for multi-year contracts?',
    answer: 'Yes, we offer significant discounts for annual payments and additional savings for multi-year commitments.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept bank transfers, letters of credit, and major corporate payment methods. All payments can be made in USD or GHS.'
  },
  {
    question: 'Is there a free trial available?',
    answer: 'Yes, we offer a 30-day free trial for the Starter plan and personalized demos for Professional and Enterprise plans.'
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
              Transparent Pricing for
              <span className="text-primary-600"> Every Business</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Choose the perfect ERP plan for your petroleum operations. From small depots to large corporations, 
              we have flexible pricing that grows with your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="w-full sm:w-auto">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Choose Your Perfect Plan
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              All plans include core ERP functionality with varying levels of features and support.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.name}
                  className={`relative bg-white rounded-2xl p-8 shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                    plan.popular ? 'border-primary-500 scale-105' : 'border-neutral-200'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                        <Star className="h-4 w-4 mr-1" />
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary-600" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-neutral-900 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-neutral-600 mb-6">{plan.description}</p>
                    
                    <div className="mb-4">
                      <div className="text-4xl font-bold text-neutral-900 mb-1">
                        {plan.monthlyPrice}
                      </div>
                      {plan.monthlyPrice !== 'Custom' && (
                        <div className="text-sm text-neutral-500">per month</div>
                      )}
                    </div>
                    
                    {plan.yearlyPrice !== 'Custom Pricing' && (
                      <div className="bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm">
                        Annual: {plan.yearlyPrice} • {plan.savings}
                      </div>
                    )}
                  </div>

                  <div className="mb-8">
                    <h4 className="font-semibold text-neutral-900 mb-4">Included Features:</h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-neutral-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {plan.limitations.length > 0 && (
                    <div className="mb-8">
                      <h4 className="font-semibold text-neutral-700 mb-4">Limitations:</h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation) => (
                          <li key={limitation} className="text-neutral-600 text-sm">
                            • {limitation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Button 
                    className={`w-full ${plan.popular ? '' : 'variant-outline'}`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Add-on Services */}
      <section className="py-20 bg-primary-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Add-on Services & Extras
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Enhance your ERP experience with additional services and features.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addOnServices.map((service) => (
              <div key={service.name} className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200">
                <h3 className="font-semibold text-neutral-900 mb-2">
                  {service.name}
                </h3>
                <p className="text-neutral-600 text-sm mb-4">
                  {service.description}
                </p>
                <div className="text-primary-600 font-semibold">
                  {service.pricing}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Packages */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Implementation Packages
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Choose the level of implementation support that best fits your needs and timeline.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {implementationPackages.map((pkg) => (
              <div key={pkg.name} className="bg-white rounded-xl p-8 shadow-lg border border-neutral-200">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-display font-semibold text-neutral-900 mb-2">
                    {pkg.name}
                  </h3>
                  <div className="text-primary-600 font-medium mb-2">{pkg.duration}</div>
                  <p className="text-neutral-600 text-sm">{pkg.description}</p>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-neutral-900 mb-3">Includes:</h4>
                  <ul className="space-y-2">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-neutral-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="text-center mb-6">
                  <div className="text-2xl font-bold text-neutral-900">
                    {pkg.price}
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-neutral-300 max-w-3xl mx-auto">
              Get answers to common questions about our pricing and implementation.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
                <h3 className="text-lg font-semibold mb-3">
                  {faq.question}
                </h3>
                <p className="text-neutral-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator CTA */}
      <section className="py-20 bg-primary-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-6">
              Calculate Your ROI
            </h2>
            <p className="text-lg text-neutral-600 mb-8">
              See how much you can save and the return on your ERP investment with our interactive calculator.
            </p>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-200 mb-8">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">Significant</div>
                  <div className="text-sm text-neutral-600">Cost Reduction</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">Rapid</div>
                  <div className="text-sm text-neutral-600">ROI Timeline</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-600 mb-2">Exceptional</div>
                  <div className="text-sm text-neutral-600">Long-term ROI</div>
                </div>
              </div>
            </div>
            
            <Button size="lg">
              Calculate Your ROI
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Choose your plan and start transforming your petroleum operations today. 
              Our team is ready to help you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary-700">
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