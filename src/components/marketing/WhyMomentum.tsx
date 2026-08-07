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
      "Sort and filter every application at once. Search, status, and sorting live in the URL, so a view is one link away.",
  },
  {
    title: "Notes & interviews",
    description:
      "Log interview rounds and keep running notes on every application, right inside its detail view.",
  },
  {
    title: "Analytics",
    description:
      "Response rate, applications per week, and time to first response. Understand the shape of your search, not just a list.",
  },
  {
    title: "Activity log",
    description:
      "Every status change, note, and scheduled interview is timestamped automatically. Nothing gets lost.",
  },
  {
    title: "Shareable filters",
    description:
      "Every filter, sort, and search lives in the URL. Bookmark a view and return exactly where you left off.",
  },
];

export function WhyMomentum() {
  return (
    <section
      id="features"
      className={`bg-ink text-white ${SECTION_PADDING_X} ${SECTION_PADDING_Y}`}
    >
      <div className="mx-auto max-w-content">
        <div className="max-w-2xl">
          <h2 className="text-white">
            Everything your job search actually needs.
          </h2>

          <p className="mt-5 text-base leading-relaxed text-white/60 md:text-lg">
            Built around the way applications really move, from a link you saved
            to an offer you're deciding on.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="
                group
                rounded-2xl
                border
                border-white/10
                bg-white/[0.04]
                p-6
                transition-all
                duration-200
                hover:-translate-y-1
                hover:border-white/20
                hover:bg-white/[0.07]
              "
            >
              <h3 className="text-base font-semibold text-white">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-white/55">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
