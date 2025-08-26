"use client";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import Navigation from "@/components/Navigation";

export default function Home() {
  return (
    <>
      <div className="relative min-h-screen bg-white dark:bg-neutral-900 transition-colors duration-300">
        {/* Subtle Background Pattern - Reduced opacity on mobile */}
        <div className="fixed inset-0 grid-bg opacity-30 md:opacity-50" />
        
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
      </div>
    </>
  );
}
