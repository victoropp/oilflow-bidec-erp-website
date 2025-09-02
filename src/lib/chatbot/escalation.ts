// Intelligent escalation and fallback system for chatbot
// Handles situations where automated responses are insufficient

export type EscalationTrigger = 
  | 'high_lead_score'
  | 'repeated_questions' 
  | 'complex_technical_query'
  | 'pricing_discussion'
  | 'complaint_detected'
  | 'demo_request'
  | 'integration_details'
  | 'manual_request'
  | 'confusion_detected'
  | 'negative_sentiment';

export type EscalationChannel = 
  | 'live_chat'
  | 'phone_call'
  | 'email'
  | 'demo_booking'
  | 'technical_support'
  | 'sales_team';

export interface EscalationRule {
  id: string;
  trigger: EscalationTrigger;
  conditions: {
    leadScoreThreshold?: number;
    messageCountThreshold?: number;
    sentimentThreshold?: number;
    keywordPatterns?: string[];
    timeThreshold?: number; // minutes
    repeatThreshold?: number;
  };
  action: {
    channel: EscalationChannel;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    message: {
      en: string;
      fr: string;
      ar?: string;
      sw?: string;
      ha?: string;
    };
    data?: Record<string, any>;
  };
  active: boolean;
}

export interface FallbackResponse {
  id: string;
  trigger: 'low_confidence' | 'no_match' | 'error' | 'timeout';
  conditions: {
    confidenceThreshold?: number;
    consecutiveFailures?: number;
  };
  responses: {
    en: string[];
    fr: string[];
    ar?: string[];
    sw?: string[];
    ha?: string[];
  };
  followUp: {
    suggestions: {
      en: string[];
      fr: string[];
      ar?: string[];
      sw?: string[];
      ha?: string[];
    };
    escalationPrompt: boolean;
  };
}

export interface EscalationContext {
  sessionId: string;
  userId?: string;
  conversationSummary: string;
  userProfile?: {
    name?: string;
    company?: string;
    email?: string;
    phone?: string;
    interests?: string[];
  };
  conversationMetrics: {
    duration: number;
    messageCount: number;
    leadScore: number;
    intents: string[];
    sentiment: number;
  };
  triggeredRules: EscalationRule[];
  timestamp: string;
  language: string;
}

// Predefined escalation rules
const escalationRules: EscalationRule[] = [
  {
    id: 'high_value_lead',
    trigger: 'high_lead_score',
    conditions: {
      leadScoreThreshold: 75,
      messageCountThreshold: 3
    },
    action: {
      channel: 'live_chat',
      priority: 'high',
      message: {
        en: "I can see you're very interested in our solutions! I'd like to connect you with one of our petroleum ERP specialists who can provide more detailed information and answer any specific questions you might have. Would you prefer a live chat or a phone call?",
        fr: "Je vois que vous êtes très intéressé par nos solutions ! J'aimerais vous mettre en contact avec l'un de nos spécialistes ERP pétrolier qui peut fournir des informations plus détaillées et répondre à vos questions spécifiques. Préféreriez-vous un chat en direct ou un appel téléphonique ?",
        ar: "أرى أنك مهتم جداً بحلولنا! أود أن أربطك بأحد متخصصي تخطيط الموارد البترولية لدينا الذي يمكنه تقديم معلومات أكثر تفصيلاً والإجابة على أي أسئلة محددة قد تكون لديك. هل تفضل الدردشة المباشرة أم المكالمة الهاتفية؟",
        sw: "Naona una nia kubwa katika suluhisho zetu! Ningependa kukuunganisha na mmoja wa wataalamu wetu wa ERP ya petroli ambaye anaweza kutoa maelezo ya kina zaidi na kujibu maswali yoyote maalum unayoweza kuwa nayo. Je, ungependa mazungumzo ya moja kwa moja au simu?",
        ha: "Ina ganin kuna sha'awar sosai ga bayar da shawarwarinmu! Ina so in haɗa ku da ɗaya daga cikin kwararrun ERP na mai da gas wanda zai iya ba da cikakkun bayanai da amsa duk wasu tambayoyi na musamman da kuke da su. Za ku fi son tattaunawa kai tsaye ko kiran waya?"
      }
    },
    active: true
  },
  {
    id: 'demo_request_immediate',
    trigger: 'demo_request',
    conditions: {
      keywordPatterns: ['demo', 'demonstration', 'show me', 'see how', 'trial', 'test']
    },
    action: {
      channel: 'demo_booking',
      priority: 'high',
      message: {
        en: "Excellent! I'll help you schedule a personalized demonstration of OilFlow BIDEC ERP. A demo is the best way to see exactly how our solution can benefit your petroleum operations. Let me collect a few details to ensure we show you the most relevant features.",
        fr: "Excellent ! Je vais vous aider à planifier une démonstration personnalisée d'OilFlow BIDEC ERP. Une démonstration est la meilleure façon de voir exactement comment notre solution peut bénéficier à vos opérations pétrolières. Permettez-moi de recueillir quelques détails pour m'assurer que nous vous montrons les fonctionnalités les plus pertinentes."
      }
    },
    active: true
  },
  {
    id: 'pricing_escalation',
    trigger: 'pricing_discussion',
    conditions: {
      keywordPatterns: ['price', 'cost', 'pricing', 'budget', 'expensive', 'cheap', 'roi', 'investment'],
      messageCountThreshold: 2
    },
    action: {
      channel: 'sales_team',
      priority: 'high',
      message: {
        en: "I understand pricing is an important consideration for your decision. While I can provide general information about our value proposition, I'd like to connect you with our sales specialist who can discuss customized pricing based on your specific needs and provide detailed ROI calculations.",
        fr: "Je comprends que le prix est une considération importante pour votre décision. Bien que je puisse fournir des informations générales sur notre proposition de valeur, j'aimerais vous mettre en contact avec notre spécialiste des ventes qui peut discuter de la tarification personnalisée basée sur vos besoins spécifiques."
      }
    },
    active: true
  },
  {
    id: 'technical_complexity',
    trigger: 'complex_technical_query',
    conditions: {
      keywordPatterns: ['integration', 'api', 'architecture', 'security', 'compliance', 'implementation', 'migration'],
      messageCountThreshold: 3
    },
    action: {
      channel: 'technical_support',
      priority: 'medium',
      message: {
        en: "You're asking some great technical questions! I can provide high-level information, but for detailed technical discussions about integration, architecture, and implementation, I'd recommend connecting with our technical solutions architect who can dive deep into the specifics.",
        fr: "Vous posez d'excellentes questions techniques ! Je peux fournir des informations de haut niveau, mais pour des discussions techniques détaillées sur l'intégration, l'architecture et l'implémentation, je recommande de vous connecter avec notre architecte de solutions techniques."
      }
    },
    active: true
  },
  {
    id: 'negative_sentiment',
    trigger: 'negative_sentiment',
    conditions: {
      sentimentThreshold: -0.5,
      messageCountThreshold: 2
    },
    action: {
      channel: 'live_chat',
      priority: 'urgent',
      message: {
        en: "I sense some concerns in our conversation. I want to ensure we address any issues or questions you might have. Would you like to speak with one of our senior customer success managers who can better assist with your specific situation?",
        fr: "Je sens quelques préoccupations dans notre conversation. Je veux m'assurer que nous répondons à toutes les questions ou préoccupations que vous pourriez avoir. Souhaitez-vous parler avec l'un de nos gestionnaires de succès client senior qui peut mieux vous aider ?"
      }
    },
    active: true
  },
  {
    id: 'repeated_confusion',
    trigger: 'confusion_detected',
    conditions: {
      repeatThreshold: 3,
      timeThreshold: 10
    },
    action: {
      channel: 'live_chat',
      priority: 'medium',
      message: {
        en: "I notice we might not be connecting well on this topic. Sometimes it's easier to clarify things with a quick conversation. Would you like to chat with one of our specialists who can provide more personalized assistance?",
        fr: "Je remarque que nous ne nous connectons peut-être pas bien sur ce sujet. Parfois, il est plus facile de clarifier les choses avec une conversation rapide. Souhaitez-vous discuter avec l'un de nos spécialistes qui peut fournir une assistance plus personnalisée ?"
      }
    },
    active: true
  }
];

// Fallback responses for low confidence situations
const fallbackResponses: FallbackResponse[] = [
  {
    id: 'low_confidence_general',
    trigger: 'low_confidence',
    conditions: {
      confidenceThreshold: 0.3
    },
    responses: {
      en: [
        "I want to make sure I give you the most accurate information. Could you help me understand what you're looking for by asking your question in a different way?",
        "I'm not entirely sure about that specific aspect. To provide you with the best answer, could you rephrase your question or provide more details?",
        "That's an interesting question! To give you the most relevant information, could you tell me a bit more about what you're trying to accomplish?"
      ],
      fr: [
        "Je veux m'assurer de vous donner les informations les plus précises. Pourriez-vous m'aider à comprendre ce que vous cherchez en posant votre question différemment ?",
        "Je ne suis pas entièrement sûr de cet aspect spécifique. Pour vous fournir la meilleure réponse, pourriez-vous reformuler votre question ou fournir plus de détails ?",
        "C'est une question intéressante ! Pour vous donner les informations les plus pertinentes, pourriez-vous me dire un peu plus sur ce que vous essayez d'accomplir ?"
      ]
    },
    followUp: {
      suggestions: {
        en: [
          "Tell me about your petroleum operations",
          "What challenges are you facing?",
          "How can we help optimize your business?",
          "Would you like to see a demo?"
        ],
        fr: [
          "Parlez-moi de vos opérations pétrolières",
          "Quels défis rencontrez-vous ?",
          "Comment pouvons-nous aider à optimiser votre entreprise ?",
          "Souhaiteriez-vous voir une démonstration ?"
        ]
      },
      escalationPrompt: false
    }
  },
  {
    id: 'no_match_found',
    trigger: 'no_match',
    conditions: {},
    responses: {
      en: [
        "I don't have specific information about that topic in my current knowledge base. However, I can connect you with one of our experts who can provide detailed answers to your question.",
        "That's outside my area of expertise, but I know someone who can help! Would you like me to arrange for you to speak with one of our petroleum industry specialists?",
        "I want to ensure you get the most comprehensive answer to that question. Let me connect you with someone who specializes in that area."
      ],
      fr: [
        "Je n'ai pas d'informations spécifiques sur ce sujet dans ma base de connaissances actuelle. Cependant, je peux vous mettre en contact avec l'un de nos experts qui peut fournir des réponses détaillées à votre question.",
        "C'est en dehors de mon domaine d'expertise, mais je connais quelqu'un qui peut aider ! Souhaitez-vous que j'organise pour vous de parler avec l'un de nos spécialistes de l'industrie pétrolière ?",
        "Je veux m'assurer que vous obtenez la réponse la plus complète à cette question. Permettez-moi de vous mettre en contact avec quelqu'un qui se spécialise dans ce domaine."
      ]
    },
    followUp: {
      suggestions: {
        en: [
          "Speak with an expert",
          "Schedule a consultation",
          "Get technical details",
          "Request more information"
        ],
        fr: [
          "Parler avec un expert",
          "Planifier une consultation",
          "Obtenir des détails techniques",
          "Demander plus d'informations"
        ]
      },
      escalationPrompt: true
    }
  }
];

// Main escalation service
export class EscalationService {
  private static rules = escalationRules;
  private static fallbacks = fallbackResponses;
  
  // Check if escalation should be triggered
  static shouldEscalate(context: {
    sessionId: string;
    leadScore: number;
    messageCount: number;
    lastMessage: string;
    conversationHistory: any[];
    sentiment: number;
    intents: string[];
    consecutiveFailures: number;
  }): EscalationRule[] {
    const triggeredRules: EscalationRule[] = [];
    
    for (const rule of this.rules) {
      if (!rule.active) continue;
      
      let shouldTrigger = false;
      
      switch (rule.trigger) {
        case 'high_lead_score':
          shouldTrigger = context.leadScore >= (rule.conditions.leadScoreThreshold || 75) &&
                         context.messageCount >= (rule.conditions.messageCountThreshold || 3);
          break;
          
        case 'demo_request':
          shouldTrigger = this.matchesKeywords(context.lastMessage, rule.conditions.keywordPatterns || []);
          break;
          
        case 'pricing_discussion':
          shouldTrigger = this.matchesKeywords(context.lastMessage, rule.conditions.keywordPatterns || []) &&
                         context.messageCount >= (rule.conditions.messageCountThreshold || 2);
          break;
          
        case 'complex_technical_query':
          shouldTrigger = this.matchesKeywords(context.lastMessage, rule.conditions.keywordPatterns || []) &&
                         context.messageCount >= (rule.conditions.messageCountThreshold || 3);
          break;
          
        case 'negative_sentiment':
          shouldTrigger = context.sentiment <= (rule.conditions.sentimentThreshold || -0.5) &&
                         context.messageCount >= (rule.conditions.messageCountThreshold || 2);
          break;
          
        case 'confusion_detected':
          shouldTrigger = context.consecutiveFailures >= (rule.conditions.repeatThreshold || 3);
          break;
      }
      
      if (shouldTrigger) {
        triggeredRules.push(rule);
      }
    }
    
    return triggeredRules;
  }
  
  // Get fallback response for low confidence situations
  static getFallbackResponse(
    trigger: 'low_confidence' | 'no_match' | 'error' | 'timeout',
    language: string = 'en',
    confidence: number = 0
  ): FallbackResponse | null {
    const fallback = this.fallbacks.find(f => {
      if (f.trigger !== trigger) return false;
      
      if (trigger === 'low_confidence' && f.conditions.confidenceThreshold) {
        return confidence <= f.conditions.confidenceThreshold;
      }
      
      return true;
    });
    
    return fallback || null;
  }
  
  // Create escalation context for handoff
  static createEscalationContext(
    sessionId: string,
    conversationHistory: any[],
    userProfile: any,
    triggeredRules: EscalationRule[],
    language: string = 'en'
  ): EscalationContext {
    // Generate conversation summary
    const summary = this.generateConversationSummary(conversationHistory, language);
    
    // Calculate metrics
    const duration = conversationHistory.length > 0 ? 
      (Date.now() - new Date(conversationHistory[0].timestamp).getTime()) / 1000 : 0;
    
    const intents = conversationHistory
      .filter(msg => msg.metadata?.intent)
      .map(msg => msg.metadata.intent);
    
    return {
      sessionId,
      conversationSummary: summary,
      userProfile,
      conversationMetrics: {
        duration,
        messageCount: conversationHistory.length,
        leadScore: 0, // Would be calculated from conversation
        intents: Array.from(new Set(intents)),
        sentiment: 0 // Would be calculated
      },
      triggeredRules,
      timestamp: new Date().toISOString(),
      language
    };
  }
  
  // Generate human-readable conversation summary
  private static generateConversationSummary(
    conversationHistory: any[],
    language: string
  ): string {
    const userMessages = conversationHistory
      .filter(msg => msg.role === 'user')
      .slice(-5) // Last 5 user messages
      .map(msg => msg.content);
    
    const templates = {
      en: `User conversation summary:
- Main topics discussed: {topics}
- Key questions asked: {questions}
- User interest level: {interest}
- Technical focus areas: {technical}`,
      fr: `Résumé de la conversation utilisateur:
- Principaux sujets discutés: {topics}
- Questions clés posées: {questions}  
- Niveau d'intérêt de l'utilisateur: {interest}
- Domaines techniques de focus: {technical}`
    };
    
    const template = templates[language as keyof typeof templates] || templates.en;
    
    // Simple topic extraction (in production, use NLP)
    const topics = this.extractTopics(userMessages);
    const questions = userMessages.filter(msg => msg.includes('?'));
    
    return template
      .replace('{topics}', topics.join(', '))
      .replace('{questions}', questions.slice(0, 3).join(' | '))
      .replace('{interest}', 'High') // Would be calculated
      .replace('{technical}', 'Integration, Implementation'); // Would be extracted
  }
  
  // Extract conversation topics
  private static extractTopics(messages: string[]): string[] {
    const topicKeywords = {
      'Product Information': ['product', 'feature', 'capability', 'solution'],
      'Pricing': ['price', 'cost', 'pricing', 'budget', 'roi'],
      'Integration': ['integration', 'api', 'connect', 'interface'],
      'Demo': ['demo', 'demonstration', 'show', 'trial'],
      'Support': ['support', 'help', 'assistance', 'training'],
      'Technical': ['technical', 'architecture', 'security', 'implementation']
    };
    
    const foundTopics: string[] = [];
    const allMessages = messages.join(' ').toLowerCase();
    
    Object.entries(topicKeywords).forEach(([topic, keywords]) => {
      if (keywords.some(keyword => allMessages.includes(keyword))) {
        foundTopics.push(topic);
      }
    });
    
    return foundTopics.length > 0 ? foundTopics : ['General Inquiry'];
  }
  
  // Check if message matches keyword patterns
  private static matchesKeywords(message: string, patterns: string[]): boolean {
    const lowerMessage = message.toLowerCase();
    return patterns.some(pattern => lowerMessage.includes(pattern.toLowerCase()));
  }
  
  // Process escalation request
  static async processEscalation(
    context: EscalationContext,
    preferredChannel?: EscalationChannel
  ): Promise<{
    success: boolean;
    escalationId: string;
    channel: EscalationChannel;
    estimatedWaitTime?: number;
    message: string;
  }> {
    // Simulate escalation processing
    const escalationId = `escalation_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    
    // Determine best channel based on rules and preference
    const channel = preferredChannel || this.determineBestChannel(context);
    
    // Simulate different wait times based on channel
    const waitTimes = {
      live_chat: 2,
      phone_call: 5,
      email: 60,
      demo_booking: 1440, // 24 hours
      technical_support: 30,
      sales_team: 15
    };
    
    const message = this.getEscalationMessage(channel, context.language);
    
    // Log escalation for analytics
    this.logEscalation(context, channel, escalationId);
    
    return {
      success: true,
      escalationId,
      channel,
      estimatedWaitTime: waitTimes[channel],
      message
    };
  }
  
  // Determine the best escalation channel based on context
  private static determineBestChannel(context: EscalationContext): EscalationChannel {
    // High priority rules first
    const urgentRules = context.triggeredRules.filter(r => r.action.priority === 'urgent');
    if (urgentRules.length > 0) {
      return urgentRules[0].action.channel;
    }
    
    // High priority rules
    const highPriorityRules = context.triggeredRules.filter(r => r.action.priority === 'high');
    if (highPriorityRules.length > 0) {
      return highPriorityRules[0].action.channel;
    }
    
    // Default based on lead score
    if (context.conversationMetrics.leadScore > 75) {
      return 'sales_team';
    }
    
    return 'live_chat';
  }
  
  // Get appropriate escalation message
  private static getEscalationMessage(channel: EscalationChannel, language: string): string {
    const messages = {
      live_chat: {
        en: "I'm connecting you with one of our specialists now. They'll be with you shortly!",
        fr: "Je vous mets en contact avec l'un de nos spécialistes maintenant. Ils seront avec vous sous peu !"
      },
      phone_call: {
        en: "I'll arrange for one of our experts to call you within the next few minutes. Please ensure your phone is available.",
        fr: "Je vais organiser pour qu'un de nos experts vous appelle dans les prochaines minutes. Assurez-vous que votre téléphone est disponible."
      },
      demo_booking: {
        en: "Perfect! I'm redirecting you to our demo booking system where you can choose a convenient time.",
        fr: "Parfait ! Je vous redirige vers notre système de réservation de démonstration où vous pouvez choisir un moment convenable."
      },
      sales_team: {
        en: "I'm connecting you with our sales team who can provide detailed pricing and ROI information.",
        fr: "Je vous mets en contact avec notre équipe de vente qui peut fournir des informations détaillées sur les prix et le ROI."
      },
      technical_support: {
        en: "I'm escalating you to our technical team who can dive deep into the implementation details.",
        fr: "Je vous transfère à notre équipe technique qui peut approfondir les détails d'implémentation."
      }
    };
    
    return messages[channel as keyof typeof messages]?.[language as 'en' | 'fr'] ||
           messages[channel as keyof typeof messages]?.en ||
           "I'm connecting you with the right specialist.";
  }
  
  // Log escalation for analytics
  private static logEscalation(
    context: EscalationContext,
    channel: EscalationChannel,
    escalationId: string
  ): void {
    console.log('Escalation logged:', {
      escalationId,
      sessionId: context.sessionId,
      channel,
      leadScore: context.conversationMetrics.leadScore,
      duration: context.conversationMetrics.duration,
      triggeredRules: context.triggeredRules.map(r => r.id),
      timestamp: context.timestamp
    });
  }
  
  // Add custom escalation rule
  static addEscalationRule(rule: EscalationRule): void {
    this.rules.push(rule);
  }
  
  // Get active escalation rules
  static getEscalationRules(): EscalationRule[] {
    return this.rules.filter(r => r.active);
  }
}

export default EscalationService;