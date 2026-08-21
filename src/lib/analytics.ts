"use client";

export function trackEvent(eventName: string, properties?: Record<string, unknown>) {
  if (typeof window !== "undefined") {
    const win = window as unknown as { gtag?: (type: string, name: string, props?: Record<string, unknown>) => void };
    if (win.gtag) {
      win.gtag("event", eventName, properties);
    }
    if (process.env.NODE_ENV === "development") {
      console.log(`[Analytics Event] ${eventName}:`, properties);
    }
  }
}
