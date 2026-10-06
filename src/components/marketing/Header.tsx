import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { SECTION_PADDING_X } from "./layout";

const REPO_URL = "https://github.com/Wuraola-Adebisi/Momentum";

export function Header() {
  return (
    <header className={`sticky top-0 z-50 border-b border-line/70 bg-paper/90 backdrop-blur-md ${SECTION_PADDING_X}`}>
      <div className="mx-auto flex min-h-16 max-w-content items-center justify-between gap-6">
        <Link
          to="/"
          onClick={(e) => {
            if (window.location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex items-baseline gap-2"
        >
          <span className="font-display text-2xl text-ink">Momentum</span>
          <span className="hidden font-data text-[9px] uppercase tracking-[0.18em] text-primary sm:inline">career OS</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <a href="#features" className="text-sm text-muted transition-colors hover:text-ink">Features</a>
          <a href="#showcase" className="text-sm text-muted transition-colors hover:text-ink">Product</a>
          <a href="#how-it-works" className="text-sm text-muted transition-colors hover:text-ink">How it works</a>
          <a href={REPO_URL} target="_blank" rel="noreferrer" className="text-sm text-muted transition-colors hover:text-ink">Source</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/login" className="hidden text-sm font-medium text-muted transition-colors hover:text-ink sm:inline">Sign in</Link>
          <Link to="/login?mode=signup">
            <Button variant="accent" size="sm">Get started</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
