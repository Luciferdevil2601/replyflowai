import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Page not found</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">This page does not exist.</p>
        <Link href="/">
          <Button className="mt-6">Go home</Button>
        </Link>
      </div>
    </main>
  );
}
