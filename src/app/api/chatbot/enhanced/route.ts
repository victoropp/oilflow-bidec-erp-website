import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { knowledgeBase, findKnowledgeItem, calculateResponseConfidence } from '@/lib/chatbot/knowledgeBase';
import { TranslationService, LanguageDetector, SupportedLanguage } from '@/lib/chatbot/languageService';
import ChatbotAnalytics from '@/lib/chatbot/analytics';
import EscalationService from '@/lib/chatbot/escalation';

// Enhanced validation schema
const enhancedChatMessageSchema = z.object({
  sessionId: z.string().min(1),
  message: z.string().min(1).max(2000),
  language: z.enum(['en', 'fr', 'ar', 'sw', 'ha']).optional(),
  context: z.object({
    userAgent: z.string().optional(),
    referrer: z.string().optional(),
    timestamp: z.string().optional(),
    geolocation: z.object({
      country: z.string().optional(),
      region: z.string().optional(),
      city: z.string().optional(),
    }).optional(),
    userProfile: z.object({
      name: z.string().optional(),
      company: z.string().optional(),
      email: z.string().optional(),
      phone: z.string().optional(),
    }).optional(),
  }).optional(),
  conversationHistory: z.array(z.object({
    id: z.string(),
    role: z.enum(['user', 'assistant']),
    content: z.string(),
    timestamp: z.string(),
    metadata: z.record(z.any()).optional(),
  })).optional().default([]),
  previousLeadScore: z.number().min(0).max(100).optional().default(0),
});

type EnhancedChatRequest = z.infer<typeof enhancedChatMessageSchema>;

// Advanced intent recognition with confidence scoring
function recognizeIntentAdvanced(
  message: string, 
  language: SupportedLanguage = 'en',
  conversationHistory: any[] = []
): { intent: string; confidence: number; entities: Record<string, any>; context: any } {
  const lowerMessage = message.toLowerCase();
  
  // Context from conversation history
  const previousIntents = conversationHistory
    .filter(msg => msg.metadata?.intent)
    .map(msg => msg.metadata.intent)
    .slice(-3); // Last 3 intents for context
  
  // Enhanced intent patterns with confidence scoring
  const intentPatterns = {
    demo_request: {
      patterns: ['demo', 'demonstration', 'show me', 'see how', 'trial', 'test', 'preview'],
      confidence: 0.95,
      context_boost: previousIntents.includes('product_inquiry') ? 0.1 : 0,
    },
    pricing_inquiry: {
      patterns: ['price', 'cost', 'pricing', 'expensive', 'cheap', 'budget', 'roi', 'investment', 'value'],
      confidence: 0.90,
      context_boost: previousIntents.includes('product_inquiry') ? 0.15 : 0,
    },
    product_inquiry: {
      patterns: ['product', 'feature', 'capability', 'solution', 'what does', 'how does', 'tell me about'],
      confidence: 0.85,
      context_boost: 0,
    },
    integration_inquiry: {
      patterns: ['integration', 'api', 'connect', 'interface', 'compatibility', 'integrate with'],
      confidence: 0.80,
      context_boost: previousIntents.includes('technical_inquiry') ? 0.1 : 0,
    },
    technical_inquiry: {
      patterns: ['technical', 'architecture', 'security', 'implementation', 'deployment', 'infrastructure'],
      confidence: 0.80,
      context_boost: 0,
    },
    support_inquiry: {
      patterns: ['support', 'help', 'assistance', 'training', 'service', 'maintenance'],
      confidence: 0.85,
      context_boost: 0,
    },
    complaint: {
      patterns: ['problem', 'issue', 'bug', 'error', 'not working', 'disappointed', 'frustrated'],
      confidence: 0.85,
      context_boost: 0,
    },
    greeting: {
      patterns: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'bonjour', 'salut'],
      confidence: 0.95,
      context_boost: conversationHistory.length === 0 ? 0.1 : -0.2,
    }
  };
  
  let bestMatch = { intent: 'general_inquiry', confidence: 0.3, entities: {}, context: {} };
  
  // Language-specific patterns
  if (language === 'fr') {
    const frenchPatterns = {
      demo_request: ['démonstration', 'démo', 'montrer', 'voir comment', 'essai', 'test'],
      pricing_inquiry: ['prix', 'coût', 'tarification', 'cher', 'budget', 'investissement'],
      product_inquiry: ['produit', 'fonctionnalité', 'capacité', 'solution', 'que fait', 'comment fait'],
      greeting: ['bonjour', 'salut', 'bonsoir']
    };
    
    Object.entries(frenchPatterns).forEach(([intent, patterns]) => {
      if (patterns.some(pattern => lowerMessage.includes(pattern))) {
        const basePattern = intentPatterns[intent as keyof typeof intentPatterns];
        if (basePattern) {
          const confidence = basePattern.confidence + basePattern.context_boost;
          if (confidence > bestMatch.confidence) {
            bestMatch = { intent, confidence, entities: {}, context: { language } };
          }
        }
      }
    });
  }
  
  // English and general patterns
  Object.entries(intentPatterns).forEach(([intent, config]) => {
    const matchCount = config.patterns.filter(pattern => 
      lowerMessage.includes(pattern.toLowerCase())
    ).length;
    
    if (matchCount > 0) {
      const confidence = Math.min(
        config.confidence + (matchCount - 1) * 0.05 + config.context_boost,
        1.0
      );
      
      if (confidence > bestMatch.confidence) {
        bestMatch = {
          intent,
          confidence,
          entities: extractEntities(message, intent),
          context: { matchedPatterns: config.patterns.filter(p => lowerMessage.includes(p)) }
        };
      }
    }
  });
  
  return bestMatch;
}

// Extract entities from message based on intent
function extractEntities(message: string, intent: string): Record<string, any> {
  const entities: Record<string, any> = {};
  const lowerMessage = message.toLowerCase();
  
  // Company/business size indicators
  const sizeIndicators = {
    small: ['small', 'startup', 'few employees', 'independent'],
    medium: ['medium', 'growing', '50-200', 'regional'],
    large: ['large', 'enterprise', 'multinational', 'global', '500+', 'Fortune']
  };
  
  Object.entries(sizeIndicators).forEach(([size, indicators]) => {
    if (indicators.some(indicator => lowerMessage.includes(indicator))) {
      entities.companySize = size;
    }
  });
  
  // Industry segments
  const segments = ['upstream', 'midstream', 'downstream', 'exploration', 'production', 'refining'];
  segments.forEach(segment => {
    if (lowerMessage.includes(segment)) {
      entities.segment = segment;
    }
  });
  
  // Geographic indicators
  const regions = ['africa', 'nigeria', 'ghana', 'angola', 'middle east', 'north africa'];
  regions.forEach(region => {
    if (lowerMessage.includes(region)) {
      entities.region = region;
    }
  });
  
  // Urgency indicators
  const urgencyWords = ['urgent', 'asap', 'immediately', 'soon', 'quickly'];
  if (urgencyWords.some(word => lowerMessage.includes(word))) {
    entities.urgency = 'high';
  }
  
  return entities;
}

// Advanced sentiment analysis
function analyzeSentiment(message: string, language: SupportedLanguage = 'en'): number {
  const positiveWords: Record<SupportedLanguage, string[]> = {
    en: ['good', 'great', 'excellent', 'amazing', 'helpful', 'thanks', 'perfect', 'love', 'awesome', 'fantastic'],
    fr: ['bon', 'bien', 'excellent', 'magnifique', 'merci', 'parfait', 'fantastique', 'super'],
    ar: ['جيد', 'ممتاز', 'رائع', 'شكرا', 'مثالي'],
    sw: ['nzuri', 'bora', 'mzuri', 'vizuri', 'asante'],
    ha: ['mai kyau', 'kyakkyawa', 'nagari', 'na gode'],
  };
  
  const negativeWords: Record<SupportedLanguage, string[]> = {
    en: ['bad', 'terrible', 'awful', 'hate', 'disappointed', 'frustrated', 'annoying', 'useless', 'poor'],
    fr: ['mauvais', 'terrible', 'nul', 'frustré', 'déçu', 'ennuyeux'],
    ar: ['سيء', 'فظيع', 'محبط', 'غاضب'],
    sw: ['mbaya', 'vibaya', 'uchungu', 'hasira'],
    ha: ['mugu', 'mummuna', 'ba kyau', 'bacin rai'],
  };
  
  const content = message.toLowerCase();
  const positive = positiveWords[language] || positiveWords.en;
  const negative = negativeWords[language] || negativeWords.en;
  
  let score = 0;
  positive.forEach(word => {
    if (content.includes(word)) score += 1;
  });
  negative.forEach(word => {
    if (content.includes(word)) score -= 1;
  });
  
  // Normalize to -1 to 1 range
  return Math.max(-1, Math.min(1, score / 3));
}

// Generate contextual response using knowledge base and language service
function generateContextualResponse(
  intent: string,
  entities: Record<string, any>,
  language: SupportedLanguage,
  conversationHistory: any[],
  leadScore: number
): string {
  // Try to find specific knowledge base item
  const supportedLanguage = (['en', 'fr'].includes(language)) ? language as 'en' | 'fr' : 'en';
  const knowledgeItem = findKnowledgeItem(intent, supportedLanguage);
  if (knowledgeItem) {
    return knowledgeItem.content[supportedLanguage] || knowledgeItem.content.en;
  }
  
  // Use translation service for common responses
  const response = TranslationService.getResponse(intent, language);
  if (response && response !== `[responses.${intent}]`) {
    return response;
  }
  
  // Contextual responses based on entities and conversation history
  if (intent === 'product_inquiry' && entities.segment) {
    const segmentResponses = {
      en: {
        upstream: "For upstream operations, OilFlow BIDEC ERP provides comprehensive exploration data management, drilling optimization, and production forecasting capabilities that have helped companies reduce operational costs by up to 30%.",
        midstream: "Our midstream solutions optimize pipeline operations, storage management, and transportation logistics, typically improving efficiency by 20-25% while maintaining strict safety standards.",
        downstream: "In downstream operations, our platform enhances refinery optimization, product quality control, and distribution management, with clients seeing 15-20% improvement in operational margins."
      },
      fr: {
        upstream: "Pour les opérations amont, OilFlow BIDEC ERP fournit une gestion complète des données d'exploration, l'optimisation du forage et des capacités de prévision de production qui ont aidé les entreprises à réduire les coûts opérationnels jusqu'à 30%.",
        midstream: "Nos solutions midstream optimisent les opérations de pipeline, la gestion du stockage et la logistique de transport, améliorant généralement l'efficacité de 20-25% tout en maintenant des normes de sécurité strictes.",
        downstream: "Dans les opérations aval, notre plateforme améliore l'optimisation des raffineries, le contrôle qualité des produits et la gestion de distribution, avec des clients voyant une amélioration de 15-20% des marges opérationnelles."
      }
    };
    
    const supportedLang = (['en', 'fr'].includes(language)) ? language as 'en' | 'fr' : 'en';
    const langResponses = segmentResponses[supportedLang] || segmentResponses.en;
    return langResponses[entities.segment as keyof typeof langResponses] || langResponses.upstream;
  }
  
  // High lead score personalized responses
  if (leadScore > 60 && intent === 'pricing_inquiry') {
    return language === 'fr' 
      ? "Étant donné votre fort intérêt pour nos solutions, j'aimerais vous mettre en contact directement avec notre équipe de vente pour discuter d'une proposition personnalisée qui correspond parfaitement à vos besoins et à votre budget."
      : "Given your strong interest in our solutions, I'd like to connect you directly with our sales team to discuss a customized proposal that perfectly fits your needs and budget.";
  }
  
  // Default fallback
  return TranslationService.getRandomGreeting(language);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = enhancedChatMessageSchema.parse(body);
    
    // Detect language if not provided
    const detectedLanguage = validatedData.language || LanguageDetector.detectLanguage(validatedData.message);
    
    // Start conversation tracking
    if (validatedData.conversationHistory.length === 0) {
      ChatbotAnalytics.startConversation(
        validatedData.sessionId,
        detectedLanguage,
        validatedData.context?.userAgent,
        validatedData.context?.referrer
      );
    }
    
    // Advanced intent recognition
    const { intent, confidence, entities, context } = recognizeIntentAdvanced(
      validatedData.message,
      detectedLanguage,
      validatedData.conversationHistory
    );
    
    // Analyze sentiment
    const sentiment = analyzeSentiment(validatedData.message, detectedLanguage);
    
    // Calculate updated lead score
    const leadScoreIncrease = calculateLeadScoreIncrease(intent, entities, confidence);
    const newLeadScore = Math.min(validatedData.previousLeadScore + leadScoreIncrease, 100);
    
    // Track message and intent
    ChatbotAnalytics.trackMessage(validatedData.sessionId, 'user', validatedData.message, {
      intent,
      confidence,
      entities,
      sentiment
    });
    ChatbotAnalytics.trackIntent(validatedData.sessionId, intent, confidence, entities);
    
    // Check for escalation triggers
    const escalationTriggers = EscalationService.shouldEscalate({
      sessionId: validatedData.sessionId,
      leadScore: newLeadScore,
      messageCount: validatedData.conversationHistory.length + 1,
      lastMessage: validatedData.message,
      conversationHistory: validatedData.conversationHistory,
      sentiment,
      intents: [intent],
      consecutiveFailures: 0 // Would track actual failures
    });
    
    let shouldEscalate = escalationTriggers.length > 0;
    let escalationMessage: string | undefined;
    
    if (shouldEscalate) {
      const rule = escalationTriggers[0];
      escalationMessage = rule.action.message[detectedLanguage] || rule.action.message.en;
      
      // Track escalation
      ChatbotAnalytics.trackConversion(validatedData.sessionId, 'escalated');
    }
    
    // Generate response
    let assistantResponse: string;
    
    if (confidence < 0.4) {
      // Use fallback response for low confidence
      const fallback = EscalationService.getFallbackResponse('low_confidence', detectedLanguage, confidence);
      if (fallback) {
        const responses = fallback.responses[detectedLanguage] || fallback.responses.en;
        assistantResponse = responses[Math.floor(Math.random() * responses.length)];
      } else {
        assistantResponse = TranslationService.getResponse('needMoreInfo', detectedLanguage);
      }
    } else {
      assistantResponse = generateContextualResponse(
        intent,
        entities,
        detectedLanguage,
        validatedData.conversationHistory,
        newLeadScore
      );
    }
    
    // Create response message
    const assistantMessage = {
      id: `assistant_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      role: 'assistant' as const,
      content: assistantResponse,
      timestamp: new Date().toISOString(),
      language: detectedLanguage,
      metadata: {
        intent,
        confidence,
        entities,
        leadScore: newLeadScore
      }
    };
    
    // Track assistant message
    ChatbotAnalytics.trackMessage(validatedData.sessionId, 'assistant', assistantResponse);
    
    // Update conversation metrics
    ChatbotAnalytics.updateConversation(validatedData.sessionId, {
      leadScore: newLeadScore,
      language: detectedLanguage,
      intents: Array.from(new Set([...validatedData.conversationHistory.map(m => m.metadata?.intent).filter(Boolean), intent]))
    });
    
    // Generate suggestions
    const suggestions = generateSmartSuggestions(intent, entities, detectedLanguage, newLeadScore);
    
    // Prepare comprehensive response
    const response = {
      success: true,
      message: assistantMessage,
      context: {
        sessionId: validatedData.sessionId,
        leadScore: newLeadScore,
        language: detectedLanguage,
        intent,
        confidence,
        entities,
        sentiment
      },
      suggestions,
      shouldEscalate,
      escalationMessage,
      escalationTriggers: escalationTriggers.map(t => ({
        trigger: t.trigger,
        priority: t.action.priority,
        channel: t.action.channel
      })),
      analytics: {
        realTimeMetrics: ChatbotAnalytics.getRealTimeMetrics()
      }
    };
    
    return NextResponse.json(response, { status: 200 });
    
  } catch (error) {
    console.error('Enhanced chatbot API error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid request format',
          errors: error.errors
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      {
        success: false,
        message: 'Chatbot service temporarily unavailable'
      },
      { status: 500 }
    );
  }
}

// Helper functions
function calculateLeadScoreIncrease(
  intent: string,
  entities: Record<string, any>,
  confidence: number
): number {
  const baseScores = {
    demo_request: 25,
    pricing_inquiry: 20,
    integration_inquiry: 15,
    technical_inquiry: 12,
    product_inquiry: 10,
    support_inquiry: 5,
    greeting: 2
  };
  
  let score = baseScores[intent as keyof typeof baseScores] || 0;
  
  // Confidence modifier
  score *= confidence;
  
  // Entity bonuses
  if (entities.companySize === 'large') score += 5;
  if (entities.urgency === 'high') score += 3;
  if (entities.segment) score += 2;
  
  return Math.round(score);
}

function generateSmartSuggestions(
  intent: string,
  entities: Record<string, any>,
  language: SupportedLanguage,
  leadScore: number
): string[] {
  const baseSuggestions = TranslationService.getQuickActions(language);
  
  // Contextual suggestions based on intent and lead score
  if (intent === 'product_inquiry' && leadScore > 50) {
    const contextualSuggestions = {
      en: ["Schedule a personalized demo", "Discuss pricing options", "See integration capabilities", "Talk to a specialist"],
      fr: ["Planifier une démo personnalisée", "Discuter des options tarifaires", "Voir les capacités d'intégration", "Parler à un spécialiste"]
    };
    const supportedLanguage = (['en', 'fr'].includes(language)) ? language as 'en' | 'fr' : 'en';
    return contextualSuggestions[supportedLanguage] || contextualSuggestions.en;
  }
  
  if (intent === 'pricing_inquiry') {
    const pricingSuggestions = {
      en: ["Get a custom quote", "See ROI calculator", "Schedule pricing call", "Compare packages"],
      fr: ["Obtenir un devis personnalisé", "Voir le calculateur de ROI", "Planifier un appel tarifaire", "Comparer les packages"]
    };
    return pricingSuggestions[language] || pricingSuggestions.en;
  }
  
  return baseSuggestions.slice(0, 4); // Return top 4 suggestions
}

export async function GET() {
  return NextResponse.json(
    {
      message: 'Enhanced OilFlow BIDEC ERP Chatbot API',
      version: '2.0.0',
      features: [
        'Advanced multi-language support (English, French, Arabic, Swahili, Hausa)',
        'Intelligent intent recognition with confidence scoring',
        'Context-aware conversation management',
        'Automated escalation and fallback handling',
        'Real-time analytics and lead scoring',
        'Sentiment analysis and personalization',
        'Knowledge base integration',
        'A/B testing support'
      ],
      endpoints: {
        POST: 'Send chat message and receive AI response with enhanced context'
      },
      analytics: ChatbotAnalytics.getRealTimeMetrics()
    },
    { status: 200 }
  );
}