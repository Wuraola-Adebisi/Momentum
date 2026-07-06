import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";

type Mode = "login" | "signup";

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  async function handleSubmit() {
    setLoading(true);
    setError(null);
    setMessage(null);

    if (mode === "login") {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      setLoading(false);

      if (error) {
        setError(error.message);
        return;
      }

      if (data.session) {
        navigate("/dashboard");
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      setLoading(false);

      if (error) {
        setError(error.message);
        return;
      }

      setMessage("Check your email to confirm your account.");
    }
  }

  async function handleOAuth(provider: "google" | "github") {
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      setError(error.message);
    }
    // On success, Supabase redirects the browser away from this page,
    // so there is nothing else to do here.
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[3fr_2fr] bg-paper">

      {/* LEFT: form, roughly 60% on desktop */}
      <div className="flex items-center justify-center p-10">
        <Card className="w-full max-w-md space-y-4">

          <div>
            <h2 className="text-2xl font-semibold text-ink">
              {mode === "login" ? "Welcome back" : "Create your account"}
            </h2>
            <p className="text-sm text-muted">
              {mode === "login"
                ? "Sign in to continue"
                : "Start tracking your applications"}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Button variant="secondary" onClick={() => handleOAuth("google")} className="w-full">
              Continue with Google
            </Button>
            <Button variant="secondary" onClick={() => handleOAuth("github")} className="w-full">
              Continue with GitHub
            </Button>
          </div>

          <div className="flex items-center gap-3 text-xs text-muted">
            <div className="flex-1 h-px bg-muted/20" />
            or
            <div className="flex-1 h-px bg-muted/20" />
          </div>

          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-status-rejected text-sm">{error}</p>
          )}

          {message && (
            <p className="text-status-offer text-sm">{message}</p>
          )}

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full"
          >
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Sign in"
              : "Sign up"}
          </Button>

          <p className="text-sm text-muted text-center">
            {mode === "login" ? "New here?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setMode(mode === "login" ? "signup" : "login");
                setError(null);
                setMessage(null);
              }}
              className="text-primary font-medium underline"
            >
              {mode === "login" ? "Create an account" : "Sign in instead"}
            </button>
          </p>

        </Card>
      </div>

      {/* RIGHT: signature visual panel, roughly 40% on desktop */}
      <div className="hidden md:flex flex-col justify-center p-16 bg-ink text-paper">
        <h1 className="text-4xl font-display font-bold mb-4">Momentum</h1>
        <p className="opacity-70 max-w-sm">
          Track every application. See your progress add up.
        </p>
      </div>

    </div>
  );
}