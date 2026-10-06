import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, Check, CircleDot, TrendingUp } from "lucide-react";
import { Button } from "../ui/Button";
import { BoardPreview } from "./BoardPreview";
import { SECTION_PADDING_X } from "./layout";

export function Hero() {
  return (
    <section className={`relative overflow-hidden border-b border-line ${SECTION_PADDING_X}`}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[54%] top-0 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-primary/[0.055] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,33,59,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(16,33,59,.035)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]" />
      </div>

      <div className="relative mx-auto max-w-content pb-16 pt-14 md:pb-24 md:pt-20 xl:pb-28 xl:pt-24">
        <div className="grid items-end gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-10 xl:grid-cols-[0.68fr_1.32fr]">
          <div className="relative z-10 max-w-xl pb-2">
            <div className="inline-flex items-center gap-2 border border-line bg-paper px-3 py-1.5 font-data text-[10px] uppercase tracking-[0.15em] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-status-offer" />
              Career operating system
            </div>

            <h1 className="mt-7 max-w-lg text-balance md:text-[4.6rem] xl:text-[5.1rem]">
              Your job search should move with you.
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-muted md:text-lg">
              Momentum turns applications, interviews, notes, and outcomes into one working system. See what is happening, what needs attention, and what comes next.
            </p>

            <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row">
              <Link to="/login?mode=signup">
                <Button variant="primary" size="lg">
                  Start tracking
                  <ArrowRight size={17} aria-hidden="true" />
                </Button>
              </Link>
              <a href="#showcase" className="inline-flex min-h-12 items-center gap-2 px-2 text-sm font-semibold text-ink hover:text-primary">
                See the product
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>

            <div className="mt-10 flex flex-wrap border-t border-line pt-4 text-xs text-muted">
              <span className="mr-5 inline-flex items-center gap-1.5"><Check size={13} className="text-status-offer" /> Applications</span>
              <span className="mr-5 inline-flex items-center gap-1.5"><Check size={13} className="text-status-offer" /> Interviews</span>
              <span className="inline-flex items-center gap-1.5"><Check size={13} className="text-status-offer" /> Analytics</span>
            </div>
          </div>

          <div className="relative min-w-0 lg:-mr-12 xl:-mr-24">
            <div className="absolute -right-2 -top-8 z-20 hidden w-44 border border-line bg-paper p-3 shadow-soft sm:block xl:-right-5">
              <p className="font-data text-[9px] uppercase tracking-[0.14em] text-muted">Pipeline health</p>
              <div className="mt-2 flex items-end justify-between">
                <span className="font-data text-2xl font-medium text-ink">72%</span>
                <TrendingUp size={15} className="mb-1 text-status-offer" />
              </div>
              <div className="mt-2 h-1 bg-line"><div className="h-1 w-[72%] bg-status-offer" /></div>
            </div>

            <div className="border border-ink/15 bg-[#ecebe5] p-2 shadow-[0_30px_80px_-30px_rgba(16,33,59,.35)] sm:p-3">
              <div className="border border-line bg-paper">
                <div className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-5">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-lg text-ink">Applications</span>
                    <span className="font-data text-[9px] uppercase tracking-[0.12em] text-muted">24 active</span>
                  </div>
                  <span className="hidden font-data text-[9px] uppercase tracking-[0.12em] text-muted sm:inline">Board / Table / Calendar</span>
                </div>
                <BoardPreview />
              </div>
            </div>

            <div className="absolute -bottom-7 left-4 z-20 hidden w-56 border border-ink bg-ink px-4 py-3 text-paper shadow-soft md:block">
              <div className="flex items-center gap-2">
                <CalendarDays size={15} className="text-white/60" />
                <p className="font-data text-[9px] uppercase tracking-[0.13em] text-white/50">Next interview</p>
              </div>
              <p className="mt-2 text-xs font-medium">Technical · Northfall · Tue 10:00</p>
            </div>

            <div className="absolute -bottom-5 right-4 z-20 hidden border border-line bg-paper px-3 py-2 shadow-soft xl:block">
              <p className="font-data text-[9px] uppercase tracking-[0.13em] text-muted">Needs attention</p>
              <p className="mt-1 flex items-center gap-2 text-xs font-medium text-ink"><CircleDot size={11} className="text-status-interviewing" /> 3 follow-ups due</p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid border-y border-line md:grid-cols-3">
          {[
            ["24", "active applications", "Across your current pipeline"],
            ["06", "interviews", "Scheduled and attached to roles"],
            ["72%", "pipeline health", "A snapshot of your search"],
          ].map(([value, label, detail]) => (
            <div key={label} className="border-line py-5 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0">
              <p className="font-data text-2xl font-medium tracking-tight text-ink">{value}</p>
              <p className="mt-1 text-sm font-semibold text-ink">{label}</p>
              <p className="mt-1 text-xs text-muted">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
