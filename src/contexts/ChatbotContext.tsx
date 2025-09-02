'use client';

import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';

// Types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  language?: string;
  metadata?: {
    intent?: string;
    confidence?: number;
    entities?: Record<string, any>;
  };
}

export interface UserProfile {
  name?: string;
  company?: string;
  role?: string;
  email?: string;
  phone?: string;
  interests?: string[];
  previousQuestions?: string[];
  visitHistory?: {
    pages: string[];
    timeOnSite: number;
    referrer?: string;
  };
}

export interface ConversationContext {
  sessionId: string;
  userId?: string;
  language: 'en' | 'fr';
  stage: 'greeting' | 'information' | 'qualification' | 'demo_interest' | 'escalation' | 'closing';
  userProfile?: UserProfile;
  leadScore: number;
  conversationHistory: ChatMessage[];
  isActive: boolean;
  startedAt: string;
  lastActivity: string;
  totalInteractions: number;
  averageResponseTime?: number;
  sentimentScore?: number;
}

export interface ChatbotState {
  conversations: Record<string, ConversationContext>;
  activeSessionId?: string;
  isInitialized: boolean;
  settings: {
    enableAnalytics: boolean;
    enablePersonalization: boolean;
    maxHistoryLength: number;
    sessionTimeout: number; // milliseconds
  };
}

// Action types
type ChatbotAction = 
  | { type: 'INITIALIZE_SESSION'; payload: { sessionId: string; language?: 'en' | 'fr' } }
  | { type: 'ADD_MESSAGE'; payload: { sessionId: string; message: ChatMessage } }
  | { type: 'UPDATE_CONTEXT'; payload: { sessionId: string; updates: Partial<ConversationContext> } }
  | { type: 'UPDATE_USER_PROFILE'; payload: { sessionId: string; profile: Partial<UserProfile> } }
  | { type: 'SET_ACTIVE_SESSION'; payload: string }
  | { type: 'END_SESSION'; payload: string }
  | { type: 'CLEAR_HISTORY'; payload: string }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<ChatbotState['settings']> }
  | { type: 'CLEANUP_EXPIRED_SESSIONS' };

// Initial state
const initialState: ChatbotState = {
  conversations: {},
  isInitialized: false,
  settings: {
    enableAnalytics: true,
    enablePersonalization: true,
    maxHistoryLength: 50,
    sessionTimeout: 30 * 60 * 1000, // 30 minutes
  },
};

// Reducer
const chatbotReducer = (state: ChatbotState, action: ChatbotAction): ChatbotState => {
  switch (action.type) {
    case 'INITIALIZE_SESSION': {
      const { sessionId, language = 'en' } = action.payload;
      const now = new Date().toISOString();
      
      const newConversation: ConversationContext = {
        sessionId,
        language,
        stage: 'greeting',
        leadScore: 0,
        conversationHistory: [],
        isActive: true,
        startedAt: now,
        lastActivity: now,
        totalInteractions: 0,
      };

      return {
        ...state,
        conversations: {
          ...state.conversations,
          [sessionId]: newConversation,
        },
        activeSessionId: sessionId,
        isInitialized: true,
      };
    }

    case 'ADD_MESSAGE': {
      const { sessionId, message } = action.payload;
      const conversation = state.conversations[sessionId];
      
      if (!conversation) return state;

      const updatedHistory = [...conversation.conversationHistory, message];
      
      // Limit history length
      const limitedHistory = updatedHistory.length > state.settings.maxHistoryLength
        ? updatedHistory.slice(-state.settings.maxHistoryLength)
        : updatedHistory;

      // Calculate average response time for assistant messages
      let averageResponseTime = conversation.averageResponseTime;
      if (message.role === 'assistant' && conversation.conversationHistory.length > 0) {
        const lastUserMessage = [...conversation.conversationHistory]
          .reverse()
          .find(msg => msg.role === 'user');
        
        if (lastUserMessage) {
          const responseTime = new Date(message.timestamp).getTime() - 
                              new Date(lastUserMessage.timestamp).getTime();
          averageResponseTime = conversation.averageResponseTime 
            ? (conversation.averageResponseTime + responseTime) / 2
            : responseTime;
        }
      }

      return {
        ...state,
        conversations: {
          ...state.conversations,
          [sessionId]: {
            ...conversation,
            conversationHistory: limitedHistory,
            lastActivity: new Date().toISOString(),
            totalInteractions: conversation.totalInteractions + 1,
            averageResponseTime,
          },
        },
      };
    }

    case 'UPDATE_CONTEXT': {
      const { sessionId, updates } = action.payload;
      const conversation = state.conversations[sessionId];
      
      if (!conversation) return state;

      return {
        ...state,
        conversations: {
          ...state.conversations,
          [sessionId]: {
            ...conversation,
            ...updates,
            lastActivity: new Date().toISOString(),
          },
        },
      };
    }

    case 'UPDATE_USER_PROFILE': {
      const { sessionId, profile } = action.payload;
      const conversation = state.conversations[sessionId];
      
      if (!conversation) return state;

      return {
        ...state,
        conversations: {
          ...state.conversations,
          [sessionId]: {
            ...conversation,
            userProfile: {
              ...conversation.userProfile,
              ...profile,
            },
            lastActivity: new Date().toISOString(),
          },
        },
      };
    }

    case 'SET_ACTIVE_SESSION': {
      return {
        ...state,
        activeSessionId: action.payload,
      };
    }

    case 'END_SESSION': {
      const sessionId = action.payload;
      const conversation = state.conversations[sessionId];
      
      if (!conversation) return state;

      return {
        ...state,
        conversations: {
          ...state.conversations,
          [sessionId]: {
            ...conversation,
            isActive: false,
            lastActivity: new Date().toISOString(),
          },
        },
        activeSessionId: state.activeSessionId === sessionId ? undefined : state.activeSessionId,
      };
    }

    case 'CLEAR_HISTORY': {
      const sessionId = action.payload;
      const conversation = state.conversations[sessionId];
      
      if (!conversation) return state;

      return {
        ...state,
        conversations: {
          ...state.conversations,
          [sessionId]: {
            ...conversation,
            conversationHistory: [],
            totalInteractions: 0,
            lastActivity: new Date().toISOString(),
          },
        },
      };
    }

    case 'UPDATE_SETTINGS': {
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload,
        },
      };
    }

    case 'CLEANUP_EXPIRED_SESSIONS': {
      const now = Date.now();
      const { sessionTimeout } = state.settings;
      
      const cleanedConversations = Object.entries(state.conversations).reduce(
        (acc, [sessionId, conversation]) => {
          const lastActivityTime = new Date(conversation.lastActivity).getTime();
          const isExpired = now - lastActivityTime > sessionTimeout;
          
          if (!isExpired) {
            acc[sessionId] = conversation;
          }
          
          return acc;
        },
        {} as Record<string, ConversationContext>
      );

      return {
        ...state,
        conversations: cleanedConversations,
        activeSessionId: cleanedConversations[state.activeSessionId || ''] 
          ? state.activeSessionId 
          : undefined,
      };
    }

    default:
      return state;
  }
};

// Context
const ChatbotContext = createContext<{
  state: ChatbotState;
  dispatch: React.Dispatch<ChatbotAction>;
  // Helper functions
  initializeSession: (language?: 'en' | 'fr') => string;
  addMessage: (sessionId: string, message: ChatMessage) => void;
  updateContext: (sessionId: string, updates: Partial<ConversationContext>) => void;
  updateUserProfile: (sessionId: string, profile: Partial<UserProfile>) => void;
  setActiveSession: (sessionId: string) => void;
  endSession: (sessionId: string) => void;
  clearHistory: (sessionId: string) => void;
  getActiveConversation: () => ConversationContext | undefined;
  getConversation: (sessionId: string) => ConversationContext | undefined;
  calculateSentiment: (messages: ChatMessage[]) => number;
  generateAnalytics: () => any;
} | undefined>(undefined);

// Provider component
export const ChatbotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(chatbotReducer, initialState);

  // Helper functions
  const initializeSession = useCallback((language: 'en' | 'fr' = 'en'): string => {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    dispatch({ type: 'INITIALIZE_SESSION', payload: { sessionId, language } });
    return sessionId;
  }, []);

  const addMessage = useCallback((sessionId: string, message: ChatMessage) => {
    dispatch({ type: 'ADD_MESSAGE', payload: { sessionId, message } });
  }, []);

  const updateContext = useCallback((sessionId: string, updates: Partial<ConversationContext>) => {
    dispatch({ type: 'UPDATE_CONTEXT', payload: { sessionId, updates } });
  }, []);

  const updateUserProfile = useCallback((sessionId: string, profile: Partial<UserProfile>) => {
    dispatch({ type: 'UPDATE_USER_PROFILE', payload: { sessionId, profile } });
  }, []);

  const setActiveSession = useCallback((sessionId: string) => {
    dispatch({ type: 'SET_ACTIVE_SESSION', payload: sessionId });
  }, []);

  const endSession = useCallback((sessionId: string) => {
    dispatch({ type: 'END_SESSION', payload: sessionId });
  }, []);

  const clearHistory = useCallback((sessionId: string) => {
    dispatch({ type: 'CLEAR_HISTORY', payload: sessionId });
  }, []);

  const getActiveConversation = useCallback((): ConversationContext | undefined => {
    return state.activeSessionId ? state.conversations[state.activeSessionId] : undefined;
  }, [state.activeSessionId, state.conversations]);

  const getConversation = useCallback((sessionId: string): ConversationContext | undefined => {
    return state.conversations[sessionId];
  }, [state.conversations]);

  // Simple sentiment analysis (in production, use a proper sentiment analysis service)
  const calculateSentiment = useCallback((messages: ChatMessage[]): number => {
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'helpful', 'thanks', 'perfect', 'love', 'awesome'];
    const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'disappointed', 'frustrated', 'annoying', 'useless'];
    
    let score = 0;
    messages.forEach(message => {
      if (message.role === 'user') {
        const content = message.content.toLowerCase();
        positiveWords.forEach(word => {
          if (content.includes(word)) score += 1;
        });
        negativeWords.forEach(word => {
          if (content.includes(word)) score -= 1;
        });
      }
    });
    
    return Math.max(-1, Math.min(1, score / Math.max(1, messages.length)));
  }, []);

  // Generate analytics data
  const generateAnalytics = useCallback(() => {
    const conversations = Object.values(state.conversations);
    const activeConversations = conversations.filter(conv => conv.isActive);
    
    const totalSessions = conversations.length;
    const activeSessions = activeConversations.length;
    const totalMessages = conversations.reduce((sum, conv) => sum + conv.conversationHistory.length, 0);
    const averageMessagesPerSession = totalSessions > 0 ? totalMessages / totalSessions : 0;
    const averageLeadScore = conversations.length > 0 
      ? conversations.reduce((sum, conv) => sum + conv.leadScore, 0) / conversations.length 
      : 0;
    
    // Language distribution
    const languageDistribution = conversations.reduce((acc, conv) => {
      acc[conv.language] = (acc[conv.language] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Stage distribution
    const stageDistribution = conversations.reduce((acc, conv) => {
      acc[conv.stage] = (acc[conv.stage] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // High-value leads
    const highValueLeads = conversations.filter(conv => conv.leadScore >= 70);
    
    return {
      totalSessions,
      activeSessions,
      totalMessages,
      averageMessagesPerSession,
      averageLeadScore,
      languageDistribution,
      stageDistribution,
      highValueLeads: highValueLeads.length,
      conversionRate: totalSessions > 0 ? (highValueLeads.length / totalSessions) * 100 : 0,
      timestamp: new Date().toISOString(),
    };
  }, [state.conversations]);

  // Cleanup expired sessions
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'CLEANUP_EXPIRED_SESSIONS' });
    }, 5 * 60 * 1000); // Check every 5 minutes

    return () => clearInterval(interval);
  }, []);

  // Persist state to localStorage (optional)
  useEffect(() => {
    if (state.isInitialized && state.settings.enablePersonalization) {
      const persistedState = {
        conversations: state.conversations,
        settings: state.settings,
      };
      localStorage.setItem('chatbot_state', JSON.stringify(persistedState));
    }
  }, [state, state.isInitialized]);

  // Load state from localStorage on initialization
  useEffect(() => {
    try {
      const persistedState = localStorage.getItem('chatbot_state');
      if (persistedState && !state.isInitialized) {
        const parsed = JSON.parse(persistedState);
        if (parsed.conversations) {
          Object.entries(parsed.conversations).forEach(([sessionId, conversation]) => {
            dispatch({ 
              type: 'UPDATE_CONTEXT', 
              payload: { 
                sessionId, 
                updates: { 
                  ...(conversation as ConversationContext),
                  isActive: false // Mark all persisted sessions as inactive
                } 
              } 
            });
          });
        }
        if (parsed.settings) {
          dispatch({ type: 'UPDATE_SETTINGS', payload: parsed.settings });
        }
      }
    } catch (error) {
      console.warn('Failed to load chatbot state from localStorage:', error);
    }
  }, [state.isInitialized]);

  const value = {
    state,
    dispatch,
    initializeSession,
    addMessage,
    updateContext,
    updateUserProfile,
    setActiveSession,
    endSession,
    clearHistory,
    getActiveConversation,
    getConversation,
    calculateSentiment,
    generateAnalytics,
  };

  return (
    <ChatbotContext.Provider value={value}>
      {children}
    </ChatbotContext.Provider>
  );
};

// Hook to use the chatbot context
export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};

// Export context for advanced usage
export { ChatbotContext };