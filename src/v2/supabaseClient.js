import { createClient } from "@supabase/supabase-js";

const url =
  import.meta.env.VITE_SUPABASE_URL || "https://ynryqfuleieahxiwviyr.supabase.co";
const key =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlucnlxZnVsZWllYWh4aXd2aXlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzNDEwNjIsImV4cCI6MjA5MzkxNzA2Mn0.wAgdWys8RnhTjSEFMYnJmvu-Hh93WTGSlTGDIEt116w";

export const supabase =
  url && key
    ? createClient(url, key, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      })
    : null;
