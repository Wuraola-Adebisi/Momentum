import React from "react";
import clsx from "clsx";
import type { LucideIcon } from "lucide-react";
import { Button } from "./Button";

type EmptyStateTone = "primary" | "error" | "muted";

interface EmptyStateProps {
  icon?: LucideIcon;
  tone?: EmptyStateTone;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const TONE_STYLES: Record<EmptyStateTone, string> = {
  primary: "bg-primary/10 text-primary",
  error: "bg-status-rejected/10 text-status-rejected",
  muted: "bg-muted/10 text-muted",
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  tone = "primary",
  title,
  description,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div className={clsx("text-center py-12", className)}>
      {Icon && (
        <div
          className={clsx(
            "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full",
            TONE_STYLES[tone],
          )}
        >
          <Icon size={26} />
        </div>
      )}

      <h3 className="text-lg font-semibold text-ink">{title}</h3>

      {description && <p className="text-sm text-muted mt-1">{description}</p>}

      {actionLabel && onAction && (
        <div className="mt-4">
          <Button onClick={onAction} variant="primary">
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
};