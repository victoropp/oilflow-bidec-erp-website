import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Phone, Mail, MapPin, Clock, MessageCircle, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Contact OilFlow BIDEC | Get in Touch with Our Petroleum ERP Experts',
  description: 'Contact OilFlow BIDEC for petroleum ERP solutions in Ghana. Speak with our experts about batch management, vessel operations, and financial systems.',
  keywords: 'contact OilFlow BIDEC, Ghana petroleum ERP support, petroleum software consultation, ERP solutions Ghana',
};

const contactMethods = [
  {
    icon: Phone,
    title: 'Phone',
    primary: 'UK: +44 7442 852675',
    secondary: 'Ghana: +233 248769377',
    description: 'Speak directly with our petroleum ERP specialists',
    action: 'Call Now',
    href: 'tel:+447442852675'
  },
  {
    icon: Mail,
    title: 'Email',
    primary: 'sales@oilflowbidec.com',
    secondary: 'support@oilflowbidec.com',
    description: 'Get detailed responses to your technical questions',
    action: 'Send Email',
    href: 'mailto:sales@oilflowbidec.com'
  },
  {
    icon: MapPin,
    title: 'Visit Our Office',
    primary: 'Ridge Towers, 2nd Floor',
    secondary: 'Ridge, Accra, Ghana',
    description: 'Meet our team and see live demonstrations',
    action: 'Get Directions',
    href: 'https://maps.google.com/?q=Ridge+Towers+Accra'
  }
];

const officeHours = [
  { day: 'Monday - Friday', hours: '8:00 AM - 6:00 PM' },
  { day: 'Saturday', hours: '9:00 AM - 2:00 PM' },
  { day: 'Sunday', hours: 'Closed' },
  { day: 'Public Holidays', hours: 'Closed' }
];

const supportOptions = [
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Get instant answers from our technical support team',
    availability: '24/7 for existing clients',
    action: 'Start Chat'
  },
  {
    icon: Users,
    title: 'Consultation',
    description: 'Schedule a detailed consultation with our petroleum experts',
    availability: 'Available by appointment',
    action: 'Book Meeting'
  },
  {
    icon: Clock,
    title: 'Emergency Support',
    description: 'Critical system issues for production environments',
    availability: '24/7 for premium clients',
    action: 'Emergency Line'
  }
];

const salesTeam = [
  {
    name: 'Kweku Mensah',
    role: 'Senior Sales Director',
    expertise: 'Large enterprise implementations',
    phone: '+44 7442 852675',
    email: 'kweku.mensah@oilflowbidec.com'
  },
  {
    name: 'Akua Darko',
    role: 'Solutions Consultant',
    expertise: 'Batch management & vessel operations',
    phone: '+233 248769377',
    email: 'akua.darko@oilflowbidec.com'
  },
  {
    name: 'Samuel Baidoo',
    role: 'Financial Systems Specialist',
    expertise: 'Banking integration & dual currency',
    phone: '+233 248769377',
    email: 'samuel.baidoo@oilflowbidec.com'
  }
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
              Get in Touch with
              <span className="text-primary-600"> Our Experts</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Ready to transform your petroleum operations? Our team of experts is here to help you 
              find the perfect ERP solution for your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-demo">
                <Button size="lg" className="w-full sm:w-auto">
                  Request Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="tel:+233301234567">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Call Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Multiple Ways to Reach Us
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Choose the most convenient way to connect with our petroleum ERP specialists.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              return (
                <div key={method.title} className="bg-white rounded-xl p-8 shadow-lg border border-neutral-200 text-center hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-neutral-900 mb-4">
                    {method.title}
                  </h3>
                  <div className="mb-4">
                    <p className="font-medium text-neutral-900">{method.primary}</p>
                    <p className="text-neutral-600 text-sm">{method.secondary}</p>
                  </div>
                  <p className="text-neutral-600 text-sm mb-6">
                    {method.description}
                  </p>
                  <a href={method.href} target={method.href.startsWith('http') ? '_blank' : undefined}>
                    <Button variant="outline" className="w-full">
                      {method.action}
                    </Button>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="py-20 bg-primary-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-6">
                Office Hours
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                Our team is available during these hours to provide personalized support and consultation.
              </p>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200">
                <div className="space-y-4">
                  {officeHours.map((schedule) => (
                    <div key={schedule.day} className="flex justify-between items-center py-2 border-b border-neutral-100 last:border-b-0">
                      <span className="font-medium text-neutral-700">{schedule.day}</span>
                      <span className="text-neutral-600">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                  <p className="text-sm text-primary-700">
                    <strong>Note:</strong> Emergency support available 24/7 for critical system issues (premium clients)
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-6">
                Support Options
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                We offer multiple support channels to ensure you get the help you need, when you need it.
              </p>
              
              <div className="space-y-6">
                {supportOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <div key={option.title} className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200">
                      <div className="flex items-start">
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                          <Icon className="h-6 w-6 text-primary-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-neutral-900 mb-1">{option.title}</h3>
                          <p className="text-neutral-600 text-sm mb-2">{option.description}</p>
                          <p className="text-primary-600 text-xs font-medium">{option.availability}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          {option.action}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sales Team */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Meet Our Sales Team
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Our experienced sales professionals understand the petroleum industry and can help you choose the right solution.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {salesTeam.map((member) => (
              <div key={member.name} className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-display font-semibold text-neutral-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 font-medium text-sm mb-2">{member.role}</p>
                  <p className="text-neutral-600 text-xs">{member.expertise}</p>
                </div>
                <div className="space-y-3">
                  <a href={`tel:${member.phone}`} className="flex items-center text-sm text-neutral-600 hover:text-primary-600">
                    <Phone className="h-4 w-4 mr-2" />
                    {member.phone}
                  </a>
                  <a href={`mailto:${member.email}`} className="flex items-center text-sm text-neutral-600 hover:text-primary-600">
                    <Mail className="h-4 w-4 mr-2" />
                    {member.email}
                  </a>
                </div>
                <div className="mt-6">
                  <Button variant="outline" size="sm" className="w-full">
                    Schedule Call
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Map */}
      <section className="py-20 bg-neutral-100">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Visit Our Office
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Located in the heart of Accra's business district for convenient access to our clients across Ghana.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-200">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-display font-semibold text-neutral-900 mb-4">
                  OilFlow BIDEC Headquarters
                </h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-neutral-900">Ridge Towers, 2nd Floor</p>
                      <p className="text-neutral-600">Ridge, Accra, Ghana</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-primary-600 mr-2" />
                    <p className="text-neutral-600">UK: +44 7442 852675 | Ghana: +233 248769377</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-primary-600 mr-2" />
                    <p className="text-neutral-600">office@oilflowbidec.com</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-6">
                  <h4 className="font-medium text-neutral-700">Nearby Landmarks:</h4>
                  <ul className="text-sm text-neutral-600 space-y-1">
                    <li>• 5 minutes from Accra Mall</li>
                    <li>• 10 minutes from Kotoka International Airport</li>
                    <li>• Walking distance from Ridge Hospital</li>
                    <li>• Close to major government ministries</li>
                  </ul>
                </div>
                
                <a href="https://maps.google.com/?q=Ridge+Towers+Accra" target="_blank">
                  <Button className="w-full">
                    Get Directions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
              
              <div className="bg-neutral-200 rounded-lg h-64 lg:h-auto flex items-center justify-center">
                <p className="text-neutral-500">Interactive Map Coming Soon</p>
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
              Ready to Get Started?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Don't wait to transform your petroleum operations. Contact our experts today and discover 
              how OilFlow BIDEC can drive your business success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-demo">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Schedule Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="tel:+233301234567">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary-700">
                  Call Sales Team
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}