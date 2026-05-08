"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/browser";

type AuthFormProps = {
  mode: "login" | "signup";
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isLogin = mode === "login";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const supabase = createClient();

    const result = isLogin
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });

    setLoading(false);

    if (result.error) {
      setError(result.error.message);
      return;
    }

    router.replace(searchParams.get("redirectTo") || "/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium">Email</label>
        <Input required type="email" name="email" placeholder="owner@business.com" />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium">Password</label>
        <Input required minLength={6} type="password" name="password" placeholder="Minimum 6 characters" />
      </div>
      {error ? <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-200">{error}</p> : null}
      <Button className="w-full" type="submit" disabled={loading}>
        {loading ? <Loader2 className="animate-spin" size={17} /> : null}
        {isLogin ? "Login" : "Create account"}
      </Button>
      <p className="text-center text-sm text-slate-600 dark:text-slate-300">
        {isLogin ? "New to ReplyFlowAI?" : "Already have an account?"}{" "}
        <Link className="font-semibold text-emerald-700 dark:text-emerald-300" href={isLogin ? "/signup" : "/login"}>
          {isLogin ? "Sign up" : "Login"}
        </Link>
      </p>
    </form>
  );
}
