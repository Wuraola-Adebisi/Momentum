import { SECTION_PADDING_X, SECTION_PADDING_Y } from "./layout";

interface Feature {
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    title: "Board view",
    description:
      "Drag applications between Applied, Interviewing, Offer, and Rejected. Status and order persist instantly.",
  },
  {
    title: "Table view",
    description:
      "Sort and filter every application at once. Search, status, and sort all live in the URL, so a view is one link away.",
  },
  {
    title: "Notes & interviews",
    description:
      "Log interview rounds and keep running notes on every application, right inside its detail view.",
  },
  {
    title: "Analytics",
    description:
      "Response rate, applications per week, and time to a first response, the shape of your search, not just a list of it.",
  },
  {
    title: "Activity log",
    description:
      "Every status change, note, and scheduled interview is timestamped automatically. Nothing gets lost.",
  },
  {
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
        <div className="max-w-xl">
          <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">
            Everything your job search actually needs.
          </h2>
          <p className="mt-4 text-base text-white/60">
            Built around the way applications really move, from a link you saved
            to an offer you're deciding on.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl bg-white/[0.06] p-6 transition-colors hover:bg-white/[0.09]"
            >
              <h3 className="text-base font-semibold text-white">
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
