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

export type CreateApplicationInput = Omit<Application, "id" | "userId" | "position" | "createdAt" | "updatedAt">;

export type UpdateApplicationInput = Partial<CreateApplicationInput> & {
  id: string;
};

export type CreateNoteInput = Omit<Note, "id" | "createdAt">;
export type CreateInterviewInput = Omit<Interview, "id" | "createdAt">;