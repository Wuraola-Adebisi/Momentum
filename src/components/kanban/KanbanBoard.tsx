import { useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { KanbanColumn } from "./KanbanColumn";
import { KanbanCard } from "./KanbanCard";
import { StatusPickerSheet } from "./StatusPickerSheet";
import { groupByStatus, computeDropPosition } from "../../lib/kanban";
import { useUpdateApplicationStatus } from "../../hooks/useApplications";
import { useIsMobile } from "../../hooks/useIsMobile";
import type { Application, ApplicationStatus } from "../../types";

interface KanbanBoardProps {
  applications: Application[];
  onEdit: (application: Application) => void;
}

const COLUMNS: { status: ApplicationStatus; label: string }[] = [
  { status: "applied", label: "Applied" },
  { status: "interviewing", label: "Interviewing" },
  { status: "offer", label: "Offer" },
  { status: "rejected", label: "Rejected" },
];

const STATUS_VALUES = new Set<string>(COLUMNS.map((c) => c.status));

export function KanbanBoard({ applications, onEdit }: KanbanBoardProps) {
  const isMobile = useIsMobile();
  const updateStatus = useUpdateApplicationStatus();

  const columns = useMemo(() => groupByStatus(applications), [applications]);

  const [activeApplication, setActiveApplication] = useState<Application | null>(null);
  const [statusPickerFor, setStatusPickerFor] = useState<Application | null>(null);

  // A short drag distance threshold before a drag "starts" lets a plain
  // click still register as a click instead of always being swallowed by
  // the drag sensor.
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  function handleDragStart(event: DragStartEvent) {
    const application = applications.find((app) => app.id === event.active.id);
    setActiveApplication(application ?? null);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveApplication(null);

    const { active, over } = event;
    if (!over) return;

    const draggedId = String(active.id);
    const dragged = applications.find((app) => app.id === draggedId);
    if (!dragged) return;

    // `over.id` is either another card's id, or a column's status value
    // when dropped on the column itself (empty space, not on a card).
    const overId = String(over.id);
    const overIsColumn = STATUS_VALUES.has(overId);
    const targetStatus: ApplicationStatus = overIsColumn
      ? (overId as ApplicationStatus)
      : applications.find((app) => app.id === overId)?.status ?? dragged.status;

    const targetColumnCards = columns[targetStatus].filter((app) => app.id !== draggedId);

    const overIndex = overIsColumn
      ? targetColumnCards.length
      : targetColumnCards.findIndex((app) => app.id === overId);

    const destinationIndex = overIndex === -1 ? targetColumnCards.length : overIndex;
    const newPosition = computeDropPosition(targetColumnCards, destinationIndex);

    if (targetStatus === dragged.status && newPosition === dragged.position) return;

    updateStatus.mutate({ id: dragged.id, status: targetStatus, position: newPosition });
  }

  function handleStatusPick(status: ApplicationStatus) {
    if (!statusPickerFor) return;

    const targetColumnCards = columns[status].filter((app) => app.id !== statusPickerFor.id);
    const newPosition = computeDropPosition(targetColumnCards, targetColumnCards.length);

    updateStatus.mutate({ id: statusPickerFor.id, status, position: newPosition });
    setStatusPickerFor(null);
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-4">
          {COLUMNS.map(({ status, label }) => (
            <KanbanColumn
              key={status}
              status={status}
              label={label}
              applications={columns[status]}
              isMobile={isMobile}
              onCardClick={(application) =>
                isMobile ? setStatusPickerFor(application) : onEdit(application)
              }
            />
          ))}
        </div>

        <DragOverlay>
          {activeApplication && (
            <KanbanCard application={activeApplication} isMobile={false} dragOverlay />
          )}
        </DragOverlay>
      </DndContext>

      <StatusPickerSheet
        application={statusPickerFor}
        onClose={() => setStatusPickerFor(null)}
        onSelect={handleStatusPick}
      />
    </>
  );
}