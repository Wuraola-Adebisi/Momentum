import { GitFork } from "lucide-react";
import { Link } from "react-router-dom";
import { SECTION_PADDING_X } from "./layout";

const REPO_URL = "https://github.com/Wuraola-Adebisi/Momentum";

export function Footer() {
  return (
    <footer className={`bg-ink text-white ${SECTION_PADDING_X}`}>
      <div className="mx-auto w-full max-w-content py-14 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-lg font-bold text-white">
              Momentum
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/55">
              A calmer way to track your job search, one board for every
              application, interview, and offer.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-white/40">
              Explore
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <a
                href="#features"
                className="text-sm text-white/75 transition-colors hover:text-white"
              >
                Features
              </a>
              <a
                href="#showcase"
                className="text-sm text-white/75 transition-colors hover:text-white"
              >
                See it in action
              </a>
              <a
                href="#how-it-works"
                className="text-sm text-white/75 transition-colors hover:text-white"
              >
                How it works
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-white/40">
              Project
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <a
                href={REPO_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-sm text-white/75 transition-colors hover:text-white"
              >
                <GitFork size={13} />
                View source
              </a>
              <Link
                to="/login"
                className="text-sm text-white/75 transition-colors hover:text-white"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-center gap-4 border-t border-white/10 pt-6 sm:flex-row sm:justify-between">
          <p className="font-data text-[11px] text-white/40">
            &copy; {new Date().getFullYear()} Wuraola Adebisi. All rights reserved.
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-data text-[11px] uppercase tracking-wide text-white/40 transition-colors hover:text-white"
          >
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}