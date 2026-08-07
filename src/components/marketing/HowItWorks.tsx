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
      className={`bg-surface ${SECTION_PADDING_X} ${SECTION_PADDING_Y_SM}`}
    >
      <div className="mx-auto max-w-content">
        <h2 className="text-center">How it works</h2>

        <div className="mx-auto mt-12 max-w-3xl">
          <div className="relative grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
            <div className="absolute left-1/2 top-3 hidden h-px w-[60%] -translate-x-1/2 bg-muted/20 sm:block" />

            {steps.map((step) => (
              <div
                key={step.number}
                className="
                  relative
                  flex
                  flex-col
                  items-center
                  text-center
                  transition-transform
                  duration-200
                  hover:-translate-y-1
                "
              >
                <div
                  className={`
                    relative
                    z-10
                    flex
                    h-6
                    w-6
                    items-center
                    justify-center
                    rounded-full
                    ${step.dot}
                    ring-4
                    ring-surface
                  `}
                />

                <p className="mt-4 font-data text-xs font-semibold text-muted">
                  {step.number}
                </p>

                <p className="mt-2 text-sm font-semibold text-ink">
                  {step.title}
                </p>

                <p className="mt-2 max-w-[13rem] text-xs leading-relaxed text-muted">
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
