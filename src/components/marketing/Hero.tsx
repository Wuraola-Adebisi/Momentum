import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import { SECTION_PADDING_X, SECTION_PADDING_Y } from "./layout"

export function Hero() {
  return (
    <section
      className={`relative mx-auto w-full max-w-content text-center ${SECTION_PADDING_X} ${SECTION_PADDING_Y}`}
    >
      <h1 className="mx-auto max-w-5xl text-balance">
        Turn a scattered job search into{" "}
        <span className="text-primary">momentum.</span>
      </h1>

      <p className="mx-auto mt-6 max-w-xl text-base text-muted md:text-lg">
        Track every application, interview, and offer in one board. No
        spreadsheets, no sticky notes, and no forgetting who you owe a follow
        up.
      </p>

      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link to="/login?mode=signup">
          <Button variant="primary" size="lg">
            Start tracking
          </Button>
        </Link>

        <a
          href="#how-it-works"
          className="group inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-surface"
        >
          See how it works
          <ArrowRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </a>
      </div>

      <p className="mt-5 text-sm text-muted">
        No credit card required. Bring your own job hunt.
      </p>
    </section>
  );
}
