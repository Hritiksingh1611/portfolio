"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon, Briefcase, FileText } from "lucide-react";
import RecruiterModal from "@/components/RecruiterModal";
import { getAssetPath } from "@/lib/assets";

const navItems = [
  { id: "home",       label: "Home",       href: "#" },
  { id: "about",      label: "About",      href: "#about" },
  { id: "skills",     label: "Skills",     href: "#skills" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "projects",   label: "Projects",   href: "#projects" },
  { id: "contact",    label: "Contact",    href: "#contact" },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [recruiterOpen, setRecruiterOpen] = useState(false);
  const { theme, setTheme }               = useTheme();
  const [mounted, setMounted]             = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 60);
      const scrollY = window.scrollY + 140;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const el = document.getElementById(navItems[i].id);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    if (href === "#") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    const el = document.querySelector(href) as HTMLElement | null;
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <>
      {/* ── Desktop nav ── */}
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none"
      >
        <div
          className={`pointer-events-auto flex items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-300 ${
            isScrolled
              ? "glass-strong shadow-2xl shadow-black/10 dark:shadow-black/20 border border-black/[0.07] dark:border-white/10"
              : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <button
            onClick={() => scrollTo("#")}
            className="px-3 py-1.5 mr-1 font-display font-black text-lg text-gradient tracking-tight"
          >
            HS
          </button>

          {/* Nav items — desktop */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navItems.map(({ id, label, href }) => (
              <button
                key={id}
                onClick={() => scrollTo(href)}
                className={`relative px-3.5 py-1.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                  activeSection === id
                    ? "text-violet-700 dark:text-white"
                    : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
                }`}
              >
                {activeSection === id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-xl bg-violet-500/12 dark:bg-white/10 border border-violet-500/25 dark:border-white/15"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            ))}
          </nav>

          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="ml-1.5 p-2 rounded-xl text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-200"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          )}

          {/* Recruiter 1-Page Quick Scan Button */}
          <button
            onClick={() => setRecruiterOpen(true)}
            className="ml-1.5 text-xs font-mono font-semibold px-2.5 py-1.5 rounded-xl border border-violet-500/30 text-violet-700 dark:text-violet-300 hover:bg-violet-500/10 transition-all hidden lg:inline-flex items-center gap-1"
          >
            <Briefcase size={13} /> Recruiter View
          </button>

          {/* Quick Resume Link */}
          <a
            href={getAssetPath("/resume.pdf")}
            download="Hritik_Singh_Data_Engineer_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1.5 text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white transition-all shadow-md hidden sm:inline-flex items-center gap-1"
          >
            <FileText size={13} /> Resume
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden ml-1 p-2 rounded-xl text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-200"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.header>

      {/* ── Recruiter Modal ── */}
      <RecruiterModal isOpen={recruiterOpen} onClose={() => setRecruiterOpen(false)} />

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />
            <motion.div
              key="panel"
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-20 left-4 right-4 z-50 glass-strong rounded-2xl border border-white/10 p-3 md:hidden shadow-2xl flex flex-col gap-1"
            >
              {navItems.map(({ id, label, href }, i) => (
                <motion.button
                  key={id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => scrollTo(href)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeSection === id
                      ? "bg-violet-500/12 dark:bg-white/10 text-violet-700 dark:text-white border border-violet-500/25 dark:border-white/15"
                      : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-white/8"
                  }`}
                >
                  {label}
                </motion.button>
              ))}

              <button
                onClick={() => { setMobileOpen(false); setRecruiterOpen(true); }}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-violet-400 bg-violet-500/10 border border-violet-500/20 mt-1 flex items-center justify-between"
              >
                <span>Brief Recruiter Executive View</span>
                <Briefcase size={16} />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
