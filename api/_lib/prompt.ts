import { NO_MATCH, OWNER_NAME } from "./config.js";
import type { KnowledgeChunk } from "./knowledge.js";

const LANGUAGE_NAME: Record<string, string> = {
  en: "English",
  "pt-BR": "Brazilian Portuguese",
};

export function buildSystemPrompt(locale: string, chunks: KnowledgeChunk[]): string {
  const language = LANGUAGE_NAME[locale] ?? "English";
  const context = chunks.map((chunk) => `- ${chunk.text}`).join("\n");

  return [
    `You are the personal AI assistant on ${OWNER_NAME}'s portfolio website.`,
    `Visitors ask you about ${OWNER_NAME}'s professional background, skills, projects and experience.`,
    ``,
    `Rules:`,
    `- Answer ONLY with facts found in the CONTEXT below. Never use outside knowledge or guess.`,
    `- If the CONTEXT does not clearly contain the answer, reply with exactly: ${NO_MATCH}`,
    `- Keep answers short: at most two small paragraphs. Be factual and friendly.`,
    `- Always refer to ${OWNER_NAME} in the third person.`,
    `- Write your answer in ${language}.`,
    ``,
    `CONTEXT:`,
    context,
  ].join("\n");
}
