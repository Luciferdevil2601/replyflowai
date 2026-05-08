import { AuthForm } from "@/components/auth-form";
import { Card } from "@/components/ui/card";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Start generating customer replies for your business.
        </p>
        <div className="mt-6">
          <AuthForm mode="signup" />
        </div>
      </Card>
    </main>
  );
}
