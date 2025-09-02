import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn('fill-current', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="50%" stopColor="#facc15" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      
      {/* Outer circle representing global reach */}
      <circle
        cx="20"
        cy="20"
        r="18"
        fill="none"
        stroke="url(#logo-gradient)"
        strokeWidth="2"
        opacity="0.6"
      />
      
      {/* Oil drop shape */}
      <path
        d="M20 4 C25 4, 28 8, 28 14 C28 20, 24 24, 20 24 C16 24, 12 20, 12 14 C12 8, 15 4, 20 4 Z"
        fill="url(#logo-gradient)"
        opacity="0.9"
      />
      
      {/* Flow lines representing data streams */}
      <g stroke="currentColor" strokeWidth="2" fill="none" opacity="0.7">
        <path d="M8 28 Q14 26, 20 28 Q26 30, 32 28" strokeLinecap="round" />
        <path d="M6 32 Q12 30, 20 32 Q28 34, 34 32" strokeLinecap="round" />
      </g>
      
      {/* Center dot representing core system */}
      <circle cx="20" cy="14" r="3" fill="white" />
    </svg>
  );
}