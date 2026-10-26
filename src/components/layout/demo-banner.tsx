"use client";

import React from "react";
import { AlertTriangle, ShieldCheck } from "lucide-react";

interface DemoBannerProps {
  variant?: "top-bar" | "inline" | "card";
  className?: string;
}

export function DemoBanner({
  variant = "top-bar",
  className = "",
}: DemoBannerProps) {
  if (variant === "card") {
    return (
      <div
        className={`rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-amber-800 dark:text-amber-300 flex items-start gap-3 text-xs leading-relaxed ${className}`}
      >
        <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
        <div>
          <span className="font-bold tracking-wide uppercase block text-[11px] text-amber-700 dark:text-amber-300">
            SIMULATION — NOT A REAL PAYMENT
          </span>
          <span>
            This is a simulated sandbox interface. No genuine funds, bank accounts,
            or payment gateways are accessed.
          </span>
        </div>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/25 tracking-wide uppercase ${className}`}
      >
        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
        <span>SIMULATION — NOT A REAL PAYMENT</span>
      </div>
    );
  }

  return (
    <div className={`w-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 font-medium text-xs px-3 py-1.5 shadow-sm select-none border-b border-amber-600/30 ${className}`}>
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-bold tracking-wider uppercase text-[11px]">
          <span className="inline-flex items-center justify-center p-0.5 rounded bg-black/15 text-black">
            <AlertTriangle className="w-3.5 h-3.5 stroke-[2.5]" />
          </span>
          <span>SIMULATION — NOT A REAL PAYMENT</span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-[11px] opacity-90">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Demo & Prototyping Only • No Genuine Funds Involved</span>
        </div>
        <span className="text-[10px] uppercase font-bold tracking-widest bg-black/20 text-slate-950 px-2 py-0.5 rounded-full">
          Sandbox Mode
        </span>
      </div>
    </div>
  );
}
