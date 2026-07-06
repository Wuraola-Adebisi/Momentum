import React from "react";
import clsx from "clsx";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  side?: "left" | "right";
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  children,
  side = "right",
}) => {
  return (
    <div
      className={clsx(
        "fixed inset-0 z-50",
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
    >
      {/* overlay */}
      <div
        className={clsx(
          "absolute inset-0 bg-black/40 transition-opacity",
          open ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      {/* panel */}
      <div
        className={clsx(
          "absolute top-0 h-full w-96 bg-surface shadow-lg transition-transform",
          side === "right" ? "right-0" : "left-0",
          open
            ? "translate-x-0"
            : side === "right"
            ? "translate-x-full"
            : "-translate-x-full"
        )}
      >
        {children}
      </div>
    </div>
  );
};