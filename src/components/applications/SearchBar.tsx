import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "../ui";

const DEBOUNCE_MS = 250;

export function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const committedQuery = searchParams.get("q") ?? "";

  const [draft, setDraft] = useState(committedQuery);
  const [prevCommitted, setPrevCommitted] = useState(committedQuery);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep the input in sync when the URL's q param changes from outside this
  // component, for example browser back/forward. This is the same
  // render-time state adjustment pattern used in ApplicationForm (compare
  // the previous value to the current one, adjust state only when they
  // differ) rather than a useEffect, so it doesn't fight the debounce timer
  // below on every keystroke.
  if (committedQuery !== prevCommitted) {
    setPrevCommitted(committedQuery);
    setDraft(committedQuery);
  }

  // Clear any pending debounce timer on unmount. This is a legitimate
  // effect use, syncing with an external timer, not a setState-in-effect
  // cascade like the one avoided above.
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  function handleChange(nextValue: string) {
    setDraft(nextValue);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const next = new URLSearchParams(searchParams);
      if (nextValue.trim()) {
        next.set("q", nextValue.trim());
      } else {
        next.delete("q");
      }
      // replace, not push: every keystroke shouldn't add a back-button
      // stop, only discrete filter/sort choices should.
      setSearchParams(next, { replace: true });
    }, DEBOUNCE_MS);
  }

  return (
    <Input
      value={draft}
      onChange={(e) => handleChange(e.target.value)}
      placeholder="Search company or role"
      aria-label="Search applications"
      className="w-full sm:w-64"
    />
  );
}