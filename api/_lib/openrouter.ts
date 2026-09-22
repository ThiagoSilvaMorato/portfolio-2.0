import {
  API_KEY,
  MAX_TOKENS,
  MODEL,
  OPENROUTER_URL,
  SITE_NAME,
  SITE_URL,
  TEMPERATURE,
} from "./config.js";

export type OpenRouterResult = { ok: true; content: string } | { ok: false; status: number };

/** Uma nova tentativa para erros 5xx passageiros (provedores gratuitos oscilam bastante). */
const RETRY_ON_5XX = 1;
const RETRY_DELAY_MS = 700;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function complete(
  systemPrompt: string,
  question: string,
  signal?: AbortSignal,
): Promise<OpenRouterResult> {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  };
  if (SITE_URL) headers["HTTP-Referer"] = SITE_URL;
  if (SITE_NAME) headers["X-Title"] = SITE_NAME;

  const body = JSON.stringify({
    model: MODEL,
    temperature: TEMPERATURE,
    max_tokens: MAX_TOKENS,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: question },
    ],
  });

  let lastStatus = 0;

  for (let attempt = 0; attempt <= RETRY_ON_5XX; attempt++) {
    if (attempt > 0) await sleep(RETRY_DELAY_MS);

    const response = await fetch(OPENROUTER_URL, { method: "POST", headers, body, signal });

    if (response.ok) {
      const data = (await response.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
      };
      const content = data.choices?.[0]?.message?.content?.trim() ?? "";
      return { ok: true, content };
    }

    lastStatus = response.status;
    const errorBody = await response.text().catch(() => "");
    console.error(`OpenRouter ${response.status} (model "${MODEL}"): ${errorBody.slice(0, 500)}`);

    if (response.status < 500) break;
  }

  return { ok: false, status: lastStatus };
}
