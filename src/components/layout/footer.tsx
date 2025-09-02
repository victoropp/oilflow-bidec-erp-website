import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Twitter } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Logo } from '@/components/ui/logo';
import { SecretFooterLink } from '@/components/admin/admin-access-trigger';

const footerLinks = {
  solutions: [
    { name: 'AI-Powered Insights', href: '/solutions/ai-insights' },
    { name: 'Command Palette', href: '/solutions/command-palette' },
    { name: 'Ghana Banking', href: '/solutions/ghana-banking' },
    { name: 'IFRS Compliance', href: '/solutions/ifrs-compliance' },
  ],
  petroleumTrading: [
    { name: 'Batch Management', href: '/petroleum-trading/batch-management' },
    { name: 'Price-Out System', href: '/solutions/price-out' },
    { name: 'Vessel Operations', href: '/petroleum-trading/vessel-operations' },
    { name: 'Daily Delivery', href: '/petroleum-trading/daily-delivery' },
  ],
  resources: [
    { name: 'Implementation Services', href: '/resources#implementation' },
    { name: 'Training Programs', href: '/resources#training' },
    { name: 'Support & Maintenance', href: '/resources#support' },
    { name: 'Contact Us', href: '/contact' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
    { name: 'Request Demo', href: '/request-demo' },
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
                <div className="flex flex-col">
                  <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-white transition-colors">
                    UK: {siteConfig.contact.phone}
                  </a>
                  <a href={`tel:${siteConfig.contact.phoneGhana}`} className="hover:text-white transition-colors">
                    Ghana: {siteConfig.contact.phoneGhana}
                  </a>
                </div>
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

          {/* Petroleum Trading */}
          <div>
            <h3 className="font-display font-semibold mb-4">Petroleum Trading</h3>
            <ul className="space-y-2">
              {footerLinks.petroleumTrading.map((link) => (
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
            <div className="text-sm text-neutral-400 flex items-center gap-2">
              © {new Date().getFullYear()} {siteConfig.company.name}. All rights reserved.
              <SecretFooterLink />
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