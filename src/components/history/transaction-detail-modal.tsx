"use client";

import React, { useState } from "react";
import {
  X,
  CheckCircle2,
  XCircle,
  Ban,
  Copy,
  Check,
  Store,
  CreditCard,
  Layers,
  Tag,
  MessageSquare,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import { SimulationTransaction } from "@/types/transaction";

interface TransactionDetailModalProps {
  transaction: SimulationTransaction | null;
  onClose: () => void;
  onDelete?: (id: string) => void;
}

export function TransactionDetailModal({
  transaction,
  onClose,
  onDelete,
}: TransactionDetailModalProps) {
  const [copied, setCopied] = useState(false);

  if (!transaction) return null;

  const isSuccess = transaction.outcome === "success";
  const isFailed = transaction.outcome === "failed";
  const isCancelled = transaction.outcome === "cancelled";

  const handleCopyRef = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(transaction.simulationRef);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isSuccess
                  ? "bg-emerald-500"
                  : isFailed
                  ? "bg-rose-500"
                  : "bg-slate-400"
              }`}
            />
            <h3 className="font-bold text-sm text-slate-900 dark:text-zinc-100">
              Demo Transaction Detail
            </h3>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
              Simulated
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Status and Amount Card */}
          <div
            className={`p-4 rounded-xl text-center border ${
              isSuccess
                ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900"
                : isFailed
                ? "bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900"
                : "bg-slate-50 dark:bg-zinc-800/40 border-slate-200 dark:border-zinc-800"
            }`}
          >
            <span className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-zinc-400">
              {isSuccess ? "Demo Success" : isFailed ? "Demo Failed" : "Demo Cancelled"}
            </span>
            <div className="text-3xl font-black text-slate-900 dark:text-zinc-100 mt-1">
              NPR {transaction.amount.toFixed(2)}
            </div>
            <p className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold mt-1">
              SIMULATION — NO MONEY WAS TRANSFERRED
            </p>
          </div>

          {/* Details Table */}
          <div className="divide-y divide-slate-100 dark:divide-zinc-800 text-xs">
            {/* Simulation Ref */}
            <div className="py-2.5 flex justify-between items-center">
              <span className="text-slate-500 dark:text-zinc-400">Reference ID</span>
              <div className="flex items-center gap-1.5 font-mono font-bold text-slate-800 dark:text-zinc-200">
                <span>{transaction.simulationRef}</span>
                <button onClick={handleCopyRef} className="p-0.5 text-slate-400">
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Merchant */}
            <div className="py-2.5 flex justify-between items-center">
              <span className="text-slate-500 dark:text-zinc-400">Merchant</span>
              <span className="font-semibold text-slate-900 dark:text-zinc-100 text-right">
                {transaction.qrDetails.merchantName || "Unspecified"}
              </span>
            </div>

            {/* Identifier */}
            <div className="py-2.5 flex justify-between items-center">
              <span className="text-slate-500 dark:text-zinc-400">Account ID</span>
              <span className="font-mono text-slate-700 dark:text-zinc-300">
                {transaction.qrDetails.merchantIdentifier || "None"}
              </span>
            </div>

            {/* Provider */}
            <div className="py-2.5 flex justify-between items-center">
              <span className="text-slate-500 dark:text-zinc-400">Selected Provider</span>
              <span className="font-semibold text-slate-800 dark:text-zinc-200">
                {transaction.providerName}
              </span>
            </div>

            {/* QR Network */}
            <div className="py-2.5 flex justify-between items-center">
              <span className="text-slate-500 dark:text-zinc-400">QR Network</span>
              <span className="text-slate-800 dark:text-zinc-200">
                {transaction.qrDetails.paymentNetwork || "None"}
              </span>
            </div>

            {/* Purpose */}
            <div className="py-2.5 flex justify-between items-center">
              <span className="text-slate-500 dark:text-zinc-400">Purpose</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {transaction.purposeLabel}
              </span>
            </div>

            {/* Remarks */}
            {transaction.remarks && (
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-slate-500 dark:text-zinc-400">Remarks</span>
                <span className="text-slate-700 dark:text-zinc-300 text-right">
                  {transaction.remarks}
                </span>
              </div>
            )}

            {/* Failure Reason if failed */}
            {transaction.failureReason && (
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-rose-500 font-medium">Failure Reason</span>
                <span className="text-rose-600 text-right max-w-[220px]">
                  {transaction.failureReason}
                </span>
              </div>
            )}

            {/* Timestamp */}
            <div className="py-2.5 flex justify-between items-center">
              <span className="text-slate-500 dark:text-zinc-400">Timestamp</span>
              <span className="text-slate-600 dark:text-zinc-400">
                {new Date(transaction.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-100 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 flex items-center justify-between">
          {onDelete && (
            <button
              onClick={() => {
                onDelete(transaction.id);
                onClose();
              }}
              className="text-xs text-rose-600 hover:text-rose-700 font-medium"
            >
              Delete Record
            </button>
          )}

          <button
            onClick={onClose}
            className="ml-auto px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 text-white text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
