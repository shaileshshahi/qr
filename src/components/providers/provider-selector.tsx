"use client";

import React, { useState, useMemo } from "react";
import { Search, Filter, ShieldCheck, ArrowRight, Building2, Wallet, QrCode } from "lucide-react";
import { Provider, ProviderCategory } from "@/types/provider";
import { filterProviders } from "@/lib/providers/registry";
import { ProviderCard } from "./provider-card";
import { DemoBanner } from "../layout/demo-banner";

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
    { id: "all", label: "All Providers", icon: <Filter className="w-3.5 h-3.5" /> },
    { id: "wallets", label: "Wallets", icon: <Wallet className="w-3.5 h-3.5" /> },
    { id: "qr-networks", label: "QR Networks", icon: <QrCode className="w-3.5 h-3.5" /> },
    { id: "banks", label: "Nepali Banks", icon: <Building2 className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="w-full space-y-4">
      {/* Simulation Banner */}
      <DemoBanner variant="card" />

      {/* Header and Search */}
      <div className="space-y-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-zinc-50 tracking-tight">
            Select Wallet or Bank
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Choose a provider interface to preview the simulated transaction flow
          </p>
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by provider name, bank, or code (e.g. eSewa, Nabil, GBIME)..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm transition"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? "bg-slate-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm"
                  : "bg-slate-100 dark:bg-zinc-800/80 text-slate-600 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700"
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Providers */}
      {filtered.length === 0 ? (
        <div className="p-8 text-center rounded-2xl border border-dashed border-slate-300 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/40">
          <p className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
            No matching providers found
          </p>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
            Try adjusting your search query or reset category filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[460px] overflow-y-auto pr-1">
          {filtered.map((provider) => (
            <ProviderCard
              key={provider.id}
              provider={provider}
              isSelected={selectedProvider.id === provider.id}
              onSelect={(p) => {
                onSelectProvider(p);
              }}
            />
          ))}
        </div>
      )}

      {/* Bottom Sticky Action Bar */}
      <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
        <button
          onClick={onBack}
          className="flex-1 py-3 px-4 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-zinc-800 transition"
        >
          Back to Review
        </button>

        <button
          onClick={onContinue}
          className="flex-[2] py-3 px-4 rounded-xl text-white font-semibold text-sm shadow-md active:scale-[0.99] transition inline-flex items-center justify-center gap-2"
          style={{
            backgroundColor: selectedProvider.primaryColor,
          }}
        >
          <span>Preview with {selectedProvider.name}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
