// src/pages/Homepage.tsx
import { Link } from "react-router-dom";
import { GitFork } from "lucide-react";

import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { FeatureSection } from "../components/marketing/FeatureSection";
import { BrowserFrame } from "../components/marketing/BrowserFrame";

const REPO_URL = "https://github.com/Wuraola-Adebisi/Momentum";

function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-5 md:px-10">
      <p className="font-display text-sm font-bold text-ink">Momentum</p>

      <div className="flex items-center gap-4 md:gap-6">
        <a
          href="#features"
          className="hidden text-sm text-muted hover:text-ink sm:inline"
        >
          Features
        </a>

        <a
          href="#how-it-works"
          className="hidden text-sm text-muted hover:text-ink sm:inline"
        >
          How it works
        </a>

        <Link to="/login" className="text-sm text-muted hover:text-ink">
          Sign in
        </Link>

        <Link to="/login">
          <Button variant="accent" size="sm">
            Get started
          </Button>
        </Link>
      </div>
    </header>
  );
}

function ApplicationsPreviewCard() {
  return (
    <div className="relative mx-auto max-w-sm">
      <BrowserFrame path="momentum.app/applications">
        <p className="mb-3 font-display text-sm font-bold text-ink">
          Applications
        </p>

        <div className="flex items-center justify-between border-b border-muted/10 py-2">
          <span className="text-sm font-medium text-ink">Anchor Studios</span>
          <Badge variant="interviewing">Interviewing</Badge>
        </div>

        <div className="flex items-center justify-between border-b border-muted/10 py-2">
          <span className="text-sm font-medium text-ink">Fieldstone Labs</span>
          <Badge variant="applied">Applied</Badge>
        </div>

        <div className="flex items-center justify-between py-2">
          <span className="text-sm font-medium text-ink">Northfall</span>
          <Badge variant="offer">Offer</Badge>
        </div>
      </BrowserFrame>

      <div className="absolute -bottom-5 -right-6 rounded-xl bg-ink px-3.5 py-2.5 shadow-[0_12px_24px_-12px_rgba(11,42,77,0.4)]">
        <p className="font-data text-base font-semibold text-white">3</p>
        <p className="text-[9px] text-white/70">interviews this week</p>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="mx-auto w-full max-w-content px-6 pb-16 pt-8 text-center md:px-10 md:pb-24 md:pt-14">
      <h1 className="mx-auto max-w-xl font-display text-3xl font-extrabold leading-tight text-ink md:text-4xl">
        Your job search, organized.
      </h1>

      <p className="mx-auto mt-3 max-w-sm text-sm text-muted md:text-base">
        Track every application, interview, and offer in one place, so
        nothing falls through.
      </p>

      <div className="mt-6 flex items-center justify-center gap-3">
        <Link to="/login">
          <Button variant="accent">Get started</Button>
        </Link>

        <Link to="/login">
          <Button variant="secondary">Sign in</Button>
        </Link>
      </div>

      <div className="mt-14 md:mt-16">
        <ApplicationsPreviewCard />
      </div>
    </div>
  );
}

function ProblemFraming() {
  return (
    <div className="mx-auto w-full max-w-content px-6 py-14 text-center md:px-10 md:py-16">
      <h2 className="font-display text-xl font-bold text-ink md:text-2xl">
        Job hunting shouldn't live in six different tabs.
      </h2>

      <p className="mx-auto mt-3 max-w-lg text-sm text-muted">
        A spreadsheet you forget to update. A browser history you can't
        search. A follow-up you meant to send three weeks ago. Momentum
        replaces all of it with one place that actually keeps up with you.
      </p>
    </div>
  );
}

function BoardPreview() {
  const columns = [
    {
      label: "Applied",
      color: "text-muted",
      cards: ["Fieldstone", "Verge Sys."],
    },
    {
      label: "Interview",
      color: "text-status-interviewing",
      cards: ["Anchor"],
    },
    {
      label: "Offer",
      color: "text-status-offer",
      cards: ["Northfall"],
    },
  ];

  return (
    <BrowserFrame path="momentum.app/applications?view=board">
      <div className="grid grid-cols-3 gap-2">
        {columns.map((column) => (
          <div key={column.label}>
            <p
              className={`font-data mb-2 text-[10px] font-semibold uppercase tracking-wide ${column.color}`}
            >
              {column.label}
            </p>

            <div className="flex flex-col gap-1.5">
              {column.cards.map((card) => (
                <div
                  key={card}
                  className="rounded-lg bg-paper px-2 py-2 text-xs font-semibold text-ink"
                >
                  {card}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </BrowserFrame>
  );
}

function TablePreview() {
  const rows = [
    { company: "Anchor Studios", variant: "interviewing" as const },
    { company: "Northfall", variant: "offer" as const },
  ];

  return (
    <BrowserFrame path="momentum.app/applications?view=table">
      <div className="flex justify-between border-b border-muted/10 pb-2 font-data text-[10px] font-semibold uppercase tracking-wide text-muted">
        <span>Company</span>
        <span>Status</span>
      </div>

      {rows.map((row) => (
        <div
          key={row.company}
          className="flex items-center justify-between border-b border-muted/10 py-2 last:border-b-0"
        >
          <span className="text-sm font-semibold text-ink">
            {row.company}
          </span>
          <Badge variant={row.variant}>
            {row.variant.charAt(0).toUpperCase() + row.variant.slice(1)}
          </Badge>
        </div>
      ))}
    </BrowserFrame>
  );
}

function NotesPreview() {
  return (
    <div className="relative h-48">
      <div className="absolute inset-0 rounded-xl border border-muted/20 bg-paper opacity-60" />

      <div className="absolute inset-y-2 right-0 w-[62%] rounded-l-xl border border-muted/20 bg-surface p-4 shadow-[-16px_8px_36px_-20px_rgba(11,42,77,0.3)]">
        <p className="mb-2 font-display text-sm font-bold text-ink">
          Anchor Studios
        </p>

        <div className="mb-1.5 rounded-lg bg-paper px-2.5 py-2">
          <p className="text-xs text-ink">
            Recruiter mentioned the team is scaling fast.
          </p>
          <p className="font-data mt-0.5 text-[9px] text-muted">jul 06</p>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-status-interviewing/10 px-2.5 py-2">
          <span className="text-xs font-semibold text-status-interviewing">
            Technical interview
          </span>
          <span className="font-data text-[9px] text-status-interviewing">
            jul 14
          </span>
        </div>
      </div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Add an application",
      description: "Save the role, company, and link in seconds.",
    },
    {
      number: "02",
      title: "Track it through stages",
      description: "Applied, interviewing, offer, or rejected.",
    },
    {
      number: "03",
      title: "Never lose the thread",
      description: "Notes and interviews stay right where they belong.",
    },
  ];

  return (
    <div id="how-it-works" className="bg-paper px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto w-full max-w-content">
        <h2 className="text-center font-display text-xl font-bold text-ink md:text-2xl">
          How it works
        </h2>

        <div className="mt-10 flex items-start justify-center">
          {steps.map((step, i) => (
            <div key={step.number} className="flex items-start">
              <div className="w-32 text-center sm:w-40">
                <p className="font-display text-xl font-extrabold text-primary">
                  {step.number}
                </p>

                <p className="mt-2 text-sm font-semibold text-ink">
                  {step.title}
                </p>

                <p className="mt-1 text-xs text-muted">{step.description}</p>
              </div>

              {i < steps.length - 1 && (
                <div className="mt-3 hidden h-px w-10 bg-muted/20 sm:block md:w-16" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ClosingCTA() {
  return (
    <div className="bg-ink px-6 py-20 text-center md:px-10 md:py-24">
      <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
        Start tracking your search today.
      </h2>

      <p className="mx-auto mt-3 max-w-sm text-sm text-white/70">
        Free to use, no credit card, and it takes about a minute to get set
        up.
      </p>

      <Link to="/login" className="mt-7 inline-block">
        <Button variant="accent">Get started free</Button>
      </Link>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mx-auto flex w-full max-w-content flex-col gap-4 border-t border-muted/10 px-6 py-8 sm:flex-row sm:items-center sm:justify-between md:px-10">
      <div>
        <p className="font-display text-sm font-bold text-ink">Momentum</p>
        <p className="text-xs text-muted">
          A calmer way to track your job search.
        </p>
      </div>

      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
        <a
          href={REPO_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 rounded-lg border border-muted/20 px-3 py-2 text-xs text-ink hover:bg-paper"
        >
          <GitFork size={14} />
          View source
        </a>

        <p className="font-data text-[10px] text-muted">
          © {new Date().getFullYear()} Wuraola Adebisi
        </p>
      </div>
    </footer>
  );
}

export default function Homepage() {
  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <Hero />
      <ProblemFraming />

      <div id="features" className="bg-surface">
        <FeatureSection
          eyebrow="Board view"
          title="Drag, drop, done."
          description="Move applications between stages as things change. See your whole pipeline at a glance, organized exactly the way you think about it."
        >
          <BoardPreview />
        </FeatureSection>
      </div>

      <FeatureSection
        eyebrow="Table view"
        title="Every detail, sortable."
        description="Switch to a dense table when you need to scan, sort, or search across everything at once."
        reverse
      >
        <TablePreview />
      </FeatureSection>

      <div className="bg-surface">
        <FeatureSection
          eyebrow="Notes and interviews"
          title="Never lose the thread."
          description="Every note and every interview stays attached to the application it belongs to, opening right where you are."
        >
          <NotesPreview />
        </FeatureSection>
      </div>

      <HowItWorks />
      <ClosingCTA />
      <Footer />
    </div>
  );
}