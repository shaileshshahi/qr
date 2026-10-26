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
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import { ScannedQrDetails } from "@/types/qr";
import { RawPayloadViewer } from "./raw-payload-viewer";
import { DemoBanner } from "../layout/demo-banner";

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
  const NOT_AVAILABLE = "Not available in scanned QR";

  return (
    <div className="w-full space-y-4">
      {/* Simulation Banner Notice */}
      <DemoBanner variant="card" />

      {/* Main Decoded Details Card */}
      <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-zinc-800 flex items-start justify-between gap-3 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-3 h-3" />
                Decoded Successfully
              </span>
              <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-medium">
                {details.format}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-zinc-50 tracking-tight">
              Scanned QR Details
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Actual information extracted from the merchant QR payload
            </p>
          </div>

          {/* QR Type Badge */}
          <div className="text-right shrink-0">
            <span
              className={`inline-block px-2.5 py-1 rounded-lg text-xs font-semibold ${
                details.qrType === "dynamic"
                  ? "bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300 border border-sky-200 dark:border-sky-800"
                  : details.qrType === "static"
                  ? "bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700"
                  : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
              }`}
            >
              {details.qrType === "dynamic"
                ? "Dynamic QR"
                : details.qrType === "static"
                ? "Static Merchant QR"
                : "Standard QR"}
            </span>
          </div>
        </div>

        {/* Structured Field Grid */}
        <div className="p-4 sm:p-5 divide-y divide-slate-100 dark:divide-zinc-800/80">
          {/* Merchant Name */}
          <div className="py-3 first:pt-0 flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-400 text-xs">
              <Store className="w-4 h-4 text-emerald-500" />
              <span>Merchant Name</span>
            </div>
            <div className="text-right">
              {details.merchantName ? (
                <span className="font-semibold text-sm text-slate-900 dark:text-zinc-50">
                  {details.merchantName}
                </span>
              ) : (
                <span className="text-xs italic text-slate-400 dark:text-zinc-500">
                  {NOT_AVAILABLE}
                </span>
              )}
            </div>
          </div>

          {/* Account Identifier */}
          <div className="py-3 flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-400 text-xs">
              <CreditCard className="w-4 h-4 text-emerald-500" />
              <span>Account Identifier</span>
            </div>
            <div className="text-right">
              {details.merchantIdentifier ? (
                <span className="font-mono font-medium text-xs text-slate-800 dark:text-zinc-200 bg-slate-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                  {details.merchantIdentifier}
                </span>
              ) : (
                <span className="text-xs italic text-slate-400 dark:text-zinc-500">
                  {NOT_AVAILABLE}
                </span>
              )}
            </div>
          </div>

          {/* Payment Network */}
          <div className="py-3 flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-400 text-xs">
              <Layers className="w-4 h-4 text-emerald-500" />
              <span>Payment Network</span>
            </div>
            <div className="text-right">
              <span className="font-semibold text-xs text-slate-900 dark:text-zinc-100">
                {details.paymentNetwork || NOT_AVAILABLE}
              </span>
            </div>
          </div>

          {/* Encoded Amount */}
          <div className="py-3 flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-400 text-xs">
              <Banknote className="w-4 h-4 text-emerald-500" />
              <span>Encoded Amount</span>
            </div>
            <div className="text-right">
              {details.encodedAmount !== undefined ? (
                <span className="font-bold text-sm text-emerald-600 dark:text-emerald-400">
                  NPR {details.encodedAmount.toFixed(2)}
                </span>
              ) : (
                <span className="text-xs italic text-slate-400 dark:text-zinc-500">
                  Not encoded in QR (Editable in next step)
                </span>
              )}
            </div>
          </div>

          {/* Currency */}
          <div className="py-3 flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-400 text-xs">
              <Globe className="w-4 h-4 text-emerald-500" />
              <span>Currency</span>
            </div>
            <div className="text-right font-medium text-xs text-slate-800 dark:text-zinc-200">
              {details.currency || "NPR (Nepalese Rupee)"}
            </div>
          </div>

          {/* Merchant Category */}
          {details.merchantCategory && (
            <div className="py-3 flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-400 text-xs">
                <Tag className="w-4 h-4 text-emerald-500" />
                <span>Category (MCC)</span>
              </div>
              <div className="text-right font-medium text-xs text-slate-800 dark:text-zinc-200">
                {details.merchantCategory}
              </div>
            </div>
          )}

          {/* Location / City */}
          {details.merchantCity && (
            <div className="py-3 flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-400 text-xs">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span>Merchant City</span>
              </div>
              <div className="text-right font-medium text-xs text-slate-800 dark:text-zinc-200">
                {details.merchantCity}
              </div>
            </div>
          )}

          {/* Reference / Invoice */}
          {details.reference && (
            <div className="py-3 last:pb-0 flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-400 text-xs">
                <FileText className="w-4 h-4 text-emerald-500" />
                <span>Reference / Bill</span>
              </div>
              <div className="text-right font-mono font-medium text-xs text-slate-800 dark:text-zinc-200">
                {details.reference}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Warnings if unknown format */}
      {details.warnings && details.warnings.length > 0 && (
        <div className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-300 text-xs space-y-1">
          <div className="font-semibold flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Format Notice</span>
          </div>
          {details.warnings.map((w, idx) => (
            <p key={idx} className="leading-relaxed">
              {w}
            </p>
          ))}
        </div>
      )}

      {/* Collapsible Technical Details (Raw TLV / Payload) */}
      <RawPayloadViewer
        rawPayload={details.rawPayload}
        parsedTags={details.parsedTags}
        extraFields={details.extraFields}
      />

      {/* Primary Actions */}
      <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
        <button
          onClick={onScanAgain}
          className="flex-1 py-3 px-4 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-zinc-800 transition"
        >
          Scan Another QR
        </button>

        <button
          onClick={onContinue}
          className="flex-[2] py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 active:scale-[0.99] transition"
        >
          Continue to Payment Details →
        </button>
      </div>
    </div>
  );
}
