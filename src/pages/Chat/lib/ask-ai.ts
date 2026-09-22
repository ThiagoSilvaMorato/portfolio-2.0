export type AskResult =
  | { status: "answer"; text: string }
  | { status: "no-match" }
  | { status: "error" };

type ApiResponse = { answer?: string | null; reason?: string; error?: string };

export async function askAi(
  question: string,
  locale: string,
  signal?: AbortSignal,
): Promise<AskResult> {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, locale }),
      signal,
    });

    if (!response.ok) return { status: "error" };

    const data = (await response.json()) as ApiResponse;
    if (typeof data.answer === "string" && data.answer.trim()) {
      return { status: "answer", text: data.answer.trim() };
    }
    if (data.reason === "no_match") return { status: "no-match" };
    return { status: "error" };
  } catch {
    return { status: "error" };
  }
}
