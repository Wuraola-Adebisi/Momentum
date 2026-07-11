import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { KanbanCard } from "./KanbanCard";
import type { Application, ApplicationStatus } from "../../types";

interface KanbanColumnProps {
  status: ApplicationStatus;
  label: string;
  applications: Application[];
  isMobile: boolean;
  onCardClick: (application: Application) => void;
}

const STATUS_DOT: Record<ApplicationStatus, string> = {
  applied: "bg-status-applied",
  interviewing: "bg-status-interviewing",
  offer: "bg-status-offer",
  rejected: "bg-status-rejected",
};

export function KanbanColumn({ status, label, applications, isMobile, onCardClick }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div className="flex flex-col w-72 shrink-0">
      <div className="flex items-center gap-2 px-1 pb-3">
        <span className={`h-2 w-2 rounded-full ${STATUS_DOT[status]}`} />
        <h3 className="font-body font-medium text-ink">{label}</h3>
        <span className="text-xs text-muted font-data">{applications.length}</span>
      </div>

      <div
        ref={setNodeRef}
        className={`flex-1 min-h-[140px] rounded-md p-2 space-y-2 transition-colors ${
          isOver ? "bg-primary/5" : "bg-paper"
        }`}
      >
        <SortableContext items={applications.map((a) => a.id)} strategy={verticalListSortingStrategy}>
          {applications.map((application) => (
            <KanbanCard
              key={application.id}
              application={application}
              isMobile={isMobile}
              onClick={() => onCardClick(application)}
            />
          ))}
        </SortableContext>

        {applications.length === 0 && (
          <p className="text-xs text-muted text-center py-6">No applications</p>
        )}
      </div>
    </div>
  );
}