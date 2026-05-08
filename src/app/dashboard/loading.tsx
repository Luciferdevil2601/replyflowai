import { Card } from "@/components/ui/card";

export default function DashboardLoading() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <Card className="h-96 animate-pulse bg-slate-100 dark:bg-slate-900" />
        <Card className="h-96 animate-pulse bg-slate-100 dark:bg-slate-900" />
      </div>
    </main>
  );
}
