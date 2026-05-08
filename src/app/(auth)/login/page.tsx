import { AuthForm } from "@/components/auth-form";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Login to generate and save WhatsApp replies.
        </p>
        <div className="mt-6">
          <AuthForm mode="login" />
        </div>
      </Card>
    </main>
  );
}
