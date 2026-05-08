import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Loader2 className="animate-spin text-emerald-600" size={28} />
    </main>
  );
}
