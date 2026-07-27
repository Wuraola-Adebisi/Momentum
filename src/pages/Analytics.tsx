import { useMemo } from "react";
import { Skeleton, EmptyState } from "../components/ui";
import { ResponseRateChart } from "../components/analytics/ResponseRateChart";
import { ApplicationsPerWeekChart } from "../components/analytics/ApplicationsPerWeekChart";
import { AvgResponseTimeCard } from "../components/analytics/AvgResponseTimeCard";
import { useApplications } from "../hooks/useApplications";
import { useActivityLog } from "../hooks/useActivityLog";
import {
  computeDashboardStats,
  computeStatusBreakdown,
  computeWeeklyApplicationCounts,
} from "../lib/analytics";

export default function Analytics() {
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

  const breakdown = useMemo(() => {
    if (!applications) return [];
    return computeStatusBreakdown(applications);
  }, [applications]);

  const weeklyCounts = useMemo(() => {
    if (!applications) return [];
    return computeWeeklyApplicationCounts(applications);
  }, [applications]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-ink">Analytics</h1>
        <p className="mt-1 font-body text-muted">
          How your job search is trending, based on your applications.
        </p>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 3xl:grid-cols-3">
          <Skeleton className="h-56 w-full" />
          <Skeleton className="h-56 w-full" />
          <Skeleton className="h-56 w-full" />
        </div>
      )}

      {applicationsError && (
        <EmptyState
          title="Couldn't load your analytics"
          description="Something went wrong fetching your applications. Try refreshing the page."
        />
      )}

      {!isLoading && !applicationsError && applications && applications.length === 0 && (
        <EmptyState
          title="Nothing to analyze yet"
          description="Add a few applications and your response rate, weekly activity, and response time will show up here."
        />
      )}

      {!isLoading && !applicationsError && applications && applications.length > 0 && stats && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 3xl:grid-cols-3">
          <ResponseRateChart responseRate={stats.responseRate} breakdown={breakdown} />
          <AvgResponseTimeCard avgResponseDays={stats.avgResponseDays} />
          <div className="lg:col-span-2 3xl:col-span-1">
            <ApplicationsPerWeekChart data={weeklyCounts} />
          </div>
        </div>
      )}
    </div>
  );
}