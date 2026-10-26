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
  Clock,
  Store,
  CreditCard,
  Tag,
  Calendar,
  MessageSquare,
  ShieldCheck,
  Share2,
  CheckCircle,
} from "lucide-react";
import { SimulationTransaction } from "@/types/transaction";

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
          particleCount: 45,
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
    const text = `--- QR DEMO NEPAL (SIMULATION) ---
Status: ${transaction.outcome.toUpperCase()}
Ref: ${transaction.simulationRef}
Merchant: ${transaction.qrDetails.merchantName || "Unspecified"}
ID: ${transaction.qrDetails.merchantIdentifier || "None"}
Amount: NPR ${transaction.amount.toFixed(2)}
Provider: ${transaction.providerName}
Purpose: ${transaction.purposeLabel}
Remarks: ${transaction.remarks || "None"}
Date: ${new Date(transaction.createdAt).toLocaleString()}
DISCLAIMER: SIMULATION ONLY. NO REAL MONEY WAS TRANSFERRED.
-----------------------------------`;

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
      {/* Authentic Digital Receipt Ticket Card */}
      <div className="rounded-3xl border border-slate-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden relative">
        {/* Top Status Accent Bar */}
        <div
          className={`h-2.5 w-full ${
            isSuccess
              ? "bg-emerald-500"
              : isFailed
              ? "bg-rose-500"
              : "bg-slate-400"
          }`}
        />

        {/* Hero Status Section */}
        <div className="p-6 text-center space-y-3">
          {/* Animated Status Icon */}
          <div className="flex justify-center">
            {isSuccess && (
              <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center ring-8 ring-emerald-500/10 shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
              </div>
            )}
            {isFailed && (
              <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center ring-8 ring-rose-500/10 shadow-lg shadow-rose-500/20">
                <XCircle className="w-9 h-9 stroke-[2.5]" />
              </div>
            )}
            {isCancelled && (
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 flex items-center justify-center ring-8 ring-slate-500/10">
                <Ban className="w-9 h-9 stroke-[2.5]" />
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              {isSuccess && "Payment Successful"}
              {isFailed && "Payment Failed"}
              {isCancelled && "Payment Cancelled"}
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
              {isSuccess && "Simulated payment processed in sandbox"}
              {isFailed && (transaction.failureReason || "Transaction could not be completed")}
              {isCancelled && "Transaction was cancelled by user"}
            </p>
          </div>

          {/* Amount Display */}
          <div className="py-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
              Amount Transferred
            </span>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              NPR {transaction.amount.toFixed(2)}
            </div>
          </div>

          {/* Paid To Merchant Chip */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-zinc-800/80 border border-slate-200/80 dark:border-zinc-700 text-xs">
            <Store className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-bold text-slate-800 dark:text-zinc-200">
              {transaction.qrDetails.merchantName || "Merchant Name Unspecified"}
            </span>
          </div>
        </div>

        {/* Perforated Receipt Divider */}
        <div className="relative flex items-center justify-between px-2">
          <div className="w-4 h-8 rounded-r-full bg-slate-50 dark:bg-zinc-950 border-r border-t border-b border-slate-200/80 dark:border-zinc-800 -ml-2" />
          <div className="flex-1 border-b-2 border-dashed border-slate-200 dark:border-zinc-800 mx-2" />
          <div className="w-4 h-8 rounded-l-full bg-slate-50 dark:bg-zinc-950 border-l border-t border-b border-slate-200/80 dark:border-zinc-800 -mr-2" />
        </div>

        {/* Structured Receipt Details */}
        <div className="p-6 space-y-3 text-xs">
          {/* Reference ID with 1-tap copy */}
          <div className="flex justify-between items-center py-1">
            <span className="text-slate-500 dark:text-zinc-400 font-medium">
              Reference ID
            </span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-bold text-slate-900 dark:text-zinc-100">
                {transaction.simulationRef}
              </span>
              <button
                type="button"
                onClick={handleCopyReceipt}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 transition"
                title="Copy reference"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Paid Via Provider */}
          <div className="flex justify-between items-center py-1">
            <span className="text-slate-500 dark:text-zinc-400 font-medium">
              Payment Method
            </span>
            <span className="font-bold text-slate-900 dark:text-zinc-100">
              {transaction.providerName}
            </span>
          </div>

          {/* Merchant ID */}
          {transaction.qrDetails.merchantIdentifier && (
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-500 dark:text-zinc-400 font-medium">
                Merchant PAN / ID
              </span>
              <span className="font-mono text-slate-700 dark:text-zinc-300">
                {transaction.qrDetails.merchantIdentifier}
              </span>
            </div>
          )}

          {/* Purpose */}
          <div className="flex justify-between items-center py-1">
            <span className="text-slate-500 dark:text-zinc-400 font-medium">
              Purpose
            </span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              {transaction.purposeLabel}
            </span>
          </div>

          {/* Remarks */}
          {transaction.remarks && (
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-500 dark:text-zinc-400 font-medium">
                Remarks
              </span>
              <span className="font-medium text-slate-800 dark:text-zinc-200 max-w-[200px] truncate text-right">
                {transaction.remarks}
              </span>
            </div>
          )}

          {/* Date & Time */}
          <div className="flex justify-between items-center py-1">
            <span className="text-slate-500 dark:text-zinc-400 font-medium">
              Date &amp; Time
            </span>
            <span className="text-slate-600 dark:text-zinc-400 font-medium">
              {new Date(transaction.createdAt).toLocaleString("en-NP", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </span>
          </div>

          {/* Subtle Simulation Watermark Box */}
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-zinc-800/80 text-center">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              <ShieldCheck className="w-3.5 h-3.5" /> Simulation Only • No Real Money Transferred
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-1">
        {isFailed && onTryAgain && (
          <button
            type="button"
            onClick={onTryAgain}
            className="w-full py-3.5 px-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-sm shadow-md transition inline-flex items-center justify-center gap-2 active:scale-[0.99]"
          >
            <RotateCcw className="w-4 h-4" /> Try Again
          </button>
        )}

        <button
          type="button"
          onClick={onNewScan}
          className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-md shadow-emerald-600/25 transition inline-flex items-center justify-center gap-2 active:scale-[0.99]"
        >
          <RotateCcw className="w-4 h-4" /> Scan Another QR
        </button>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleCopyReceipt}
            className="flex-1 py-3 px-4 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 font-bold text-xs hover:bg-slate-50 dark:hover:bg-zinc-800 transition inline-flex items-center justify-center gap-2 active:scale-[0.99]"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" /> Copied Receipt
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" /> Share Receipt
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onViewHistory}
            className="flex-1 py-3 px-4 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 font-bold text-xs hover:bg-slate-50 dark:hover:bg-zinc-800 transition inline-flex items-center justify-center gap-2 active:scale-[0.99]"
          >
            <Clock className="w-3.5 h-3.5" /> View History
          </button>
        </div>
      </div>
    </div>
  );
}
