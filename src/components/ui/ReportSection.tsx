import React from "react";
import { cn } from "@/lib/utils";

interface ReportSectionProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export function ReportSection({
  title,
  description,
  action,
  className,
  children,
}: ReportSectionProps) {
  return (
    <section className={cn("py-6 first:pt-0 last:pb-0", className)}>
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
          {description && (
            <p className="text-sm text-muted mt-0.5">{description}</p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      <div>{children}</div>
    </section>
  );
}

export function ReportDivider() {
  return <hr className="border-t border-border" />;
}
