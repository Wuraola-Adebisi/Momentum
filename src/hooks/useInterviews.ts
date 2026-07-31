import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { useAuth } from "./useAuth";
import { useToast } from "./useToast";
import { mapInterview, toInterviewInsert } from "../lib/mappers";
import type { CreateInterviewInput, Interview } from "../types";

export function interviewsKey(applicationId: string) {
  return ["interviews", applicationId] as const;
}

export function useInterviews(applicationId: string | undefined) {
  return useQuery({
    queryKey: interviewsKey(applicationId ?? ""),
    queryFn: async (): Promise<Interview[]> => {
      const { data, error } = await supabase
        .from("interviews")
        .select("*")
        .eq("application_id", applicationId as string)
        .order("interview_date", { ascending: true });

      if (error) throw error;
      return data.map(mapInterview);
    },
    enabled: Boolean(applicationId),
  });
}

type NewInterviewInput = Omit<CreateInterviewInput, "applicationId">;

export function useCreateInterview(applicationId: string) {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const toast = useToast();

  return useMutation({
    mutationFn: async (input: NewInterviewInput): Promise<Interview> => {
      if (!user)
        throw new Error("You must be signed in to schedule an interview.");

      const { data, error } = await supabase
        .from("interviews")
        .insert(toInterviewInsert({ applicationId, ...input }, user.id))
        .select()
        .single();

      if (error) throw error;

      await supabase.from("activity_log").insert({
        user_id: user.id,
        application_id: applicationId,
        action_type: "interview_scheduled",
        description: "Scheduled an interview",
      });

      return mapInterview(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: interviewsKey(applicationId) });
      queryClient.invalidateQueries({ queryKey: ["activityLog"] });
      toast.success("Interview scheduled");
    },
    onError: (err) => {
      toast.error(
        err instanceof Error ? err.message : "Couldn't schedule the interview. Try again.",
      );
    },
  });
}

export function useDeleteInterview(applicationId: string) {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<string> => {
      const { error } = await supabase.from("interviews").delete().eq("id", id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: interviewsKey(applicationId) });
      toast.success("Interview removed");
    },
    onError: (err) => {
      toast.error(
        err instanceof Error ? err.message : "Couldn't remove the interview. Try again.",
      );
    },
  });
}