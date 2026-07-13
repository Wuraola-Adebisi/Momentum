export function NotesPreview() {
  return (
    <div className="relative mx-auto h-48 w-full max-w-sm">
      <div className="absolute inset-0 rounded-xl border border-muted/20 bg-paper opacity-60" />

      <div className="absolute inset-y-2 right-0 w-[62%] rounded-l-xl border border-muted/20 bg-surface p-4 shadow-[-16px_8px_36px_-20px_rgba(11,42,77,0.3)]">
        <p className="mb-2 font-display text-sm font-bold text-ink">
          Anchor Studios
        </p>

        <div className="mb-1.5 rounded-lg bg-paper px-2.5 py-2">
          <p className="text-xs text-ink">
            Recruiter mentioned the team is scaling fast.
          </p>
          <p className="font-data mt-0.5 text-[9px] text-muted">jul 06</p>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-status-interviewing/10 px-2.5 py-2">
          <span className="text-xs font-semibold text-status-interviewing">
            Technical interview
          </span>
          <span className="font-data text-[9px] text-status-interviewing">
            jul 14
          </span>
        </div>
      </div>
    </div>
  );
}
