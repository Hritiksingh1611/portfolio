"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";

type ChatMessage = {
  id: string;
  text: string;
  sender: "user" | "ai";
};

const getAIReply = (input: string): string => {
  const msg = input.toLowerCase();
  if (msg.includes("experience") || msg.includes("work") || msg.includes("role")) {
    return "Hritik has 3+ years of Data Engineering experience at Workmates Core2Cloud and CSS LLC. He specializes in AWS Glue, PySpark, Redshift, SAP OData integrations, and AWS DMS CDC workflows.";
  }
  if (msg.includes("skills") || msg.includes("stack") || msg.includes("tech")) {
    return "Core skills: PySpark, AWS Glue, Amazon Redshift, AWS DMS (CDC), Python, SQL, Apache Airflow, Kafka, GCP BigQuery, PostgreSQL, QuickSight, and Power BI.";
  }
  if (msg.includes("project") || msg.includes("portfolio")) {
    return "Key projects: SAP OData Integration Pipeline, Multi-DB DMS CDC Migration, S3 Database Archival & Cost Analytics, and Enterprise Marketing DW.";
  }
  if (msg.includes("certif") || msg.includes("credential")) {
    return "Hritik holds 6 certifications including GCP Professional Data Engineer, AWS Certified Data Engineer, AWS Machine Learning Engineer, AWS AI Practitioner, GCP Cloud Engineer, and GitHub Foundations.";
  }
  if (msg.includes("education") || msg.includes("college") || msg.includes("degree")) {
    return "Hritik completed his MCA at Techno India University (8.64 CGPA) and BCA at Techno Main Saltlake (9.34 CGPA).";
  }
  if (msg.includes("contact") || msg.includes("email") || msg.includes("phone")) {
    return "You can reach Hritik via email at hritiksingh1611@gmail.com or phone at +91-9123964918.";
  }
  return "Ask me about Hritik's 3+ years experience, SAP & CDC pipelines, AWS/GCP certifications, or education!";
};

export default function FloatingChat() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

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

  const baseBottom = 20;
  const CIRCLE_DIAMETER = 48;
  const GAP_ABOVE_TRIGGER = 12;
  const chatBottom = useMemo(() => `${baseBottom + vvOffset}px`, [vvOffset]);
  const panelBottom = useMemo(() => `${baseBottom + CIRCLE_DIAMETER + GAP_ABOVE_TRIGGER + vvOffset}px`, [vvOffset]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = window.localStorage.getItem('chat-open');
    if (saved === '1') setOpen(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('chat-open', open ? '1' : '0');
  }, [open]);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "ai-welcome", text: "Hi! I'm Hritik's Data Engineering Assistant. Ask me anything about his 3+ yrs exp, AWS/GCP certs, or pipelines!", sender: "ai" },
  ]);

  const liveRegionRef = useRef<HTMLDivElement | null>(null);
  const [sending, setSending] = useState(false);
  const [typing, setTyping] = useState(false);

  const quickSuggestions = [
    "3+ Yrs Experience",
    "AWS & GCP Certs",
    "SAP & CDC Pipelines",
    "Contact Info",
  ];

  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, text, sender: "user" };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setSending(true);
    setTyping(true);
    setTimeout(() => {
      const aiMsg: ChatMessage = { id: `a-${Date.now()}`, text: getAIReply(text), sender: "ai" };
      setMessages((m) => [...m, aiMsg]);
      setSending(false);
      setTyping(false);
      if (liveRegionRef.current) liveRegionRef.current.textContent = aiMsg.text;
    }, 600);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const jsx = (
    <>
      <div className="fixed left-4 md:left-6 z-[1000] pointer-events-auto" style={{ bottom: chatBottom }}>
        <motion.button
          aria-label={open ? "Close AI chat" : "Open AI chat"}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setOpen((v) => !v)}
          style={{ height: CIRCLE_DIAMETER, width: CIRCLE_DIAMETER }}
          className="relative group rounded-full flex items-center justify-center overflow-hidden outline-none focus:ring-4 focus:ring-violet-400/40"
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 animate-spin-slow opacity-90" />
          <span className="absolute inset-[2px] rounded-full bg-slate-900/90 backdrop-blur-md" />
          <span className="relative z-10 text-white">
            <MessageCircle size={22} />
          </span>
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.2 }}
            className="fixed left-4 md:left-6 z-[1000] w-[92vw] max-w-sm rounded-2xl overflow-hidden shadow-2xl"
            style={{ bottom: panelBottom }}
          >
            <div className="glass bg-slate-950/90 border border-white/10 backdrop-blur-xl">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-violet-600 flex items-center justify-center text-white">
                    <Bot size={15} />
                  </div>
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">Data Copilot</span>
                </div>
                <button aria-label="Close chat" onClick={() => setOpen(false)} className="p-1 text-slate-400 hover:text-white">
                  <X size={16} />
                </button>
              </div>

              {/* Messages Container */}
              <div className="max-h-[220px] overflow-y-auto px-3 py-3 space-y-2 text-xs font-sans">
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] px-3.5 py-2.5 rounded-xl leading-relaxed ${
                        m.sender === "user"
                          ? "bg-violet-600 text-white rounded-tr-none font-medium"
                          : "bg-white/10 text-slate-200 rounded-tl-none border border-white/5"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
                {typing && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 px-3 py-2 rounded-xl text-slate-400 font-mono text-[11px]">
                      Thinking...
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Prompt Pills */}
              <div className="px-3 pb-2 flex flex-wrap gap-1.5">
                {quickSuggestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => { setInput(q); setTimeout(() => send(), 0); }}
                    className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Input Box */}
              <div className="px-3 py-2.5 border-t border-white/10 flex items-center gap-2 bg-slate-900/60">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Ask about skills, CDC, AWS..."
                  className="flex-1 px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-white placeholder-slate-400 text-xs outline-none focus:border-violet-500"
                />
                <button
                  onClick={send}
                  disabled={sending || !input.trim()}
                  className="h-8 w-8 rounded-lg flex items-center justify-center text-white bg-violet-600 disabled:opacity-50"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  if (!mounted) return null;
  return createPortal(jsx, document.body);
}
