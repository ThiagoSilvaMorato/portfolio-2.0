import { formatYearsOfExperience } from "@/lib/experience";
import { projects } from "@/pages/Projects/constants/projects";

const CAREER_START = "2022-06";

export const stats = [
  { value: formatYearsOfExperience(CAREER_START), tKey: "home.stats.yearsExperience" },
  { value: String(projects.length).concat("+"), tKey: "home.stats.projects" },
  { value: "React", tKey: "home.stats.frontend" },
  { value: "Node.js", tKey: "home.stats.backend" },
] as const;
