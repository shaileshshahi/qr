"use client";

import React from "react";
import { AlertCircle, ShieldAlert } from "lucide-react";

interface DemoBannerProps {
  variant?: "top-bar" | "inline" | "card";
  className?: string;
}

export function DemoBanner({
  variant = "top-bar",
  className = "",
}: DemoBannerProps) {
  if (variant === "inline") {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 uppercase tracking-wider ${className}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
        <span>Simulation Only</span>
      </span>
    );
  }

  if (variant === "card") {
    return (
      <div
        className={`rounded-xl border border-amber-500/20 bg-amber-500/5 px-3 py-2 text-amber-700 dark:text-amber-400 flex items-center justify-between text-xs font-medium ${className}`}
      >
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 shrink-0 text-amber-500" />
          <span className="font-semibold text-[11px] tracking-wide uppercase">
            Simulation Mode — Not A Real Payment
          </span>
        </div>
        <span className="text-[10px] uppercase font-bold text-amber-600/80 dark:text-amber-400/80">
          Sandbox
        </span>
      </div>
    );
  }

  return (
    <div className={`w-full bg-amber-500 text-slate-950 font-bold text-[11px] px-3 py-1 shadow-sm border-b border-amber-600/20 select-none ${className}`}>
      <div className="max-w-xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-1.5 tracking-wider uppercase">
          <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
          <span>SIMULATION — NOT A REAL PAYMENT</span>
        </div>
        <span className="text-[10px] font-extrabold uppercase tracking-widest bg-black/15 px-2 py-0.5 rounded">
          Demo Sandbox
        </span>
      </div>
    </div>
  );
}
