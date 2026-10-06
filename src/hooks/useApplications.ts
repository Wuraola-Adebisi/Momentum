import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { useAuth } from "./useAuth";
import { useToast } from "./useToast";
import { mapApplication, toApplicationInsert, toApplicationUpdate } from "../lib/mappers";
import type { Application, CreateApplicationInput, UpdateApplicationInput } from "../types";

const APPLICATIONS_KEY = ["applications"] as const;

export function useApplications() {
  const { user } = useAuth();
  return useQuery({
    queryKey: APPLICATIONS_KEY,
    queryFn: async (): Promise<Application[]> => {
      if (!user) return [];
      const { data, error } = await supabase.from("applications").select("*").order("position", { ascending: true }).order("created_at", { ascending: false });
      if (error) throw error;
      return data.map(mapApplication);
    },
    enabled: Boolean(user),
  });
}

export function useCreateApplication() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const toast = useToast();

  return useMutation({
    mutationFn: async (input: CreateApplicationInput): Promise<Application> => {
      if (!user) throw new Error("You must be signed in to add an application.");
      const { data, error } = await supabase.from("applications").insert(toApplicationInsert(input, user.id)).select().single();
      if (error) throw error;
      await supabase.from("activity_log").insert({
        user_id: user.id,
        application_id: data.id,
        action_type: "created",
        description: "Applied to " + input.companyName + " for " + input.roleTitle,
      });
      return mapApplication(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: APPLICATIONS_KEY });
      queryClient.invalidateQueries({ queryKey: ["activityLog"] });
      toast.success("Application added");
    },
    onError: err => toast.error(err instanceof Error ? err.message : "Couldn't add the application. Try again."),
  });
}

export function useUpdateApplication() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const toast = useToast();

  return useMutation({
    mutationFn: async (input: UpdateApplicationInput): Promise<Application> => {
      const { id, ...rest } = input;
      const { data: current, error: currentError } = await supabase.from("applications").select("status").eq("id", id).single();
      if (currentError) throw currentError;
      const { data, error } = await supabase.from("applications").update(toApplicationUpdate(rest)).eq("id", id).select().single();
      if (error) throw error;

      if (user && rest.status && current.status !== rest.status) {
        await supabase.from("activity_log").insert({
          user_id: user.id,
          application_id: id,
          action_type: "status_changed",
          description: "Moved to " + rest.status,
        });
      }
      return mapApplication(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: APPLICATIONS_KEY });
      queryClient.invalidateQueries({ queryKey: ["activityLog"] });
      toast.success("Application updated");
    },
    onError: err => toast.error(err instanceof Error ? err.message : "Couldn't update the application. Try again."),
  });
}

export function useDeleteApplication() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("applications").delete().eq("id", id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: APPLICATIONS_KEY });
      toast.success("Application deleted");
    },
    onError: err => toast.error(err instanceof Error ? err.message : "Couldn't delete the application. Try again."),
  });
}

interface UpdateStatusInput {
  id: string;
  status: Application["status"];
  position: number;
}

export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const toast = useToast();

  return useMutation({
    mutationFn: async ({ id, status, position }: UpdateStatusInput) => {
      const { error } = await supabase.from("applications").update({ status, position }).eq("id", id);
      if (error) throw error;
      if (user) {
        await supabase.from("activity_log").insert({
          user_id: user.id,
          application_id: id,
          action_type: "status_changed",
          description: "Moved to " + status,
        });
      }
    },
    onMutate: async ({ id, status, position }) => {
      await queryClient.cancelQueries({ queryKey: APPLICATIONS_KEY });
      const previous = queryClient.getQueryData<Application[]>(APPLICATIONS_KEY);
      queryClient.setQueryData<Application[]>(APPLICATIONS_KEY, old => old?.map(a => a.id === id ? { ...a, status, position } : a));
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) queryClient.setQueryData(APPLICATIONS_KEY, context.previous);
      toast.error("Couldn't update the status. Reverted.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: APPLICATIONS_KEY });
      queryClient.invalidateQueries({ queryKey: ["activityLog"] });
    },
  });
}
