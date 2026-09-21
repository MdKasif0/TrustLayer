"use client";

import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FAFAF7] text-[#17201A] flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-white border border-[#DDE3DE] rounded-xl p-8 text-center shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-[#FEF0EF] border border-[#F0C5C1] flex items-center justify-center mx-auto mb-4 text-[#B42318]">
            <AlertCircle className="w-6 h-6" />
          </div>

          <h1 className="text-xl font-bold tracking-tight text-[#17201A] mb-2">
            System Failure
          </h1>

          <p className="text-xs text-[#647067] leading-relaxed mb-6">
            A fatal root-level error prevented TrustLayer from initializing.
            Please refresh the application or contact platform administration.
          </p>

          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center h-11 px-[18px] text-sm font-semibold text-white bg-[#14532D] hover:bg-[#0F4526] border border-[#14532D] rounded-[10px] shadow-[0_1px_2px_rgba(20,83,45,0.10)] hover:shadow-[0_3px_8px_rgba(20,83,45,0.14)] hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.99] transition-all duration-150 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6FA887] focus-visible:ring-offset-2"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reload TrustLayer
          </button>
        </div>
      </body>
    </html>
  );
}
