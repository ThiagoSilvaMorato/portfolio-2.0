import { cva } from "class-variance-authority";

export const textVariants = cva("", {
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
