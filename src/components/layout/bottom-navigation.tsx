"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { QrCode, Clock, Settings, Sparkles } from "lucide-react";
import { useSimulation } from "@/context/simulation-context";

export function BottomNavigation() {
  const pathname = usePathname();
  const { transactions } = useSimulation();

  const isScanActive =
    pathname === "/" ||
    pathname === "/scan" ||
    pathname === "/qr-details" ||
    pathname === "/payment-details" ||
    pathname === "/review" ||
    pathname === "/providers" ||
    pathname === "/payment-ui" ||
    pathname === "/result";

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-t border-slate-200/80 dark:border-zinc-800/80 pb-safe shadow-lg">
      <div className="flex items-center justify-around h-16 px-4">
        {/* Scan */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors relative ${
            isScanActive
              ? "text-emerald-600 dark:text-emerald-400 font-semibold"
              : "text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200"
          }`}
        >
          <div
            className={`p-1 rounded-xl transition-all ${
              isScanActive
                ? "bg-emerald-500/10 scale-105"
                : ""
            }`}
          >
            <QrCode className="w-5 h-5" />
          </div>
          <span className="text-[11px] mt-0.5">Scan</span>
          {isScanActive && (
            <span className="absolute bottom-1 w-1 h-1 rounded-full bg-emerald-600 dark:bg-emerald-400" />
          )}
        </Link>

        {/* History */}
        <Link
          href="/history"
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors relative ${
            pathname === "/history"
              ? "text-emerald-600 dark:text-emerald-400 font-semibold"
              : "text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200"
          }`}
        >
          <div
            className={`p-1 rounded-xl transition-all relative ${
              pathname === "/history"
                ? "bg-emerald-500/10 scale-105"
                : ""
            }`}
          >
            <Clock className="w-5 h-5" />
            {transactions.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full min-w-4 text-center">
                {transactions.length}
              </span>
            )}
          </div>
          <span className="text-[11px] mt-0.5">History</span>
          {pathname === "/history" && (
            <span className="absolute bottom-1 w-1 h-1 rounded-full bg-emerald-600 dark:bg-emerald-400" />
          )}
        </Link>

        {/* Settings */}
        <Link
          href="/settings"
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors relative ${
            pathname === "/settings"
              ? "text-emerald-600 dark:text-emerald-400 font-semibold"
              : "text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200"
          }`}
        >
          <div
            className={`p-1 rounded-xl transition-all ${
              pathname === "/settings"
                ? "bg-emerald-500/10 scale-105"
                : ""
            }`}
          >
            <Settings className="w-5 h-5" />
          </div>
          <span className="text-[11px] mt-0.5">Settings</span>
          {pathname === "/settings" && (
            <span className="absolute bottom-1 w-1 h-1 rounded-full bg-emerald-600 dark:bg-emerald-400" />
          )}
        </Link>
      </div>
    </nav>
  );
}
