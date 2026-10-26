"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { QrCode, RotateCcw, Clock, Settings, Sparkles } from "lucide-react";
import { useSimulation } from "@/context/simulation-context";

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { transactions, resetCurrentSimulation, scannedQr } = useSimulation();

  const handleReset = () => {
    resetCurrentSimulation();
    router.push("/scan");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group transition-transform active:scale-95"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-600 p-0.5 shadow-sm shadow-emerald-500/20 flex items-center justify-center text-white">
            <QrCode className="w-5 h-5 transition-transform group-hover:rotate-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base tracking-tight text-slate-900 dark:text-zinc-50">
                QR Demo Nepal
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Simulator
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-zinc-400 hidden xs:block">
              Mobile-first QR & Payment Flow Prototyper
            </p>
          </div>
        </Link>

        {/* Desktop Nav & Quick Actions */}
        <div className="flex items-center gap-2">
          {scannedQr && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition"
              title="Start a new QR scan"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Scan</span>
            </button>
          )}

          {/* History link with badge */}
          <Link
            href="/history"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition ${
              pathname === "/history"
                ? "bg-slate-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm"
                : "text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">History</span>
            {transactions.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-emerald-600 text-white">
                {transactions.length}
              </span>
            )}
          </Link>

          {/* Settings link */}
          <Link
            href="/settings"
            className={`p-2 rounded-lg text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition ${
              pathname === "/settings"
                ? "bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-zinc-50"
                : ""
            }`}
            title="Settings & Guide"
          >
            <Settings className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
