import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient.js";

let pendingCount = null;

function fetchPageViews() {
  if (!pendingCount) {
    pendingCount = supabase
      .rpc("record_florence_visit")
      .then(({ data, error }) => {
        if (error || data == null) {
          pendingCount = null;
          return null;
        }
        return Number(data);
      });
  }
  return pendingCount;
}

export function useFlorenceVisitCount() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    if (!supabase) return undefined;

    let cancelled = false;

    fetchPageViews().then((next) => {
      if (!cancelled && next != null) setCount(next);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return count;
}
