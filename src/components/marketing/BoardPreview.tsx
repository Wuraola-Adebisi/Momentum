// src/components/marketing/BoardPreview.tsx
import { BrowserFrame } from "./BrowserFrame";

const columns = [
  {
    label: "Applied",
    color: "text-muted",
    cards: ["Fieldstone", "Verge Sys."],
  },
  {
    label: "Interview",
    color: "text-status-interviewing",
    cards: ["Anchor"],
  },
  {
    label: "Offer",
    color: "text-status-offer",
    cards: ["Northfall"],
  },
];

export function BoardPreview() {
  return (
    <BrowserFrame path="momentum.app/applications?view=board">
      <div className="grid grid-cols-3 gap-2">
        {columns.map((column) => (
          <div key={column.label}>
            <p
              className={`font-data mb-2 text-[10px] font-semibold uppercase tracking-wide ${column.color}`}
            >
              {column.label}
            </p>

            <div className="flex flex-col gap-1.5">
              {column.cards.map((card) => (
                <div
                  key={card}
                  className="rounded-lg bg-paper px-2 py-2 text-xs font-semibold text-ink"
                >
                  {card}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </BrowserFrame>
  );
}
