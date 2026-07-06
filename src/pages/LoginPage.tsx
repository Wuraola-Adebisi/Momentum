import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  async function handleLogin() {
    setLoading(true);
    setError(null);

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
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-paper">

      {/* LEFT */}
      <div className="hidden md:flex flex-col justify-center p-16 bg-ink text-paper">
        <h1 className="text-4xl font-bold mb-4">Momentum</h1>
        <p className="opacity-70 max-w-sm">
          Track applications. Build clarity. Stop guessing.
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-center p-10">
        <Card className="w-full max-w-md space-y-4">

          <div>
            <h2 className="text-2xl font-semibold">Login</h2>
            <p className="text-sm text-gray-500">
              Sign in to continue
            </p>
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
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <Button
            onClick={handleLogin}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>

        </Card>
      </div>
    </div>
  );
}