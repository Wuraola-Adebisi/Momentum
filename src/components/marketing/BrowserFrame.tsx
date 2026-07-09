// src/components/marketing/BrowserFrame.tsx
import { type ReactNode } from "react";

interface BrowserFrameProps {
  // Shown in the fake address bar, e.g. "momentum.app/applications".
  // Purely cosmetic, ties every product preview to the real app so
  // swapping in an actual screenshot later is a drop-in replacement.
  path: string;
  children: ReactNode;
}

export function BrowserFrame({ path, children }: BrowserFrameProps) {
  return (
    <div>
      <div className="flex items-center gap-1.5 rounded-t-xl border border-muted/20 bg-surface px-3.5 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-muted/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-muted/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-muted/20" />
        <span className="font-data ml-2 text-[9px] text-muted">{path}</span>
      </div>

      <div className="rounded-b-xl border border-t-0 border-muted/20 bg-surface p-4 shadow-[0_16px_36px_-20px_rgba(11,42,77,0.25)]">
        {children}
      </div>
    </div>
  );
}