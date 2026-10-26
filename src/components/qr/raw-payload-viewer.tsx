"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Copy, Check, Terminal, Layers } from "lucide-react";
import { ParsedTag } from "@/types/qr";

interface RawPayloadViewerProps {
  rawPayload: string;
  parsedTags?: ParsedTag[];
  extraFields?: Record<string, string>;
}

export function RawPayloadViewer({
  rawPayload,
  parsedTags,
  extraFields,
}: RawPayloadViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(rawPayload);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 overflow-hidden text-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-zinc-800/40 transition"
      >
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-slate-500 dark:text-zinc-400" />
          <span className="font-semibold text-slate-700 dark:text-zinc-200">
            Technical QR Details
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 font-mono">
            {rawPayload.length} bytes
          </span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </button>

      {isOpen && (
        <div className="p-4 border-t border-slate-100 dark:border-zinc-800 space-y-4 bg-slate-50/50 dark:bg-zinc-950/40">
          {/* Raw Payload Section */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-medium text-slate-500 dark:text-zinc-400">
                Raw Decoded Payload
              </span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" /> Copy Raw
                  </>
                )}
              </button>
            </div>
            <pre className="p-3 rounded-lg bg-zinc-900 text-zinc-200 font-mono text-[11px] break-all whitespace-pre-wrap select-all border border-zinc-800 max-h-36 overflow-y-auto">
              {rawPayload}
            </pre>
          </div>

          {/* Parsed EMV Tags (if available) */}
          {parsedTags && parsedTags.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 mb-2 font-medium text-slate-600 dark:text-zinc-300">
                <Layers className="w-3.5 h-3.5" />
                <span>EMVCo TLV Tag Breakdown</span>
              </div>
              <div className="border border-slate-200 dark:border-zinc-800 rounded-lg overflow-hidden bg-white dark:bg-zinc-900">
                <div className="grid grid-cols-12 bg-slate-100 dark:bg-zinc-800/80 px-2.5 py-1.5 font-semibold text-[10px] text-slate-600 dark:text-zinc-300 uppercase tracking-wider">
                  <span className="col-span-2">Tag</span>
                  <span className="col-span-5">Name</span>
                  <span className="col-span-5">Value</span>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-zinc-800/60 max-h-56 overflow-y-auto">
                  {parsedTags.map((tag) => (
                    <div
                      key={tag.tag}
                      className="grid grid-cols-12 px-2.5 py-2 text-[11px] items-start hover:bg-slate-50 dark:hover:bg-zinc-800/30"
                    >
                      <span className="col-span-2 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {tag.tag}
                      </span>
                      <span className="col-span-5 text-slate-600 dark:text-zinc-300 font-medium">
                        {tag.name}
                      </span>
                      <div className="col-span-5 font-mono text-slate-800 dark:text-zinc-200 break-all">
                        <span>{tag.value}</span>
                        {tag.subTags && tag.subTags.length > 0 && (
                          <div className="mt-1 pl-2 border-l-2 border-emerald-500/40 space-y-1 text-[10px]">
                            {tag.subTags.map((sub) => (
                              <div key={sub.tag} className="text-slate-500 dark:text-zinc-400">
                                <span className="font-bold text-slate-700 dark:text-zinc-300">
                                  [{sub.tag}] {sub.name}:
                                </span>{" "}
                                {sub.value}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Extra Fields (if JSON or URL params) */}
          {extraFields && Object.keys(extraFields).length > 0 && (
            <div>
              <span className="font-medium text-slate-500 dark:text-zinc-400 block mb-1.5">
                Additional Extracted Parameters
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {Object.entries(extraFields).map(([k, v]) => (
                  <div
                    key={k}
                    className="p-2 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex justify-between gap-2"
                  >
                    <span className="text-slate-500 dark:text-zinc-400 font-medium truncate">
                      {k}
                    </span>
                    <span className="font-mono text-slate-800 dark:text-zinc-200 truncate">
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
