import { MapPin } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Section } from "@/components/common/section";
import { channels } from "./constants/channels";

export function Contact() {
  const { t } = useTranslation();
  const pageTitle = `Thiago Morato | ${t("contact.title")}`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name='description' content={t("contact.description")} />
        <meta property='og:title' content={pageTitle} />
        <meta property='og:description' content={t("contact.description")} />
      </Helmet>

      <Section eyebrow={t("contact.eyebrow")} title={t("contact.title")}>
        <div className='grid gap-6 md:grid-cols-3'>
          {channels.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              target={channel.external ? "_blank" : undefined}
              rel={channel.external ? "noopener noreferrer" : undefined}
              className='rounded-2xl glass-panel neon-border p-7 transition-transform hover:-translate-y-1'
            >
              <channel.Icon className='h-6 w-6 text-primary' />

              <p className='mt-4 text-xs tracking-[0.3em] text-accent uppercase'>
                {channel.label}
              </p>

              <p className='mt-1 break-all text-foreground'>{channel.value}</p>
            </a>
          ))}
        </div>

        <p className='mt-10 inline-flex items-center gap-2 text-muted-foreground'>
          <MapPin className='h-4 w-4 text-accent' />
          {t("contact.location")}
        </p>
      </Section>
    </>
  );
}
