import {
  LayoutGrid,
  Table2,
  StickyNote,
  BarChart3,
  History,
  Link2,
  type LucideIcon,
} from "lucide-react";
import { SECTION_PADDING_X, SECTION_PADDING_Y } from "./layout";

interface Feature {
  icon: LucideIcon;
  iconClass: string;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: LayoutGrid,
    iconClass: "bg-primary/15 text-primary",
    title: "Board view",
    description:
      "Drag applications between Applied, Interviewing, Offer, and Rejected. Status and order persist instantly.",
  },
  {
    icon: Table2,
    iconClass: "bg-status-interviewing/15 text-status-interviewing",
    title: "Table view",
    description:
      "Sort and filter every application at once. Search, status, and sort all live in the URL, so a view is one link away.",
  },
  {
    icon: StickyNote,
    iconClass: "bg-status-offer/15 text-status-offer",
    title: "Notes & interviews",
    description:
      "Log interview rounds and keep running notes on every application, right inside its detail view.",
  },
  {
    icon: BarChart3,
    iconClass: "bg-primary/15 text-primary",
    title: "Analytics",
    description:
      "Response rate, applications per week, and time to a first response, the shape of your search, not just a list of it.",
  },
  {
    icon: History,
    iconClass: "bg-status-rejected/15 text-status-rejected",
    title: "Activity log",
    description:
      "Every status change, note, and scheduled interview is timestamped automatically. Nothing gets lost.",
  },
  {
    icon: Link2,
    iconClass: "bg-status-interviewing/15 text-status-interviewing",
    title: "Shareable filters",
    description:
      "Every filter, sort, and search lives in the URL. Bookmark a view, hit back, and it's exactly how you left it.",
  },
];

export function WhyMomentum() {
  return (
    <section
      id="features"
      className={`bg-ink text-white ${SECTION_PADDING_X} ${SECTION_PADDING_Y}`}
    >
      <div className="mx-auto w-full max-w-content">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">
            Everything your job search actually needs.
          </h2>
          <p className="mt-4 text-base text-white/60">
            Built around the way applications really move, from a link you saved
            to an offer you're deciding on.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 md:mt-16">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/[0.08]"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${feature.iconClass}`}
              >
                <feature.icon size={19} />
              </div>

              <h3 className="mt-5 text-base font-semibold text-white">
                {feature.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-white/55">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
