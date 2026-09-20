import React from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface text-foreground">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-border">
          {/* Brand & Subtitle */}
          <div className="space-y-2">
            <Logo />
            <div className="space-y-0.5 text-xs text-muted font-mono">
              <p className="font-semibold text-foreground">Digital Media Verification</p>
              <p>Cyber Safety</p>
            </div>
          </div>

          {/* Core Footer Navigation Links */}
          <nav className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-mono">
            <Link
              href="/about#research-foundations"
              className="text-muted hover:text-foreground transition-colors"
            >
              Research
            </Link>
            <Link
              href="/about"
              className="text-muted hover:text-foreground transition-colors"
            >
              Methodology
            </Link>
            <Link
              href="/reports"
              className="text-muted hover:text-foreground transition-colors"
            >
              Reports
            </Link>
            <Link
              href="/docs"
              className="text-muted hover:text-foreground transition-colors"
            >
              Documentation
            </Link>
          </nav>
        </div>

        {/* Legal & Trust Statement */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-muted font-mono">
          <p>© {new Date().getFullYear()} TrustLayer. Evidence-based digital media verification.</p>
          <p className="text-[11px] text-muted/80">
            Evidence-based assessment. Not absolute certainty.
          </p>
        </div>
      </div>
    </footer>
  );
}
