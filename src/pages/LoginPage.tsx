import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "../lib/supabase";

import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Field } from "../components/ui/Field";

type Mode = "login" | "signup";

export default function LoginPage() {
  const [searchParams] = useSearchParams();

  const [mode, setMode] = useState<Mode>(
    searchParams.get("mode") === "signup" ? "signup" : "login",
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

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
  }

  function toggleMode() {
    setMode(mode === "login" ? "signup" : "login");
    setError(null);
    setMessage(null);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper px-6 py-12">
      <div className="w-full max-w-sm">
        <p className="text-center font-display text-base font-bold text-ink mb-10">
          Momentum
        </p>

        <h1 className="text-center font-display text-2xl font-bold text-ink mb-2">
          {mode === "login"
            ? "Let's find your next role"
            : "Start your momentum"}
        </h1>

        <p className="text-center text-sm text-muted mb-8">
          {mode === "login"
            ? "Sign in to pick up where you left off."
            : "Track every application, interview, and offer in one place."}
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          noValidate
        >
          <Field label="Email">
            <Input
              type="email"
              autoComplete="email"
              autoFocus
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>

          <Field label="Password">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </Field>

          {mode === "login" && (
            <button
              type="button"
              className="self-end -mt-2 text-xs text-primary font-medium"
            >
              Forgot password?
            </button>
          )}

          {error && (
            <p className="text-status-rejected text-sm text-center">{error}</p>
          )}

          {message && (
            <p className="text-status-offer text-sm text-center">{message}</p>
          )}

          <Button
            type="submit"
            variant="accent"
            disabled={loading}
            className="w-full"
          >
            {loading
              ? "Please wait..."
              : mode === "login"
                ? "Sign in"
                : "Create account"}
          </Button>
        </form>

        <div className="flex items-center gap-3 text-xs text-muted my-6">
          <div className="flex-1 h-px bg-muted/20" />
          or continue with
          <div className="flex-1 h-px bg-muted/20" />
        </div>

        <div className="flex gap-2 mb-6">
          <Button
            variant="secondary"
            onClick={() => handleOAuth("google")}
            className="flex-1"
          >
            Google
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleOAuth("github")}
            className="flex-1"
          >
            GitHub
          </Button>
        </div>

        <p className="text-sm text-muted text-center">
          {mode === "login" ? "New here?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={toggleMode}
            className="text-primary font-medium underline"
          >
            {mode === "login" ? "Create an account" : "Sign in instead"}
          </button>
        </p>
      </div>
    </div>
  );
}
