import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BriefcaseBusiness, SearchX } from "lucide-react";
import { Button, Skeleton, EmptyState, Modal } from "../components/ui";
import { ApplicationDetail } from "../components/applications/ApplicationDetail";
import { ApplicationForm } from "../components/applications/ApplicationForm";
import { ApplicationTable } from "../components/applications/ApplicationTable";
import { FilterBar } from "../components/applications/FilterBar";
import { SearchBar } from "../components/applications/SearchBar";
import { ViewSwitcher } from "../components/applications/ViewSwitcher";
import { KanbanBoard } from "../components/kanban/KanbanBoard";
import { DEFAULT_SORT } from "../lib/applicationSort";
import {
  useApplications,
  useDeleteApplication,
} from "../hooks/useApplications";
import type { Application } from "../types";

export default function Applications() {
  const { data: applications, isLoading, isError, error } = useApplications();
  const deleteApplication = useDeleteApplication();
  const [searchParams, setSearchParams] = useSearchParams();

  const [formOpen, setFormOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState<Application | undefined>(undefined);
  const [pendingDelete, setPendingDelete] = useState<Application | null>(null);
  const [detailApplication, setDetailApplication] =
    useState<Application | null>(null);

  const newParam = searchParams.get("new");
  const [prevNewParam, setPrevNewParam] = useState(newParam);

  if (newParam !== prevNewParam) {
    setPrevNewParam(newParam);
    if (newParam === "true") {
      setEditingApplication(undefined);
      setFormOpen(true);
    }
  }

  const view = searchParams.get("view") === "board" ? "board" : "table";
  const hasActiveFilters = searchParams.has("status") || searchParams.has("q");

  const searchedApplications = useMemo(() => {
    if (!applications) return [];

    const query = (searchParams.get("q") ?? "").trim().toLowerCase();
    if (!query) return applications;

    return applications.filter(
      (application) =>
        application.companyName.toLowerCase().includes(query) ||
        application.roleTitle.toLowerCase().includes(query),
    );
  }, [applications, searchParams]);

  const visibleApplications = useMemo(() => {
    if (view === "board") return searchedApplications;

    const status = searchParams.get("status");
    const [sortKey, sortDir] = (searchParams.get("sort") ?? DEFAULT_SORT).split(
      "-",
    ) as [keyof Application, "asc" | "desc"];

    let result = searchedApplications;

    if (status) {
      result = result.filter((application) => application.status === status);
    }

    return [...result].sort((a, b) => {
      const aValue = String(a[sortKey] ?? "");
      const bValue = String(b[sortKey] ?? "");
      return sortDir === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  }, [searchedApplications, searchParams, view]);

  function openCreateForm() {
    setEditingApplication(undefined);
    setFormOpen(true);
  }

  function openEditForm(application: Application) {
    setEditingApplication(application);
    setFormOpen(true);
  }

  function openDetail(application: Application) {
    setDetailApplication(application);
  }

  function closeForm() {
    setFormOpen(false);

    if (searchParams.get("new")) {
      const next = new URLSearchParams(searchParams);
      next.delete("new");
      setSearchParams(next, { replace: true });
    }
  }

  function editFromDetail(application: Application) {
    setDetailApplication(null);
    openEditForm(application);
  }

  function deleteFromDetail(application: Application) {
    setDetailApplication(null);
    setPendingDelete(application);
  }

  function clearFilters() {
    const next = new URLSearchParams(searchParams);
    next.delete("status");
    next.delete("q");
    setSearchParams(next);
  }

  async function confirmDelete() {
    if (!pendingDelete) return;
    await deleteApplication.mutateAsync(pendingDelete.id);
    setPendingDelete(null);
  }

  const hasAnyApplications =
    !isLoading && !isError && applications && applications.length > 0;
  const hasNoResults = hasAnyApplications && visibleApplications.length === 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-ink">
            Applications
          </h1>
          <p className="text-muted mt-1">
            Track every role you've applied to in one place.
          </p>
        </div>

        <Button variant="accent" onClick={openCreateForm}>
          Add application
        </Button>
      </div>

      {hasAnyApplications && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <SearchBar />
            <ViewSwitcher />
          </div>
          {view === "table" && <FilterBar />}
        </div>
      )}

      {isLoading && (
        <div className="space-y-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      )}

      {isError && (
        <p className="text-sm text-status-rejected">
          {error instanceof Error
            ? error.message
            : "Couldn't load your applications. Try refreshing."}
        </p>
      )}

      {!isLoading && !isError && applications && applications.length === 0 && (
        <EmptyState
          icon={BriefcaseBusiness}
          title="No applications yet"
          description="Add your first application to start tracking your job search."
          actionLabel="Add application"
          onAction={openCreateForm}
        />
      )}

      {hasNoResults && (
        <EmptyState
          icon={SearchX}
          tone="muted"
          title="No applications match your filters"
          description="Try a different search or clear your filters to see everything."
          actionLabel={hasActiveFilters ? "Clear filters" : undefined}
          onAction={hasActiveFilters ? clearFilters : undefined}
        />
      )}

      {!hasNoResults && hasAnyApplications && view === "table" && (
        <ApplicationTable
          applications={visibleApplications}
          onRowClick={openDetail}
          onEdit={openEditForm}
          onDelete={(application) => setPendingDelete(application)}
        />
      )}

      {!hasNoResults && hasAnyApplications && view === "board" && (
        <KanbanBoard
          applications={visibleApplications}
          onOpenDetail={openDetail}
          onEdit={openEditForm}
          onDelete={(application) => setPendingDelete(application)}
        />
      )}

      <ApplicationDetail
        application={detailApplication}
        open={detailApplication !== null}
        onClose={() => setDetailApplication(null)}
        onEdit={editFromDetail}
        onDelete={deleteFromDetail}
      />

      <ApplicationForm
        open={formOpen}
        onClose={closeForm}
        application={editingApplication}
      />

      <Modal
        open={pendingDelete !== null}
        onClose={() => setPendingDelete(null)}
      >
        <div className="space-y-4">
          <h2 className="text-lg font-display font-semibold text-ink">
            Delete application
          </h2>

          <p className="text-sm text-muted">
            {pendingDelete && (
              <>
                Delete the application for{" "}
                <span className="text-ink font-medium">
                  {pendingDelete.roleTitle}
                </span>{" "}
                at{" "}
                <span className="text-ink font-medium">
                  {pendingDelete.companyName}
                </span>
                ? This can't be undone.
              </>
            )}
          </p>

          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setPendingDelete(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              loading={deleteApplication.isPending}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}