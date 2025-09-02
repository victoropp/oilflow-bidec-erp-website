import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Command, Search, Keyboard, Zap, Clock, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Command Palette Navigation | OilFlow BIDEC',
  description: 'Revolutionary command-driven interface for petroleum ERP. Lightning-fast navigation, smart search, and keyboard shortcuts for maximum productivity.',
  keywords: 'command palette ERP, keyboard navigation, smart search petroleum, productivity tools Ghana',
};

const commandFeatures = [
  {
    icon: Command,
    title: 'Universal Command Access',
    description: 'Access any function, report, or module instantly with a simple keyboard shortcut - no more clicking through menus.',
  },
  {
    icon: Search,
    title: 'Intelligent Search',
    description: 'Smart search that understands context - find customers, batches, transactions, or reports with natural language queries.',
  },
  {
    icon: Keyboard,
    title: 'Keyboard-First Design',
    description: 'Complete operations without touching the mouse. Every action optimized for keyboard efficiency.',
  },
  {
    icon: Zap,
    title: 'Quick Actions',
    description: 'Execute common tasks instantly - create invoices, check balances, generate reports with simple commands.',
  },
  {
    icon: Clock,
    title: 'Recent & Favorites',
    description: 'Access your most-used features and recent items instantly with intelligent suggestions.',
  },
  {
    icon: Target,
    title: 'Context-Aware Suggestions',
    description: 'Smart recommendations based on your current task, role, and historical usage patterns.',
  }
];

const commonCommands = [
  { command: 'Ctrl+K', action: 'Open Command Palette', category: 'Navigation' },
  { command: 'nb', action: 'New Batch', category: 'Operations' },
  { command: 'invoice', action: 'Create Invoice', category: 'Finance' },
  { command: 'report sales', action: 'Generate Sales Report', category: 'Reports' },
  { command: 'find customer', action: 'Search Customers', category: 'Search' },
  { command: 'tank levels', action: 'View Tank Status', category: 'Monitoring' },
  { command: 'reconcile', action: 'Bank Reconciliation', category: 'Finance' },
  { command: 'price update', action: 'Update Product Prices', category: 'Trading' }
];

const productivityGains = [
  {
    metric: 'Task Completion',
    improvement: 'Faster Operations',
    description: 'Complete routine tasks in seconds instead of minutes'
  },
  {
    metric: 'Learning Curve',
    improvement: 'Reduced Training',
    description: 'Intuitive commands mean less training time for new users'
  },
  {
    metric: 'User Satisfaction',
    improvement: 'Enhanced Experience',
    description: 'Modern interface that users love to work with'
  },
  {
    metric: 'Error Reduction',
    improvement: 'Fewer Mistakes',
    description: 'Direct navigation reduces wrong clicks and errors'
  }
];

export default function CommandPalettePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              <Command className="h-4 w-4 mr-2" />
              Modern Productivity Interface
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
              Command Palette
              <span className="text-primary-600"> Navigation</span>
            </h1>
            
            <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Work at the speed of thought with our revolutionary command-driven interface. 
              Access any feature, execute any task, find any data - all from your keyboard.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-demo">
                <Button size="lg" className="w-full sm:w-auto">
                  Experience Speed Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Work Faster Than Ever Before
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Inspired by modern development tools, our command palette brings unprecedented speed to petroleum ERP operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {commandFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200 hover:shadow-xl transition-all">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Command Examples */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
              Common Commands
            </h2>
            <p className="text-lg text-neutral-300 max-w-3xl mx-auto">
              See how simple commands replace complex navigation paths.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-neutral-800 rounded-xl p-8 border border-neutral-700">
              <div className="space-y-4">
                {commonCommands.map((cmd) => (
                  <div key={cmd.command} className="flex items-center justify-between p-3 bg-neutral-900 rounded-lg">
                    <div className="flex items-center gap-4">
                      <code className="px-3 py-1 bg-blue-600 text-white rounded font-mono text-sm">
                        {cmd.command}
                      </code>
                      <span className="text-neutral-300">{cmd.action}</span>
                    </div>
                    <span className="text-xs text-neutral-500 uppercase tracking-wider">
                      {cmd.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Productivity Gains */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
              Measurable Productivity Gains
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Transform how your team works with quantifiable improvements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {productivityGains.map((gain) => (
              <div key={gain.metric} className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-1">{gain.metric}</h3>
                <p className="text-2xl font-bold text-blue-600 mb-2">{gain.improvement}</p>
                <p className="text-sm text-neutral-600">{gain.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-blue-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-6">
              See The Speed Difference
            </h2>
            <p className="text-lg text-neutral-600 mb-8">
              Watch how tasks that traditionally take multiple clicks and page loads can be 
              completed in seconds with our command palette.
            </p>
            
            <div className="bg-white rounded-xl p-8 shadow-lg border border-neutral-200">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-4">Traditional Navigation</h3>
                  <ol className="text-left text-sm text-neutral-600 space-y-2">
                    <li>1. Click Sales Menu</li>
                    <li>2. Navigate to Invoices</li>
                    <li>3. Click New Invoice</li>
                    <li>4. Fill form</li>
                    <li>5. Submit</li>
                  </ol>
                  <p className="mt-4 text-red-600 font-medium">Time: 45+ seconds</p>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-4">Command Palette</h3>
                  <ol className="text-left text-sm text-neutral-600 space-y-2">
                    <li>1. Press Ctrl+K</li>
                    <li>2. Type "invoice"</li>
                    <li>3. Press Enter</li>
                    <li className="text-neutral-400">4. -</li>
                    <li className="text-neutral-400">5. -</li>
                  </ol>
                  <p className="mt-4 text-green-600 font-medium">Time: 3 seconds</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-primary-600">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
              Ready to Work at Light Speed?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Experience the future of ERP navigation with our command palette interface - 
              the fastest way to manage petroleum operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-demo">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Try Command Palette
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-blue-700">
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