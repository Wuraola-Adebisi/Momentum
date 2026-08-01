import { useEffect, useState } from "react";
import { Modal, Button, Input, Select, Field } from "../ui";
import { useCreateApplication, useUpdateApplication } from "../../hooks/useApplications";
import type { Application, ApplicationStatus, CreateApplicationInput } from "../../types";

interface ApplicationFormProps {
  open: boolean;
  onClose: () => void;
  /** Pass an existing application to edit it, omit to create a new one. */
  application?: Application;
}

const STATUS_OPTIONS: { label: string; value: ApplicationStatus }[] = [
  { label: "Applied", value: "applied" },
  { label: "Interviewing", value: "interviewing" },
  { label: "Offer", value: "offer" },
  { label: "Rejected", value: "rejected" },
];

type FormState = {
  companyName: string;
  roleTitle: string;
  status: ApplicationStatus;
  jobUrl: string;
  location: string;
  salaryRange: string;
  appliedDate: string;
};

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function emptyForm(): FormState {
  return {
    companyName: "",
    roleTitle: "",
    status: "applied",
    jobUrl: "",
    location: "",
    salaryRange: "",
    appliedDate: todayISO(),
  };
}

function formFromApplication(app: Application): FormState {
  return {
    companyName: app.companyName,
    roleTitle: app.roleTitle,
    status: app.status,
    jobUrl: app.jobUrl ?? "",
    location: app.location ?? "",
    salaryRange: app.salaryRange ?? "",
    appliedDate: app.appliedDate,
  };
}

type FormErrors = Partial<Record<keyof FormState, string>>;

export function ApplicationForm({ open, onClose, application }: ApplicationFormProps) {
  const isEditing = Boolean(application);

  const [form, setForm] = useState<FormState>(() =>
    application ? formFromApplication(application) : emptyForm()
  );
  // Snapshot of `form` as it was when the modal last opened. Comparing
  // against this (rather than against emptyForm()) is what makes "dirty"
  // work correctly for edits too: an edit form starts non-empty, so it
  // must be compared to its own starting point, not to a blank form.
  const [initialForm, setInitialForm] = useState<FormState>(form);
  const [errors, setErrors] = useState<FormErrors>({});

  // Reset the form whenever the modal transitions from closed to open (or
  // reopens against a different application). This adjusts state during
  // render rather than in a useEffect: `prevOpen` is compared against the
  // current `open` prop, and state is only set when they actually differ,
  // so it settles in one extra render instead of cascading.
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      const nextForm = application ? formFromApplication(application) : emptyForm();
      setForm(nextForm);
      setInitialForm(nextForm);
      setErrors({});
    }
  }

  const isDirty = open && JSON.stringify(form) !== JSON.stringify(initialForm);

  // Warn on tab close/refresh while there are unsaved edits.
  useEffect(() => {
    if (!isDirty) return;

    function handleBeforeUnload(e: BeforeUnloadEvent) {
      e.preventDefault();
      e.returnValue = "";
    }

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  // Guard every way the modal can be dismissed (backdrop click, Escape,
  // Cancel button) so unsaved edits aren't silently discarded.
  function handleClose() {
    if (isDirty && !window.confirm("Discard unsaved changes?")) return;
    onClose();
  }

  const createApplication = useCreateApplication();
  const updateApplication = useUpdateApplication();

  const isSaving = createApplication.isPending || updateApplication.isPending;
  const saveError = createApplication.error ?? updateApplication.error;

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): boolean {
    const nextErrors: FormErrors = {};

    if (!form.companyName.trim()) nextErrors.companyName = "Company name is required.";
    if (!form.roleTitle.trim()) nextErrors.roleTitle = "Role title is required.";
    if (!form.appliedDate) nextErrors.appliedDate = "Applied date is required.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const input: CreateApplicationInput = {
      companyName: form.companyName.trim(),
      roleTitle: form.roleTitle.trim(),
      status: form.status,
      jobUrl: form.jobUrl.trim() || null,
      location: form.location.trim() || null,
      salaryRange: form.salaryRange.trim() || null,
      appliedDate: form.appliedDate,
    };

    try {
      if (isEditing && application) {
        await updateApplication.mutateAsync({ id: application.id, ...input });
      } else {
        await createApplication.mutateAsync(input);
      }
      onClose();
    } catch {
      // error state is already surfaced below via saveError
    }
  }

  return (
    <Modal open={open} onClose={handleClose} ariaLabel={isEditing ? "Edit application" : "Add application"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-display font-semibold text-ink">
          {isEditing ? "Edit application" : "Add application"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Company" error={errors.companyName}>
            <Input
              value={form.companyName}
              onChange={(e) => updateField("companyName", e.target.value)}
              placeholder="Acme Corp"
              error={Boolean(errors.companyName)}
            />
          </Field>

          <Field label="Role" error={errors.roleTitle}>
            <Input
              value={form.roleTitle}
              onChange={(e) => updateField("roleTitle", e.target.value)}
              placeholder="Frontend Engineer"
              error={Boolean(errors.roleTitle)}
            />
          </Field>

          <Field label="Status">
            <Select
              value={form.status}
              onChange={(e) => updateField("status", e.target.value as ApplicationStatus)}
              options={STATUS_OPTIONS}
            />
          </Field>

          <Field label="Applied date" error={errors.appliedDate}>
            <Input
              type="date"
              value={form.appliedDate}
              onChange={(e) => updateField("appliedDate", e.target.value)}
              error={Boolean(errors.appliedDate)}
            />
          </Field>

          <Field label="Location" hint="Optional">
            <Input
              value={form.location}
              onChange={(e) => updateField("location", e.target.value)}
              placeholder="Remote"
            />
          </Field>

          <Field label="Salary range" hint="Optional">
            <Input
              value={form.salaryRange}
              onChange={(e) => updateField("salaryRange", e.target.value)}
              placeholder="$110k to $130k"
            />
          </Field>

          <Field label="Job posting URL" hint="Optional" className="sm:col-span-2">
            <Input
              type="url"
              value={form.jobUrl}
              onChange={(e) => updateField("jobUrl", e.target.value)}
              placeholder="https://example.com/jobs/123"
            />
          </Field>
        </div>

        {saveError && (
          <p className="text-sm text-status-rejected">
            {saveError instanceof Error ? saveError.message : "Something went wrong. Try again."}
          </p>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="ghost" onClick={handleClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button type="submit" variant="accent" loading={isSaving}>
            {isEditing ? "Save changes" : "Add application"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}