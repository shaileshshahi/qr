"use client";

import React from "react";
import {
  Store,
  CreditCard,
  Layers,
  Tag,
  MessageSquare,
  Calendar,
  ArrowRight,
  Edit2,
  ShieldCheck,
} from "lucide-react";
import { ScannedQrDetails } from "@/types/qr";
import { PaymentFormData, PAYMENT_PURPOSES } from "@/types/transaction";

interface PaymentReviewProps {
  qrDetails: ScannedQrDetails;
  formData: PaymentFormData;
  onEditDetails: () => void;
  onContinueToProviders: () => void;
}

export function PaymentReview({
  qrDetails,
  formData,
  onEditDetails,
  onContinueToProviders,
}: PaymentReviewProps) {
  const purposeObj = PAYMENT_PURPOSES.find((p) => p.value === formData.purpose);
  const purposeDisplay =
    formData.purpose === "other" && formData.customPurpose.trim()
      ? formData.customPurpose.trim()
      : purposeObj?.label || "General Payment";

  const currentDateFormatted = new Date().toLocaleString("en-NP", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="w-full space-y-4">
      {/* Review Card */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
        {/* Total Amount Header */}
        <div className="p-6 text-center border-b border-slate-100 dark:border-zinc-800 bg-gradient-to-b from-slate-50/50 to-transparent dark:from-zinc-800/20">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
            Payment Total
          </span>
          <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mt-1 tracking-tight">
            NPR {(formData.amount || 0).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 text-xs font-semibold">
            <Store className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{qrDetails.merchantName || "Merchant Name Unspecified"}</span>
          </div>
        </div>

        {/* Details Breakdown */}
        <div className="p-5 divide-y divide-slate-100 dark:divide-zinc-800 text-xs">
          <div className="py-2.5 first:pt-0 flex justify-between items-center">
            <span className="text-slate-500 dark:text-zinc-400">Account ID</span>
            <span className="font-mono font-bold text-slate-800 dark:text-zinc-200">
              {qrDetails.merchantIdentifier || "None"}
            </span>
          </div>

          <div className="py-2.5 flex justify-between items-center">
            <span className="text-slate-500 dark:text-zinc-400">QR Network</span>
            <span className="font-semibold text-slate-800 dark:text-zinc-200">
              {qrDetails.paymentNetwork || "Nepal Payment QR"}
            </span>
          </div>

          <div className="py-2.5 flex justify-between items-center">
            <span className="text-slate-500 dark:text-zinc-400">Purpose</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              {purposeDisplay}
            </span>
          </div>

          <div className="py-2.5 flex justify-between items-center">
            <span className="text-slate-500 dark:text-zinc-400">Remarks</span>
            <span className="text-slate-800 dark:text-zinc-200 max-w-[200px] truncate text-right font-medium">
              {formData.remarks.trim() || "None"}
            </span>
          </div>

          <div className="py-2.5 last:pb-0 flex justify-between items-center">
            <span className="text-slate-500 dark:text-zinc-400">Timestamp</span>
            <span className="text-slate-600 dark:text-zinc-400">
              {currentDateFormatted}
            </span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
        <button
          type="button"
          onClick={onEditDetails}
          className="flex-1 py-3.5 px-4 rounded-2xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-zinc-800 transition inline-flex items-center justify-center gap-1.5"
        >
          <Edit2 className="w-4 h-4" /> Edit
        </button>

        <button
          type="button"
          onClick={onContinueToProviders}
          className="flex-[2] py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white font-extrabold text-sm shadow-md shadow-emerald-600/25 transition inline-flex items-center justify-center gap-1.5"
        >
          <span>Choose Wallet / Bank</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
