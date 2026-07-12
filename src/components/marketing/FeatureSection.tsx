import { type ReactNode } from "react";
import clsx from "clsx";
import { SECTION_PADDING_X } from "./layout";

interface FeatureSectionProps {
  title: string;
  description: string;
  reverse?: boolean;
  children: ReactNode;
}

export function FeatureSection({
  title,
  description,
  reverse = false,
  children,
}: FeatureSectionProps) {
  return (
    <div
      className={clsx(
        `mx-auto flex w-full max-w-content flex-col items-center gap-8 py-14 md:flex-row md:gap-10 md:py-20 ${SECTION_PADDING_X}`,
        reverse && "md:flex-row-reverse",
      )}
    >
      <div className="order-1 w-full md:w-1/2">
        <h2 className="font-display text-2xl font-bold text-ink md:text-[26px]">
          {title}
        </h2>

        <p className="mt-3 max-w-sm text-sm text-muted">{description}</p>
      </div>

      <div className="order-2 w-full md:w-1/2">{children}</div>
    </div>
  );
}
