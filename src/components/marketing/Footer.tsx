import { GitFork } from "lucide-react";
import { Link } from "react-router-dom";
import { SECTION_PADDING_X } from "./layout";

const REPO_URL = "https://github.com/Wuraola-Adebisi/Momentum";

export function Footer() {
  return (
    <footer
      className={`border-t border-muted/10 py-10 md:py-12 ${SECTION_PADDING_X}`}
    >
      <div className="mx-auto grid w-full max-w-content grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-sm font-bold text-ink">Momentum</p>
          <p className="mt-2 max-w-xs text-sm text-muted">
            A calmer way to track your job search, one board for every
            application, interview, and offer.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            Explore
          </p>
          <div className="mt-3.5 flex flex-col gap-2.5">
            <a
              href="#features"
              className="text-sm text-ink transition-colors hover:text-primary"
            >
              Features
            </a>
            <a
              href="#showcase"
              className="text-sm text-ink transition-colors hover:text-primary"
            >
              See it in action
            </a>
            <a
              href="#how-it-works"
              className="text-sm text-ink transition-colors hover:text-primary"
            >
              How it works
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            Project
          </p>
          <div className="mt-3.5 flex flex-col gap-2.5">
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-sm text-ink transition-colors hover:text-primary"
            >
              <GitFork size={13} />
              View source
            </a>
            <Link
              to="/login"
              className="text-sm text-ink transition-colors hover:text-primary"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 w-full max-w-content border-t border-muted/10 pt-6">
        <p className="font-data text-[11px] text-muted">
          &copy; {new Date().getFullYear()} Wuraola Adebisi
        </p>
      </div>
    </footer>
  );
}
