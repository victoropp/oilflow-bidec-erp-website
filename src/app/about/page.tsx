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
    name: 'Victor Collins Oppon',
    role: 'Chief Executive Officer',
    background: '15+ years in petroleum industry operations, Data Scientist and AI Expert',
    education: 'MBA Finance, FCCA, BSc Administration (Accounting) from UGBS',
  },
  {
    name: 'Akosua Mensah',
    role: 'Chief Technology Officer',
    background: '8+ years developing enterprise software solutions for African markets',
    education: 'MSc Computer Science from University of Ghana',
  },
  {
    name: 'Samuel Osei',
    role: 'Head of Petroleum Solutions',
    background: '15+ years in petroleum trading, operations, and regulatory compliance',
    education: 'Petroleum Engineering from University of Mines and Technology',
  },
  {
    name: 'Grace Adjei',
    role: 'Head of Financial Systems',
    background: '12+ years in banking and financial technology across West Africa',
    education: 'Chartered Accountant (Ghana), MSc Finance from KNUST',
  }
];

const milestones = [
  { year: '2023 Q1', event: 'Industry veterans unite with shared vision to revolutionize petroleum ERP' },
  { year: '2023 Q3', event: 'Intensive R&D phase begins - analyzing gaps in existing ERP solutions' },
  { year: '2023 Q4', event: 'Core architecture developed based on decades of operational experience' },
  { year: '2024 Q1', event: 'Advanced features development: AI-powered analytics and forecasting modules' },
  { year: '2024 Q2', event: 'Strategic partnerships established with major Ghanaian financial institutions' },
  { year: '2024 Q3', event: 'Beta testing with select petroleum companies validates market approach' },
  { year: '2024 Q4', event: 'Production-ready platform completed with industry-leading capabilities' }
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
              Built by Industry Veterans.
              <span className="text-primary-600"> Designed for Your Success.</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              After decades of experience in Ghana's petroleum sector, our team spent two years in intensive R&D 
              building the ERP solution the industry actually needs - not what vendors think you need.
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
                To leverage our combined decades of BDC and petroleum industry expertise to deliver 
                the ERP solution Ghana's energy sector has been waiting for - one built by insiders 
                who understand the real operational challenges.
              </p>
              <p className="text-neutral-600">
                Having worked within the industry's complexities for years, we recognized the gap between 
                existing software and actual needs. Our mission is to bridge that gap with precision-engineered solutions.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-8 text-white shadow-xl">
              <h2 className="text-3xl font-display font-bold mb-6 text-white">Our Vision</h2>
              <p className="text-lg text-white leading-relaxed mb-6 font-medium">
                To establish the new standard for petroleum ERP in West Africa - where technology 
                finally matches the sophistication of industry veterans who built it.
              </p>
              <p className="text-white">
                By 2026, we envision every major petroleum company in Ghana choosing OilFlow BIDEC 
                because our solutions reflect decades of hands-on industry knowledge, not theoretical assumptions.
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
              Meet the industry veterans who spent decades identifying what was missing in petroleum ERP systems, 
              then took two years to engineer the solution Ghana's energy sector actually needs.
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
              From industry insight to market-ready solution - the strategic milestones of our development journey, 
              driven by decades of combined petroleum sector expertise.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={`${milestone.year}-${index}`} className="flex items-start">
                  <div className="flex-shrink-0 w-24 text-right mr-8">
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
              The strategic foundation behind our veteran-led approach to petroleum ERP development.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-neutral-200">
              <div className="text-4xl font-bold text-primary-600 mb-2">40+</div>
              <p className="text-neutral-600">Years Combined Experience</p>
              <p className="text-sm text-neutral-500 mt-1">Leadership team expertise</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg border border-neutral-200">
              <div className="text-4xl font-bold text-primary-600 mb-2">2</div>
              <p className="text-neutral-600">Years R&D</p>
              <p className="text-sm text-neutral-500 mt-1">Intensive development phase</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg border border-neutral-200">
              <div className="text-4xl font-bold text-primary-600 mb-2">10+</div>
              <p className="text-neutral-600">Beta Partners</p>
              <p className="text-sm text-neutral-500 mt-1">Validating our approach</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg border border-neutral-200">
              <div className="text-4xl font-bold text-primary-600 mb-2">2025</div>
              <p className="text-neutral-600">Market Launch</p>
              <p className="text-sm text-neutral-500 mt-1">Ready for deployment</p>
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
              Experience the difference when petroleum ERP is built by industry veterans who understand 
              your operational challenges from years of hands-on experience, not theoretical assumptions.
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