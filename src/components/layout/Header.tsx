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
  BookOpen,
  Settings,
  Menu,
  X,
  Sparkles,
  HelpCircle,
  GraduationCap,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const mainNavItems: NavItem[] = [
  { label: "Verify Media", href: "/verify", icon: ScanSearch },
  { label: "Reports", href: "/reports", icon: FileText },
  { label: "Research", href: "/research", icon: GraduationCap },
  { label: "How It Works", href: "/how-it-works", icon: HelpCircle },
];

const secondaryNavItems: NavItem[] = [
  { label: "Documentation", href: "/docs", icon: BookOpen },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-surface border-b border-border">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left Section: Wordmark Brand Logo & Navigation */}
          <div className="flex items-center gap-8">
            <Logo />

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {mainNavItems.map((item) => {
                const isActive =
                  pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href + "/"));

                const Icon = item.icon;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-150 select-none",
                      isActive
                        ? "text-primary font-semibold bg-very-soft-green"
                        : "text-secondary hover:text-foreground hover:bg-very-soft-green/70"
                    )}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Section: Secondary links, Settings & Primary Action CTA */}
          <div className="flex items-center gap-2">
            {/* Desktop Secondary items */}
            <div className="hidden md:flex items-center gap-1 mr-1">
              <Link
                href="/docs"
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors duration-150",
                  pathname === "/docs"
                    ? "text-primary bg-very-soft-green"
                    : "text-muted hover:text-foreground hover:bg-very-soft-green"
                )}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Documentation</span>
              </Link>

              <Link
                href="/settings"
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors duration-150",
                  pathname === "/settings"
                    ? "text-primary bg-very-soft-green"
                    : "text-muted hover:text-foreground hover:bg-very-soft-green"
                )}
                aria-label="Settings"
                title="Settings"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Settings</span>
              </Link>
            </div>

            {/* Prominent Verification Action Button */}
            <Link href="/verify" className="hidden sm:inline-flex">
              <Button
                variant="primary"
                size="sm"
                icon={<ScanSearch className="w-[15px] h-[15px]" />}
                className="w-[136px] h-[38px] rounded-[9px] text-[13px]"
              >
                Verify Media
              </Button>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-8 h-8 flex items-center justify-center rounded-md text-muted hover:text-foreground hover:bg-very-soft-green transition-colors cursor-pointer border border-transparent"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-surface shadow-md">
          <nav className="max-w-[1280px] mx-auto px-4 py-3 space-y-1">
            {mainNavItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium transition-colors",
                    isActive
                      ? "text-primary bg-very-soft-green font-semibold border border-border"
                      : "text-muted hover:text-foreground hover:bg-very-soft-green"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon className="w-4 h-4 text-primary" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            <div className="pt-2 border-t border-border/80 space-y-1">
              {secondaryNavItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium transition-colors",
                      isActive
                        ? "text-primary bg-very-soft-green font-semibold border border-border"
                        : "text-muted hover:text-foreground hover:bg-very-soft-green"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4 text-muted" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-3">
              <Link href="/verify" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="primary"
                  size="md"
                  icon={<ScanSearch className="w-4 h-4" />}
                  className="w-full text-xs"
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
