import { useState } from "react";
import {
  Drawer,
  Button,
  Badge,
  Textarea,
  Select,
  Input,
  Field,
  Skeleton,
} from "../ui";
import { useNotes, useCreateNote, useDeleteNote } from "../../hooks/useNotes";
import {
  useInterviews,
  useCreateInterview,
  useDeleteInterview,
} from "../../hooks/useInterviews";
import type {
  Application,
  ApplicationStatus,
  InterviewType,
} from "../../types";

interface ApplicationDetailProps {
  application: Application | null;
  open: boolean;
  onClose: () => void;
  onEdit: (application: Application) => void;
  onDelete: (application: Application) => void;
}

const STATUS_LABELS: Record<ApplicationStatus, string> = {
  applied: "Applied",
  interviewing: "Interviewing",
  offer: "Offer",
  rejected: "Rejected",
};

const INTERVIEW_TYPE_OPTIONS: { label: string; value: InterviewType }[] = [
  { label: "Phone screen", value: "phone_screen" },
  { label: "Technical", value: "technical" },
  { label: "Behavioral", value: "behavioral" },
  { label: "Final", value: "final" },
  { label: "Other", value: "other" },
];

const INTERVIEW_TYPE_LABELS: Record<InterviewType, string> = {
  phone_screen: "Phone screen",
  technical: "Technical",
  behavioral: "Behavioral",
  final: "Final",
  other: "Other",
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

function formatDateTime(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function emptyInterviewDraft() {
  return {
    date: "",
    time: "",
    type: "phone_screen" as InterviewType,
    notes: "",
  };
}

export function ApplicationDetail({
  application,
  open,
  onClose,
  onEdit,
  onDelete,
}: ApplicationDetailProps) {
  const [tab, setTab] = useState<"notes" | "interviews">("notes");
  const [noteDraft, setNoteDraft] = useState("");
  const [showInterviewForm, setShowInterviewForm] = useState(false);
  const [interviewDraft, setInterviewDraft] = useState(emptyInterviewDraft());

  const applicationId = application?.id;

  const notesQuery = useNotes(applicationId);
  const createNote = useCreateNote(applicationId ?? "");
  const deleteNote = useDeleteNote(applicationId ?? "");

  const interviewsQuery = useInterviews(applicationId);
  const createInterview = useCreateInterview(applicationId ?? "");
  const deleteInterview = useDeleteInterview(applicationId ?? "");

  const [prevKey, setPrevKey] = useState(`${open}:${applicationId ?? ""}`);
  const currentKey = `${open}:${applicationId ?? ""}`;
  if (currentKey !== prevKey) {
    setPrevKey(currentKey);
    if (open) {
      setTab("notes");
      setNoteDraft("");
      setShowInterviewForm(false);
      setInterviewDraft(emptyInterviewDraft());
    }
  }

  async function handleAddNote() {
    if (!noteDraft.trim()) return;
    await createNote.mutateAsync(noteDraft.trim());
    setNoteDraft("");
  }

  async function handleScheduleInterview() {
    if (!interviewDraft.date || !interviewDraft.time) return;
    const interviewDate = new Date(
      `${interviewDraft.date}T${interviewDraft.time}`,
    ).toISOString();

    await createInterview.mutateAsync({
      interviewDate,
      interviewType: interviewDraft.type,
      notes: interviewDraft.notes.trim() || null,
    });

    setInterviewDraft(emptyInterviewDraft());
    setShowInterviewForm(false);
  }

  return (
    <Drawer open={open} onClose={onClose}>
      {application && (
        <div className="flex h-full flex-col">
          <div className="border-b border-muted/15 p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="font-display text-xl font-semibold text-ink truncate">
                  {application.companyName}
                </h2>
                <p className="text-muted truncate">{application.roleTitle}</p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="shrink-0 rounded-full p-1.5 text-muted hover:bg-muted/10 hover:text-ink transition"
              >
                ✕
              </button>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <Badge variant={application.status}>
                {STATUS_LABELS[application.status]}
              </Badge>
              <span className="text-xs text-muted font-data">
                Applied {formatDate(application.appliedDate)}
              </span>
            </div>

            <div className="mt-4 flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onEdit(application)}
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onDelete(application)}
              >
                Delete
              </Button>
            </div>
          </div>

          <div className="flex border-b border-muted/15 px-6">
            <button
              onClick={() => setTab("notes")}
              className={`py-3 px-1 mr-6 text-sm font-medium border-b-2 transition ${
                tab === "notes"
                  ? "border-primary text-ink"
                  : "border-transparent text-muted hover:text-ink"
              }`}
            >
              Notes
            </button>
            <button
              onClick={() => setTab("interviews")}
              className={`py-3 px-1 text-sm font-medium border-b-2 transition ${
                tab === "interviews"
                  ? "border-primary text-ink"
                  : "border-transparent text-muted hover:text-ink"
              }`}
            >
              Interviews
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {tab === "notes" && (
              <>
                <div className="space-y-2">
                  <Textarea
                    value={noteDraft}
                    onChange={(e) => setNoteDraft(e.target.value)}
                    placeholder="Add a note..."
                    className="min-h-[80px]"
                  />
                  <div className="flex justify-end">
                    <Button
                      size="sm"
                      variant="accent"
                      onClick={handleAddNote}
                      loading={createNote.isPending}
                      disabled={!noteDraft.trim()}
                    >
                      Add note
                    </Button>
                  </div>
                </div>

                {notesQuery.isLoading && (
                  <div className="space-y-2">
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                )}

                {!notesQuery.isLoading && notesQuery.data?.length === 0 && (
                  <p className="text-sm text-muted text-center py-6">
                    No notes yet.
                  </p>
                )}

                <div className="space-y-3">
                  {notesQuery.data?.map((note) => (
                    <div
                      key={note.id}
                      className="rounded-md border border-muted/15 p-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm text-ink whitespace-pre-wrap">
                          {note.content}
                        </p>
                        <button
                          onClick={() => deleteNote.mutate(note.id)}
                          aria-label="Delete note"
                          className="shrink-0 text-muted hover:text-status-rejected transition"
                        >
                          ✕
                        </button>
                      </div>
                      <p className="text-xs text-muted font-data mt-2">
                        {formatDateTime(note.createdAt)}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {tab === "interviews" && (
              <>
                {!showInterviewForm && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setShowInterviewForm(true)}
                  >
                    Schedule interview
                  </Button>
                )}

                {showInterviewForm && (
                  <div className="space-y-3 rounded-md border border-muted/15 p-3">
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Date">
                        <Input
                          type="date"
                          value={interviewDraft.date}
                          onChange={(e) =>
                            setInterviewDraft((prev) => ({
                              ...prev,
                              date: e.target.value,
                            }))
                          }
                        />
                      </Field>
                      <Field label="Time">
                        <Input
                          type="time"
                          value={interviewDraft.time}
                          onChange={(e) =>
                            setInterviewDraft((prev) => ({
                              ...prev,
                              time: e.target.value,
                            }))
                          }
                        />
                      </Field>
                    </div>

                    <Field label="Type">
                      <Select
                        value={interviewDraft.type}
                        onChange={(e) =>
                          setInterviewDraft((prev) => ({
                            ...prev,
                            type: e.target.value as InterviewType,
                          }))
                        }
                        options={INTERVIEW_TYPE_OPTIONS}
                      />
                    </Field>

                    <Field label="Notes" hint="Optional">
                      <Textarea
                        value={interviewDraft.notes}
                        onChange={(e) =>
                          setInterviewDraft((prev) => ({
                            ...prev,
                            notes: e.target.value,
                          }))
                        }
                        className="min-h-[60px]"
                      />
                    </Field>

                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setShowInterviewForm(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        variant="accent"
                        onClick={handleScheduleInterview}
                        loading={createInterview.isPending}
                        disabled={!interviewDraft.date || !interviewDraft.time}
                      >
                        Schedule
                      </Button>
                    </div>
                  </div>
                )}

                {interviewsQuery.isLoading && (
                  <div className="space-y-2">
                    <Skeleton className="h-16 w-full" />
                  </div>
                )}

                {!interviewsQuery.isLoading &&
                  interviewsQuery.data?.length === 0 && (
                    <p className="text-sm text-muted text-center py-6">
                      No interviews scheduled yet.
                    </p>
                  )}

                <div className="space-y-3">
                  {interviewsQuery.data?.map((interview) => (
                    <div
                      key={interview.id}
                      className="rounded-md border border-muted/15 p-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <Badge>
                            {INTERVIEW_TYPE_LABELS[interview.interviewType]}
                          </Badge>
                          <p className="text-sm text-ink font-data mt-2">
                            {formatDateTime(interview.interviewDate)}
                          </p>
                          {interview.notes && (
                            <p className="text-sm text-muted mt-1 whitespace-pre-wrap">
                              {interview.notes}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => deleteInterview.mutate(interview.id)}
                          aria-label="Delete interview"
                          className="shrink-0 text-muted hover:text-status-rejected transition"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </Drawer>
  );
}
