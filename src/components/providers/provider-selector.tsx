"use client";

import React, { useState, useMemo } from "react";
import { Search, Filter, ArrowRight, Building2, Wallet, QrCode, Check } from "lucide-react";
import { Provider, ProviderCategory } from "@/types/provider";
import { filterProviders } from "@/lib/providers/registry";

interface ProviderSelectorProps {
  selectedProvider: Provider;
  onSelectProvider: (provider: Provider) => void;
  onContinue: () => void;
  onBack: () => void;
}

export function ProviderSelector({
  selectedProvider,
  onSelectProvider,
  onContinue,
  onBack,
}: ProviderSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<ProviderCategory>("all");

  const filtered = useMemo(() => {
    return filterProviders(searchQuery, selectedCategory);
  }, [searchQuery, selectedCategory]);

  const categories: Array<{ id: ProviderCategory; label: string; icon: React.ReactNode }> = [
    { id: "all", label: "All", icon: <Filter className="w-3.5 h-3.5" /> },
    { id: "wallets", label: "Wallets", icon: <Wallet className="w-3.5 h-3.5" /> },
    { id: "qr-networks", label: "Networks", icon: <QrCode className="w-3.5 h-3.5" /> },
    { id: "banks", label: "Banks", icon: <Building2 className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="w-full space-y-4">
      {/* Search & Category Pills */}
      <div className="space-y-2.5">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search wallet, QR network, or bank..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                selectedCategory === cat.id
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs"
                  : "bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 hover:bg-slate-200"
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Provider List */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden divide-y divide-slate-100 dark:divide-zinc-800/80 max-h-[380px] overflow-y-auto">
        {filtered.map((provider) => {
          const isSelected = selectedProvider.id === provider.id;

          return (
            <button
              key={provider.id}
              type="button"
              onClick={() => {
                onSelectProvider(provider);
              }}
              className={`w-full p-3.5 flex items-center justify-between gap-3 text-left transition hover:bg-slate-50 dark:hover:bg-zinc-800/50 cursor-pointer ${
                isSelected ? "bg-emerald-50/40 dark:bg-emerald-950/20" : ""
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Brand Monogram */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs text-white shrink-0 shadow-xs"
                  style={{ backgroundColor: provider.primaryColor }}
                >
                  {provider.code.slice(0, 3)}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                      {provider.name}
                    </h4>
                    <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400">
                      {provider.category === "wallets" ? "Wallet" : provider.category === "qr-networks" ? "Network" : "Bank"}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400 truncate mt-0.5">
                    {provider.tagline}
                  </p>
                </div>
              </div>

              {/* Selection Indicator */}
              <div className="shrink-0">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition ${
                    isSelected
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-slate-300 dark:border-zinc-700 bg-transparent"
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-3.5 px-4 rounded-2xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-zinc-800 transition active:scale-[0.99]"
        >
          Back
        </button>

        <button
          type="button"
          onClick={onContinue}
          className="flex-[2] py-3.5 px-4 rounded-2xl text-white font-extrabold text-sm shadow-md active:scale-[0.99] transition inline-flex items-center justify-center gap-2 cursor-pointer"
          style={{ backgroundColor: selectedProvider.primaryColor }}
        >
          <span>Preview with {selectedProvider.name}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
