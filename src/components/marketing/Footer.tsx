import { GitFork } from "lucide-react";
import { Link } from "react-router-dom";
import { SECTION_PADDING_X } from "./layout";

const REPO_URL = "https://github.com/Wuraola-Adebisi/Momentum";

export function Footer() {
  return (
    <footer className={`bg-ink text-white ${SECTION_PADDING_X} py-10 md:py-12`}>
      <div className="mx-auto max-w-content">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="font-display text-xl font-semibold">Momentum</p>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
              A simple way to stay on top of every application, interview, and
              next step.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Explore
            </p>

            <div className="mt-4 flex flex-col gap-3">
              <a
                href="#features"
                className="w-fit text-sm text-white/70 transition-colors hover:text-white"
              >
                Features
              </a>

              <a
                href="#showcase"
                className="w-fit text-sm text-white/70 transition-colors hover:text-white"
              >
                Product
              </a>

              <a
                href="#how-it-works"
                className="w-fit text-sm text-white/70 transition-colors hover:text-white"
              >
                How it works
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Project
            </p>

            <div className="mt-4 flex flex-col gap-3">
              <a
                href={REPO_URL}
                target="_blank"
                rel="noreferrer"
                className="
                  flex
                  w-fit
                  items-center
                  gap-2
                  text-sm
                  text-white/70
                  transition-colors
                  hover:text-white
                "
              >
                <GitFork size={14} />
                View source
              </a>

              <Link
                to="/login"
                className="w-fit text-sm text-white/70 transition-colors hover:text-white"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col-reverse items-center gap-4 border-t border-white/10 pt-5 sm:flex-row sm:justify-between">
          <p className="font-data text-[11px] text-white/40">
            © {new Date().getFullYear()} Wuraola Adebisi. All rights reserved.
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="
              font-data
              text-[11px]
              uppercase
              tracking-wide
              text-white/40
              transition-colors
              hover:text-white
            "
          >
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
