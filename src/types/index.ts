// src/types/index.ts

export type ApplicationStatus =
  | "applied"
  | "interviewing"
  | "offer"
  | "rejected";

export type ViewMode = "board" | "table" | "calendar";

export interface Application {
  id: string;
  userId: string;
  companyName: string;
  roleTitle: string;
  status: ApplicationStatus;
  jobUrl: string | null;
  location: string | null;
  salaryRange: string | null;
  appliedDate: string;
  position: number;
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  id: string;
  applicationId: string;
  content: string;
  createdAt: string;
}

export type InterviewType =
  | "phone_screen"
  | "technical"
  | "behavioral"
  | "final"
  | "other";

export interface Interview {
  id: string;
  applicationId: string;
  interviewDate: string;
  interviewType: InterviewType;
  notes: string | null;
  createdAt: string;
}

export interface ActivityLogEntry {
  id: string;
  applicationId: string | null;
  actionType: "created" | "status_changed" | "note_added" | "interview_scheduled";
  description: string;
  createdAt: string;
}

export type KanbanColumns = Record<ApplicationStatus, Application[]>;

export interface DashboardStats {
  totalActive: number;
  interviewCount: number;
  offerCount: number;
  responseRate: number;
  avgResponseDays: number | null;
}

/**
 * Form and mutation input types for Applications (Phase 3).
 *
 * `Omit<Type, Keys>` is a TypeScript utility type: it takes an existing
 * type and builds a new one with certain keys removed. Here it takes the
 * full `Application` shape and strips the fields the form never sets
 * directly (id, userId, position, timestamps), since those are assigned
 * by the database or by drag-and-drop later, not typed into the form.
 */
export type CreateApplicationInput = Omit<
  Application,
  "id" | "userId" | "position" | "createdAt" | "updatedAt"
>;

/**
 * `Partial<Type>` is another utility type: it makes every field on a type
 * optional. An edit form only sends the fields that changed, so
 * `Partial<CreateApplicationInput>` reuses the create shape but allows any
 * subset of it. `id` is added back in and kept required, since an update
 * always needs to know which row it's updating.
 */
export type UpdateApplicationInput = Partial<CreateApplicationInput> & {
  id: string;
};