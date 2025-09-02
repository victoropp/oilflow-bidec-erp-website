import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, FileText, Video, Users, BookOpen, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Resources & Knowledge Center | OilFlow BIDEC',
  description: 'Access comprehensive resources for petroleum ERP implementation. Case studies, whitepapers, training materials, and industry insights for Ghana petroleum sector.',
  keywords: 'petroleum ERP resources, Ghana oil industry insights, ERP implementation guide, petroleum trading knowledge, industry best practices',
};

const resourceCategories = [
  {
    icon: BookOpen,
    title: 'Industry Expertise',
    description: 'Leverage our team\'s decades of petroleum industry experience',
    resources: [
      { title: 'Free ERP Consultation', type: 'Expert Consultation', available: true },
      { title: 'Petroleum Operations Assessment', type: 'Business Analysis', available: true },
      { title: 'Regulatory Compliance Guidance', type: 'Advisory Service', available: true },
      { title: 'Implementation Planning', type: 'Strategic Planning', available: true }
    ]
  },
  {
    icon: Users,
    title: 'Professional Services',
    description: 'Connect with industry veterans for personalized guidance',
    resources: [
      { title: 'One-on-One Expert Sessions', type: 'Personal Consultation', available: true },
      { title: 'Business Process Review', type: 'Operational Analysis', available: true },
      { title: 'Technology Readiness Assessment', type: 'Technical Evaluation', available: true },
      { title: 'ROI Planning Workshop', type: 'Strategic Session', available: true }
    ]
  },
  {
    icon: FileText,
    title: 'Coming Soon - 2025',
    description: 'Comprehensive resources being developed for platform launch',
    resources: [
      { title: 'User Training Materials', type: 'Training Content', available: false },
      { title: 'Implementation Guides', type: 'Documentation', available: false },
      { title: 'Best Practices Library', type: 'Knowledge Base', available: false },
      { title: 'Video Tutorial Series', type: 'Training Videos', available: false }
    ]
  }
];

const consultationServices = [
  {
    title: 'Free ERP Strategy Consultation',
    description: 'Get expert guidance on ERP implementation planning for your petroleum operations.',
    duration: '60 minutes',
    format: 'Video Call or In-Person',
    available: true
  },
  {
    title: 'Business Process Assessment',
    description: 'Comprehensive review of your current operations and technology readiness.',
    duration: '2-3 hours',
    format: 'On-site or Remote',
    available: true
  },
  {
    title: 'Industry Expert Roundtable - Coming 2025',
    description: 'Join discussions with petroleum industry experts and ERP professionals.',
    duration: 'Quarterly Events',
    format: 'Hybrid Events',
    available: false
  }
];

const practicalTools = [
  {
    title: 'ROI Calculator',
    description: 'Calculate potential return on investment for your ERP project',
    type: 'Available Now',
    action: 'Calculate ROI',
    available: true,
    link: '/#roi-calculator'
  },
  {
    title: 'Expert Consultation',
    description: 'Get personalized assessment of your ERP readiness and planning',
    type: 'Professional Service',
    action: 'Schedule Call',
    available: true,
    link: '/contact'
  },
  {
    title: 'Implementation Planner',
    description: 'Interactive planning tools being developed for 2025 platform launch',
    type: 'Coming 2025',
    action: 'Coming Soon',
    available: false,
    link: null
  }
];

const upcomingPrograms = [
  {
    title: 'User Training Program',
    description: 'Comprehensive training for end users - available with platform launch',
    timeline: 'Q2 2025',
    status: 'In Development'
  },
  {
    title: 'Administrator Training',
    description: 'Advanced training for system administrators and IT professionals',
    timeline: 'Q3 2025',
    status: 'Planning Phase'
  },
  {
    title: 'Industry Specialist Program',
    description: 'Industry-specific training focusing on petroleum operations',
    timeline: 'Q4 2025',
    status: 'Planning Phase'
  }
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
              Knowledge Center &
              <span className="text-primary-600"> Resources</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              While we finalize our platform for 2025 launch, explore valuable insights about petroleum ERP implementation 
              and connect with our industry experts for guidance.
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
                  Contact Experts
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Comprehensive Learning Resources
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Explore our extensive library of resources designed to help you succeed with petroleum ERP implementation.
            </p>
          </div>

          <div className="space-y-12">
            {resourceCategories.map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.title} className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-200">
                  <div className="flex items-start mb-8">
                    <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mr-6 flex-shrink-0">
                      <Icon className="h-8 w-8 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-display font-semibold text-neutral-900 mb-3">
                        {category.title}
                      </h3>
                      <p className="text-lg text-neutral-600">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {category.resources.map((resource) => (
                      <div key={resource.title} className={`flex items-start p-4 border border-neutral-200 rounded-lg transition-colors ${
                        resource.available ? 'hover:border-primary-200 hover:bg-primary-50/50' : 'opacity-60'
                      }`}>
                        <div className="flex-1">
                          <h4 className="font-semibold text-neutral-900 mb-1">{resource.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-neutral-600">
                            <span className={`px-2 py-1 rounded text-xs ${
                              resource.available ? 'bg-green-100 text-green-700' : 'bg-neutral-100'
                            }`}>{resource.type}</span>
                            <span>{resource.available ? 'Available Now' : 'Coming 2025'}</span>
                          </div>
                        </div>
                        {resource.available ? (
                          <Link href="/contact">
                            <Button variant="outline" size="sm" className="ml-4">
                              Contact Us
                            </Button>
                          </Link>
                        ) : (
                          <Button variant="outline" size="sm" className="ml-4" disabled>
                            Coming Soon
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Webinars Section */}
      <section className="py-20 bg-primary-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Expert Consultation Services
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Connect directly with our industry veterans for personalized guidance and strategic planning.
            </p>
          </div>

          <div className="space-y-6">
            {consultationServices.map((service) => (
              <div key={service.title} className={`bg-white rounded-xl p-6 shadow-lg border border-neutral-200 ${
                !service.available ? 'opacity-60' : ''
              }`}>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1 mb-6 lg:mb-0">
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-display font-semibold text-neutral-900 mr-3">
                        {service.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        service.available 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-neutral-100 text-neutral-700'
                      }`}>
                        {service.available ? 'Available Now' : 'Coming 2025'}
                      </span>
                    </div>
                    <p className="text-neutral-600 mb-3">{service.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-neutral-500">
                      <span>⏱️ {service.duration}</span>
                      <span>💻 {service.format}</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    {service.available ? (
                      <Link href="/contact">
                        <Button variant="outline" size="sm">
                          Schedule Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    ) : (
                      <Button variant="outline" size="sm" disabled>
                        Coming Soon
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Interactive Tools & Assessments
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Use our interactive tools to assess your needs, calculate ROI, and plan your ERP implementation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {practicalTools.map((tool) => (
              <div key={tool.title} className={`bg-white rounded-xl p-8 shadow-lg border border-neutral-200 text-center transition-shadow ${
                tool.available ? 'hover:shadow-xl' : 'opacity-60'
              }`}>
                <h3 className="text-xl font-display font-semibold text-neutral-900 mb-4">
                  {tool.title}
                </h3>
                <p className="text-neutral-600 mb-4">
                  {tool.description}
                </p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-6 ${
                  tool.available ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-700'
                }`}>
                  {tool.type}
                </span>
                {tool.available && tool.link ? (
                  <Link href={tool.link}>
                    <Button className="w-full">
                      {tool.action}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                ) : (
                  <Button className="w-full" disabled>
                    {tool.action}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Programs */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
              Training Programs - Coming 2025
            </h2>
            <p className="text-lg text-neutral-300 max-w-3xl mx-auto">
              Comprehensive training programs being developed alongside our platform for petroleum industry professionals.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {upcomingPrograms.map((program) => (
              <div key={program.title} className="bg-neutral-800 rounded-xl p-8 border border-neutral-700 opacity-75">
                <h3 className="text-xl font-display font-semibold mb-4">
                  {program.title}
                </h3>
                <p className="text-neutral-300 mb-6">
                  {program.description}
                </p>
                <div className="space-y-2 mb-8">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Timeline:</span>
                    <span className="text-white">{program.timeline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Status:</span>
                    <span className="text-orange-300">{program.status}</span>
                  </div>
                </div>
                <Link href="/contact">
                  <Button variant="outline" className="w-full border-neutral-600 text-white hover:bg-white hover:text-neutral-900">
                    Get Notified
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 bg-primary-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-6">
              Need More Support?
            </h2>
            <p className="text-lg text-neutral-600 mb-8">
              Our dedicated support team is here to help you make the most of these resources and achieve your ERP goals.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow border border-neutral-200">
                <Users className="h-8 w-8 text-primary-600 mx-auto mb-4" />
                <h3 className="font-semibold text-neutral-900 mb-2">Expert Consultation</h3>
                <p className="text-sm text-neutral-600 mb-4">Get personalized advice from our petroleum ERP experts</p>
                <Button variant="outline" size="sm" className="w-full">Contact Expert</Button>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow border border-neutral-200">
                <FileText className="h-8 w-8 text-primary-600 mx-auto mb-4" />
                <h3 className="font-semibold text-neutral-900 mb-2">Custom Resources</h3>
                <p className="text-sm text-neutral-600 mb-4">Request specific resources tailored to your needs</p>
                <Button variant="outline" size="sm" className="w-full">Request Resources</Button>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow border border-neutral-200">
                <Video className="h-8 w-8 text-primary-600 mx-auto mb-4" />
                <h3 className="font-semibold text-neutral-900 mb-2">Private Training</h3>
                <p className="text-sm text-neutral-600 mb-4">Schedule private training sessions for your team</p>
                <Button variant="outline" size="sm" className="w-full">Schedule Training</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
              Ready to Start Your ERP Journey?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Connect with our industry veterans today for expert guidance, then be ready for our 
              comprehensive platform and resources launching in 2025.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-demo">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Request Demo
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