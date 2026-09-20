import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Settings as SettingsIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Settings — TrustLayer",
  description: "Configure TrustLayer preferences and analysis settings.",
};

export default function SettingsPage() {
  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-2">
            Settings
          </h1>
          <p className="text-muted text-sm max-w-lg leading-relaxed">
            Configure your verification preferences and analysis parameters.
          </p>
        </div>

        <div className="max-w-2xl space-y-4">
          <Card padding="md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-md bg-soft-green flex items-center justify-center">
                  <SettingsIcon className="w-[18px] h-[18px] text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">
                    Analysis Preferences
                  </h4>
                  <p className="text-xs text-muted mt-0.5">
                    Configure which signals to include in verification
                  </p>
                </div>
              </div>
              <Badge variant="muted">Coming soon</Badge>
            </div>
          </Card>

          <Card padding="md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-md bg-soft-green flex items-center justify-center">
                  <SettingsIcon className="w-[18px] h-[18px] text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">
                    Report Defaults
                  </h4>
                  <p className="text-xs text-muted mt-0.5">
                    Set default report format and detail level
                  </p>
                </div>
              </div>
              <Badge variant="muted">Coming soon</Badge>
            </div>
          </Card>

          <Card padding="md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-md bg-soft-green flex items-center justify-center">
                  <SettingsIcon className="w-[18px] h-[18px] text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">
                    API Access
                  </h4>
                  <p className="text-xs text-muted mt-0.5">
                    Manage API keys and webhook endpoints
                  </p>
                </div>
              </div>
              <Badge variant="muted">Coming soon</Badge>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
