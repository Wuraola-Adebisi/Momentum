import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Finishing sign in...");

  useEffect(() => {
    let active = true;

    async function finishAuth() {
      const next = searchParams.get("next") === "/dashboard" ? "/dashboard" : "/dashboard";

      const { data, error } = await supabase.auth.getSession();

      if (!active) return;

      if (error || !data.session) {
        setMessage(error?.message ?? "We could not finish signing you in. Please try again.");
        return;
      }

      navigate(next, { replace: true });
    }

    finishAuth();

    return () => {
      active = false;
    };
  }, [navigate, searchParams]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-6">
      <div className="text-center">
        <p className="font-display text-lg font-bold text-ink">Momentum</p>
        <p className="mt-3 text-sm text-muted">{message}</p>
      </div>
    </main>
  );
}
