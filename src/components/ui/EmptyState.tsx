import React from "react";
import clsx from "clsx";
import { Button } from "./Button";

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div className={clsx("text-center py-12", className)}>
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
