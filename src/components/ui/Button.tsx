import React from "react";
import clsx from "clsx";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "destructive"
  | "accent";

type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className,
  children,
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-200 ease-out focus:outline-none disabled:opacity-50 disabled:pointer-events-none";

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-ink text-paper hover:bg-ink/90 hover:shadow-md active:bg-ink",

    secondary:
      "bg-surface text-ink border border-muted/20 hover:border-muted/40 hover:bg-paper",

    ghost: "bg-transparent text-ink hover:bg-muted/10",

    destructive:
      "bg-status-rejected text-white hover:bg-status-rejected/90 hover:shadow-md",

    accent: "bg-primary text-white hover:bg-primary/90 hover:shadow-md",
  };

  const sizes: Record<ButtonSize, string> = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
  };

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={clsx(base, variants[variant], sizes[size], className)}
    >
      {loading ? <span className="opacity-70">Loading...</span> : children}
    </button>
  );
};
