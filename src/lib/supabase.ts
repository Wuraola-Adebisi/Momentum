// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/database.types";

/**
 * Environment variables (Vite)
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

/**
 * Fail fast if environment is misconfigured
 * (prevents silent auth failures later)
 */
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env"
  );
}

/**
 * Global type augmentation for HMR-safe singleton
 */
declare global {
  var supabase: ReturnType<typeof createClient<Database>> | undefined;
}

/**
 * Supabase singleton client
 * Prevents duplicate instances during Vite hot reload
 */
export const supabase =
  globalThis.supabase ??
  createClient<Database>(supabaseUrl, supabaseAnonKey);

/**
 * Persist across HMR boundaries
 */
globalThis.supabase = supabase;