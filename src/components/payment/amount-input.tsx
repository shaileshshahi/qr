"use client";

import React, { useState } from "react";
import { AlertCircle, Lock, Edit3, CheckCircle } from "lucide-react";

interface AmountInputProps {
  amount: number | null;
  encodedAmount?: number;
  encodedAmountPrefilled: boolean;
  onChange: (newAmount: number | null) => void;
}

export function AmountInput({
  amount,
  encodedAmount,
  encodedAmountPrefilled,
  onChange,
}: AmountInputProps) {
  const [isEditingPrefilled, setIsEditingPrefilled] = useState(false);
  const [rawInputValue, setRawInputValue] = useState<string>(
    amount !== null && amount !== undefined ? String(amount) : ""
  );

  const hasOriginalEncoded = encodedAmount !== undefined && encodedAmount > 0;
  const isChangedFromPrefilled =
    hasOriginalEncoded && amount !== encodedAmount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9.]/g, "");

    // Prevent multiple decimals
    const parts = val.split(".");
    if (parts.length > 2) return;
    // Limit to 2 decimal places
    if (parts[1] && parts[1].length > 2) return;

    setRawInputValue(val);
    const parsed = parseFloat(val);
    if (!isNaN(parsed) && parsed > 0) {
      onChange(parsed);
    } else {
      onChange(null);
    }
  };

  const handlePresetAdd = (addon: number) => {
    const current = amount || 0;
    const next = current + addon;
    setRawInputValue(String(next));
    onChange(next);
  };

  const handleResetToEncoded = () => {
    if (encodedAmount) {
      setRawInputValue(String(encodedAmount));
      onChange(encodedAmount);
      setIsEditingPrefilled(false);
    }
  };

  return (
    <div className="p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
          Payment Amount (NPR)
        </label>
        {hasOriginalEncoded && (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40 px-2 py-0.5 rounded-full border border-sky-200 dark:border-sky-800">
            <Lock className="w-3 h-3" /> Encoded in QR (NPR {encodedAmount.toFixed(2)})
          </span>
        )}
      </div>

      {/* Prominent Amount Box */}
      <div className="relative flex items-center">
        <span className="absolute left-4 font-bold text-2xl sm:text-3xl text-slate-400 dark:text-zinc-500 select-none">
          Rs.
        </span>
        <input
          type="text"
          inputMode="decimal"
          value={rawInputValue}
          onChange={handleInputChange}
          placeholder="0.00"
          className="w-full pl-16 pr-4 py-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-zinc-50 bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
        />
      </div>

      {/* Warning when modifying prefilled amount */}
      {isChangedFromPrefilled && (
        <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-300 text-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
            <span>
              Modified from original QR amount (Rs. {encodedAmount?.toFixed(2)})
            </span>
          </div>
          <button
            onClick={handleResetToEncoded}
            className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 underline hover:no-underline"
          >
            Reset
          </button>
        </div>
      )}

      {/* Quick Presets */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="text-[11px] text-slate-400 dark:text-zinc-500 font-medium">
          Quick add:
        </span>
        {[100, 500, 1000, 2500].map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => handlePresetAdd(preset)}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 transition"
          >
            +Rs. {preset}
          </button>
        ))}
        {amount && (
          <button
            type="button"
            onClick={() => {
              setRawInputValue("");
              onChange(null);
            }}
            className="px-2 py-1 text-xs text-rose-500 hover:text-rose-600 ml-auto font-medium"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
