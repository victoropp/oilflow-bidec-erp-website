// Multi-language support system for the chatbot
// Supports English, French, and extensible for local African languages

export type SupportedLanguage = 'en' | 'fr' | 'ar' | 'sw' | 'ha';

export interface LanguageConfig {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  rtl: boolean;
  region: string;
}

// Language configurations
export const supportedLanguages: LanguageConfig[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    rtl: false,
    region: 'global'
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    rtl: false,
    region: 'africa'
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    rtl: true,
    region: 'mena'
  },
  {
    code: 'sw',
    name: 'Swahili',
    nativeName: 'Kiswahili',
    flag: '🇹🇿',
    rtl: false,
    region: 'east_africa'
  },
  {
    code: 'ha',
    name: 'Hausa',
    nativeName: 'Harshen Hausa',
    flag: '🇳🇬',
    rtl: false,
    region: 'west_africa'
  }
];

// Comprehensive translations for chatbot interface
export const translations = {
  // UI Elements
  ui: {
    en: {
      chatTitle: 'OilFlow BIDEC ERP Assistant',
      chatSubtitle: 'Alex - Petroleum ERP Specialist',
      placeholder: 'Type your message...',
      send: 'Send',
      minimize: 'Minimize',
      close: 'Close',
      typing: 'Alex is typing...',
      online: 'Online',
      offline: 'Offline',
      newConversation: 'New Conversation',
      clearHistory: 'Clear History',
      downloadTranscript: 'Download Transcript',
      escalateToHuman: 'Talk to Expert',
      languageSelector: 'Select Language',
      quickActions: 'Quick Actions',
      suggestions: 'Suggestions',
      loading: 'Loading...',
      error: 'Something went wrong',
      retry: 'Retry',
      connecting: 'Connecting...'
    },
    fr: {
      chatTitle: 'Assistant OilFlow BIDEC ERP',
      chatSubtitle: 'Alex - Spécialiste ERP Pétrolier',
      placeholder: 'Tapez votre message...',
      send: 'Envoyer',
      minimize: 'Réduire',
      close: 'Fermer',
      typing: 'Alex tape...',
      online: 'En ligne',
      offline: 'Hors ligne',
      newConversation: 'Nouvelle Conversation',
      clearHistory: 'Effacer l\'Historique',
      downloadTranscript: 'Télécharger la Transcription',
      escalateToHuman: 'Parler à un Expert',
      languageSelector: 'Sélectionner la Langue',
      quickActions: 'Actions Rapides',
      suggestions: 'Suggestions',
      loading: 'Chargement...',
      error: 'Quelque chose a mal tourné',
      retry: 'Réessayer',
      connecting: 'Connexion...'
    },
    ar: {
      chatTitle: 'مساعد OilFlow BIDEC ERP',
      chatSubtitle: 'أليكس - متخصص أنظمة تخطيط الموارد البترولية',
      placeholder: 'اكتب رسالتك...',
      send: 'إرسال',
      minimize: 'تصغير',
      close: 'إغلاق',
      typing: 'أليكس يكتب...',
      online: 'متصل',
      offline: 'غير متصل',
      newConversation: 'محادثة جديدة',
      clearHistory: 'مسح السجل',
      downloadTranscript: 'تحميل النسخة المكتوبة',
      escalateToHuman: 'التحدث مع خبير',
      languageSelector: 'اختر اللغة',
      quickActions: 'إجراءات سريعة',
      suggestions: 'اقتراحات',
      loading: 'جاري التحميل...',
      error: 'حدث خطأ ما',
      retry: 'إعادة المحاولة',
      connecting: 'جاري الاتصال...'
    },
    sw: {
      chatTitle: 'Msaidizi wa OilFlow BIDEC ERP',
      chatSubtitle: 'Alex - Mtaalamu wa ERP ya Petroli',
      placeholder: 'Andika ujumbe wako...',
      send: 'Tuma',
      minimize: 'Punguza',
      close: 'Funga',
      typing: 'Alex anaandika...',
      online: 'Mtandaoni',
      offline: 'Nje ya mtandao',
      newConversation: 'Mazungumzo Mapya',
      clearHistory: 'Futa Historia',
      downloadTranscript: 'Pakua Nakala',
      escalateToHuman: 'Ongea na Mtaalamu',
      languageSelector: 'Chagua Lugha',
      quickActions: 'Vitendo vya Haraka',
      suggestions: 'Mapendekezo',
      loading: 'Inapakia...',
      error: 'Kuna tatizo',
      retry: 'Jaribu Tena',
      connecting: 'Inaunganisha...'
    },
    ha: {
      chatTitle: 'Mai Taimako na OilFlow BIDEC ERP',
      chatSubtitle: 'Alex - Kwararren ERP na Mai',
      placeholder: 'Rubuta sakonka...',
      send: 'Aika',
      minimize: 'Rage',
      close: 'Rufe',
      typing: 'Alex yana rubuta...',
      online: 'A kan layi',
      offline: 'Ba a kan layi',
      newConversation: 'Sabon Tattaunawa',
      clearHistory: 'Share Tarihi',
      downloadTranscript: 'Sauke Rubutun',
      escalateToHuman: 'Yi magana da Kwararre',
      languageSelector: 'Zabar Harshe',
      quickActions: 'Ayyukan Gaggawa',
      suggestions: 'Shawarwari',
      loading: 'Ana lodi...',
      error: 'Wani abu bai yi ba',
      retry: 'Sake gwadawa',
      connecting: 'Ana haduwa...'
    }
  },

  // Greeting messages
  greetings: {
    en: [
      "Hello! I'm Alex, your OilFlow BIDEC ERP assistant. I'm here to help you discover how our comprehensive ERP solution can transform your petroleum operations. What specific challenges are you facing in your business?",
      "Welcome to OilFlow BIDEC ERP! I'm Alex, and I specialize in helping petroleum companies optimize their operations. What brings you here today?",
      "Hi there! I'm Alex from OilFlow BIDEC ERP. I'm excited to help you learn about our industry-leading petroleum ERP solutions. What would you like to know?"
    ],
    fr: [
      "Bonjour ! Je suis Alex, votre assistant OilFlow BIDEC ERP. Je suis là pour vous aider à découvrir comment notre solution ERP complète peut transformer vos opérations pétrolières. Quels défis spécifiques rencontrez-vous dans votre entreprise ?",
      "Bienvenue chez OilFlow BIDEC ERP ! Je suis Alex, et je me spécialise dans l'aide aux compagnies pétrolières pour optimiser leurs opérations. Qu'est-ce qui vous amène ici aujourd'hui ?",
      "Salut ! Je suis Alex d'OilFlow BIDEC ERP. Je suis ravi de vous aider à découvrir nos solutions ERP pétrolières leader sur le marché. Que souhaitez-vous savoir ?"
    ],
    ar: [
      "مرحباً! أنا أليكس، مساعدك في OilFlow BIDEC ERP. أنا هنا لمساعدتك في اكتشاف كيف يمكن لحلول تخطيط الموارد الشاملة أن تحول عملياتك البترولية. ما هي التحديات المحددة التي تواجهها في عملك؟",
      "أهلاً وسهلاً بكم في OilFlow BIDEC ERP! أنا أليكس، وأتخصص في مساعدة شركات البترول على تحسين عملياتها. ما الذي جلبك هنا اليوم؟"
    ],
    sw: [
      "Habari! Mimi ni Alex, msaidizi wako wa OilFlow BIDEC ERP. Nipo hapa kukusaidia kugundua jinsi suluhisho letu kamili la ERP linavyoweza kubadilisha shughuli zako za petroli. Ni changamoto gani maalum unazokabiliana nazo katika biashara yako?",
      "Karibu kwenye OilFlow BIDEC ERP! Mimi ni Alex, na ninafanya kazi ya kusaidia makampuni ya petroli kuboresha shughuli zao. Ni nini kimekuja hapa leo?"
    ],
    ha: [
      "Sannu! Ni Alex ne, mai taimako na OilFlow BIDEC ERP. Ina nan don in taimaka maka gane yadda cikakken tsarin ERP namu zai iya canza ayyukan mai da gas naku. Wane matsaloli ke damun ku a kasuwancin ku?",
      "Maraba da zuwa OilFlow BIDEC ERP! Ni Alex ne, kuma na kware a taimaka wa kamfanoni na mai da gas don inganta ayyukansu. Me ya kawo ku nan yau?"
    ]
  },

  // Common responses
  responses: {
    en: {
      productOverview: "OilFlow BIDEC ERP is a comprehensive enterprise resource planning solution specifically designed for the petroleum industry. We integrate upstream exploration, midstream logistics, and downstream operations into one powerful platform.",
      pricingInfo: "Our pricing is based on your specific needs and company size. We offer flexible subscription models with typical ROI ranging from 300-500% within 18 months. Would you like me to connect you with our sales team for a customized quote?",
      demoOffer: "Excellent! A personalized demonstration is the best way to see how OilFlow BIDEC ERP can benefit your company. Can you tell me your name and company so I can arrange that?",
      needMoreInfo: "That's a great question! Can you be more specific about what interests you? I can help with product information, pricing, integrations, or schedule a demonstration.",
      errorMessage: "I apologize, but I'm having trouble understanding your request. Could you please rephrase your question or try asking about our products, pricing, or services?",
      escalationMessage: "It looks like you're very interested in our solutions! Would you like to speak directly with one of our petroleum ERP experts?"
    },
    fr: {
      productOverview: "OilFlow BIDEC ERP est une solution complète de planification des ressources d'entreprise spécialement conçue pour l'industrie pétrolière. Nous intégrons l'exploration amont, la logistique midstream et les opérations aval en une plateforme puissante.",
      pricingInfo: "Notre tarification est basée sur vos besoins spécifiques et la taille de votre entreprise. Nous offrons des modèles d'abonnement flexibles avec un ROI typique allant de 300-500% dans les 18 mois. Souhaitez-vous que je vous mette en contact avec notre équipe de vente?",
      demoOffer: "Excellente idée ! Une démonstration personnalisée est le meilleur moyen de voir comment OilFlow BIDEC ERP peut bénéficier à votre entreprise. Pouvez-vous me dire votre nom et le nom de votre entreprise?",
      needMoreInfo: "C'est une excellente question ! Pouvez-vous être plus spécifique sur ce qui vous intéresse ? Je peux vous aider avec des informations sur les produits, les prix, les intégrations, ou organiser une démonstration.",
      errorMessage: "Je m'excuse, mais j'ai du mal à comprendre votre demande. Pourriez-vous reformuler votre question ou demander des informations sur nos produits, prix, ou services?",
      escalationMessage: "Il semble que vous soyez très intéressé par nos solutions ! Souhaiteriez-vous parler directement avec un de nos experts ERP pétrolier?"
    },
    ar: {
      productOverview: "OilFlow BIDEC ERP هو حل شامل لتخطيط موارد المؤسسة مصمم خصيصاً لصناعة البترول. نحن ندمج استكشاف المنبع، والخدمات اللوجستية المتوسطة، وعمليات المصب في منصة واحدة قوية.",
      pricingInfo: "تعتمد أسعارنا على احتياجاتك المحددة وحجم شركتك. نحن نقدم نماذج اشتراك مرنة مع عائد استثمار نموذجي يتراوح من 300-500% خلال 18 شهراً. هل تريد مني أن أربطك بفريق المبيعات؟",
      demoOffer: "ممتاز! العرض التوضيحي الشخصي هو أفضل طريقة لرؤية كيف يمكن لـ OilFlow BIDEC ERP أن يفيد شركتك. هل يمكنك إخباري باسمك وشركتك؟",
      needMoreInfo: "هذا سؤال رائع! هل يمكنك أن تكون أكثر تحديداً حول ما يهمك؟ يمكنني المساعدة في معلومات المنتج، الأسعار، التكاملات، أو جدولة عرض توضيحي.",
      errorMessage: "أعتذر، لكنني أواجه صعوبة في فهم طلبك. هل يمكنك إعادة صياغة سؤالك أو السؤال عن منتجاتنا أو أسعارنا أو خدماتنا؟",
      escalationMessage: "يبدو أنك مهتم جداً بحلولنا! هل تود التحدث مباشرة مع أحد خبراء تخطيط الموارد البترولية لدينا؟"
    },
    sw: {
      productOverview: "OilFlow BIDEC ERP ni suluhisho kamili la kupanga rasilimali za mradi lililobuniwa maalum kwa sekta ya petroli. Tunachanganya uchunguzi wa juu, usafirishaji wa kati, na shughuli za chini katika jukwaa moja lenye nguvu.",
      pricingInfo: "Bei yetu inategemea mahitaji yako maalum na ukubwa wa kampuni yako. Tunatoa mifumo ya ujiuzaji inayonyumbulika na mapato ya kawaida ya uwekezaji kutoka 300-500% ndani ya miezi 18. Je, ungependa nikusanishe na timu yetu ya mauzo?",
      demoOffer: "Bora sana! Maonyesho ya kibinafsi ni njia bora ya kuona jinsi OilFlow BIDEC ERP inavyoweza kufaidisha kampuni yako. Je, unaweza kuniambia jina lako na kampuni yako?",
      needMoreInfo: "Hilo ni swali zuri! Je, unaweza kuwa maalum zaidi kuhusu kinachokuvutia? Ninaweza kusaidia na maelezo ya bidhaa, bei, miunganisho, au kupanga maonyesho.",
      errorMessage: "Naomba radhi, lakini nina tatizo la kuelewa ombi lako. Je, unaweza kuuliza tena swali lako au kuuliza kuhusu bidhaa, bei, au huduma zetu?",
      escalationMessage: "Inaonekana una nia kubwa katika suluhisho zetu! Je, ungependa kuzungumza moja kwa moja na mmoja wa wataalamu wetu wa ERP ya petroli?"
    },
    ha: {
      productOverview: "OilFlow BIDEC ERP tsarin tsara albarkatun kasuwanci ne da aka tsara musamman don masana'antar mai da gas. Muna hada binciken sama, jigilar tsaka-tsaki, da ayyukan kasa a cikin dandamali guda daya mai karfi.",
      pricingInfo: "Farashinmu ya danganta da bukatunku na musamman da girman kamfaninku. Muna ba da tsarin biyan kuɗi masu sassauƙa da yawan ribar saka jari daga 300-500% cikin watanni 18. Kina son in hada ku da tawagar siyarwa?",
      demoOffer: "Kyakkyawa! Nunin keɓaɓɓe shine hanya mafi kyau ta ganin yadda OilFlow BIDEC ERP zai iya amfanar kamfaninku. Za ku iya gaya mini sunanku da kamfaninku?",
      needMoreInfo: "Wannan tambaya ce mai kyau! Za ku iya ƙara fayyace abin da ke damun ku? Zan iya taimakawa da bayanin samfur, farashi, haɗuwa, ko shirya zanga-zanga.",
      errorMessage: "Yashi gafara, amma ina da matsalar fahimtar bukatarku. Za ku iya sake tambayar tambayarku ko tambaya game da samfuranmu, farashi, ko ayyukanmu?",
      escalationMessage: "Da alama kuna da sha'awar sosai ga bayar da shawarwarinmu! Kuna son yin magana kai tsaye da ɗaya daga cikin masana ERP na mai da gas?"
    }
  },

  // Quick action suggestions
  quickActions: {
    en: [
      "Learn about our products",
      "See pricing information", 
      "Schedule a demo",
      "Talk to an expert",
      "View success stories",
      "Integration options"
    ],
    fr: [
      "En savoir plus sur nos produits",
      "Voir les informations tarifaires",
      "Planifier une démonstration",
      "Parler à un expert",
      "Voir les histoires de succès",
      "Options d'intégration"
    ],
    ar: [
      "تعرف على منتجاتنا",
      "اطلع على معلومات الأسعار",
      "جدولة عرض توضيحي", 
      "تحدث مع خبير",
      "اطلع على قصص النجاح",
      "خيارات التكامل"
    ],
    sw: [
      "Jifunze kuhusu bidhaa zetu",
      "Ona maelezo ya bei",
      "Panga onyesho",
      "Zungumza na mtaalamu",
      "Ona hadithi za mafanikio",
      "Chaguo za miunganisho"
    ],
    ha: [
      "Koyi game da samfuranmu",
      "Dubi bayanan farashi",
      "Shirya zanga-zanga",
      "Yi magana da kwararre",
      "Dubi labarun nasara",
      "Zaɓuɓɓukan haɗuwa"
    ]
  }
};

// Language detection utilities
export class LanguageDetector {
  // Simple language detection based on character patterns and common words
  static detectLanguage(text: string): SupportedLanguage {
    const cleanText = text.toLowerCase().trim();
    
    // Arabic detection
    if (/[\u0600-\u06FF]/.test(text)) {
      return 'ar';
    }
    
    // French detection
    const frenchIndicators = ['bonjour', 'merci', 'oui', 'non', 'comment', 'pourquoi', 'parlez', 'français'];
    if (frenchIndicators.some(word => cleanText.includes(word))) {
      return 'fr';
    }
    
    // Swahili detection
    const swahiliIndicators = ['habari', 'karibu', 'asante', 'jambo', 'ninyi', 'mimi', 'kiswahili'];
    if (swahiliIndicators.some(word => cleanText.includes(word))) {
      return 'sw';
    }
    
    // Hausa detection
    const hausaIndicators = ['sannu', 'na gode', 'yaya', 'kai', 'ke', 'mu', 'harshen hausa'];
    if (hausaIndicators.some(word => cleanText.includes(word))) {
      return 'ha';
    }
    
    // Default to English
    return 'en';
  }
  
  static getBrowserLanguage(): SupportedLanguage {
    const browserLang = navigator.language.split('-')[0].toLowerCase();
    const supportedCodes = supportedLanguages.map(lang => lang.code);
    
    return supportedCodes.includes(browserLang as SupportedLanguage) 
      ? browserLang as SupportedLanguage 
      : 'en';
  }
}

// Translation service
export class TranslationService {
  private static translations = translations;
  
  static getTranslation(
    category: keyof typeof translations,
    key: string,
    language: SupportedLanguage = 'en'
  ): string {
    try {
      const categoryTranslations = this.translations[category] as any;
      return categoryTranslations[language]?.[key] || 
             categoryTranslations['en']?.[key] || 
             `[${category}.${key}]`;
    } catch {
      return `[${category}.${key}]`;
    }
  }
  
  static getUIText(key: string, language: SupportedLanguage = 'en'): string {
    return this.getTranslation('ui', key, language);
  }
  
  static getRandomGreeting(language: SupportedLanguage = 'en'): string {
    const greetings = this.translations.greetings[language] || this.translations.greetings['en'];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
  
  static getResponse(key: string, language: SupportedLanguage = 'en'): string {
    return this.getTranslation('responses', key, language);
  }
  
  static getQuickActions(language: SupportedLanguage = 'en'): string[] {
    return this.translations.quickActions[language] || this.translations.quickActions['en'];
  }
}

// Regional customization service
export class RegionalService {
  static getRegionForLanguage(language: SupportedLanguage): string {
    const langConfig = supportedLanguages.find(lang => lang.code === language);
    return langConfig?.region || 'global';
  }
  
  static getLocalizedContent(language: SupportedLanguage, contentType: string): any {
    const region = this.getRegionForLanguage(language);
    
    // Return region-specific content based on language and region
    const localizations = {
      africa: {
        challenges: [
          'infrastructure development', 'regulatory navigation', 
          'skills development', 'technology adoption', 'cost optimization'
        ],
        benefits: [
          'improved operational efficiency', 'better regulatory compliance',
          'enhanced local capabilities', 'cost reduction', 'technology transfer'
        ]
      },
      mena: {
        challenges: [
          'digital transformation', 'operational excellence',
          'regulatory compliance', 'cost efficiency', 'sustainability'
        ],
        benefits: [
          'enhanced productivity', 'better resource utilization',
          'improved compliance', 'cost optimization', 'sustainable operations'
        ]
      }
    };
    
    return localizations[region as keyof typeof localizations] || localizations['africa'];
  }
}

// Export utilities
export const getLanguageConfig = (code: SupportedLanguage): LanguageConfig | undefined => {
  return supportedLanguages.find(lang => lang.code === code);
};

export const isRTLLanguage = (language: SupportedLanguage): boolean => {
  const config = getLanguageConfig(language);
  return config?.rtl || false;
};