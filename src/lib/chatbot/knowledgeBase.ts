// Comprehensive knowledge base for OilFlow BIDEC ERP chatbot
// This file contains structured information about products, pricing, features, and conversation flows
// while protecting proprietary implementation details

export interface KnowledgeItem {
  id: string;
  category: string;
  subcategory?: string;
  keywords: string[];
  content: {
    en: string;
    fr: string;
  };
  followUpQuestions?: {
    en: string[];
    fr: string[];
  };
  relatedItems?: string[];
  confidenceThreshold: number;
}

export interface ConversationFlow {
  id: string;
  name: string;
  stages: {
    [key: string]: {
      triggers: string[];
      responses: {
        en: string[];
        fr: string[];
      };
      nextStages: string[];
      leadScoreImpact: number;
    };
  };
}

// Core product knowledge base
export const knowledgeBase: KnowledgeItem[] = [
  // Product Overview
  {
    id: 'product_overview',
    category: 'product',
    subcategory: 'overview',
    keywords: ['oilflow', 'bidec', 'erp', 'overview', 'about', 'what is', 'solution'],
    content: {
      en: "OilFlow BIDEC ERP is a comprehensive enterprise resource planning solution specifically designed for the petroleum industry. We integrate upstream exploration, midstream logistics, and downstream operations into one powerful platform. Our solution helps companies significantly increase operational efficiency while reducing costs and ensuring regulatory compliance across all petroleum operations.",
      fr: "OilFlow BIDEC ERP est une solution complète de planification des ressources d'entreprise spécialement conçue pour l'industrie pétrolière. Nous intégrons l'exploration amont, la logistique midstream et les opérations aval en une plateforme puissante. Notre solution aide les entreprises à augmenter l'efficacité opérationnelle de 25-40% tout en réduisant les coûts et en assurant la conformité réglementaire."
    },
    followUpQuestions: {
      en: ['Tell me about upstream capabilities', 'What about midstream features?', 'Show me downstream solutions', 'How does implementation work?'],
      fr: ['Parlez-moi des capacités amont', 'Qu\'en est-il des fonctionnalités midstream?', 'Montrez-moi les solutions aval', 'Comment fonctionne l\'implémentation?']
    },
    relatedItems: ['upstream_solutions', 'midstream_solutions', 'downstream_solutions'],
    confidenceThreshold: 0.8
  },

  // Upstream Solutions
  {
    id: 'upstream_solutions',
    category: 'product',
    subcategory: 'upstream',
    keywords: ['upstream', 'exploration', 'drilling', 'production', 'reservoir', 'field', 'wells'],
    content: {
      en: "Our upstream solutions revolutionize exploration and production operations. We offer seismic data management, advanced optimization tools, production forecasting models, and reservoir simulation capabilities. Companies using our upstream module report significantly faster drilling times, improved production efficiency, and substantial reduction in exploration costs. Our AI-powered analytics help identify optimal drilling locations and predict equipment maintenance needs.",
      fr: "Nos solutions amont révolutionnent les opérations d'exploration et de production. Nous offrons la gestion des données sismiques, les algorithmes d'optimisation de forage, les modèles de prévision de production et les outils de simulation de réservoir. Les entreprises utilisant notre module amont rapportent 30% de temps de forage plus rapides, 25% d'amélioration de l'efficacité de production et 20% de réduction des coûts d'exploration."
    },
    followUpQuestions: {
      en: ['How does drilling optimization work?', 'Tell me about seismic data management', 'What about production forecasting?', 'Show me ROI examples'],
      fr: ['Comment fonctionne l\'optimisation du forage?', 'Parlez-moi de la gestion des données sismiques', 'Qu\'en est-il des prévisions de production?', 'Montrez-moi des exemples de ROI']
    },
    relatedItems: ['drilling_optimization', 'seismic_management', 'production_forecasting'],
    confidenceThreshold: 0.85
  },

  // Midstream Solutions
  {
    id: 'midstream_solutions',
    category: 'product',
    subcategory: 'midstream',
    keywords: ['midstream', 'pipeline', 'transportation', 'storage', 'logistics', 'distribution'],
    content: {
      en: "Our midstream capabilities optimize the entire transportation and storage value chain. We provide real-time pipeline monitoring, automated storage optimization, intelligent route planning, and predictive maintenance for infrastructure. Clients achieve substantial improvements in logistics efficiency, significant reduction in transportation costs, and exceptional pipeline safety compliance. Our smart scheduling system maximizes throughput while minimizing operational risks.",
      fr: "Nos capacités midstream optimisent toute la chaîne de valeur de transport et de stockage. Nous fournissons la surveillance de pipeline en temps réel, l'optimisation automatisée du stockage, les algorithmes de planification d'itinéraires et la maintenance prédictive pour l'infrastructure. Les clients obtiennent 22% d'amélioration de l'efficacité logistique, 15% de réduction des coûts de transport et 99.8% de conformité de sécurité des pipelines."
    },
    followUpQuestions: {
      en: ['How does pipeline monitoring work?', 'Tell me about storage optimization', 'What about route planning?', 'Show me safety features'],
      fr: ['Comment fonctionne la surveillance des pipelines?', 'Parlez-moi de l\'optimisation du stockage', 'Qu\'en est-il de la planification d\'itinéraires?', 'Montrez-moi les fonctionnalités de sécurité']
    },
    relatedItems: ['pipeline_monitoring', 'storage_optimization', 'route_planning'],
    confidenceThreshold: 0.85
  },

  // Downstream Solutions
  {
    id: 'downstream_solutions',
    category: 'product',
    subcategory: 'downstream',
    keywords: ['downstream', 'refinery', 'refining', 'retail', 'fuel', 'products', 'quality'],
    content: {
      en: "Our downstream platform transforms refinery operations and retail management. We deliver advanced process optimization, product quality control, inventory management, and retail analytics. Refineries report significant improvements in yield optimization, substantial reduction in quality incidents, and enhanced inventory turnover. Our demand forecasting helps predict market trends and optimize product mix for maximum profitability.",
      fr: "Notre plateforme aval transforme les opérations de raffinerie et la gestion du commerce de détail. Nous offrons l'optimisation avancée des processus, le contrôle de qualité des produits, la gestion des stocks et l'analyse du commerce de détail. Les raffineries rapportent 18% d'amélioration de l'optimisation du rendement, 12% de réduction des incidents de qualité et 25% de meilleur rotation des stocks."
    },
    followUpQuestions: {
      en: ['How does refinery optimization work?', 'Tell me about quality control', 'What about inventory management?', 'Show me retail analytics'],
      fr: ['Comment fonctionne l\'optimisation de la raffinerie?', 'Parlez-moi du contrôle qualité', 'Qu\'en est-il de la gestion des stocks?', 'Montrez-moi l\'analyse du commerce de détail']
    },
    relatedItems: ['refinery_optimization', 'quality_control', 'inventory_management'],
    confidenceThreshold: 0.85
  },

  // Pricing and ROI
  {
    id: 'pricing_roi',
    category: 'pricing',
    keywords: ['price', 'cost', 'pricing', 'roi', 'investment', 'budget', 'expenses', 'value'],
    content: {
      en: "Our pricing model is designed to deliver exceptional value with flexible options for companies of all sizes. We offer subscription-based licensing with enterprise packages, and pricing based on operational scale and module selection. Most clients see rapid ROI with exceptional returns on investment. Our value proposition includes reduced operational costs, improved efficiency, and enhanced decision-making capabilities. I'd be happy to connect you with our sales team for a customized quote based on your specific needs.",
      fr: "Notre modèle de tarification est conçu pour offrir une valeur exceptionnelle avec des options flexibles pour les entreprises de toutes tailles. Nous offrons des licences basées sur l'abonnement à partir de packages entreprise, avec des prix basés sur l'échelle opérationnelle et la sélection de modules. La plupart des clients obtiennent rapidement un ROI exceptionnel. Je serais ravi de vous mettre en contact avec notre équipe de vente pour un devis personnalisé."
    },
    followUpQuestions: {
      en: ['What factors affect pricing?', 'Can you show ROI calculations?', 'Do you offer free trials?', 'Schedule a pricing consultation'],
      fr: ['Quels facteurs affectent les prix?', 'Pouvez-vous montrer les calculs de ROI?', 'Offrez-vous des essais gratuits?', 'Planifier une consultation tarifaire']
    },
    relatedItems: ['roi_calculator', 'trial_options', 'enterprise_packages'],
    confidenceThreshold: 0.9
  },

  // Integration Capabilities
  {
    id: 'integration',
    category: 'technical',
    subcategory: 'integration',
    keywords: ['integration', 'api', 'connect', 'interface', 'compatibility', 'scada', 'sap', 'oracle'],
    content: {
      en: "OilFlow BIDEC ERP features robust integration capabilities with an API-first architecture. We seamlessly connect with major petroleum industry systems including SCADA systems, enterprise resource planning platforms, manufacturing execution systems, and various IoT platforms. Our REST APIs and real-time data connectors ensure smooth data flow across your entire technology ecosystem. We support numerous industry-standard protocols and formats, enabling rapid deployment without disrupting existing operations.",
      fr: "OilFlow BIDEC ERP dispose de capacités d'intégration robustes avec une architecture API-first. Nous nous connectons parfaitement avec les principaux systèmes de l'industrie pétrolière incluant les systèmes SCADA, PI Systems, SAP, Oracle, Wonderware et diverses plateformes IoT. Nos API REST et connecteurs de données en temps réel assurent un flux de données fluide dans tout votre écosystème technologique."
    },
    followUpQuestions: {
      en: ['What systems do you integrate with?', 'How long does integration take?', 'Do you provide integration support?', 'Show me API documentation'],
      fr: ['Avec quels systèmes vous intégrez-vous?', 'Combien de temps prend l\'intégration?', 'Fournissez-vous un support d\'intégration?', 'Montrez-moi la documentation API']
    },
    relatedItems: ['api_documentation', 'integration_timeline', 'supported_systems'],
    confidenceThreshold: 0.8
  },

  // Support and Services
  {
    id: 'support',
    category: 'services',
    subcategory: 'support',
    keywords: ['support', 'help', 'assistance', 'training', 'maintenance', 'service'],
    content: {
      en: "We provide comprehensive 24/7 technical support with dedicated account managers for enterprise clients. Our support ecosystem includes implementation assistance, user training programs, ongoing optimization consulting, and proactive system monitoring. We maintain an average response time of under 2 hours for critical issues and offer multi-channel support including phone, email, chat, and remote assistance. Our global support team operates across multiple time zones to ensure continuous availability.",
      fr: "Nous fournissons un support technique complet 24/7 avec des gestionnaires de compte dédiés pour les clients entreprise. Notre écosystème de support inclut l'assistance à l'implémentation, les programmes de formation des utilisateurs, le conseil d'optimisation continu et la surveillance proactive du système. Nous maintenons un temps de réponse moyen de moins de 2 heures pour les problèmes critiques."
    },
    followUpQuestions: {
      en: ['What training do you provide?', 'How does implementation work?', 'What are your SLA guarantees?', 'Show me support options'],
      fr: ['Quelle formation fournissez-vous?', 'Comment fonctionne l\'implémentation?', 'Quelles sont vos garanties SLA?', 'Montrez-moi les options de support']
    },
    relatedItems: ['training_programs', 'implementation_process', 'sla_guarantees'],
    confidenceThreshold: 0.8
  },

  // Security and Compliance
  {
    id: 'security_compliance',
    category: 'technical',
    subcategory: 'security',
    keywords: ['security', 'compliance', 'privacy', 'regulations', 'audit', 'gdpr', 'iso'],
    content: {
      en: "Security and compliance are fundamental to our platform design. We maintain SOC 2 Type II certification, ISO 27001 compliance, and adhere to industry-specific regulations including API standards and environmental compliance frameworks. Our platform features end-to-end encryption, role-based access controls, comprehensive audit trails, and automated compliance reporting. We ensure data sovereignty with regional data centers and provide tools for GDPR compliance.",
      fr: "La sécurité et la conformité sont fondamentales à la conception de notre plateforme. Nous maintenons la certification SOC 2 Type II, la conformité ISO 27001 et adhérons aux réglementations spécifiques de l'industrie incluant les standards API et les cadres de conformité environnementale. Notre plateforme dispose de chiffrement de bout en bout, de contrôles d'accès basés sur les rôles et de rapports de conformité automatisés."
    },
    followUpQuestions: {
      en: ['What certifications do you have?', 'How do you handle data privacy?', 'What about environmental compliance?', 'Show me security features'],
      fr: ['Quelles certifications avez-vous?', 'Comment gérez-vous la confidentialité des données?', 'Qu\'en est-il de la conformité environnementale?', 'Montrez-moi les fonctionnalités de sécurité']
    },
    relatedItems: ['certifications', 'data_privacy', 'environmental_compliance'],
    confidenceThreshold: 0.85
  }
];

// Conversation flows for different scenarios
export const conversationFlows: ConversationFlow[] = [
  {
    id: 'lead_qualification',
    name: 'Lead Qualification Flow',
    stages: {
      introduction: {
        triggers: ['hello', 'hi', 'hey', 'start', 'help'],
        responses: {
          en: [
            "Hello! I'm Alex, your OilFlow BIDEC ERP specialist. I help petroleum companies optimize their operations with our comprehensive ERP solution. What specific challenges are you facing in your business?",
            "Welcome! I'm Alex from OilFlow BIDEC ERP. I'd love to understand your petroleum operations better. Are you looking to improve upstream, midstream, or downstream efficiency?",
            "Hi there! I'm Alex, and I specialize in petroleum ERP solutions. What brings you to explore OilFlow BIDEC ERP today?"
          ],
          fr: [
            "Bonjour ! Je suis Alex, votre spécialiste OilFlow BIDEC ERP. J'aide les compagnies pétrolières à optimiser leurs opérations avec notre solution ERP complète. Quels défis spécifiques rencontrez-vous dans votre entreprise ?",
            "Bienvenue ! Je suis Alex d'OilFlow BIDEC ERP. J'aimerais mieux comprendre vos opérations pétrolières. Cherchez-vous à améliorer l'efficacité amont, midstream ou aval ?",
            "Salut ! Je suis Alex, et je me spécialise dans les solutions ERP pétrolières. Qu'est-ce qui vous amène à explorer OilFlow BIDEC ERP aujourd'hui ?"
          ]
        },
        nextStages: ['information_gathering', 'product_interest'],
        leadScoreImpact: 5
      },
      information_gathering: {
        triggers: ['company', 'operations', 'business', 'industry', 'size'],
        responses: {
          en: [
            "That's great to know! Understanding your specific operations helps me provide the most relevant information. What size is your operation, and which segments of petroleum operations are you most involved in?",
            "Excellent! To give you the most valuable insights, could you tell me more about your company's focus areas? Are you primarily upstream, midstream, downstream, or integrated operations?"
          ],
          fr: [
            "C'est formidable à savoir ! Comprendre vos opérations spécifiques m'aide à fournir les informations les plus pertinentes. Quelle est la taille de votre opération, et dans quels segments des opérations pétrolières êtes-vous le plus impliqué ?",
            "Excellent ! Pour vous donner les perspectives les plus précieuses, pourriez-vous me parler davantage des domaines de focus de votre entreprise ?"
          ]
        },
        nextStages: ['product_demonstration', 'pain_points'],
        leadScoreImpact: 10
      },
      product_demonstration: {
        triggers: ['demo', 'show', 'demonstration', 'see', 'trial'],
        responses: {
          en: [
            "Absolutely! A personalized demonstration is the perfect way to see how OilFlow BIDEC ERP can transform your specific operations. I'll need a few details to set up the most relevant demo for you. What's your name and company?",
            "Perfect choice! Our demos are tailored to your specific petroleum operations. To ensure you see the most relevant features, could you share your name, company, and primary area of interest?"
          ],
          fr: [
            "Absolument ! Une démonstration personnalisée est le moyen parfait de voir comment OilFlow BIDEC ERP peut transformer vos opérations spécifiques. J'aurai besoin de quelques détails pour configurer la démo la plus pertinente pour vous.",
            "Choix parfait ! Nos démonstrations sont adaptées à vos opérations pétrolières spécifiques. Pour vous assurer de voir les fonctionnalités les plus pertinentes, pourriez-vous partager votre nom, entreprise et domaine d'intérêt principal ?"
          ]
        },
        nextStages: ['contact_collection', 'scheduling'],
        leadScoreImpact: 25
      }
    }
  }
];

// Intent recognition patterns
export const intentPatterns = {
  product_inquiry: [
    'what is', 'tell me about', 'explain', 'product', 'solution', 'features', 'capabilities',
    'qu\'est-ce que', 'parlez-moi de', 'expliquer', 'produit', 'solution', 'fonctionnalités', 'capacités'
  ],
  pricing_inquiry: [
    'price', 'cost', 'pricing', 'expensive', 'cheap', 'budget', 'roi', 'investment',
    'prix', 'coût', 'tarification', 'cher', 'budget', 'investissement'
  ],
  demo_request: [
    'demo', 'demonstration', 'show', 'see', 'trial', 'test', 'try',
    'démonstration', 'montrer', 'voir', 'essai', 'tester', 'essayer'
  ],
  technical_inquiry: [
    'integration', 'api', 'technical', 'architecture', 'security', 'compliance',
    'intégration', 'technique', 'sécurité', 'conformité'
  ],
  support_inquiry: [
    'support', 'help', 'assistance', 'training', 'service',
    'aide', 'assistance', 'formation', 'service'
  ]
};

// Regional customization
export const regionalCustomization = {
  africa: {
    en: {
      greeting: "Welcome! I understand the unique challenges of petroleum operations in Africa. How can OilFlow BIDEC ERP help optimize your operations?",
      localChallenges: ["infrastructure limitations", "regulatory complexity", "skills development", "technology adoption"],
      successStories: "Companies like yours across Africa have achieved significant improvements in operational efficiency and cost reduction with our solutions."
    },
    fr: {
      greeting: "Bienvenue ! Je comprends les défis uniques des opérations pétrolières en Afrique. Comment OilFlow BIDEC ERP peut-il aider à optimiser vos opérations ?",
      localChallenges: ["limitations d'infrastructure", "complexité réglementaire", "développement des compétences", "adoption technologique"],
      successStories: "Des entreprises comme la vôtre à travers l'Afrique ont obtenu des améliorations significatives de l'efficacité opérationnelle et de la réduction des coûts."
    }
  }
};

// Lead scoring rules
export const leadScoringRules = {
  messageTypes: {
    pricing_inquiry: 20,
    demo_request: 25,
    technical_deep_dive: 15,
    integration_questions: 15,
    company_info_shared: 10,
    contact_info_provided: 20,
    multiple_questions: 10,
    return_visitor: 15
  },
  conversationLength: {
    short: 0,      // 1-3 messages
    medium: 10,    // 4-7 messages
    long: 20,      // 8+ messages
    extended: 30   // 15+ messages
  },
  engagementIndicators: {
    asking_followup_questions: 10,
    requesting_documentation: 15,
    mentioning_timeline: 20,
    discussing_budget: 25,
    involving_team_members: 30
  }
};

// Export utility functions
export const findKnowledgeItem = (query: string, language: 'en' | 'fr' = 'en'): KnowledgeItem | null => {
  const queryLower = query.toLowerCase();
  
  // Find items with matching keywords
  const matches = knowledgeBase.filter(item => 
    item.keywords.some(keyword => queryLower.includes(keyword.toLowerCase()))
  );
  
  if (matches.length === 0) return null;
  
  // Return the item with the highest confidence match
  return matches.reduce((best, current) => 
    current.confidenceThreshold > best.confidenceThreshold ? current : best
  );
};

export const getRelatedItems = (itemId: string): KnowledgeItem[] => {
  const item = knowledgeBase.find(kb => kb.id === itemId);
  if (!item || !item.relatedItems) return [];
  
  return knowledgeBase.filter(kb => item.relatedItems!.includes(kb.id));
};

export const calculateResponseConfidence = (query: string, item: KnowledgeItem): number => {
  const queryLower = query.toLowerCase();
  const matchingKeywords = item.keywords.filter(keyword => 
    queryLower.includes(keyword.toLowerCase())
  );
  
  return (matchingKeywords.length / item.keywords.length) * item.confidenceThreshold;
};