import { useState } from "react";
import { Button, Skeleton, EmptyState, Modal } from "../components/ui";
import { ApplicationForm } from "../components/applications/ApplicationForm";
import { ApplicationTable } from "../components/applications/ApplicationTable";
import { useApplications, useDeleteApplication } from "../hooks/useApplications";
import type { Application } from "../types";

export default function Applications() {
  const { data: applications, isLoading, isError, error } = useApplications();
  const deleteApplication = useDeleteApplication();

  const [formOpen, setFormOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState<Application | undefined>(undefined);
  const [pendingDelete, setPendingDelete] = useState<Application | null>(null);

  function openCreateForm() {
    setEditingApplication(undefined);
    setFormOpen(true);
  }

  function openEditForm(application: Application) {
    setEditingApplication(application);
    setFormOpen(true);
  }

  async function confirmDelete() {
    if (!pendingDelete) return;
    await deleteApplication.mutateAsync(pendingDelete.id);
    setPendingDelete(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-ink">Applications</h1>
          <p className="text-muted mt-1">Track every role you've applied to in one place.</p>
        </div>

        <Button variant="accent" onClick={openCreateForm}>
          Add application
        </Button>
      </div>

      {isLoading && (
        <div className="space-y-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      )}

      {isError && (
        <p className="text-sm text-status-rejected">
          {error instanceof Error ? error.message : "Couldn't load your applications. Try refreshing."}
        </p>
      )}

      {!isLoading && !isError && applications && applications.length === 0 && (
        <EmptyState
          title="No applications yet"
          description="Add your first application to start tracking your job search."
          actionLabel="Add application"
          onAction={openCreateForm}
        />
      )}

      {!isLoading && !isError && applications && applications.length > 0 && (
        <ApplicationTable
          applications={applications}
          onEdit={openEditForm}
          onDelete={(application) => setPendingDelete(application)}
        />
      )}

      <ApplicationForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        application={editingApplication}
      />

      <Modal open={pendingDelete !== null} onClose={() => setPendingDelete(null)}>
        <div className="space-y-4">
          <h2 className="text-lg font-display font-semibold text-ink">Delete application</h2>

          <p className="text-sm text-muted">
            {pendingDelete && (
              <>
                Delete the application for <span className="text-ink font-medium">{pendingDelete.roleTitle}</span> at{" "}
                <span className="text-ink font-medium">{pendingDelete.companyName}</span>? This can't be undone.
              </>
            )}
          </p>

          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setPendingDelete(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete} loading={deleteApplication.isPending}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}