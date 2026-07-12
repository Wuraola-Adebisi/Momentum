import { SECTION_PADDING_X, SECTION_PADDING_Y_SM } from "./layout";

const steps = [
  {
    number: "01",
    title: "Add an application",
    description: "Save the role, company, and link in seconds.",
  },
  {
    number: "02",
    title: "Track it through stages",
    description: "Applied, interviewing, offer, or rejected.",
  },
  {
    number: "03",
    title: "Never lose the thread",
    description: "Notes and interviews stay right where they belong.",
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

        <div className="mt-10 flex items-start justify-center">
          {steps.map((step, i) => (
            <div key={step.number} className="flex items-start">
              <div className="w-32 text-center sm:w-40">
                <p className="font-display text-xl font-extrabold text-primary">
                  {step.number}
                </p>

                <p className="mt-2 text-sm font-semibold text-ink">
                  {step.title}
                </p>

                <p className="mt-1 text-xs text-muted">{step.description}</p>
              </div>

              {i < steps.length - 1 && (
                <div className="mt-3 hidden h-px w-10 bg-muted/20 sm:block md:w-16" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
