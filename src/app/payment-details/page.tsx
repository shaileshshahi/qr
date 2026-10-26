"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldAlert } from "lucide-react";
import { useSimulation } from "@/context/simulation-context";
import { MerchantSummary } from "@/components/payment/merchant-summary";
import { AmountInput } from "@/components/payment/amount-input";
import { PurposeSelector } from "@/components/payment/purpose-selector";
import { RemarksInput } from "@/components/payment/remarks-input";
import { DemoBanner } from "@/components/layout/demo-banner";

export default function PaymentDetailsPage() {
  const router = useRouter();
  const { scannedQr, paymentForm, updatePaymentForm } = useSimulation();

  const isAmountValid =
    paymentForm.amount !== null &&
    paymentForm.amount !== undefined &&
    paymentForm.amount > 0;

  const handleContinue = () => {
    if (!isAmountValid) return;
    router.push("/review");
  };

  return (
    <div className="space-y-4">
      {/* Simulation Banner */}
      <DemoBanner variant="card" />

      {/* Top back navigation */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => router.push("/qr-details")}
          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-zinc-50">
            Step 2: Payment Details
          </h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Enter amount, select purpose, and add optional remarks
          </p>
        </div>
      </div>

      {/* Merchant Summary Card */}
      {scannedQr && (
        <MerchantSummary
          qrDetails={scannedQr}
          onBackToQrDetails={() => router.push("/qr-details")}
        />
      )}

      {/* Amount Input */}
      <AmountInput
        amount={paymentForm.amount}
        encodedAmount={scannedQr?.encodedAmount}
        encodedAmountPrefilled={paymentForm.encodedAmountPrefilled}
        onChange={(newAmount) => updatePaymentForm({ amount: newAmount })}
      />

      {/* Purpose Selector */}
      <PurposeSelector
        selectedPurpose={paymentForm.purpose}
        customPurpose={paymentForm.customPurpose}
        onSelectPurpose={(purpose) => updatePaymentForm({ purpose })}
        onChangeCustomPurpose={(customPurpose) =>
          updatePaymentForm({ customPurpose })
        }
      />

      {/* Remarks Input */}
      <RemarksInput
        remarks={paymentForm.remarks}
        onChange={(remarks) => updatePaymentForm({ remarks })}
      />

      {/* Navigation Buttons */}
      <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
        <button
          type="button"
          onClick={() => router.push("/qr-details")}
          className="flex-1 py-3 px-4 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-zinc-800 transition"
        >
          Back to QR Details
        </button>

        <button
          type="button"
          disabled={!isAmountValid}
          onClick={handleContinue}
          className="flex-[2] py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 active:scale-[0.99] transition disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-1.5"
        >
          <span>Continue to Review</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
