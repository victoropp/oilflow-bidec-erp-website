'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';

const navigation = [
  {
    name: 'Solutions',
    href: '/solutions',
    submenu: [
      { name: 'Batch Management', href: '/solutions/batch-management' },
      { name: 'Vessel Operations', href: '/solutions/vessel-operations' },
      { name: 'Daily Delivery', href: '/solutions/daily-delivery' },
      { name: 'Price-Out System', href: '/solutions/price-out' },
      { name: 'Ghana Banking', href: '/solutions/ghana-banking' },
      { name: 'IFRS Compliance', href: '/solutions/ifrs-compliance' },
    ],
  },
  {
    name: 'Petroleum Trading',
    href: '/petroleum-trading',
    submenu: [
      { name: 'Batch Management', href: '/petroleum-trading/batch-management' },
      { name: 'Depot Operations', href: '/petroleum-trading/depot-operations' },
      { name: 'Vessel Operations', href: '/petroleum-trading/vessel-operations' },
      { name: 'Daily Delivery', href: '/petroleum-trading/daily-delivery' },
    ],
  },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Resources', href: '/resources' },
  { name: 'About', href: '/about' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
    setActiveSubmenu(null);
  };

  const handleSubmenuToggle = (name: string) => {
    setActiveSubmenu(activeSubmenu === name ? null : name);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Logo className="h-8 w-8" />
            <span className="text-xl font-display font-bold text-neutral-900">
              OilFlow BIDEC
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="flex items-center space-x-1 text-neutral-600 hover:text-primary-500 transition-colors duration-200"
                  onMouseEnter={() => setActiveSubmenu(item.submenu ? item.name : null)}
                >
                  <span>{item.name}</span>
                  {item.submenu && (
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                  )}
                </Link>

                {/* Desktop Submenu */}
                {item.submenu && (
                  <AnimatePresence>
                    {activeSubmenu === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-neutral-200 py-2"
                        onMouseLeave={() => setActiveSubmenu(null)}
                      >
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-neutral-600 hover:text-primary-500 hover:bg-neutral-50 transition-colors duration-200"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/contact">
              <Button variant="outline" size="sm">
                Contact Sales
              </Button>
            </Link>
            <Link href="/request-demo">
              <Button size="sm">
                Request Demo
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden bg-white border-t border-neutral-200"
            >
              <nav className="py-4 space-y-2">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        className="block px-4 py-2 text-neutral-600 hover:text-primary-500 transition-colors duration-200"
                        onClick={() => !item.submenu && setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                      {item.submenu && (
                        <button
                          onClick={() => handleSubmenuToggle(item.name)}
                          className="p-2 text-neutral-600"
                          aria-label={`Toggle ${item.name} submenu`}
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${
                              activeSubmenu === item.name ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Mobile Submenu */}
                    <AnimatePresence>
                      {item.submenu && activeSubmenu === item.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden bg-neutral-50 border-l-2 border-primary-200 ml-4"
                        >
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-2 text-sm text-neutral-600 hover:text-primary-500 transition-colors duration-200"
                              onClick={() => setIsOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {/* Mobile CTA Buttons */}
                <div className="pt-4 px-4 space-y-2 border-t border-neutral-200">
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Contact Sales
                    </Button>
                  </Link>
                  <Link href="/request-demo" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">
                      Request Demo
                    </Button>
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}