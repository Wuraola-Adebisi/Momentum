import React from "react";
import clsx from "clsx";

interface FieldProps {
  label?: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

export const Field: React.FC<FieldProps> = ({
  label,
  error,
  hint,
  children,
  className,
}) => {
  return (
    <div className={clsx("flex flex-col gap-1", className)}>
      {label && (
        <label className="text-sm font-medium text-ink">
          {label}
        </label>
      )}

      {children}

      {error && (
        <span className="text-xs text-status-rejected">
          {error}
        </span>
      )}

      {!error && hint && (
        <span className="text-xs text-muted">
          {hint}
        </span>
      )}
    </div>
  );
};