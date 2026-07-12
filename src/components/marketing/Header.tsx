import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { SECTION_PADDING_X } from "./layout";

const REPO_URL = "https://github.com/Wuraola-Adebisi/Momentum";

export function Header() {
  return (
    <header
      className={`sticky top-0 z-50 flex items-center justify-between border-b border-muted/10 bg-paper/85 py-3.5 backdrop-blur-md xl:py-4 ${SECTION_PADDING_X}`}
    >
      <Link
        to="/"
        onClick={(e) => {
          // This header only ever renders on the homepage itself, so a
          // click here is a same-route click and React Router won't
          // scroll for us. Do it ourselves instead of just no-op'ing.
          if (window.location.pathname === "/") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
        className="font-display text-sm font-bold text-ink transition-colors hover:text-primary"
      >
        Momentum
      </Link>

      <nav className="hidden items-center gap-6 sm:flex md:gap-8">
        <a
          href="#features"
          className="text-sm text-muted transition-colors hover:text-ink"
        >
          Features
        </a>

        <a
          href="#how-it-works"
          className="text-sm text-muted transition-colors hover:text-ink"
        >
          How it works
        </a>

        <a
          href={REPO_URL}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-muted transition-colors hover:text-ink"
        >
          Source
        </a>
      </nav>

      <div className="flex items-center gap-3 md:gap-4">
        <Link
          to="/login"
          className="hidden text-sm text-muted transition-colors hover:text-ink sm:inline"
        >
          Sign in
        </Link>

        <Link to="/login?mode=signup">
          <Button variant="accent" size="sm">
            Get started
          </Button>
        </Link>
      </div>
    </header>
  );
}
