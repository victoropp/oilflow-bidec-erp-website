'use client';

import React, { useState, useEffect } from 'react';
import { gdprCompliance, type DataAccessRequest, type DataErasureRequest, type DataPortabilityRequest } from '@/lib/compliance/gdpr';

interface GDPRDataRightsProps {
  userId?: string;
  onClose?: () => void;
}

interface UserRightsStatus {
  hasData: boolean;
  consentStatus: {
    hasValidConsent: boolean;
    consentedPurposes: string[];
    expires: string | null;
  };
  pendingRequests: {
    access: DataAccessRequest[];
    erasure: DataErasureRequest[];
    portability: DataPortabilityRequest[];
  };
}

const GDPRDataRights: React.FC<GDPRDataRightsProps> = ({ userId, onClose }) => {
  const [userRights, setUserRights] = useState<UserRightsStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'access' | 'erasure' | 'portability' | 'consent'>('overview');
  const [email, setEmail] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);

  useEffect(() => {
    if (userId) {
      loadUserRights();
    }
  }, [userId]);

  const loadUserRights = async () => {
    if (!userId) return;
    
    setLoading(true);
    try {
      // In a real implementation, this would call an API endpoint
      const consentStatus = await gdprCompliance.getConsentStatus(userId);
      
      setUserRights({
        hasData: true,
        consentStatus,
        pendingRequests: {
          access: [],
          erasure: [],
          portability: []
        }
      });
    } catch (error) {
      console.error('Failed to load user rights:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDataAccess = async () => {
    if (!userId) return;
    
    setLoading(true);
    try {
      const requestId = await gdprCompliance.requestDataAccess(userId);
      alert(`Data access request submitted successfully. Request ID: ${requestId}`);
      await loadUserRights();
    } catch (error) {
      console.error('Failed to request data access:', error);
      alert('Failed to submit data access request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDataErasure = async (reason: 'withdrawal' | 'no_longer_necessary' | 'unlawful_processing' | 'legal_obligation') => {
    if (!userId) return;
    
    const confirmed = window.confirm(
      'Are you sure you want to request deletion of your data? This action cannot be undone and will permanently remove all your information from our systems.'
    );
    
    if (!confirmed) return;
    
    setLoading(true);
    try {
      const requestId = await gdprCompliance.requestDataErasure(userId, reason);
      alert(`Data erasure request submitted successfully. Request ID: ${requestId}. We will process your request within 30 days.`);
      await loadUserRights();
    } catch (error) {
      console.error('Failed to request data erasure:', error);
      alert('Failed to submit data erasure request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDataPortability = async (format: 'json' | 'csv' | 'xml') => {
    if (!userId) return;
    
    setLoading(true);
    try {
      const requestId = await gdprCompliance.requestDataPortability(userId, format);
      alert(`Data portability request submitted successfully. Request ID: ${requestId}. You will receive a download link via email within 72 hours.`);
      await loadUserRights();
    } catch (error) {
      console.error('Failed to request data portability:', error);
      alert('Failed to submit data portability request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawConsent = async () => {
    if (!userId || !userRights?.consentStatus.hasValidConsent) return;
    
    const confirmed = window.confirm(
      'Are you sure you want to withdraw your consent? This may affect the services we can provide to you.'
    );
    
    if (!confirmed) return;
    
    setLoading(true);
    try {
      // In a real implementation, you would withdraw specific consents
      alert('Consent withdrawal request submitted. Your preferences have been updated.');
      await loadUserRights();
    } catch (error) {
      console.error('Failed to withdraw consent:', error);
      alert('Failed to withdraw consent. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const sendVerificationEmail = async () => {
    if (!email) {
      alert('Please enter your email address.');
      return;
    }
    
    setLoading(true);
    try {
      // In a real implementation, this would send a verification email
      setVerificationSent(true);
      alert('Verification email sent. Please check your inbox and follow the link to access your data rights.');
    } catch (error) {
      console.error('Failed to send verification email:', error);
      alert('Failed to send verification email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // If no user ID, show email verification form
  if (!userId && !verificationSent) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Access Your Data Rights
          </h2>
          <p className="text-gray-600">
            Under GDPR, you have the right to access, modify, or delete your personal data.
          </p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email address"
              required
            />
          </div>
          
          <button
            onClick={sendVerificationEmail}
            disabled={loading || !email}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            {loading ? 'Sending...' : 'Send Verification Email'}
          </button>
          
          <p className="text-xs text-gray-500 text-center">
            We'll send you a secure link to access and manage your data rights.
          </p>
        </div>
        
        {onClose && (
          <button
            onClick={onClose}
            className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors"
          >
            Close
          </button>
        )}
      </div>
    );
  }

  if (verificationSent && !userId) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="mb-4">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Verification Email Sent
        </h2>
        <p className="text-gray-600 mb-4">
          We've sent a secure verification link to <strong>{email}</strong>. 
          Please check your inbox and follow the instructions.
        </p>
        
        <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-md mb-4">
          <p className="mb-2">Didn't receive the email? Check your spam folder or:</p>
          <button
            onClick={() => setVerificationSent(false)}
            className="text-blue-600 hover:underline"
          >
            Try a different email address
          </button>
        </div>
        
        {onClose && (
          <button
            onClick={onClose}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors"
          >
            Close
          </button>
        )}
      </div>
    );
  }

  if (loading && !userRights) {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your data rights...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="border-b p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Your Data Rights</h2>
            <p className="text-gray-600 mt-2">
              Manage your personal data and privacy settings under GDPR
            </p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
          {[
            { key: 'overview', label: 'Overview' },
            { key: 'access', label: 'Data Access' },
            { key: 'erasure', label: 'Data Deletion' },
            { key: 'portability', label: 'Data Export' },
            { key: 'consent', label: 'Consent Management' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h3 className="font-medium text-blue-900 mb-2">Your Rights Under GDPR</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Right to access your personal data</li>
                <li>• Right to rectify (correct) your data</li>
                <li>• Right to erasure ("right to be forgotten")</li>
                <li>• Right to data portability</li>
                <li>• Right to object to processing</li>
                <li>• Right to restrict processing</li>
                <li>• Right to withdraw consent</li>
              </ul>
            </div>
            
            {userRights && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Consent Status</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Valid Consent:</span>
                      <span className={userRights.consentStatus.hasValidConsent ? 'text-green-600' : 'text-red-600'}>
                        {userRights.consentStatus.hasValidConsent ? 'Yes' : 'No'}
                      </span>
                    </div>
                    {userRights.consentStatus.expires && (
                      <div className="flex justify-between">
                        <span>Expires:</span>
                        <span>{new Date(userRights.consentStatus.expires).toLocaleDateString()}</span>
                      </div>
                    )}
                    <div className="mt-3">
                      <span className="font-medium">Consented Purposes:</span>
                      <ul className="mt-1 space-y-1">
                        {userRights.consentStatus.consentedPurposes.map((purpose) => (
                          <li key={purpose} className="text-green-600">• {purpose}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Quick Actions</h4>
                  <div className="space-y-2">
                    <button
                      onClick={handleDataAccess}
                      disabled={loading}
                      className="w-full text-left px-3 py-2 bg-white hover:bg-gray-50 border rounded text-sm"
                    >
                      📄 Request Data Copy
                    </button>
                    <button
                      onClick={() => handleDataPortability('json')}
                      disabled={loading}
                      className="w-full text-left px-3 py-2 bg-white hover:bg-gray-50 border rounded text-sm"
                    >
                      📦 Export Data
                    </button>
                    <button
                      onClick={() => setActiveTab('consent')}
                      className="w-full text-left px-3 py-2 bg-white hover:bg-gray-50 border rounded text-sm"
                    >
                      ⚙️ Manage Consent
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'access' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Request Access to Your Data</h3>
              <p className="text-gray-600 mb-4">
                You have the right to obtain a copy of all personal data we hold about you. 
                We will provide this information within 30 days of your request.
              </p>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <h4 className="font-medium text-yellow-800 mb-2">What data will be included:</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Personal information (name, email, phone, company)</li>
                <li>• Consent records and preferences</li>
                <li>• Communication history</li>
                <li>• Demo requests and interactions</li>
                <li>• Website usage data (if consented)</li>
              </ul>
            </div>
            
            <button
              onClick={handleDataAccess}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              {loading ? 'Processing...' : 'Request Data Access'}
            </button>
          </div>
        )}

        {activeTab === 'erasure' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Request Data Deletion</h3>
              <p className="text-gray-600 mb-4">
                You have the right to have your personal data erased ("right to be forgotten") 
                under certain circumstances.
              </p>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <h4 className="font-medium text-red-800 mb-2">⚠️ Important Information:</h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• This action cannot be undone</li>
                <li>• All your data will be permanently removed</li>
                <li>• You will no longer receive communications from us</li>
                <li>• Active support tickets will be closed</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Select reason for deletion:</h4>
              <div className="space-y-2">
                {[
                  { value: 'withdrawal', label: 'I withdraw my consent' },
                  { value: 'no_longer_necessary', label: 'Data is no longer necessary' },
                  { value: 'unlawful_processing', label: 'Data is being processed unlawfully' },
                  { value: 'legal_obligation', label: 'Required by legal obligation' }
                ].map((reason) => (
                  <button
                    key={reason.value}
                    onClick={() => handleDataErasure(reason.value as any)}
                    disabled={loading}
                    className="w-full text-left px-4 py-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-md transition-colors"
                  >
                    {reason.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'portability' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Export Your Data</h3>
              <p className="text-gray-600 mb-4">
                You have the right to receive your personal data in a structured, 
                commonly used format that you can transfer to another service.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Choose export format:</h4>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { value: 'json', label: 'JSON', description: 'Machine-readable format' },
                  { value: 'csv', label: 'CSV', description: 'Spreadsheet format' },
                  { value: 'xml', label: 'XML', description: 'Structured markup format' }
                ].map((format) => (
                  <button
                    key={format.value}
                    onClick={() => handleDataPortability(format.value as any)}
                    disabled={loading}
                    className="p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
                  >
                    <div className="font-medium text-gray-900">{format.label}</div>
                    <div className="text-sm text-gray-600 mt-1">{format.description}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'consent' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Manage Your Consent</h3>
              <p className="text-gray-600 mb-4">
                You can withdraw or modify your consent at any time. This will affect 
                how we process your data going forward.
              </p>
            </div>
            
            {userRights?.consentStatus.hasValidConsent ? (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-md p-4">
                  <h4 className="font-medium text-green-800 mb-2">Current Consent Status</h4>
                  <p className="text-sm text-green-700 mb-3">
                    You have valid consent for the following purposes:
                  </p>
                  <ul className="text-sm text-green-700 space-y-1">
                    {userRights.consentStatus.consentedPurposes.map((purpose) => (
                      <li key={purpose}>• {purpose}</li>
                    ))}
                  </ul>
                  {userRights.consentStatus.expires && (
                    <p className="text-sm text-green-700 mt-3">
                      Expires: {new Date(userRights.consentStatus.expires).toLocaleDateString()}
                    </p>
                  )}
                </div>
                
                <div className="space-y-3">
                  <button
                    onClick={handleWithdrawConsent}
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
                  >
                    {loading ? 'Processing...' : 'Withdraw All Consent'}
                  </button>
                  
                  <div className="text-sm text-gray-600">
                    <p>Or <a href="#cookie-settings" className="text-blue-600 hover:underline">
                      manage cookie preferences
                    </a> to modify specific consent categories.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                <h4 className="font-medium text-gray-800 mb-2">No Active Consent</h4>
                <p className="text-sm text-gray-700 mb-3">
                  You currently don't have any active consent on record.
                </p>
                <a
                  href="#cookie-settings"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Update your preferences
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GDPRDataRights;