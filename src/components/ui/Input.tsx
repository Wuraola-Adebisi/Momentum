import React from "react";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input: React.FC<InputProps> = ({ className, error, ...props }) => {
  return (
    <input
      {...props}
      className={clsx(
        "h-10 w-full rounded-md border px-3 text-sm outline-none transition",
        "bg-surface text-ink placeholder:text-muted",
        error
          ? "border-status-rejected focus:border-status-rejected"
          : "border-muted/30 focus:border-primary",
        className,
      )}
    />
  );
};
