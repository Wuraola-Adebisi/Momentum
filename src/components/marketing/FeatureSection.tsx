// src/components/marketing/FeatureSection.tsx
import { type ReactNode } from "react";
import clsx from "clsx";

interface FeatureSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  // Puts the visual on the left and text on the right at desktop widths.
  // On mobile, text always comes first regardless, so the reading order
  // stays natural once the columns stack.
  reverse?: boolean;
  children: ReactNode;
}

export function FeatureSection({
  eyebrow,
  title,
  description,
  reverse = false,
  children,
}: FeatureSectionProps) {
  return (
    <div
      className={clsx(
        "mx-auto flex w-full max-w-content flex-col items-center gap-8 px-6 py-14 md:flex-row md:gap-10 md:px-10 md:py-20 3xl:max-w-content",
        reverse && "md:flex-row-reverse"
      )}
    >
      <div className="order-1 w-full md:w-1/2">
        <p className="font-data text-[11px] font-semibold uppercase tracking-wider text-primary">
          {eyebrow}
        </p>

        <h2 className="mt-2 font-display text-2xl font-bold text-ink md:text-[26px]">
          {title}
        </h2>

        <p className="mt-3 max-w-sm text-sm text-muted">
          {description}
        </p>
      </div>

      <div className="order-2 w-full md:w-1/2">
        {children}
      </div>
    </div>
  );
}