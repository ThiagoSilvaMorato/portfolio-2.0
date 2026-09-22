import enKnowledge from "../_knowledge/en.json";
import ptBrKnowledge from "../_knowledge/pt-BR.json";

export type KnowledgeChunk = {
  id: string;
  topic: string;
  text: string;
  keywords?: string[];
  always?: boolean;
};

const BY_LOCALE: Record<string, KnowledgeChunk[]> = {
  en: enKnowledge as KnowledgeChunk[],
  "pt-BR": ptBrKnowledge as KnowledgeChunk[],
};

export function getChunks(locale: string): KnowledgeChunk[] {
  return BY_LOCALE[locale] ?? BY_LOCALE.en;
}
