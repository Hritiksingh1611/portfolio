"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ArrowRight, Activity } from "lucide-react";
import React from "react";

export interface ArchitectureNode {
  label: string;
  sub: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  border: string;
  bg: string;
}

export interface ProjectArchitecture {
  title: string;
  subtitle: string;
  nodes: ArchitectureNode[];
  specs: { label: string; value: string }[];
  flowDescription: string;
}

interface ArchitectureModalProps {
  architecture: ProjectArchitecture | null;
  onClose: () => void;
}

export default function ArchitectureModal({ architecture, onClose }: ArchitectureModalProps) {
  if (!architecture) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full max-w-3xl glass rounded-2xl border border-violet-500/30 p-6 sm:p-8 z-10 shadow-2xl overflow-hidden bg-slate-950/90 text-white"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-6 pb-4 border-b border-white/10">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-violet-400 uppercase tracking-widest px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 mb-2">
                <Activity size={12} /> SYSTEM ARCHITECTURE DIAGRAM
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white">{architecture.title}</h3>
              <p className="text-xs font-mono text-slate-400 mt-1">{architecture.subtitle}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Flow Diagram Representation */}
          <div className="mb-6 p-4 rounded-xl border border-white/10 bg-slate-900/70">
            <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-3">Pipeline Flow Topography</p>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 overflow-x-auto py-2">
              {architecture.nodes.map((node, i) => (
                <div key={node.label} className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                  <div className={`flex flex-col items-center gap-1 px-3.5 py-2.5 rounded-xl border ${node.border} ${node.bg} min-w-[110px] text-center shadow-lg`}>
                    <node.icon size={18} className={node.color} />
                    <span className="text-[11px] font-mono font-bold text-white mt-1">{node.label}</span>
                    <span className="text-[9px] font-mono text-slate-400">{node.sub}</span>
                  </div>

                  {i < architecture.nodes.length - 1 && (
                    <ArrowRight size={16} className="text-violet-400 shrink-0 hidden sm:block" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Specifications Grid */}
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {architecture.specs.map((spec) => (
              <div key={spec.label} className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">{spec.label}</span>
                <span className="text-xs font-mono font-bold text-violet-300">{spec.value}</span>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/20 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5">
            <CheckCircle2 size={16} className="text-violet-400 shrink-0 mt-0.5" />
            <span>{architecture.flowDescription}</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
