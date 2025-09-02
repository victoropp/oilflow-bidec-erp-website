'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, Clock, Users, Building, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

const demoBookingSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  company: z.string().min(2, 'Company name is required'),
  jobTitle: z.string().min(2, 'Job title is required'),
  companySize: z.enum(['1-50', '51-200', '201-1000', '1000+']),
  industry: z.enum([
    'petroleum-trading',
    'depot-operations',
    'vessel-management',
    'banking-integration',
    'financial-services',
    'other'
  ]),
  currentSoftware: z.string().optional(),
  challenges: z.string().min(10, 'Please describe your main challenges'),
  preferredDate: z.string(),
  preferredTime: z.enum(['morning', 'afternoon', 'flexible']),
  additionalNotes: z.string().optional(),
  consent: z.boolean().refine(val => val === true, 'Please consent to data processing'),
});

type DemoBookingFormData = z.infer<typeof demoBookingSchema>;

const companySizeOptions = [
  { value: '1-50', label: '1-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201-1000', label: '201-1,000 employees' },
  { value: '1000+', label: '1,000+ employees' },
];

const industryOptions = [
  { value: 'petroleum-trading', label: 'Petroleum Trading' },
  { value: 'depot-operations', label: 'Depot Operations' },
  { value: 'vessel-management', label: 'Vessel Management' },
  { value: 'banking-integration', label: 'Banking & Finance' },
  { value: 'financial-services', label: 'Financial Services' },
  { value: 'other', label: 'Other' },
];

const timeOptions = [
  { value: 'morning', label: 'Morning (9 AM - 12 PM)' },
  { value: 'afternoon', label: 'Afternoon (1 PM - 5 PM)' },
  { value: 'flexible', label: 'Flexible' },
];

export function DemoBookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DemoBookingFormData>({
    resolver: zodResolver(demoBookingSchema),
  });

  const onSubmit = async (data: DemoBookingFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the data to your backend
      console.log('Demo booking data:', data);
      
      setIsSuccess(true);
      toast.success('Demo request submitted successfully!');
      reset();
    } catch (error) {
      toast.error('Failed to submit demo request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl p-8 shadow-xl border border-neutral-200 text-center"
      >
        <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-8 w-8 text-accent-500" />
        </div>
        
        <h3 className="text-2xl font-display font-semibold text-neutral-900 mb-4">
          Demo Request Received!
        </h3>
        
        <p className="text-neutral-600 mb-6 leading-relaxed">
          Thank you for your interest in OilFlow BIDEC ERP. Our sales team will 
          contact you within 24 hours to schedule your personalized demo.
        </p>
        
        <div className="space-y-3 text-sm text-neutral-500">
          <div className="flex items-center justify-center">
            <Mail className="h-4 w-4 mr-2" />
            Check your email for confirmation details
          </div>
          <div className="flex items-center justify-center">
            <Calendar className="h-4 w-4 mr-2" />
            Demo typically scheduled within 48 hours
          </div>
        </div>

        <Button
          onClick={() => setIsSuccess(false)}
          variant="outline"
          className="mt-6"
        >
          Request Another Demo
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-2xl p-8 shadow-xl border border-neutral-200"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
          Schedule Your Demo
        </h2>
        <p className="text-neutral-600 leading-relaxed">
          Get a personalized demonstration of OilFlow BIDEC ERP tailored to your 
          specific petroleum operations and business needs.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              First Name *
            </label>
            <input
              {...register('firstName')}
              type="text"
              className="input"
              placeholder="John"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Last Name *
            </label>
            <input
              {...register('lastName')}
              type="text"
              className="input"
              placeholder="Smith"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Email Address *
            </label>
            <input
              {...register('email')}
              type="email"
              className="input"
              placeholder="john.smith@company.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Phone Number *
            </label>
            <input
              {...register('phone')}
              type="tel"
              className="input"
              placeholder="+1 (555) 123-4567"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Company Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Company Name *
            </label>
            <input
              {...register('company')}
              type="text"
              className="input"
              placeholder="Acme Petroleum Corp"
            />
            {errors.company && (
              <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Job Title *
            </label>
            <input
              {...register('jobTitle')}
              type="text"
              className="input"
              placeholder="Operations Manager"
            />
            {errors.jobTitle && (
              <p className="text-red-500 text-sm mt-1">{errors.jobTitle.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Company Size *
            </label>
            <select {...register('companySize')} className="input">
              <option value="">Select company size</option>
              {companySizeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.companySize && (
              <p className="text-red-500 text-sm mt-1">{errors.companySize.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Industry Sector *
            </label>
            <select {...register('industry')} className="input">
              <option value="">Select industry sector</option>
              {industryOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.industry && (
              <p className="text-red-500 text-sm mt-1">{errors.industry.message}</p>
            )}
          </div>
        </div>

        {/* Current Software */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Current ERP/Software Solution
          </label>
          <input
            {...register('currentSoftware')}
            type="text"
            className="input"
            placeholder="SAP, Oracle, Custom solution, etc."
          />
        </div>

        {/* Challenges */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Main Business Challenges *
          </label>
          <textarea
            {...register('challenges')}
            rows={4}
            className="input resize-none"
            placeholder="Describe your current operational challenges, pain points, or areas where you'd like to improve efficiency..."
          />
          {errors.challenges && (
            <p className="text-red-500 text-sm mt-1">{errors.challenges.message}</p>
          )}
        </div>

        {/* Scheduling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Preferred Date *
            </label>
            <input
              {...register('preferredDate')}
              type="date"
              className="input"
              min={new Date().toISOString().split('T')[0]}
            />
            {errors.preferredDate && (
              <p className="text-red-500 text-sm mt-1">{errors.preferredDate.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Preferred Time *
            </label>
            <select {...register('preferredTime')} className="input">
              <option value="">Select preferred time</option>
              {timeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.preferredTime && (
              <p className="text-red-500 text-sm mt-1">{errors.preferredTime.message}</p>
            )}
          </div>
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Additional Notes
          </label>
          <textarea
            {...register('additionalNotes')}
            rows={3}
            className="input resize-none"
            placeholder="Any specific features or use cases you'd like to focus on during the demo..."
          />
        </div>

        {/* Consent */}
        <div className="flex items-start space-x-3">
          <input
            {...register('consent')}
            type="checkbox"
            className="mt-1 h-4 w-4 text-primary-500 border-neutral-300 rounded focus:ring-primary-500"
          />
          <label className="text-sm text-neutral-600 leading-relaxed">
            I consent to BIDEC processing my personal data to provide me with information 
            about OilFlow BIDEC ERP and to schedule a demo. I understand I can withdraw 
            consent at any time. *
          </label>
        </div>
        {errors.consent && (
          <p className="text-red-500 text-sm">{errors.consent.message}</p>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
          size="lg"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
              Scheduling Demo...
            </>
          ) : (
            <>
              <Calendar className="h-5 w-5 mr-2" />
              Schedule Demo
            </>
          )}
        </Button>

        {/* Security Notice */}
        <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-accent-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-neutral-600">
              <strong>Your privacy is protected.</strong> We use enterprise-grade 
              security and never share your information with third parties. 
              All demo sessions are confidential and tailored to your needs.
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  );
}