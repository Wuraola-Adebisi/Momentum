import { ArrowUpRight, Clock3, MessageCircle, Trophy } from "lucide-react";
import { Card, Button } from "../ui";
import type { Application } from "../../types";
import { applicationAge, getNextAction } from "../../lib/analytics";

interface AttentionPanelProps {
  applications: Application[];
  onOpen: (application: Application) => void;
}

export function AttentionPanel({ applications, onOpen }: AttentionPanelProps) {
  const attention = applications
    .filter((application) => application.status !== "rejected" && application.status !== "offer")
    .map((application) => ({ application, age: applicationAge(application) }))
    .sort((a, b) => b.age - a.age)
    .slice(0, 4);

  return (
    <Card padding="lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Needs attention</p>
          <h2 className="mt-1 text-2xl">Keep the pipeline warm.</h2>
          <p className="mt-1 text-sm text-muted">Older active applications deserve a next move.</p>
        </div>
        <Clock3 size={20} className="mt-1 shrink-0 text-muted" aria-hidden="true" />
      </div>

      {attention.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-line p-5 text-sm text-muted">
          Nothing urgent in the active pipeline. Add applications or keep interviews moving.
        </div>
      ) : (
        <div className="mt-5 divide-y divide-line/60">
          {attention.map(({ application, age }) => {
            const action = getNextAction(application);
            const Icon = application.status === "interviewing" ? MessageCircle : application.status === "offer" ? Trophy : ArrowUpRight;
            return (
              <div key={application.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper text-muted">
                  <Icon size={16} aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">{application.roleTitle}</p>
                  <p className="truncate text-xs text-muted">{application.companyName} · {age}d in pipeline</p>
                </div>
                <Button size="sm" variant="ghost" onClick={() => onOpen(application)}>{action} →</Button>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
