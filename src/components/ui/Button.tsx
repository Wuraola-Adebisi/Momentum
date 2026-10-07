import React from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive" | "accent";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ variant="primary", size="md", loading=false, disabled, className, children, ...props }) => {
  const variants: Record<ButtonVariant,string> = {
    primary: "bg-ink text-paper hover:bg-ink/90 hover:shadow-soft",
    secondary: "border border-line bg-surface text-ink hover:border-ink/20 hover:bg-paper",
    ghost: "bg-transparent text-ink hover:bg-ink/5",
    destructive: "bg-status-rejected text-white hover:bg-status-rejected/90 hover:shadow-soft",
    accent: "bg-primary text-white hover:bg-primary/90 hover:shadow-soft",
  };
  const sizes: Record<ButtonSize,string> = { sm:"min-h-10 px-3.5 text-sm", md:"min-h-11 px-4.5 text-sm", lg:"min-h-12 px-6 text-base" };
  return (
    <button
      {...props}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={clsx("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 active:translate-y-px",variants[variant],sizes[size],className)}
    >
      {loading ? <><span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" /><span>{children}</span></> : children}
    </button>
  );
};