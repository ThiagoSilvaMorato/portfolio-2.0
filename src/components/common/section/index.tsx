import type { ReactNode } from "react";
import { Text } from "@/components/ui/text";

type SectionProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
};

export function Section({ eyebrow, title, children }: SectionProps) {
  return (
    <section data-slot='section' className='mx-auto w-full max-w-6xl px-5 py-16'>
      <p className='text-xs tracking-[0.4em] text-accent uppercase'>{eyebrow}</p>

      <Text variant='h1' tone='title' className='mt-4'>
        {title}
      </Text>

      <div className='mt-10'>{children}</div>
    </section>
  );
}

export type { SectionProps };
