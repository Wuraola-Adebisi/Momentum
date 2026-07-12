import { SECTION_PADDING_X, SECTION_PADDING_Y_SM } from "./layout";

export function ProblemFraming() {
  return (
    <div
      className={`mx-auto w-full max-w-content text-center ${SECTION_PADDING_X} ${SECTION_PADDING_Y_SM}`}
    >
      <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
        Job hunting shouldn't live in six different tabs.
      </h2>

      <p className="mx-auto mt-4 max-w-lg text-base text-muted">
        A spreadsheet you forget to update. A browser history you can't search.
        A follow-up you meant to send three weeks ago. Momentum replaces all of
        it with one place that actually keeps up with you.
      </p>
    </div>
  );
}
