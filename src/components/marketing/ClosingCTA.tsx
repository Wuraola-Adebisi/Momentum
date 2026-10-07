import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import { MomentumSparkline } from "../dashboard/MomentumSparkline";
import { SECTION_PADDING_X } from "./layout";

export function ClosingCTA() {
  return (
    <section className={`bg-paper ${SECTION_PADDING_X} py-10 md:py-16`}>
      <div className="mx-auto grid max-w-content overflow-hidden border border-ink/10 bg-ink md:grid-cols-[1fr_0.8fr] md:items-center">
        <div className="px-8 py-10 md:px-12 md:py-14">
          <p className="font-data text-[10px] uppercase tracking-[0.18em] text-white/40">
            Start here
          </p>
          <h2 className="mt-3 text-white">Ready to get organized?</h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-white/55 md:text-base">
            Create a board, drop in your first application, and see where things
            actually stand.
          </p>

          <Link to="/login?mode=signup" className="mt-8 inline-block">
            <Button variant="accent" size="lg">
              Start tracking free
              <ArrowRight size={17} aria-hidden="true" />
            </Button>
          </Link>
        </div>

        <div className="hidden border-l border-white/10 px-7 py-10 md:block md:px-10">
          <div className="border border-white/10 bg-white/[0.035] p-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <p className="font-data text-[10px] uppercase tracking-[0.14em] text-white/40">
                Activity
              </p>
              <p className="font-data text-[10px] text-status-offer">+18% this month</p>
            </div>
            <MomentumSparkline className="mt-5 w-full" />
            <p className="mt-4 font-data text-[10px] uppercase tracking-[0.12em] text-white/35">
              Your application activity, trending up
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
