"use client";

import React from "react";
import {
  Store,
  CreditCard,
  Tag,
  MessageSquare,
  Network,
  Lock,
} from "lucide-react";
import { Provider } from "@/types/provider";
import { ScannedQrDetails } from "@/types/qr";
import { PaymentFormData, PAYMENT_PURPOSES } from "@/types/transaction";

interface ProviderLayoutProps {
  provider: Provider;
  qrDetails: ScannedQrDetails;
  formData: PaymentFormData;
  onPay: () => void;
  isProcessing?: boolean;
}

export function FonepayLayout({
  provider,
  qrDetails,
  formData,
  onPay,
  isProcessing,
}: ProviderLayoutProps) {
  const purposeObj = PAYMENT_PURPOSES.find((p) => p.value === formData.purpose);
  const purposeDisplay =
    formData.purpose === "other" && formData.customPurpose.trim()
      ? formData.customPurpose.trim()
      : purposeObj?.label || "General Payment";

  return (
    <div className="rounded-3xl border border-[#DE2027]/30 bg-white dark:bg-zinc-900 shadow-lg overflow-hidden">
      {/* Fonepay Red Header */}
      <div className="bg-[#DE2027] text-white p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white text-[#DE2027] flex items-center justify-center font-black text-sm shadow-sm tracking-wider">
              FP
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight">Fonepay Direct</span>
                <span className="text-[9px] font-bold bg-white/20 px-1.5 py-0.2 rounded uppercase">
                  Sandbox
                </span>
              </div>
              <p className="text-[11px] text-red-100">
                Interoperable QR Network
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-red-100 block">
              Network
            </span>
            <span className="text-xs font-mono font-bold text-white">
              {qrDetails.terminalLabel || "FP-TEST-01"}
            </span>
          </div>
        </div>
      </div>

      {/* Amount Header */}
      <div className="p-5 text-center bg-red-50/40 dark:bg-zinc-950/40 border-b border-red-100 dark:border-zinc-800">
        <span className="text-[11px] font-bold uppercase tracking-wider text-red-800 dark:text-red-400">
          Payment Amount
        </span>
        <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
          NPR {(formData.amount || 0).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
        <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 text-xs font-bold shadow-xs border border-slate-200/60 dark:border-zinc-700">
          <Store className="w-3.5 h-3.5 text-[#DE2027]" />
          <span>{qrDetails.merchantName || "Merchant Name Unspecified"}</span>
        </div>
      </div>

      {/* Breakdown */}
      <div className="p-5 divide-y divide-slate-100 dark:divide-zinc-800 text-xs">
        <div className="py-2.5 first:pt-0 flex justify-between items-center">
          <span className="text-slate-500 dark:text-zinc-400">Merchant PAN</span>
          <span className="font-mono font-bold text-slate-800 dark:text-zinc-200">
            {qrDetails.merchantIdentifier || "None"}
          </span>
        </div>

        <div className="py-2.5 flex justify-between items-center">
          <span className="text-slate-500 dark:text-zinc-400">Clearing Bank Route</span>
          <span className="font-semibold text-slate-800 dark:text-zinc-200">
            {qrDetails.bankIdentifier || "Fonepay Clearing Member"}
          </span>
        </div>

        <div className="py-2.5 flex justify-between items-center">
          <span className="text-slate-500 dark:text-zinc-400">Purpose</span>
          <span className="font-bold text-slate-900 dark:text-white">
            {purposeDisplay}
          </span>
        </div>

        <div className="py-2.5 last:pb-0 flex justify-between items-center">
          <span className="text-slate-500 dark:text-zinc-400">Remarks</span>
          <span className="text-slate-700 dark:text-zinc-300 font-medium max-w-[200px] truncate text-right">
            {formData.remarks.trim() || "None"}
          </span>
        </div>
      </div>

      {/* Authentic Pay Button */}
      <div className="p-4 bg-slate-50/80 dark:bg-zinc-950/60 border-t border-slate-100 dark:border-zinc-800">
        <button
          type="button"
          onClick={onPay}
          disabled={isProcessing}
          className="w-full py-3.5 rounded-2xl bg-[#DE2027] hover:bg-[#C91A20] active:scale-[0.99] text-white font-extrabold text-sm shadow-md shadow-[#DE2027]/30 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
        >
          <Lock className="w-4 h-4" />
          <span>Pay via Fonepay NPR {(formData.amount || 0).toFixed(2)}</span>
        </button>
      </div>
    </div>
  );
}
