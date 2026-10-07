import { type ReactNode } from "react";

interface BrowserFrameProps {
  path: string;
  children: ReactNode;
}

export function BrowserFrame({ path, children }: BrowserFrameProps) {
  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-[520px] items-center gap-2 border border-line bg-surface px-3.5 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-muted/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-muted/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-muted/20" />
        <span className="ml-2 border-l border-line pl-3 font-data text-[9px] text-muted">
          {path}
        </span>
      </div>
      <div className="min-w-[520px] border-x border-b border-line bg-surface p-4 sm:p-5">
        {children}
      </div>
    </div>
  );
}
