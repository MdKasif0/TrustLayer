import React from "react";
import { Logo } from "@/components/Logo";
import { ExternalLink } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <Logo />
            <p className="text-xs text-muted">
              Multi-signal digital media verification
            </p>
          </div>

          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-4 text-sm text-muted">
              <a href="/about" className="hover:text-foreground transition-colors">
                About
              </a>
              <a href="/docs" className="hover:text-foreground transition-colors">
                Docs
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </nav>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-xs text-muted">
            © {currentYear} TrustLayer. Evidence-based media verification.
          </p>
        </div>
      </div>
    </footer>
  );
}
