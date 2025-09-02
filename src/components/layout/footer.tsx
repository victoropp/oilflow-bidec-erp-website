import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Twitter } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Logo } from '@/components/ui/logo';

const footerLinks = {
  solutions: [
    { name: 'Batch Management', href: '/solutions/batch-management' },
    { name: 'Vessel Operations', href: '/solutions/vessel-operations' },
    { name: 'Price-Out System', href: '/solutions/price-out' },
    { name: 'Ghana Banking', href: '/solutions/ghana-banking' },
  ],
  industries: [
    { name: 'Petroleum Trading', href: '/industries/petroleum-trading' },
    { name: 'Depot Operations', href: '/industries/depot-operations' },
    { name: 'Financial Services', href: '/industries/financial-services' },
    { name: 'Banking Integration', href: '/industries/banking-integration' },
  ],
  resources: [
    { name: 'Documentation', href: '/resources/docs' },
    { name: 'Case Studies', href: '/resources/case-studies' },
    { name: 'White Papers', href: '/resources/whitepapers' },
    { name: 'Blog', href: '/blog' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Partners', href: '/partners' },
    { name: 'News', href: '/news' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Security', href: '/security' },
    { name: 'Compliance', href: '/compliance' },
  ],
};

const socialLinks = [
  {
    name: 'LinkedIn',
    href: siteConfig.links.linkedin,
    icon: Linkedin,
  },
  {
    name: 'Twitter',
    href: siteConfig.links.twitter,
    icon: Twitter,
  },
];

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 py-16">
          {/* Company info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Logo className="h-8 w-8 text-white" />
              <span className="text-xl font-display font-bold">
                OilFlow BIDEC
              </span>
            </Link>
            <p className="text-neutral-400 mb-6 leading-relaxed">
              Specialized ERP solution for petroleum trading in Ghana. Complete 
              batch management, vessel operations, and banking integration with 
              dual currency support (GHS/USD).
            </p>
            
            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-neutral-400">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.email}
                </a>
              </div>
              <div className="flex items-center space-x-3 text-sm text-neutral-400">
                <Phone className="h-4 w-4" />
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </div>
              <div className="flex items-start space-x-3 text-sm text-neutral-400">
                <MapPin className="h-4 w-4 mt-0.5" />
                <div>
                  <div>{siteConfig.contact.address.street}</div>
                  <div>
                    {siteConfig.contact.address.city}, {siteConfig.contact.address.state} {siteConfig.contact.address.zip}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-display font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="font-display font-semibold mb-4">Industries</h3>
            <ul className="space-y-2">
              {footerLinks.industries.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-display font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors duration-200"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-neutral-800 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-sm text-neutral-400">
              © {new Date().getFullYear()} {siteConfig.company.name}. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-neutral-400 hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}