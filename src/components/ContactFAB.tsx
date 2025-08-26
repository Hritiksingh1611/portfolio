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
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Track Edge/Android visual viewport to keep FAB above browser chrome
  const [vvOffset, setVvOffset] = useState(0);
  useEffect(() => {
    if (typeof window === 'undefined' || !('visualViewport' in window)) return;
    const update = () => {
      const vv = window.visualViewport as VisualViewport;
      const offset = Math.max(0, Math.round((window.innerHeight - vv.height)));
      setVvOffset(offset);
    };
    update();
    window.visualViewport?.addEventListener('resize', update);
    window.visualViewport?.addEventListener('scroll', update);
    return () => {
      window.visualViewport?.removeEventListener('resize', update);
      window.visualViewport?.removeEventListener('scroll', update);
    };
  }, []);
  const baseBottom = 20; // px
  const fabBottom = useMemo(() => `${baseBottom + vvOffset}px`, [vvOffset]);

  const jsx = (
    <motion.button
      aria-label="Go to contact section"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.8 }}
      onClick={scrollToContact}
      className="fixed right-4 md:right-6 z-[1000] h-14 w-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all btn-accent text-white pointer-events-auto"
      style={{ bottom: fabBottom }}
    >
      <Mail size={20} />
    </motion.button>
  );

  if (!mounted) return null;
  return createPortal(jsx, document.body);
}


