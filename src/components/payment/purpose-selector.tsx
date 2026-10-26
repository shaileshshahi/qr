"use client";

import React from "react";
import {
  Utensils,
  ShoppingBag,
  ShoppingCart,
  Bus,
  Zap,
  GraduationCap,
  HeartPulse,
  Home,
  User,
  Users,
  Split,
  CreditCard,
  Briefcase,
  MoreHorizontal,
} from "lucide-react";
import { PaymentPurpose, PAYMENT_PURPOSES } from "@/types/transaction";

interface PurposeSelectorProps {
  selectedPurpose: PaymentPurpose;
  customPurpose: string;
  onSelectPurpose: (purpose: PaymentPurpose) => void;
  onChangeCustomPurpose: (custom: string) => void;
}

export function PurposeSelector({
  selectedPurpose,
  customPurpose,
  onSelectPurpose,
  onChangeCustomPurpose,
}: PurposeSelectorProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Utensils":
        return <Utensils className="w-3.5 h-3.5" />;
      case "ShoppingBag":
        return <ShoppingBag className="w-3.5 h-3.5" />;
      case "ShoppingCart":
        return <ShoppingCart className="w-3.5 h-3.5" />;
      case "Bus":
        return <Bus className="w-3.5 h-3.5" />;
      case "Zap":
        return <Zap className="w-3.5 h-3.5" />;
      case "GraduationCap":
        return <GraduationCap className="w-3.5 h-3.5" />;
      case "HeartPulse":
        return <HeartPulse className="w-3.5 h-3.5" />;
      case "Home":
        return <Home className="w-3.5 h-3.5" />;
      case "User":
        return <User className="w-3.5 h-3.5" />;
      case "Users":
        return <Users className="w-3.5 h-3.5" />;
      case "Split":
        return <Split className="w-3.5 h-3.5" />;
      case "CreditCard":
        return <CreditCard className="w-3.5 h-3.5" />;
      case "Briefcase":
        return <Briefcase className="w-3.5 h-3.5" />;
      default:
        return <MoreHorizontal className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
          Payment Purpose
        </label>
        <span className="text-[11px] text-slate-400 dark:text-zinc-500">
          Select or enter category
        </span>
      </div>

      {/* Selectable Chips Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {PAYMENT_PURPOSES.map((p) => {
          const isSelected = selectedPurpose === p.value;
          return (
            <button
              key={p.value}
              type="button"
              onClick={() => onSelectPurpose(p.value)}
              className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all text-left ${
                isSelected
                  ? "border-emerald-600 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-500 dark:text-emerald-300 shadow-sm"
                  : "border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-800/40 text-slate-700 dark:text-zinc-300 hover:border-slate-300 dark:hover:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-800"
              }`}
            >
              <span
                className={`p-1 rounded-md ${
                  isSelected
                    ? "bg-emerald-600 text-white"
                    : "text-slate-500 dark:text-zinc-400"
                }`}
              >
                {getIcon(p.iconName)}
              </span>
              <span className="truncate">{p.label}</span>
            </button>
          );
        })}
      </div>

      {/* Custom purpose field if "Other" is chosen */}
      {selectedPurpose === "other" && (
        <div className="pt-2 animate-in fade-in duration-200">
          <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300 block mb-1">
            Specify Custom Purpose:
          </label>
          <input
            type="text"
            value={customPurpose}
            onChange={(e) => onChangeCustomPurpose(e.target.value)}
            placeholder="e.g. Freelance service, Donation, Event pass"
            maxLength={60}
            className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-zinc-100"
          />
        </div>
      )}
    </div>
  );
}
