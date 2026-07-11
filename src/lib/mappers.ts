// src/lib/mappers.ts
import type { Tables, TablesInsert, TablesUpdate } from "../types/database.types";
import type {
  Application,
  ApplicationStatus,
  CreateApplicationInput,
  UpdateApplicationInput,
} from "../types";

type ApplicationRow = Tables<"applications">;

/**
 * Postgres/Supabase gives us snake_case columns. This is the one place
 * that translation happens, so snake_case never leaks past this file
 * into components or hooks.
 */
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

/**
 * Builds the row Supabase expects for a new application, from the
 * camelCase form data plus the current user's id (not part of the form).
 */
export function toApplicationInsert(
  input: CreateApplicationInput,
  userId: string
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

/**
 * Builds a partial update row from whatever fields changed. `id` is
 * stripped out here since it's used to target the row (`.eq('id', id)`),
 * not written as a column value.
 */
export function toApplicationUpdate(
  input: Omit<UpdateApplicationInput, "id">
): TablesUpdate<"applications"> {
  const update: TablesUpdate<"applications"> = {};

  if (input.companyName !== undefined) update.company_name = input.companyName;
  if (input.roleTitle !== undefined) update.role_title = input.roleTitle;
  if (input.status !== undefined) update.status = input.status;
  if (input.jobUrl !== undefined) update.job_url = input.jobUrl || null;
  if (input.location !== undefined) update.location = input.location || null;
  if (input.salaryRange !== undefined) update.salary_range = input.salaryRange || null;
  if (input.appliedDate !== undefined) update.applied_date = input.appliedDate;

  return update;
}