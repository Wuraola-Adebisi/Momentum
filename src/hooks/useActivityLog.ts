import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { mapActivityLog } from "../lib/mappers";
import type { ActivityLogEntry } from "../types";

export const activityLogKey = ["activityLog"] as const;

export function useActivityLog() {
  return useQuery({
    queryKey: activityLogKey,
    queryFn: async (): Promise<ActivityLogEntry[]> => {
      const { data, error } = await supabase
        .from("activity_log")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data.map(mapActivityLog);
    },
  });
}