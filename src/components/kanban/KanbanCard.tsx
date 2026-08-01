import { MoreVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, Dropdown } from "../ui";
import type { Application } from "../../types";

interface KanbanCardProps {
  application: Application;
  isMobile: boolean;
  /** Card-body click/tap: opens the detail drawer on desktop, the status picker on mobile. */
  onClick?: () => void;
  /** Kebab menu action, always opens the detail drawer regardless of platform. */
  onViewDetail?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  /** True only for the floating copy rendered inside DragOverlay. */
  dragOverlay?: boolean;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function KanbanCard({
  application,
  isMobile,
  onClick,
  onViewDetail,
  onEdit,
  onDelete,
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

  const menuOptions = [
    { label: "View details", value: "view" },
    { label: "Edit", value: "edit" },
    { label: "Delete", value: "delete" },
  ];

  function handleMenuSelect(value: string) {
    if (value === "view") onViewDetail?.();
    if (value === "edit") onEdit?.();
    if (value === "delete") onDelete?.();
  }

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
        className={
          dragOverlay
            ? "shadow-lg rotate-1"
            : isMobile
              ? "cursor-pointer hover:shadow-sm"
              : "cursor-grab active:cursor-grabbing hover:shadow-sm"
        }
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-body font-medium text-ink truncate">
              {application.companyName}
            </p>
            <p className="text-sm text-muted truncate mt-0.5">
              {application.roleTitle}
            </p>
          </div>

          {!dragOverlay && (onViewDetail || onEdit || onDelete) && (
            <div onPointerDown={(e) => e.stopPropagation()}>
              <Dropdown
                align="right"
                options={menuOptions}
                onSelect={handleMenuSelect}
                triggerAriaLabel={`More actions for ${application.companyName}`}
                trigger={
                  <span className="flex h-7 w-7 items-center justify-center rounded-md text-muted hover:bg-muted/10 hover:text-ink transition">
                    <MoreVertical size={16} />
                  </span>
                }
              />
            </div>
          )}
        </div>

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
