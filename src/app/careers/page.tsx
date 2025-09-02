import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Rocket, Users, Target, Lightbulb, Heart, Trophy, Mail, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Careers | Join Our Mission | OilFlow BIDEC',
  description: 'Be part of the team revolutionizing petroleum trading in Ghana. Join industry veterans building the future of ERP for African petroleum markets.',
  keywords: 'careers Ghana, petroleum ERP jobs, tech jobs Accra, software engineering Ghana',
};

const values = [
  {
    icon: Target,
    title: 'Industry Expertise',
    description: 'Work alongside veterans with decades of petroleum trading experience who understand the real challenges.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation First',
    description: 'Apply cutting-edge AI and modern technologies to solve complex industry problems.',
  },
  {
    icon: Users,
    title: 'Impact-Driven',
    description: 'Your work will directly transform how petroleum trading operates across Ghana and West Africa.',
  },
  {
    icon: Heart,
    title: 'Growth Mindset',
    description: 'Continuous learning environment where your professional development is a priority.',
  },
  {
    icon: Trophy,
    title: 'Excellence Standard',
    description: 'We build production-grade solutions that set new industry benchmarks.',
  },
  {
    icon: Rocket,
    title: 'Pioneer Spirit',
    description: 'Be part of the founding team shaping the future of African petroleum technology.',
  },
];

const futureRoles = [
  {
    category: 'Engineering',
    positions: [
      'Senior Full-Stack Engineers',
      'DevOps Engineers',
      'Data Engineers',
      'QA Engineers',
    ],
  },
  {
    category: 'Product & Design',
    positions: [
      'Product Managers',
      'UX/UI Designers',
      'Business Analysts',
    ],
  },
  {
    category: 'Business',
    positions: [
      'Sales Executives',
      'Implementation Specialists',
      'Customer Success Managers',
      'Marketing Specialists',
    ],
  },
  {
    category: 'Domain Experts',
    positions: [
      'Petroleum Trading Specialists',
      'Financial Analysts',
      'Compliance Officers',
    ],
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
              <Calendar className="h-4 w-4 mr-2" />
              Building Our Team for 2025 Launch
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
              Join the Pioneers
              <span className="text-primary-600"> Transforming Petroleum Trading</span>
            </h1>
            
            <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              We're assembling a world-class team to launch Ghana's most advanced petroleum ERP platform in 2025. 
              Built by industry veterans, for industry leaders.
            </p>
          </div>
        </div>
      </section>

      {/* Current Status */}
      <section className="py-20 bg-primary-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-200">
              <h2 className="text-2xl font-display font-bold text-neutral-900 mb-4">
                Pre-Launch Talent Pipeline
              </h2>
              <p className="text-lg text-neutral-600 mb-6">
                While we're not actively hiring yet, we're building our talent pipeline for our Q1 2025 launch. 
                We're particularly interested in connecting with exceptional professionals who share our vision 
                of revolutionizing petroleum trading technology in Africa.
              </p>
              
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <h3 className="font-semibold text-neutral-900 mb-3">
                  🚀 Express Your Interest Early
                </h3>
                <p className="text-neutral-600 mb-4">
                  Join our talent community to be the first to know when positions open. 
                  Early applicants will receive priority consideration for founding team roles.
                </p>
                <Link href="#join-talent-pool">
                  <Button className="w-full sm:w-auto">
                    Join Our Talent Pool
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Why Join OilFlow BIDEC?
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Be part of a mission-driven team that's setting new standards for petroleum trading technology in Africa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Future Roles */}
      <section className="py-20 bg-neutral-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Roles We'll Be Hiring For
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Here's a preview of the positions we expect to fill as we scale for our 2025 launch.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {futureRoles.map((role) => (
              <div key={role.category} className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">{role.category}</h3>
                <ul className="space-y-2">
                  {role.positions.map((position) => (
                    <li key={position} className="flex items-center text-neutral-600">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3" />
                      {position}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-12 text-center">
              What We'll Offer Our Team
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 border border-neutral-200">
                <h3 className="font-semibold text-neutral-900 mb-3">Competitive Compensation</h3>
                <p className="text-neutral-600">Market-leading salaries with equity options for early team members.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 border border-neutral-200">
                <h3 className="font-semibold text-neutral-900 mb-3">Remote-First Culture</h3>
                <p className="text-neutral-600">Work from anywhere while collaborating with a global team.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 border border-neutral-200">
                <h3 className="font-semibold text-neutral-900 mb-3">Learning & Development</h3>
                <p className="text-neutral-600">Continuous learning budget and mentorship from industry veterans.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 border border-neutral-200">
                <h3 className="font-semibold text-neutral-900 mb-3">Impact & Ownership</h3>
                <p className="text-neutral-600">Direct influence on product decisions and company direction.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 border border-neutral-200">
                <h3 className="font-semibold text-neutral-900 mb-3">Health & Wellness</h3>
                <p className="text-neutral-600">Comprehensive health coverage and wellness programs.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 border border-neutral-200">
                <h3 className="font-semibold text-neutral-900 mb-3">Work-Life Balance</h3>
                <p className="text-neutral-600">Flexible hours and generous time-off policies.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 bg-primary-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <MapPin className="h-12 w-12 text-primary-600 mx-auto mb-6" />
            <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
              Based in Ghana, Reaching Africa
            </h2>
            <p className="text-lg text-neutral-600 mb-8">
              Our headquarters will be in Accra, Ghana, but we're building a distributed team 
              across Africa and beyond. We believe great talent exists everywhere.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="join-talent-pool" className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
              Be Part of Something Revolutionary
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Join our talent pool today and be among the first to know when we start hiring 
              for our founding team. Help us transform petroleum trading in Africa.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <h3 className="text-xl font-semibold mb-4">Express Your Interest</h3>
              <p className="mb-6 opacity-90">
                Send your CV and a brief note about why you're excited about OilFlow BIDEC to:
              </p>
              
              <a 
                href="mailto:careers@oilflowbidec.com" 
                className="inline-flex items-center text-2xl font-bold hover:underline"
              >
                <Mail className="h-6 w-6 mr-3" />
                careers@oilflowbidec.com
              </a>
              
              <p className="mt-6 text-sm opacity-75">
                We'll keep your information on file and reach out when relevant positions open.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}