// Advanced analytics and tracking system for chatbot conversations
// Provides insights into user behavior, conversation patterns, and lead quality

export interface ConversationMetrics {
  sessionId: string;
  userId?: string;
  startTime: string;
  endTime?: string;
  duration?: number; // in seconds
  messageCount: number;
  userMessageCount: number;
  assistantMessageCount: number;
  language: string;
  leadScore: number;
  finalStage: string;
  intents: string[];
  entities: Record<string, any>[];
  satisfactionScore?: number;
  conversionEvent?: 'demo_requested' | 'contact_provided' | 'escalated' | 'none';
  userAgent?: string;
  referrer?: string;
  geolocation?: {
    country?: string;
    region?: string;
    city?: string;
  };
}

export interface AnalyticsEvent {
  eventType: 'message_sent' | 'message_received' | 'intent_recognized' | 'escalation_triggered' | 'demo_requested' | 'conversation_ended';
  sessionId: string;
  timestamp: string;
  payload: Record<string, any>;
  userId?: string;
}

export interface AggregatedAnalytics {
  timeRange: {
    start: string;
    end: string;
  };
  totalSessions: number;
  totalMessages: number;
  averageSessionLength: number;
  averageMessagesPerSession: number;
  languageDistribution: Record<string, number>;
  intentDistribution: Record<string, number>;
  conversionMetrics: {
    demoRequests: number;
    contactsCollected: number;
    escalations: number;
    conversionRate: number;
  };
  leadScoreDistribution: {
    low: number;    // 0-30
    medium: number; // 31-60
    high: number;   // 61-100
  };
  userFlow: {
    commonPaths: string[];
    dropOffPoints: string[];
    averageConversationDepth: number;
  };
  performanceMetrics: {
    averageResponseTime: number;
    errorRate: number;
    satisfactionScore: number;
  };
  regionalInsights: Record<string, {
    sessions: number;
    averageLeadScore: number;
    topIntents: string[];
  }>;
}

// Analytics collection service
export class ChatbotAnalytics {
  private static events: AnalyticsEvent[] = [];
  private static conversations: ConversationMetrics[] = [];
  
  // Event tracking
  static trackEvent(event: AnalyticsEvent): void {
    this.events.push({
      ...event,
      timestamp: event.timestamp || new Date().toISOString()
    });
    
    // In production, send to analytics service
    this.sendToAnalyticsService(event);
  }
  
  // Track message events
  static trackMessage(
    sessionId: string,
    messageType: 'user' | 'assistant',
    content: string,
    metadata?: Record<string, any>
  ): void {
    this.trackEvent({
      eventType: messageType === 'user' ? 'message_sent' : 'message_received',
      sessionId,
      timestamp: new Date().toISOString(),
      payload: {
        messageType,
        content,
        contentLength: content.length,
        ...metadata
      }
    });
  }
  
  // Track intent recognition
  static trackIntent(
    sessionId: string,
    intent: string,
    confidence: number,
    entities: Record<string, any> = {}
  ): void {
    this.trackEvent({
      eventType: 'intent_recognized',
      sessionId,
      timestamp: new Date().toISOString(),
      payload: {
        intent,
        confidence,
        entities
      }
    });
  }
  
  // Track conversation start
  static startConversation(
    sessionId: string,
    language: string,
    userAgent?: string,
    referrer?: string
  ): void {
    const conversation: ConversationMetrics = {
      sessionId,
      startTime: new Date().toISOString(),
      messageCount: 0,
      userMessageCount: 0,
      assistantMessageCount: 0,
      language,
      leadScore: 0,
      finalStage: 'greeting',
      intents: [],
      entities: [],
      conversionEvent: 'none',
      userAgent,
      referrer
    };
    
    this.conversations.push(conversation);
    
    this.trackEvent({
      eventType: 'message_received', // Bot greeting
      sessionId,
      timestamp: new Date().toISOString(),
      payload: {
        action: 'conversation_started',
        language,
        userAgent,
        referrer
      }
    });
  }
  
  // Update conversation metrics
  static updateConversation(
    sessionId: string,
    updates: Partial<ConversationMetrics>
  ): void {
    const conversationIndex = this.conversations.findIndex(c => c.sessionId === sessionId);
    if (conversationIndex >= 0) {
      this.conversations[conversationIndex] = {
        ...this.conversations[conversationIndex],
        ...updates
      };
    }
  }
  
  // End conversation
  static endConversation(
    sessionId: string,
    satisfactionScore?: number
  ): void {
    const conversation = this.conversations.find(c => c.sessionId === sessionId);
    if (conversation) {
      const endTime = new Date().toISOString();
      const duration = (new Date(endTime).getTime() - new Date(conversation.startTime).getTime()) / 1000;
      
      this.updateConversation(sessionId, {
        endTime,
        duration,
        satisfactionScore
      });
      
      this.trackEvent({
        eventType: 'conversation_ended',
        sessionId,
        timestamp: endTime,
        payload: {
          duration,
          messageCount: conversation.messageCount,
          leadScore: conversation.leadScore,
          conversionEvent: conversation.conversionEvent,
          satisfactionScore
        }
      });
    }
  }
  
  // Track conversion events
  static trackConversion(
    sessionId: string,
    conversionType: 'demo_requested' | 'contact_provided' | 'escalated'
  ): void {
    this.updateConversation(sessionId, {
      conversionEvent: conversionType
    });
    
    this.trackEvent({
      eventType: conversionType === 'demo_requested' ? 'demo_requested' : 'escalation_triggered',
      sessionId,
      timestamp: new Date().toISOString(),
      payload: {
        conversionType
      }
    });
  }
  
  // Generate analytics report
  static generateAnalyticsReport(
    startDate?: string,
    endDate?: string
  ): AggregatedAnalytics {
    const start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 days ago
    const end = endDate ? new Date(endDate) : new Date();
    
    const filteredConversations = this.conversations.filter(conv => {
      const conversationDate = new Date(conv.startTime);
      return conversationDate >= start && conversationDate <= end;
    });
    
    const totalSessions = filteredConversations.length;
    const totalMessages = filteredConversations.reduce((sum, conv) => sum + conv.messageCount, 0);
    
    // Language distribution
    const languageDistribution = filteredConversations.reduce((acc, conv) => {
      acc[conv.language] = (acc[conv.language] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Intent distribution
    const intentDistribution = filteredConversations.reduce((acc, conv) => {
      conv.intents.forEach(intent => {
        acc[intent] = (acc[intent] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);
    
    // Conversion metrics
    const demoRequests = filteredConversations.filter(conv => 
      conv.conversionEvent === 'demo_requested'
    ).length;
    const contactsCollected = filteredConversations.filter(conv => 
      conv.conversionEvent === 'contact_provided'
    ).length;
    const escalations = filteredConversations.filter(conv => 
      conv.conversionEvent === 'escalated'
    ).length;
    const conversionRate = totalSessions > 0 ? 
      ((demoRequests + contactsCollected + escalations) / totalSessions) * 100 : 0;
    
    // Lead score distribution
    const leadScoreDistribution = filteredConversations.reduce((acc, conv) => {
      if (conv.leadScore <= 30) acc.low++;
      else if (conv.leadScore <= 60) acc.medium++;
      else acc.high++;
      return acc;
    }, { low: 0, medium: 0, high: 0 });
    
    // Performance metrics
    const completedConversations = filteredConversations.filter(conv => conv.endTime);
    const averageSessionLength = completedConversations.length > 0 ?
      completedConversations.reduce((sum, conv) => sum + (conv.duration || 0), 0) / completedConversations.length :
      0;
    
    const averageMessagesPerSession = totalSessions > 0 ? totalMessages / totalSessions : 0;
    
    const satisfactionScores = completedConversations
      .filter(conv => conv.satisfactionScore !== undefined)
      .map(conv => conv.satisfactionScore!);
    const satisfactionScore = satisfactionScores.length > 0 ?
      satisfactionScores.reduce((sum, score) => sum + score, 0) / satisfactionScores.length :
      0;
    
    // Regional insights
    const regionalInsights = filteredConversations.reduce((acc, conv) => {
      const region = conv.geolocation?.country || 'unknown';
      if (!acc[region]) {
        acc[region] = {
          sessions: 0,
          averageLeadScore: 0,
          topIntents: []
        };
      }
      acc[region].sessions++;
      acc[region].averageLeadScore += conv.leadScore;
      return acc;
    }, {} as Record<string, { sessions: number; averageLeadScore: number; topIntents: string[] }>);
    
    // Calculate averages for regional insights
    Object.keys(regionalInsights).forEach(region => {
      regionalInsights[region].averageLeadScore /= regionalInsights[region].sessions;
    });
    
    return {
      timeRange: {
        start: start.toISOString(),
        end: end.toISOString()
      },
      totalSessions,
      totalMessages,
      averageSessionLength,
      averageMessagesPerSession,
      languageDistribution,
      intentDistribution,
      conversionMetrics: {
        demoRequests,
        contactsCollected,
        escalations,
        conversionRate
      },
      leadScoreDistribution,
      userFlow: {
        commonPaths: this.calculateCommonPaths(filteredConversations),
        dropOffPoints: this.calculateDropOffPoints(filteredConversations),
        averageConversationDepth: averageMessagesPerSession
      },
      performanceMetrics: {
        averageResponseTime: 2.1, // Would be calculated from actual response times
        errorRate: 0.05, // Would be calculated from error events
        satisfactionScore
      },
      regionalInsights
    };
  }
  
  // Helper method to calculate common conversation paths
  private static calculateCommonPaths(conversations: ConversationMetrics[]): string[] {
    const paths = conversations.map(conv => conv.intents.join(' → '));
    const pathCounts = paths.reduce((acc, path) => {
      acc[path] = (acc[path] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(pathCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([path]) => path);
  }
  
  // Helper method to calculate drop-off points
  private static calculateDropOffPoints(conversations: ConversationMetrics[]): string[] {
    const dropOffs = conversations
      .filter(conv => conv.messageCount < 5) // Short conversations
      .map(conv => conv.intents[conv.intents.length - 1] || 'greeting')
      .reduce((acc, stage) => {
        acc[stage] = (acc[stage] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
    
    return Object.entries(dropOffs)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([stage]) => stage);
  }
  
  // Export data for external analysis
  static exportData(format: 'json' | 'csv' = 'json'): string {
    if (format === 'json') {
      return JSON.stringify({
        conversations: this.conversations,
        events: this.events,
        analytics: this.generateAnalyticsReport()
      }, null, 2);
    }
    
    // CSV export (simplified)
    const headers = [
      'sessionId', 'startTime', 'endTime', 'duration', 'messageCount', 
      'language', 'leadScore', 'finalStage', 'conversionEvent'
    ];
    
    const csvData = this.conversations.map(conv => [
      conv.sessionId,
      conv.startTime,
      conv.endTime || '',
      conv.duration || 0,
      conv.messageCount,
      conv.language,
      conv.leadScore,
      conv.finalStage,
      conv.conversionEvent || 'none'
    ]);
    
    return [headers, ...csvData].map(row => row.join(',')).join('\n');
  }
  
  // Real-time metrics for dashboard
  static getRealTimeMetrics(): {
    activeSessions: number;
    messagesPerMinute: number;
    currentConversionRate: number;
    averageLeadScore: number;
  } {
    const now = Date.now();
    const oneHourAgo = now - 60 * 60 * 1000;
    const oneMinuteAgo = now - 60 * 1000;
    
    const recentConversations = this.conversations.filter(conv => 
      new Date(conv.startTime).getTime() > oneHourAgo
    );
    
    const recentEvents = this.events.filter(event => 
      new Date(event.timestamp).getTime() > oneMinuteAgo
    );
    
    const activeSessions = recentConversations.filter(conv => !conv.endTime).length;
    const messagesPerMinute = recentEvents.filter(event => 
      event.eventType === 'message_sent' || event.eventType === 'message_received'
    ).length;
    
    const conversions = recentConversations.filter(conv => 
      conv.conversionEvent && conv.conversionEvent !== 'none'
    ).length;
    const currentConversionRate = recentConversations.length > 0 ? 
      (conversions / recentConversations.length) * 100 : 0;
    
    const averageLeadScore = recentConversations.length > 0 ?
      recentConversations.reduce((sum, conv) => sum + conv.leadScore, 0) / recentConversations.length :
      0;
    
    return {
      activeSessions,
      messagesPerMinute,
      currentConversionRate,
      averageLeadScore
    };
  }
  
  // Privacy-compliant data cleanup
  static cleanupOldData(retentionDays: number = 90): void {
    const cutoffDate = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000);
    
    this.conversations = this.conversations.filter(conv => 
      new Date(conv.startTime) > cutoffDate
    );
    
    this.events = this.events.filter(event => 
      new Date(event.timestamp) > cutoffDate
    );
  }
  
  // Send data to external analytics service (placeholder)
  private static async sendToAnalyticsService(event: AnalyticsEvent): Promise<void> {
    try {
      // In production, this would send to services like:
      // - Google Analytics 4
      // - Mixpanel
      // - Amplitude
      // - Custom analytics endpoint
      
      if (typeof window !== 'undefined' && (window as any).gtag) {
        // Google Analytics 4 example
        (window as any).gtag('event', event.eventType, {
          event_category: 'chatbot',
          event_label: event.sessionId,
          custom_parameters: event.payload
        });
      }
      
      // Custom analytics endpoint
      if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
        await fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(event)
        });
      }
    } catch (error) {
      console.warn('Failed to send analytics event:', error);
    }
  }
}

// React hook for analytics integration
export const useChatbotAnalytics = () => {
  return {
    trackEvent: ChatbotAnalytics.trackEvent,
    trackMessage: ChatbotAnalytics.trackMessage,
    trackIntent: ChatbotAnalytics.trackIntent,
    startConversation: ChatbotAnalytics.startConversation,
    updateConversation: ChatbotAnalytics.updateConversation,
    endConversation: ChatbotAnalytics.endConversation,
    trackConversion: ChatbotAnalytics.trackConversion,
    generateReport: ChatbotAnalytics.generateAnalyticsReport,
    getRealTimeMetrics: ChatbotAnalytics.getRealTimeMetrics,
    exportData: ChatbotAnalytics.exportData
  };
};

// A/B testing support
export class ChatbotABTesting {
  private static experiments: Record<string, {
    name: string;
    variants: Record<string, any>;
    traffic: number; // percentage 0-100
    active: boolean;
  }> = {};
  
  static defineExperiment(
    experimentId: string,
    name: string,
    variants: Record<string, any>,
    traffic: number = 100
  ): void {
    this.experiments[experimentId] = {
      name,
      variants,
      traffic,
      active: true
    };
  }
  
  static getVariant(experimentId: string, sessionId: string): string | null {
    const experiment = this.experiments[experimentId];
    if (!experiment || !experiment.active) return null;
    
    // Simple hash-based assignment for consistent user experience
    const hash = this.hashString(sessionId + experimentId);
    const bucket = hash % 100;
    
    if (bucket >= experiment.traffic) return null;
    
    const variantNames = Object.keys(experiment.variants);
    const variantIndex = hash % variantNames.length;
    
    ChatbotAnalytics.trackEvent({
      eventType: 'message_received',
      sessionId,
      timestamp: new Date().toISOString(),
      payload: {
        experimentId,
        variant: variantNames[variantIndex],
        action: 'ab_test_assignment'
      }
    });
    
    return variantNames[variantIndex];
  }
  
  private static hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }
}

export default ChatbotAnalytics;