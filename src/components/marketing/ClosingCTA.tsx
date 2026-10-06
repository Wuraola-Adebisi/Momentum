import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import { MomentumSparkline } from "../dashboard/MomentumSparkline";
import { SECTION_PADDING_X } from "./layout";

export function ClosingCTA() {
  return (
    <section className={`border-t border-line/70 bg-surface ${SECTION_PADDING_X} py-14 md:py-20`}>
      <div className="mx-auto grid max-w-content items-center gap-10 md:grid-cols-[1fr_0.8fr]">
        <div>
          <p className="font-data text-[10px] uppercase tracking-[0.18em] text-muted">Start here</p>
          <h2 className="mt-3 max-w-xl">Put the whole search somewhere you can actually see it.</h2>
          <p className="mt-4 max-w-lg text-base leading-7 text-muted">
            Add the first application. The rest of Momentum starts making sense from there.
          </p>
          <Link to="/login?mode=signup" className="mt-7 inline-block">
            <Button variant="accent" size="lg">
              Start tracking free
              <ArrowRight size={17} aria-hidden="true" />
            </Button>
          </Link>
        </div>

        <div className="border border-line bg-paper p-5">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <p className="font-data text-[10px] uppercase tracking-[0.14em] text-muted">Activity</p>
            <p className="font-data text-[10px] text-status-offer">+18% this month</p>
          </div>
          <MomentumSparkline className="mt-5 w-full" />
        </div>
      </div>
    </section>
  );
}
