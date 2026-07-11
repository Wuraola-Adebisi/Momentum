// src/hooks/useApplications.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { useAuth } from "./useAuth";
import { mapApplication, toApplicationInsert, toApplicationUpdate } from "../lib/mappers";
import type { Application, CreateApplicationInput, UpdateApplicationInput } from "../types";

const APPLICATIONS_KEY = ["applications"] as const;

export function useApplications() {
  return useQuery({
    queryKey: APPLICATIONS_KEY,
    queryFn: async (): Promise<Application[]> => {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data.map(mapApplication);
    },
  });
}

export function useCreateApplication() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (input: CreateApplicationInput): Promise<Application> => {
      if (!user) throw new Error("You must be signed in to add an application.");

      const { data, error } = await supabase
        .from("applications")
        .insert(toApplicationInsert(input, user.id))
        .select()
        .single();

      if (error) throw error;

      await supabase.from("activity_log").insert({
        user_id: user.id,
        application_id: data.id,
        action_type: "created",
        description: `Applied to ${input.companyName} for ${input.roleTitle}`,
      });

      return mapApplication(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: APPLICATIONS_KEY });
      queryClient.invalidateQueries({ queryKey: ["activityLog"] });
    },
  });
}

export function useUpdateApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateApplicationInput): Promise<Application> => {
      const { id, ...rest } = input;

      const { data, error } = await supabase
        .from("applications")
        .update(toApplicationUpdate(rest))
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return mapApplication(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: APPLICATIONS_KEY });
    },
  });
}

export function useDeleteApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<string> => {
      const { error } = await supabase.from("applications").delete().eq("id", id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: APPLICATIONS_KEY });
    },
  });
}

interface UpdateStatusInput {
  id: string;
  status: Application["status"];
  position: number;
}

/**
 * Moves a card to a new status/position, used by the Kanban board's
 * drag-and-drop and the mobile status-picker fallback. Updates the local
 * cache immediately (`onMutate`) so the card appears to move instantly,
 * then rolls back to the previous cache (`onError`) if the Supabase write
 * fails, rather than leaving the UI showing a move that didn't happen.
 */
export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ id, status, position }: UpdateStatusInput) => {
      const { error } = await supabase
        .from("applications")
        .update({ status, position })
        .eq("id", id);

      if (error) throw error;

      if (user) {
        await supabase.from("activity_log").insert({
          user_id: user.id,
          application_id: id,
          action_type: "status_changed",
          description: `Moved to ${status}`,
        });
      }
    },

    onMutate: async ({ id, status, position }) => {
      await queryClient.cancelQueries({ queryKey: APPLICATIONS_KEY });
      const previous = queryClient.getQueryData<Application[]>(APPLICATIONS_KEY);

      queryClient.setQueryData<Application[]>(APPLICATIONS_KEY, (old) =>
        old?.map((application) =>
          application.id === id ? { ...application, status, position } : application
        )
      );

      return { previous };
    },

    onError: (_err, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(APPLICATIONS_KEY, context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: APPLICATIONS_KEY });
      queryClient.invalidateQueries({ queryKey: ["activityLog"] });
    },
  });
}