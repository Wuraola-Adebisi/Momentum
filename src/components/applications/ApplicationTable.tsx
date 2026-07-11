import { DataTable, Badge, Button } from "../ui";
import type { Column } from "../ui";
import type { Application, ApplicationStatus } from "../../types";

interface ApplicationTableProps {
  applications: Application[];
  onEdit: (application: Application) => void;
  onDelete: (application: Application) => void;
}

const STATUS_LABELS: Record<ApplicationStatus, string> = {
  applied: "Applied",
  interviewing: "Interviewing",
  offer: "Offer",
  rejected: "Rejected",
};

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ApplicationTable({ applications, onEdit, onDelete }: ApplicationTableProps) {
  const columns: Column<Application>[] = [
    {
      key: "companyName",
      header: "Company",
      sortable: true,
    },
    {
      key: "roleTitle",
      header: "Role",
      sortable: true,
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (row) => <Badge variant={row.status}>{STATUS_LABELS[row.status]}</Badge>,
    },
    {
      key: "appliedDate",
      header: "Applied",
      sortable: true,
      render: (row) => <span className="font-data">{formatDate(row.appliedDate)}</span>,
    },
    {
      key: "location",
      header: "Location",
      sortable: true,
      render: (row) => row.location ?? <span className="text-muted">—</span>,
    },
    {
      key: "salaryRange",
      header: "Salary",
      sortable: true,
      render: (row) => (
        <span className="font-data">{row.salaryRange ?? <span className="text-muted font-body">—</span>}</span>
      ),
    },
    {
      key: "id",
      header: "",
      render: (row) => (
        <div className="flex gap-2 justify-end">
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(row);
            }}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(row);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={applications}
      columns={columns}
      getRowId={(row) => row.id}
      onRowClick={(row) => onEdit(row)}
    />
  );
}