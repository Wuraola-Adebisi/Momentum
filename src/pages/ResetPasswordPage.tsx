import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../hooks/useAuth";

import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Field } from "../components/ui/Field";

export default function ResetPasswordPage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setSubmitting(true);
    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });
    setSubmitting(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setDone(true);
  }

  // The recovery link Supabase emails out establishes a session
  // automatically when this page loads. Until AuthContext finishes
  // checking for that session, show a simple loading state instead of
  // flashing the "invalid link" message.
  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper px-6 py-12">
        <p className="text-sm text-muted">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-6 py-12">
      <div className="w-full max-w-sm">
        <p className="mb-10 text-center font-display text-base font-bold text-ink">
          Momentum
        </p>

        {!user && (
          <>
            <h1 className="mb-2 text-center font-display text-2xl font-bold text-ink">
              Link invalid or expired
            </h1>
            <p className="mb-8 text-center text-sm text-muted">
              This password reset link no longer works. Request a new one
              from the sign in page.
            </p>
            <Button
              variant="accent"
              className="w-full"
              onClick={() => navigate("/login")}
            >
              Back to sign in
            </Button>
          </>
        )}

        {user && !done && (
          <>
            <h1 className="mb-2 text-center font-display text-2xl font-bold text-ink">
              Set a new password
            </h1>
            <p className="mb-8 text-center text-sm text-muted">
              Choose a new password for your account.
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
              noValidate
            >
              <Field label="New password">
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    autoFocus
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

              <Field label="Confirm new password">
                <Input
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Field>

              {error && (
                <p className="text-center text-sm text-status-rejected">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                variant="accent"
                disabled={submitting}
                className="w-full"
              >
                {submitting ? "Saving..." : "Save new password"}
              </Button>
            </form>
          </>
        )}

        {user && done && (
          <>
            <h1 className="mb-2 text-center font-display text-2xl font-bold text-ink">
              Password updated
            </h1>
            <p className="mb-8 text-center text-sm text-muted">
              Your password has been changed. You're signed in.
            </p>
            <Button
              variant="accent"
              className="w-full"
              onClick={() => navigate("/dashboard")}
            >
              Go to dashboard
            </Button>
          </>
        )}
      </div>
    </div>
  );
}