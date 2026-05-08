import Link from "next/link";
import { BotMessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="flex size-9 items-center justify-center rounded-lg bg-emerald-600 text-white">
            <BotMessageSquare size={19} />
          </span>
          ReplyFlowAI
        </Link>
        <nav className="flex items-center gap-2">
          <Link href="/pricing" className="hidden text-sm font-medium text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white sm:inline">
            Pricing
          </Link>
          <ThemeToggle />
          <Link href="/login">
            <Button variant="secondary" className="h-10">
              Login
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
