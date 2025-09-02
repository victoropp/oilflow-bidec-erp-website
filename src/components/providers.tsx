'use client';

import React from 'react';
import { MotionConfig } from 'framer-motion';
import { ChatbotProvider } from '@/contexts/ChatbotContext';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <MotionConfig reducedMotion="user">
      <ChatbotProvider>
        {children}
      </ChatbotProvider>
    </MotionConfig>
  );
}