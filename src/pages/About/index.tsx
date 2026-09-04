import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Section } from "@/components/common/section";

export function About() {
  const { t } = useTranslation();
  const pageTitle = `Thiago Morato | ${t("about.eyebrow")}`;
  const paragraphs = t("about.paragraphs", { returnObjects: true });
  const timeline = t("about.timeline", { returnObjects: true });

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name='description' content={t("about.description")} />
        <meta property='og:title' content={pageTitle} />
        <meta property='og:description' content={t("about.description")} />
      </Helmet>

      <Section eyebrow={t("about.eyebrow")} title={t("about.title")}>
        <div className='grid gap-10 lg:grid-cols-[1.3fr_0.7fr]'>
          <div className='space-y-5 text-lg leading-relaxed text-muted-foreground'>
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <ol className='space-y-4'>
            {timeline.map((item) => (
              <li key={item.year} className='glass-panel neon-border rounded-xl p-5'>
                <p className='font-title text-xl font-bold text-accent'>{item.year}</p>
                <p className='mt-1 text-sm leading-relaxed text-muted-foreground'>
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Section>
    </>
  );
}
