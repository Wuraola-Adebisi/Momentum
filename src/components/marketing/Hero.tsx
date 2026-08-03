import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import { ApplicationsPreviewCard } from "./ApplicationsPreviewCard";
import { SECTION_PADDING_X, SECTION_PADDING_Y } from "./layout";

const FEATURE_PILLS = [
  "Board view",
  "Table view",
  "Notes & interviews",
  "Analytics",
  "Activity log",
];

export function Hero() {
  return (
    <div
      className={`mx-auto w-full max-w-content text-center ${SECTION_PADDING_X} ${SECTION_PADDING_Y}`}
    >
      <h1 className="mx-auto max-w-2xl font-display text-4xl font-extrabold leading-[1.12] text-ink sm:text-5xl xl:text-[56px]">
        Turn a scattered job search into{" "}
        <span className="text-primary">momentum</span>.
      </h1>

      <p className="mx-auto mt-5 max-w-md text-base text-muted md:text-lg">
        Track every application, interview, and offer in one board. No
        spreadsheets, no sticky notes, no forgetting who you owe a follow up.
      </p>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link to="/login?mode=signup">
          <Button variant="primary" size="lg">
            Start tracking
          </Button>
        </Link>

        <a
          href="#how-it-works"
          className="group inline-flex items-center gap-1.5 px-2 py-2 text-sm font-semibold text-ink"
        >
          See how it works
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </a>
      </div>

      <p className="mt-4 text-sm text-muted">
        No credit card. Bring your own job hunt.
      </p>

      <div className="mt-9 flex flex-wrap justify-center gap-2">
        {FEATURE_PILLS.map((pill) => (
          <span
            key={pill}
            className="rounded-full border border-muted/15 bg-surface px-3.5 py-1.5 text-xs font-medium text-ink"
          >
            {pill}
          </span>
        ))}
      </div>

      <div className="mx-auto mt-14 max-w-2xl md:mt-16">
        <ApplicationsPreviewCard />
      </div>
    </div>
  );
}
