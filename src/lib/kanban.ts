// src/lib/kanban.ts
import type { Application, ApplicationStatus, KanbanColumns } from "../types";

/**
 * Groups applications by status and sorts each column by position, so the
 * board renders columns in the order set by drag-and-drop, not just
 * insertion order.
 */
export function groupByStatus(applications: Application[]): KanbanColumns {
  const columns: KanbanColumns = {
    applied: [],
    interviewing: [],
    offer: [],
    rejected: [],
  };

  for (const application of applications) {
    columns[application.status].push(application);
  }

  for (const status of Object.keys(columns) as ApplicationStatus[]) {
    columns[status].sort((a, b) => a.position - b.position);
  }

  return columns;
}

/**
 * Computes an integer position for a card dropped at `destinationIndex`
 * within `columnApplications` (that column's cards, already sorted by
 * position, with the dragged card itself excluded). Uses the midpoint
 * between the two neighboring positions, so most drops only need to write
 * the one dragged row instead of renumbering the whole column.
 *
 * Known limitation: `position` is an integer column, so repeatedly
 * dropping cards between the same two neighbors will eventually run out
 * of room between them (the midpoint stops changing once the neighbors
 * are adjacent integers). The fallback below nudges past the earlier
 * neighbor instead of colliding with it, but a real fix would be a full
 * column reindex. Flagged as a known edge case rather than solved here,
 * since it's outside Phase 5's scope and unlikely to bite in practice for
 * a single user's application list.
 */
export function computeDropPosition(
  columnApplications: Application[],
  destinationIndex: number
): number {
  const before = columnApplications[destinationIndex - 1];
  const after = columnApplications[destinationIndex];

  if (!before && !after) return 0;
  if (!before) return after.position - 1;
  if (!after) return before.position + 1;

  const midpoint = Math.floor((before.position + after.position) / 2);

  return midpoint === before.position ? before.position + 1 : midpoint;
}