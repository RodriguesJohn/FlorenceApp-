import React from "react";
import { supabase } from "./supabaseClient.js";

const AuthContext = React.createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = React.useState(null);
  const [ready, setReady] = React.useState(!supabase);

  React.useEffect(() => {
    if (!supabase) return undefined;

    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session ?? null);
      setReady(true);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      setReady(true);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const value = React.useMemo(
    () => ({
      ready,
      session,
      user: session?.user ?? null,
      configured: Boolean(supabase),
      signIn: async ({ email, password }) => {
        if (!supabase) {
          return { error: new Error("Login is not configured.") };
        }
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        return { data, error };
      },
      signOut: async () => {
        if (!supabase) return { error: null };
        return supabase.auth.signOut();
      }
    }),
    [ready, session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
