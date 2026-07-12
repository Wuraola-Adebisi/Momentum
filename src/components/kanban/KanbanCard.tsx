import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "../ui";
import type { Application, ApplicationStatus } from "../../types";

interface KanbanCardProps {
  application: Application;
  isMobile: boolean;
  onClick?: () => void;
  /** True only for the floating copy rendered inside DragOverlay. */
  dragOverlay?: boolean;
}

const STATUS_BORDER: Record<ApplicationStatus, string> = {
  applied: "border-l-status-applied",
  interviewing: "border-l-status-interviewing",
  offer: "border-l-status-offer",
  rejected: "border-l-status-rejected",
};

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function KanbanCard({
  application,
  isMobile,
  onClick,
  dragOverlay = false,
}: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: application.id,
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
        padding="md"
        onClick={onClick}
        className={`border-l-4 ${STATUS_BORDER[application.status]} ${
          dragOverlay
            ? "shadow-lg rotate-1"
            : isMobile
              ? "cursor-pointer hover:shadow-sm"
              : "cursor-grab active:cursor-grabbing hover:shadow-sm"
        }`}
      >
        <p className="font-body font-medium text-ink truncate">
          {application.companyName}
        </p>
        <p className="text-sm text-muted truncate mt-0.5">
          {application.roleTitle}
        </p>

        <div className="flex items-center justify-between pt-3">
          <span className="text-xs text-muted font-data">
            {formatDate(application.appliedDate)}
          </span>
          {application.location && (
            <span className="text-xs text-muted truncate max-w-[110px]">
              {application.location}
            </span>
          )}
        </div>
      </Card>
    </div>
  );
}
