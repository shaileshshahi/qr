"use client";

import React from "react";
import {
  Store,
  CreditCard,
  Layers,
  Banknote,
  Tag,
  MessageSquare,
  Calendar,
  ShieldAlert,
  ArrowRight,
  Edit2,
} from "lucide-react";
import { ScannedQrDetails } from "@/types/qr";
import { PaymentFormData, PAYMENT_PURPOSES } from "@/types/transaction";
import { DemoBanner } from "../layout/demo-banner";

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
      {/* Simulation Banner */}
      <DemoBanner variant="card" />

      {/* Review Card */}
      <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
        {/* Total Amount Header */}
        <div className="p-6 text-center border-b border-slate-100 dark:border-zinc-800 bg-gradient-to-b from-emerald-500/5 to-transparent">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
            Total Payment Review
          </span>
          <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-zinc-50 mt-1 tracking-tight">
            NPR {(formData.amount || 0).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
            Simulated transfer for demo testing
          </p>
        </div>

        {/* Details Breakdown */}
        <div className="p-5 divide-y divide-slate-100 dark:divide-zinc-800/80 text-xs">
          {/* Merchant */}
          <div className="py-3 first:pt-0 flex items-start justify-between gap-3">
            <span className="text-slate-500 dark:text-zinc-400 flex items-center gap-2">
              <Store className="w-4 h-4 text-emerald-500" /> Merchant Name
            </span>
            <span className="font-semibold text-slate-900 dark:text-zinc-100 text-right">
              {qrDetails.merchantName || "Merchant Name Unspecified"}
            </span>
          </div>

          {/* Account / Identifier */}
          <div className="py-3 flex items-start justify-between gap-3">
            <span className="text-slate-500 dark:text-zinc-400 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-500" /> Account Identifier
            </span>
            <span className="font-mono text-slate-800 dark:text-zinc-200 text-right">
              {qrDetails.merchantIdentifier || "Not specified in QR"}
            </span>
          </div>

          {/* Detected QR Network */}
          <div className="py-3 flex items-start justify-between gap-3">
            <span className="text-slate-500 dark:text-zinc-400 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-500" /> Detected Network
            </span>
            <span className="font-semibold text-slate-900 dark:text-zinc-100 text-right">
              {qrDetails.paymentNetwork || "Nepal Payment QR"}
            </span>
          </div>

          {/* Purpose */}
          <div className="py-3 flex items-start justify-between gap-3">
            <span className="text-slate-500 dark:text-zinc-400 flex items-center gap-2">
              <Tag className="w-4 h-4 text-emerald-500" /> Payment Purpose
            </span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400 text-right">
              {purposeDisplay}
            </span>
          </div>

          {/* Remarks */}
          <div className="py-3 flex items-start justify-between gap-3">
            <span className="text-slate-500 dark:text-zinc-400 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-500" /> Remarks
            </span>
            <span className="text-slate-800 dark:text-zinc-200 text-right max-w-[200px] truncate">
              {formData.remarks.trim() || "No remarks provided"}
            </span>
          </div>

          {/* Date & Time */}
          <div className="py-3 last:pb-0 flex items-start justify-between gap-3">
            <span className="text-slate-500 dark:text-zinc-400 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-500" /> Timestamp
            </span>
            <span className="text-slate-600 dark:text-zinc-400 text-right">
              {currentDateFormatted}
            </span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
        <button
          onClick={onEditDetails}
          className="flex-1 py-3 px-4 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-zinc-800 transition inline-flex items-center justify-center gap-1.5"
        >
          <Edit2 className="w-4 h-4" /> Edit Details
        </button>

        <button
          onClick={onContinueToProviders}
          className="flex-[2] py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 active:scale-[0.99] transition inline-flex items-center justify-center gap-1.5"
        >
          <span>Select Wallet or Bank</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
