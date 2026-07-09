// src/components/ui/Button.tsx
import React from "react";
import clsx from "clsx";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "destructive"
  | "accent";

type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
    "inline-flex items-center justify-center font-medium rounded-full transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none";

  const variants: Record<ButtonVariant, string> = {
    // Ink pill button, the default primary CTA everywhere
    primary:
      "bg-ink text-paper hover:opacity-90",

    secondary:
      "bg-surface text-ink border border-muted/20 hover:bg-paper",

    ghost:
      "bg-transparent text-ink hover:bg-muted/10",

    destructive:
      "bg-status-rejected text-white hover:opacity-90",

    // Blue, the single brand accent: quick-add button, active nav state,
    // primary form actions. White text for contrast against a saturated blue.
    accent:
      "bg-primary text-white hover:opacity-90",
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
      {loading ? (
        <span className="opacity-70">Loading...</span>
      ) : (
        children
      )}
    </button>
  );
};