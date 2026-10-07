import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { KanbanCard } from "./KanbanCard";
import type { Application, ApplicationStatus } from "../../types";

interface KanbanColumnProps {
  status:ApplicationStatus; label:string; applications:Application[]; isMobile:boolean;
  onCardClick:(application:Application)=>void;
  onChangeStatus:(application:Application)=>void;
  onViewDetail:(application:Application)=>void; onEdit:(application:Application)=>void; onDelete:(application:Application)=>void;
}

const STATUS_STYLES:Record<ApplicationStatus,{dot:string;header:string}>={
  applied:{dot:"bg-status-applied",header:"border-status-applied"},
  interviewing:{dot:"bg-status-interviewing",header:"border-status-interviewing"},
  offer:{dot:"bg-status-offer",header:"border-status-offer"},
  rejected:{dot:"bg-status-rejected",header:"border-status-rejected"},
};

export function KanbanColumn({status,label,applications,isMobile,onCardClick,onChangeStatus,onViewDetail,onEdit,onDelete}:KanbanColumnProps){
  const {setNodeRef,isOver}=useDroppable({id:status});
  const styles=STATUS_STYLES[status];
  return <div className="flex w-[82vw] max-w-80 shrink-0 snap-start flex-col sm:w-80">
    <div className={`flex items-center gap-2 border-t-2 ${styles.header} px-1 pb-3 pt-3`}>
      <span className={`h-2 w-2 rounded-full ${styles.dot}`}/>
      <h3 className="font-body text-base font-semibold text-ink">{label}</h3>
      <span className="ml-auto rounded-full bg-ink/5 px-2 py-0.5 font-data text-[11px] text-muted">{applications.length}</span>
    </div>
    <div ref={setNodeRef} className={`min-h-[180px] flex-1 space-y-2.5 rounded-2xl border border-line/70 p-2.5 transition-colors ${isOver?"bg-primary/5":"bg-surface/55"}`}>
      <SortableContext items={applications.map(a=>a.id)} strategy={verticalListSortingStrategy}>
        {applications.map(application=><KanbanCard
          key={application.id} application={application} isMobile={isMobile}
          onClick={()=>onCardClick(application)} onChangeStatus={()=>onChangeStatus(application)}
          onViewDetail={()=>onViewDetail(application)} onEdit={()=>onEdit(application)} onDelete={()=>onDelete(application)}
        />)}
      </SortableContext>
      {applications.length===0&&<div className="flex min-h-40 items-center justify-center rounded-xl border border-dashed border-line/80 px-4"><p className="text-center text-xs text-muted">Drop an application here</p></div>}
    </div>
  </div>;
}