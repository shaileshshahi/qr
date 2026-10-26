"use client";

import React, { useState } from "react";
import { AlertCircle, Lock, RotateCcw } from "lucide-react";

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
  const [rawInputValue, setRawInputValue] = useState<string>(
    amount !== null && amount !== undefined ? String(amount) : ""
  );

  const hasOriginalEncoded = encodedAmount !== undefined && encodedAmount > 0;
  const isChangedFromPrefilled =
    hasOriginalEncoded && amount !== encodedAmount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9.]/g, "");
    const parts = val.split(".");
    if (parts.length > 2) return;
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
    }
  };

  return (
    <div className="p-5 rounded-3xl border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
          Transfer Amount
        </span>
        {hasOriginalEncoded && (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-500/20">
            <Lock className="w-3 h-3" /> Pre-filled from QR
          </span>
        )}
      </div>

      {/* Hero Amount Field */}
      <div className="flex items-baseline gap-2 py-2 border-b border-slate-100 dark:border-zinc-800">
        <span className="text-xl sm:text-2xl font-bold text-slate-400 dark:text-zinc-500 select-none">
          NPR
        </span>
        <input
          type="text"
          inputMode="decimal"
          value={rawInputValue}
          onChange={handleInputChange}
          placeholder="0.00"
          className="w-full text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white bg-transparent focus:outline-none placeholder:text-slate-300 dark:placeholder:text-zinc-600"
        />
      </div>

      {/* Warning when modifying prefilled amount */}
      {isChangedFromPrefilled && (
        <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900 text-amber-800 dark:text-amber-300 text-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-[11px]">
            <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-600" />
            <span>Changed from original QR (NPR {encodedAmount?.toFixed(2)})</span>
          </div>
          <button
            type="button"
            onClick={handleResetToEncoded}
            className="text-[11px] font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        </div>
      )}

      {/* Quick Add Chips */}
      <div className="flex items-center gap-1.5 pt-1 overflow-x-auto scrollbar-none">
        {[100, 500, 1000, 2000].map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => handlePresetAdd(preset)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 transition active:scale-95"
          >
            +{preset}
          </button>
        ))}
        {amount && (
          <button
            type="button"
            onClick={() => {
              setRawInputValue("");
              onChange(null);
            }}
            className="px-2.5 py-1.5 text-xs text-rose-500 hover:text-rose-600 ml-auto font-semibold"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
