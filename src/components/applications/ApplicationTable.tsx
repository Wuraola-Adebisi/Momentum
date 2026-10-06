import { ExternalLink, MoreHorizontal } from "lucide-react";
import { DataTable, Badge, Button, Card } from "../ui";
import type { Column } from "../ui";
import type { Application, ApplicationStatus } from "../../types";

interface ApplicationTableProps {
  applications: Application[];
  onRowClick: (application: Application) => void;
  onEdit: (application: Application) => void;
  onDelete: (application: Application) => void;
}

const STATUS_LABELS: Record<ApplicationStatus,string> = {
  applied:"Applied", interviewing:"Interviewing", offer:"Offer", rejected:"Rejected",
};

function formatDate(dateStr:string){
  if(!dateStr)return "";
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString(undefined,{month:"short",day:"numeric",year:"numeric"});
}

export function ApplicationTable({applications,onRowClick,onEdit,onDelete}:ApplicationTableProps){
  const columns:Column<Application>[]=[
    {key:"companyName",header:"Company",sortable:true,render:row=><div><p className="font-medium text-ink">{row.companyName}</p><p className="mt-0.5 text-xs text-muted">{row.location??"Location not added"}</p></div>},
    {key:"roleTitle",header:"Role",sortable:true},
    {key:"status",header:"Status",sortable:true,render:row=><Badge variant={row.status}>{STATUS_LABELS[row.status]}</Badge>},
    {key:"appliedDate",header:"Applied",sortable:true,render:row=><span className="font-data text-xs">{formatDate(row.appliedDate)}</span>},
    {key:"salaryRange",header:"Salary",sortable:true,render:row=><span className="font-data text-xs">{row.salaryRange??"—"}</span>},
    {key:"id",header:"",render:row=><div className="flex justify-end gap-1">
      {row.jobUrl&&<a href={row.jobUrl} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()} aria-label={`Open job posting for ${row.companyName}`} className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-full text-muted hover:bg-paper hover:text-ink"><ExternalLink size={15}/></a>}
      <Button size="sm" variant="ghost" onClick={e=>{e.stopPropagation();onEdit(row);}}>Edit</Button>
    </div>},
  ];

  return <>
    <div className="hidden md:block">
      <DataTable data={applications} columns={columns} getRowId={row=>row.id} onRowClick={onRowClick}/>
    </div>
    <div className="space-y-2 md:hidden">
      {applications.map(app=><Card key={app.id} padding="md" hoverable>
        <button type="button" className="w-full text-left" onClick={()=>onRowClick(app)}>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0"><p className="truncate font-medium text-ink">{app.companyName}</p><p className="mt-0.5 truncate text-sm text-muted">{app.roleTitle}</p></div>
            <Badge variant={app.status}>{STATUS_LABELS[app.status]}</Badge>
          </div>
          <div className="mt-4 flex items-center justify-between gap-3 text-xs text-muted">
            <span className="font-data">{formatDate(app.appliedDate)}</span>
            <span className="truncate">{app.location??"Location not added"}</span>
          </div>
        </button>
        <div className="mt-3 flex justify-end gap-1 border-t border-line/60 pt-3">
          {app.jobUrl&&<a href={app.jobUrl} target="_blank" rel="noreferrer" aria-label={`Open job posting for ${app.companyName}`} className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-full text-muted hover:bg-paper hover:text-ink"><ExternalLink size={16}/></a>}
          <Button size="sm" variant="ghost" onClick={()=>onEdit(app)}><MoreHorizontal size={16}/><span>Actions</span></Button>
        </div>
      </Card>)}
    </div>
  </>;
}