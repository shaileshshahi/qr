"use client";

import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  XCircle,
  Ban,
  Copy,
  Check,
  RotateCcw,
  Home,
  Clock,
  Store,
  CreditCard,
  Tag,
  Calendar,
  MessageSquare,
  ShieldAlert,
  AlertTriangle,
} from "lucide-react";
import { SimulationTransaction } from "@/types/transaction";
import { DemoBanner } from "../layout/demo-banner";

interface SimulationResultViewProps {
  transaction: SimulationTransaction;
  onNewScan: () => void;
  onViewHistory: () => void;
  onTryAgain?: () => void;
}

export function SimulationResultView({
  transaction,
  onNewScan,
  onViewHistory,
  onTryAgain,
}: SimulationResultViewProps) {
  const [copied, setCopied] = useState(false);

  // Trigger light celebratory confetti on success
  useEffect(() => {
    if (transaction.outcome === "success") {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          disableForReducedMotion: true,
        });
      } catch {
        // ignore
      }
    }
  }, [transaction.outcome]);

  const handleCopyReceipt = () => {
    const text = `--- QR DEMO NEPAL (SIMULATION ONLY) ---
Status: ${transaction.outcome.toUpperCase()} (DEMO)
Simulation Ref: ${transaction.simulationRef}
Merchant: ${transaction.qrDetails.merchantName || "Unspecified"}
Identifier: ${transaction.qrDetails.merchantIdentifier || "None"}
Amount: NPR ${transaction.amount.toFixed(2)}
Purpose: ${transaction.purposeLabel}
Remarks: ${transaction.remarks || "None"}
Provider: ${transaction.providerName}
Date: ${new Date(transaction.createdAt).toLocaleString()}
DISCLAIMER: SIMULATION ONLY. NO REAL MONEY WAS TRANSFERRED.
---------------------------------------`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isSuccess = transaction.outcome === "success";
  const isFailed = transaction.outcome === "failed";
  const isCancelled = transaction.outcome === "cancelled";

  return (
    <div className="w-full space-y-4">
      {/* Simulation Banner Notice */}
      <DemoBanner variant="card" />

      {/* Main Result Card */}
      <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
        {/* Status Header */}
        <div
          className={`p-6 text-center border-b ${
            isSuccess
              ? "bg-gradient-to-b from-emerald-500/10 to-transparent border-emerald-100 dark:border-zinc-800"
              : isFailed
              ? "bg-gradient-to-b from-rose-500/10 to-transparent border-rose-100 dark:border-zinc-800"
              : "bg-gradient-to-b from-slate-500/10 to-transparent border-slate-200 dark:border-zinc-800"
          }`}
        >
          {/* Status Icon */}
          <div className="flex justify-center mb-3">
            {isSuccess && (
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 animate-in zoom-in-75 duration-300">
                <CheckCircle2 className="w-10 h-10" />
              </div>
            )}
            {isFailed && (
              <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shadow-lg shadow-rose-500/20 animate-in zoom-in-75 duration-300">
                <XCircle className="w-10 h-10" />
              </div>
            )}
            {isCancelled && (
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 flex items-center justify-center shadow-md animate-in zoom-in-75 duration-300">
                <Ban className="w-10 h-10" />
              </div>
            )}
          </div>

          <h2
            className={`text-xl sm:text-2xl font-black tracking-tight ${
              isSuccess
                ? "text-emerald-700 dark:text-emerald-400"
                : isFailed
                ? "text-rose-700 dark:text-rose-400"
                : "text-slate-800 dark:text-zinc-200"
            }`}
          >
            {isSuccess && "Demo Transaction Successful"}
            {isFailed && "Demo Transaction Failed"}
            {isCancelled && "Demo Transaction Cancelled"}
          </h2>

          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 font-medium">
            {isSuccess && "Simulation recorded in local demo history"}
            {isFailed && (transaction.failureReason || "Simulation error in sandbox")}
            {isCancelled && "Transaction was cancelled by user"}
          </p>

          {/* Amount Badge */}
          <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-zinc-50 mt-3 tracking-tight">
            NPR {transaction.amount.toFixed(2)}
          </div>

          <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/20">
            <AlertTriangle className="w-3.5 h-3.5" /> No Money Was Transferred
          </div>
        </div>

        {/* Structured Transaction Summary */}
        <div className="p-5 divide-y divide-slate-100 dark:divide-zinc-800 text-xs">
          {/* Demo Ref ID */}
          <div className="py-2.5 first:pt-0 flex justify-between items-center">
            <span className="text-slate-500 dark:text-zinc-400 font-medium">
              Simulation Reference ID
            </span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-bold text-slate-900 dark:text-zinc-100">
                {transaction.simulationRef}
              </span>
              <button
                onClick={handleCopyReceipt}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300"
                title="Copy receipt"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Merchant */}
          <div className="py-2.5 flex justify-between items-center">
            <span className="text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
              <Store className="w-3.5 h-3.5 text-slate-400" /> Merchant
            </span>
            <span className="font-semibold text-slate-900 dark:text-zinc-100 text-right">
              {transaction.qrDetails.merchantName || "Merchant Name Unspecified"}
            </span>
          </div>

          {/* Account ID */}
          <div className="py-2.5 flex justify-between items-center">
            <span className="text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-slate-400" /> Identifier
            </span>
            <span className="font-mono text-slate-700 dark:text-zinc-300">
              {transaction.qrDetails.merchantIdentifier || "None"}
            </span>
          </div>

          {/* Provider */}
          <div className="py-2.5 flex justify-between items-center">
            <span className="text-slate-500 dark:text-zinc-400 font-medium">
              Simulated Provider
            </span>
            <span className="font-semibold text-slate-900 dark:text-zinc-100">
              {transaction.providerName}
            </span>
          </div>

          {/* Purpose */}
          <div className="py-2.5 flex justify-between items-center">
            <span className="text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-slate-400" /> Purpose
            </span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              {transaction.purposeLabel}
            </span>
          </div>

          {/* Remarks */}
          {transaction.remarks && (
            <div className="py-2.5 flex justify-between items-center">
              <span className="text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-slate-400" /> Remarks
              </span>
              <span className="text-slate-800 dark:text-zinc-200 max-w-[200px] truncate text-right">
                {transaction.remarks}
              </span>
            </div>
          )}

          {/* Date & Time */}
          <div className="py-2.5 last:pb-0 flex justify-between items-center">
            <span className="text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" /> Date & Time
            </span>
            <span className="text-slate-600 dark:text-zinc-400">
              {new Date(transaction.createdAt).toLocaleString("en-NP", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-2">
        <div className="flex flex-col sm:flex-row gap-2.5">
          {isFailed && onTryAgain && (
            <button
              onClick={onTryAgain}
              className="flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm shadow-md transition inline-flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Try Again
            </button>
          )}

          <button
            onClick={onNewScan}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 transition inline-flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Scan Another QR
          </button>

          <button
            onClick={onViewHistory}
            className="flex-1 py-3 px-4 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-zinc-800 transition inline-flex items-center justify-center gap-2"
          >
            <Clock className="w-4 h-4" /> View History
          </button>
        </div>
      </div>
    </div>
  );
}
