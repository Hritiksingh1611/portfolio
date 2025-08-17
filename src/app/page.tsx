"use client";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import Navigation from "@/components/Navigation";
import dynamic from "next/dynamic";
import AIChat from "@/components/AIChat";

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
