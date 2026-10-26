"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useSimulation } from "@/context/simulation-context";
import { ProviderPaymentPreview } from "@/components/providers/provider-payment-preview";
import { SimulationOutcome } from "@/types/transaction";
import { parseQrPayload } from "@/lib/qr/parser";
import { SAMPLE_QR_LIST } from "@/lib/qr/samples";

export default function PaymentUiPage() {
  const router = useRouter();
  const {
    scannedQr,
    paymentForm,
    selectedProvider,
    executeSimulation,
    setScannedQr,
  } = useSimulation();

  useEffect(() => {
    if (!scannedQr) {
      const sample = SAMPLE_QR_LIST[0];
      const decoded = parseQrPayload(sample.payload);
      setScannedQr(decoded);
    }
  }, [scannedQr, setScannedQr]);

  if (!scannedQr) return null;

  const handleSimulate = (outcome: SimulationOutcome, failureReason?: string) => {
    executeSimulation(outcome, failureReason);
    router.push("/result");
  };

  return (
    <div className="space-y-4">
      {/* Top back navigation */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => router.push("/payment-details")}
          className="p-1.5 rounded-xl text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-slate-100 dark:hover:bg-zinc-800 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
            Confirm Payment
          </h1>
          <p className="text-[11px] text-slate-500 dark:text-zinc-400">
            {selectedProvider.name} Payment Checkout
          </p>
        </div>
      </div>

      <ProviderPaymentPreview
        provider={selectedProvider}
        qrDetails={scannedQr}
        formData={paymentForm}
        onSimulate={handleSimulate}
        onChangeProvider={() => router.push("/providers")}
        onBackToReview={() => router.push("/review")}
      />
    </div>
  );
}
