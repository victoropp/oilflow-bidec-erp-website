'use client';

import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface AnimatedCounterProps {
  from: number;
  to: number;
  duration?: number;
  delay?: number;
  decimals?: number;
}

export function AnimatedCounter({
  from,
  to,
  duration = 2,
  delay = 0,
  decimals = 0,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(from);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (!inView) return;

    const timer = setTimeout(() => {
      const increment = (to - from) / (duration * 60); // 60fps
      let current = from;

      const counter = setInterval(() => {
        current += increment;
        if (current >= to) {
          setCount(to);
          clearInterval(counter);
        } else {
          setCount(current);
        }
      }, 1000 / 60);

      return () => clearInterval(counter);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [inView, from, to, duration, delay]);

  return (
    <span ref={ref}>
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
    </span>
  );
}