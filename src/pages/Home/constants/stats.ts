import { projects } from "@/pages/Projects/constants/projects";

export const stats = [
  { value: "4+", tKey: "home.stats.yearsExperience" },
  { value: String(projects.length).concat("+"), tKey: "home.stats.projects" },
  { value: "React", tKey: "home.stats.frontend" },
  { value: "Node.js", tKey: "home.stats.backend" },
] as const;
