"use client";

import React from "react";
import { MessageSquare } from "lucide-react";

interface RemarksInputProps {
  remarks: string;
  onChange: (val: string) => void;
}

const EXAMPLE_REMARKS = [
  "Lunch with friends",
  "Monthly electricity bill",
  "Grocery shopping",
  "Office supplies",
  "Household expenses",
];

export function RemarksInput({ remarks, onChange }: RemarksInputProps) {
  const maxLength = 120;

  const handleQuickInsert = (text: string) => {
    onChange(text);
  };

  return (
    <div className="p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Payment Remarks (Optional)</span>
        </label>
        <span className="text-[11px] text-slate-400 dark:text-zinc-500 font-mono">
          {remarks.length}/{maxLength}
        </span>
      </div>

      <input
        type="text"
        value={remarks}
        onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
        placeholder="What is this payment for?"
        maxLength={maxLength}
        className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
      />

      {/* Suggested remarks pills */}
      <div className="space-y-1.5 pt-1">
        <span className="text-[10px] uppercase font-semibold text-slate-400 dark:text-zinc-500">
          Suggested remarks:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {EXAMPLE_REMARKS.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => handleQuickInsert(example)}
              className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700 dark:hover:text-emerald-400 transition"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
