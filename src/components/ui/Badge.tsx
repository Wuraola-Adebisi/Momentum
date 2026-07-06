import React from "react";
import clsx from "clsx";

type BadgeVariant =
  | "default"
  | "applied"
  | "interviewing"
  | "offer"
  | "rejected";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
}) => {
  const base =
    "inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full";

  const variants: Record<BadgeVariant, string> = {
    default: "bg-muted/10 text-ink",

    applied: "bg-status-applied/15 text-status-applied",

    interviewing: "bg-status-interviewing/15 text-status-interviewing",

    offer: "bg-status-offer/15 text-status-offer",

    rejected: "bg-status-rejected/15 text-status-rejected",
  };

  return (
    <span className={clsx(base, variants[variant])}>
      {children}
    </span>
  );
};