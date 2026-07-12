export const SORT_OPTIONS = [
  { value: "appliedDate-desc", label: "Newest first" },
  { value: "appliedDate-asc", label: "Oldest first" },
  { value: "companyName-asc", label: "Company (A to Z)" },
  { value: "companyName-desc", label: "Company (Z to A)" },
  { value: "roleTitle-asc", label: "Role (A to Z)" },
  { value: "status-asc", label: "Status" },
] as const;

export const DEFAULT_SORT = "appliedDate-desc";
