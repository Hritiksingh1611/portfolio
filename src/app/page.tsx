"use client";

import Hero       from "@/components/sections/Hero";
import About      from "@/components/sections/About";
import Skills     from "@/components/sections/Skills";
import Projects   from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact    from "@/components/sections/Contact";
import Navigation from "@/components/Navigation";
import Footer     from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#f9f9fc] dark:bg-[#08080f]">
      <Navigation />
      <main>

        {/* Hero — always dark, manages its own bg */}
        <Hero />

        {/* About — clean white / deep dark */}
        <div className="bg-white dark:bg-[#0c0c1a] border-t border-neutral-100 dark:border-white/[0.04]">
          <About />
        </div>

        {/* Skills — subtle tint */}
        <div className="bg-slate-50 dark:bg-[#07070e] border-t border-neutral-100 dark:border-white/[0.04]">
          <Skills />
        </div>

        {/* Experience — clean white / deep dark */}
        <div className="bg-white dark:bg-[#0c0c1a] border-t border-neutral-100 dark:border-white/[0.04]">
          <Experience />
        </div>

        {/* Projects — subtle tint */}
        <div className="bg-slate-50 dark:bg-[#07070e] border-t border-neutral-100 dark:border-white/[0.04]">
          <Projects />
        </div>

        {/* Contact — always dark, manages its own bg */}
        <div className="border-t border-violet-500/10">
          <Contact />
        </div>

      </main>

      {/* Footer — follows page background */}
      <Footer />
    </div>
  );
}
