// src/lib/applicationSort.ts

/**
 * Each option pairs a friendly label with a sortable column key and
 * direction, joined with a dash (e.g. "appliedDate-desc") so the whole
 * choice fits in a single URL param instead of two.
 */
export const SORT_OPTIONS = [
  { value: "appliedDate-desc", label: "Newest first" },
  { value: "appliedDate-asc", label: "Oldest first" },
  { value: "companyName-asc", label: "Company (A to Z)" },
  { value: "companyName-desc", label: "Company (Z to A)" },
  { value: "roleTitle-asc", label: "Role (A to Z)" },
  { value: "status-asc", label: "Status" },
] as const;

export const DEFAULT_SORT = "appliedDate-desc";