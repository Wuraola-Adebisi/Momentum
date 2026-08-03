export const SECTION_PADDING_X =
  "px-7 sm:px-10 md:px-16 xl:px-24 3xl:px-[136px]";

export const SECTION_PADDING_Y =
  "py-[72px] md:py-[104px] xl:py-[136px] 3xl:py-[164px]";

export const SECTION_PADDING_Y_SM = "py-14 md:py-20 xl:py-24 3xl:py-28";
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
