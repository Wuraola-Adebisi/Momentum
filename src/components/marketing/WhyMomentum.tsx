import { BarChart3, CalendarClock, KanbanSquare, NotebookPen, Search, Zap } from "lucide-react";
import { SECTION_PADDING_X, SECTION_PADDING_Y } from "./layout";

const FEATURES = [
  {
    icon: KanbanSquare,
    title: "Board view",
    description:
      "Drag applications between Applied, Interviewing, Offer, and Rejected. Status and order persist instantly.",
  },
  {
    icon: Search,
    title: "Table view",
    description:
      "Sort, search, and filter every application at once without losing the context around each role.",
  },
  {
    icon: NotebookPen,
    title: "Notes & interviews",
    description:
      "Keep interview rounds, notes, links, and important details attached to the application they belong to.",
  },
  {
    icon: CalendarClock,
    title: "Know what is next",
    description:
      "Upcoming interviews and ageing applications surface the work that deserves attention.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description:
      "Response, interview, offer, and activity metrics show how the search is actually performing.",
  },
  {
    icon: Zap,
    title: "Less admin",
    description:
      "Update statuses, schedule interviews, and keep the pipeline current without fighting the interface.",
  },
];

export function WhyMomentum() {
  return (
    <section
      id="features"
      className={`bg-ink text-white ${SECTION_PADDING_X} ${SECTION_PADDING_Y}`}
    >
      <div className="mx-auto max-w-content">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <p className="font-data text-[10px] uppercase tracking-[0.18em] text-white/40">
              Everything in one place
            </p>
            <h2 className="mt-4 max-w-md text-white">
              Everything your job search actually needs.
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-white/55 md:text-lg">
              Built around the way applications really move, from a link you saved
              to an offer you are deciding on.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
            {FEATURES.map(({ icon: Icon, title, description }, index) => (
              <div
                key={title}
                className="group bg-ink p-6 transition-colors duration-200 hover:bg-white/[0.045] md:p-7"
              >
                <div className="flex items-start justify-between">
                  <span className="font-data text-[10px] text-white/25">
                    0{index + 1}
                  </span>
                  <Icon
                    size={18}
                    className="text-white/35 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-8 text-base font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/50">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
