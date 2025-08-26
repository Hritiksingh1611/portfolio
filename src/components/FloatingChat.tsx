"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

type ChatMessage = {
  id: string;
  text: string;
  sender: "user" | "ai";
};

const getAIReply = (input: string): string => {
  const msg = input.toLowerCase();
  if (msg.includes("experience") || msg.includes("work")) {
    return "I have 2+ years in data engineering, building ETL on AWS (Glue, Redshift, S3) and Snowflake.";
  }
  if (msg.includes("skills") || msg.includes("stack") || msg.includes("tech")) {
    return "Core skills: Python, SQL, AWS Glue, Redshift, Snowflake, Power BI. Also React/Next.js for frontend.";
  }
  if (msg.includes("project") || msg.includes("portfolio")) {
    return "Notable projects: AWS Data Pipeline System, reviewProbe Jobs platform, BI dashboards.";
  }
  if (msg.includes("contact") || msg.includes("email") || msg.includes("reach")) {
    return "You can reach me via the Contact section (bottom-right button) or email: hritik16.work@gmail.com.";
  }
  return "Ask about my experience, skills, or projects. I can also guide you to the Contact section.";
};

export default function FloatingChat() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  // Edge/Android mobile: address bar changes visual viewport height.
  // Compute a dynamic bottom offset so the button stays above browser chrome.
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
  const chatBottom = useMemo(() => `${baseBottom + vvOffset}px`, [vvOffset]);
  const panelBottom = useMemo(() => `${baseBottom + 60 + vvOffset}px`, [vvOffset]);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "ai-welcome", text: "Hi! I'm Hritik's AI assistant. How can I help?", sender: "ai" },
  ]);
  const [sending, setSending] = useState(false);
  const [typing, setTyping] = useState(false);

  const quickSuggestions = [
    "Show my key skills",
    "Summarize my experience",
    "List featured projects",
    "How to contact me?",
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
    }, 700);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const jsx = (
    <>
      <motion.button
        aria-label="Open AI chat"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        onClick={() => setOpen((v) => !v)}
        className={`fixed left-4 md:left-6 z-[1000] h-14 w-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all
        bg-gradient-to-r from-blue-600 to-indigo-600 text-white pointer-events-auto`}
        style={{ bottom: chatBottom }}
      >
        <MessageCircle size={20} />
      </motion.button>

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
            <div className="relative glass-effect bg-white/90 dark:bg-neutral-900/80 border border-white/20 dark:border-white/10 backdrop-blur-md">
              {/* Subtle blue glow ring */}
              <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-r from-blue-500/25 via-indigo-500/25 to-blue-500/25 blur-[6px]"></div>

              <div className="relative flex items-center justify-between px-4 py-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                    <Bot size={14} />
                  </div>
                  <span className="text-sm font-semibold">AI Assistant</span>
                </div>
                <button aria-label="Close chat" onClick={() => setOpen(false)} className="p-1 text-slate-600 dark:text-slate-300 hover:opacity-80">
                  <X size={16} />
                </button>
              </div>

              {/* Messages */}
              <div className="relative max-h-[50vh] overflow-y-auto px-3 py-3 space-y-3">
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`flex items-start gap-2 max-w-[80%] ${m.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center ${m.sender === "user" ? "bg-blue-600" : "bg-gradient-to-r from-blue-600 to-indigo-600"}`}>
                        {m.sender === "user" ? <User size={12} className="text-white" /> : <Bot size={12} className="text-white" />}
                      </div>
                      <div className={`px-3 py-2 rounded-2xl text-sm ${m.sender === "user" ? "bg-blue-600 text-white" : "bg-white/70 dark:bg-white/10"}`}>
                        {m.text}
                      </div>
                    </div>
                  </div>
                ))}
                {typing && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-2 max-w-[80%]">
                      <div className="h-6 w-6 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600">
                        <Bot size={12} className="text-white" />
                      </div>
                      <div className="px-3 py-2 rounded-2xl text-sm bg-white/60 dark:bg-white/10">
                        <span className="inline-flex gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce [animation-delay:-.2s]"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce [animation-delay:-.1s]"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce"></span>
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick suggestions */}
              <div className="px-3 pb-2 flex flex-wrap gap-2">
                {quickSuggestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      setInput(q);
                      setTimeout(() => send(), 0);
                    }}
                    className="px-3 py-1 rounded-full text-xs bg-slate-100/70 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-white/10 hover:bg-slate-200/70 dark:hover:bg-white/10"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Composer */}
              <div className="px-3 py-3 border-t border-white/10 flex items-center gap-2 bg-white/50 dark:bg-neutral-900/30">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Ask about skills, projects, contact..."
                  className="flex-1 px-3 py-2 rounded-lg bg-white/90 dark:bg-white/10 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 outline-none focus:ring-1 focus:ring-blue-600"
                />
                <button
                  aria-label="Send message"
                  onClick={send}
                  disabled={sending || !input.trim()}
                  className="h-10 w-10 rounded-lg flex items-center justify-center text-white disabled:opacity-50 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for outside click to close */}
      <AnimatePresence>
        {open && (
          <motion.button
            aria-label="Close chat overlay"
            key="chat-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[950] bg-black/30 backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>
    </>
  );

  if (!mounted) return null;
  return createPortal(jsx, document.body);
}


