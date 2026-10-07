import { SECTION_PADDING_X, SECTION_PADDING_Y_SM } from "./layout";

const steps = [
  {
    number: "01",
    title: "Add an application",
    description: "Save the role, company, and link in seconds.",
    dot: "bg-status-applied",
  },
  {
    number: "02",
    title: "Track it through stages",
    description: "Applied, interviewing, offer, or rejected.",
    dot: "bg-status-interviewing",
  },
  {
    number: "03",
    title: "Never lose the thread",
    description: "Notes and interviews stay right where they belong.",
    dot: "bg-status-offer",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className={`bg-paper ${SECTION_PADDING_X} ${SECTION_PADDING_Y_SM}`}
    >
      <div className="mx-auto max-w-content">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-data text-[10px] uppercase tracking-[0.18em] text-muted">
            How it works
          </p>
          <h2 className="mt-3">Simple enough to use every day.</h2>
        </div>

        <div className="mx-auto mt-12 max-w-4xl">
          <div className="relative grid gap-8 sm:grid-cols-3 sm:gap-6">
            <div className="absolute left-1/2 top-3 hidden h-px w-[62%] -translate-x-1/2 bg-line sm:block" />

            {steps.map((step) => (
              <div
                key={step.number}
                className="relative flex flex-col items-center text-center transition-transform duration-200 hover:-translate-y-1"
              >
                <div
                  className={`relative z-10 h-2.5 w-2.5 rounded-full ${step.dot} ring-8 ring-paper`}
                />

                <p className="mt-6 font-data text-xs font-semibold text-muted">
                  {step.number}
                </p>
                <p className="mt-2 text-sm font-semibold text-ink">{step.title}</p>
                <p className="mt-2 max-w-[13rem] text-xs leading-6 text-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
