'use client';

import React, { useState, useEffect } from 'react';
import { gdprCompliance } from '@/lib/compliance/gdpr';
import { geoBlocking } from '@/lib/security/geoBlocking';

interface CookieConsentProps {
  onConsentChange?: (consent: ConsentStatus) => void;
}

interface ConsentStatus {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  timestamp: string;
}

interface CookieCategory {
  id: string;
  name: string;
  description: string;
  required: boolean;
  cookies: {
    name: string;
    purpose: string;
    expiry: string;
    provider: string;
  }[];
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onConsentChange }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<ConsentStatus>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
    timestamp: new Date().toISOString()
  });
  const [isEUUser, setIsEUUser] = useState(false);
  const [loading, setLoading] = useState(true);

  const cookieCategories: CookieCategory[] = [
    {
      id: 'necessary',
      name: 'Strictly Necessary Cookies',
      description: 'These cookies are essential for the website to function properly and cannot be disabled.',
      required: true,
      cookies: [
        {
          name: 'session_id',
          purpose: 'Maintain user session and security',
          expiry: 'Session',
          provider: 'OilFlow BIDEC'
        },
        {
          name: 'csrf_token',
          purpose: 'Protect against cross-site request forgery',
          expiry: '1 day',
          provider: 'OilFlow BIDEC'
        },
        {
          name: 'consent_preferences',
          purpose: 'Remember cookie consent choices',
          expiry: '1 year',
          provider: 'OilFlow BIDEC'
        }
      ]
    },
    {
      id: 'analytics',
      name: 'Analytics Cookies',
      description: 'These cookies help us understand how visitors interact with our website by collecting anonymous information.',
      required: false,
      cookies: [
        {
          name: '_ga',
          purpose: 'Google Analytics tracking',
          expiry: '2 years',
          provider: 'Google'
        },
        {
          name: 'vercel_analytics',
          purpose: 'Website performance analytics',
          expiry: '1 year',
          provider: 'Vercel'
        }
      ]
    },
    {
      id: 'marketing',
      name: 'Marketing Cookies',
      description: 'These cookies are used to track visitors across websites for marketing and advertising purposes.',
      required: false,
      cookies: [
        {
          name: 'lead_tracking',
          purpose: 'Track lead generation and conversion',
          expiry: '30 days',
          provider: 'OilFlow BIDEC'
        },
        {
          name: 'utm_source',
          purpose: 'Track marketing campaign effectiveness',
          expiry: '30 days',
          provider: 'OilFlow BIDEC'
        }
      ]
    },
    {
      id: 'preferences',
      name: 'Preference Cookies',
      description: 'These cookies allow the website to remember choices you make and provide enhanced features.',
      required: false,
      cookies: [
        {
          name: 'language_preference',
          purpose: 'Remember language selection',
          expiry: '1 year',
          provider: 'OilFlow BIDEC'
        },
        {
          name: 'theme_preference',
          purpose: 'Remember theme/display preferences',
          expiry: '1 year',
          provider: 'OilFlow BIDEC'
        }
      ]
    }
  ];

  useEffect(() => {
    checkGDPRRequirement();
    checkExistingConsent();
  }, []);

  const checkGDPRRequirement = async () => {
    try {
      // Get user's IP and check if they're in EU
      const response = await fetch('/api/user-location');
      if (response.ok) {
        const data = await response.json();
        const euRequired = geoBlocking.isEUCountry(data.countryCode);
        setIsEUUser(euRequired);
        
        // Show banner if EU user and no existing consent
        if (euRequired) {
          const existingConsent = localStorage.getItem('cookie_consent');
          if (!existingConsent) {
            setShowBanner(true);
          }
        }
      }
    } catch (error) {
      console.warn('Failed to check GDPR requirement:', error);
      // Default to showing consent for safety
      setShowBanner(true);
    } finally {
      setLoading(false);
    }
  };

  const checkExistingConsent = () => {
    const existingConsent = localStorage.getItem('cookie_consent');
    if (existingConsent) {
      try {
        const parsed = JSON.parse(existingConsent);
        setConsent(parsed);
        
        // Check if consent is still valid (less than 1 year old)
        const consentDate = new Date(parsed.timestamp);
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        
        if (consentDate < oneYearAgo) {
          // Consent expired, show banner again
          setShowBanner(true);
        }
      } catch {
        // Invalid consent data, show banner
        setShowBanner(true);
      }
    }
  };

  const handleConsentUpdate = (category: string, value: boolean) => {
    const newConsent = {
      ...consent,
      [category]: value,
      timestamp: new Date().toISOString()
    };
    setConsent(newConsent);
  };

  const saveConsent = async (consentData: ConsentStatus) => {
    try {
      // Save to localStorage
      localStorage.setItem('cookie_consent', JSON.stringify(consentData));
      
      // Record in GDPR compliance system
      const purposes = [];
      if (consentData.analytics) purposes.push('analytics');
      if (consentData.marketing) purposes.push('marketing');
      if (consentData.preferences) purposes.push('preferences');
      purposes.push('necessary'); // Always included
      
      const sessionId = crypto.randomUUID();
      const expires = new Date();
      expires.setFullYear(expires.getFullYear() + 1); // 1 year expiry
      
      await gdprCompliance.recordConsent({
        userId: sessionId,
        sessionId,
        purposes,
        expires: expires.toISOString(),
        ipAddress: 'client-side', // Will be filled by server
        userAgent: navigator.userAgent,
        lawfulBasis: 'consent'
      });

      // Apply consent preferences
      applyCookieSettings(consentData);
      
      // Notify parent component
      onConsentChange?.(consentData);
      
      setShowBanner(false);
      setShowDetails(false);
    } catch (error) {
      console.error('Failed to save consent:', error);
    }
  };

  const applyCookieSettings = (consentData: ConsentStatus) => {
    // Remove non-consented cookies
    if (!consentData.analytics) {
      // Remove analytics cookies
      document.cookie = '_ga=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = '_gid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'vercel_analytics=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
    
    if (!consentData.marketing) {
      // Remove marketing cookies
      document.cookie = 'lead_tracking=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'utm_source=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
    
    if (!consentData.preferences) {
      // Remove preference cookies (except consent record)
      document.cookie = 'language_preference=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'theme_preference=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
  };

  const acceptAll = () => {
    const newConsent: ConsentStatus = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
      timestamp: new Date().toISOString()
    };
    setConsent(newConsent);
    saveConsent(newConsent);
  };

  const acceptNecessaryOnly = () => {
    const newConsent: ConsentStatus = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
      timestamp: new Date().toISOString()
    };
    setConsent(newConsent);
    saveConsent(newConsent);
  };

  const saveCustomPreferences = () => {
    saveConsent(consent);
  };

  if (loading || !showBanner) {
    return null;
  }

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-lg z-50 border-t border-gray-700">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">
                🍪 We use cookies to enhance your experience
              </h3>
              <p className="text-gray-300 text-sm">
                {isEUUser 
                  ? "We need your consent to use cookies for analytics, marketing, and preferences. You can customize your choices or accept all cookies."
                  : "This website uses cookies to improve your browsing experience and analyze site traffic."
                }
                <button
                  onClick={() => setShowDetails(true)}
                  className="ml-2 text-blue-400 hover:text-blue-300 underline"
                >
                  Learn more
                </button>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={acceptNecessaryOnly}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors text-sm"
              >
                Necessary only
              </button>
              <button
                onClick={() => setShowDetails(true)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded transition-colors text-sm"
              >
                Customize
              </button>
              <button
                onClick={acceptAll}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors text-sm font-medium"
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Settings Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Cookie Settings</h2>
              <p className="text-gray-600 mt-2">
                Manage your cookie preferences. You can enable or disable different types of cookies below.
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              {cookieCategories.map((category) => (
                <div key={category.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        {category.description}
                      </p>
                    </div>
                    <label className="flex items-center ml-4">
                      <input
                        type="checkbox"
                        checked={consent[category.id as keyof ConsentStatus] as boolean}
                        onChange={(e) => handleConsentUpdate(category.id, e.target.checked)}
                        disabled={category.required}
                        className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 disabled:opacity-50"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-900">
                        {category.required ? 'Always on' : 'Optional'}
                      </span>
                    </label>
                  </div>
                  
                  <div className="mt-3">
                    <details className="text-sm">
                      <summary className="cursor-pointer text-blue-600 hover:text-blue-700">
                        View cookies ({category.cookies.length})
                      </summary>
                      <div className="mt-2 space-y-2">
                        {category.cookies.map((cookie) => (
                          <div key={cookie.name} className="bg-gray-50 p-3 rounded">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                              <div>
                                <span className="font-medium">Name:</span>
                                <br />
                                <code className="bg-gray-200 px-1 rounded">{cookie.name}</code>
                              </div>
                              <div>
                                <span className="font-medium">Purpose:</span>
                                <br />
                                {cookie.purpose}
                              </div>
                              <div>
                                <span className="font-medium">Expiry:</span>
                                <br />
                                {cookie.expiry}
                              </div>
                              <div>
                                <span className="font-medium">Provider:</span>
                                <br />
                                {cookie.provider}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </details>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-6 border-t bg-gray-50 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                <p>Your preferences are saved for 1 year. You can change them anytime.</p>
                <p className="mt-1">
                  <a href="/privacy-policy" className="text-blue-600 hover:underline">
                    Read our Privacy Policy
                  </a>
                  {" • "}
                  <a href="/cookie-policy" className="text-blue-600 hover:underline">
                    Cookie Policy
                  </a>
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowDetails(false)}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveCustomPreferences}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                >
                  Save preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;