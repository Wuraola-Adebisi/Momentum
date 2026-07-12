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
    label: "Board view",
    title: "Drag it where it belongs.",
    description:
      "Move a card between Applied, Interviewing, Offer, and Rejected. The status updates instantly, and rolls back automatically if the save fails.",
    preview: <BoardPreview />,
  },
  {
    key: "table",
    label: "Table view",
    title: "Scan everything at once.",
    description:
      "Sort by date, filter by status, search by company, all reflected in the URL so you can bookmark or share the exact view you built.",
    preview: <TablePreview />,
  },
  {
    key: "notes",
    label: "Notes & interviews",
    title: "Never lose the thread.",
    description:
      "Every note and every interview stays attached to the application it belongs to, opening right where you are.",
    preview: <NotesPreview />,
  },
];

export function ShowcaseTabs() {
  const [activeKey, setActiveKey] = useState(TABS[0].key);
  const activeTab = TABS.find((tab) => tab.key === activeKey) ?? TABS[0];

  return (
    <section
      id="showcase"
      className={`bg-surface ${SECTION_PADDING_X} ${SECTION_PADDING_Y}`}
    >
      <div className="mx-auto w-full max-w-content">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-3xl font-bold leading-tight text-ink md:text-4xl">
            One dataset, three ways to look at it.
          </h2>
        </div>

        <div
          role="tablist"
          aria-label="Momentum feature showcase"
          className="mt-10 flex flex-wrap justify-center gap-2 md:mt-12"
        >
          {TABS.map((tab) => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={tab.key === activeKey}
              onClick={() => setActiveKey(tab.key)}
              className={clsx(
                "rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors",
                tab.key === activeKey
                  ? "border-ink bg-ink text-white"
                  : "border-muted/20 text-muted hover:text-ink",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 items-stretch gap-5 md:mt-12 lg:grid-cols-[.85fr_1.15fr]">
          <div className="flex flex-col justify-center rounded-2xl bg-ink px-8 py-10 md:px-10">
            <h3 className="font-display text-2xl font-bold text-white">
              {activeTab.title}
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-white/65">
              {activeTab.description}
            </p>

            <Link
              to="/login?mode=signup"
              className="group mt-6 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-white"
            >
              Try {activeTab.label.toLowerCase()}
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="flex min-h-[260px] items-center justify-center rounded-2xl border border-muted/15 bg-paper p-6 md:p-8">
            {activeTab.preview}
          </div>
        </div>
      </div>
    </section>
  );
}
