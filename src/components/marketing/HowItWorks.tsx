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
    <div
      id="how-it-works"
      className={`bg-surface ${SECTION_PADDING_X} ${SECTION_PADDING_Y_SM}`}
    >
      <div className="mx-auto w-full max-w-content">
        <h2 className="text-center font-display text-xl font-bold text-ink md:text-2xl">
          How it works
        </h2>

        <div className="mx-auto mt-10 max-w-sm sm:max-w-2xl">
          <div className="flex flex-col gap-7 sm:flex-row sm:gap-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex gap-3 sm:flex-1 sm:flex-col sm:items-center sm:gap-2 sm:text-center"
              >
                <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${step.dot}`} />
                  <p className="font-data text-xs font-semibold text-muted">
                    {step.number}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-ink">{step.title}</p>
                  <p className="mt-1 text-xs text-muted sm:mx-auto sm:max-w-[13rem]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
