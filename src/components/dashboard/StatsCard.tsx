import React from "react";
import clsx from "clsx";
import type { LucideIcon } from "lucide-react";
import { Card } from "../ui/Card";

type StatAccent = "primary" | "interviewing" | "offer" | "ink";

interface StatsCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  accent?: StatAccent;
}

const ACCENT_STYLES: Record<StatAccent, string> = {
  primary: "bg-primary/10 text-primary",
  interviewing: "bg-status-interviewing/10 text-status-interviewing",
  offer: "bg-status-offer/10 text-status-offer",
  ink: "bg-ink/10 text-ink",
};

export const StatsCard: React.FC<StatsCardProps> = ({
  label,
  value,
  icon: Icon,
  accent = "primary",
}) => {
  return (
    <Card padding="md" className="flex items-center gap-4">
      <div
        className={clsx(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
          ACCENT_STYLES[accent],
        )}
      >
        <Icon size={20} />
      </div>

      <div className="min-w-0">
        <p className="truncate font-body text-sm text-muted">{label}</p>
        <p className="font-display text-2xl font-bold text-ink">{value}</p>
      </div>
    </Card>
  );
};