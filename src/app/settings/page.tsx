"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SettingsView } from "@/components/settings/settings-view";

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      {/* Top back navigation */}
      <div className="flex items-center gap-2">
        <Link
          href="/"
          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-zinc-50">
            Settings &amp; Info
          </h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Simulator preferences and safety disclosure
          </p>
        </div>
      </div>

      <SettingsView />
    </div>
  );
}
