"use client";

import React from "react";
import { ArrowRight, Check, Star } from "lucide-react";
import { Provider } from "@/types/provider";

interface ProviderCardProps {
  provider: Provider;
  isSelected: boolean;
  onSelect: (provider: Provider) => void;
}

export function ProviderCard({
  provider,
  isSelected,
  onSelect,
}: ProviderCardProps) {
  return (
    <div
      onClick={() => onSelect(provider)}
      className={`group relative p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between text-left ${
        isSelected
          ? "border-emerald-600 dark:border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 shadow-md ring-2 ring-emerald-500/20"
          : "border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-slate-300 dark:hover:border-zinc-700 hover:shadow-sm"
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-2.5">
          {/* Branded Icon / Monogram */}
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm text-white shadow-sm transition-transform group-hover:scale-105"
            style={{
              backgroundColor: provider.primaryColor,
            }}
          >
            {provider.code.slice(0, 3)}
          </div>

          <div className="flex items-center gap-1.5">
            {provider.isPopular && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1">
                <Star className="w-2.5 h-2.5 fill-current" /> Popular
              </span>
            )}
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300">
              {provider.category === "wallets"
                ? "Wallet"
                : provider.category === "qr-networks"
                ? "QR Network"
                : "Bank"}
            </span>
          </div>
        </div>

        <h4 className="font-bold text-sm text-slate-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {provider.name}
        </h4>
        <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-1 mt-0.5">
          {provider.tagline}
        </p>

        {/* Features badges */}
        {provider.features && (
          <div className="flex flex-wrap gap-1 mt-2.5">
            {provider.features.slice(0, 2).map((feat) => (
              <span
                key={feat}
                className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-800/80 text-slate-600 dark:text-zinc-400 font-medium"
              >
                {feat}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 pt-2.5 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between text-xs">
        <span
          className="font-semibold text-[11px] inline-flex items-center gap-1"
          style={{ color: provider.primaryColor }}
        >
          Preview Flow <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </span>

        {isSelected && (
          <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </span>
        )}
      </div>
    </div>
  );
}
