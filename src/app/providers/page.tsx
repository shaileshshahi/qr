"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useSimulation } from "@/context/simulation-context";
import { ProviderSelector } from "@/components/providers/provider-selector";
import { Provider } from "@/types/provider";

export default function ProvidersPage() {
  const router = useRouter();
  const { selectedProvider, setSelectedProvider } = useSimulation();

  const handleSelect = (provider: Provider) => {
    setSelectedProvider(provider);
  };

  const handleContinue = () => {
    router.push("/payment-ui");
  };

  return (
    <div className="space-y-4">
      {/* Top back navigation */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => router.push("/review")}
          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
            Select Payment Method
          </h1>
          <p className="text-[11px] text-slate-500 dark:text-zinc-400">
            Choose wallet, QR network, or bank
          </p>
        </div>
      </div>

      <ProviderSelector
        selectedProvider={selectedProvider}
        onSelectProvider={handleSelect}
        onContinue={handleContinue}
        onBack={() => router.push("/review")}
      />
    </div>
  );
}
