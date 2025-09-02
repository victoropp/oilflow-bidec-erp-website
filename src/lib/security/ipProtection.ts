// IP Protection and Content Security Module
// Implements comprehensive intellectual property protection mechanisms
// Includes code obfuscation, content protection, and anti-reverse engineering measures

export interface SecurityConfig {
  enableContentProtection: boolean;
  enableRightClickDisable: boolean;
  enableConsoleBlocking: boolean;
  enableDevToolsDetection: boolean;
  enableWatermarking: boolean;
  enableObfuscation: boolean;
  debugMode: boolean;
}

export interface WatermarkOptions {
  text: string;
  opacity: number;
  fontSize: string;
  color: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  rotation?: number;
}

class IPProtectionService {
  private config: SecurityConfig;
  private initialized: boolean = false;
  private devToolsDetected: boolean = false;
  private rightClickAttempts: number = 0;
  private maxRightClickAttempts: number = 3;

  constructor(config: SecurityConfig) {
    this.config = config;
    this.initialize();
  }

  private initialize(): void {
    if (typeof window === 'undefined' || this.initialized) return;

    try {
      // Initialize content protection features
      if (this.config.enableContentProtection) {
        this.setupContentProtection();
      }

      if (this.config.enableRightClickDisable) {
        this.disableRightClick();
      }

      if (this.config.enableConsoleBlocking) {
        this.blockConsoleAccess();
      }

      if (this.config.enableDevToolsDetection) {
        this.detectDevTools();
      }

      // Add keyboard shortcuts protection
      this.protectKeyboardShortcuts();

      // Protect against text selection
      this.protectTextSelection();

      // Initialize obfuscated data handling
      if (this.config.enableObfuscation) {
        this.initializeObfuscation();
      }

      this.initialized = true;

      // Log protection initialization (obfuscated)
      if (!this.config.debugMode) {
        console.clear();
      }
    } catch (error) {
      if (this.config.debugMode) {
        console.warn('IP Protection initialization failed:', error);
      }
    }
  }

  private setupContentProtection(): void {
    // Disable drag and drop
    document.addEventListener('dragstart', (e) => {
      e.preventDefault();
      return false;
    });

    // Disable image saving
    document.addEventListener('contextmenu', (e) => {
      if ((e.target as HTMLElement).tagName === 'IMG') {
        e.preventDefault();
        return false;
      }
    });

    // Protect against print screen (limited effectiveness)
    document.addEventListener('keyup', (e) => {
      if (e.key === 'PrintScreen') {
        navigator.clipboard.writeText('');
        if (this.config.debugMode) {
          console.warn('Print screen detected');
        }
      }
    });

    // Add CSS to protect content
    this.injectProtectionCSS();
  }

  private disableRightClick(): void {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.rightClickAttempts++;
      
      if (this.rightClickAttempts >= this.maxRightClickAttempts) {
        this.triggerSecurityAlert('Multiple right-click attempts detected');
      }
      
      return false;
    });
  }

  private blockConsoleAccess(): void {
    // Override console methods in production
    if (typeof window !== 'undefined' && !this.config.debugMode) {
      const noop = () => {};
      const methods = ['log', 'debug', 'info', 'warn', 'error', 'assert', 'dir', 'dirxml', 'group', 'groupEnd', 'time', 'timeEnd', 'count', 'trace', 'profile', 'profileEnd'];
      
      methods.forEach(method => {
        (console as any)[method] = noop;
      });
    }

    // Detect console access attempts
    let devtools = false;
    setInterval(() => {
      if ((window as any).outerHeight - (window as any).innerHeight > 200 || 
          (window as any).outerWidth - (window as any).innerWidth > 200) {
        if (!devtools) {
          devtools = true;
          this.triggerSecurityAlert('Developer tools detected');
        }
      } else {
        devtools = false;
      }
    }, 500);
  }

  private detectDevTools(): void {
    const threshold = 160;
    
    const checkDevTools = () => {
      const start = Date.now();
      debugger;
      const end = Date.now();
      
      if (end - start > threshold) {
        if (!this.devToolsDetected) {
          this.devToolsDetected = true;
          this.triggerSecurityAlert('Developer tools debugger detected');
        }
      }
    };

    // Check periodically
    setInterval(checkDevTools, 1000);

    // Monitor window size changes
    window.addEventListener('resize', () => {
      if (window.outerHeight - window.innerHeight > 200 || 
          window.outerWidth - window.innerWidth > 200) {
        this.triggerSecurityAlert('Developer tools panel detected');
      }
    });
  }

  private protectKeyboardShortcuts(): void {
    document.addEventListener('keydown', (e) => {
      // Disable F12 (Developer Tools)
      if (e.key === 'F12') {
        e.preventDefault();
        this.triggerSecurityAlert('F12 key blocked');
        return false;
      }

      // Disable Ctrl+Shift+I (Developer Tools)
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        this.triggerSecurityAlert('Developer tools shortcut blocked');
        return false;
      }

      // Disable Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+U (View Source)
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        this.triggerSecurityAlert('View source blocked');
        return false;
      }

      // Disable Ctrl+S (Save Page)
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+A (Select All) - optional
      if (e.ctrlKey && e.key === 'a') {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+C (Copy) - optional, might be too restrictive
      if (this.config.enableContentProtection && e.ctrlKey && e.key === 'c') {
        e.preventDefault();
        return false;
      }
    });
  }

  private protectTextSelection(): void {
    if (this.config.enableContentProtection) {
      // Disable text selection
      document.addEventListener('selectstart', (e) => {
        e.preventDefault();
        return false;
      });

      // Disable text selection via mouse
      document.addEventListener('mousedown', (e) => {
        if (e.detail > 1) { // Multi-click selection
          e.preventDefault();
          return false;
        }
      });
    }
  }

  private injectProtectionCSS(): void {
    const style = document.createElement('style');
    style.textContent = `
      /* Disable text selection */
      .ip-protected {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }

      /* Disable right-click context menu */
      .no-context-menu {
        -webkit-touch-callout: none !important;
        -webkit-user-select: none !important;
        -khtml-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
      }

      /* Hide sensitive content from print */
      @media print {
        .no-print {
          display: none !important;
        }
        .sensitive-content {
          visibility: hidden !important;
        }
      }

      /* Blur content when dev tools are open */
      .security-blur {
        filter: blur(5px) !important;
        pointer-events: none !important;
      }

      /* Watermark overlay */
      .watermark {
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.1;
        font-size: 18px;
        color: #000;
        transform: rotate(-45deg);
        user-select: none;
      }
    `;
    document.head.appendChild(style);
  }

  private initializeObfuscation(): void {
    // Obfuscate sensitive data in localStorage
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function(key: string, value: string) {
      if (key.includes('sensitive') || key.includes('api') || key.includes('token')) {
        value = btoa(encodeURIComponent(value)); // Basic obfuscation
      }
      return originalSetItem.call(this, key, value);
    };

    // Protect window properties
    this.protectWindowProperties();
  }

  private protectWindowProperties(): void {
    // Prevent access to sensitive window properties
    Object.defineProperty(window, 'ipProtectionService', {
      value: undefined,
      writable: false,
      configurable: false
    });

    // Monitor property access attempts
    const originalDefineProperty = Object.defineProperty;
    (Object as any).defineProperty = function(obj: any, prop: string | symbol, descriptor: PropertyDescriptor) {
      if (prop.toString().includes('security') || prop.toString().includes('protection')) {
        console.warn('Suspicious property access attempt:', prop);
      }
      return originalDefineProperty.call(this, obj, prop, descriptor);
    };
  }

  private triggerSecurityAlert(message: string): void {
    if (this.config.debugMode) {
      console.warn('Security Alert:', message);
    }

    // Send security event to analytics (in production, send to your security service)
    this.logSecurityEvent({
      type: 'security_violation',
      message,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      ip: 'client-side' // In production, get from server
    });

    // Optional: Show user warning
    if (message.includes('tools') || message.includes('F12')) {
      this.showSecurityWarning();
    }
  }

  private logSecurityEvent(event: any): void {
    // In production, send to your security monitoring service
    try {
      fetch('/api/security/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event)
      }).catch(() => {
        // Fail silently to avoid exposing endpoint
      });
    } catch {
      // Store locally if endpoint unavailable
      const events = JSON.parse(localStorage.getItem('security_events') || '[]');
      events.push(event);
      localStorage.setItem('security_events', JSON.stringify(events.slice(-10))); // Keep last 10
    }
  }

  private showSecurityWarning(): void {
    // Create modal warning
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-family: Arial, sans-serif;
    `;

    modal.innerHTML = `
      <div style="background: #333; padding: 20px; border-radius: 8px; text-align: center; max-width: 400px;">
        <h2>⚠️ Security Notice</h2>
        <p>This content is protected by copyright and proprietary rights.</p>
        <p>Unauthorized access or reproduction is prohibited.</p>
        <button onclick="this.parentElement.parentElement.remove()" style="margin-top: 15px; padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Acknowledge
        </button>
      </div>
    `;

    document.body.appendChild(modal);

    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (modal.parentNode) {
        modal.remove();
      }
    }, 10000);
  }

  // Public methods for watermarking
  public addWatermark(options: WatermarkOptions): void {
    if (!this.config.enableWatermarking) return;

    const watermark = document.createElement('div');
    watermark.className = 'watermark';
    watermark.textContent = options.text;
    
    Object.assign(watermark.style, {
      opacity: options.opacity.toString(),
      fontSize: options.fontSize,
      color: options.color,
      transform: `rotate(${options.rotation || -45}deg)`,
    });

    // Position watermark
    switch (options.position) {
      case 'top-left':
        Object.assign(watermark.style, { top: '20px', left: '20px' });
        break;
      case 'top-right':
        Object.assign(watermark.style, { top: '20px', right: '20px' });
        break;
      case 'bottom-left':
        Object.assign(watermark.style, { bottom: '20px', left: '20px' });
        break;
      case 'bottom-right':
        Object.assign(watermark.style, { bottom: '20px', right: '20px' });
        break;
      case 'center':
        Object.assign(watermark.style, { 
          top: '50%', 
          left: '50%', 
          transform: `translate(-50%, -50%) rotate(${options.rotation || -45}deg)` 
        });
        break;
    }

    document.body.appendChild(watermark);

    // Create multiple watermarks for better coverage
    for (let i = 0; i < 5; i++) {
      const clone = watermark.cloneNode(true) as HTMLElement;
      clone.style.top = `${Math.random() * 80 + 10}%`;
      clone.style.left = `${Math.random() * 80 + 10}%`;
      document.body.appendChild(clone);
    }
  }

  public protectElement(element: HTMLElement): void {
    element.classList.add('ip-protected', 'no-context-menu', 'no-print');
    
    // Add specific protection for this element
    element.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      return false;
    });

    element.addEventListener('selectstart', (e) => {
      e.preventDefault();
      return false;
    });
  }

  public getSecurityReport(): object {
    return {
      initialized: this.initialized,
      devToolsDetected: this.devToolsDetected,
      rightClickAttempts: this.rightClickAttempts,
      config: this.config,
      timestamp: new Date().toISOString()
    };
  }
}

// Obfuscated knowledge base with protection
export class ProtectedKnowledgeBase {
  private data: Map<string, any> = new Map();
  private accessLog: Array<{key: string, timestamp: string}> = [];

  constructor() {
    this.initializeProtectedData();
  }

  private initializeProtectedData(): void {
    // Store only essential, non-sensitive information
    const publicData = {
      general_info: {
        company: "BIDEC",
        product: "OilFlow ERP",
        industry: "Petroleum",
        website: "https://oilflow.bidec.com"
      },
      contact_info: {
        demo: "Available upon request",
        support: "24/7 technical support",
        sales: "Contact for pricing"
      },
      basic_features: {
        integration: "API-first architecture",
        scalability: "Enterprise-grade",
        compliance: "Industry standards"
      }
    };

    // Store with obfuscation
    for (const [key, value] of Object.entries(publicData)) {
      this.data.set(this.obfuscateKey(key), this.obfuscateValue(value));
    }
  }

  private obfuscateKey(key: string): string {
    return btoa(key).split('').reverse().join('');
  }

  private obfuscateValue(value: any): string {
    return btoa(JSON.stringify(value));
  }

  private deobfuscateKey(key: string): string {
    return atob(key.split('').reverse().join(''));
  }

  private deobfuscateValue(value: string): any {
    try {
      return JSON.parse(atob(value));
    } catch {
      return null;
    }
  }

  public getData(key: string): any {
    this.accessLog.push({
      key: key,
      timestamp: new Date().toISOString()
    });

    // Rate limiting
    const recentAccess = this.accessLog.filter(
      log => Date.now() - new Date(log.timestamp).getTime() < 60000 // 1 minute
    );

    if (recentAccess.length > 10) {
      console.warn('Suspicious data access pattern detected');
      return null;
    }

    const obfuscatedKey = this.obfuscateKey(key);
    const obfuscatedValue = this.data.get(obfuscatedKey);
    
    return obfuscatedValue ? this.deobfuscateValue(obfuscatedValue) : null;
  }

  public getAccessLog(): Array<{key: string, timestamp: string}> {
    return this.accessLog.slice(-20); // Return last 20 entries only
  }
}

// Export factory function to create IP protection instance
export const createIPProtection = (config: Partial<SecurityConfig> = {}): IPProtectionService => {
  const defaultConfig: SecurityConfig = {
    enableContentProtection: true,
    enableRightClickDisable: true,
    enableConsoleBlocking: process.env.NODE_ENV === 'production',
    enableDevToolsDetection: true,
    enableWatermarking: true,
    enableObfuscation: true,
    debugMode: process.env.NODE_ENV !== 'production'
  };

  return new IPProtectionService({ ...defaultConfig, ...config });
};

// Export protected knowledge base instance
export const protectedKnowledgeBase = new ProtectedKnowledgeBase();