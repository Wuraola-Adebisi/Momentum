import { SECTION_PADDING_X, SECTION_PADDING_Y } from "./layout";

const PILLARS = [
  {
    phrase: "One board, one source of truth",
    description:
      "Every application lives in one place, viewable as a board or a table, filtered and sorted the same way either time.",
  },
  {
    phrase: "Nothing tracked by hand",
    description:
      "Status changes, notes, and interviews write to an activity log automatically. You never have to remember to log anything.",
  },
  {
    phrase: "Built to be looked at daily",
    description:
      "Fast to open, fast to update, designed for the few minutes a day you're actually willing to give it.",
  },
];

export function Pillars() {
  return (
    <section className={`bg-paper ${SECTION_PADDING_X} ${SECTION_PADDING_Y}`}>
      <div className="mx-auto w-full max-w-content">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-3xl font-bold leading-tight text-ink md:text-4xl">
            Built to actually <span className="text-primary">get used</span>.
          </h2>
          <p className="mt-4 text-base text-muted">
            Not a spreadsheet template. Not a board you set up once and abandon
            in week two.
          </p>
        </div>

        <div className="mt-14 divide-y divide-muted/10 border-y border-muted/10 md:mt-16 md:grid md:grid-cols-3 md:divide-x md:divide-y-0">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.phrase}
              className="py-7 first:pt-0 last:pb-0 md:px-8 md:py-2 md:first:pl-0 md:last:pr-0"
            >
              <p className="font-display text-lg font-bold text-ink">
                {pillar.phrase}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
