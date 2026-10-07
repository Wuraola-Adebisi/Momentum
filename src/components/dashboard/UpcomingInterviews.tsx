import { CalendarClock, ArrowUpRight } from "lucide-react";
import { Card, Button, Badge } from "../ui";
import type { Application, Interview, InterviewType } from "../../types";

const labels: Record<InterviewType,string> = {
  phone_screen: "Phone screen",
  technical: "Technical",
  behavioral: "Behavioral",
  final: "Final",
  other: "Interview",
};

interface UpcomingInterviewsProps {
  applications: Application[];
  interviews: Interview[];
  onOpen: (application: Application) => void;
}

function formatInterviewDate(value: string) {
  const date = new Date(value);
  return {
    day: date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" }),
    time: date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" }),
  };
}

export function UpcomingInterviews({ applications, interviews, onOpen }: UpcomingInterviewsProps) {
  const now = Date.now();
  const upcoming = interviews
    .filter((interview) => new Date(interview.interviewDate).getTime() >= now)
    .slice(0, 4);

  const byId = new Map(applications.map((application) => [application.id, application]));

  return (
    <Card padding="lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">On the calendar</p>
          <h2 className="mt-1 text-2xl">Upcoming interviews.</h2>
          <p className="mt-1 text-sm text-muted">The next conversations in your pipeline.</p>
        </div>
        <CalendarClock size={20} className="mt-1 shrink-0 text-muted" aria-hidden="true" />
      </div>

      {upcoming.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-line p-5 text-sm text-muted">
          No upcoming interviews. Schedule one from an application when a conversation is confirmed.
        </div>
      ) : (
        <div className="mt-5 divide-y divide-line/60">
          {upcoming.map((interview) => {
            const application = byId.get(interview.applicationId);
            if (!application) return null;
            const date = formatInterviewDate(interview.interviewDate);
            return (
              <div key={interview.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>{labels[interview.interviewType]}</Badge>
                    <span className="font-data text-xs text-muted">{date.day} · {date.time}</span>
                  </div>
                  <p className="mt-2 truncate text-sm font-medium text-ink">{application.roleTitle}</p>
                  <p className="truncate text-xs text-muted">{application.companyName}</p>
                </div>
                <Button size="sm" variant="ghost" onClick={() => onOpen(application)} aria-label={"Open " + application.roleTitle}>
                  <ArrowUpRight size={15} />
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
