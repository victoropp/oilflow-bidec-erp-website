'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  Minimize2, 
  Globe,
  User,
  Bot,
  ExternalLink,
  Phone
} from 'lucide-react';
import { clsx } from 'clsx';

// Types
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  language?: string;
}

interface ChatbotContext {
  sessionId: string;
  leadScore: number;
  stage: string;
  language: string;
}

interface ChatbotResponse {
  success: boolean;
  message: ChatMessage;
  context: ChatbotContext;
  suggestions?: string[];
  shouldEscalate?: boolean;
  escalationMessage?: string;
}

// Language configuration
const languages = {
  en: {
    name: 'English',
    flag: '🇺🇸',
    placeholder: 'Type your message...',
    send: 'Send',
    minimize: 'Minimize',
    close: 'Close',
    typing: 'Alex is typing...',
    error: 'Sorry, something went wrong. Please try again.',
    escalation: 'Talk to Expert',
    newConversation: 'New Conversation'
  },
  fr: {
    name: 'Français',
    flag: '🇫🇷',
    placeholder: 'Tapez votre message...',
    send: 'Envoyer',
    minimize: 'Réduire',
    close: 'Fermer',
    typing: 'Alex tape...',
    error: 'Désolé, quelque chose a mal tourné. Veuillez réessayer.',
    escalation: 'Parler à un Expert',
    newConversation: 'Nouvelle Conversation'
  }
};

const ChatbotWidget: React.FC = () => {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [context, setContext] = useState<ChatbotContext>({
    sessionId,
    leadScore: 0,
    stage: 'greeting',
    language: 'en'
  });
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'fr'>('en');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showEscalation, setShowEscalation] = useState(false);
  
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  // Initialize conversation
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: `welcome_${Date.now()}`,
        role: 'assistant',
        content: currentLanguage === 'fr' 
          ? "Bonjour ! Je suis Alex, votre assistant OilFlow BIDEC ERP. Comment puis-je vous aider aujourd'hui ?"
          : "Hello! I'm Alex, your OilFlow BIDEC ERP assistant. How can I help you today?",
        timestamp: new Date().toISOString(),
        language: currentLanguage
      };
      setMessages([welcomeMessage]);
      setSuggestions(
        currentLanguage === 'fr'
          ? ['En savoir plus sur vos produits', 'Voir les informations tarifaires', 'Planifier une démonstration', 'Parler à un expert']
          : ['Learn about your products', 'See pricing information', 'Schedule a demo', 'Talk to an expert']
      );
    }
  }, [isOpen, currentLanguage]);

  // Handle sending message
  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue.trim();
    if (!textToSend) return;

    setInputValue('');
    setIsLoading(true);

    // Add user message
    const userMessage: ChatMessage = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toISOString(),
      language: currentLanguage
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      // Call chatbot API
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: context.sessionId,
          message: textToSend,
          language: currentLanguage,
          context: {
            userAgent: navigator.userAgent,
            referrer: document.referrer,
            timestamp: new Date().toISOString()
          }
        })
      });

      const data: ChatbotResponse = await response.json();

      if (data.success) {
        setMessages(prev => [...prev, data.message]);
        setContext(data.context);
        setSuggestions(data.suggestions || []);
        
        if (data.shouldEscalate) {
          setShowEscalation(true);
        }
      } else {
        throw new Error('API request failed');
      }
    } catch (error) {
      console.error('Chatbot error:', error);
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: `error_${Date.now()}`,
        role: 'assistant',
        content: languages[currentLanguage].error,
        timestamp: new Date().toISOString(),
        language: currentLanguage
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle language change
  const handleLanguageChange = (lang: 'en' | 'fr') => {
    setCurrentLanguage(lang);
    setContext(prev => ({ ...prev, language: lang }));
    setShowLanguageMenu(false);
    
    // Reset conversation with new language
    setMessages([]);
    setSuggestions([]);
    setShowEscalation(false);
  };

  // Handle escalation
  const handleEscalation = () => {
    window.open('/request-demo', '_blank');
    setShowEscalation(false);
  };

  // Render chat bubble
  const renderChatBubble = () => (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setIsOpen(true)}
      className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300/50"
      aria-label="Open chat"
    >
      <MessageCircle className="h-6 w-6" />
      {context.leadScore > 0 && (
        <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
          !
        </div>
      )}
    </motion.button>
  );

  // Render chat window
  const renderChatWindow = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: 0,
        height: isMinimized ? 60 : 500
      }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      className={clsx(
        "fixed bottom-6 right-6 z-50 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden",
        isMinimized && "h-auto"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
        <div className="flex items-center space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
            <Bot className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-medium">Alex - OilFlow Assistant</h3>
            <p className="text-xs text-blue-100">
              {isLoading ? languages[currentLanguage].typing : 'Online'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="flex items-center space-x-1 rounded-lg bg-white/20 px-2 py-1 text-xs hover:bg-white/30 focus:outline-none"
              aria-label="Select language"
            >
              <Globe className="h-3 w-3" />
              <span>{languages[currentLanguage].flag}</span>
            </button>
            
            {showLanguageMenu && (
              <div className="absolute right-0 top-full mt-1 w-32 rounded-lg bg-white py-1 shadow-lg">
                {Object.entries(languages).map(([code, lang]) => (
                  <button
                    key={code}
                    onClick={() => handleLanguageChange(code as 'en' | 'fr')}
                    className="flex w-full items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="rounded-lg p-1 hover:bg-white/20 focus:outline-none"
            aria-label={languages[currentLanguage].minimize}
          >
            <Minimize2 className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-1 hover:bg-white/20 focus:outline-none"
            aria-label={languages[currentLanguage].close}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex h-80 flex-col overflow-hidden">
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={clsx(
                    "flex items-start space-x-3",
                    message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  )}
                >
                  <div className={clsx(
                    "flex h-8 w-8 items-center justify-center rounded-full",
                    message.role === 'user' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-gray-100 text-gray-600'
                  )}>
                    {message.role === 'user' ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  
                  <div className={clsx(
                    "max-w-xs rounded-2xl px-4 py-2 text-sm",
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  )}>
                    {message.content}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-start space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="flex space-x-1 rounded-2xl bg-gray-100 px-4 py-2">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{animationDelay: '0.1s'}}></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="border-t bg-gray-50 p-3">
                <div className="mb-2 text-xs font-medium text-gray-600">
                  {currentLanguage === 'fr' ? 'Suggestions' : 'Quick Actions'}:
                </div>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(suggestion)}
                      className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Escalation prompt */}
            {showEscalation && (
              <div className="border-t bg-orange-50 p-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-orange-800">
                    {currentLanguage === 'fr' 
                      ? 'Prêt à parler à un expert ?' 
                      : 'Ready to talk to an expert?'}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleEscalation}
                      className="flex items-center space-x-1 rounded-lg bg-orange-600 px-3 py-1 text-xs text-white hover:bg-orange-700 focus:outline-none"
                    >
                      <Phone className="h-3 w-3" />
                      <span>{languages[currentLanguage].escalation}</span>
                      <ExternalLink className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => setShowEscalation(false)}
                      className="rounded-lg bg-gray-200 px-2 py-1 text-xs text-gray-600 hover:bg-gray-300 focus:outline-none"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t bg-white p-4">
            <div className="flex items-center space-x-3">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={languages[currentLanguage].placeholder}
                className="flex-1 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                disabled={isLoading}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={isLoading || !inputValue.trim()}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300/50 disabled:bg-gray-300 disabled:cursor-not-allowed"
                aria-label={languages[currentLanguage].send}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );

  return (
    <>
      <AnimatePresence>
        {!isOpen && renderChatBubble()}
      </AnimatePresence>
      
      <AnimatePresence>
        {isOpen && renderChatWindow()}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;