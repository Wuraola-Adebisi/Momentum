import React, { useEffect, useRef, useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  options: Option[];
  onSelect: (value: string) => void;
  label?: string;
  trigger?: React.ReactNode;
  /** Accessible name for the trigger button. Required whenever `trigger` is icon-only (no visible text), since there's nothing else for a screen reader to announce. */
  triggerAriaLabel?: string;
  align?: "left" | "right";
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  label = "Select",
  trigger,
  triggerAriaLabel,
  align = "left",
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        aria-label={trigger ? triggerAriaLabel : undefined}
        aria-haspopup="menu"
        aria-expanded={open}
        className={
          trigger
            ? ""
            : "h-10 rounded-md border border-muted/30 bg-surface px-3 text-sm"
        }
      >
        {trigger ?? label}
      </button>

      {open && (
        <div
          className={`absolute z-10 mt-2 w-48 rounded-md border border-muted/20 bg-surface shadow-md ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onSelect(option.value);
                setOpen(false);
              }}
              className="block w-full px-4 py-2 text-left text-sm text-ink hover:bg-muted/10"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};