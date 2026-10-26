"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronRight, Layers, ShieldCheck, Check } from "lucide-react";
import { useSimulation } from "@/context/simulation-context";
import { MerchantSummary } from "@/components/payment/merchant-summary";
import { AmountInput } from "@/components/payment/amount-input";
import { PurposeSelector } from "@/components/payment/purpose-selector";
import { RemarksInput } from "@/components/payment/remarks-input";
import { PROVIDERS_REGISTRY } from "@/lib/providers/registry";
import { SAMPLE_QR_LIST } from "@/lib/qr/samples";
import { parseQrPayload } from "@/lib/qr/parser";

export default function PaymentDetailsPage() {
  const router = useRouter();
  const {
    scannedQr,
    setScannedQr,
    paymentForm,
    updatePaymentForm,
    selectedProvider,
    setSelectedProvider,
  } = useSimulation();

  // If user lands here with no scanned QR, fallback to loading the first sample QR for seamless demo
  useEffect(() => {
    if (!scannedQr) {
      const sample = SAMPLE_QR_LIST[0];
      const decoded = parseQrPayload(sample.payload);
      setScannedQr(decoded);
    }
  }, [scannedQr, setScannedQr]);

  const isAmountValid =
    paymentForm.amount !== null &&
    paymentForm.amount !== undefined &&
    paymentForm.amount > 0;

  const handlePayNow = () => {
    if (!isAmountValid) return;
    router.push("/payment-ui");
  };

  return (
    <div className="space-y-4">
      {/* Top back navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="p-1.5 rounded-xl text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-slate-100 dark:hover:bg-zinc-800 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
              Pay Merchant
            </h1>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400">
              Enter amount and confirm payment
            </p>
          </div>
        </div>

        <Link
          href="/review"
          className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          Review Summary
        </Link>
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

      {/* Quick Payment Method Selector */}
      <div className="p-5 rounded-3xl border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            <span>Pay With</span>
          </label>
          <Link
            href="/providers"
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-0.5"
          >
            <span>All ({PROVIDERS_REGISTRY.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Selected Provider Highlight + Quick Chips */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {PROVIDERS_REGISTRY.slice(0, 6).map((p) => {
            const isSelected = selectedProvider.id === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedProvider(p)}
                className={`p-2.5 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1.5 active:scale-95 cursor-pointer relative ${
                  isSelected
                    ? "border-emerald-500 bg-emerald-500/10 shadow-xs"
                    : "border-slate-200/80 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-800/40 hover:border-slate-300"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                )}
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-[11px] text-white shadow-xs"
                  style={{ backgroundColor: p.primaryColor }}
                >
                  {p.code.slice(0, 3)}
                </div>
                <span className="text-[10px] font-bold text-slate-800 dark:text-zinc-200 truncate w-full">
                  {p.name.split(" ")[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

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

      {/* Primary Action Button */}
      <div className="pt-2 space-y-2">
        <button
          type="button"
          disabled={!isAmountValid}
          onClick={handlePayNow}
          className="w-full py-4 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-600/30 transition disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
        >
          <span>
            {isAmountValid
              ? `Proceed to Pay NPR ${paymentForm.amount?.toFixed(2)} via ${selectedProvider.name.split(" ")[0]}`
              : "Enter an Amount to Pay"}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-[11px] text-center text-slate-400 dark:text-zinc-500 font-medium">
          Simulated transaction in sandbox environment • No real money charged
        </p>
      </div>
    </div>
  );
}
