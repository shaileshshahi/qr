"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Ban,
  ArrowLeft,
  ShieldAlert,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { Provider } from "@/types/provider";
import { ScannedQrDetails } from "@/types/qr";
import { PaymentFormData, SimulationOutcome } from "@/types/transaction";
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

    setTimeout(() => {
      setIsProcessing(false);
      setProcessingAction(null);
      onSimulate(outcome);
    }, 600);
  };

  const renderLayout = () => {
    const commonProps = {
      provider,
      qrDetails,
      formData,
      onPay: () => handleSimulateClick("success"),
      isProcessing: isProcessing && processingAction === "success",
    };

    switch (provider.layoutVariant) {
      case "esewa":
        return <EsewaLayout {...commonProps} />;
      case "khalti":
        return <KhaltiLayout {...commonProps} />;
      case "fonepay":
        return <FonepayLayout {...commonProps} />;
      case "global-ime":
        return <GlobalImeLayout {...commonProps} />;
      default:
        return <GenericProviderLayout {...commonProps} />;
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Top Switcher Navigation */}
      <div className="flex items-center justify-between text-xs">
        <button
          type="button"
          onClick={onChangeProvider}
          className="inline-flex items-center gap-1.5 text-slate-600 dark:text-zinc-400 hover:text-emerald-600 font-bold transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Switch Provider</span>
        </button>

        <span className="text-[11px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
          {provider.name} Checkout
        </span>
      </div>

      {/* Realistic Provider Card */}
      {renderLayout()}

      {/* Simulator Options (Subtle & Clean) */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-zinc-400 font-medium">
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Test Failure State:</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleSimulateClick("failed")}
            disabled={isProcessing}
            className="px-3 py-1.5 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold transition cursor-pointer"
          >
            Simulate Fail
          </button>

          <button
            type="button"
            onClick={() => handleSimulateClick("cancelled")}
            disabled={isProcessing}
            className="px-3 py-1.5 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-zinc-800 text-xs font-semibold transition cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Mandatory Sandbox Safety Note */}
      <p className="text-center text-[11px] text-slate-400 dark:text-zinc-500 font-medium tracking-wide uppercase">
        SIMULATION — NOT A REAL PAYMENT • NO REAL MONEY TRANSFERRED
      </p>
    </div>
  );
}
