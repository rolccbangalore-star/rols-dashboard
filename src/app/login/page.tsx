"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import { Eye, EyeOff } from "lucide-react";
import { Database } from "@/types/database.types";

// Infer user_profile row type from database schema
type UserProfile = Database["public"]["Tables"]["user_profile"]["Row"];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Step 1: Auth
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({ email, password });

    if (authError || !authData.user) {
      setError(authError?.message || "Invalid login credentials");
      setLoading(false);
      return;
    }

    // Step 2: Role from user_profile
    const { data: profile, error: profileError } = await supabase
      .from("user_profile")
      .select("role_type, user_id")
      .eq("user_id", authData.user.id)
      .single<UserProfile>();

    if (profileError || !profile) {
      setError("Profile not found. Contact admin.");
      setLoading(false);
      return;
    }

    // Step 3: Redirect
    if (profile.role_type === "admin") router.push("/admin");
    else if (profile.role_type === "teacher") router.push("/teacher");
    else router.push("/student");

    setLoading(false);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 -z-10 animate-gradient-mesh"></div>

      {/* Login card */}
      <div className="bg-white shadow-md rounded-xl w-full max-w-md p-8 space-y-6">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="font-bold text-lg text-gray-700">ROLS</span>
          </div>
        </div>

        {/* Welcome */}
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Welcome to ROLS Group
        </h1>
        <p className="text-sm text-gray-600 text-center">
          Please sign in with the credentials provided by ROLS Admin.
        </p>

        {error && <p className="text-red-600 text-center">{error}</p>}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* Support */}
        <p className="text-sm text-gray-600 text-center">
          Forgot your password? Contact{" "}
          <a href="mailto:support@rols.com" className="text-blue-600 underline">
            ROLS Admin
          </a>
        </p>
      </div>
    </div>
  );
}
