import type {
  Application,
  ApplicationStatus,
  ActivityLogEntry,
  DashboardStats,
} from "../types";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function applicationAge(application: Application, now = new Date()): number {
  const applied = new Date(application.appliedDate + "T00:00:00").getTime();
  const current = now.getTime();
  return Math.max(0, Math.floor((current - applied) / MS_PER_DAY));
}

export function getNextAction(application: Application): string {
  switch (application.status) {
    case "interviewing":
      return "Prepare";
    case "offer":
      return "Review";
    case "rejected":
      return "Archive";
    default:
      return applicationAge(application) >= 7 ? "Follow up" : "Review";
  }
}

export interface FunnelMetrics {
  total: number;
  active: number;
  responseRate: number;
  interviewRate: number;
  offerRate: number;
  averageAge: number;
}

export function computeFunnelMetrics(applications: Application[]): FunnelMetrics {
  const total = applications.length;
  const active = applications.filter((a) => a.status !== "rejected").length;
  const responded = applications.filter((a) => a.status !== "applied").length;
  const interviewing = applications.filter((a) => a.status === "interviewing").length;
  const offers = applications.filter((a) => a.status === "offer").length;
  const averageAge = total === 0
    ? 0
    : Math.round(applications.reduce((sum, application) => sum + applicationAge(application), 0) / total * 10) / 10;

  return {
    total,
    active,
    responseRate: total ? Math.round((responded / total) * 100) : 0,
    interviewRate: total ? Math.round((interviewing / total) * 100) : 0,
    offerRate: total ? Math.round((offers / total) * 100) : 0,
    averageAge,
  };
}

function getFirstResponseTimestamps(
  activityLog: ActivityLogEntry[],
): Map<string, string> {
  const firstResponse = new Map<string, string>();

  for (const entry of activityLog) {
    if (entry.actionType !== "status_changed" || !entry.applicationId) continue;

    // Only a move into a response stage counts. A later move back to Applied
    // should never become the "first response".
    const targetStatus = entry.description.match(/^Moved to (.+)$/)?.[1];
    if (!targetStatus || targetStatus.toLowerCase() === "applied") continue;

    const existing = firstResponse.get(entry.applicationId);
    if (!existing || entry.createdAt < existing) {
      firstResponse.set(entry.applicationId, entry.createdAt);
    }
  }

  return firstResponse;
}

export function computeDashboardStats(
  applications: Application[],
  activityLog: ActivityLogEntry[],
): DashboardStats {
  const total = applications.length;
  const totalActive = applications.filter(
    (a) => a.status !== "rejected",
  ).length;
  const interviewCount = applications.filter(
    (a) => a.status === "interviewing",
  ).length;
  const offerCount = applications.filter((a) => a.status === "offer").length;
  const respondedCount = applications.filter(
    (a) => a.status !== "applied",
  ).length;
  const responseRate =
    total === 0 ? 0 : Math.round((respondedCount / total) * 100);

  const firstResponse = getFirstResponseTimestamps(activityLog);
  const responseDurations: number[] = [];

  for (const application of applications) {
    const respondedAt = firstResponse.get(application.id);
    if (!respondedAt) continue;

    const appliedTime = new Date(application.appliedDate).getTime();
    const respondedTime = new Date(respondedAt).getTime();
    const days = (respondedTime - appliedTime) / MS_PER_DAY;

    if (days >= 0) responseDurations.push(days);
  }

  const avgResponseDays =
    responseDurations.length === 0
      ? null
      : Math.round(
          (responseDurations.reduce((sum, d) => sum + d, 0) /
            responseDurations.length) *
            10,
        ) / 10;

  return {
    totalActive,
    interviewCount,
    offerCount,
    responseRate,
    avgResponseDays,
  };
}

export interface StatusBreakdownItem {
  status: ApplicationStatus;
  label: string;
  count: number;
}

const STATUS_LABELS: Record<ApplicationStatus, string> = {
  applied: "Applied",
  interviewing: "Interviewing",
  offer: "Offer",
  rejected: "Rejected",
};

export function computeStatusBreakdown(
  applications: Application[],
): StatusBreakdownItem[] {
  const statuses: ApplicationStatus[] = [
    "applied",
    "interviewing",
    "offer",
    "rejected",
  ];

  return statuses.map((status) => ({
    status,
    label: STATUS_LABELS[status],
    count: applications.filter((a) => a.status === status).length,
  }));
}

export interface WeeklyCount {
  weekLabel: string;
  count: number;
}

export function computeWeeklyApplicationCounts(
  applications: Application[],
  weeks = 8,
): WeeklyCount[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startOfThisWeek = new Date(today);
  startOfThisWeek.setDate(today.getDate() - today.getDay());

  const buckets: WeeklyCount[] = [];

  for (let i = weeks - 1; i >= 0; i--) {
    const weekStart = new Date(startOfThisWeek);
    weekStart.setDate(startOfThisWeek.getDate() - i * 7);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);

    const label = weekStart.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    const count = applications.filter((application) => {
      const appliedTime = new Date(application.appliedDate).getTime();
      return (
        appliedTime >= weekStart.getTime() && appliedTime < weekEnd.getTime()
      );
    }).length;

    buckets.push({ weekLabel: label, count });
  }

  return buckets;
}
