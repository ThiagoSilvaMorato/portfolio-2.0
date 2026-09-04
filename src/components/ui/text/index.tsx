import type { ComponentPropsWithoutRef, ElementType } from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { VARIANT_ELEMENT } from "./constants/elements";
import { textVariants } from "./constants/variants";

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
