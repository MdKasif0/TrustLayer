import React from "react";
import Image from "next/image";
import Link from "next/link";

interface LogoMarkProps {
  size?: number;
  className?: string;
  priority?: boolean;
}

export function LogoMark({ size = 28, className = "", priority = true }: LogoMarkProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/brand/trustlayer-logo.png"
        alt="TrustLayer Logo"
        width={size * 2}
        height={size * 2}
        className="w-full h-full object-contain drop-shadow-[0_1px_2px_rgba(22,163,74,0.18)]"
        priority={priority}
      />
    </div>
  );
}

interface LogoProps {
  className?: string;
  size?: number;
  showWordmark?: boolean;
  href?: string;
}

export function Logo({
  className = "",
  size = 28,
  showWordmark = true,
  href = "/",
}: LogoProps) {
  const content = (
    <span className={`inline-flex items-center gap-2.5 group ${className}`}>
      <LogoMark
        size={size}
        className="transition-transform duration-200 ease-out group-hover:scale-105"
      />
      {showWordmark && (
        <span className="text-[17px] font-semibold tracking-tight text-foreground select-none">
          Trust<span className="text-primary font-bold">Layer</span>
        </span>
      )}
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} className="inline-flex items-center">
      {content}
    </Link>
  );
}
