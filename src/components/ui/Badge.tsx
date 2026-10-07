import React from "react";
import clsx from "clsx";

type BadgeVariant = "default"|"applied"|"interviewing"|"offer"|"rejected";
interface BadgeProps { children: React.ReactNode; variant?: BadgeVariant; }

export const Badge: React.FC<BadgeProps> = ({ children, variant="default" }) => {
  const variants: Record<BadgeVariant,string> = {
    default:"bg-ink/5 text-ink", applied:"bg-status-applied/10 text-status-applied",
    interviewing:"bg-status-interviewing/10 text-status-interviewing", offer:"bg-status-offer/10 text-status-offer",
    rejected:"bg-status-rejected/10 text-status-rejected",
  };
  return <span className={clsx("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",variants[variant])}>
    {variant !== "default" && <span className={clsx("h-1.5 w-1.5 rounded-full",variant==="applied"&&"bg-status-applied",variant==="interviewing"&&"bg-status-interviewing",variant==="offer"&&"bg-status-offer",variant==="rejected"&&"bg-status-rejected")} aria-hidden="true" />}
    {children}
  </span>;
};