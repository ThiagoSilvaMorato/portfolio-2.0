import { ALLOWED_ORIGIN, API_KEY, MAX_QUESTION_LENGTH, NO_MATCH } from "./_lib/config";
import { getChunks } from "./_lib/knowledge";
import { complete } from "./_lib/openrouter";
import { buildSystemPrompt } from "./_lib/prompt";
import { retrieve } from "./_lib/retrieval";

export const config = { maxDuration: 20 };

type ChatRequest = { question?: unknown; locale?: unknown };

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function originAllowed(request: Request): boolean {
  if (!ALLOWED_ORIGIN) return true;
  const origin = request.headers.get("origin") ?? request.headers.get("referer") ?? "";
  return origin.startsWith(ALLOWED_ORIGIN);
}

function isNoMatch(answer: string): boolean {
  const stripped = answer.replace(/["'.*\s]/g, "").toUpperCase();
  return stripped === NO_MATCH || stripped.startsWith(NO_MATCH);
}

export async function POST(request: Request): Promise<Response> {
  if (!API_KEY) return json({ error: "not_configured" }, 500);
  if (!originAllowed(request)) return json({ error: "forbidden" }, 403);

  let payload: ChatRequest;
  try {
    payload = (await request.json()) as ChatRequest;
  } catch {
    return json({ error: "bad_request" }, 400);
  }

  const question = typeof payload.question === "string" ? payload.question.trim() : "";
  if (!question || question.length > MAX_QUESTION_LENGTH) {
    return json({ error: "bad_request" }, 400);
  }

  const locale = payload.locale === "pt-BR" ? "pt-BR" : "en";

  // A partir daqui tudo entra no try: qualquer exceção (JSON de conhecimento
  // malformado, bug de retrieval, etc.) vira um 500 nosso em vez de derrubar
  // a function inteira (FUNCTION_INVOCATION_FAILED) sem log nenhum.
  try {
    const retrieval = retrieve(question, getChunks(locale));
    if (!retrieval.matched) {
      return json({ answer: null, reason: "no_match" });
    }

    const systemPrompt = buildSystemPrompt(locale, retrieval.chunks);

    let result;
    try {
      result = await complete(systemPrompt, question, request.signal);
    } catch (error) {
      console.error("OpenRouter request failed:", error);
      return json({ error: "upstream" }, 502);
    }

    if (!result.ok) {
      const rateLimited = result.status === 429;
      return json({ error: rateLimited ? "rate_limited" : "upstream" }, rateLimited ? 429 : 502);
    }

    if (!result.content || isNoMatch(result.content)) {
      return json({ answer: null, reason: "no_match" });
    }

    return json({ answer: result.content });
  } catch (error) {
    console.error("Unhandled error in /api/chat:", error);
    return json({ error: "internal" }, 500);
  }
}
