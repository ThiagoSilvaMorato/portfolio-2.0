export type StackCategory =
  | "frontend"
  | "languages"
  | "styling"
  | "stateManagement"
  | "testing"
  | "architecture";

export type StackItem = {
  name: string;
  category: StackCategory;
  since: string;
};

export const STACK_CATEGORIES: StackCategory[] = [
  "frontend",
  "languages",
  "styling",
  "stateManagement",
  "testing",
  "architecture",
];

// `since` é o mês em que passei a usar a tecnologia (formato "YYYY-MM"). Fonte
// única para a lista de tecnologias na Home e para os anos de experiência que
// o chatbot usa (api/_lib/stack-knowledge.ts) — atualize só a data aqui, nunca
// o número de anos.
export const stack: StackItem[] = [
  { name: "React", category: "frontend", since: "2022-06" },
  { name: "Next.js", category: "frontend", since: "2023-06" },
  { name: "Angular", category: "frontend", since: "2023-06" },

  { name: "TypeScript", category: "languages", since: "2022-06" },
  { name: "JavaScript", category: "languages", since: "2022-06" },

  { name: "CSS", category: "styling", since: "2022-06" },
  { name: "Tailwind CSS", category: "styling", since: "2023-06" },
  { name: "Styled Components", category: "styling", since: "2024-06" },
  { name: "Sass", category: "styling", since: "2024-06" },

  { name: "React Hook Form", category: "stateManagement", since: "2022-06" },
  { name: "Redux", category: "stateManagement", since: "2024-06" },

  { name: "Jest", category: "testing", since: "2025-06" },
  { name: "Vitest", category: "testing", since: "2025-06" },

  { name: "REST APIs", category: "architecture", since: "2022-06" },
  { name: "Git", category: "architecture", since: "2022-06" },
  { name: "Scrum", category: "architecture", since: "2022-06" },
  { name: "Kanban", category: "architecture", since: "2022-06" },
  { name: "Docker", category: "architecture", since: "2024-06" },
  { name: "Micro Frontends", category: "architecture", since: "2025-06" },
];
