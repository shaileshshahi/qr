"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, QrCode } from "lucide-react";
import { useSimulation } from "@/context/simulation-context";
import { TransactionHistoryList } from "@/components/history/transaction-history-list";

export default function HistoryPage() {
  const { transactions, deleteTransaction, clearHistory } = useSimulation();

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
              Demo History
            </h1>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Locally persisted simulated transactions
            </p>
          </div>
        </div>

        <Link
          href="/scan"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-sm transition"
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>New Scan</span>
        </Link>
      </div>

      <TransactionHistoryList
        transactions={transactions}
        onDeleteTransaction={deleteTransaction}
        onClearAll={clearHistory}
      />
    </div>
  );
}
