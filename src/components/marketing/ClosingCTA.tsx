import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { MomentumSparkline } from "../dashboard/MomentumSparkline";
import { SECTION_PADDING_X } from "./layout";

export function ClosingCTA() {
  return (
    <section className={`bg-paper ${SECTION_PADDING_X} py-10 md:py-16`}>
      <div
        className="
          mx-auto
          grid
          max-w-content
          gap-8
          rounded-3xl
          bg-ink
          px-8
          py-10
          md:grid-cols-[1fr_0.8fr]
          md:items-center
          md:px-12
          md:py-14
        "
      >
        <div>
          <h2 className="text-white">Ready to get organized?</h2>

          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/60 md:mx-0 md:text-base">
            Create a board, drop in your first application, and see where things
            actually stand.
          </p>

          <Link to="/login?mode=signup" className="mt-8 inline-block">
            <Button variant="accent" size="lg">
              Start tracking free
            </Button>
          </Link>
        </div>

        <div
          className="
            hidden
            rounded-2xl
            border
            border-white/10
            bg-white/[0.04]
            px-6
            py-7
            md:block
          "
        >
          <MomentumSparkline className="w-full" />

          <p className="mt-4 font-data text-[11px] uppercase tracking-wide text-white/40">
            Your application activity, trending up
          </p>
        </div>
      </div>
    </section>
  );
}
