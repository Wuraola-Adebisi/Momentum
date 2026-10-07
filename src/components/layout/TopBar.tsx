import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Avatar } from "../ui/Avatar";

export default function TopBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  function runSearch() {
    const trimmed = query.trim();
    navigate(trimmed ? `/applications?q=${encodeURIComponent(trimmed)}` : "/applications");
  }

  return (
    <header className="sticky top-0 z-10 flex min-h-20 items-center justify-between gap-4 border-b border-line/70 bg-paper/90 px-4 backdrop-blur md:px-8">
      <div className="relative w-full max-w-[14rem] sm:max-w-xs md:max-w-md">
        <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") runSearch(); }}
          placeholder="Search company or role…"
          aria-label="Search applications"
          className="h-11 rounded-full bg-surface pl-10 shadow-[0_1px_0_rgba(16,33,59,0.03)]"
        />
      </div>
      <div className="ml-auto flex items-center gap-2 md:gap-3">
        <Button variant="accent" aria-label="Add application" onClick={() => navigate("/applications?new=true")}>
          <Plus size={17} aria-hidden="true" />
          <span className="hidden sm:inline">Add application</span>
        </Button>
        <Avatar name="Wuraola Adebisi" />
      </div>
    </header>
  );
}