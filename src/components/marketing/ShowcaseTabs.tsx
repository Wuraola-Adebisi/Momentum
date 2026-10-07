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
    title: "See the whole pipeline at a glance.",
    description:
      "Move applications between stages and immediately see where the search is concentrated.",
    preview: <BoardPreview />,
  },
  {
    key: "table",
    label: "Table view",
    title: "Scan the details when you need them.",
    description:
      "Search, sort, and filter every application without losing the underlying record.",
    preview: <TablePreview />,
  },
  {
    key: "notes",
    label: "Notes & interviews",
    title: "Keep the thread attached to the role.",
    description:
      "Interview notes and application details stay together instead of disappearing into separate documents.",
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
      <div className="mx-auto max-w-content">
        <div className="grid gap-8 border-b border-line pb-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="font-data text-[10px] uppercase tracking-[0.18em] text-muted">
              The product
            </p>
            <h2 className="mt-3 max-w-2xl">One dataset, three ways to look at it.</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-muted">
            The same application record stays useful whether you are moving cards,
            scanning details, or preparing for an interview.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Momentum feature showcase"
          className="mt-8 flex overflow-x-auto border-b border-line"
        >
          {TABS.map((tab) => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={tab.key === activeKey}
              onClick={() => setActiveKey(tab.key)}
              className={clsx(
                "relative shrink-0 px-4 py-4 text-sm font-semibold transition-colors first:pl-0",
                tab.key === activeKey
                  ? "text-ink"
                  : "text-muted hover:text-ink",
              )}
            >
              {tab.label}
              {tab.key === activeKey && (
                <span className="absolute inset-x-4 bottom-0 h-0.5 bg-primary first:left-0" />
              )}
            </button>
          ))}
        </div>

        <div className="mt-8 grid overflow-hidden border border-line bg-paper lg:grid-cols-[0.7fr_1.3fr]">
          <div className="flex flex-col justify-center border-b border-line p-7 sm:p-9 lg:border-b-0 lg:border-r lg:p-10">
            <span className="font-data text-[10px] uppercase tracking-[0.16em] text-muted">
              {activeTab.label}
            </span>
            <h3 className="mt-4 font-display text-2xl font-normal leading-tight text-ink md:text-3xl">
              {activeTab.title}
            </h3>
            <p className="mt-4 max-w-md text-sm leading-6 text-muted">
              {activeTab.description}
            </p>
            <Link
              to="/login?mode=signup"
              className="group mt-7 inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary"
            >
              Try {activeTab.label.toLowerCase()}
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>

          <div className="flex min-h-[310px] items-center overflow-hidden p-4 sm:p-7">
            <div className="w-full min-w-0">{activeTab.preview}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
