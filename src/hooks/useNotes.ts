import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { useAuth } from "./useAuth";
import { useToast } from "./useToast";
import { mapNote, toNoteInsert } from "../lib/mappers";
import type { Note } from "../types";

export function notesKey(applicationId: string) {
  return ["notes", applicationId] as const;
}

export function useNotes(applicationId: string | undefined) {
  return useQuery({
    queryKey: notesKey(applicationId ?? ""),
    queryFn: async (): Promise<Note[]> => {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("application_id", applicationId as string)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data.map(mapNote);
    },
    enabled: Boolean(applicationId),
  });
}

export function useCreateNote(applicationId: string) {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const toast = useToast();

  return useMutation({
    mutationFn: async (content: string): Promise<Note> => {
      if (!user) throw new Error("You must be signed in to add a note.");

      const { data, error } = await supabase
        .from("notes")
        .insert(toNoteInsert({ applicationId, content }, user.id))
        .select()
        .single();

      if (error) throw error;

      await supabase.from("activity_log").insert({
        user_id: user.id,
        application_id: applicationId,
        action_type: "note_added",
        description: "Added a note",
      });

      return mapNote(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notesKey(applicationId) });
      queryClient.invalidateQueries({ queryKey: ["activityLog"] });
      toast.success("Note added");
    },
    onError: (err) => {
      toast.error(
        err instanceof Error ? err.message : "Couldn't add the note. Try again.",
      );
    },
  });
}

export function useDeleteNote(applicationId: string) {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<string> => {
      const { error } = await supabase.from("notes").delete().eq("id", id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notesKey(applicationId) });
      toast.success("Note deleted");
    },
    onError: (err) => {
      toast.error(
        err instanceof Error ? err.message : "Couldn't delete the note. Try again.",
      );
    },
  });
}