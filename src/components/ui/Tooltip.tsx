"use client";

import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface TooltipProps {
  content: string;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
  children: React.ReactNode;
}

export function Tooltip({
  content,
  side = "top",
  className,
  children,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(true);
  };

  const hide = () => {
    timeoutRef.current = setTimeout(() => setVisible(false), 100);
  };

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <span
      className={cn("relative inline-flex", className)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {visible && (
        <span
          className={cn(
            "absolute z-50 px-2.5 py-1.5 text-xs font-medium text-white bg-[#2A3A2E] rounded-md whitespace-nowrap pointer-events-none",
            "shadow-[var(--shadow-md)]",
            positionClasses[side]
          )}
          role="tooltip"
        >
          {content}
        </span>
      )}
    </span>
  );
}
