// src/components/marketing/Header.tsx
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-5 sm:px-8 md:px-12 lg:px-16">
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

      <div className="flex items-center gap-4 md:gap-6">
        <a
          href="#features"
          className="hidden text-sm text-muted transition-colors hover:text-ink sm:inline"
        >
          Features
        </a>

        <a
          href="#how-it-works"
          className="hidden text-sm text-muted transition-colors hover:text-ink sm:inline"
        >
          How it works
        </a>

        <Link
          to="/login"
          className="text-sm text-muted transition-colors hover:text-ink"
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