import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { MomentumSparkline } from "../dashboard/MomentumSparkline";
import { SECTION_PADDING_X } from "./layout";

export function ClosingCTA() {
  return (
    <div className={`bg-paper py-6 md:py-10 ${SECTION_PADDING_X}`}>
      <div className="relative mx-auto w-full max-w-[1180px] overflow-hidden rounded-3xl bg-ink px-8 py-14 text-center sm:px-12 md:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(560px_280px_at_50%_-10%,rgba(37,99,235,0.30),transparent_70%)]"
        />

        <div
          aria-hidden
          className="pointer-events-none absolute bottom-6 right-6 hidden w-36 opacity-25 sm:block md:w-44"
        >
          <MomentumSparkline />
        </div>

        <div className="relative">
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
            Ready to get organized?
          </h2>

          <p className="mx-auto mt-3 max-w-sm text-sm text-white/65 md:text-base">
            Create a board, drop in your first application, and see where things
            actually stand.
          </p>

          <Link to="/login?mode=signup" className="mt-7 inline-block">
            <Button variant="accent" size="lg">
              Start tracking free
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
