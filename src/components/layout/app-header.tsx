"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { QrCode, Clock, Settings, RotateCcw } from "lucide-react";
import { useSimulation } from "@/context/simulation-context";

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { transactions, resetCurrentSimulation, scannedQr } = useSimulation();

  const handleReset = () => {
    resetCurrentSimulation();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/60 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md">
      <div className="max-w-xl mx-auto px-4 h-13 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 group transition-transform active:scale-95"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-sm shadow-emerald-600/30">
            <QrCode className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 dark:text-white">
              QR Demo Nepal
            </span>
            <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              Demo
            </span>
          </div>
        </Link>

        {/* Header Right Actions */}
        <div className="flex items-center gap-1">
          {scannedQr && (
            <button
              type="button"
              onClick={handleReset}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-slate-100 dark:hover:bg-zinc-800 transition text-xs font-semibold flex items-center gap-1"
              title="New Scan"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">New</span>
            </button>
          )}

          <Link
            href="/history"
            className={`p-2 rounded-lg text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition relative ${
              pathname === "/history" ? "text-emerald-600 dark:text-emerald-400" : ""
            }`}
            title="History"
          >
            <Clock className="w-4 h-4" />
            {transactions.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-600" />
            )}
          </Link>

          <Link
            href="/settings"
            className={`p-2 rounded-lg text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition ${
              pathname === "/settings" ? "text-emerald-600 dark:text-emerald-400" : ""
            }`}
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
