import { AnalysisProvider } from "./provider";
import { DemoAnalysisProvider } from "./demo-provider";
import { ApiAnalysisProvider } from "./api-provider";

export * from "./types";
export * from "./provider";
export * from "./demo-provider";
export * from "./api-provider";

/**
 * Checks whether TrustLayer is currently operating in Demo Mode.
 * Controlled by the environment variable: NEXT_PUBLIC_DEMO_MODE.
 * Defaults to true for immediate out-of-the-box evaluation without requiring
 * external Python or AI microservice credentials.
 */
export function isDemoMode(): boolean {
  if (typeof process !== "undefined" && process.env.NEXT_PUBLIC_DEMO_MODE !== undefined) {
    return process.env.NEXT_PUBLIC_DEMO_MODE !== "false";
  }
  return true;
}

let providerInstance: AnalysisProvider | null = null;

/**
 * Factory function to retrieve the configured AnalysisProvider instance.
 * When NEXT_PUBLIC_DEMO_MODE=true (default): returns DemoAnalysisProvider.
 * When NEXT_PUBLIC_DEMO_MODE=false: returns ApiAnalysisProvider pointing to /api/analyze.
 */
export function getAnalysisProvider(forceFresh = false): AnalysisProvider {
  if (providerInstance && !forceFresh) {
    return providerInstance;
  }

  if (isDemoMode()) {
    providerInstance = new DemoAnalysisProvider();
  } else {
    providerInstance = new ApiAnalysisProvider();
  }

  return providerInstance;
}
