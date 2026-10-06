import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BriefcaseBusiness, SearchX } from "lucide-react";
import { Button, Skeleton, EmptyState, Modal } from "../components/ui";
import { ApplicationDetail } from "../components/applications/ApplicationDetail";
import { ApplicationForm } from "../components/applications/ApplicationForm";
import { ApplicationTable } from "../components/applications/ApplicationTable";
import { FilterBar } from "../components/applications/FilterBar";
import { SearchBar } from "../components/applications/SearchBar";
import { ViewSwitcher } from "../components/applications/ViewSwitcher";
import { KanbanBoard } from "../components/kanban/KanbanBoard";
import { DEFAULT_SORT } from "../lib/applicationSort";
import { useApplications, useDeleteApplication } from "../hooks/useApplications";
import type { Application, ApplicationStatus } from "../types";

const STATUS_LABELS: Record<ApplicationStatus,string> = {
  applied:"Applied", interviewing:"Interviewing", offer:"Offer", rejected:"Rejected",
};

export default function Applications() {
  const { data: applications, isLoading, isError, error } = useApplications();
  const deleteApplication = useDeleteApplication();
  const [searchParams,setSearchParams] = useSearchParams();
  const [formOpen,setFormOpen] = useState(false);
  const [editingApplication,setEditingApplication] = useState<Application|undefined>();
  const [pendingDelete,setPendingDelete] = useState<Application|null>(null);
  const [detailApplication,setDetailApplication] = useState<Application|null>(null);
  const newParam=searchParams.get("new");
  const focusParam=searchParams.get("focus");
  const [prevNewParam,setPrevNewParam]=useState(newParam);
  const [prevFocusParam,setPrevFocusParam]=useState(focusParam);

  if(focusParam!==prevFocusParam && applications){
    setPrevFocusParam(focusParam);
    const focused=applications.find(a=>a.id===focusParam);
    if(focused)setDetailApplication(focused);
  }

  if(newParam!==prevNewParam){
    setPrevNewParam(newParam);
    if(newParam==="true"){setEditingApplication(undefined);setFormOpen(true);}
  }

  const view=searchParams.get("view")==="board"?"board":"table";
  const hasActiveFilters=searchParams.has("status")||searchParams.has("q");

  const searchedApplications=useMemo(()=>{
    if(!applications)return [];
    const query=(searchParams.get("q")??"").trim().toLowerCase();
    if(!query)return applications;
    return applications.filter(a=>a.companyName.toLowerCase().includes(query)||a.roleTitle.toLowerCase().includes(query));
  },[applications,searchParams]);

  const visibleApplications=useMemo(()=>{
    if(view==="board")return searchedApplications;
    const status=searchParams.get("status");
    const [sortKey,sortDir]=(searchParams.get("sort")??DEFAULT_SORT).split("-") as [keyof Application,"asc"|"desc"];
    let result=searchedApplications;
    if(status)result=result.filter(a=>a.status===status);
    return [...result].sort((a,b)=>{
      const av=String(a[sortKey]??""),bv=String(b[sortKey]??"");
      return sortDir==="asc"?av.localeCompare(bv,undefined,{numeric:true}):bv.localeCompare(av,undefined,{numeric:true});
    });
  },[searchedApplications,searchParams,view]);

  const counts=useMemo(()=>{
    const source=applications??[];
    return (Object.keys(STATUS_LABELS) as ApplicationStatus[]).map(status=>({status,label:STATUS_LABELS[status],count:source.filter(a=>a.status===status).length}));
  },[applications]);

  function openCreateForm(){setEditingApplication(undefined);setFormOpen(true);}
  function openEditForm(application:Application){setEditingApplication(application);setFormOpen(true);}
  function closeForm(){
    setFormOpen(false);
    if(searchParams.get("new")){const next=new URLSearchParams(searchParams);next.delete("new");setSearchParams(next,{replace:true});}
  }
  function clearFilters(){const next=new URLSearchParams(searchParams);next.delete("status");next.delete("q");setSearchParams(next);}
  async function confirmDelete(){if(!pendingDelete)return;await deleteApplication.mutateAsync(pendingDelete.id);setPendingDelete(null);}

  const hasAnyApplications=!isLoading&&!isError&&Boolean(applications?.length);
  const hasNoResults=hasAnyApplications&&visibleApplications.length===0;

  return <div className="space-y-7 animate-fade-up">
    <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
      <div>
        <p className="eyebrow">Your pipeline</p>
        <h1 className="mt-2">Applications</h1>
        <p className="mt-2 max-w-xl text-muted">A single view of every opportunity, from first application to offer.</p>
      </div>
      <Button variant="accent" onClick={openCreateForm}><BriefcaseBusiness size={17} aria-hidden="true"/> Add application</Button>
    </div>

    {hasAnyApplications && <section aria-label="Application pipeline summary" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {counts.map(({status,label,count})=>{
        const active=searchParams.get("status")===status;
        return <button key={status} type="button" onClick={()=>{
          const next=new URLSearchParams(searchParams);
          if(active)next.delete("status");else next.set("status",status);
          setSearchParams(next);
        }} className={`group rounded-2xl border p-4 text-left transition-[background-color,border-color,transform] hover:-translate-y-0.5 ${active?"border-ink bg-ink text-paper":"border-line/80 bg-surface hover:border-ink/20"}`}>
          <div className="flex items-center justify-between gap-3"><span className={`status-rule ${status==="applied"?"bg-status-applied":status==="interviewing"?"bg-status-interviewing":status==="offer"?"bg-status-offer":"bg-status-rejected"}`}/><span className={`font-data text-xs ${active?"text-paper/60":"text-muted"}`}>{String(count).padStart(2,"0")}</span></div>
          <p className={`mt-4 text-sm font-medium ${active?"text-paper":"text-ink"}`}>{label}</p>
        </button>;
      })}
    </section>}

    {hasAnyApplications && <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar />
        <ViewSwitcher />
      </div>
      {view==="table"&&<FilterBar/>}
    </div>}

    {isLoading&&<div className="space-y-3"><Skeleton className="h-12 w-full rounded-2xl"/><Skeleton className="h-72 w-full rounded-2xl"/></div>}
    {isError&&<p className="rounded-2xl border border-status-rejected/20 bg-status-rejected/5 p-4 text-sm text-status-rejected">{error instanceof Error?error.message:"Couldn't load your applications. Try refreshing."}</p>}

    {!isLoading&&!isError&&!applications?.length&&<EmptyState icon={BriefcaseBusiness} title="Start your pipeline" description="Add the first role you're pursuing. Momentum will build the dashboard around your real activity." actionLabel="Add application" onAction={openCreateForm}/>}
    {hasNoResults&&<EmptyState icon={SearchX} tone="muted" title="No applications match your filters" description="Try another search or clear the current filters." actionLabel={hasActiveFilters?"Clear filters":undefined} onAction={hasActiveFilters?clearFilters:undefined}/>}
    {!hasNoResults&&hasAnyApplications&&view==="table"&&<ApplicationTable applications={visibleApplications} onRowClick={setDetailApplication} onEdit={openEditForm} onDelete={setPendingDelete}/>}
    {!hasNoResults&&hasAnyApplications&&view==="board"&&<KanbanBoard applications={visibleApplications} onOpenDetail={setDetailApplication} onEdit={openEditForm} onDelete={setPendingDelete}/>}
    <ApplicationDetail application={detailApplication} open={detailApplication!==null} onClose={()=>setDetailApplication(null)} onEdit={(a)=>{setDetailApplication(null);openEditForm(a);}} onDelete={(a)=>{setDetailApplication(null);setPendingDelete(a);}}/>
    <ApplicationForm open={formOpen} onClose={closeForm} application={editingApplication}/>
    <Modal open={pendingDelete!==null} onClose={()=>setPendingDelete(null)}>
      <div className="space-y-5">
        <p className="eyebrow text-status-rejected">Permanent action</p>
        <h2 className="text-2xl">Delete application?</h2>
        <p className="text-sm text-muted">This removes the application and its associated notes/interviews. This can't be undone.</p>
        {pendingDelete&&<div className="rounded-xl bg-paper p-4"><p className="font-medium text-ink">{pendingDelete.roleTitle}</p><p className="text-sm text-muted">{pendingDelete.companyName}</p></div>}
        <div className="flex justify-end gap-2"><Button variant="ghost" onClick={()=>setPendingDelete(null)}>Cancel</Button><Button variant="destructive" onClick={confirmDelete} loading={deleteApplication.isPending}>Delete</Button></div>
      </div>
    </Modal>
  </div>;
}