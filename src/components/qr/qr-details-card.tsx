"use client";

import React from "react";
import {
  Store,
  CreditCard,
  Layers,
  Banknote,
  Globe,
  Tag,
  MapPin,
  FileText,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { ScannedQrDetails } from "@/types/qr";
import { RawPayloadViewer } from "./raw-payload-viewer";

interface QrDetailsCardProps {
  details: ScannedQrDetails;
  onContinue: () => void;
  onScanAgain: () => void;
}

export function QrDetailsCard({
  details,
  onContinue,
  onScanAgain,
}: QrDetailsCardProps) {
  const NOT_AVAILABLE = "Not specified in QR";

  return (
    <div className="w-full space-y-4">
      {/* Merchant Header Card */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-5 sm:p-6 text-center space-y-3">
        {/* Merchant Avatar */}
        <div className="relative inline-block">
          <div className="w-16 h-16 rounded-2xl bg-emerald-600/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-2xl mx-auto border border-emerald-500/20">
            {details.merchantName ? details.merchantName.charAt(0).toUpperCase() : <Store className="w-8 h-8" />}
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center border-2 border-white dark:border-zinc-900 shadow-xs">
            <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-center gap-1.5 mb-0.5">
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              {details.paymentNetwork || "Merchant QR"}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400">
              {details.qrType === "dynamic" ? "Dynamic QR" : "Static QR"}
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {details.merchantName || "Merchant Name Unspecified"}
          </h2>

          {details.merchantCity && (
            <p className="text-xs text-slate-500 dark:text-zinc-400 flex items-center justify-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{details.merchantCity}</span>
            </p>
          )}
        </div>

        {/* Encoded Amount Callout if Dynamic QR */}
        {details.encodedAmount !== undefined ? (
          <div className="pt-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 block">
              Encoded Bill Amount
            </span>
            <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
              NPR {details.encodedAmount.toFixed(2)}
            </div>
          </div>
        ) : (
          <div className="pt-1">
            <span className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 text-xs font-medium">
              Static QR • Enter payment amount in next step
            </span>
          </div>
        )}
      </div>

      {/* Bill & Account Breakdown */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-4 sm:p-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mb-2">
          Scanned Account Information
        </h3>

        <div className="divide-y divide-slate-100 dark:divide-zinc-800 text-xs">
          <div className="py-2.5 first:pt-0 flex justify-between items-center">
            <span className="text-slate-500 dark:text-zinc-400">Merchant PAN / ID</span>
            <span className="font-mono font-bold text-slate-800 dark:text-zinc-200">
              {details.merchantIdentifier || NOT_AVAILABLE}
            </span>
          </div>

          <div className="py-2.5 flex justify-between items-center">
            <span className="text-slate-500 dark:text-zinc-400">Payment Network</span>
            <span className="font-semibold text-slate-800 dark:text-zinc-200">
              {details.paymentNetwork || NOT_AVAILABLE}
            </span>
          </div>

          {details.merchantCategory && (
            <div className="py-2.5 flex justify-between items-center">
              <span className="text-slate-500 dark:text-zinc-400">Merchant Category</span>
              <span className="text-slate-800 dark:text-zinc-200 text-right">
                {details.merchantCategory}
              </span>
            </div>
          )}

          {details.reference && (
            <div className="py-2.5 flex justify-between items-center">
              <span className="text-slate-500 dark:text-zinc-400">Invoice / Bill Ref</span>
              <span className="font-mono font-semibold text-slate-800 dark:text-zinc-200">
                {details.reference}
              </span>
            </div>
          )}

          <div className="py-2.5 last:pb-0 flex justify-between items-center">
            <span className="text-slate-500 dark:text-zinc-400">Currency</span>
            <span className="font-medium text-slate-800 dark:text-zinc-200">
              {details.currency || "NPR (Nepalese Rupee)"}
            </span>
          </div>
        </div>
      </div>

      {/* Expandable Technical Details (For advanced inspection) */}
      <RawPayloadViewer
        rawPayload={details.rawPayload}
        parsedTags={details.parsedTags}
        extraFields={details.extraFields}
      />

      {/* Primary Action Buttons */}
      <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
        <button
          type="button"
          onClick={onScanAgain}
          className="flex-1 py-3.5 px-4 rounded-2xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-zinc-800 transition inline-flex items-center justify-center gap-1.5"
        >
          <RotateCcw className="w-4 h-4" /> Scan Again
        </button>

        <button
          type="button"
          onClick={onContinue}
          className="flex-[2] py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white font-extrabold text-sm shadow-md shadow-emerald-600/25 transition inline-flex items-center justify-center gap-1.5"
        >
          <span>Continue to Payment</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
