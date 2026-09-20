import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-14 h-14 rounded-lg bg-[#F0F2F0] flex items-center justify-center mx-auto mb-6">
            <Search className="w-6 h-6 text-muted" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Page not found
          </h1>
          <p className="text-muted mb-6">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link href="/">
            <Button
              variant="outline"
              icon={<ArrowLeft className="w-4 h-4" />}
            >
              Back to home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
