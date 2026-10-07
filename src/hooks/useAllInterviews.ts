import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { useAuth } from "./useAuth";
import { mapInterview } from "../lib/mappers";
import type { Interview } from "../types";

export const allInterviewsKey = ["interviews", "all"] as const;

export function useAllInterviews() {
  const { user } = useAuth();

  return useQuery({
    queryKey: allInterviewsKey,
    queryFn: async (): Promise<Interview[]> => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("interviews")
        .select("*")
        .eq("user_id", user.id)
        .order("interview_date", { ascending: true });

      if (error) throw error;
      return data.map(mapInterview);
    },
    enabled: Boolean(user),
  });
}
