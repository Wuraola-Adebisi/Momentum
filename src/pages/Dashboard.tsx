import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertTriangle, BriefcaseBusiness, CalendarClock, Trophy, TrendingUp } from "lucide-react";
import { Card, Skeleton, EmptyState, Button } from "../components/ui";
import { StatsCard } from "../components/dashboard/StatsCard";
import { RecentActivity } from "../components/dashboard/RecentActivity";
import { AttentionPanel } from "../components/dashboard/AttentionPanel";
import { MomentumSparkline } from "../components/dashboard/MomentumSparkline";
import { useApplications } from "../hooks/useApplications";
import { useActivityLog } from "../hooks/useActivityLog";
import { computeDashboardStats, computeWeeklyApplicationCounts } from "../lib/analytics";

export default function Dashboard() {
  const navigate=useNavigate();
  const {data:applications,isLoading:applicationsLoading,isError:applicationsError}=useApplications();
  const {data:activityLog,isLoading:activityLoading}=useActivityLog();
  const isLoading=applicationsLoading||activityLoading;

  const stats=useMemo(()=>applications?computeDashboardStats(applications,activityLog??[]):null,[applications,activityLog]);
  const weeklyCounts=useMemo(()=>applications?computeWeeklyApplicationCounts(applications):[],[applications]);
  const hasApplications=!isLoading&&Boolean(applications?.length);

  return <div className="space-y-7 animate-fade-up">
    <div className="grid gap-5 xl:grid-cols-[1fr_auto] xl:items-end">
      <div><p className="eyebrow">Career command center</p><h1 className="mt-2">Keep the search moving.</h1><p className="mt-3 max-w-2xl text-muted">See what needs attention, where your applications are landing, and how consistently you’re moving the pipeline.</p></div>
      {hasApplications&&<Button variant="accent" onClick={()=>navigate("/applications?new=true")}><BriefcaseBusiness size={17}/> Add application</Button>}
    </div>

    {isLoading&&<div className="space-y-5"><div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">{[1,2,3,4].map(i=><Skeleton key={i} className="h-32 w-full rounded-2xl"/>)}</div><div className="grid gap-4 lg:grid-cols-2"><Skeleton className="h-72 rounded-2xl"/><Skeleton className="h-72 rounded-2xl"/></div></div>}

    {applicationsError&&<EmptyState icon={AlertTriangle} tone="error" title="Couldn't load your dashboard" description="Something went wrong fetching your data. Refresh the page to try again."/>}

    {!isLoading&&!applicationsError&&!hasApplications&&<Card padding="lg" className="overflow-hidden">
      <div className="max-w-xl"><p className="eyebrow">First move</p><h2 className="mt-2">Build your pipeline before you build your routine.</h2><p className="mt-3 text-muted">Add the first role you’re pursuing. Momentum will turn the raw application history into useful signals as you go.</p><div className="mt-6"><Button variant="accent" onClick={()=>navigate("/applications?new=true")}>Add your first application</Button></div></div>
    </Card>}

    {!isLoading&&!applicationsError&&hasApplications&&stats&&<>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatsCard label="Active applications" value={String(stats.totalActive)} icon={BriefcaseBusiness} accent="primary"/>
        <StatsCard label="Interviewing" value={String(stats.interviewCount)} icon={CalendarClock} accent="interviewing"/>
        <StatsCard label="Offers" value={String(stats.offerCount)} icon={Trophy} accent="offer"/>
        <StatsCard label="Response rate" value={String(stats.responseRate)+"%"} icon={TrendingUp} accent="ink"/>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.35fr_.85fr]">
        <Card padding="lg">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div><p className="eyebrow">Consistency</p><h2 className="mt-1 text-3xl">Application activity</h2><p className="mt-1 text-sm text-muted">Applications submitted over the last 8 weeks</p></div>
            {stats.avgResponseDays!==null&&<div className="rounded-full bg-paper px-3 py-2 font-data text-xs text-muted">Avg. response {stats.avgResponseDays}d</div>}
          </div>
          <MomentumSparkline data={weeklyCounts.map(week=>week.count)} className="mt-6 h-40 w-full"/>
          <div className="mt-2 flex justify-between font-data text-[11px] text-muted"><span>{weeklyCounts[0]?.weekLabel}</span><span>{weeklyCounts[weeklyCounts.length-1]?.weekLabel}</span></div>
        </Card>
        <RecentActivity entries={activityLog??[]}/>
      </div>

      <AttentionPanel applications={applications ?? []} onOpen={(application) => navigate("/applications?focus=" + encodeURIComponent(application.id))} />

      <div className="flex justify-end"><Link to="/analytics"><Button variant="ghost">View full analytics →</Button></Link></div>
    </>}
  </div>;
}