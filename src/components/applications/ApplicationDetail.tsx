import { useState } from "react";
import { CalendarClock, ExternalLink, MapPin, Trash2, X } from "lucide-react";
import { Drawer, Button, Badge, Textarea, Select, Input, Field, Skeleton } from "../ui";
import { useNotes, useCreateNote, useDeleteNote } from "../../hooks/useNotes";
import { useInterviews, useCreateInterview, useDeleteInterview } from "../../hooks/useInterviews";
import { useUpdateApplication } from "../../hooks/useApplications";
import type { Application, ApplicationStatus, InterviewType } from "../../types";

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

const STATUS_OPTIONS = Object.entries(STATUS_LABELS).map(([value, label]) => ({ value, label }));

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

function formatDate(dateStr: string) {
  return dateStr
    ? new Date(dateStr + "T00:00:00").toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
    : "";
}

function formatDateTime(dateStr: string) {
  return dateStr
    ? new Date(dateStr).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })
    : "";
}

function emptyInterviewDraft() {
  return { date: "", time: "", type: "phone_screen" as InterviewType, notes: "" };
}

export function ApplicationDetail({ application, open, onClose, onEdit, onDelete }: ApplicationDetailProps) {
  const [tab, setTab] = useState<"notes" | "interviews">("notes");
  const [noteDraft, setNoteDraft] = useState("");
  const [showInterviewForm, setShowInterviewForm] = useState(false);
  const [interviewDraft, setInterviewDraft] = useState(emptyInterviewDraft());
  const updateApplication = useUpdateApplication();

  const applicationId = application?.id;
  const notesQuery = useNotes(applicationId);
  const createNote = useCreateNote(applicationId ?? "");
  const deleteNote = useDeleteNote(applicationId ?? "");
  const interviewsQuery = useInterviews(applicationId);
  const createInterview = useCreateInterview(applicationId ?? "");
  const deleteInterview = useDeleteInterview(applicationId ?? "");

  const [prevKey, setPrevKey] = useState(String(open) + ":" + (applicationId ?? ""));
  const currentKey = String(open) + ":" + (applicationId ?? "");

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
    await createInterview.mutateAsync({
      interviewDate: new Date(interviewDraft.date + "T" + interviewDraft.time).toISOString(),
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
          <div className="border-b border-line/70 bg-paper/60 p-5 md:p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="eyebrow">Application</p>
                <h2 className="mt-2 truncate text-3xl">{application.companyName}</h2>
                <p className="mt-1 truncate text-muted">{application.roleTitle}</p>
              </div>
              <button type="button" onClick={onClose} aria-label="Close application details" className="inline-flex min-h-10 min-w-10 shrink-0 items-center justify-center rounded-full text-muted hover:bg-surface hover:text-ink">
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Badge variant={application.status}>{STATUS_LABELS[application.status]}</Badge>
              <span className="font-data text-xs text-muted">Applied {formatDate(application.appliedDate)}</span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-xl bg-surface p-3">
                <p className="text-xs text-muted">Location</p>
                <p className="mt-1 truncate text-ink">{application.location ?? "Not added"}</p>
              </div>
              <div className="rounded-xl bg-surface p-3">
                <p className="text-xs text-muted">Salary</p>
                <p className="mt-1 truncate font-data text-xs text-ink">{application.salaryRange ?? "Not added"}</p>
              </div>
            </div>

            <div className="mt-4">
              <Field label="Current stage">
                <Select
                  value={application.status}
                  onChange={e => updateApplication.mutate({ id: application.id, status: e.target.value as ApplicationStatus })}
                  disabled={updateApplication.isPending}
                  options={STATUS_OPTIONS}
                />
              </Field>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {application.jobUrl && (
                <a href={application.jobUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line bg-surface px-3.5 text-sm font-medium text-ink hover:bg-paper">
                  <ExternalLink size={15} /> Open posting
                </a>
              )}
              {application.location && (
                <span className="inline-flex min-h-10 items-center gap-2 rounded-full bg-surface px-3.5 text-xs text-muted">
                  <MapPin size={14} /> {application.location}
                </span>
              )}
            </div>

            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="secondary" onClick={() => onEdit(application)}>Edit details</Button>
              <Button size="sm" variant="ghost" onClick={() => onDelete(application)}><Trash2 size={15} /> Delete</Button>
            </div>
          </div>

          <div className="flex border-b border-line/70 px-5 md:px-6">
            <button type="button" onClick={() => setTab("notes")} className={"min-h-12 border-b-2 px-1 mr-6 text-sm font-medium " + (tab === "notes" ? "border-primary text-ink" : "border-transparent text-muted hover:text-ink")}>Notes</button>
            <button type="button" onClick={() => setTab("interviews")} className={"min-h-12 border-b-2 px-1 text-sm font-medium " + (tab === "interviews" ? "border-primary text-ink" : "border-transparent text-muted hover:text-ink")}>Interviews{interviewsQuery.data?.length ? " (" + interviewsQuery.data.length + ")" : ""}</button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto overscroll-contain p-5 md:p-6">
            {tab === "notes" && (
              <>
                <div className="space-y-2">
                  <Textarea value={noteDraft} onChange={e => setNoteDraft(e.target.value)} placeholder="Add a note…" className="min-h-[90px]" />
                  <div className="flex justify-end">
                    <Button size="sm" variant="accent" onClick={handleAddNote} loading={createNote.isPending} disabled={!noteDraft.trim()}>Add note</Button>
                  </div>
                </div>
                {notesQuery.isLoading && <div className="space-y-2"><Skeleton className="h-20 w-full rounded-xl" /><Skeleton className="h-20 w-full rounded-xl" /></div>}
                {!notesQuery.isLoading && notesQuery.data?.length === 0 && <p className="rounded-xl border border-dashed border-line p-6 text-center text-sm text-muted">No notes yet. Capture something useful while it’s fresh.</p>}
                <div className="space-y-3">
                  {notesQuery.data?.map(note => (
                    <div key={note.id} className="rounded-xl border border-line/70 bg-surface p-4">
                      <div className="flex items-start justify-between gap-2">
                        <p className="whitespace-pre-wrap text-sm text-ink">{note.content}</p>
                        <button type="button" onClick={() => deleteNote.mutate(note.id)} aria-label="Delete note" className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-full text-muted hover:bg-status-rejected/10 hover:text-status-rejected"><X size={15} /></button>
                      </div>
                      <p className="mt-3 font-data text-[11px] text-muted">{formatDateTime(note.createdAt)}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {tab === "interviews" && (
              <>
                {!showInterviewForm && <Button size="sm" variant="secondary" onClick={() => setShowInterviewForm(true)}><CalendarClock size={15} /> Schedule interview</Button>}
                {showInterviewForm && (
                  <div className="space-y-3 rounded-xl border border-line/70 bg-surface p-4">
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Date"><Input type="date" value={interviewDraft.date} onChange={e => setInterviewDraft(p => ({ ...p, date: e.target.value }))} /></Field>
                      <Field label="Time"><Input type="time" value={interviewDraft.time} onChange={e => setInterviewDraft(p => ({ ...p, time: e.target.value }))} /></Field>
                    </div>
                    <Field label="Type"><Select value={interviewDraft.type} onChange={e => setInterviewDraft(p => ({ ...p, type: e.target.value as InterviewType }))} options={INTERVIEW_TYPE_OPTIONS} /></Field>
                    <Field label="Notes" hint="Optional"><Textarea value={interviewDraft.notes} onChange={e => setInterviewDraft(p => ({ ...p, notes: e.target.value }))} placeholder="What should you prepare?" /></Field>
                    <div className="flex justify-end gap-2"><Button size="sm" variant="ghost" onClick={() => setShowInterviewForm(false)}>Cancel</Button><Button size="sm" variant="accent" onClick={handleScheduleInterview} loading={createInterview.isPending} disabled={!interviewDraft.date || !interviewDraft.time}>Schedule</Button></div>
                  </div>
                )}
                {interviewsQuery.isLoading && <Skeleton className="h-20 w-full rounded-xl" />}
                {!interviewsQuery.isLoading && interviewsQuery.data?.length === 0 && <p className="rounded-xl border border-dashed border-line p-6 text-center text-sm text-muted">No interviews scheduled yet.</p>}
                <div className="space-y-3">
                  {interviewsQuery.data?.map(interview => (
                    <div key={interview.id} className="rounded-xl border border-line/70 bg-surface p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div><Badge>{INTERVIEW_TYPE_LABELS[interview.interviewType]}</Badge><p className="mt-3 font-data text-xs text-ink">{formatDateTime(interview.interviewDate)}</p>{interview.notes && <p className="mt-2 whitespace-pre-wrap text-sm text-muted">{interview.notes}</p>}</div>
                        <button type="button" onClick={() => deleteInterview.mutate(interview.id)} aria-label="Delete interview" className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-full text-muted hover:bg-status-rejected/10 hover:text-status-rejected"><X size={15} /></button>
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
