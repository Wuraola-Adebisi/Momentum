import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "../ui";
import type { Application } from "../../types";

interface KanbanCardProps {
  application: Application;
  isMobile: boolean;
  onClick?: () => void;
  /** True only for the floating copy rendered inside DragOverlay. */
  dragOverlay?: boolean;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function KanbanCard({ application, isMobile, onClick, dragOverlay = false }: KanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: application.id,
    // Dragging is disabled on mobile; tapping opens the status picker
    // instead (wired by the parent's onClick), matching the mobile
    // fallback the build plan calls for.
    disabled: isMobile,
  });

  const style = dragOverlay
    ? undefined
    : {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
      };

  return (
    <div
      ref={dragOverlay ? undefined : setNodeRef}
      style={style}
      {...(dragOverlay ? {} : attributes)}
      {...(dragOverlay || isMobile ? {} : listeners)}
    >
      <Card
        padding="sm"
        onClick={onClick}
        className={
          dragOverlay
            ? "shadow-lg rotate-1"
            : isMobile
            ? "cursor-pointer hover:shadow-sm"
            : "cursor-grab active:cursor-grabbing hover:shadow-sm"
        }
      >
        <p className="font-body font-medium text-ink truncate">{application.companyName}</p>
        <p className="text-sm text-muted truncate">{application.roleTitle}</p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-muted font-data">{formatDate(application.appliedDate)}</span>
          {application.location && (
            <span className="text-xs text-muted truncate max-w-[100px]">{application.location}</span>
          )}
        </div>
      </Card>
    </div>
  );
}