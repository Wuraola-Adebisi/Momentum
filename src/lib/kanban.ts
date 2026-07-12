import type { Application, ApplicationStatus, KanbanColumns } from "../types";

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

export function computeDropPosition(
  columnApplications: Application[],
  destinationIndex: number,
): number {
  const before = columnApplications[destinationIndex - 1];
  const after = columnApplications[destinationIndex];

  if (!before && !after) return 0;
  if (!before) return after.position - 1;
  if (!after) return before.position + 1;

  const midpoint = Math.floor((before.position + after.position) / 2);

  return midpoint === before.position ? before.position + 1 : midpoint;
}
