'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calculator, TrendingUp, DollarSign, Clock, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatPercentage } from '@/lib/utils';

interface ROIInputs {
  annualRevenue: number;
  employees: number;
  currentEfficiency: number;
  operationalCosts: number;
}

interface ROIResults {
  costSavings: number;
  efficiencyGains: number;
  paybackPeriod: number;
  roi: number;
  annualBenefit: number;
}

const defaultInputs: ROIInputs = {
  annualRevenue: 50000000, // $50M
  employees: 100,
  currentEfficiency: 70, // 70%
  operationalCosts: 10000000, // $10M
};

export function ROICalculatorSection() {
  const [inputs, setInputs] = useState<ROIInputs>(defaultInputs);
  const [results, setResults] = useState<ROIResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const calculateROI = () => {
    setIsCalculating(true);
    
    // Simulate calculation delay for better UX
    setTimeout(() => {
      // ROI calculation logic based on industry benchmarks
      const efficiencyImprovement = 0.25; // 25% efficiency improvement
      const costReductionRate = 0.15; // 15% cost reduction
      const implementationCost = 500000; // $500K implementation cost
      
      const costSavings = inputs.operationalCosts * costReductionRate;
      const efficiencyGains = inputs.annualRevenue * (efficiencyImprovement * (inputs.currentEfficiency / 100));
      const annualBenefit = costSavings + efficiencyGains;
      const paybackPeriod = implementationCost / (annualBenefit / 12); // in months
      const roi = ((annualBenefit - implementationCost) / implementationCost) * 100;

      setResults({
        costSavings,
        efficiencyGains,
        paybackPeriod,
        roi,
        annualBenefit,
      });
      
      setIsCalculating(false);
    }, 1500);
  };

  useEffect(() => {
    if (inView) {
      // Auto-calculate with default values
      calculateROI();
    }
  }, [inView]);

  const handleInputChange = (field: keyof ROIInputs, value: number) => {
    setInputs(prev => ({
      ...prev,
      [field]: value,
    }));
    setResults(null); // Clear results when inputs change
  };

  return (
    <section className="section-padding bg-gradient-to-br from-neutral-50 to-primary-50" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium mb-6">
            <Calculator className="h-4 w-4 mr-2" />
            ROI Calculator
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold text-neutral-900 mb-6">
            Calculate Your{' '}
            <span className="text-gradient">Return on Investment</span>
          </h2>
          
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            See how OilFlow BIDEC ERP can transform your petroleum operations 
            and deliver measurable results for your organization.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-xl border border-neutral-200"
          >
            <h3 className="text-2xl font-display font-semibold text-neutral-900 mb-6">
              Your Company Details
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Annual Revenue
                </label>
                <input
                  type="number"
                  value={inputs.annualRevenue}
                  onChange={(e) => handleInputChange('annualRevenue', Number(e.target.value))}
                  className="input"
                  placeholder="50000000"
                />
                <p className="text-xs text-neutral-500 mt-1">
                  Current: {formatCurrency(inputs.annualRevenue)}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Number of Employees
                </label>
                <input
                  type="number"
                  value={inputs.employees}
                  onChange={(e) => handleInputChange('employees', Number(e.target.value))}
                  className="input"
                  placeholder="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Current Operational Efficiency (%)
                </label>
                <input
                  type="range"
                  min="30"
                  max="95"
                  value={inputs.currentEfficiency}
                  onChange={(e) => handleInputChange('currentEfficiency', Number(e.target.value))}
                  className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-neutral-500 mt-1">
                  <span>30%</span>
                  <span className="font-medium">{inputs.currentEfficiency}%</span>
                  <span>95%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Annual Operational Costs
                </label>
                <input
                  type="number"
                  value={inputs.operationalCosts}
                  onChange={(e) => handleInputChange('operationalCosts', Number(e.target.value))}
                  className="input"
                  placeholder="10000000"
                />
                <p className="text-xs text-neutral-500 mt-1">
                  Current: {formatCurrency(inputs.operationalCosts)}
                </p>
              </div>

              <Button
                onClick={calculateROI}
                disabled={isCalculating}
                className="w-full"
                size="lg"
              >
                {isCalculating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Calculator className="h-5 w-5 mr-2" />
                    Calculate ROI
                  </>
                )}
              </Button>
            </div>
          </motion.div>

          {/* Results Display */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {results ? (
              <>
                <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl p-8 text-white shadow-2xl">
                  <div className="flex items-center mb-4">
                    <TrendingUp className="h-6 w-6 mr-2" />
                    <h3 className="text-2xl font-display font-semibold">
                      Projected Results
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-3xl font-bold">
                        {formatCurrency(results.annualBenefit)}
                      </div>
                      <div className="text-primary-100">Annual Benefit</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">
                        {formatPercentage(results.roi)}
                      </div>
                      <div className="text-primary-100">ROI</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200">
                    <div className="flex items-center mb-3">
                      <DollarSign className="h-5 w-5 text-green-500 mr-2" />
                      <h4 className="font-semibold text-neutral-900">Cost Savings</h4>
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      {formatCurrency(results.costSavings)}
                    </div>
                    <div className="text-sm text-neutral-500">per year</div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200">
                    <div className="flex items-center mb-3">
                      <Zap className="h-5 w-5 text-blue-500 mr-2" />
                      <h4 className="font-semibold text-neutral-900">Efficiency Gains</h4>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      {formatCurrency(results.efficiencyGains)}
                    </div>
                    <div className="text-sm text-neutral-500">per year</div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200">
                    <div className="flex items-center mb-3">
                      <Clock className="h-5 w-5 text-orange-500 mr-2" />
                      <h4 className="font-semibold text-neutral-900">Payback Period</h4>
                    </div>
                    <div className="text-2xl font-bold text-orange-600">
                      {results.paybackPeriod.toFixed(1)} months
                    </div>
                    <div className="text-sm text-neutral-500">to break even</div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200">
                    <div className="flex items-center mb-3">
                      <Users className="h-5 w-5 text-purple-500 mr-2" />
                      <h4 className="font-semibold text-neutral-900">Per Employee</h4>
                    </div>
                    <div className="text-2xl font-bold text-purple-600">
                      {formatCurrency(results.annualBenefit / inputs.employees)}
                    </div>
                    <div className="text-sm text-neutral-500">annual benefit</div>
                  </div>
                </div>

                <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
                  <h4 className="font-semibold text-neutral-900 mb-3">Key Assumptions</h4>
                  <ul className="text-sm text-neutral-600 space-y-1">
                    <li>• 25% operational efficiency improvement</li>
                    <li>• 15% reduction in operational costs</li>
                    <li>• Industry-standard implementation timeline</li>
                    <li>• Based on petroleum industry benchmarks</li>
                  </ul>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-neutral-200 text-center">
                <Calculator className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  Ready to Calculate?
                </h3>
                <p className="text-neutral-600">
                  Enter your company details and see your potential ROI with OilFlow BIDEC ERP.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}