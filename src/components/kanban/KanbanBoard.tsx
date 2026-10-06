import { useMemo, useState } from "react";
import { DndContext, DragOverlay, PointerSensor, closestCorners, useSensor, useSensors, type DragEndEvent, type DragStartEvent } from "@dnd-kit/core";
import { KanbanCard } from "./KanbanCard";
import { KanbanColumn } from "./KanbanColumn";
import { StatusPickerSheet } from "./StatusPickerSheet";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useUpdateApplicationStatus } from "../../hooks/useApplications";
import { computeDropPosition, groupByStatus } from "../../lib/kanban";
import type { Application, ApplicationStatus } from "../../types";

interface KanbanBoardProps {
  applications: Application[];
  onOpenDetail: (application: Application) => void;
  onEdit: (application: Application) => void;
  onDelete: (application: Application) => void;
}

const COLUMNS:{status:ApplicationStatus;label:string}[]=[
  {status:"applied",label:"Applied"},{status:"interviewing",label:"Interviewing"},{status:"offer",label:"Offer"},{status:"rejected",label:"Rejected"},
];
const STATUS_VALUES=new Set<string>(COLUMNS.map(c=>c.status));

export function KanbanBoard({applications,onOpenDetail,onEdit,onDelete}:KanbanBoardProps){
  const isMobile=useIsMobile();
  const updateStatus=useUpdateApplicationStatus();
  const columns=useMemo(()=>groupByStatus(applications),[applications]);
  const [activeApplication,setActiveApplication]=useState<Application|null>(null);
  const [statusPickerFor,setStatusPickerFor]=useState<Application|null>(null);
  const sensors=useSensors(useSensor(PointerSensor,{activationConstraint:{distance:8}}));

  function handleDragStart(event:DragStartEvent){
    setActiveApplication(applications.find(app=>app.id===event.active.id)??null);
  }

  function handleDragEnd(event:DragEndEvent){
    setActiveApplication(null);
    const {active,over}=event;
    if(!over)return;
    const dragged=applications.find(app=>app.id===String(active.id));
    if(!dragged)return;
    const overId=String(over.id);
    const overIsColumn=STATUS_VALUES.has(overId);
    const targetStatus:ApplicationStatus=overIsColumn?(overId as ApplicationStatus):(applications.find(app=>app.id===overId)?.status??dragged.status);
    const targetCards=columns[targetStatus].filter(app=>app.id!==dragged.id);
    const overIndex=overIsColumn?targetCards.length:targetCards.findIndex(app=>app.id===overId);
    const destinationIndex=overIndex===-1?targetCards.length:overIndex;
    const newPosition=computeDropPosition(targetCards,destinationIndex);
    if(targetStatus===dragged.status&&newPosition===dragged.position)return;
    updateStatus.mutate({id:dragged.id,status:targetStatus,position:newPosition});
  }

  function handleStatusPick(status:ApplicationStatus){
    if(!statusPickerFor)return;
    const targetCards=columns[status].filter(app=>app.id!==statusPickerFor.id);
    updateStatus.mutate({id:statusPickerFor.id,status,position:computeDropPosition(targetCards,targetCards.length)});
    setStatusPickerFor(null);
  }

  return <>
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto px-1 pb-4 snap-x">
        {COLUMNS.map(({status,label})=><KanbanColumn
          key={status} status={status} label={label} applications={columns[status]} isMobile={isMobile}
          onCardClick={onOpenDetail}
          onChangeStatus={setStatusPickerFor}
          onViewDetail={onOpenDetail} onEdit={onEdit} onDelete={onDelete}
        />)}
      </div>
      <DragOverlay>
        {activeApplication&&<KanbanCard application={activeApplication} isMobile={false} dragOverlay/>}
      </DragOverlay>
    </DndContext>
    <StatusPickerSheet application={statusPickerFor} onClose={()=>setStatusPickerFor(null)} onSelect={handleStatusPick}/>
  </>;
}