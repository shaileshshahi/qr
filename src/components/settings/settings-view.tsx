"use client";

import React, { useState } from "react";
import {
  Settings,
  ShieldCheck,
  Moon,
  Sun,
  Camera,
  Trash2,
  Info,
  Lock,
  Smartphone,
  ExternalLink,
  CheckCircle,
} from "lucide-react";
import { useSimulation } from "@/context/simulation-context";
import { PROVIDERS_REGISTRY } from "@/lib/providers/registry";

export function SettingsView() {
  const { settings, updateSettings, clearHistory, transactions } = useSimulation();
  const [clearedNotice, setClearedNotice] = useState(false);

  const handleClear = () => {
    if (confirm("Are you sure you want to clear all local demo transactions?")) {
      clearHistory();
      setClearedNotice(true);
      setTimeout(() => setClearedNotice(false), 3000);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Group 1: Preferences */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Settings className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300">
            Payment Preferences
          </h3>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="font-semibold text-slate-800 dark:text-zinc-200 block mb-1">
              Default Payment Method
            </label>
            <select
              value={settings.defaultProviderId}
              onChange={(e) => updateSettings({ defaultProviderId: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-zinc-100 font-semibold focus:ring-2 focus:ring-emerald-500"
            >
              {PROVIDERS_REGISTRY.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.category.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          <div className="pt-1">
            <label className="font-semibold text-slate-800 dark:text-zinc-200 block mb-1">
              Default Demo Amount (NPR)
            </label>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-400">Rs.</span>
              <input
                type="number"
                value={settings.defaultDemoAmount}
                onChange={(e) =>
                  updateSettings({
                    defaultDemoAmount: Math.max(1, parseFloat(e.target.value) || 0),
                  })
                }
                className="w-36 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-zinc-100 font-bold"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Group 2: Camera Permissions */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-5 space-y-2.5">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300">
            Camera &amp; Scanner Help
          </h3>
        </div>
        <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
          Camera access is requested strictly on-demand. If camera access is blocked in your browser:
        </p>
        <ul className="text-[11px] text-slate-500 dark:text-zinc-400 space-y-1 pl-4 list-disc">
          <li>Tap the lock / camera permission icon in the address bar.</li>
          <li>Choose &quot;Allow&quot; for camera permissions and refresh.</li>
          <li>Or switch to the &quot;Gallery&quot; tab to upload QR screenshots directly.</li>
        </ul>
      </div>

      {/* Group 3: Storage & Data */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trash2 className="w-4 h-4 text-slate-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300">
              Demo Storage
            </h3>
          </div>
          <span className="text-[11px] font-bold text-slate-400">
            {transactions.length} record{transactions.length !== 1 ? "s" : ""}
          </span>
        </div>

        <p className="text-xs text-slate-500 dark:text-zinc-400">
          All scanned demo transactions and settings are stored locally in your browser.
        </p>

        <div className="flex items-center gap-3 pt-1">
          <button
            type="button"
            onClick={handleClear}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900 transition flex items-center gap-1.5 active:scale-95"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear All Demo Data
          </button>

          {clearedNotice && (
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> Cleared
            </span>
          )}
        </div>
      </div>

      {/* Group 4: Safety & About */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-5 space-y-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300">
            About &amp; Safety Guardrail
          </h3>
        </div>

        <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
          QR Demo Nepal is a mobile simulation environment for EMVCo Fonepay, NEPALPAY, Smart QR, and wallet QR codes. No actual money is debited or credited.
        </p>

        <div className="text-[11px] text-slate-400 dark:text-zinc-500 border-t border-slate-100 dark:border-zinc-800 pt-3">
          Version 1.0.0 • Offline Capable Sandbox
        </div>
      </div>
    </div>
  );
}
