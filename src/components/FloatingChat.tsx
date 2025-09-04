"use client";

import { useEffect, useMemo, useState, useRef } from "react";
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
  const CIRCLE_DIAMETER = 48; // unified size for trigger + avatars
  const GAP_ABOVE_TRIGGER = 12; // space between trigger and panel
  const chatBottom = useMemo(() => `${baseBottom + vvOffset}px`, [vvOffset]);
  const panelBottom = useMemo(() => `${baseBottom + CIRCLE_DIAMETER + GAP_ABOVE_TRIGGER + vvOffset}px`, [vvOffset]);
  const [open, setOpen] = useState(false);
  // Restore persisted open state
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
    { id: "ai-welcome", text: "Hi! I'm Hritik's AI assistant. How can I help?", sender: "ai" },
  ]);
  // One-time helper tip after open (once per session)
  useEffect(() => {
    if (!open) return;
    if (typeof window === 'undefined') return;
    if (window.sessionStorage.getItem('chat-tip-shown')) return;
    const t = setTimeout(() => {
      setMessages(m => [...m, { id: 'ai-tip', text: 'Try asking: "Summarize my experience" or "Show my key skills"', sender: 'ai' }]);
      window.sessionStorage.setItem('chat-tip-shown', '1');
    }, 1200);
    return () => clearTimeout(t);
  }, [open]);
  const liveRegionRef = useRef<HTMLDivElement | null>(null);
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
      if (liveRegionRef.current) liveRegionRef.current.textContent = aiMsg.text;
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
  <div className="fixed left-4 md:left-6 z-[1000] pointer-events-auto" style={{ bottom: chatBottom }}>
        <motion.button
          aria-label={open ? "Close AI chat" : "Open AI chat"}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.06, rotate: 1.5 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.25 }}
          onClick={() => setOpen((v) => !v)}
          style={{ height: CIRCLE_DIAMETER, width: CIRCLE_DIAMETER }}
          className="relative group rounded-full flex items-center justify-center overflow-hidden outline-none focus:ring-4 focus:ring-indigo-400/40"
        >
          {/* Outer radiant gradient ring */}
          <span className="absolute inset-0 rounded-full bg-[conic-gradient(at_30%_30%,#3b82f6,#6366f1,#8b5cf6,#3b82f6)] animate-[spin_8s_linear_infinite] opacity-90 group-hover:opacity-100" />
          {/* Soft glow */}
          <span className="absolute inset-0 rounded-full blur-md bg-[radial-gradient(circle_at_60%_40%,rgba(255,255,255,0.35),rgba(59,130,246,0)_60%)] opacity-70 group-hover:opacity-90 transition-opacity" />
          {/* Inner dark/glass layer */}
          <span className="absolute inset-[3px] rounded-full bg-slate-900/85 dark:bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_4px_12px_-2px_rgba(79,70,229,0.45),0_8px_28px_-6px_rgba(59,130,246,0.35)]" />
          {/* Sheen sweep */}
          <span className="pointer-events-none absolute -inset-1 rounded-full overflow-hidden">
            <span className="absolute top-0 left-[-120%] h-full w-[120%] bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-12 group-hover:translate-x-[220%] transition-transform duration-[1400ms] ease-out" />
          </span>
          {/* Content - revert to MessageCircle icon only */}
          <span className="relative z-10 flex items-center justify-center text-white drop-shadow-sm">
            <MessageCircle size={22} />
          </span>
          {/* Subtle focus & hover ring accent */}
          <span className="absolute inset-0 rounded-full ring-2 ring-indigo-400/0 group-hover:ring-indigo-300/30 group-active:ring-indigo-400/50 transition" />
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
              <div className="relative max-h-[50vh] overflow-y-auto px-3 py-3 space-y-2 rounded-xl before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-b before:from-white/5 before:via-white/0 before:to-white/0 dark:before:from-white/10 dark:before:via-white/0 dark:before:to-white/0 before:pointer-events-none" role="log" aria-live="polite" aria-relevant="additions" aria-label="Chat messages">
                {messages.map((m, idx) => {
                  const isUser = m.sender === 'user';
                  const prev = messages[idx - 1];
                  const next = messages[idx + 1];
                  const firstInGroup = !prev || prev.sender !== m.sender;
                  const lastInGroup = !next || next.sender !== m.sender;
                  return (
                    <div key={m.id} className="flex w-full">
                      <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} items-stretch gap-3 w-full`}>                      
                        {/* Avatar (only first in a sequence) */}
                        {firstInGroup ? (
                          <div style={{ height: CIRCLE_DIAMETER, width: CIRCLE_DIAMETER }} className={`rounded-full flex-shrink-0 flex items-center justify-center relative overflow-hidden mt-0.5`}>
                            <span className={`absolute inset-0 rounded-full ${isUser ? 'bg-blue-600' : 'bg-[conic-gradient(at_30%_30%,#3b82f6,#6366f1,#8b5cf6,#3b82f6)] animate-[spin_14s_linear_infinite]'}`}></span>
                            <span className="absolute inset-[2px] rounded-full bg-slate-900/90 backdrop-blur-sm border border-white/10" />
                            <span className="relative text-white flex items-center justify-center">
                              {isUser ? <User size={22} /> : <Bot size={22} />}
                            </span>
                          </div>
                        ) : (
                          <div style={{ width: CIRCLE_DIAMETER }} className={`${isUser ? 'order-2' : ''}`}></div>
                        )}
                        {/* Bubble Stack */}
                        <div className={`flex-1 flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-full inline-block px-4 py-2.5 md:py-3 text-[13px] md:text-sm leading-relaxed shadow-sm border border-white/10 dark:border-white/5 ${isUser ? 'bg-blue-600 text-white' : 'bg-white/70 dark:bg-white/10 text-slate-800 dark:text-slate-200'} ${isUser ? 'rounded-2xl rounded-tr-sm' : 'rounded-2xl rounded-tl-sm'} ${!firstInGroup && 'mt-[-2px]'} ${!lastInGroup && 'pb-2 md:pb-2.5'}`}> 
                            {m.text}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {typing && (
                  <div className="flex w-full">
                    <div className="flex flex-row items-start gap-3 w-full">
                      <div style={{ height: CIRCLE_DIAMETER, width: CIRCLE_DIAMETER }} className="rounded-full flex items-center justify-center relative overflow-hidden mt-0.5">
                        <span className="absolute inset-0 rounded-full bg-[conic-gradient(at_30%_30%,#3b82f6,#6366f1,#8b5cf6,#3b82f6)] animate-[spin_14s_linear_infinite]"></span>
                        <span className="absolute inset-[2px] rounded-full bg-slate-900/90 backdrop-blur-sm border border-white/10" />
                        <span className="relative text-white flex items-center justify-center">
                          <Bot size={22} />
                        </span>
                      </div>
                      <div className="flex-1 px-4 py-3 rounded-2xl text-[13px] md:text-sm bg-white/60 dark:bg-white/10 text-slate-700 dark:text-slate-300 rounded-tl-sm border border-white/10 dark:border-white/5">
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
          aria-label="Type your message"
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
    <div ref={liveRegionRef} className="sr-only" aria-live="polite" />

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


