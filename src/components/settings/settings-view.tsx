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
import { DemoBanner } from "../layout/demo-banner";

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
      {/* Simulation Banner */}
      <DemoBanner variant="card" />

      {/* Main Settings Card */}
      <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden divide-y divide-slate-100 dark:divide-zinc-800">
        {/* Section 1: Default Provider */}
        <div className="p-5 space-y-3">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-zinc-100">
              Default Provider Preference
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Preferred wallet or bank selected automatically when starting a demo
            </p>
          </div>

          <select
            value={settings.defaultProviderId}
            onChange={(e) => updateSettings({ defaultProviderId: e.target.value })}
            className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-zinc-100 font-medium focus:ring-2 focus:ring-emerald-500"
          >
            {PROVIDERS_REGISTRY.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.category.toUpperCase()})
              </option>
            ))}
          </select>
        </div>

        {/* Section 2: Default Demo Amount */}
        <div className="p-5 space-y-3">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-zinc-100">
              Default Demo Amount (NPR)
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Initial amount populated when scanning static QRs with no encoded sum
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-slate-400">Rs.</span>
            <input
              type="number"
              value={settings.defaultDemoAmount}
              onChange={(e) =>
                updateSettings({
                  defaultDemoAmount: Math.max(1, parseFloat(e.target.value) || 0),
                })
              }
              className="w-36 px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-zinc-100 font-bold"
            />
          </div>
        </div>

        {/* Section 3: Camera Permission Guidance */}
        <div className="p-5 space-y-2.5">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-zinc-100">
              Camera Permission Guidance
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
            QR Demo Nepal requests camera access strictly on-demand when you tap &quot;Start Camera&quot;. If camera access was blocked:
          </p>
          <ul className="text-xs text-slate-500 dark:text-zinc-400 space-y-1 pl-4 list-disc">
            <li>Click the camera or lock icon in your browser address bar.</li>
            <li>Select &quot;Allow&quot; for Camera permissions and refresh the tab.</li>
            <li>Alternatively, use the &quot;Upload QR Image&quot; option to upload screenshot/photos directly.</li>
          </ul>
        </div>

        {/* Section 4: History Management */}
        <div className="p-5 space-y-3">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-zinc-100">
              Local Storage Management
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Currently storing {transactions.length} simulated transaction records on your device
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleClear}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900 transition flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear All Local Simulation Data
            </button>

            {clearedNotice && (
              <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Data cleared
              </span>
            )}
          </div>
        </div>

        {/* Section 5: Mandatory Simulation Disclosure Notice */}
        <div className="p-5 space-y-2 bg-amber-50/40 dark:bg-amber-950/20">
          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-xs uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5" /> Mandatory Safety Guardrail
          </div>
          <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
            In compliance with security guidelines, the &ldquo;SIMULATION — NOT A REAL PAYMENT&rdquo; disclosure cannot be removed or disabled under any setting. The simulator never connects to banking payment gateways or initiates real financial debits.
          </p>
        </div>

        {/* Section 6: About & Privacy */}
        <div className="p-5 space-y-2">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-zinc-100">
              About QR Demo Nepal
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
            QR Demo Nepal is a specialized mobile-first prototyping and demonstration tool built for Nepali fintech developers, designers, and testers. It decodes standard EMVCo (NEPALPAY QR / Fonepay), dynamic merchant payloads, and payment links, presenting structured previews across digital wallets and commercial banks.
          </p>
          <div className="text-[11px] text-slate-400 dark:text-zinc-500 pt-1">
            Version 1.0.0 • Offline Capable • Zero External Financial Transmissions
          </div>
        </div>
      </div>
    </div>
  );
}
