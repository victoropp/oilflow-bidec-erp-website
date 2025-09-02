import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { knowledgeBase, findKnowledgeItem, calculateResponseConfidence } from '@/lib/chatbot/knowledgeBase';
import { TranslationService, LanguageDetector, SupportedLanguage } from '@/lib/chatbot/languageService';
import ChatbotAnalytics from '@/lib/chatbot/analytics';
import EscalationService from '@/lib/chatbot/escalation';

// Types for chatbot conversation
interface ConversationMessage {
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

interface ConversationContext {
  sessionId: string;
  userId?: string;
  language: string;
  stage: 'greeting' | 'information' | 'qualification' | 'escalation' | 'closing';
  userProfile?: {
    name?: string;
    company?: string;
    role?: string;
    interests?: string[];
    previousQuestions?: string[];
  };
  leadScore: number;
  conversationHistory: ConversationMessage[];
}

// Validation schema
const chatMessageSchema = z.object({
  sessionId: z.string().min(1),
  message: z.string().min(1).max(1000),
  language: z.string().optional().default('en'),
  context: z.object({
    userAgent: z.string().optional(),
    referrer: z.string().optional(),
    timestamp: z.string().optional(),
  }).optional(),
});

// Local knowledge base for responses
const localKnowledgeBase = {
  greeting: {
    en: [
      "Hello! I'm Alex, your OilFlow BIDEC ERP assistant. I'm here to help you discover how our comprehensive ERP solution can transform your petroleum operations. What specific challenges are you facing in your business?",
      "Welcome to OilFlow BIDEC ERP! I'm Alex, and I specialize in helping petroleum companies optimize their operations. What brings you here today?",
      "Hi there! I'm Alex from OilFlow BIDEC ERP. I'm excited to help you learn about our industry-leading petroleum ERP solutions. What would you like to know?"
    ],
    fr: [
      "Bonjour ! Je suis Alex, votre assistant OilFlow BIDEC ERP. Je suis là pour vous aider à découvrir comment notre solution ERP complète peut transformer vos opérations pétrolières. Quels défis spécifiques rencontrez-vous dans votre entreprise ?",
      "Bienvenue chez OilFlow BIDEC ERP ! Je suis Alex, et je me spécialise dans l'aide aux compagnies pétrolières pour optimiser leurs opérations. Qu'est-ce qui vous amène ici aujourd'hui ?",
      "Salut ! Je suis Alex d'OilFlow BIDEC ERP. Je suis ravi de vous aider à découvrir nos solutions ERP pétrolières leader sur le marché. Que souhaitez-vous savoir ?"
    ]
  },
  
  productInfo: {
    upstream: {
      en: "Our upstream solutions cover exploration data management, drilling operations optimization, production forecasting, and field development planning. We help companies reduce operational costs by up to 25% while improving production efficiency.",
      fr: "Nos solutions amont couvrent la gestion des données d'exploration, l'optimisation des opérations de forage, les prévisions de production et la planification du développement des champs. Nous aidons les entreprises à réduire les coûts opérationnels jusqu'à 25% tout en améliorant l'efficacité de production."
    },
    midstream: {
      en: "Our midstream capabilities include pipeline monitoring, storage optimization, transportation logistics, and regulatory compliance management. Companies typically see 20% improvement in logistics efficiency.",
      fr: "Nos capacités midstream incluent la surveillance des pipelines, l'optimisation du stockage, la logistique de transport et la gestion de la conformité réglementaire. Les entreprises constatent généralement 20% d'amélioration de l'efficacité logistique."
    },
    downstream: {
      en: "For downstream operations, we offer refinery optimization, product quality management, distribution planning, and retail operations support. Our clients achieve significantly better margins.",
      fr: "Pour les opérations aval, nous offrons l'optimisation des raffineries, la gestion de la qualité des produits, la planification de distribution et le support des opérations de vente au détail. Nos clients obtiennent en moyenne 15% de meilleures marges."
    }
  },

  pricing: {
    en: "Our pricing is based on your specific needs and company size. We offer flexible subscription models starting from enterprise packages. Our clients typically see exceptional ROI with rapid payback periods. Would you like me to connect you with our sales team for a customized quote?",
    fr: "Notre tarification est basée sur vos besoins spécifiques et la taille de votre entreprise. Nous offrons des modèles d'abonnement flexibles commençant par des packages entreprise. Nos clients obtiennent généralement un ROI exceptionnel avec des périodes de récupération rapides. Souhaitez-vous que je vous mette en contact avec notre équipe de vente pour un devis personnalisé ?"
  },

  integration: {
    en: "OilFlow BIDEC ERP integrates seamlessly with major petroleum industry systems including SCADA, enterprise systems, and various IoT platforms. Our API-first architecture ensures smooth data flow across your entire tech stack.",
    fr: "OilFlow BIDEC ERP s'intègre parfaitement avec les principaux systèmes de l'industrie pétrolière incluant SCADA, systèmes d'entreprise et diverses plateformes IoT. Notre architecture API-first assure un flux de données fluide dans toute votre pile technologique."
  },

  support: {
    en: "We provide 24/7 technical support with dedicated account managers for enterprise clients. Our support includes training, implementation assistance, and ongoing optimization consulting. Average response time is under 2 hours.",
    fr: "Nous fournissons un support technique 24/7 avec des gestionnaires de compte dédiés pour les clients entreprise. Notre support inclut la formation, l'assistance à l'implémentation et le conseil d'optimisation continu. Le temps de réponse moyen est de moins de 2 heures."
  }
};

// Intent recognition (simplified for demo - in production use ML/AI service)
function recognizeIntent(message: string, language: string = 'en'): { intent: string; confidence: number; entities: Record<string, any> } {
  const lowercaseMessage = message.toLowerCase();
  
  // Product-related intents
  if (lowercaseMessage.includes('product') || lowercaseMessage.includes('feature') || lowercaseMessage.includes('capability')) {
    return { intent: 'product_inquiry', confidence: 0.85, entities: {} };
  }
  
  if (lowercaseMessage.includes('price') || lowercaseMessage.includes('cost') || lowercaseMessage.includes('pricing') || lowercaseMessage.includes('roi')) {
    return { intent: 'pricing_inquiry', confidence: 0.90, entities: {} };
  }
  
  if (lowercaseMessage.includes('demo') || lowercaseMessage.includes('trial') || lowercaseMessage.includes('test')) {
    return { intent: 'demo_request', confidence: 0.95, entities: {} };
  }
  
  if (lowercaseMessage.includes('integration') || lowercaseMessage.includes('api') || lowercaseMessage.includes('connect')) {
    return { intent: 'integration_inquiry', confidence: 0.80, entities: {} };
  }
  
  if (lowercaseMessage.includes('support') || lowercaseMessage.includes('help') || lowercaseMessage.includes('assistance')) {
    return { intent: 'support_inquiry', confidence: 0.85, entities: {} };
  }
  
  // Segment detection
  const segments = ['upstream', 'midstream', 'downstream'];
  for (const segment of segments) {
    if (lowercaseMessage.includes(segment)) {
      return { intent: 'segment_inquiry', confidence: 0.85, entities: { segment } };
    }
  }
  
  return { intent: 'general_inquiry', confidence: 0.50, entities: {} };
}

// Generate intelligent response based on intent and context
function generateResponse(intent: string, entities: Record<string, any>, context: ConversationContext): string {
  const lang = context.language;
  
  switch (intent) {
    case 'product_inquiry':
      if (entities.segment && entities.segment in localKnowledgeBase.productInfo) {
        const segmentInfo = localKnowledgeBase.productInfo[entities.segment as keyof typeof localKnowledgeBase.productInfo];
        return (segmentInfo as any)[lang] || (segmentInfo as any)['en'];
      }
      return lang === 'fr' 
        ? "OilFlow BIDEC ERP est une solution complète qui couvre toutes les opérations pétrolières - amont, midstream et aval. Quelle partie de vos opérations vous intéresse le plus ?"
        : "OilFlow BIDEC ERP is a comprehensive solution covering all petroleum operations - upstream, midstream, and downstream. Which part of your operations interests you most?";
    
    case 'pricing_inquiry':
      return (localKnowledgeBase.pricing as any)[lang] || localKnowledgeBase.pricing['en'];
    
    case 'demo_request':
      context.leadScore += 25; // High interest
      return lang === 'fr'
        ? "Excellente idée ! Une démonstration personnalisée est le meilleur moyen de voir comment OilFlow BIDEC ERP peut bénéficier à votre entreprise. Pouvez-vous me dire votre nom et le nom de votre entreprise pour que je puisse organiser cela ?"
        : "Excellent idea! A personalized demonstration is the best way to see how OilFlow BIDEC ERP can benefit your company. Can you tell me your name and company so I can arrange that?";
    
    case 'integration_inquiry':
      return (localKnowledgeBase.integration as any)[lang] || localKnowledgeBase.integration['en'];
    
    case 'support_inquiry':
      return (localKnowledgeBase.support as any)[lang] || localKnowledgeBase.support['en'];
    
    case 'segment_inquiry':
      if (entities.segment && entities.segment in localKnowledgeBase.productInfo) {
        const segmentInfo = localKnowledgeBase.productInfo[entities.segment as keyof typeof localKnowledgeBase.productInfo];
        return (segmentInfo as any)[lang] || (segmentInfo as any)['en'];
      }
      break;
  }
  
  // Default response with some personalization
  if (context.conversationHistory.length === 0) {
    const greetings = (localKnowledgeBase.greeting as any)[lang] || localKnowledgeBase.greeting['en'];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
  
  return lang === 'fr'
    ? "C'est une excellente question ! Pouvez-vous être plus spécifique sur ce qui vous intéresse ? Je peux vous aider avec des informations sur nos produits, les prix, les intégrations, ou organiser une démonstration."
    : "That's a great question! Can you be more specific about what interests you? I can help with product information, pricing, integrations, or schedule a demonstration.";
}

// Calculate lead score based on conversation
function updateLeadScore(context: ConversationContext, intent: string, entities: Record<string, any>): number {
  let scoreIncrease = 0;
  
  switch (intent) {
    case 'demo_request':
      scoreIncrease = 25;
      break;
    case 'pricing_inquiry':
      scoreIncrease = 20;
      break;
    case 'integration_inquiry':
      scoreIncrease = 15;
      break;
    case 'product_inquiry':
      scoreIncrease = 10;
      break;
    case 'support_inquiry':
      scoreIncrease = 5;
      break;
  }
  
  // Bonus for multiple inquiries
  if (context.conversationHistory.length > 3) {
    scoreIncrease += 10;
  }
  
  return Math.min(context.leadScore + scoreIncrease, 100);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = chatMessageSchema.parse(body);
    
    // Initialize or retrieve conversation context
    let context: ConversationContext = {
      sessionId: validatedData.sessionId,
      language: validatedData.language || 'en',
      stage: 'information',
      leadScore: 0,
      conversationHistory: []
    };
    
    // In a real implementation, you would retrieve context from a database
    // For demo purposes, we'll simulate context
    
    // Recognize intent and entities
    const { intent, confidence, entities } = recognizeIntent(validatedData.message, context.language);
    
    // Update lead score
    context.leadScore = updateLeadScore(context, intent, entities);
    
    // Generate response
    const assistantResponse = generateResponse(intent, entities, context);
    
    // Create message objects
    const userMessage: ConversationMessage = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      role: 'user',
      content: validatedData.message,
      timestamp: new Date().toISOString(),
      language: context.language,
      metadata: { intent, confidence, entities }
    };
    
    const assistantMessage: ConversationMessage = {
      id: `assistant_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      role: 'assistant',
      content: assistantResponse,
      timestamp: new Date().toISOString(),
      language: context.language
    };
    
    // Update conversation history
    context.conversationHistory.push(userMessage, assistantMessage);
    
    // Determine if escalation is needed
    const shouldEscalate = context.leadScore >= 75 || intent === 'demo_request';
    
    // Log conversation for analytics
    console.log('Chatbot conversation:', {
      sessionId: context.sessionId,
      intent,
      confidence,
      leadScore: context.leadScore,
      language: context.language,
      shouldEscalate,
      timestamp: new Date().toISOString()
    });
    
    // Prepare response
    const response = {
      success: true,
      message: assistantMessage,
      context: {
        sessionId: context.sessionId,
        leadScore: context.leadScore,
        stage: context.stage,
        language: context.language
      },
      suggestions: generateSuggestions(intent, context.language),
      shouldEscalate,
      escalationMessage: shouldEscalate ? (
        context.language === 'fr' 
          ? "Il semble que vous soyez très intéressé par nos solutions ! Souhaiteriez-vous parler directement avec un de nos experts ?"
          : "It looks like you're very interested in our solutions! Would you like to speak directly with one of our experts?"
      ) : undefined
    };
    
    return NextResponse.json(response, { status: 200 });
    
  } catch (error) {
    console.error('Chatbot API error:', error);
    
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

// Generate suggested questions/actions
function generateSuggestions(intent: string, language: string): string[] {
  const suggestions = {
    en: {
      product_inquiry: [
        "Tell me about upstream solutions",
        "What about downstream capabilities?",
        "Show me integration options",
        "Schedule a demo"
      ],
      pricing_inquiry: [
        "What's the ROI timeline?",
        "Do you offer free trials?",
        "Schedule a pricing consultation",
        "Compare with competitors"
      ],
      demo_request: [
        "What should I prepare for the demo?",
        "How long does implementation take?",
        "What support do you provide?",
        "Show me success stories"
      ],
      general_inquiry: [
        "Learn about our products",
        "See pricing information",
        "Schedule a demo",
        "Talk to an expert"
      ]
    },
    fr: {
      product_inquiry: [
        "Parlez-moi des solutions amont",
        "Qu'en est-il des capacités aval ?",
        "Montrez-moi les options d'intégration",
        "Planifier une démonstration"
      ],
      pricing_inquiry: [
        "Quel est le délai de ROI ?",
        "Offrez-vous des essais gratuits ?",
        "Planifier une consultation tarifaire",
        "Comparer avec les concurrents"
      ],
      demo_request: [
        "Que dois-je préparer pour la démo ?",
        "Combien de temps prend l'implémentation ?",
        "Quel support fournissez-vous ?",
        "Montrez-moi des histoires de succès"
      ],
      general_inquiry: [
        "En savoir plus sur nos produits",
        "Voir les informations tarifaires",
        "Planifier une démonstration",
        "Parler à un expert"
      ]
    }
  };
  
  return suggestions[language]?.[intent] || suggestions['en']['general_inquiry'];
}

export async function GET() {
  return NextResponse.json(
    {
      message: 'OilFlow BIDEC ERP Chatbot API',
      version: '1.0.0',
      features: [
        'Multi-language support (English, French)',
        'Intent recognition',
        'Lead qualification',
        'Context-aware responses',
        'Escalation management'
      ],
      endpoints: {
        POST: 'Send chat message and receive AI response'
      }
    },
    { status: 200 }
  );
}