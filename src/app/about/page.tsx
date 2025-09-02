import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Users, Target, Award, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'About OilFlow BIDEC | Leading Ghana Petroleum ERP Solutions',
  description: 'Learn about OilFlow BIDEC, Ghana\'s premier petroleum ERP solutions provider. Our mission, vision, and commitment to transforming the energy sector.',
  keywords: 'OilFlow BIDEC about, Ghana petroleum ERP company, energy sector solutions, petroleum software Ghana, ERP provider',
};

const teamMembers = [
  {
    name: 'Kwame Asante',
    role: 'Chief Executive Officer',
    background: '15+ years in petroleum industry operations and technology leadership',
    education: 'MBA from GIMPA, BSc Engineering from Kwame Nkrumah University',
  },
  {
    name: 'Akosua Mensah',
    role: 'Chief Technology Officer',
    background: '12+ years developing enterprise software solutions for African markets',
    education: 'MSc Computer Science from University of Ghana',
  },
  {
    name: 'Samuel Osei',
    role: 'Head of Petroleum Solutions',
    background: '20+ years in petroleum trading, operations, and regulatory compliance',
    education: 'Petroleum Engineering from University of Mines and Technology',
  },
  {
    name: 'Grace Adjei',
    role: 'Head of Financial Systems',
    background: '18+ years in banking and financial technology across West Africa',
    education: 'Chartered Accountant (Ghana), MSc Finance from KNUST',
  }
];

const milestones = [
  { year: '2018', event: 'Company founded with focus on Ghana petroleum sector' },
  { year: '2019', event: 'First major client implementation completed' },
  { year: '2020', event: 'Expansion to cover 25+ petroleum companies' },
  { year: '2021', event: 'Introduction of AI-powered analytics and forecasting' },
  { year: '2022', event: 'Partnership with major Ghanaian banks for integrated solutions' },
  { year: '2023', event: 'Achievement of 60% market share in Ghana petroleum ERP' },
  { year: '2024', event: 'Launch of next-generation cloud-native platform' }
];

const values = [
  {
    icon: Target,
    title: 'Innovation',
    description: 'Continuously advancing petroleum technology solutions to meet evolving industry needs.'
  },
  {
    icon: Users,
    title: 'Partnership',
    description: 'Building lasting relationships with clients through trust, transparency, and exceptional service.'
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'Delivering world-class solutions with uncompromising quality and reliability.'
  },
  {
    icon: Globe,
    title: 'Local Expertise',
    description: 'Deep understanding of Ghana\'s petroleum market, regulations, and business environment.'
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
              Transforming Ghana's
              <span className="text-primary-600"> Petroleum Industry</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Since 2018, we've been at the forefront of petroleum technology innovation in Ghana, 
              providing world-class ERP solutions that drive operational excellence and business growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-demo">
                <Button size="lg" className="w-full sm:w-auto">
                  Request Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-200">
              <h2 className="text-3xl font-display font-bold text-neutral-900 mb-6">Our Mission</h2>
              <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                To empower Ghana's petroleum industry with innovative, integrated ERP solutions that 
                streamline operations, ensure regulatory compliance, and drive sustainable business growth.
              </p>
              <p className="text-neutral-600">
                We are committed to understanding the unique challenges of Ghana's petroleum sector 
                and delivering technology solutions that address these challenges with precision and excellence.
              </p>
            </div>
            
            <div className="bg-primary-600 rounded-2xl p-8 text-white">
              <h2 className="text-3xl font-display font-bold mb-6">Our Vision</h2>
              <p className="text-lg opacity-90 leading-relaxed mb-6">
                To be the leading petroleum ERP solutions provider in West Africa, recognized for 
                innovation, reliability, and deep industry expertise.
              </p>
              <p className="opacity-90">
                We envision a future where every petroleum company in the region operates with 
                maximum efficiency through our integrated technology solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-primary-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              These values guide everything we do and shape our relationships with clients, partners, and team members.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="bg-white rounded-xl p-6 text-center shadow-lg border border-neutral-200">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-neutral-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Leadership Team
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Our experienced leadership team combines deep petroleum industry knowledge with cutting-edge technology expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-white rounded-xl p-8 shadow-lg border border-neutral-200">
                <div className="mb-6">
                  <h3 className="text-xl font-display font-semibold text-neutral-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 font-medium mb-4">{member.role}</p>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-neutral-700 mb-1">Experience</h4>
                    <p className="text-neutral-600 text-sm">{member.background}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-700 mb-1">Education</h4>
                    <p className="text-neutral-600 text-sm">{member.education}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-neutral-300 max-w-3xl mx-auto">
              From startup to market leader, here are the key milestones that have shaped our growth.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="flex items-start">
                  <div className="flex-shrink-0 w-20 text-right mr-8">
                    <span className="text-primary-400 font-bold text-lg">{milestone.year}</span>
                  </div>
                  <div className="flex-shrink-0 w-4 h-4 bg-primary-600 rounded-full mr-6 mt-1"></div>
                  <div className="flex-1">
                    <p className="text-neutral-200">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Our Impact
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Numbers that demonstrate our commitment to excellence and client success.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-neutral-200">
              <div className="text-4xl font-bold text-primary-600 mb-2">50+</div>
              <p className="text-neutral-600">Petroleum Companies</p>
              <p className="text-sm text-neutral-500 mt-1">Across Ghana</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg border border-neutral-200">
              <div className="text-4xl font-bold text-primary-600 mb-2">60%</div>
              <p className="text-neutral-600">Market Share</p>
              <p className="text-sm text-neutral-500 mt-1">In petroleum ERP</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg border border-neutral-200">
              <div className="text-4xl font-bold text-primary-600 mb-2">15M+</div>
              <p className="text-neutral-600">Liters Managed</p>
              <p className="text-sm text-neutral-500 mt-1">Daily on our platform</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg border border-neutral-200">
              <div className="text-4xl font-bold text-primary-600 mb-2">99.9%</div>
              <p className="text-neutral-600">System Uptime</p>
              <p className="text-sm text-neutral-500 mt-1">Ensuring continuity</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
              Ready to Partner With Us?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Join the growing number of petroleum companies in Ghana who trust OilFlow BIDEC 
              to power their operations and drive their success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-demo">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Schedule Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
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