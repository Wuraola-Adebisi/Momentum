// src/components/marketing/ApplicationsPreviewCard.tsx
import { BrowserFrame } from "./BrowserFrame";
import { Badge } from "../ui/Badge";

export function ApplicationsPreviewCard() {
  return (
    <div className="relative mx-auto max-w-sm">
      <BrowserFrame path="momentum.app/applications">
        <p className="mb-3 font-display text-sm font-bold text-ink">
          Applications
        </p>

        <div className="flex items-center justify-between border-b border-muted/10 py-2">
          <span className="text-sm font-medium text-ink">Anchor Studios</span>
          <Badge variant="interviewing">Interviewing</Badge>
        </div>

        <div className="flex items-center justify-between border-b border-muted/10 py-2">
          <span className="text-sm font-medium text-ink">Fieldstone Labs</span>
          <Badge variant="applied">Applied</Badge>
        </div>

        <div className="flex items-center justify-between py-2">
          <span className="text-sm font-medium text-ink">Northfall</span>
          <Badge variant="offer">Offer</Badge>
        </div>
      </BrowserFrame>

      <div className="absolute -bottom-5 -right-6 rounded-xl bg-ink px-3.5 py-2.5 shadow-[0_12px_24px_-12px_rgba(11,42,77,0.4)]">
        <p className="font-data text-base font-semibold text-white">3</p>
        <p className="text-[9px] text-white/70">interviews this week</p>
      </div>
    </div>
  );
}