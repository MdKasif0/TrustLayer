import React from "react";
import { Shield } from "lucide-react";
import Link from "next/link";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 ${className || ""}`}>
      <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
        <Shield className="w-4 h-4 text-white" strokeWidth={2.5} />
      </div>
      <span className="text-[17px] font-semibold tracking-tight text-foreground">
        TrustLayer
      </span>
    </Link>
  );
}
