"use client";

import Hero from "@/components/sections/Hero";
import Navigation from "@/components/Navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import dynamic from "next/dynamic";

// Lazy load non-critical components to improve initial load time
const About = dynamic(() => import("@/components/sections/About"), {
  loading: () => <LoadingSpinner />
});
const Skills = dynamic(() => import("@/components/sections/Skills"), {
  loading: () => <LoadingSpinner />
});
const Projects = dynamic(() => import("@/components/sections/Projects"), {
  loading: () => <LoadingSpinner />
});
const Experience = dynamic(() => import("@/components/sections/Experience"), {
  loading: () => <LoadingSpinner />
});
const Contact = dynamic(() => import("@/components/sections/Contact"), {
  loading: () => <LoadingSpinner />
});
const AIChat = dynamic(() => import("@/components/AIChat"), {
  ssr: false
});

// Dynamically import FloatingElements with no SSR to prevent hydration issues
const FloatingElements = dynamic(() => import("@/components/FloatingElements"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white transition-colors duration-300">
      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 grid-bg opacity-50" />
      
      {/* Floating Background Elements */}
      <FloatingElements />
      
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
      
      {/* AI Chat Component */}
      <AIChat />
    </div>
  );
}
