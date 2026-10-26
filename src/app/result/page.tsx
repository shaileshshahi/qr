"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, RotateCcw } from "lucide-react";
import { useSimulation } from "@/context/simulation-context";
import { SimulationResultView } from "@/components/results/simulation-result-view";

export default function ResultPage() {
  const router = useRouter();
  const { currentTransaction, resetCurrentSimulation } = useSimulation();

  const handleNewScan = () => {
    resetCurrentSimulation();
    router.push("/scan");
  };

  const handleViewHistory = () => {
    router.push("/history");
  };

  const handleTryAgain = () => {
    router.push("/payment-ui");
  };

  if (!currentTransaction) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
          No active simulation result found.
        </p>
        <Link
          href="/scan"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold text-xs shadow-sm"
        >
          <RotateCcw className="w-4 h-4" /> Start a New Scan
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Top back navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-zinc-50">
              Simulation Outcome
            </h1>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Generated demo receipt &amp; sandbox record
            </p>
          </div>
        </div>

        <Link
          href="/history"
          className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
        >
          <Clock className="w-3.5 h-3.5" />
          <span>History</span>
        </Link>
      </div>

      <SimulationResultView
        transaction={currentTransaction}
        onNewScan={handleNewScan}
        onViewHistory={handleViewHistory}
        onTryAgain={handleTryAgain}
      />
    </div>
  );
}
