"use client";

import React from "react";
import Link from "next/link";
import { Store, ArrowLeft, Layers, ShieldCheck } from "lucide-react";
import { ScannedQrDetails } from "@/types/qr";

interface MerchantSummaryProps {
  qrDetails: ScannedQrDetails;
  onBackToQrDetails?: () => void;
}

export function MerchantSummary({
  qrDetails,
  onBackToQrDetails,
}: MerchantSummaryProps) {
  return (
    <div className="p-4 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
          <Store className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300">
              {qrDetails.paymentNetwork || "Merchant QR"}
            </span>
            {qrDetails.merchantCity && (
              <span className="text-[11px] text-slate-400 dark:text-zinc-500 truncate">
                • {qrDetails.merchantCity}
              </span>
            )}
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-zinc-100 truncate">
            {qrDetails.merchantName || "Merchant Name Unspecified"}
          </h3>
          <p className="font-mono text-[11px] text-slate-500 dark:text-zinc-400 truncate">
            ID: {qrDetails.merchantIdentifier || "Not specified in QR"}
          </p>
        </div>
      </div>

      {onBackToQrDetails && (
        <button
          onClick={onBackToQrDetails}
          className="shrink-0 text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-medium inline-flex items-center gap-1 p-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Details</span>
        </button>
      )}
    </div>
  );
}
