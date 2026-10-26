"use client";

import React from "react";
import {
  Building2,
  Wallet,
  QrCode,
  Store,
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

export function GenericProviderLayout({
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

  const getProviderIcon = () => {
    if (provider.category === "wallets") return <Wallet className="w-5 h-5" />;
    if (provider.category === "qr-networks") return <QrCode className="w-5 h-5" />;
    return <Building2 className="w-5 h-5" />;
  };

  return (
    <div
      className="rounded-3xl border-2 bg-white dark:bg-zinc-900 shadow-lg overflow-hidden transition-all"
      style={{ borderColor: `${provider.primaryColor}30` }}
    >
      {/* Header */}
      <div
        className="text-white p-5 flex items-center justify-between"
        style={{
          background: `linear-gradient(135deg, ${provider.primaryColor}, ${provider.secondaryColor})`,
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-sm shadow-xs">
            {getProviderIcon()}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight">
                {provider.name}
              </span>
              <span className="text-[9px] bg-white/20 px-1.5 py-0.2 rounded font-bold uppercase tracking-wider">
                Sandbox
              </span>
            </div>
            <p className="text-[11px] opacity-90 truncate max-w-[200px]">
              {provider.tagline}
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] uppercase font-bold tracking-wider opacity-80 block">
            Channel
          </span>
          <span className="text-xs font-bold text-white uppercase font-mono">
            {provider.code}
          </span>
        </div>
      </div>

      {/* Amount Display */}
      <div className="p-5 text-center bg-slate-50/50 dark:bg-zinc-950/40 border-b border-slate-100 dark:border-zinc-800">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
          Transfer Total
        </span>
        <div
          className="text-3xl sm:text-4xl font-black mt-1"
          style={{ color: provider.primaryColor }}
        >
          NPR {(formData.amount || 0).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
        <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 text-xs font-bold shadow-xs border border-slate-200/60 dark:border-zinc-700">
          <Store className="w-3.5 h-3.5" style={{ color: provider.primaryColor }} />
          <span>{qrDetails.merchantName || "Merchant Name Unspecified"}</span>
        </div>
      </div>

      {/* Fields */}
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

        <div className="py-2.5 last:pb-0 flex justify-between items-center">
          <span className="text-slate-500 dark:text-zinc-400">Remarks</span>
          <span className="text-slate-700 dark:text-zinc-300 font-medium max-w-[200px] truncate text-right">
            {formData.remarks.trim() || "None"}
          </span>
        </div>
      </div>

      {/* Pay Button */}
      <div className="p-4 bg-slate-50/80 dark:bg-zinc-950/60 border-t border-slate-100 dark:border-zinc-800">
        <button
          type="button"
          onClick={onPay}
          disabled={isProcessing}
          className="w-full py-3.5 rounded-2xl text-white font-extrabold text-sm shadow-md active:scale-[0.99] transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          style={{ backgroundColor: provider.primaryColor }}
        >
          <Lock className="w-4 h-4" />
          <span>Pay via {provider.name} NPR {(formData.amount || 0).toFixed(2)}</span>
        </button>
      </div>
    </div>
  );
}
