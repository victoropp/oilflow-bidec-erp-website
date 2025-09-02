// GDPR Compliance Framework
// Comprehensive implementation of EU General Data Protection Regulation requirements

interface GDPRConsent {
  id: string;
  userId: string;
  sessionId: string;
  purposes: string[];
  timestamp: string;
  expires: string;
  withdrawn?: string;
  ipAddress: string;
  userAgent: string;
  version: string;
  lawfulBasis: 'consent' | 'contract' | 'legal_obligation' | 'vital_interests' | 'public_task' | 'legitimate_interests';
}

interface GDPRDataSubject {
  id: string;
  email?: string;
  phone?: string;
  name?: string;
  company?: string;
  ipAddress: string;
  country: string;
  consentRecords: GDPRConsent[];
  dataProcessingActivities: DataProcessingActivity[];
  rights: DataSubjectRights;
  created: string;
  lastAccessed: string;
}

interface DataProcessingActivity {
  id: string;
  purpose: string;
  category: string;
  dataTypes: string[];
  processingBasis: string;
  retentionPeriod: number; // days
  recipients: string[];
  transferCountries: string[];
  created: string;
  lastProcessed: string;
}

interface DataSubjectRights {
  accessRequests: DataAccessRequest[];
  rectificationRequests: DataRectificationRequest[];
  erasureRequests: DataErasureRequest[];
  portabilityRequests: DataPortabilityRequest[];
  objectionRequests: DataObjectionRequest[];
  restrictionRequests: DataRestrictionRequest[];
}

interface DataAccessRequest {
  id: string;
  requested: string;
  responded?: string;
  status: 'pending' | 'completed' | 'rejected';
  data?: any;
  reason?: string;
}

interface DataRectificationRequest {
  id: string;
  field: string;
  currentValue: string;
  requestedValue: string;
  requested: string;
  completed?: string;
  status: 'pending' | 'completed' | 'rejected';
}

interface DataErasureRequest {
  id: string;
  reason: 'withdrawal' | 'no_longer_necessary' | 'unlawful_processing' | 'legal_obligation';
  requested: string;
  completed?: string;
  status: 'pending' | 'completed' | 'rejected';
  verification: boolean;
}

interface DataPortabilityRequest {
  id: string;
  format: 'json' | 'csv' | 'xml';
  requested: string;
  completed?: string;
  status: 'pending' | 'completed' | 'rejected';
  downloadUrl?: string;
}

interface DataObjectionRequest {
  id: string;
  purpose: string;
  reason: string;
  requested: string;
  responded?: string;
  status: 'pending' | 'upheld' | 'rejected';
}

interface DataRestrictionRequest {
  id: string;
  reason: 'accuracy_contested' | 'unlawful_processing' | 'no_longer_needed' | 'objection_pending';
  requested: string;
  implemented?: string;
  status: 'pending' | 'implemented' | 'rejected';
}

class GDPRComplianceService {
  private dataSubjects: Map<string, GDPRDataSubject> = new Map();
  private consentRecords: Map<string, GDPRConsent> = new Map();
  private processingActivities: Map<string, DataProcessingActivity> = new Map();
  private auditLog: Array<{
    timestamp: string;
    action: string;
    userId: string;
    details: any;
  }> = [];

  constructor() {
    this.initializeProcessingActivities();
    this.startRetentionCleanup();
  }

  private initializeProcessingActivities(): void {
    const activities: DataProcessingActivity[] = [
      {
        id: 'demo_request',
        purpose: 'Process demo requests and schedule demonstrations',
        category: 'Marketing and Sales',
        dataTypes: ['name', 'email', 'phone', 'company', 'job_title', 'business_needs'],
        processingBasis: 'consent',
        retentionPeriod: 1095, // 3 years
        recipients: ['Sales team', 'Marketing team'],
        transferCountries: [],
        created: new Date().toISOString(),
        lastProcessed: new Date().toISOString()
      },
      {
        id: 'contact_form',
        purpose: 'Respond to general inquiries and provide support',
        category: 'Customer Support',
        dataTypes: ['name', 'email', 'message', 'company'],
        processingBasis: 'legitimate_interests',
        retentionPeriod: 730, // 2 years
        recipients: ['Support team', 'Customer success team'],
        transferCountries: [],
        created: new Date().toISOString(),
        lastProcessed: new Date().toISOString()
      },
      {
        id: 'chatbot_interaction',
        purpose: 'Provide automated customer support and lead qualification',
        category: 'Customer Support and Marketing',
        dataTypes: ['chat_messages', 'session_id', 'ip_address', 'user_preferences'],
        processingBasis: 'legitimate_interests',
        retentionPeriod: 365, // 1 year
        recipients: ['AI system', 'Customer support team'],
        transferCountries: [],
        created: new Date().toISOString(),
        lastProcessed: new Date().toISOString()
      },
      {
        id: 'website_analytics',
        purpose: 'Analyze website performance and user behavior',
        category: 'Analytics',
        dataTypes: ['page_views', 'session_duration', 'ip_address', 'user_agent', 'referrer'],
        processingBasis: 'legitimate_interests',
        retentionPeriod: 730, // 2 years
        recipients: ['Marketing team', 'Development team', 'Third-party analytics providers'],
        transferCountries: ['US'], // Vercel Analytics
        created: new Date().toISOString(),
        lastProcessed: new Date().toISOString()
      }
    ];

    activities.forEach(activity => {
      this.processingActivities.set(activity.id, activity);
    });
  }

  private startRetentionCleanup(): void {
    // Run retention cleanup daily
    setInterval(() => {
      this.performRetentionCleanup();
    }, 24 * 60 * 60 * 1000);
  }

  private performRetentionCleanup(): void {
    const now = new Date();
    let deletedCount = 0;

    // Clean up expired consent records
    for (const [consentId, consent] of this.consentRecords.entries()) {
      const expiryDate = new Date(consent.expires);
      if (now > expiryDate) {
        this.consentRecords.delete(consentId);
        deletedCount++;
      }
    }

    // Clean up data subjects based on retention periods
    for (const [subjectId, subject] of this.dataSubjects.entries()) {
      let shouldDelete = false;
      const lastAccessDate = new Date(subject.lastAccessed);
      
      // Check if all processing activities have exceeded retention
      for (const activity of subject.dataProcessingActivities) {
        const processingActivity = this.processingActivities.get(activity.id);
        if (processingActivity) {
          const retentionEndDate = new Date(activity.created);
          retentionEndDate.setDate(retentionEndDate.getDate() + processingActivity.retentionPeriod);
          
          if (now > retentionEndDate) {
            shouldDelete = true;
          }
        }
      }

      if (shouldDelete && this.hasValidErasureRequest(subjectId)) {
        this.dataSubjects.delete(subjectId);
        deletedCount++;
        
        this.auditLog.push({
          timestamp: now.toISOString(),
          action: 'AUTO_DELETION',
          userId: subjectId,
          details: { reason: 'Retention period expired' }
        });
      }
    }

    if (deletedCount > 0) {
      console.log(`GDPR retention cleanup: ${deletedCount} records deleted`);
    }
  }

  public async recordConsent(consent: Omit<GDPRConsent, 'id' | 'timestamp' | 'version'>): Promise<string> {
    const consentRecord: GDPRConsent = {
      ...consent,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      version: '1.0'
    };

    this.consentRecords.set(consentRecord.id, consentRecord);

    // Update or create data subject
    await this.updateDataSubject(consent.userId, {
      ipAddress: consent.ipAddress,
      consentRecords: [consentRecord]
    });

    this.auditLog.push({
      timestamp: new Date().toISOString(),
      action: 'CONSENT_RECORDED',
      userId: consent.userId,
      details: { consentId: consentRecord.id, purposes: consent.purposes }
    });

    return consentRecord.id;
  }

  public async withdrawConsent(userId: string, consentId: string): Promise<boolean> {
    const consent = this.consentRecords.get(consentId);
    if (!consent || consent.userId !== userId) {
      return false;
    }

    consent.withdrawn = new Date().toISOString();
    this.consentRecords.set(consentId, consent);

    // Update data subject
    const subject = this.dataSubjects.get(userId);
    if (subject) {
      subject.consentRecords = subject.consentRecords.map(c =>
        c.id === consentId ? consent : c
      );
      this.dataSubjects.set(userId, subject);
    }

    this.auditLog.push({
      timestamp: new Date().toISOString(),
      action: 'CONSENT_WITHDRAWN',
      userId,
      details: { consentId, purposes: consent.purposes }
    });

    return true;
  }

  public async getConsentStatus(userId: string): Promise<{
    hasValidConsent: boolean;
    consentedPurposes: string[];
    expires: string | null;
  }> {
    const subject = this.dataSubjects.get(userId);
    if (!subject) {
      return { hasValidConsent: false, consentedPurposes: [], expires: null };
    }

    const validConsents = subject.consentRecords.filter(consent => {
      const now = new Date();
      const expires = new Date(consent.expires);
      return !consent.withdrawn && now <= expires;
    });

    if (validConsents.length === 0) {
      return { hasValidConsent: false, consentedPurposes: [], expires: null };
    }

    const purposes = [...new Set(validConsents.flatMap(c => c.purposes))];
    const earliestExpiry = validConsents.reduce((earliest, consent) => {
      const expires = new Date(consent.expires);
      return expires < earliest ? expires : earliest;
    }, new Date(validConsents[0].expires));

    return {
      hasValidConsent: true,
      consentedPurposes: purposes,
      expires: earliestExpiry.toISOString()
    };
  }

  private async updateDataSubject(userId: string, updates: Partial<GDPRDataSubject>): Promise<void> {
    const existing = this.dataSubjects.get(userId);
    const now = new Date().toISOString();

    if (existing) {
      const updated = {
        ...existing,
        ...updates,
        lastAccessed: now,
        consentRecords: [
          ...existing.consentRecords,
          ...(updates.consentRecords || [])
        ]
      };
      this.dataSubjects.set(userId, updated);
    } else {
      const newSubject: GDPRDataSubject = {
        id: userId,
        ipAddress: updates.ipAddress || 'unknown',
        country: updates.country || 'unknown',
        consentRecords: updates.consentRecords || [],
        dataProcessingActivities: updates.dataProcessingActivities || [],
        rights: {
          accessRequests: [],
          rectificationRequests: [],
          erasureRequests: [],
          portabilityRequests: [],
          objectionRequests: [],
          restrictionRequests: []
        },
        created: now,
        lastAccessed: now,
        ...updates
      };
      this.dataSubjects.set(userId, newSubject);
    }
  }

  // Data Subject Rights Implementation

  public async requestDataAccess(userId: string): Promise<string> {
    const subject = this.dataSubjects.get(userId);
    if (!subject) {
      throw new Error('Data subject not found');
    }

    const requestId = crypto.randomUUID();
    const accessRequest: DataAccessRequest = {
      id: requestId,
      requested: new Date().toISOString(),
      status: 'pending'
    };

    subject.rights.accessRequests.push(accessRequest);
    this.dataSubjects.set(userId, subject);

    // In production, this would trigger a workflow to compile and send data
    setTimeout(async () => {
      await this.completeDataAccessRequest(userId, requestId);
    }, 1000); // Simulate processing delay

    this.auditLog.push({
      timestamp: new Date().toISOString(),
      action: 'DATA_ACCESS_REQUESTED',
      userId,
      details: { requestId }
    });

    return requestId;
  }

  private async completeDataAccessRequest(userId: string, requestId: string): Promise<void> {
    const subject = this.dataSubjects.get(userId);
    if (!subject) return;

    const accessRequest = subject.rights.accessRequests.find(r => r.id === requestId);
    if (!accessRequest) return;

    // Compile all data for the subject
    const compiledData = {
      personalData: {
        id: subject.id,
        email: subject.email,
        phone: subject.phone,
        name: subject.name,
        company: subject.company,
        country: subject.country,
        created: subject.created,
        lastAccessed: subject.lastAccessed
      },
      consentRecords: subject.consentRecords,
      processingActivities: subject.dataProcessingActivities,
      rightsExercised: subject.rights
    };

    accessRequest.status = 'completed';
    accessRequest.responded = new Date().toISOString();
    accessRequest.data = compiledData;

    this.dataSubjects.set(userId, subject);

    this.auditLog.push({
      timestamp: new Date().toISOString(),
      action: 'DATA_ACCESS_COMPLETED',
      userId,
      details: { requestId }
    });
  }

  public async requestDataErasure(userId: string, reason: DataErasureRequest['reason']): Promise<string> {
    const subject = this.dataSubjects.get(userId);
    if (!subject) {
      throw new Error('Data subject not found');
    }

    const requestId = crypto.randomUUID();
    const erasureRequest: DataErasureRequest = {
      id: requestId,
      reason,
      requested: new Date().toISOString(),
      status: 'pending',
      verification: false
    };

    subject.rights.erasureRequests.push(erasureRequest);
    this.dataSubjects.set(userId, subject);

    this.auditLog.push({
      timestamp: new Date().toISOString(),
      action: 'DATA_ERASURE_REQUESTED',
      userId,
      details: { requestId, reason }
    });

    return requestId;
  }

  public async processDataErasure(userId: string, requestId: string, approved: boolean): Promise<boolean> {
    const subject = this.dataSubjects.get(userId);
    if (!subject) return false;

    const erasureRequest = subject.rights.erasureRequests.find(r => r.id === requestId);
    if (!erasureRequest) return false;

    if (approved) {
      // Perform erasure
      this.dataSubjects.delete(userId);
      
      // Remove related consent records
      for (const [consentId, consent] of this.consentRecords.entries()) {
        if (consent.userId === userId) {
          this.consentRecords.delete(consentId);
        }
      }

      erasureRequest.status = 'completed';
      erasureRequest.completed = new Date().toISOString();
      erasureRequest.verification = true;

      this.auditLog.push({
        timestamp: new Date().toISOString(),
        action: 'DATA_ERASURE_COMPLETED',
        userId,
        details: { requestId, approved }
      });
    } else {
      erasureRequest.status = 'rejected';
      subject.rights.erasureRequests = subject.rights.erasureRequests.map(r =>
        r.id === requestId ? erasureRequest : r
      );
      this.dataSubjects.set(userId, subject);

      this.auditLog.push({
        timestamp: new Date().toISOString(),
        action: 'DATA_ERASURE_REJECTED',
        userId,
        details: { requestId, approved }
      });
    }

    return true;
  }

  public async requestDataPortability(userId: string, format: DataPortabilityRequest['format']): Promise<string> {
    const subject = this.dataSubjects.get(userId);
    if (!subject) {
      throw new Error('Data subject not found');
    }

    const requestId = crypto.randomUUID();
    const portabilityRequest: DataPortabilityRequest = {
      id: requestId,
      format,
      requested: new Date().toISOString(),
      status: 'pending'
    };

    subject.rights.portabilityRequests.push(portabilityRequest);
    this.dataSubjects.set(userId, subject);

    // Simulate file generation
    setTimeout(async () => {
      await this.completeDataPortabilityRequest(userId, requestId, format);
    }, 2000);

    this.auditLog.push({
      timestamp: new Date().toISOString(),
      action: 'DATA_PORTABILITY_REQUESTED',
      userId,
      details: { requestId, format }
    });

    return requestId;
  }

  private async completeDataPortabilityRequest(userId: string, requestId: string, format: string): Promise<void> {
    const subject = this.dataSubjects.get(userId);
    if (!subject) return;

    const portabilityRequest = subject.rights.portabilityRequests.find(r => r.id === requestId);
    if (!portabilityRequest) return;

    // Generate download URL (in production, this would be a secure, time-limited URL)
    const downloadUrl = `/api/gdpr/download/${requestId}?format=${format}&token=${crypto.randomUUID()}`;

    portabilityRequest.status = 'completed';
    portabilityRequest.completed = new Date().toISOString();
    portabilityRequest.downloadUrl = downloadUrl;

    this.dataSubjects.set(userId, subject);

    this.auditLog.push({
      timestamp: new Date().toISOString(),
      action: 'DATA_PORTABILITY_COMPLETED',
      userId,
      details: { requestId, downloadUrl }
    });
  }

  private hasValidErasureRequest(userId: string): boolean {
    const subject = this.dataSubjects.get(userId);
    if (!subject) return false;

    return subject.rights.erasureRequests.some(request =>
      request.status === 'completed' && request.verification
    );
  }

  public getComplianceReport(): {
    totalDataSubjects: number;
    activeConsents: number;
    expiredConsents: number;
    pendingRequests: number;
    completedErasures: number;
    auditLogEntries: number;
  } {
    let activeConsents = 0;
    let expiredConsents = 0;
    let pendingRequests = 0;
    let completedErasures = 0;

    const now = new Date();

    for (const consent of this.consentRecords.values()) {
      const expires = new Date(consent.expires);
      if (consent.withdrawn) {
        expiredConsents++;
      } else if (now <= expires) {
        activeConsents++;
      } else {
        expiredConsents++;
      }
    }

    for (const subject of this.dataSubjects.values()) {
      // Count pending requests
      pendingRequests += Object.values(subject.rights).flat().filter((request: any) =>
        request.status === 'pending'
      ).length;

      // Count completed erasures
      completedErasures += subject.rights.erasureRequests.filter(request =>
        request.status === 'completed'
      ).length;
    }

    return {
      totalDataSubjects: this.dataSubjects.size,
      activeConsents,
      expiredConsents,
      pendingRequests,
      completedErasures,
      auditLogEntries: this.auditLog.length
    };
  }

  public exportAuditLog(startDate?: string, endDate?: string): Array<any> {
    let filteredLog = this.auditLog;

    if (startDate) {
      filteredLog = filteredLog.filter(entry => entry.timestamp >= startDate);
    }

    if (endDate) {
      filteredLog = filteredLog.filter(entry => entry.timestamp <= endDate);
    }

    return filteredLog;
  }
}

// Export singleton instance
export const gdprCompliance = new GDPRComplianceService();

// Export types for use in components
export type {
  GDPRConsent,
  GDPRDataSubject,
  DataProcessingActivity,
  DataSubjectRights,
  DataAccessRequest,
  DataErasureRequest,
  DataPortabilityRequest
};