// src/components/marketing/Hero.tsx
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { ApplicationsPreviewCard } from "./ApplicationsPreviewCard";

export function Hero() {
  return (
    <div className="mx-auto w-full max-w-content px-6 pb-16 pt-8 text-center sm:px-8 md:px-12 md:pb-24 md:pt-14 lg:px-16">
      <h1 className="mx-auto max-w-xl font-display text-3xl font-extrabold leading-tight text-ink md:text-4xl">
        Your job search, organized.
      </h1>

      <p className="mx-auto mt-3 max-w-sm text-sm text-muted md:text-base">
        Track every application, interview, and offer in one place, so
        nothing falls through.
      </p>

      <div className="mt-6 flex items-center justify-center gap-3">
        <Link to="/login?mode=signup">
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