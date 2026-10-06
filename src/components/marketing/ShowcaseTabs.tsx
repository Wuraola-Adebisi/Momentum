import { useState, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { BoardPreview } from "./BoardPreview";
import { TablePreview } from "./TablePreview";
import { NotesPreview } from "./NotesPreview";
import { SECTION_PADDING_X, SECTION_PADDING_Y } from "./layout";

interface Tab {
  key: string;
  label: string;
  title: string;
  description: string;
  preview: ReactNode;
}

const TABS: Tab[] = [
  {
    key: "board",
    label: "Board",
    title: "See the whole pipeline at a glance.",
    description: "Move applications between stages and immediately see where the search is concentrated.",
    preview: <BoardPreview />,
  },
  {
    key: "table",
    label: "Table",
    title: "Scan the details when you need them.",
    description: "Search, sort, and filter every application without losing the underlying record.",
    preview: <TablePreview />,
  },
  {
    key: "notes",
    label: "Notes",
    title: "Keep context attached to the work.",
    description: "Interview notes and application details stay together instead of disappearing into separate documents.",
    preview: <NotesPreview />,
  },
];

export function ShowcaseTabs() {
  const [activeKey, setActiveKey] = useState(TABS[0].key);
  const activeTab = TABS.find((tab) => tab.key === activeKey) ?? TABS[0];

  return (
    <section id="showcase" className={`bg-surface ${SECTION_PADDING_X} ${SECTION_PADDING_Y}`}>
      <div className="mx-auto max-w-content">
        <div className="flex flex-col justify-between gap-6 border-b border-line pb-7 md:flex-row md:items-end">
          <div>
            <p className="font-data text-[10px] uppercase tracking-[0.18em] text-muted">The product</p>
            <h2 className="mt-3 max-w-xl">One search. The right view for the moment.</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-muted">
            Momentum does not make you choose between a board, a spreadsheet, or a notebook. It keeps the same application record useful in all three.
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.55fr_1.45fr] lg:gap-12">
          <div className="border-y border-line divide-y divide-line">
            {TABS.map((tab, index) => (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={tab.key === activeKey}
                onClick={() => setActiveKey(tab.key)}
                className={clsx(
                  "group flex w-full items-start gap-4 px-0 py-6 text-left transition-colors",
                  tab.key === activeKey ? "text-ink" : "text-muted hover:text-ink",
                )}
              >
                <span className="font-data text-[10px] text-muted/60">0{index + 1}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold">{tab.label}</span>
                  <span className={clsx("mt-2 block text-sm leading-6", tab.key === activeKey ? "text-ink" : "text-muted")}>
                    {tab.title}
                  </span>
                </span>
                <ArrowRight
                  size={16}
                  className={clsx(
                    "mt-0.5 shrink-0 transition-transform duration-200",
                    tab.key === activeKey ? "text-primary translate-x-1" : "text-muted/50 group-hover:translate-x-1",
                  )}
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>

          <div className="min-h-[300px] border border-line bg-paper p-4 sm:p-7">
            <div className="mb-5 flex items-center justify-between border-b border-line pb-3">
              <p className="font-data text-[10px] uppercase tracking-[0.14em] text-muted">{activeTab.label} view</p>
              <Link to="/login?mode=signup" className="text-xs font-semibold text-primary hover:underline">
                Try it
              </Link>
            </div>
            <div className="flex min-h-[240px] items-center justify-center">
              {activeTab.preview}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
