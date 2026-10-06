import { BarChart3, CalendarClock, KanbanSquare, NotebookPen, Search, Zap } from "lucide-react";
import { SECTION_PADDING_X, SECTION_PADDING_Y } from "./layout";

const FEATURES = [
  { icon: KanbanSquare, title: "A pipeline you can see", description: "Know what is Applied, what reached an interview, what turned into an offer, and what is done." },
  { icon: Search, title: "Find anything fast", description: "Search and filter your applications without losing the context around them." },
  { icon: NotebookPen, title: "Keep the thread", description: "Store notes, interview rounds, links, and the details you will otherwise forget." },
  { icon: CalendarClock, title: "Know what is next", description: "Upcoming interviews and ageing applications surface the work that deserves attention." },
  { icon: BarChart3, title: "Read the pattern", description: "Response, interview, offer, and activity metrics show how the search is actually performing." },
  { icon: Zap, title: "Move without friction", description: "Change status, schedule interviews, and update applications without fighting the interface." },
];

export function WhyMomentum() {
  return (
    <section id="features" className={`bg-ink text-white ${SECTION_PADDING_X} ${SECTION_PADDING_Y}`}>
      <div className="mx-auto max-w-content">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <p className="font-data text-[10px] uppercase tracking-[0.18em] text-white/45">The point</p>
            <h2 className="mt-3 max-w-md text-white">A job search is a process. Treat it like one.</h2>
            <p className="mt-5 max-w-md text-base leading-7 text-white/55">
              Spreadsheets can hold a list. Momentum is built to help you operate the search around that list.
            </p>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {FEATURES.map(({ icon: Icon, title, description }, index) => (
              <div key={title} className="group grid gap-4 py-6 sm:grid-cols-[auto_1fr_auto] sm:items-start sm:gap-6">
                <span className="font-data text-[10px] text-white/30">0{index + 1}</span>
                <div>
                  <h3 className="text-base font-semibold text-white">{title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-white/50">{description}</p>
                </div>
                <Icon size={18} className="hidden text-white/35 transition-transform duration-200 group-hover:translate-x-1 sm:block" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
