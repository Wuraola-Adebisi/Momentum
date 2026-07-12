import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { KanbanCard } from "./KanbanCard";
import type { Application, ApplicationStatus } from "../../types";

interface KanbanColumnProps {
  status: ApplicationStatus;
  label: string;
  applications: Application[];
  isMobile: boolean;
  onCardClick: (application: Application) => void;
}

const STATUS_STYLES: Record<
  ApplicationStatus,
  { dot: string; header: string }
> = {
  applied: { dot: "bg-status-applied", header: "border-status-applied" },
  interviewing: {
    dot: "bg-status-interviewing",
    header: "border-status-interviewing",
  },
  offer: { dot: "bg-status-offer", header: "border-status-offer" },
  rejected: { dot: "bg-status-rejected", header: "border-status-rejected" },
};

export function KanbanColumn({
  status,
  label,
  applications,
  isMobile,
  onCardClick,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  const styles = STATUS_STYLES[status];

  return (
    <div className="flex flex-col w-80 shrink-0">
      <div
        className={`flex items-center gap-2 border-t-2 ${styles.header} pt-3 px-1 pb-3`}
      >
        <span className={`h-2 w-2 rounded-full ${styles.dot}`} />
        <h3 className="font-body font-medium text-ink">{label}</h3>
        <span className="text-xs text-muted font-data ml-auto">
          {applications.length}
        </span>
      </div>

      <div
        ref={setNodeRef}
        className={`flex-1 min-h-[160px] rounded-md p-2.5 space-y-2.5 transition-colors ${
          isOver ? "bg-primary/5" : "bg-paper"
        }`}
      >
        <SortableContext
          items={applications.map((a) => a.id)}
          strategy={verticalListSortingStrategy}
        >
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
          <p className="text-xs text-muted text-center py-8">No applications</p>
        )}
      </div>
    </div>
  );
}
