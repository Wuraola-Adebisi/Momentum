import React from "react";
import clsx from "clsx";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  padding?: "sm" | "md" | "lg";
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  padding = "md",
  hoverable = false,
  className,
  ...props
}) => {
  const base = "rounded-md border border-muted/20 bg-surface transition";

  const paddingStyles = {
    sm: "p-3",
    md: "p-5",
    lg: "p-6",
  };

  return (
    <div
      {...props}
      className={clsx(
        base,
        paddingStyles[padding],
        hoverable && "hover:shadow-sm cursor-pointer",
        className,
      )}
    >
      {children}
    </div>
  );
};
