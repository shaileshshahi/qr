"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  QrCode,
  Upload,
  Sparkles,
  Camera,
  ArrowRight,
  ShieldCheck,
  Clock,
  Layers,
  ChevronRight,
  Building2,
  Wallet,
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

  const [activeTab, setActiveTab] = useState<"camera" | "upload" | "samples">("camera");
  const [isCameraActive, setIsCameraActive] = useState(false);

  const handleScanSuccess = (payload: string) => {
    const decoded = parseQrPayload(payload);
    setScannedQr(decoded);
    router.push("/qr-details");
  };

  const handleQuickProviderPreview = (providerId: string) => {
    const prov = PROVIDERS_REGISTRY.find((p) => p.id === providerId);
    if (prov) {
      setSelectedProvider(prov);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 text-white p-6 shadow-xl">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-bold tracking-wider uppercase border border-white/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Interactive Fintech Simulator</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
            QR Demo Nepal
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100 max-w-md leading-relaxed opacity-95">
            Scan genuine merchant QR codes, inspect real decoded EMVCo payloads, and preview provider-inspired payment flows in a secure sandbox.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setActiveTab("camera");
                setIsCameraActive(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs shadow-md hover:bg-emerald-50 transition active:scale-95 inline-flex items-center gap-2"
            >
              <Camera className="w-4 h-4 text-emerald-600" />
              <span>Scan QR Code</span>
            </button>

            <button
              onClick={() => setActiveTab("samples")}
              className="px-4 py-2.5 rounded-xl bg-black/30 hover:bg-black/40 text-white font-semibold text-xs border border-white/20 backdrop-blur-md transition inline-flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Try Presets</span>
            </button>
          </div>
        </div>

        {/* Decorative backdrop elements */}
        <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-emerald-400/10 blur-2xl pointer-events-none" />
        <div className="absolute right-4 top-4 opacity-15 pointer-events-none">
          <QrCode className="w-36 h-36" />
        </div>
      </div>

      {/* Primary Scanner / Tool Selection Tabs */}
      <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-sm space-y-4">
        {/* Navigation Tabs */}
        <div className="flex rounded-xl bg-slate-100 dark:bg-zinc-800/80 p-1">
          <button
            onClick={() => {
              setActiveTab("camera");
              setIsCameraActive(true);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 ${
              activeTab === "camera"
                ? "bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 shadow-sm"
                : "text-slate-600 dark:text-zinc-400 hover:text-slate-900"
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Camera Scanner</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("upload");
              setIsCameraActive(false);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 ${
              activeTab === "upload"
                ? "bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 shadow-sm"
                : "text-slate-600 dark:text-zinc-400 hover:text-slate-900"
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Image</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("samples");
              setIsCameraActive(false);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 ${
              activeTab === "samples"
                ? "bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 shadow-sm"
                : "text-slate-600 dark:text-zinc-400 hover:text-slate-900"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Sample QRs</span>
          </button>
        </div>

        {/* Tab 1: Camera Scanner */}
        {activeTab === "camera" && (
          <div className="space-y-3">
            {isCameraActive ? (
              <div className="space-y-2">
                <CameraScanner
                  isActive={isCameraActive}
                  onScanSuccess={handleScanSuccess}
                  onClose={() => setIsCameraActive(false)}
                />
                <button
                  onClick={() => setIsCameraActive(false)}
                  className="w-full py-2 text-xs font-medium text-slate-500 hover:text-slate-700 dark:text-zinc-400"
                >
                  Stop Camera Stream
                </button>
              </div>
            ) : (
              <div className="p-8 text-center rounded-2xl border-2 border-dashed border-slate-200 dark:border-zinc-800 flex flex-col items-center justify-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Camera className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-zinc-100">
                    Live Camera Scanner
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                    Camera permission is requested only when you start scanning.
                  </p>
                </div>
                <button
                  onClick={() => setIsCameraActive(true)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md shadow-emerald-600/20 transition active:scale-95 inline-flex items-center gap-2"
                >
                  <Camera className="w-4 h-4" /> Start Camera Scanner
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Upload Image */}
        {activeTab === "upload" && (
          <div className="space-y-3">
            <ImageUploader onScanSuccess={handleScanSuccess} />
          </div>
        )}

        {/* Tab 3: Preset Samples */}
        {activeTab === "samples" && (
          <div className="space-y-3">
            <SampleQrPicker onSelectSample={handleScanSuccess} />
          </div>
        )}
      </div>

      {/* Quick Access to Provider Previews */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-zinc-100">
              Supported Payment Interfaces
            </h3>
          </div>
          <Link
            href="/providers"
            className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-semibold inline-flex items-center gap-1"
          >
            <span>All Providers ({PROVIDERS_REGISTRY.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {PROVIDERS_REGISTRY.slice(0, 4).map((p) => (
            <Link
              key={p.id}
              href="/providers"
              onClick={() => handleQuickProviderPreview(p.id)}
              className="p-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-emerald-500/50 hover:shadow-sm transition flex flex-col justify-between text-left group"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-white mb-2"
                style={{ backgroundColor: p.primaryColor }}
              >
                {p.code.slice(0, 3)}
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-zinc-100 group-hover:text-emerald-600 transition-colors">
                  {p.name}
                </h4>
                <p className="text-[10px] text-slate-400 dark:text-zinc-500 capitalize">
                  {p.category.replace("-", " ")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recently Simulated Transactions */}
      {transactions.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-zinc-100">
                Recent Demo Simulations
              </h3>
            </div>
            <Link
              href="/history"
              className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-semibold inline-flex items-center gap-1"
            >
              <span>View All ({transactions.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-2">
            {transactions.slice(0, 3).map((tx) => (
              <Link
                key={tx.id}
                href="/history"
                className="p-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-emerald-500/50 transition flex items-center justify-between gap-3 text-left"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-xs text-slate-900 dark:text-zinc-100 truncate">
                      {tx.qrDetails.merchantName || "Merchant Unspecified"}
                    </h4>
                    <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400">
                      Demo
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">
                    {tx.providerName} • {tx.purposeLabel}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-zinc-100">
                    Rs. {tx.amount.toFixed(2)}
                  </div>
                  <span
                    className={`text-[10px] font-semibold capitalize ${
                      tx.outcome === "success"
                        ? "text-emerald-600 dark:text-emerald-400"
                        : tx.outcome === "failed"
                        ? "text-rose-600"
                        : "text-slate-500"
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
