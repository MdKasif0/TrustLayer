import React from "react";
import { Logo } from "@/components/Logo";
import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Left */}
          <div className="flex flex-col gap-3">
            <Logo />
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-secondary" />
              <span className="text-xs font-semibold tracking-[0.06em] uppercase text-secondary">
                Viksit Bharat Ideathon 2026
              </span>
            </div>
            <p className="text-[11px] text-muted">
              Theme: Cyber Safety
            </p>
          </div>

          {/* Right */}
          <nav className="flex flex-wrap items-center gap-4 text-sm text-muted">
            <a href="/verify" className="hover:text-foreground transition-colors">
              Verify
            </a>
            <a href="/reports" className="hover:text-foreground transition-colors">
              Reports
            </a>
            <a href="/about" className="hover:text-foreground transition-colors">
              About
            </a>
            <a href="/docs" className="hover:text-foreground transition-colors">
              Docs
            </a>
            <a
              href="https://github.com/MdKasif0/TrustLayer"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </nav>
        </div>

        <div className="mt-6 pt-4 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-[11px] text-muted">
            © {new Date().getFullYear()} TrustLayer. Evidence-based digital media verification.
          </p>
          <p className="text-[11px] text-muted">
            Not a guarantee of detection. Use alongside professional judgment.
          </p>
        </div>
      </div>
    </footer>
  );
}
