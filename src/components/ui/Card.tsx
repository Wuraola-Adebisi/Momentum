import React from "react";
import clsx from "clsx";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  padding?: "sm" | "md" | "lg";
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, padding = "md", hoverable = false, className, ...props }) => {
  const paddingStyles = { sm: "p-3", md: "p-5", lg: "p-6 md:p-7" };
  return (
    <div
      {...props}
      className={clsx(
        "rounded-2xl border border-line/80 bg-surface shadow-[0_1px_0_rgba(16,33,59,0.03)] transition-[box-shadow,transform,border-color]",
        paddingStyles[padding],
        hoverable && "cursor-pointer hover:-translate-y-0.5 hover:border-line hover:shadow-soft",
        className,
      )}
    >{children}</div>
  );
};