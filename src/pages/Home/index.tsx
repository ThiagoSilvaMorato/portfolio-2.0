import { ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import perfil from "@/assets/perfil.jpeg";
import { Text } from "@/components/ui/text";
import { socials } from "./constants/socials";
import { stack } from "./constants/stack";
import { stats } from "./constants/stats";

export function Home() {
  const { t } = useTranslation();
  const pageTitle = `Thiago Morato | ${t("home.eyebrow")}`;

  return (
    <div className='mx-auto w-full max-w-6xl px-5 py-16'>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name='description' content={t("home.description")} />
        <meta property='og:title' content={pageTitle} />
        <meta property='og:description' content={t("home.description")} />
      </Helmet>

      <div className='grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]'>
        <div className='animate-in fade-in slide-in-from-bottom-4 duration-700'>
          <p className='text-xs tracking-[0.4em] text-accent uppercase'>{t("home.eyebrow")}</p>

          <Text variant='h1' tone='title' className='mt-4 whitespace-pre-line'>
            {t("home.headline")}
          </Text>

          <Text className='mt-6 max-w-xl'>{t("home.description")}</Text>

          <div className='mt-8 flex flex-wrap gap-3'>
            <Link
              to='/projects'
              className='group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold tracking-widest text-primary-foreground uppercase transition-transform hover:scale-105'
            >
              {t("home.ctaProjects")}
              <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
            </Link>

            <Link
              to='/contact'
              className='neon-border inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold tracking-widest text-foreground uppercase transition-colors hover:text-accent'
            >
              {t("home.ctaContact")}
            </Link>
          </div>

          <div className='mt-8 flex gap-4 text-muted-foreground'>
            {socials.map(({ href, label, Icon }) => {
              const external = href.startsWith("http");
              return (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className='transition-colors hover:text-accent'
                >
                  <Icon className='h-5 w-5' />
                </a>
              );
            })}
          </div>
        </div>

        <div className='float-soft relative mx-auto w-full max-w-sm'>
          <div className='hero-photo-glow absolute -inset-4 rounded-3xl opacity-40 blur-2xl' />
          <img
            src={perfil}
            alt={`Thiago Morato — ${t("home.eyebrow")}`}
            width={1250}
            height={1350}
            className='neon-border relative w-full rounded-3xl object-cover'
          />
        </div>
      </div>

      <div className='mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {stats.map(({ value, tKey }) => (
          <div key={tKey} className='glass-panel neon-border rounded-xl p-6 text-center'>
            <p className='font-title neon-text text-3xl font-bold text-primary'>{value}</p>
            <p className='mt-1 text-xs tracking-widest text-muted-foreground uppercase'>
              {t(tKey)}
            </p>
          </div>
        ))}
      </div>

      <div className='mt-12 flex flex-wrap gap-2'>
        {stack.map((technology) => (
          <span
            key={technology}
            className='rounded-full border border-border px-4 py-1.5 text-xs tracking-widest text-muted-foreground uppercase transition-colors hover:border-accent hover:text-accent'
          >
            {technology}
          </span>
        ))}
      </div>
    </div>
  );
}
