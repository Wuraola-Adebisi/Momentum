// src/components/marketing/TablePreview.tsx
import { BrowserFrame } from "./BrowserFrame";
import { Badge } from "../ui/Badge";

const rows = [
  { company: "Anchor Studios", variant: "interviewing" as const },
  { company: "Northfall", variant: "offer" as const },
];

export function TablePreview() {
  return (
    <BrowserFrame path="momentum.app/applications?view=table">
      <div className="flex justify-between border-b border-muted/10 pb-2 font-data text-[10px] font-semibold uppercase tracking-wide text-muted">
        <span>Company</span>
        <span>Status</span>
      </div>

      {rows.map((row) => (
        <div
          key={row.company}
          className="flex items-center justify-between border-b border-muted/10 py-2 last:border-b-0"
        >
          <span className="text-sm font-semibold text-ink">
            {row.company}
          </span>
          <Badge variant={row.variant}>
            {row.variant.charAt(0).toUpperCase() + row.variant.slice(1)}
          </Badge>
        </div>
      ))}
    </BrowserFrame>
  );
}