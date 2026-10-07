import { BrowserFrame } from "./BrowserFrame";

const columns = [
  {
    label: "Applied",
    color: "text-muted",
    count: "12",
    cards: [
      ["Fieldstone", "Frontend Engineer", "2d"],
      ["Verge Systems", "UI Engineer", "4d"],
      ["Lattice Works", "Product Engineer", "6d"],
    ],
  },
  {
    label: "Interviewing",
    color: "text-status-interviewing",
    count: "07",
    cards: [
      ["Anchor Studios", "Frontend Developer", "Tomorrow"],
      ["Northstar", "React Engineer", "Fri"],
    ],
  },
  {
    label: "Offer",
    color: "text-status-offer",
    count: "02",
    cards: [
      ["Northfall", "Frontend Engineer", "Deciding"],
    ],
  },
];

export function BoardPreview() {
  return (
    <BrowserFrame path="momentum.app/applications?view=board">
      <div className="grid min-w-[520px] grid-cols-3 gap-3 sm:min-w-0">
        {columns.map((column) => (
          <div key={column.label} className="min-w-0">
            <div className="mb-2 flex items-center justify-between border-b border-line pb-2">
              <div className="flex items-center gap-2">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${column.color.replace("text-", "bg-")}`}
                />
                <p
                  className={`font-data text-[9px] font-medium uppercase tracking-[0.12em] ${column.color}`}
                >
                  {column.label}
                </p>
              </div>
              <span className="font-data text-[9px] text-muted">{column.count}</span>
            </div>

            <div className="flex flex-col gap-2">
              {column.cards.map(([company, role, date]) => (
                <div
                  key={company}
                  className="border border-line bg-surface p-3 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <p className="truncate text-[11px] font-semibold text-ink">{company}</p>
                  <p className="mt-1 truncate text-[10px] text-muted">{role}</p>
                  <div className="mt-3 flex items-center justify-between border-t border-line pt-2">
                    <span className="font-data text-[8px] uppercase tracking-wide text-muted">
                      {date}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-status-applied" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </BrowserFrame>
  );
}
