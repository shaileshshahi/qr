"use client";

import React from "react";
import Link from "next/link";
import { Store, Info, ShieldCheck, CheckCircle2 } from "lucide-react";
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
    <div className="p-4 rounded-3xl border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <div className="relative shrink-0">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-lg border border-emerald-500/20">
            {qrDetails.merchantName ? qrDetails.merchantName.charAt(0).toUpperCase() : <Store className="w-5 h-5" />}
          </div>
          <div className="absolute -bottom-1 -right-1 w-4.5 h-4.5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
            <CheckCircle2 className="w-3 h-3 stroke-[3]" />
          </div>
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              {qrDetails.paymentNetwork || "Merchant QR"}
            </span>
            {qrDetails.merchantCity && (
              <span className="text-[11px] text-slate-400 dark:text-zinc-500 truncate">
                • {qrDetails.merchantCity}
              </span>
            )}
          </div>
          <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-zinc-100 truncate mt-0.5">
            {qrDetails.merchantName || "Merchant Name Unspecified"}
          </h3>
          <p className="font-mono text-[11px] text-slate-500 dark:text-zinc-400 truncate">
            PAN/ID: {qrDetails.merchantIdentifier || "None specified"}
          </p>
        </div>
      </div>

      {onBackToQrDetails && (
        <button
          type="button"
          onClick={onBackToQrDetails}
          className="shrink-0 text-[11px] text-slate-500 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400 font-semibold inline-flex items-center gap-1 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800 transition"
          title="View raw QR data"
        >
          <Info className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">QR Data</span>
        </button>
      )}
    </div>
  );
}
