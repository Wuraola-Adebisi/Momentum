// src/components/marketing/ClosingCTA.tsx
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";

export function ClosingCTA() {
  return (
    <div className="bg-ink px-6 py-20 text-center sm:px-8 md:px-12 md:py-24 lg:px-16">
      <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
        Start tracking your search today.
      </h2>

      <p className="mx-auto mt-3 max-w-sm text-sm text-white/70">
        Free to use, no credit card, and it takes about a minute to get set
        up.
      </p>

      <Link to="/login?mode=signup" className="mt-7 inline-block">
        <Button variant="accent">Get started free</Button>
      </Link>
    </div>
  );
}