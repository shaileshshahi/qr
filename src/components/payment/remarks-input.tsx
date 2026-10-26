"use client";

import React from "react";
import { MessageSquare } from "lucide-react";

interface RemarksInputProps {
  remarks: string;
  onChange: (val: string) => void;
}

const EXAMPLE_REMARKS = [
  "Lunch",
  "Groceries",
  "Electricity bill",
  "Office supplies",
];

export function RemarksInput({ remarks, onChange }: RemarksInputProps) {
  const maxLength = 120;

  return (
    <div className="p-5 rounded-3xl border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
          Remarks (Optional)
        </label>
        <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-mono">
          {remarks.length}/{maxLength}
        </span>
      </div>

      <input
        type="text"
        value={remarks}
        onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
        placeholder="What is this payment for?"
        maxLength={maxLength}
        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
      />

      {/* Suggested remarks pills */}
      <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
        {EXAMPLE_REMARKS.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => onChange(example)}
            className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 transition active:scale-95 cursor-pointer font-medium"
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  );
}
