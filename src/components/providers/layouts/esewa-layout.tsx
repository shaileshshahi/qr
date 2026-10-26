"use client";

import React from "react";
import {
  Wallet,
  Store,
  CreditCard,
  Tag,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Calendar,
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

export function EsewaLayout({
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
    <div className="rounded-3xl border border-[#43A047]/30 bg-white dark:bg-zinc-900 shadow-lg overflow-hidden">
      {/* Authentic eSewa Green Header */}
      <div className="bg-[#43A047] text-white p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white text-[#43A047] flex items-center justify-center font-black text-lg shadow-sm">
              eS
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight">eSewa Pay</span>
                <span className="text-[9px] font-bold bg-white/20 px-1.5 py-0.2 rounded uppercase">
                  Sandbox
                </span>
              </div>
              <p className="text-[11px] text-emerald-100">
                Nepal&apos;s First Digital Wallet
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-emerald-100 block">
              Wallet Balance
            </span>
            <span className="text-sm font-bold text-white">NPR 25,000.00</span>
          </div>
        </div>
      </div>

      {/* Merchant & Amount Box */}
      <div className="p-5 text-center bg-emerald-50/40 dark:bg-zinc-950/40 border-b border-emerald-100 dark:border-zinc-800">
        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
          Payment to Merchant
        </span>
        <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
          Rs. {(formData.amount || 0).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
        <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 text-xs font-bold shadow-xs border border-slate-200/60 dark:border-zinc-700">
          <Store className="w-3.5 h-3.5 text-[#43A047]" />
          <span>{qrDetails.merchantName || "Merchant Name Unspecified"}</span>
        </div>
      </div>

      {/* Breakdown */}
      <div className="p-5 divide-y divide-slate-100 dark:divide-zinc-800 text-xs">
        <div className="py-2.5 first:pt-0 flex justify-between items-center">
          <span className="text-slate-500 dark:text-zinc-400">Merchant PAN / ID</span>
          <span className="font-mono font-bold text-slate-800 dark:text-zinc-200">
            {qrDetails.merchantIdentifier || "None"}
          </span>
        </div>

        <div className="py-2.5 flex justify-between items-center">
          <span className="text-slate-500 dark:text-zinc-400">Purpose</span>
          <span className="font-bold text-slate-900 dark:text-white">
            {purposeDisplay}
          </span>
        </div>

        <div className="py-2.5 flex justify-between items-center">
          <span className="text-slate-500 dark:text-zinc-400">Remarks</span>
          <span className="text-slate-700 dark:text-zinc-300 font-medium max-w-[200px] truncate text-right">
            {formData.remarks.trim() || "None"}
          </span>
        </div>

        <div className="py-2.5 last:pb-0 flex justify-between items-center">
          <span className="text-slate-500 dark:text-zinc-400">Paying Account</span>
          <span className="font-mono text-[#43A047] font-bold">
            9801****** (Demo User)
          </span>
        </div>
      </div>

      {/* Authentic Pay Button */}
      <div className="p-4 bg-slate-50/80 dark:bg-zinc-950/60 border-t border-slate-100 dark:border-zinc-800">
        <button
          type="button"
          onClick={onPay}
          disabled={isProcessing}
          className="w-full py-3.5 rounded-2xl bg-[#43A047] hover:bg-[#388E3C] active:scale-[0.99] text-white font-extrabold text-sm shadow-md shadow-[#43A047]/30 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
        >
          <Lock className="w-4 h-4" />
          <span>Confirm &amp; Pay NPR {(formData.amount || 0).toFixed(2)}</span>
        </button>
      </div>
    </div>
  );
}
