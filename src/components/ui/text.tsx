import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const textVariants = cva("", {
  variants: {
    variant: {
      h1: "text-4xl font-bold tracking-tight text-balance sm:text-5xl",
      h2: "text-3xl font-semibold tracking-tight",
      h3: "text-2xl font-semibold tracking-tight",
      h4: "text-xl font-semibold tracking-tight",
      p: "text-base leading-7",
      lead: "text-xl leading-8 text-muted-foreground",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "p",
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

type TextProps = Omit<ComponentPropsWithoutRef<"p">, "title"> &
  VariantProps<typeof textVariants> & {
    as?: ElementType;
    title?: boolean;
  };

function Text({ className, variant = "p", as, title = false, ...props }: TextProps) {
  const Comp = as ?? VARIANT_ELEMENT[variant!];

  return (
    <Comp
      data-slot='text'
      className={cn(textVariants({ variant }), title ? "font-title" : "font-body", className)}
      {...props}
    />
  );
}

export { Text, textVariants };
export type { TextProps, TextVariant };
