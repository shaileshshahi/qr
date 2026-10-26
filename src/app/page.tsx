"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Camera,
  Upload,
  Sparkles,
  ArrowRight,
  Clock,
  Layers,
  Store,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { useSimulation } from "@/context/simulation-context";
import { parseQrPayload } from "@/lib/qr/parser";
import { CameraScanner } from "@/components/scanner/camera-scanner";
import { ImageUploader } from "@/components/scanner/image-uploader";
import { SampleQrPicker } from "@/components/scanner/sample-qr-picker";
import { PROVIDERS_REGISTRY } from "@/lib/providers/registry";

export default function HomePage() {
  const router = useRouter();
  const { setScannedQr, transactions, setSelectedProvider } = useSimulation();

  const [scannerMode, setScannerMode] = useState<"camera" | "upload">("camera");
  const [isCameraActive, setIsCameraActive] = useState(false);

  const handleScanSuccess = (payload: string) => {
    const decoded = parseQrPayload(payload);
    setScannedQr(decoded);
    router.push("/payment-details");
  };

  return (
    <div className="space-y-5">
      {/* Top Scanner Card - Native App Viewfinder Style */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden p-4 sm:p-5 space-y-4">
        {/* Scanner View Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 dark:text-zinc-50">
              Scan &amp; Pay
            </h1>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400">
              Align any Nepal merchant QR within the frame
            </p>
          </div>

          <div className="flex rounded-xl bg-slate-100 dark:bg-zinc-800 p-0.5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setScannerMode("camera");
                setIsCameraActive(true);
              }}
              className={`px-3 py-1 rounded-lg transition ${
                scannerMode === "camera"
                  ? "bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 shadow-xs"
                  : "text-slate-500 hover:text-slate-900 dark:text-zinc-400"
              }`}
            >
              Camera
            </button>
            <button
              type="button"
              onClick={() => {
                setScannerMode("upload");
                setIsCameraActive(false);
              }}
              className={`px-3 py-1 rounded-lg transition ${
                scannerMode === "upload"
                  ? "bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 shadow-xs"
                  : "text-slate-500 hover:text-slate-900 dark:text-zinc-400"
              }`}
            >
              Gallery
            </button>
          </div>
        </div>

        {/* Viewfinder or Image Upload */}
        {scannerMode === "camera" ? (
          <div className="space-y-3">
            {isCameraActive ? (
              <div className="space-y-2">
                <CameraScanner
                  isActive={isCameraActive}
                  onScanSuccess={handleScanSuccess}
                  onClose={() => setIsCameraActive(false)}
                />
                <button
                  type="button"
                  onClick={() => setIsCameraActive(false)}
                  className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-rose-600 dark:text-zinc-400 dark:hover:text-rose-400 transition"
                >
                  Close Camera
                </button>
              </div>
            ) : (
              <div
                onClick={() => setIsCameraActive(true)}
                className="relative w-full aspect-[4/3] rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col items-center justify-center text-center p-6 cursor-pointer group shadow-inner overflow-hidden"
              >
                {/* Visual Viewfinder Corners */}
                <div className="absolute top-4 left-4 w-7 h-7 border-t-3 border-l-3 border-emerald-500 rounded-tl-lg" />
                <div className="absolute top-4 right-4 w-7 h-7 border-t-3 border-r-3 border-emerald-500 rounded-tr-lg" />
                <div className="absolute bottom-4 left-4 w-7 h-7 border-b-3 border-l-3 border-emerald-500 rounded-bl-lg" />
                <div className="absolute bottom-4 right-4 w-7 h-7 border-b-3 border-r-3 border-emerald-500 rounded-br-lg" />

                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Camera className="w-7 h-7" />
                </div>
                <h3 className="text-white font-bold text-sm tracking-tight">
                  Tap to Start Camera
                </h3>
                <p className="text-zinc-400 text-[11px] max-w-xs mt-0.5">
                  Point at Fonepay, NEPALPAY, or any merchant QR code
                </p>

                <span className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition">
                  <Camera className="w-3.5 h-3.5" /> Start Scanner
                </span>
              </div>
            )}
          </div>
        ) : (
          <ImageUploader onScanSuccess={handleScanSuccess} />
        )}
      </div>

      {/* Preset Merchant QRs - Sleek 1-Tap Simulation */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-4 sm:p-5 space-y-3">
        <SampleQrPicker onSelectSample={handleScanSuccess} />
      </div>

      {/* Supported Payment Channels */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-zinc-300">
              Payment Providers ({PROVIDERS_REGISTRY.length})
            </h3>
          </div>
          <Link
            href="/providers"
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-0.5"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {PROVIDERS_REGISTRY.slice(0, 6).map((p) => (
            <Link
              key={p.id}
              href="/providers"
              onClick={() => setSelectedProvider(p)}
              className="p-2.5 rounded-xl border border-slate-100 dark:border-zinc-800/80 hover:border-emerald-500/40 bg-slate-50/50 dark:bg-zinc-800/40 flex flex-col items-center justify-center text-center transition group"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs text-white shadow-xs group-hover:scale-105 transition-transform"
                style={{ backgroundColor: p.primaryColor }}
              >
                {p.code.slice(0, 3)}
              </div>
              <span className="text-[10px] font-bold text-slate-800 dark:text-zinc-200 truncate w-full mt-1.5">
                {p.name.split(" ")[0]}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent History if available */}
      {transactions.length > 0 && (
        <div className="rounded-3xl border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-zinc-300">
                Recent Demo Payments
              </h3>
            </div>
            <Link
              href="/history"
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-0.5"
            >
              <span>History</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-zinc-800 text-xs">
            {transactions.slice(0, 3).map((tx) => (
              <Link
                key={tx.id}
                href="/history"
                className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3 hover:opacity-80 transition"
              >
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 dark:text-zinc-100 truncate">
                    {tx.qrDetails.merchantName || "Merchant Unspecified"}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                    {tx.providerName} • {tx.purposeLabel}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-extrabold text-slate-900 dark:text-zinc-100">
                    Rs. {tx.amount.toFixed(2)}
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider ${
                      tx.outcome === "success"
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-rose-600"
                    }`}
                  >
                    {tx.outcome}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
