"use client";

import Hero from "@/components/sections/Hero";
import Navigation from "@/components/Navigation";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Create a simple mobile loading component
const MobileLoading = () => (
  <div className="h-20 flex items-center justify-center md:h-96">
    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin md:w-6 md:h-6" />
  </div>
);

// Lazy load non-critical components with mobile-optimized loading
const About = dynamic(() => import("@/components/sections/About"), {
  loading: () => <MobileLoading />
});
const Skills = dynamic(() => import("@/components/sections/Skills"), {
  loading: () => <MobileLoading />
});
const Projects = dynamic(() => import("@/components/sections/Projects"), {
  loading: () => <MobileLoading />
});
const Experience = dynamic(() => import("@/components/sections/Experience"), {
  loading: () => <MobileLoading />
});
const Contact = dynamic(() => import("@/components/sections/Contact"), {
  loading: () => <MobileLoading />
});

// Optimize AI Chat and FloatingElements for mobile
const AIChat = dynamic(() => import("@/components/AIChat"), {
  ssr: false
});

const FloatingElements = dynamic(() => import("@/components/FloatingElements"), {
  ssr: false,
});

const FloatingContacts = dynamic(() => import("@/components/FloatingContacts"), {
  ssr: false,
});

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-white dark:bg-neutral-900 transition-colors duration-300">
      {/* Subtle Background Pattern - Reduced opacity on mobile */}
      <div className="fixed inset-0 grid-bg opacity-30 md:opacity-50" />
      
      {/* Floating Background Elements - Only show on desktop */}
      {isMounted && (
        <div className="hidden md:block">
          <FloatingElements />
        </div>
      )}
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      
      {/* AI Chat Component - Show on all screen sizes */}
      {isMounted && <AIChat />}
      
      {/* Floating Contacts Component - Show on all screen sizes */}
      {isMounted && <FloatingContacts />}
    </div>
  );
}
