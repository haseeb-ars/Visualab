"use client";

import React, { useEffect, useState, useRef } from "react";

interface CountingNumberProps {
  value: number;
  suffix?: string;
  duration?: number; // ms
}

export default function CountingNumber({ value, suffix = "", duration = 2000 }: CountingNumberProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let startTimestamp: number | null = null;
    
    // Intersection Observer to start counting only when visible
    let observer: IntersectionObserver;
    let started = false;

    const startCounting = () => {
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setCount(Math.floor(progress * value));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(value);
        }
      };
      window.requestAnimationFrame(step);
    };

    if (countRef.current) {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          startCounting();
        }
      }, { threshold: 0.1 });
      observer.observe(countRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [value, duration]);

  return (
    <span ref={countRef}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
