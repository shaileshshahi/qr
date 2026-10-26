"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Ban,
  ArrowLeft,
  ShieldAlert,
  Loader2,
} from "lucide-react";
import { Provider } from "@/types/provider";
import { ScannedQrDetails } from "@/types/qr";
import { PaymentFormData, SimulationOutcome } from "@/types/transaction";
import { DemoBanner } from "../layout/demo-banner";
import { EsewaLayout } from "./layouts/esewa-layout";
import { KhaltiLayout } from "./layouts/khalti-layout";
import { FonepayLayout } from "./layouts/fonepay-layout";
import { GlobalImeLayout } from "./layouts/global-ime-layout";
import { GenericProviderLayout } from "./layouts/generic-layout";

interface ProviderPaymentPreviewProps {
  provider: Provider;
  qrDetails: ScannedQrDetails;
  formData: PaymentFormData;
  onSimulate: (outcome: SimulationOutcome, failureReason?: string) => void;
  onChangeProvider: () => void;
  onBackToReview: () => void;
}

export function ProviderPaymentPreview({
  provider,
  qrDetails,
  formData,
  onSimulate,
  onChangeProvider,
  onBackToReview,
}: ProviderPaymentPreviewProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingAction, setProcessingAction] = useState<string | null>(null);

  const handleSimulateClick = (outcome: SimulationOutcome) => {
    setIsProcessing(true);
    setProcessingAction(outcome);

    // Brief simulated loading delay for realistic feel
    setTimeout(() => {
      setIsProcessing(false);
      setProcessingAction(null);
      onSimulate(outcome);
    }, 600);
  };

  const renderLayout = () => {
    switch (provider.layoutVariant) {
      case "esewa":
        return (
          <EsewaLayout
            provider={provider}
            qrDetails={qrDetails}
            formData={formData}
          />
        );
      case "khalti":
        return (
          <KhaltiLayout
            provider={provider}
            qrDetails={qrDetails}
            formData={formData}
          />
        );
      case "fonepay":
        return (
          <FonepayLayout
            provider={provider}
            qrDetails={qrDetails}
            formData={formData}
          />
        );
      case "global-ime":
        return (
          <GlobalImeLayout
            provider={provider}
            qrDetails={qrDetails}
            formData={formData}
          />
        );
      default:
        return (
          <GenericProviderLayout
            provider={provider}
            qrDetails={qrDetails}
            formData={formData}
          />
        );
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Simulation Banner Notice */}
      <DemoBanner variant="card" />

      {/* Provider Switcher Header */}
      <div className="flex items-center justify-between text-xs">
        <button
          onClick={onChangeProvider}
          className="inline-flex items-center gap-1.5 text-slate-600 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-semibold transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Change Provider ({provider.name})</span>
        </button>

        <button
          onClick={onBackToReview}
          className="text-slate-500 dark:text-zinc-400 hover:underline"
        >
          Review Data
        </button>
      </div>

      {/* The Provider-Inspired Visual Card */}
      {renderLayout()}

      {/* Simulator Control Panel */}
      <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300">
            Preview Simulation Outcome
          </span>
          <span className="text-[11px] text-slate-400 dark:text-zinc-500">
            Select test state
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {/* Simulate Success */}
          <button
            onClick={() => handleSimulateClick("success")}
            disabled={isProcessing}
            className="py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-emerald-600/20 active:scale-[0.98] transition flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isProcessing && processingAction === "success" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <CheckCircle2 className="w-4 h-4" />
            )}
            <span>Simulate Success</span>
          </button>

          {/* Simulate Failure */}
          <button
            onClick={() => handleSimulateClick("failed")}
            disabled={isProcessing}
            className="py-3 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-rose-600/20 active:scale-[0.98] transition flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isProcessing && processingAction === "failed" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <XCircle className="w-4 h-4" />
            )}
            <span>Simulate Failure</span>
          </button>

          {/* Simulate Cancel */}
          <button
            onClick={() => handleSimulateClick("cancelled")}
            disabled={isProcessing}
            className="py-3 px-3 rounded-xl border border-slate-300 dark:border-zinc-700 bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 font-semibold text-xs sm:text-sm active:scale-[0.98] transition flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isProcessing && processingAction === "cancelled" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Ban className="w-4 h-4" />
            )}
            <span>Simulate Cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
}
