import { createClient, type PostgrestError } from "@supabase/supabase-js";
import type { Database } from "./database.types";

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(
  "https://jgfbegibwarfqlnawauk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnZmJlZ2lid2FyZnFsbmF3YXVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAxNzk4NjgsImV4cCI6MjAxNTc1NTg2OH0.l9VMw_WX-2yDOlJ73RX7CC3r8uf5ced8Za6guSKLKAU"
);

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];

export type DbResult<T> = T extends PromiseLike<infer U> ? U : never;
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }>
  ? Exclude<U, null>
  : never;
export type DbResultErr = PostgrestError;
