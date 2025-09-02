import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | OilFlow BIDEC ERP',
  description: 'Privacy policy for OilFlow BIDEC ERP website and services, including GDPR compliance information',
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = '2024-08-30';

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Header */}
          <div className="border-b pb-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
            <p className="text-gray-600">
              Last updated: {new Date(lastUpdated).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              This privacy policy applies to the OilFlow BIDEC ERP website and services.
            </p>
          </div>

          {/* Table of Contents */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-blue-900 mb-4">Table of Contents</h2>
            <nav className="space-y-2">
              <a href="#overview" className="block text-blue-700 hover:text-blue-900 transition-colors">1. Overview</a>
              <a href="#information-we-collect" className="block text-blue-700 hover:text-blue-900 transition-colors">2. Information We Collect</a>
              <a href="#how-we-use" className="block text-blue-700 hover:text-blue-900 transition-colors">3. How We Use Your Information</a>
              <a href="#information-sharing" className="block text-blue-700 hover:text-blue-900 transition-colors">4. Information Sharing</a>
              <a href="#data-retention" className="block text-blue-700 hover:text-blue-900 transition-colors">5. Data Retention</a>
              <a href="#your-rights" className="block text-blue-700 hover:text-blue-900 transition-colors">6. Your Rights (GDPR)</a>
              <a href="#security" className="block text-blue-700 hover:text-blue-900 transition-colors">7. Security Measures</a>
              <a href="#cookies" className="block text-blue-700 hover:text-blue-900 transition-colors">8. Cookies and Tracking</a>
              <a href="#international-transfers" className="block text-blue-700 hover:text-blue-900 transition-colors">9. International Data Transfers</a>
              <a href="#changes" className="block text-blue-700 hover:text-blue-900 transition-colors">10. Changes to This Policy</a>
              <a href="#contact" className="block text-blue-700 hover:text-blue-900 transition-colors">11. Contact Information</a>
            </nav>
          </div>

          {/* Content Sections */}
          <div className="prose prose-gray max-w-none">
            <section id="overview" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Overview</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  BIDEC ("we," "our," or "us") is committed to protecting your privacy and ensuring the security 
                  of your personal information. This Privacy Policy explains how we collect, use, store, and 
                  protect your information when you visit our website or use our OilFlow ERP services.
                </p>
                <p>
                  We are committed to compliance with the General Data Protection Regulation (GDPR) and other 
                  applicable privacy laws. If you are located in the European Union, you have specific rights 
                  regarding your personal data, which are detailed in this policy.
                </p>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        <strong>Important:</strong> By using our website or services, you consent to the 
                        collection and use of your information as described in this Privacy Policy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="information-we-collect" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-xl font-semibold text-gray-900">2.1 Personal Information</h3>
                <p>We collect the following personal information when you interact with our services:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Contact Information:</strong> Name, email address, phone number, company name, job title</li>
                  <li><strong>Demo Requests:</strong> Business needs, company size, industry sector, preferred meeting times</li>
                  <li><strong>Communication Records:</strong> Messages sent through contact forms, chatbot interactions, email correspondence</li>
                  <li><strong>Professional Information:</strong> Current software usage, operational challenges, business requirements</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mt-6">2.2 Technical Information</h3>
                <p>We automatically collect certain technical information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
                  <li><strong>Usage Data:</strong> Pages viewed, time spent on site, click patterns, referral sources</li>
                  <li><strong>Performance Data:</strong> Page load times, error logs, system performance metrics</li>
                  <li><strong>Security Logs:</strong> Access attempts, security events, threat detection data</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mt-6">2.3 Cookies and Tracking Technologies</h3>
                <p>We use various tracking technologies as detailed in our Cookie Policy:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Essential Cookies:</strong> Required for website functionality and security</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand user behavior and improve our services</li>
                  <li><strong>Marketing Cookies:</strong> Used for lead tracking and campaign effectiveness</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                </ul>
              </div>
            </section>

            <section id="how-we-use" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <div className="space-y-4 text-gray-700">
                <p>We use your personal information for the following purposes, based on the legal bases outlined:</p>
                
                <div className="bg-gray-50 rounded-lg p-4 my-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Legal Basis: Consent</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Marketing communications and newsletters</li>
                    <li>Analytics and website optimization</li>
                    <li>Personalized content and recommendations</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 my-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Legal Basis: Legitimate Interests</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Responding to inquiries and providing customer support</li>
                    <li>Improving our website and services</li>
                    <li>Security monitoring and fraud prevention</li>
                    <li>Lead qualification and business development</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 my-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Legal Basis: Contract Performance</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Providing requested demos and consultations</li>
                    <li>Processing service requests</li>
                    <li>Account management and support</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 my-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Legal Basis: Legal Obligation</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Compliance with applicable laws and regulations</li>
                    <li>Responding to legal requests and court orders</li>
                    <li>Tax and accounting requirements</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="information-sharing" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing</h2>
              <div className="space-y-4 text-gray-700">
                <p>We do not sell, trade, or rent your personal information. We may share your information only in the following circumstances:</p>
                
                <h3 className="text-xl font-semibold text-gray-900">4.1 Service Providers</h3>
                <p>We work with trusted third-party service providers who assist us in operating our website and providing services:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Hosting Services:</strong> Vercel (website hosting and deployment)</li>
                  <li><strong>Analytics:</strong> Vercel Analytics (website performance and usage)</li>
                  <li><strong>Content Management:</strong> Contentful (content delivery and management)</li>
                  <li><strong>Email Services:</strong> SendGrid (transactional emails)</li>
                  <li><strong>Communication:</strong> Approved customer communication platforms</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mt-6">4.2 Legal Requirements</h3>
                <p>We may disclose your information when required by law or to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Comply with legal obligations or court orders</li>
                  <li>Protect our rights, property, or safety</li>
                  <li>Prevent fraud or security threats</li>
                  <li>Assist law enforcement investigations</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mt-6">4.3 Business Transfers</h3>
                <p>In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new entity, subject to this Privacy Policy.</p>
              </div>
            </section>

            <section id="data-retention" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Retention</h2>
              <div className="space-y-4 text-gray-700">
                <p>We retain your personal information for different periods based on the purpose and legal requirements:</p>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Data Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Retention Period</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Reason</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">Demo Requests</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">3 years</td>
                        <td className="px-6 py-4 text-sm text-gray-900 border-b">Business development and follow-up</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">Contact Form Data</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">2 years</td>
                        <td className="px-6 py-4 text-sm text-gray-900 border-b">Customer support and communication</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">Chatbot Interactions</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">1 year</td>
                        <td className="px-6 py-4 text-sm text-gray-900 border-b">Service improvement and support</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">Website Analytics</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">2 years</td>
                        <td className="px-6 py-4 text-sm text-gray-900 border-b">Performance optimization</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">Security Logs</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">1 year</td>
                        <td className="px-6 py-4 text-sm text-gray-900 border-b">Security monitoring and compliance</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <p className="mt-4">
                  After the retention period expires, we securely delete or anonymize your personal information, 
                  unless we are required to retain it longer for legal or regulatory purposes.
                </p>
              </div>
            </section>

            <section id="your-rights" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights (GDPR)</h2>
              <div className="space-y-4 text-gray-700">
                <p>If you are located in the European Union, you have the following rights regarding your personal data:</p>
                
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">🔍 Right to Access</h4>
                    <p className="text-sm text-blue-800">Request a copy of all personal data we hold about you</p>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 mb-2">✏️ Right to Rectification</h4>
                    <p className="text-sm text-green-800">Correct any inaccurate or incomplete personal data</p>
                  </div>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-900 mb-2">🗑️ Right to Erasure</h4>
                    <p className="text-sm text-red-800">Request deletion of your personal data ("right to be forgotten")</p>
                  </div>
                  
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-900 mb-2">📦 Right to Portability</h4>
                    <p className="text-sm text-purple-800">Receive your data in a machine-readable format</p>
                  </div>
                  
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-900 mb-2">🛑 Right to Object</h4>
                    <p className="text-sm text-orange-800">Object to processing based on legitimate interests</p>
                  </div>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">⏸️ Right to Restriction</h4>
                    <p className="text-sm text-gray-800">Limit how we process your personal data</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
                  <h4 className="font-semibold text-blue-900 mb-3">How to Exercise Your Rights</h4>
                  <p className="text-blue-800 mb-3">To exercise any of these rights, you can:</p>
                  <ul className="list-disc pl-6 space-y-1 text-blue-800">
                    <li>Use our <a href="/gdpr-rights" className="underline hover:text-blue-900">Data Rights Portal</a></li>
                    <li>Email us at <a href="mailto:privacy@bidec.com" className="underline hover:text-blue-900">privacy@bidec.com</a></li>
                    <li>Contact our Data Protection Officer</li>
                  </ul>
                  <p className="text-sm text-blue-700 mt-3">
                    We will respond to your request within 30 days and may need to verify your identity for security purposes.
                  </p>
                </div>
              </div>
            </section>

            <section id="security" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Security Measures</h2>
              <div className="space-y-4 text-gray-700">
                <p>We implement comprehensive security measures to protect your personal information:</p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Technical Safeguards</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>End-to-end encryption for data transmission</li>
                      <li>Encrypted storage of sensitive information</li>
                      <li>Regular security updates and patches</li>
                      <li>Multi-factor authentication where applicable</li>
                      <li>Secure API endpoints with rate limiting</li>
                      <li>Content Security Policy (CSP) headers</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Operational Safeguards</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Regular security audits and assessments</li>
                      <li>Employee training on data protection</li>
                      <li>Access controls and role-based permissions</li>
                      <li>Incident response procedures</li>
                      <li>Data breach notification protocols</li>
                      <li>Third-party security certifications</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mt-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-amber-700">
                        <strong>Data Breach Notification:</strong> In the unlikely event of a data breach that 
                        affects your personal information, we will notify you and relevant authorities within 
                        72 hours as required by GDPR.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="cookies" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Cookies and Tracking</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We use cookies and similar tracking technologies to enhance your browsing experience. 
                  For detailed information about our cookie usage, please see our 
                  <a href="/cookie-policy" className="text-blue-600 hover:text-blue-800 underline"> Cookie Policy</a>.
                </p>
                
                <p>You can control cookies through:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Our cookie consent banner (for EU users)</li>
                  <li>Your browser settings</li>
                  <li>Third-party opt-out tools</li>
                  <li>Our cookie preferences center</li>
                </ul>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Cookie Categories</h4>
                  <div className="text-sm space-y-2">
                    <div><strong>Essential:</strong> Required for basic website functionality</div>
                    <div><strong>Analytics:</strong> Help us understand user behavior and improve our site</div>
                    <div><strong>Marketing:</strong> Used for advertising and campaign tracking</div>
                    <div><strong>Preferences:</strong> Remember your settings and choices</div>
                  </div>
                </div>
              </div>
            </section>

            <section id="international-transfers" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. International Data Transfers</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Your personal information may be transferred to and processed in countries other than your own. 
                  We ensure adequate protection for international transfers through:
                </p>
                
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Standard Contractual Clauses:</strong> EU-approved data transfer agreements</li>
                  <li><strong>Adequacy Decisions:</strong> Transfers to countries with adequate data protection</li>
                  <li><strong>Service Provider Agreements:</strong> Contractual safeguards with all processors</li>
                  <li><strong>Data Localization:</strong> EU data stored within the EU where possible</li>
                </ul>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Our Service Providers</h4>
                  <div className="text-sm text-blue-800 space-y-1">
                    <div><strong>Vercel (US):</strong> Website hosting - Privacy Shield certified</div>
                    <div><strong>Contentful (EU/US):</strong> Content management - GDPR compliant</div>
                    <div><strong>SendGrid (US):</strong> Email services - GDPR compliant</div>
                  </div>
                </div>
              </div>
            </section>

            <section id="changes" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to This Policy</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our practices, 
                  technology, legal requirements, or other factors. We will notify you of any material changes by:
                </p>
                
                <ul className="list-disc pl-6 space-y-2">
                  <li>Posting the updated policy on our website</li>
                  <li>Updating the "Last updated" date</li>
                  <li>Sending email notifications for significant changes</li>
                  <li>Displaying prominent notices on our website</li>
                </ul>
                
                <p>
                  Your continued use of our website after any changes indicates your acceptance of the 
                  updated Privacy Policy.
                </p>
              </div>
            </section>

            <section id="contact" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Information</h2>
              <div className="space-y-4 text-gray-700">
                <p>If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us:</p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">General Privacy Inquiries</h4>
                    <div className="space-y-2 text-sm">
                      <div><strong>Email:</strong> <a href="mailto:privacy@bidec.com" className="text-blue-600 hover:underline">privacy@bidec.com</a></div>
                      <div><strong>Mail:</strong> BIDEC Privacy Office</div>
                      <div><strong>Response Time:</strong> Within 30 days</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Data Protection Officer</h4>
                    <div className="space-y-2 text-sm">
                      <div><strong>Email:</strong> <a href="mailto:dpo@bidec.com" className="text-blue-600 hover:underline">dpo@bidec.com</a></div>
                      <div><strong>Role:</strong> EU GDPR Representative</div>
                      <div><strong>Languages:</strong> English, French</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">
                        <strong>Complaints:</strong> You have the right to lodge a complaint with your local 
                        data protection authority if you believe we have not handled your personal data properly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}