import React from "react";
import clsx from "clsx";

interface Option {
  label: string;
  value: string;
}

interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  error?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  options,
  className,
  error,
  ...props
}) => {
  return (
    <select
      {...props}
      className={clsx(
        "h-10 w-full rounded-md border px-3 text-sm outline-none transition",
        "bg-surface text-ink",
        error
          ? "border-status-rejected focus:border-status-rejected"
          : "border-muted/30 focus:border-primary",
        className
      )}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};