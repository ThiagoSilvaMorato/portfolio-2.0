import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

export type KnowledgeChunk = {
  id: string;
  topic: string;
  text: string;
  keywords?: string[];
  always?: boolean;
};

// Leitura via fs (em vez de `import x from "./x.json"`) de propósito: um import
// estático que falhar no carregamento do módulo derruba a function inteira antes
// de qualquer try/catch nosso rodar. Lendo em runtime, um problema aqui vira
// "nenhum resultado encontrado" em vez de crash.
const cache = new Map<string, KnowledgeChunk[]>();

function loadKnowledgeFile(fileName: string): KnowledgeChunk[] {
  const cached = cache.get(fileName);
  if (cached) return cached;

  try {
    const filePath = fileURLToPath(new URL(`../_knowledge/${fileName}`, import.meta.url));
    const raw = readFileSync(filePath, "utf8");
    const parsed: unknown = JSON.parse(raw);
    const chunks = Array.isArray(parsed) ? (parsed as KnowledgeChunk[]) : [];
    cache.set(fileName, chunks);
    return chunks;
  } catch (error) {
    console.error(`Failed to load knowledge file "${fileName}":`, error);
    cache.set(fileName, []);
    return [];
  }
}

export function getChunks(locale: string): KnowledgeChunk[] {
  return loadKnowledgeFile(locale === "pt-BR" ? "pt-BR.json" : "en.json");
}
