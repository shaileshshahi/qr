"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, Check, Copy, Info } from "lucide-react";
import { SAMPLE_QR_LIST, SampleQrItem } from "@/lib/qr/samples";

interface SampleQrPickerProps {
  onSelectSample: (payload: string) => void;
}

export function SampleQrPicker({ onSelectSample }: SampleQrPickerProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (e: React.MouseEvent, item: SampleQrItem) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(item.payload);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-sm font-semibold text-slate-900 dark:text-zinc-100">
            Try Preset Sample QRs
          </h3>
        </div>
        <span className="text-[11px] text-slate-500 dark:text-zinc-400">
          Instant 1-Click Simulation
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {SAMPLE_QR_LIST.map((sample) => (
          <button
            key={sample.id}
            type="button"
            onClick={() => onSelectSample(sample.payload)}
            className="group relative p-3.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 hover:border-emerald-500/50 hover:shadow-md active:scale-[0.99] transition-all cursor-pointer flex flex-col justify-between text-left w-full"
          >
            <div className="w-full">
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${sample.tagColor}`}
                >
                  {sample.tag}
                </span>

                {sample.expectedAmount && (
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    NPR {sample.expectedAmount.toFixed(2)}
                  </span>
                )}
              </div>

              <h4 className="font-semibold text-xs sm:text-sm text-slate-800 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {sample.title}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400 line-clamp-2 mt-0.5">
                {sample.description}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px] w-full">
              <span className="font-medium text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Load &amp; Inspect <ArrowRight className="w-3 h-3" />
              </span>

              <span
                onClick={(e) => handleCopy(e, sample)}
                role="button"
                className="text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 p-1.5 rounded cursor-pointer"
                title="Copy raw payload"
              >
                {copiedId === sample.id ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
