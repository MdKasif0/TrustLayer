import React from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface text-foreground">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-border">
          {/* LEFT: TrustLayer, Digital Media Verification, Cyber Safety */}
          <div className="md:col-span-5 space-y-3">
            <Logo />
            <div className="text-xs text-secondary font-mono space-y-0.5 pt-1">
              <p className="font-semibold text-foreground">Digital Media Verification</p>
              <p>Cyber Safety</p>
            </div>
            <p className="text-xs text-secondary max-w-sm leading-relaxed pt-1">
              Multi-signal evidentiary platform combining AI detection, C2PA provenance, metadata integrity, and forensic analysis.
            </p>
          </div>

          {/* CENTER: Product */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-foreground block">
              Product
            </span>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link
                  href="/verify"
                  className="text-secondary hover:text-primary transition-colors inline-block"
                >
                  Verify Media
                </Link>
              </li>
              <li>
                <Link
                  href="/reports"
                  className="text-secondary hover:text-primary transition-colors inline-block"
                >
                  Reports
                </Link>
              </li>
              <li>
                <Link
                  href="/about#research-foundations"
                  className="text-secondary hover:text-primary transition-colors inline-block"
                >
                  Research
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-secondary hover:text-primary transition-colors inline-block"
                >
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* RIGHT: Resources */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-foreground block">
              Resources
            </span>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link
                  href="/docs"
                  className="text-secondary hover:text-primary transition-colors inline-block"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-secondary hover:text-primary transition-colors inline-block"
                >
                  Methodology
                </Link>
              </li>
              <li>
                <Link
                  href="/settings"
                  className="text-secondary hover:text-primary transition-colors inline-block"
                >
                  Preferences &amp; Telemetry
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM: © 2026 TrustLayer, "Evidence-based assessment. Not absolute certainty." */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-secondary font-mono">
          <p>© 2026 TrustLayer</p>
          <p className="text-[11px] text-secondary">
            &ldquo;Evidence-based assessment. Not absolute certainty.&rdquo;
          </p>
        </div>
      </div>
    </footer>
  );
}
