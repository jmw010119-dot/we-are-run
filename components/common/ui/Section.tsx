import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionSpacing = "sm" | "md" | "lg" | "xl";
type SectionBackground = "default" | "soft" | "none";

type SectionProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  container?: boolean;
  containerClassName?: string;
  spacing?: SectionSpacing;
  background?: SectionBackground;
  children: ReactNode;
};

const spacingClasses: Record<SectionSpacing, string> = {
  sm: "py-10 md:py-12",
  md: "py-12 md:py-16",
  lg: "py-16 md:py-20",
  xl: "py-20 md:py-24",
};

const backgroundClasses: Record<SectionBackground, string> = {
  default: "bg-run-bg",
  soft: "bg-[#080f13]",
  none: "bg-transparent",
};

export function Section({
  as: Component = "section",
  container = true,
  containerClassName,
  spacing = "lg",
  background = "default",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Component
      className={cn(
        "relative border-b border-white/[0.05]",
        spacingClasses[spacing],
        backgroundClasses[background],
        className,
      )}
      {...props}
    >
      {container ? (
        <div className={cn("mx-auto w-full max-w-[1440px] px-5 sm:px-7 xl:px-10", containerClassName)}>
          {children}
        </div>
      ) : (
        children
      )}
    </Component>
  );
}
