import { Link } from "react-router-dom";
import { ArrowRight, Check, Clock3, LayoutGrid, TrendingUp } from "lucide-react";
import { Button } from "../ui/Button";
import { BoardPreview } from "./BoardPreview";
import { SECTION_PADDING_X } from "./layout";

export function Hero() {
  return (
    <section className={`relative overflow-hidden border-b border-line/70 ${SECTION_PADDING_X} pb-16 pt-16 md:pb-24 md:pt-20 xl:pb-28 xl:pt-24`}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_34%,rgba(36,87,255,0.10),transparent_30%),linear-gradient(rgba(16,33,59,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(16,33,59,.025)_1px,transparent_1px)] bg-[length:auto,32px_32px,32px_32px]" />

      <div className="relative mx-auto grid max-w-content items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] xl:gap-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 border border-line bg-surface px-3 py-1.5 font-data text-[10px] uppercase tracking-[0.16em] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-status-offer" />
            A job search, with a system behind it.
          </div>

          <h1 className="mt-7 max-w-xl text-balance md:text-[4.5rem]">
            Stop managing your job search from memory.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-muted md:text-lg">
            Momentum gives every application a place, every status a next step, and every interview a record. So you can spend less time remembering what happened and more time moving forward.
          </p>

          <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row">
            <Link to="/login?mode=signup">
              <Button variant="primary" size="lg">
                Start tracking
                <ArrowRight size={17} aria-hidden="true" />
              </Button>
            </Link>
            <a
              href="#showcase"
              className="inline-flex min-h-12 items-center gap-2 px-3 text-sm font-semibold text-ink transition-colors hover:text-primary"
            >
              See Momentum in action
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
            {["Applications", "Interviews", "Analytics"].map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5">
                <Check size={13} className="text-status-offer" aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative lg:pl-4">
          <div className="absolute -right-3 -top-4 hidden border border-line bg-surface px-3 py-2 shadow-soft sm:block">
            <p className="font-data text-[10px] uppercase tracking-[0.12em] text-muted">This week</p>
            <p className="mt-1 flex items-center gap-2 font-data text-sm font-medium text-ink">
              <TrendingUp size={14} className="text-status-offer" />
              6 applications
            </p>
          </div>

          <div className="relative border border-line bg-surface p-3 shadow-lift sm:p-5">
            <div className="mb-3 flex items-center justify-between border-b border-line pb-3">
              <div>
                <p className="font-display text-xl text-ink">Applications</p>
                <p className="font-data text-[10px] uppercase tracking-[0.12em] text-muted">Your pipeline</p>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-muted">
                <LayoutGrid size={13} />
                Board view
              </div>
            </div>
            <BoardPreview />
          </div>

          <div className="absolute -bottom-5 -left-4 hidden items-center gap-3 border border-line bg-ink px-4 py-3 text-paper shadow-soft sm:flex">
            <Clock3 size={16} className="text-white/60" />
            <div>
              <p className="font-data text-[10px] uppercase tracking-[0.12em] text-white/50">Next up</p>
              <p className="mt-0.5 text-xs font-medium">Technical interview · Tue 10:00</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
