import { ChevronRight, ExternalLink, MoreVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, Dropdown } from "../ui";
import type { Application } from "../../types";

interface KanbanCardProps {
  application:Application; isMobile:boolean; onClick?:()=>void; onChangeStatus?:()=>void;
  onViewDetail?:()=>void; onEdit?:()=>void; onDelete?:()=>void; dragOverlay?:boolean;
}

function formatDate(dateStr:string){
  if(!dateStr)return "";
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString(undefined,{month:"short",day:"numeric"});
}

export function KanbanCard({application,isMobile,onClick,onChangeStatus,onViewDetail,onEdit,onDelete,dragOverlay=false}:KanbanCardProps){
  const {attributes,listeners,setNodeRef,transform,transition,isDragging}=useSortable({id:application.id,disabled:isMobile});
  const style=dragOverlay?undefined:{transform:CSS.Transform.toString(transform),transition,opacity:isDragging?.4:1};
  const menuOptions=[
    {label:"View details",value:"view"},{label:"Change status",value:"status"},{label:"Edit",value:"edit"},{label:"Delete",value:"delete"},
  ];
  function handleMenuSelect(value:string){
    if(value==="view")onViewDetail?.();
    if(value==="status")onChangeStatus?.();
    if(value==="edit")onEdit?.();
    if(value==="delete")onDelete?.();
  }
  return <div ref={dragOverlay?undefined:setNodeRef} style={style} {...(dragOverlay?{}:attributes)} {...(dragOverlay||isMobile?{}:listeners)}>
    <Card padding="md" onClick={onClick} className={dragOverlay?"rotate-1 shadow-lift":isMobile?"cursor-pointer hover:border-ink/20":"cursor-grab active:cursor-grabbing hover:border-ink/20"}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-medium text-ink">{application.companyName}</p>
          <p className="mt-0.5 truncate text-sm text-muted">{application.roleTitle}</p>
        </div>
        {!dragOverlay&&(onViewDetail||onEdit||onDelete)&&<div onPointerDown={e=>e.stopPropagation()}>
          <Dropdown align="right" options={menuOptions} onSelect={handleMenuSelect} triggerAriaLabel={`More actions for ${application.companyName}`} trigger={<span className="flex h-10 w-10 items-center justify-center rounded-full text-muted hover:bg-paper hover:text-ink"><MoreVertical size={17}/></span>}/>
        </div>}
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 border-t border-line/60 pt-3">
        <span className="truncate font-data text-[11px] text-muted">{formatDate(application.appliedDate)}</span>
        <div className="flex min-w-0 items-center gap-2">
          {application.location&&<span className="max-w-[120px] truncate text-[11px] text-muted">{application.location}</span>}
          {application.jobUrl&&<a href={application.jobUrl} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()} aria-label={`Open job posting for ${application.companyName}`} className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-full text-muted hover:bg-paper hover:text-ink"><ExternalLink size={14}/></a>}
          <ChevronRight size={15} className="text-muted" aria-hidden="true"/>
        </div>
      </div>
    </Card>
  </div>;
}