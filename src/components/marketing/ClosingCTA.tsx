import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { MomentumSparkline } from "../dashboard/MomentumSparkline";
import { SECTION_PADDING_X } from "./layout";

export function ClosingCTA() {
  return (
    <div className={`bg-paper py-6 md:py-10 ${SECTION_PADDING_X}`}>
      <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 items-center gap-10 rounded-3xl bg-ink px-8 py-14 sm:px-12 md:grid-cols-[1.3fr_1fr] md:py-16">
        <div className="text-center md:text-left">
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
            Ready to get organized?
          </h2>

          <p className="mx-auto mt-3 max-w-sm text-sm text-white/65 md:mx-0 md:text-base">
            Create a board, drop in your first application, and see where things
            actually stand.
          </p>

          <Link to="/login?mode=signup" className="mt-7 inline-block">
            <Button variant="accent" size="lg">
              Start tracking free
            </Button>
          </Link>
        </div>

        <div className="hidden rounded-2xl bg-white/5 px-8 py-9 md:block">
          <MomentumSparkline className="w-full" />
          <p className="mt-3 font-data text-[11px] uppercase tracking-wide text-white/40">
            Your application activity, trending up
          </p>
        </div>
      </div>
    </div>
  );
}
