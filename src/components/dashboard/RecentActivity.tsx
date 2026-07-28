import React from "react";
import {
  Plus,
  ArrowRightLeft,
  StickyNote,
  CalendarClock,
  Activity as ActivityIcon,
  type LucideIcon,
} from "lucide-react";
import { Card } from "../ui/Card";
import { EmptyState } from "../ui/EmptyState";
import { formatRelativeTime } from "../../lib/time";
import type { ActivityLogEntry } from "../../types";

interface RecentActivityProps {
  entries: ActivityLogEntry[];
  limit?: number;
}

const ACTION_ICONS: Record<ActivityLogEntry["actionType"], LucideIcon> = {
  created: Plus,
  status_changed: ArrowRightLeft,
  note_added: StickyNote,
  interview_scheduled: CalendarClock,
};

export const RecentActivity: React.FC<RecentActivityProps> = ({
  entries,
  limit = 8,
}) => {
  const recent = [...entries]
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .slice(0, limit);

  return (
    <Card padding="md">
      <div className="mb-4 flex items-center gap-2">
        <ActivityIcon size={18} className="text-muted" />
        <h2 className="font-display text-lg font-semibold text-ink">
          Recent activity
        </h2>
      </div>

      {recent.length === 0 ? (
        <EmptyState
          title="No activity yet"
          description="Adding applications and moving them through stages will show up here."
        />
      ) : (
        <ul className="space-y-4">
          {recent.map((entry) => {
            const Icon = ACTION_ICONS[entry.actionType];
            return (
              <li key={entry.id} className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted/10 text-muted">
                  <Icon size={15} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-body text-sm text-ink">
                    {entry.description}
                  </p>
                  <p className="mt-0.5 font-data text-xs text-muted">
                    {formatRelativeTime(entry.createdAt)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
};