import React, { useState } from "react";
import clsx from "clsx";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {children}
      </div>

      {open && (
        <div
          className={clsx(
            "absolute -top-8 left-1/2 -translate-x-1/2",
            "rounded bg-ink px-2 py-1 text-xs text-white"
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
};