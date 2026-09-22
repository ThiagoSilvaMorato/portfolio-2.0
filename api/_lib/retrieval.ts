import { MAX_CONTEXT_CHUNKS, MIN_SCORE, TOP_K } from "./config";
import type { KnowledgeChunk } from "./knowledge";

const STOPWORDS = new Set([
  // en
  "a", "an", "the", "of", "to", "in", "on", "for", "and", "or", "is", "are", "was", "were", "be",
  "been", "do", "does", "did", "he", "she", "it", "they", "his", "her", "their", "them", "what",
  "which", "who", "whom", "how", "when", "where", "why", "about", "with", "as", "at", "by", "from",
  "this", "that", "these", "those", "you", "your", "i", "me", "my", "we", "our", "us", "can", "tell",
  // pt (sem acentos — o texto e normalizado antes)
  "o", "os", "as", "um", "uma", "uns", "umas", "de", "do", "da", "dos", "das", "e", "ou", "que",
  "qual", "quais", "quem", "como", "quando", "onde", "porque", "por", "para", "com", "sem", "no",
  "na", "nos", "nas", "ao", "aos", "se", "sua", "seu", "suas", "seus", "ele", "ela", "eles", "elas",
  "voce", "eu", "meu", "minha", "sobre", "tem", "ter", "sao", "foi", "era", "fala", "diga",
]);

const DIACRITICS = /\p{Diacritic}/gu;
const NON_ALNUM = /[^a-z0-9\s]/g;
const SPACES = /\s+/g;

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(DIACRITICS, "")
    .replace(NON_ALNUM, " ")
    .replace(SPACES, " ")
    .trim();
}

function tokenize(text: string): string[] {
  return normalize(text)
    .split(" ")
    .filter((token) => token.length >= 2 && !STOPWORDS.has(token));
}

function hasMatch(token: string, tokens: Set<string>): boolean {
  if (tokens.has(token)) return true;
  if (token.length < 4) return false;
  for (const candidate of tokens) {
    if (candidate.length >= 4 && (candidate.startsWith(token) || token.startsWith(candidate))) {
      return true;
    }
  }
  return false;
}

function scoreChunk(queryTokens: Set<string>, chunk: KnowledgeChunk): number {
  const textTokens = new Set(tokenize(`${chunk.text} ${chunk.topic}`));
  const keywordTokens = new Set(tokenize((chunk.keywords ?? []).join(" ")));

  let score = 0;
  for (const token of queryTokens) {
    if (hasMatch(token, keywordTokens)) score += 3;
    else if (hasMatch(token, textTokens)) score += 1;
  }
  return score;
}

export type RetrievalResult = { matched: true; chunks: KnowledgeChunk[] } | { matched: false };

export function retrieve(question: string, chunks: KnowledgeChunk[]): RetrievalResult {
  const queryTokens = new Set(tokenize(question));
  if (queryTokens.size === 0) return { matched: false };

  const scored = chunks
    .map((chunk) => ({ chunk, score: scoreChunk(queryTokens, chunk) }))
    .sort((a, b) => b.score - a.score);

  const bestScore = scored[0]?.score ?? 0;
  if (bestScore < MIN_SCORE) return { matched: false };

  const always = chunks.filter((chunk) => chunk.always);
  const top = scored
    .filter((entry) => entry.score >= MIN_SCORE)
    .slice(0, TOP_K)
    .map((entry) => entry.chunk);

  const seen = new Set<string>();
  const merged: KnowledgeChunk[] = [];
  for (const chunk of [...always, ...top]) {
    if (seen.has(chunk.id)) continue;
    seen.add(chunk.id);
    merged.push(chunk);
    if (merged.length >= MAX_CONTEXT_CHUNKS) break;
  }

  return { matched: true, chunks: merged };
}
