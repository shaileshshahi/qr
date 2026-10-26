"use client";

import React from "react";
import {
  Building2,
  Store,
  CreditCard,
  Tag,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Provider } from "@/types/provider";
import { ScannedQrDetails } from "@/types/qr";
import { PaymentFormData, PAYMENT_PURPOSES } from "@/types/transaction";

interface ProviderLayoutProps {
  provider: Provider;
  qrDetails: ScannedQrDetails;
  formData: PaymentFormData;
}

export function GlobalImeLayout({
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
    <div className="rounded-2xl border-2 border-blue-900/30 bg-white dark:bg-zinc-900 shadow-md overflow-hidden">
      {/* Global IME Bank Header */}
      <div className="bg-[#003366] text-white p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center font-black text-sm">
            GIB
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-wide">Global Smart Plus</span>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded font-bold uppercase tracking-wider">
                Simulated
              </span>
            </div>
            <p className="text-[11px] text-blue-200">
              Global IME Bank • Mobile Banking Simulator
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] uppercase font-bold tracking-wider text-blue-200 block">
            A/C Balance
          </span>
          <span className="text-sm font-bold text-white">NPR 1,45,200.00</span>
        </div>
      </div>

      {/* Account Debit Header */}
      <div className="p-5 text-center bg-blue-50/50 dark:bg-zinc-950/40 border-b border-blue-100 dark:border-zinc-800">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-900 dark:text-blue-400">
          Debit Amount
        </span>
        <div className="text-3xl sm:text-4xl font-black text-[#003366] dark:text-blue-300 mt-1">
          NPR {(formData.amount || 0).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
        <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-blue-100/70 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300 text-xs font-semibold">
          <Store className="w-3.5 h-3.5" />
          <span>{qrDetails.merchantName || "Merchant Name Unspecified"}</span>
        </div>
      </div>

      {/* Bank Specific Details */}
      <div className="p-5 divide-y divide-slate-100 dark:divide-zinc-800 text-xs">
        <div className="py-2.5 first:pt-0 flex justify-between items-center">
          <span className="text-slate-500 dark:text-zinc-400 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-blue-800 dark:text-blue-400" /> Beneficiary Merchant ID
          </span>
          <span className="font-mono font-medium text-slate-800 dark:text-zinc-200">
            {qrDetails.merchantIdentifier || "Not specified in QR"}
          </span>
        </div>

        <div className="py-2.5 flex justify-between items-center">
          <span className="text-slate-500 dark:text-zinc-400 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-800 dark:text-blue-400" /> From Account
          </span>
          <span className="font-mono font-semibold text-slate-800 dark:text-zinc-200">
            0101010008899 (Demo Savings)
          </span>
        </div>

        <div className="py-2.5 flex justify-between items-center">
          <span className="text-slate-500 dark:text-zinc-400 flex items-center gap-2">
            <Tag className="w-4 h-4 text-blue-800 dark:text-blue-400" /> Payment Purpose
          </span>
          <span className="font-semibold text-slate-900 dark:text-zinc-100">
            {purposeDisplay}
          </span>
        </div>

        <div className="py-2.5 last:pb-0 flex justify-between items-center">
          <span className="text-slate-500 dark:text-zinc-400 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-800 dark:text-blue-400" /> Remarks
          </span>
          <span className="text-slate-700 dark:text-zinc-300 max-w-[200px] truncate text-right">
            {formData.remarks.trim() || "None"}
          </span>
        </div>
      </div>
    </div>
  );
}
