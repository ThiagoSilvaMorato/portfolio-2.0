import i18n, { locales, useCurrentLocale } from "@/i18n";
import { cn } from "@/lib/utils";

export function LangSwitch() {
  const current = useCurrentLocale();
  const slideToSecond = current === locales[1];

  return (
    <div
      data-slot='lang-switch'
      role='group'
      aria-label='Language / Idioma'
      className='relative flex items-center rounded-full neon-border glass-panel p-1'
    >
      <span
        aria-hidden
        className='absolute top-1 bottom-1 w-[calc(50%-6px)] rounded-full bg-primary shadow-[0_0_14px_color-mix(in_oklab,var(--primary)_80%,transparent)] transition-transform duration-300 ease-out'
        style={{
          transform: slideToSecond ? "translateX(calc(100% + 4px))" : "translateX(4px)",
        }}
      />
      {locales.map((locale) => (
        <button
          key={locale}
          type='button'
          onClick={() => {
            if (current !== locale) void i18n.changeLanguage(locale);
          }}
          aria-pressed={current === locale}
          className={cn(
            "relative z-10 rounded-full px-3 py-1 font-title text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 cursor-pointer",
            current === locale
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-accent",
          )}
        >
          {locale.slice(0, 2)}
        </button>
      ))}
      <span
        aria-hidden
        className='pointer-events-none absolute inset-0 overflow-hidden rounded-full'
      >
        <span className='lang-scan' />
      </span>
    </div>
  );
}
