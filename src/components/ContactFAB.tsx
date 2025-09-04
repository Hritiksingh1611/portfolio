"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Mail } from "lucide-react";

export default function ContactFAB() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      // Fallback: navigate hash (in case the section loads later)
      window.location.hash = "#contact";
    }
  };

  // Keep button elevated above dynamic mobile browser chrome (Edge/Android)
  const [vvOffset, setVvOffset] = useState(0);
  useEffect(() => {
    if (typeof window === "undefined" || !("visualViewport" in window)) return;
    const update = () => {
      const vv = window.visualViewport as VisualViewport;
      const offset = Math.max(0, Math.round(window.innerHeight - vv.height));
      setVvOffset(offset);
    };
    update();
    window.visualViewport?.addEventListener("resize", update);
    window.visualViewport?.addEventListener("scroll", update);
    return () => {
      window.visualViewport?.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("scroll", update);
    };
  }, []);

  const BASE_BOTTOM = 20; // px baseline bottom spacing (matches chat trigger)
  const DIAMETER = 48; // unified size with AI chat button
  const fabBottom = useMemo(() => `${BASE_BOTTOM + vvOffset}px`, [vvOffset]);

  const jsx = (
    <motion.button
      aria-label="Open contact section"
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.06, rotate: 1.5 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.3 }}
      onClick={scrollToContact}
      style={{ bottom: fabBottom, height: DIAMETER, width: DIAMETER }}
      className="fixed right-4 md:right-6 z-[1000] group rounded-full flex items-center justify-center overflow-hidden outline-none focus:ring-4 focus:ring-indigo-400/40 pointer-events-auto"
    >
      {/* Conic gradient outer ring (spins slowly) */}
      <span className="absolute inset-0 rounded-full bg-[conic-gradient(at_30%_30%,#3b82f6,#6366f1,#8b5cf6,#3b82f6)] animate-[spin_9s_linear_infinite] opacity-90 group-hover:opacity-100" />
      {/* Radial inner glow */}
      <span className="absolute inset-0 rounded-full blur-md bg-[radial-gradient(circle_at_65%_35%,rgba(255,255,255,0.35),rgba(59,130,246,0)_60%)] opacity-70 group-hover:opacity-90 transition-opacity" />
      {/* Glass inner core */}
      <span className="absolute inset-[3px] rounded-full bg-slate-900/85 dark:bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_4px_12px_-2px_rgba(79,70,229,0.45),0_8px_28px_-6px_rgba(59,130,246,0.35)]" />
      {/* Shimmer sweep */}
      <span className="pointer-events-none absolute -inset-1 rounded-full overflow-hidden">
        <span className="absolute top-0 left-[-120%] h-full w-[120%] bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-12 group-hover:translate-x-[220%] transition-transform duration-[1400ms] ease-out" />
      </span>
      {/* Icon */}
      <span className="relative z-10 flex items-center justify-center text-white drop-shadow-sm">
        <Mail size={22} />
      </span>
      {/* Focus + hover ring */}
      <span className="absolute inset-0 rounded-full ring-2 ring-indigo-400/0 group-hover:ring-indigo-300/30 group-active:ring-indigo-400/50 transition" />
    </motion.button>
  );

  if (!mounted) return null;
  return createPortal(jsx, document.body);
}


