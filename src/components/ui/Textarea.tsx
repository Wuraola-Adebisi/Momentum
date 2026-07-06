import React from "react";
import clsx from "clsx";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({
  className,
  error,
  ...props
}) => {
  return (
    <textarea
      {...props}
      className={clsx(
        "min-h-[100px] w-full rounded-md border px-3 py-2 text-sm outline-none transition resize-none",
        "bg-surface text-ink placeholder:text-muted",
        error
          ? "border-status-rejected focus:border-status-rejected"
          : "border-muted/30 focus:border-primary",
        className
      )}
    />
  );
};