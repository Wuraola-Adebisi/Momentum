// src/components/marketing/Footer.tsx
import { GitFork } from "lucide-react";

const REPO_URL = "https://github.com/Wuraola-Adebisi/Momentum";

export function Footer() {
  return (
    <footer className="mx-auto flex w-full max-w-content flex-col gap-4 border-t border-muted/10 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 md:px-12 lg:px-16">
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
          className="flex items-center gap-1.5 rounded-lg border border-muted/20 px-3 py-2 text-xs text-ink transition-colors hover:bg-paper"
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