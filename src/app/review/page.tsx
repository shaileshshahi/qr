"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useSimulation } from "@/context/simulation-context";
import { PaymentReview } from "@/components/payment/payment-review";
import { parseQrPayload } from "@/lib/qr/parser";
import { SAMPLE_QR_LIST } from "@/lib/qr/samples";

export default function ReviewPage() {
  const router = useRouter();
  const { scannedQr, paymentForm, setScannedQr } = useSimulation();

  useEffect(() => {
    if (!scannedQr) {
      const sample = SAMPLE_QR_LIST[0];
      const decoded = parseQrPayload(sample.payload);
      setScannedQr(decoded);
    }
  }, [scannedQr, setScannedQr]);

  if (!scannedQr) return null;

  return (
    <div className="space-y-4">
      {/* Top back navigation */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => router.push("/payment-details")}
          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-zinc-50">
            Step 3: Review Payment
          </h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Confirm simulation transfer details before selecting provider
          </p>
        </div>
      </div>

      <PaymentReview
        qrDetails={scannedQr}
        formData={paymentForm}
        onEditDetails={() => router.push("/payment-details")}
        onContinueToProviders={() => router.push("/providers")}
      />
    </div>
  );
}
