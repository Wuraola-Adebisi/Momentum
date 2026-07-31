import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  BriefcaseBusiness,
  CalendarClock,
  Trophy,
  TrendingUp,
} from "lucide-react";
import { Card, Skeleton, EmptyState, Button } from "../components/ui";
import { StatsCard } from "../components/dashboard/StatsCard";
import { RecentActivity } from "../components/dashboard/RecentActivity";
import { MomentumSparkline } from "../components/dashboard/MomentumSparkline";
import { useApplications } from "../hooks/useApplications";
import { useActivityLog } from "../hooks/useActivityLog";
import { computeDashboardStats, computeWeeklyApplicationCounts } from "../lib/analytics";

export default function Dashboard() {
  const navigate = useNavigate();
  const {
    data: applications,
    isLoading: applicationsLoading,
    isError: applicationsError,
  } = useApplications();
  const { data: activityLog, isLoading: activityLoading } = useActivityLog();

  const isLoading = applicationsLoading || activityLoading;

  const stats = useMemo(() => {
    if (!applications) return null;
    return computeDashboardStats(applications, activityLog ?? []);
  }, [applications, activityLog]);

  const weeklyCounts = useMemo(() => {
    if (!applications) return [];
    return computeWeeklyApplicationCounts(applications);
  }, [applications]);

  const hasApplications = !isLoading && applications && applications.length > 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-ink">
          Dashboard
        </h1>
        <p className="mt-1 font-body text-muted">
          Welcome back. Here's where your job search stands.
        </p>
      </div>

      {isLoading && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      )}

      {applicationsError && (
        <EmptyState
          icon={AlertTriangle}
          tone="error"
          title="Couldn't load your dashboard"
          description="Something went wrong fetching your data. Refresh the page to try again."
        />
      )}

      {!isLoading && !applicationsError && !hasApplications && (
        <EmptyState
          icon={BriefcaseBusiness}
          title="No applications yet"
          description="Add your first application to start seeing your stats and activity here."
          actionLabel="Add application"
          onAction={() => navigate("/applications?new=true")}
        />
      )}

      {!isLoading && !applicationsError && hasApplications && stats && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              label="Active applications"
              value={String(stats.totalActive)}
              icon={BriefcaseBusiness}
              accent="primary"
            />
            <StatsCard
              label="Interviewing"
              value={String(stats.interviewCount)}
              icon={CalendarClock}
              accent="interviewing"
            />
            <StatsCard
              label="Offers"
              value={String(stats.offerCount)}
              icon={Trophy}
              accent="offer"
            />
            <StatsCard
              label="Response rate"
              value={`${stats.responseRate}%`}
              icon={TrendingUp}
              accent="ink"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 3xl:grid-cols-2">
            <Card padding="lg">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-display text-lg font-semibold text-ink">
                    Application activity
                  </h2>
                  <p className="mt-0.5 font-body text-sm text-muted">
                    Applications submitted over the last 8 weeks
                  </p>
                </div>
                {stats.avgResponseDays !== null && (
                  <p className="font-data text-sm text-muted">
                    Avg. response: {stats.avgResponseDays}d
                  </p>
                )}
              </div>
              <MomentumSparkline
                data={weeklyCounts.map((week) => week.count)}
                className="h-32 w-full"
              />
              <div className="mt-2 flex justify-between font-data text-xs text-muted">
                <span>{weeklyCounts[0]?.weekLabel}</span>
                <span>{weeklyCounts[weeklyCounts.length - 1]?.weekLabel}</span>
              </div>
            </Card>

            <RecentActivity entries={activityLog ?? []} />
          </div>

          <div className="flex justify-end">
            <Link to="/analytics">
              <Button variant="ghost">View full analytics</Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}