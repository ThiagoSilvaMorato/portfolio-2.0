import SiGithub from "@icons-pack/react-simple-icons/icons/SiGithub";
import { ExternalLink } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Section } from "@/components/common/section";

const projects = [
  {
    title: "Financy",
    descriptionKey: "projects.items.financy.description",
    tags: ["React", "TypeScript", "GraphQL", "Node.js", "Prisma", "PostgreSQL", "TailwindCSS"],
    demoUrl: null,
    codeUrl: "https://github.com/ThiagoSilvaMorato/financy",
  },
  {
    title: "Brevly",
    descriptionKey: "projects.items.brevly.description",
    tags: [
      "React",
      "TypeScript",
      "Node.js",
      "Fastify",
      "PostgreSQL",
      "Drizzle ORM",
      "TailwindCSS",
    ],
    demoUrl: null,
    codeUrl: "https://github.com/ThiagoSilvaMorato/brevly",
  },
  {
    title: "Todo App",
    descriptionKey: "projects.items.todo.description",
    tags: ["React", "TypeScript", "Vite", "TailwindCSS", "React Router", "LocalStorage"],
    demoUrl: "https://todo-list-thiago-morato.vercel.app/",
    codeUrl: "https://github.com/ThiagoSilvaMorato/todo-list",
  },
] as const;

export function Projects() {
  const { t } = useTranslation();
  const pageTitle = `Thiago Morato | ${t("projects.title")}`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name='description' content={t("projects.description")} />
        <meta property='og:title' content={pageTitle} />
        <meta property='og:description' content={t("projects.description")} />
      </Helmet>

      <Section eyebrow={t("projects.eyebrow")} title={t("projects.title")}>
        <div className='grid gap-6 md:grid-cols-2'>
          {projects.map((project) => (
            <article
              key={project.title}
              className='group relative overflow-hidden rounded-2xl glass-panel neon-border p-7 transition-transform hover:-translate-y-1'
            >
              <div className='absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity group-hover:opacity-100' />

              <h2 className='font-title text-2xl font-bold text-foreground group-hover:neon-text'>
                {project.title}
              </h2>

              <p className='mt-3 leading-relaxed text-muted-foreground'>
                {t(project.descriptionKey)}
              </p>

              <div className='mt-5 flex flex-wrap gap-2'>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className='rounded-full border border-border px-3 py-1 text-[11px] tracking-widest text-accent uppercase'
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className='mt-6 flex gap-4 text-sm tracking-widest text-muted-foreground uppercase'>
                <a
                  href={project.codeUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-1 transition-colors hover:text-accent'
                >
                  <SiGithub className='h-4 w-4' />
                  {t("projects.code")}
                </a>

                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center gap-1 transition-colors hover:text-accent'
                  >
                    <ExternalLink className='h-4 w-4' />
                    {t("projects.demo")}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
