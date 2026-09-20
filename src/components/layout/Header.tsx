"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import {
  ScanSearch,
  FileText,
  Info,
  BookOpen,
  ExternalLink,
  Settings,
  Menu,
  X,
} from "lucide-react";

interface NavLink {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  external?: boolean;
}

const navLinks: NavLink[] = [
  { label: "Verify Media", href: "/verify", icon: ScanSearch },
  { label: "Reports", href: "/reports", icon: FileText },
  { label: "About", href: "/about", icon: Info },
  { label: "Documentation", href: "/docs", icon: BookOpen },
  {
    label: "GitHub",
    href: "https://github.com",
    icon: ExternalLink,
    external: true,
  },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Left: Logo + Nav */}
          <div className="flex items-center gap-8">
            <Logo />

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname?.startsWith(link.href + "/");
                const Icon = link.icon;

                return link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-150",
                      "text-muted hover:text-foreground hover:bg-soft-green"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-150",
                      isActive
                        ? "text-primary bg-soft-green"
                        : "text-muted hover:text-foreground hover:bg-soft-green"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right: Settings + CTA */}
          <div className="flex items-center gap-2">
            <Link
              href="/settings"
              className="hidden sm:flex w-8 h-8 items-center justify-center rounded-md text-muted hover:text-foreground hover:bg-soft-green transition-colors"
              aria-label="Settings"
            >
              <Settings className="w-4 h-4" />
            </Link>

            <Link href="/verify" className="hidden sm:block">
              <Button size="sm" icon={<ScanSearch className="w-3.5 h-3.5" />}>
                Verify Media
              </Button>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-8 h-8 flex items-center justify-center rounded-md text-muted hover:text-foreground hover:bg-soft-green transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-surface">
          <nav className="max-w-[1280px] mx-auto px-4 sm:px-6 py-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;

              return link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                    "text-muted hover:text-foreground hover:bg-soft-green"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "text-primary bg-soft-green"
                      : "text-muted hover:text-foreground hover:bg-soft-green"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-border">
              <Link
                href="/settings"
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                  pathname === "/settings"
                    ? "text-primary bg-soft-green"
                    : "text-muted hover:text-foreground hover:bg-soft-green"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Settings className="w-4 h-4" />
                Settings
              </Link>
            </div>
            <div className="pt-2">
              <Link href="/verify" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  size="md"
                  icon={<ScanSearch className="w-4 h-4" />}
                  className="w-full"
                >
                  Verify Media
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
