'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Shield } from 'lucide-react';

export function AdminAccessTrigger() {
  const router = useRouter();
  const [showAdminButton, setShowAdminButton] = useState(false);

  useEffect(() => {
    // Keyboard shortcut: Ctrl+Shift+A (or Cmd+Shift+A on Mac)
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        router.push('/admin/login');
      }
    };

    // Secret click sequence: Triple-click on footer copyright
    let clickCount = 0;
    let clickTimer: NodeJS.Timeout;
    
    const handleSecretClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.id === 'admin-trigger') {
        clickCount++;
        
        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => {
          clickCount = 0;
        }, 500);
        
        if (clickCount === 3) {
          clickCount = 0;
          setShowAdminButton(true);
          setTimeout(() => setShowAdminButton(false), 5000); // Hide after 5 seconds
        }
      }
    };

    // Check if user is on company network (by domain or specific conditions)
    const checkInternalAccess = () => {
      const hostname = window.location.hostname;
      // Show admin button if accessing from localhost or specific IPs
      if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.includes('192.168')) {
        // Only show during business hours (optional)
        const hour = new Date().getHours();
        if (hour >= 7 && hour <= 22) {
          return true;
        }
      }
      return false;
    };

    // Add event listeners
    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('click', handleSecretClick);

    // Check if internal access
    if (checkInternalAccess()) {
      // Show subtle indicator that admin access is available
      console.log('[ADMIN] Press Ctrl+Shift+A to access admin panel');
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('click', handleSecretClick);
      clearTimeout(clickTimer);
    };
  }, [router]);

  // Floating admin button (only visible after secret trigger)
  if (showAdminButton) {
    return (
      <button
        onClick={() => router.push('/admin/login')}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all hover:bg-gray-800 hover:scale-105"
        aria-label="Admin Access"
      >
        <Shield className="h-4 w-4" />
        <span>Admin Portal</span>
      </button>
    );
  }

  return null;
}

// Secret footer link component
export function SecretFooterLink() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative inline-block">
      {/* Hidden trigger text in footer */}
      <span
        id="admin-trigger"
        className="cursor-default select-none text-xs text-gray-400 transition-colors duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        title={`© ${new Date().getFullYear()} BIDEC`}
        style={{ 
          cursor: isHovered ? 'pointer' : 'default',
          opacity: isHovered ? 0.7 : 0.5 
        }}
      >
        •
      </span>
      
      {/* Very subtle link that appears on hover for internal users */}
      {isHovered && (
        <button
          onClick={() => router.push('/admin/login')}
          className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs text-white shadow-md transition-opacity hover:bg-gray-700"
          style={{ fontSize: '10px' }}
        >
          <Lock className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}