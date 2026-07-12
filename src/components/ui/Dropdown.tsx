import React, { useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  options: Option[];
  onSelect: (value: string) => void;
  label?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  label = "Select",
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen((v) => !v)}
        className="h-10 rounded-md border border-muted/30 bg-surface px-3 text-sm"
      >
        {label}
      </button>

      {open && (
        <div className="absolute mt-2 w-48 rounded-md border border-muted/20 bg-surface shadow-md">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onSelect(opt.value);
                setOpen(false);
              }}
              className="cursor-pointer px-3 py-2 text-sm hover:bg-paper"
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
