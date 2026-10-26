"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  Camera,
  CameraOff,
  RefreshCw,
  AlertCircle,
  Zap,
  ZapOff,
  SwitchCamera,
  ShieldAlert,
} from "lucide-react";
import { decodeVideoFrame } from "@/lib/qr/decoder";

interface CameraScannerProps {
  onScanSuccess: (payload: string) => void;
  isActive: boolean;
  onClose?: () => void;
}

export function CameraScanner({
  onScanSuccess,
  isActive,
  onClose,
}: CameraScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameId = useRef<number | null>(null);

  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");
  const [hasTorch, setHasTorch] = useState(false);
  const [torchOn, setTorchOn] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);

  // Stop camera helper
  const stopCamera = useCallback(() => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, []);

  // Frame scanning loop
  const scanLoop = useCallback(() => {
    if (hasScanned) return;

    if (videoRef.current && canvasRef.current) {
      const code = decodeVideoFrame(videoRef.current, canvasRef.current);
      if (code && code.trim().length > 0) {
        setHasScanned(true);
        stopCamera();
        // Trigger haptic if supported
        if (typeof navigator !== "undefined" && navigator.vibrate) {
          try {
            navigator.vibrate(50);
          } catch {
            // ignore
          }
        }
        onScanSuccess(code);
        return;
      }
    }

    animationFrameId.current = requestAnimationFrame(scanLoop);
  }, [hasScanned, onScanSuccess, stopCamera]);

  // Start camera
  const startCamera = useCallback(async () => {
    stopCamera();
    setCameraError(null);
    setIsInitializing(true);
    setHasScanned(false);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error(
          "Camera access is not supported by your browser. Please upload a QR image or use a modern browser."
        );
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", "true");
        await videoRef.current.play();

        // Check torch support
        const track = stream.getVideoTracks()[0];
        if (track) {
          const capabilities = (track.getCapabilities?.() as unknown) as {
            torch?: boolean;
          };
          if (capabilities && capabilities.torch) {
            setHasTorch(true);
          }
        }

        setIsInitializing(false);
        animationFrameId.current = requestAnimationFrame(scanLoop);
      }
    } catch (err: unknown) {
      setIsInitializing(false);
      let message = "Could not start camera.";
      if (err instanceof DOMException) {
        if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
          message =
            "Camera permission was denied. Please allow camera permissions in your browser address bar or use image upload below.";
        } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
          message = "No camera hardware detected on this device.";
        } else if (err.name === "NotReadableError") {
          message = "Camera is already in use by another application.";
        } else {
          message = err.message;
        }
      } else if (err instanceof Error) {
        message = err.message;
      }
      setCameraError(message);
    }
  }, [facingMode, scanLoop, stopCamera]);

  // Toggle torch
  const toggleTorch = async () => {
    if (!streamRef.current) return;
    const track = streamRef.current.getVideoTracks()[0];
    if (track) {
      try {
        const next = !torchOn;
        await (track as unknown as { applyConstraints: (c: unknown) => Promise<void> }).applyConstraints({
          advanced: [{ torch: next }],
        });
        setTorchOn(next);
      } catch (e) {
        console.warn("Torch failed", e);
      }
    }
  };

  // Flip camera
  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
  };

  // Lifecycle
  useEffect(() => {
    if (isActive) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isActive, facingMode, startCamera, stopCamera]);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-zinc-950 aspect-[4/3] sm:aspect-video flex items-center justify-center border border-zinc-800 shadow-xl">
      {/* Hidden processing canvas */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Video element */}
      <video
        ref={videoRef}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isInitializing || cameraError ? "opacity-0" : "opacity-100"
        }`}
        muted
        playsInline
      />

      {/* Viewfinder Overlay with Animated Scanning Line */}
      {!cameraError && !isInitializing && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {/* Dark backdrop with cutout */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72">
            {/* Viewfinder Corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-emerald-400 rounded-tl-xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-emerald-400 rounded-tr-xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-emerald-400 rounded-bl-xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-emerald-400 rounded-br-xl" />

            {/* Pulsing Target Reticle */}
            <div className="absolute inset-2 border border-emerald-500/20 rounded-lg" />

            {/* Animated Laser Scanning Line */}
            <div className="absolute left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#34d399] animate-[scannerBeam_2.4s_easeInOut_infinite]" />
          </div>

          <div className="absolute bottom-4 left-0 right-0 text-center">
            <span className="inline-block bg-black/60 backdrop-blur-md text-zinc-200 text-xs px-3.5 py-1.5 rounded-full border border-white/10 font-medium">
              Point camera at any merchant QR code
            </span>
          </div>
        </div>
      )}

      {/* Controls Overlay (Torch & Flip) */}
      {!cameraError && !isInitializing && (
        <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
          {hasTorch && (
            <button
              onClick={toggleTorch}
              className={`p-2.5 rounded-full backdrop-blur-md transition ${
                torchOn
                  ? "bg-amber-400 text-black shadow-lg shadow-amber-400/30"
                  : "bg-black/50 text-white hover:bg-black/70"
              }`}
              title="Toggle Flashlight"
            >
              {torchOn ? <Zap className="w-4 h-4 fill-current" /> : <ZapOff className="w-4 h-4" />}
            </button>
          )}

          <button
            onClick={toggleFacingMode}
            className="p-2.5 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md transition active:scale-95"
            title="Switch Camera (Front/Rear)"
          >
            <SwitchCamera className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Initializing Spinner */}
      {isInitializing && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-zinc-950 text-zinc-300">
          <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-medium">Requesting camera access...</p>
        </div>
      )}

      {/* Camera Error / Permission Denied State */}
      {cameraError && (
        <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center bg-zinc-950/95 text-zinc-100">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h4 className="font-semibold text-sm mb-1 text-white">Camera Access Notice</h4>
          <p className="text-xs text-zinc-400 max-w-sm mb-4 leading-relaxed">
            {cameraError}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={startCamera}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium shadow-sm transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Try Again
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition"
              >
                Close Camera
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
