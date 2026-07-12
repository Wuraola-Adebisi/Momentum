import { CalendarClock } from "lucide-react";
import { BrowserFrame } from "./BrowserFrame";

interface Column {
  label: string;
  dotClass: string;
  cards: { company: string; role: string }[];
}

// Illustrative demo data for the preview only, not real user data.
const columns: Column[] = [
  {
    label: "Applied",
    dotClass: "bg-status-applied",
    cards: [
      { company: "Anthropic", role: "Frontend Eng" },
      { company: "Vercel", role: "Product Design" },
    ],
  },
  {
    label: "Interviewing",
    dotClass: "bg-status-interviewing",
    cards: [{ company: "Stripe", role: "UI Engineer" }],
  },
  {
    label: "Offer",
    dotClass: "bg-status-offer",
    cards: [{ company: "Linear", role: "Frontend Lead" }],
  },
  {
    label: "Rejected",
    dotClass: "bg-status-rejected",
    cards: [{ company: "Figma", role: "Design Eng" }],
  },
];

const cardBorderClass: Record<string, string> = {
  Applied: "border-l-status-applied",
  Interviewing: "border-l-status-interviewing",
  Offer: "border-l-status-offer",
  Rejected: "border-l-status-rejected",
};

// Ring math for the 68% response-rate stat card: r = 16, so
// circumference = 2 * PI * 16 = ~100.5. The dash offset leaves 68% of
// the ring visible.
const RING_RADIUS = 16;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const RING_PERCENT = 0.68;

export function ApplicationsPreviewCard() {
  return (
    <div className="relative mx-auto max-w-md pb-8 pt-2">
      <BrowserFrame path="momentum.app/applications?view=board">
        <p className="mb-3 font-data text-[10px] font-semibold uppercase tracking-wide text-muted">
          Applications &middot; Board view
        </p>

        <div className="grid grid-cols-4 gap-2">
          {columns.map((column) => (
            <div key={column.label}>
              <p className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold text-muted">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${column.dotClass}`}
                />
                <span className="hidden sm:inline">{column.label}</span>
              </p>

              <div className="flex flex-col gap-1.5">
                {column.cards.map((card) => (
                  <div
                    key={card.company}
                    className={`rounded-lg border-l-[3px] bg-paper px-2 py-1.5 shadow-sm ${cardBorderClass[column.label]}`}
                  >
                    <p className="truncate text-[11px] font-semibold text-ink">
                      {card.company}
                    </p>
                    <p className="truncate text-[9px] text-muted">
                      {card.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </BrowserFrame>

      <div className="absolute -bottom-2 -left-4 flex items-center gap-3 rounded-xl border border-muted/10 bg-surface px-4 py-3 shadow-[0_20px_40px_-16px_rgba(11,42,77,0.30)] sm:-left-7">
        <svg width="40" height="40" viewBox="0 0 40 40" className="shrink-0">
          <circle
            cx="20"
            cy="20"
            r={RING_RADIUS}
            fill="none"
            className="stroke-muted/15"
            strokeWidth="4"
          />
          <circle
            cx="20"
            cy="20"
            r={RING_RADIUS}
            fill="none"
            className="stroke-status-offer"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={RING_CIRCUMFERENCE}
            strokeDashoffset={RING_CIRCUMFERENCE * (1 - RING_PERCENT)}
            transform="rotate(-90 20 20)"
          />
        </svg>
        <div>
          <p className="font-data text-lg font-semibold leading-none text-ink">
            68%
          </p>
          <p className="mt-1 text-[10px] text-muted">response rate</p>
        </div>
      </div>

      <div className="absolute -right-2 top-2 hidden max-w-[170px] items-center gap-2.5 rounded-xl border border-muted/10 bg-surface px-3.5 py-2.5 shadow-[0_20px_40px_-16px_rgba(11,42,77,0.30)] sm:-right-5 sm:flex">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-status-interviewing/12 text-status-interviewing">
          <CalendarClock size={16} />
        </div>
        <div>
          <p className="text-xs font-semibold leading-tight text-ink">
            Interview tomorrow
          </p>
          <p className="text-[10px] text-muted">Stripe &middot; 2:00 PM</p>
        </div>
      </div>
    </div>
  );
}
