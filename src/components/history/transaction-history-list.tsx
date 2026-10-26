"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Trash2,
  CheckCircle2,
  XCircle,
  Ban,
  ArrowRight,
  Clock,
  Store,
  QrCode,
  AlertTriangle,
} from "lucide-react";
import { SimulationTransaction, SimulationOutcome } from "@/types/transaction";
import { TransactionDetailModal } from "./transaction-detail-modal";
import { DemoBanner } from "../layout/demo-banner";

interface TransactionHistoryListProps {
  transactions: SimulationTransaction[];
  onDeleteTransaction: (id: string) => void;
  onClearAll: () => void;
}

export function TransactionHistoryList({
  transactions,
  onDeleteTransaction,
  onClearAll,
}: TransactionHistoryListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [outcomeFilter, setOutcomeFilter] = useState<"all" | SimulationOutcome>("all");
  const [selectedTransaction, setSelectedTransaction] =
    useState<SimulationTransaction | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Filter transactions
  const filtered = useMemo(() => {
    return transactions.filter((tx) => {
      // outcome filter
      if (outcomeFilter !== "all" && tx.outcome !== outcomeFilter) {
        return false;
      }
      // search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const merchant = (tx.qrDetails.merchantName || "").toLowerCase();
        const provider = tx.providerName.toLowerCase();
        const ref = tx.simulationRef.toLowerCase();
        const remarks = (tx.remarks || "").toLowerCase();
        return (
          merchant.includes(q) ||
          provider.includes(q) ||
          ref.includes(q) ||
          remarks.includes(q)
        );
      }
      return true;
    });
  }, [transactions, outcomeFilter, searchQuery]);

  return (
    <div className="w-full space-y-4">
      {/* Simulation Banner Notice */}
      <DemoBanner variant="card" />

      {/* History Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-zinc-50 tracking-tight">
            Demo Transaction History
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            {transactions.length} simulated transaction{transactions.length !== 1 ? "s" : ""} recorded locally
          </p>
        </div>

        {transactions.length > 0 && (
          <button
            onClick={() => setShowClearConfirm(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition self-start sm:self-auto border border-rose-200 dark:border-rose-900"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Demo History</span>
          </button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by merchant, provider, or ref ID..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Outcome filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {(["all", "success", "failed", "cancelled"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setOutcomeFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap capitalize transition ${
                outcomeFilter === status
                  ? "bg-slate-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 hover:bg-slate-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Transaction List */}
      {filtered.length === 0 ? (
        <div className="p-8 text-center rounded-2xl border border-dashed border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <Clock className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <h4 className="font-semibold text-sm text-slate-800 dark:text-zinc-200">
            No simulated transactions found
          </h4>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 max-w-xs mx-auto">
            {transactions.length === 0
              ? "Scan a QR or try one of the preset sample QRs to see the flow in action."
              : "No records matched your search or outcome filters."}
          </p>
          {transactions.length === 0 && (
            <Link
              href="/scan"
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-sm"
            >
              <QrCode className="w-4 h-4" /> Start Demo Scan
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((tx) => {
            const isSuccess = tx.outcome === "success";
            const isFailed = tx.outcome === "failed";

            return (
              <div
                key={tx.id}
                onClick={() => setSelectedTransaction(tx)}
                className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-emerald-500/50 hover:shadow-sm transition cursor-pointer flex items-center justify-between gap-3 text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Outcome Status Icon */}
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isSuccess
                        ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400"
                        : isFailed
                        ? "bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400"
                        : "bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-zinc-400"
                    }`}
                  >
                    {isSuccess && <CheckCircle2 className="w-5 h-5" />}
                    {isFailed && <XCircle className="w-5 h-5" />}
                    {tx.outcome === "cancelled" && <Ban className="w-5 h-5" />}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-zinc-100 truncate">
                        {tx.qrDetails.merchantName || "Merchant Unspecified"}
                      </h4>
                      <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                        Demo
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">
                      <span className="font-semibold text-slate-700 dark:text-zinc-300">
                        {tx.providerName}
                      </span>
                      <span>•</span>
                      <span>{tx.purposeLabel}</span>
                      <span>•</span>
                      <span>{new Date(tx.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Amount and Ref */}
                <div className="text-right shrink-0">
                  <div className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-zinc-50">
                    Rs. {tx.amount.toFixed(2)}
                  </div>
                  <div className="font-mono text-[10px] text-slate-400 dark:text-zinc-500">
                    {tx.simulationRef}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Transaction Detail Modal */}
      <TransactionDetailModal
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
        onDelete={onDeleteTransaction}
      />

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="max-w-sm w-full p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xl space-y-3">
            <h3 className="font-bold text-base text-slate-900 dark:text-zinc-100">
              Clear Demo History?
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
              This will permanently delete all simulated transaction records stored in your browser&apos;s localStorage.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onClearAll();
                  setShowClearConfirm(false);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-sm"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
