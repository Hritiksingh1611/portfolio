"use client";

import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Log performance metrics in development
    if (process.env.NODE_ENV === 'development') {
      // Simple performance logging
      const logPerformance = () => {
        if (typeof window !== 'undefined' && 'performance' in window) {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
          const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
          
          console.log('Performance Metrics:', {
            'Page Load Time': `${loadTime.toFixed(2)}ms`,
            'DOM Content Loaded': `${domContentLoaded.toFixed(2)}ms`,
            'First Paint': navigation.responseEnd - navigation.fetchStart
          });
        }
      };

      // Log after page load
      if (document.readyState === 'complete') {
        setTimeout(logPerformance, 1000);
      } else {
        window.addEventListener('load', () => setTimeout(logPerformance, 1000));
      }
    }
  }, []);

  return null;
}
