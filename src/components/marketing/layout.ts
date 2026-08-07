export const SECTION_PADDING_X =
  "px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 3xl:px-[120px]";

export const HERO_PADDING_Y = "py-20 md:py-24 xl:py-28 3xl:py-32";

export const SECTION_PADDING_Y = "py-14 md:py-18 xl:py-20 3xl:py-24";

export const SECTION_PADDING_Y_SM = "py-10 md:py-14 xl:py-16 3xl:py-20";

export const STATUS_SEQUENCE = [
  {
    key: "applied",
    label: "Applied",
    dot: "bg-status-applied",
    border: "border-l-status-applied",
  },
  {
    key: "interviewing",
    label: "Interviewing",
    dot: "bg-status-interviewing",
    border: "border-l-status-interviewing",
  },
  {
    key: "offer",
    label: "Offer",
    dot: "bg-status-offer",
    border: "border-l-status-offer",
  },
  {
    key: "rejected",
    label: "Rejected",
    dot: "bg-status-rejected",
    border: "border-l-status-rejected",
  },
] as const;
