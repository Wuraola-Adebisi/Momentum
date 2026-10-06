import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "../ui/Button";
import { BoardPreview } from "./BoardPreview";
import { SECTION_PADDING_X, SECTION_PADDING_Y } from "./layout";

export function Hero() {
  return (
    <section className={`relative overflow-hidden ${SECTION_PADDING_X} ${SECTION_PADDING_Y}`}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[linear-gradient(to_bottom,rgba(16,33,59,.035),transparent)]" />

      <div className="relative mx-auto max-w-content">
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow">A calmer way to run your job search</p>

          <h1 className="mx-auto mt-5 max-w-4xl text-balance">
            Turn a scattered job search into{" "}
            <span className="text-primary">momentum.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted md:text-lg">
            Track every application, interview, and offer in one focused workspace.
            See what is moving, what needs attention, and what comes next.
          </p>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link to="/login?mode=signup">
              <Button variant="primary" size="lg">
                Start tracking
                <ArrowRight size={17} aria-hidden="true" />
              </Button>
            </Link>

            <a
              href="#showcase"
              className="group inline-flex min-h-12 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-surface"
            >
              See how it works
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Check size={13} className="text-status-offer" />
              Applications
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check size={13} className="text-status-offer" />
              Interviews
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check size={13} className="text-status-offer" />
              Analytics
            </span>
          </div>
        </div>

        <div className="relative mx-auto mt-14 max-w-5xl md:mt-16">
          <div className="absolute -inset-x-8 top-10 -z-10 h-40 bg-primary/[0.025] blur-3xl" />
          <div className="border border-line bg-surface p-2 shadow-[0_24px_60px_-32px_rgba(16,33,59,.35)] sm:p-3">
            <div className="border border-line bg-paper">
              <div className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-5">
                <div className="flex items-center gap-3">
                  <span className="font-display text-lg text-ink">Applications</span>
                  <span className="font-data text-[9px] uppercase tracking-[0.12em] text-muted">
                    Your pipeline
                  </span>
                </div>
                <span className="hidden font-data text-[9px] uppercase tracking-[0.12em] text-muted sm:inline">
                  Board view
                </span>
              </div>
              <BoardPreview />
            </div>
          </div>

          <div className="absolute -bottom-5 left-4 hidden border border-line bg-paper px-4 py-2.5 shadow-soft sm:block">
            <p className="font-data text-[9px] uppercase tracking-[0.13em] text-muted">
              Next interview
            </p>
            <p className="mt-1 text-xs font-medium text-ink">Technical · Northfall · Tue 10:00</p>
          </div>

          <div className="absolute -bottom-5 right-4 hidden border border-line bg-ink px-4 py-2.5 text-white shadow-soft md:block">
            <p className="font-data text-[9px] uppercase tracking-[0.13em] text-white/45">
              Pipeline
            </p>
            <p className="mt-1 text-xs font-medium">24 applications · 6 interviews</p>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-muted">
          No credit card required. Bring your own job hunt.
        </p>
      </div>
    </section>
  );
}
