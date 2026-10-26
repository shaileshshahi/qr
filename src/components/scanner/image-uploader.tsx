"use client";

import React, { useState, useRef } from "react";
import { Upload, ImageIcon, AlertCircle, Loader2 } from "lucide-react";
import { decodeQrFromImageFile } from "@/lib/qr/decoder";

interface ImageUploaderProps {
  onScanSuccess: (payload: string) => void;
}

export function ImageUploader({ onScanSuccess }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDecoding, setIsDecoding] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file (PNG, JPG, WEBP).");
      return;
    }

    setIsDecoding(true);
    setErrorMessage(null);

    try {
      const decodedPayload = await decodeQrFromImageFile(file);
      setIsDecoding(false);
      onScanSuccess(decodedPayload);
    } catch (err: unknown) {
      setIsDecoding(false);
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to read QR code from this image.";
      setErrorMessage(msg);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
    // reset input so the same file can be re-uploaded if desired
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`w-full border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
          isDragOver
            ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20"
            : "border-slate-300 dark:border-zinc-700 hover:border-emerald-500/60 hover:bg-slate-50 dark:hover:bg-zinc-900/50"
        } ${isDecoding ? "pointer-events-none opacity-75" : ""}`}
      >
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            {isDecoding ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Upload className="w-6 h-6" />
            )}
          </div>

          <div>
            <p className="font-semibold text-sm text-slate-800 dark:text-zinc-200">
              {isDecoding ? "Decoding QR Code..." : "Upload or Drop QR Image"}
            </p>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
              Select screenshot or photo of merchant QR from your gallery
            </p>
          </div>

          <span className="text-[11px] font-medium px-3 py-1 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300">
            Supports PNG, JPG, WEBP, SVG
          </span>
        </div>
      </div>

      {/* Error feedback */}
      {errorMessage && (
        <div className="mt-3 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-400 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
          <div className="flex-1">
            <span className="font-semibold block">QR Decode Issue</span>
            <span>{errorMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
