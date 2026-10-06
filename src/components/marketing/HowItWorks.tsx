import { SECTION_PADDING_X, SECTION_PADDING_Y_SM } from "./layout";

const steps = [
  { number: "01", title: "Add it", description: "Save the role, company, and link in seconds.", dot: "bg-status-applied" },
  { number: "02", title: "Move it", description: "Track the application as the conversation changes.", dot: "bg-status-interviewing" },
  { number: "03", title: "Act on it", description: "Use notes, interviews, and signals to decide what happens next.", dot: "bg-status-offer" },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className={`border-t border-line/70 bg-paper ${SECTION_PADDING_X} ${SECTION_PADDING_Y_SM}`}>
      <div className="mx-auto max-w-content">
        <div className="grid gap-8 md:grid-cols-[0.55fr_1.45fr] md:gap-16">
          <div>
            <p className="font-data text-[10px] uppercase tracking-[0.18em] text-muted">Workflow</p>
            <h2 className="mt-3 max-w-sm">Simple enough to use every day.</h2>
          </div>

          <div className="grid divide-y border-y border-line/70 md:grid-cols-3 md:divide-x md:divide-y-0">
            {steps.map((step) => (
              <div key={step.number} className="px-0 py-7 md:px-7 md:first:pl-0 md:last:pr-0">
                <div className={`h-2 w-2 rounded-full ${step.dot}`} />
                <p className="mt-5 font-data text-xs text-muted">{step.number}</p>
                <p className="mt-2 text-base font-semibold text-ink">{step.title}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
