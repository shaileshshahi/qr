"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Upload, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSimulation } from "@/context/simulation-context";
import { parseQrPayload } from "@/lib/qr/parser";
import { CameraScanner } from "@/components/scanner/camera-scanner";
import { ImageUploader } from "@/components/scanner/image-uploader";
import { SampleQrPicker } from "@/components/scanner/sample-qr-picker";

export default function ScanPage() {
  const router = useRouter();
  const { setScannedQr } = useSimulation();
  const [activeTab, setActiveTab] = useState<"camera" | "upload" | "samples">("camera");

  const handleScanSuccess = (payload: string) => {
    const decoded = parseQrPayload(payload);
    setScannedQr(decoded);
    router.push("/payment-details");
  };

  return (
    <div className="space-y-4">
      {/* Header */}
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
              Scan Merchant QR
            </h1>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400">
              Camera, gallery upload, or sample presets
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-sm space-y-4">
        <div className="flex rounded-xl bg-slate-100 dark:bg-zinc-800/80 p-1">
          <button
            onClick={() => setActiveTab("camera")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 ${
              activeTab === "camera"
                ? "bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 shadow-sm"
                : "text-slate-600 dark:text-zinc-400 hover:text-slate-900"
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Camera</span>
          </button>

          <button
            onClick={() => setActiveTab("upload")}
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
            onClick={() => setActiveTab("samples")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 ${
              activeTab === "samples"
                ? "bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 shadow-sm"
                : "text-slate-600 dark:text-zinc-400 hover:text-slate-900"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Presets</span>
          </button>
        </div>

        {activeTab === "camera" && (
          <div className="space-y-3">
            <CameraScanner
              isActive={true}
              onScanSuccess={handleScanSuccess}
            />
          </div>
        )}

        {activeTab === "upload" && (
          <ImageUploader onScanSuccess={handleScanSuccess} />
        )}

        {activeTab === "samples" && (
          <SampleQrPicker onSelectSample={handleScanSuccess} />
        )}
      </div>
    </div>
  );
}
