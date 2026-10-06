import { type ReactNode } from "react";

interface BrowserFrameProps {
  path: string;
  children: ReactNode;
}

export function BrowserFrame({ path, children }: BrowserFrameProps) {
  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-[560px] items-center gap-2 border-b border-line bg-surface px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-muted/25" />
        <span className="h-1.5 w-1.5 rounded-full bg-muted/25" />
        <span className="h-1.5 w-1.5 rounded-full bg-muted/25" />
        <span className="ml-2 border-l border-line pl-3 font-data text-[9px] text-muted">{path}</span>
      </div>
      <div className="min-w-[560px] bg-paper p-4 sm:p-5">
        {children}
      </div>
    </div>
  );
}
