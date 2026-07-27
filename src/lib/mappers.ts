import type {
  Tables,
  TablesInsert,
  TablesUpdate,
} from "../types/database.types";
import type {
  Application,
  ApplicationStatus,
  CreateApplicationInput,
  UpdateApplicationInput,
  Note,
  CreateNoteInput,
  Interview,
  CreateInterviewInput,
  InterviewType,
} from "../types";

type ApplicationRow = Tables<"applications">;
type NoteRow = Tables<"notes">;
type InterviewRow = Tables<"interviews">;

export function mapApplication(row: ApplicationRow): Application {
  return {
    id: row.id,
    userId: row.user_id,
    companyName: row.company_name,
    roleTitle: row.role_title,
    status: row.status as ApplicationStatus,
    jobUrl: row.job_url,
    location: row.location,
    salaryRange: row.salary_range,
    appliedDate: row.applied_date,
    position: row.position,
    createdAt: row.created_at ?? "",
    updatedAt: row.updated_at ?? "",
  };
}

export function toApplicationInsert(
  input: CreateApplicationInput,
  userId: string,
): TablesInsert<"applications"> {
  return {
    user_id: userId,
    company_name: input.companyName,
    role_title: input.roleTitle,
    status: input.status,
    job_url: input.jobUrl || null,
    location: input.location || null,
    salary_range: input.salaryRange || null,
    applied_date: input.appliedDate,
  };
}

export function toApplicationUpdate(
  input: Omit<UpdateApplicationInput, "id">,
): TablesUpdate<"applications"> {
  const update: TablesUpdate<"applications"> = {};

  if (input.companyName !== undefined) update.company_name = input.companyName;
  if (input.roleTitle !== undefined) update.role_title = input.roleTitle;
  if (input.status !== undefined) update.status = input.status;
  if (input.jobUrl !== undefined) update.job_url = input.jobUrl || null;
  if (input.location !== undefined) update.location = input.location || null;
  if (input.salaryRange !== undefined)
    update.salary_range = input.salaryRange || null;
  if (input.appliedDate !== undefined) update.applied_date = input.appliedDate;

  return update;
}

export function mapNote(row: NoteRow): Note {
  return {
    id: row.id,
    applicationId: row.application_id,
    content: row.content,
    createdAt: row.created_at ?? "",
  };
}

export function toNoteInsert(
  input: CreateNoteInput,
  userId: string,
): TablesInsert<"notes"> {
  return {
    user_id: userId,
    application_id: input.applicationId,
    content: input.content,
  };
}

export function mapInterview(row: InterviewRow): Interview {
  return {
    id: row.id,
    applicationId: row.application_id,
    interviewDate: row.interview_date,
    interviewType: (row.interview_type as InterviewType | null) ?? "other",
    notes: row.notes,
    createdAt: row.created_at ?? "",
  };
}

export function toInterviewInsert(
  input: CreateInterviewInput,
  userId: string,
): TablesInsert<"interviews"> {
  return {
    user_id: userId,
    application_id: input.applicationId,
    interview_date: input.interviewDate,
    interview_type: input.interviewType,
    notes: input.notes || null,
  };
}
