import { useSearchParams } from "react-router-dom";
import { Button, Select } from "../ui";
import { SORT_OPTIONS, DEFAULT_SORT } from "../../lib/applicationSort";
import type { ApplicationStatus } from "../../types";

const STATUS_FILTERS: { label: string; value: ApplicationStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Applied", value: "applied" },
  { label: "Interviewing", value: "interviewing" },
  { label: "Offer", value: "offer" },
  { label: "Rejected", value: "rejected" },
];

export function FilterBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeStatus = searchParams.get("status") ?? "all";
  const activeSort = searchParams.get("sort") ?? DEFAULT_SORT;

  function setStatus(value: string) {
    const next = new URLSearchParams(searchParams);
    if (value === "all") {
      next.delete("status");
    } else {
      next.set("status", value);
    }
    setSearchParams(next);
  }

  function setSort(value: string) {
    const next = new URLSearchParams(searchParams);
    if (value === DEFAULT_SORT) {
      next.delete("sort");
    } else {
      next.set("sort", value);
    }
    setSearchParams(next);
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      <div className="flex flex-wrap gap-2">
        {STATUS_FILTERS.map((filter) => (
          <Button
            key={filter.value}
            size="sm"
            variant={activeStatus === filter.value ? "accent" : "ghost"}
            onClick={() => setStatus(filter.value)}
          >
            {filter.label}
          </Button>
        ))}
      </div>

      <Select
        value={activeSort}
        onChange={(e) => setSort(e.target.value)}
        options={SORT_OPTIONS.map(({ value, label }) => ({ value, label }))}
        className="sm:ml-auto w-full sm:w-56"
        aria-label="Sort applications"
      />
    </div>
  );
}