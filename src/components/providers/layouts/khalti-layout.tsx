"use client";

import React from "react";
import {
  Store,
  CreditCard,
  Tag,
  MessageSquare,
  Sparkles,
  Zap,
} from "lucide-react";
import { Provider } from "@/types/provider";
import { ScannedQrDetails } from "@/types/qr";
import { PaymentFormData, PAYMENT_PURPOSES } from "@/types/transaction";

interface ProviderLayoutProps {
  provider: Provider;
  qrDetails: ScannedQrDetails;
  formData: PaymentFormData;
}

export function KhaltiLayout({
  provider,
  qrDetails,
  formData,
}: ProviderLayoutProps) {
  const purposeObj = PAYMENT_PURPOSES.find((p) => p.value === formData.purpose);
  const purposeDisplay =
    formData.purpose === "other" && formData.customPurpose.trim()
      ? formData.customPurpose.trim()
      : purposeObj?.label || "General Payment";

  const simulatedKhaltiPoints = Math.floor((formData.amount || 0) * 0.05);

  return (
    <div className="rounded-2xl border-2 border-purple-500/30 bg-white dark:bg-zinc-900 shadow-md overflow-hidden">
      {/* Khalti Inspired Header */}
      <div className="bg-[#5D2E8E] text-white p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-base">
            K
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-wide">Khalti Pay</span>
              <span className="text-[10px] bg-purple-400/30 px-1.5 py-0.2 rounded font-bold uppercase tracking-wider">
                Simulation
              </span>
            </div>
            <p className="text-[11px] text-purple-200">
              Fast, Simple & Rewarding
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] uppercase font-bold tracking-wider text-purple-200 block">
            Demo Points
          </span>
          <span className="text-sm font-bold text-amber-300 flex items-center gap-1 justify-end">
            <Sparkles className="w-3.5 h-3.5 fill-current" /> +{simulatedKhaltiPoints} KP
          </span>
        </div>
      </div>

      {/* Main Amount Card */}
      <div className="p-5 text-center bg-purple-50/50 dark:bg-zinc-950/40 border-b border-purple-100 dark:border-zinc-800">
        <span className="text-xs font-semibold uppercase tracking-wider text-purple-700 dark:text-purple-400">
          Checkout Amount
        </span>
        <div className="text-3xl sm:text-4xl font-black text-purple-900 dark:text-purple-300 mt-1">
          Rs. {(formData.amount || 0).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
        <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-purple-100/70 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 text-xs font-semibold">
          <Store className="w-3.5 h-3.5" />
          <span>{qrDetails.merchantName || "Merchant Name Unspecified"}</span>
        </div>
      </div>

      {/* Structured Info */}
      <div className="p-5 divide-y divide-slate-100 dark:divide-zinc-800 text-xs">
        <div className="py-2.5 first:pt-0 flex justify-between items-center">
          <span className="text-slate-500 dark:text-zinc-400 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-purple-600" /> Khalti Merchant Code
          </span>
          <span className="font-mono font-medium text-slate-800 dark:text-zinc-200">
            {qrDetails.merchantIdentifier || "Not specified in QR"}
          </span>
        </div>

        <div className="py-2.5 flex justify-between items-center">
          <span className="text-slate-500 dark:text-zinc-400 flex items-center gap-2">
            <Tag className="w-4 h-4 text-purple-600" /> Payment Purpose
          </span>
          <span className="font-semibold text-slate-900 dark:text-zinc-100">
            {purposeDisplay}
          </span>
        </div>

        <div className="py-2.5 flex justify-between items-center">
          <span className="text-slate-500 dark:text-zinc-400 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-purple-600" /> Remarks
          </span>
          <span className="text-slate-700 dark:text-zinc-300 max-w-[200px] truncate text-right">
            {formData.remarks.trim() || "None"}
          </span>
        </div>

        <div className="py-2.5 last:pb-0 flex justify-between items-center">
          <span className="text-slate-500 dark:text-zinc-400 flex items-center gap-2">
            <Zap className="w-4 h-4 text-purple-600" /> Demo Payment Method
          </span>
          <span className="font-semibold text-purple-700 dark:text-purple-400">
            Khalti Wallet (Demo Mode)
          </span>
        </div>
      </div>
    </div>
  );
}
