import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const textVariants = cva("", {
  variants: {
    variant: {
      h1: "text-4xl leading-tight sm:text-6xl",
      h2: "text-4xl font-semibold tracking-tight",
      h3: "text-3xl font-semibold tracking-tight",
      h4: "text-2xl font-semibold tracking-tight",
      p: "text-lg leading-8",
      lead: "text-2xl leading-9",
      small: "text-base font-medium leading-none",
      muted: "text-base",
    },
    tone: {
      simple: "font-body text-muted-foreground",
      neon: "font-body text-accent",
      title: "font-title neon-text font-black uppercase",
    },
  },
  defaultVariants: {
    variant: "p",
    tone: "simple",
  },
});

const VARIANT_ELEMENT = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  p: "p",
  lead: "p",
  small: "small",
  muted: "p",
} as const;

type TextVariant = keyof typeof VARIANT_ELEMENT;
type TextTone = NonNullable<VariantProps<typeof textVariants>["tone"]>;

type TextProps = ComponentPropsWithoutRef<"p"> &
  VariantProps<typeof textVariants> & {
    as?: ElementType;
  };

function Text({ className, variant = "p", tone, as, ...props }: TextProps) {
  const Comp = as ?? VARIANT_ELEMENT[variant!];

  return (
    <Comp data-slot='text' className={cn(textVariants({ variant, tone }), className)} {...props} />
  );
}

export { Text, textVariants };
export type { TextProps, TextVariant, TextTone };
