"use client";

import React from "react";
import {
  QrCode,
  Store,
  CreditCard,
  Tag,
  MessageSquare,
  Network,
  ShieldCheck,
} from "lucide-react";
import { Provider } from "@/types/provider";
import { ScannedQrDetails } from "@/types/qr";
import { PaymentFormData, PAYMENT_PURPOSES } from "@/types/transaction";

interface ProviderLayoutProps {
  provider: Provider;
  qrDetails: ScannedQrDetails;
  formData: PaymentFormData;
}

export function FonepayLayout({
  provider,
  qrDetails,
  formData,
}: ProviderLayoutProps) {
  const purposeObj = PAYMENT_PURPOSES.find((p) => p.value === formData.purpose);
  const purposeDisplay =
    formData.purpose === "other" && formData.customPurpose.trim()
      ? formData.customPurpose.trim()
      : purposeObj?.label || "General Payment";

  return (
    <div className="rounded-2xl border-2 border-red-500/30 bg-white dark:bg-zinc-900 shadow-md overflow-hidden">
      {/* Fonepay Header */}
      <div className="bg-[#DE2027] text-white p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-sm tracking-wider">
            FP
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-wide">Fonepay Network</span>
              <span className="text-[10px] bg-black/20 px-1.5 py-0.2 rounded font-bold uppercase tracking-wider">
                Simulated
              </span>
            </div>
            <p className="text-[11px] text-red-100">
              Interoperable QR Payment Network Simulator
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] uppercase font-bold tracking-wider text-red-100 block">
            Terminal
          </span>
          <span className="text-xs font-mono font-bold text-white">
            {qrDetails.terminalLabel || "FP-TEST-01"}
          </span>
        </div>
      </div>

      {/* Amount Header */}
      <div className="p-5 text-center bg-red-50/50 dark:bg-zinc-950/40 border-b border-red-100 dark:border-zinc-800">
        <span className="text-xs font-semibold uppercase tracking-wider text-red-700 dark:text-red-400">
          Payment Amount
        </span>
        <div className="text-3xl sm:text-4xl font-black text-red-700 dark:text-red-400 mt-1">
          NPR {(formData.amount || 0).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
        <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-red-100/70 dark:bg-red-950/60 text-red-800 dark:text-red-300 text-xs font-semibold">
          <Store className="w-3.5 h-3.5" />
          <span>{qrDetails.merchantName || "Merchant Name Unspecified"}</span>
        </div>
      </div>

      {/* Fonepay Network Info */}
      <div className="p-5 divide-y divide-slate-100 dark:divide-zinc-800 text-xs">
        <div className="py-2.5 first:pt-0 flex justify-between items-center">
          <span className="text-slate-500 dark:text-zinc-400 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-red-600" /> Fonepay PAN / ID
          </span>
          <span className="font-mono font-medium text-slate-800 dark:text-zinc-200">
            {qrDetails.merchantIdentifier || "Not specified in QR"}
          </span>
        </div>

        <div className="py-2.5 flex justify-between items-center">
          <span className="text-slate-500 dark:text-zinc-400 flex items-center gap-2">
            <Network className="w-4 h-4 text-red-600" /> Member Bank Route
          </span>
          <span className="font-semibold text-slate-800 dark:text-zinc-200">
            {qrDetails.bankIdentifier || "Fonepay Clearing Core"}
          </span>
        </div>

        <div className="py-2.5 flex justify-between items-center">
          <span className="text-slate-500 dark:text-zinc-400 flex items-center gap-2">
            <Tag className="w-4 h-4 text-red-600" /> Payment Purpose
          </span>
          <span className="font-semibold text-slate-900 dark:text-zinc-100">
            {purposeDisplay}
          </span>
        </div>

        <div className="py-2.5 last:pb-0 flex justify-between items-center">
          <span className="text-slate-500 dark:text-zinc-400 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-red-600" /> Remarks
          </span>
          <span className="text-slate-700 dark:text-zinc-300 max-w-[200px] truncate text-right">
            {formData.remarks.trim() || "None"}
          </span>
        </div>
      </div>
    </div>
  );
}
