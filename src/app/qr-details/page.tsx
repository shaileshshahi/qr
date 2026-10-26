"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, QrCode } from "lucide-react";
import { useSimulation } from "@/context/simulation-context";
import { QrDetailsCard } from "@/components/qr/qr-details-card";
import { parseQrPayload } from "@/lib/qr/parser";
import { SAMPLE_QR_LIST } from "@/lib/qr/samples";

export default function QrDetailsPage() {
  const router = useRouter();
  const { scannedQr, setScannedQr } = useSimulation();

  // If user lands here with no scanned QR, fallback to loading the first sample QR for seamless demo
  useEffect(() => {
    if (!scannedQr) {
      const sample = SAMPLE_QR_LIST[0];
      const decoded = parseQrPayload(sample.payload);
      setScannedQr(decoded);
    }
  }, [scannedQr, setScannedQr]);

  if (!scannedQr) {
    return (
      <div className="p-8 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
          <QrCode className="w-6 h-6 animate-pulse" />
        </div>
        <p className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
          Loading scanned QR details...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Top back navigation */}
      <div className="flex items-center gap-2">
        <Link
          href="/scan"
          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-zinc-50">
            Step 1: Scanned QR Details
          </h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Decoded payload fields &amp; merchant metadata
          </p>
        </div>
      </div>

      <QrDetailsCard
        details={scannedQr}
        onContinue={() => router.push("/payment-details")}
        onScanAgain={() => router.push("/scan")}
      />
    </div>
  );
}
