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
    icon: FileText,
    title: 'Whitepapers & Case Studies',
    description: 'In-depth analysis of petroleum industry challenges and ERP solutions',
    resources: [
      { title: 'Digital Transformation in Ghana Petroleum Sector', type: 'Whitepaper', date: '2024' },
      { title: 'Batch Management Best Practices', type: 'Case Study', date: '2024' },
      { title: 'Regulatory Compliance Guide for Petroleum Trading', type: 'Guide', date: '2024' },
      { title: 'ROI Analysis: ERP Implementation Success Stories', type: 'Report', date: '2023' }
    ]
  },
  {
    icon: Video,
    title: 'Training & Tutorials',
    description: 'Comprehensive training materials and video tutorials for users',
    resources: [
      { title: 'Getting Started with Batch Management', type: 'Video Tutorial', date: '2024' },
      { title: 'Vessel Operations Workflow Training', type: 'Training Module', date: '2024' },
      { title: 'Financial Reporting & Analytics', type: 'Webinar', date: '2024' },
      { title: 'User Administration Best Practices', type: 'Training Guide', date: '2024' }
    ]
  },
  {
    icon: BookOpen,
    title: 'Industry Insights',
    description: 'Latest trends, regulations, and insights in Ghana petroleum industry',
    resources: [
      { title: 'Ghana Petroleum Industry Report 2024', type: 'Report', date: '2024' },
      { title: 'NPA Regulatory Updates & Compliance', type: 'Regulatory Update', date: '2024' },
      { title: 'Market Analysis: Fuel Distribution Trends', type: 'Analysis', date: '2024' },
      { title: 'Banking Integration in Petroleum Sector', type: 'Article', date: '2023' }
    ]
  }
];

const webinars = [
  {
    title: 'Mastering Petroleum Batch Management',
    date: 'December 15, 2024',
    time: '2:00 PM GMT',
    speaker: 'Samuel Osei, Head of Petroleum Solutions',
    description: 'Learn advanced batch tracking techniques and best practices for inventory management.',
    status: 'upcoming'
  },
  {
    title: 'Ghana Banking Integration for Petroleum Companies',
    date: 'November 20, 2024',
    time: '3:00 PM GMT',
    speaker: 'Grace Adjei, Head of Financial Systems',
    description: 'Streamline your financial operations with seamless banking integration.',
    status: 'recorded'
  },
  {
    title: 'Regulatory Compliance Automation',
    date: 'October 25, 2024',
    time: '2:30 PM GMT',
    speaker: 'Kwame Asante, CEO',
    description: 'Automate your regulatory reporting and ensure 100% compliance.',
    status: 'recorded'
  }
];

const tools = [
  {
    title: 'ERP Readiness Assessment',
    description: 'Evaluate your organization\'s readiness for ERP implementation',
    type: 'Interactive Tool',
    action: 'Take Assessment'
  },
  {
    title: 'ROI Calculator',
    description: 'Calculate potential return on investment for your ERP project',
    type: 'Calculator',
    action: 'Calculate ROI'
  },
  {
    title: 'Implementation Timeline Planner',
    description: 'Plan your ERP implementation with our step-by-step guide',
    type: 'Planner',
    action: 'Start Planning'
  }
];

const certifications = [
  {
    title: 'OilFlow BIDEC User Certification',
    description: 'Comprehensive certification program for end users',
    duration: '40 hours',
    level: 'Beginner to Advanced'
  },
  {
    title: 'System Administrator Certification',
    description: 'Advanced certification for system administrators and IT professionals',
    duration: '60 hours',
    level: 'Advanced'
  },
  {
    title: 'Petroleum Industry Specialist',
    description: 'Industry-specific certification focusing on petroleum operations',
    duration: '80 hours',
    level: 'Expert'
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
              Access comprehensive resources to maximize your petroleum ERP success. From implementation guides 
              to industry insights, we provide everything you need to excel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-demo">
                <Button size="lg" className="w-full sm:w-auto">
                  Request Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Download Catalog
                <Download className="ml-2 h-5 w-5" />
              </Button>
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
                      <div key={resource.title} className="flex items-start p-4 border border-neutral-200 rounded-lg hover:border-primary-200 hover:bg-primary-50/50 transition-colors">
                        <div className="flex-1">
                          <h4 className="font-semibold text-neutral-900 mb-1">{resource.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-neutral-600">
                            <span className="px-2 py-1 bg-neutral-100 rounded text-xs">{resource.type}</span>
                            <span>{resource.date}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="ml-4">
                          <Download className="h-4 w-4" />
                        </Button>
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
              Webinars & Training Sessions
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Join our expert-led webinars to learn from industry professionals and stay updated on latest trends.
            </p>
          </div>

          <div className="space-y-6">
            {webinars.map((webinar) => (
              <div key={webinar.title} className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1 mb-6 lg:mb-0">
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-display font-semibold text-neutral-900 mr-3">
                        {webinar.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        webinar.status === 'upcoming' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {webinar.status === 'upcoming' ? 'Upcoming' : 'Recorded'}
                      </span>
                    </div>
                    <p className="text-neutral-600 mb-3">{webinar.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-neutral-500">
                      <span>📅 {webinar.date}</span>
                      <span>⏰ {webinar.time}</span>
                      <span>👨‍💼 {webinar.speaker}</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm">
                      {webinar.status === 'upcoming' ? 'Register' : 'Watch Recording'}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
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
            {tools.map((tool) => (
              <div key={tool.title} className="bg-white rounded-xl p-8 shadow-lg border border-neutral-200 text-center hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-display font-semibold text-neutral-900 mb-4">
                  {tool.title}
                </h3>
                <p className="text-neutral-600 mb-4">
                  {tool.description}
                </p>
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
                  {tool.type}
                </span>
                <Button className="w-full">
                  {tool.action}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
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
              Certification Programs
            </h2>
            <p className="text-lg text-neutral-300 max-w-3xl mx-auto">
              Advance your career with our comprehensive certification programs designed for petroleum industry professionals.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {certifications.map((cert) => (
              <div key={cert.title} className="bg-neutral-800 rounded-xl p-8 border border-neutral-700">
                <h3 className="text-xl font-display font-semibold mb-4">
                  {cert.title}
                </h3>
                <p className="text-neutral-300 mb-6">
                  {cert.description}
                </p>
                <div className="space-y-2 mb-8">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Duration:</span>
                    <span className="text-white">{cert.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Level:</span>
                    <span className="text-white">{cert.level}</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full border-neutral-600 text-white hover:bg-white hover:text-neutral-900">
                  Learn More
                </Button>
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
              Use our resources to prepare for success, then let our experts guide you through 
              the implementation process for optimal results.
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