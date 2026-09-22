import { calculateYearsOfExperience } from "../../src/lib/experience.js";
import { stack } from "../../src/lib/stack.js";
import type { KnowledgeChunk } from "./knowledge.js";

type LocaleContent = {
  buildText: (name: string, years: number) => string;
  keywords: string[];
};

const CONTENT_BY_LOCALE: Record<string, LocaleContent> = {
  en: {
    buildText: (name, years) => `Thiago has ${years}+ years of professional experience with ${name}.`,
    keywords: ["experience", "years of experience", "how long", "how many years"],
  },
  "pt-BR": {
    buildText: (name, years) => `Thiago tem ${years}+ anos de experiência profissional com ${name}.`,
    keywords: ["experiência", "anos de experiência", "tempo de experiência", "quanto tempo"],
  },
};

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Um chunk por tecnologia, sem `always`: só entra no contexto quando a pergunta
// bate especificamente com aquela tecnologia — não em toda resposta do chatbot.
export function buildStackExperienceChunks(locale: string): KnowledgeChunk[] {
  const content = CONTENT_BY_LOCALE[locale] ?? CONTENT_BY_LOCALE.en;

  return stack.map(({ name, since }) => ({
    id: `stack-experience-${slugify(name)}`,
    topic: "skills",
    text: content.buildText(name, calculateYearsOfExperience(since)),
    keywords: [name, ...content.keywords],
  }));
}
