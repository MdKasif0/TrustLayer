/**
 * Groq API Client for TrustLayer
 *
 * Communicates with the Groq API server-side using native fetch.
 * Secrets are strictly isolated to the server runtime.
 * Implements exponential backoff retry and timeout controls.
 */

export const GROQ_MODEL = process.env.GROQ_MODEL ?? "qwen/qwen3.8-27b";
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_TIMEOUT_MS = 45000;
const MAX_RETRIES = 3;

export interface GroqChatMessage {
  role: "system" | "user" | "assistant";
  content: string | Array<{ type: "text"; text: string } | { type: "image_url"; image_url: { url: string } }>;
}

export interface GroqCompletionOptions {
  messages: GroqChatMessage[];
  model?: string;
  temperature?: number;
  max_tokens?: number;
  response_format?: { type: "json_object" };
  timeoutMs?: number;
}

export interface GroqCompletionResponse {
  id: string;
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * Executes a chat completion request against the Groq API with automatic retries.
 */
export async function callGroqChatCompletion(
  options: GroqCompletionOptions
): Promise<GroqCompletionResponse> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GROQ_API_KEY environment variable is not configured. AI visual verification is unavailable."
    );
  }

  const model = options.model ?? GROQ_MODEL;
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;

  const payload: Record<string, unknown> = {
    model,
    messages: options.messages,
    temperature: options.temperature ?? 0.1,
    max_tokens: options.max_tokens ?? 2048,
  };

  if (options.response_format) {
    payload.response_format = options.response_format;
  }

  let attempt = 0;
  let delayMs = 1000;

  while (attempt < MAX_RETRIES) {
    attempt++;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timer);

      if (response.ok) {
        return (await response.json()) as GroqCompletionResponse;
      }

      // Handle Rate Limiting (429) or Server Overload (503)
      if (response.status === 429 || response.status >= 500) {
        const errorBody = await response.text();
        console.warn(
          `Groq API status ${response.status} on attempt ${attempt}/${MAX_RETRIES}: ${errorBody.slice(0, 150)}`
        );

        if (attempt < MAX_RETRIES) {
          // Exponential backoff with jitter
          const jitter = Math.random() * 500;
          await sleep(delayMs + jitter);
          delayMs *= 2;
          continue;
        }

        if (response.status === 429) {
          throw new Error("Groq API rate limit reached. Please retry in a few moments.");
        }
        throw new Error(`Groq upstream service error (Status ${response.status}).`);
      }

      // Other 4xx Client Errors
      const errorText = await response.text();
      let userFriendlyMessage = `Groq API returned HTTP ${response.status}`;
      try {
        const parsed = JSON.parse(errorText);
        if (parsed?.error?.message) {
          userFriendlyMessage = parsed.error.message;
        }
      } catch {
        // Keep status message
      }
      throw new Error(userFriendlyMessage);
    } catch (err: unknown) {
      clearTimeout(timer);

      if (err instanceof Error && err.name === "AbortError") {
        if (attempt < MAX_RETRIES) {
          console.warn(`Groq request timed out on attempt ${attempt}. Retrying...`);
          await sleep(delayMs);
          delayMs *= 2;
          continue;
        }
        throw new Error("AI visual analysis request timed out. Please try again.");
      }

      if (attempt >= MAX_RETRIES) {
        throw err;
      }

      await sleep(delayMs);
      delayMs *= 2;
    }
  }

  throw new Error("Groq API request failed after maximum retry attempts.");
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
