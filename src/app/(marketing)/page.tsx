import Link from "next/link";
import { ArrowRight, CheckCircle2, Languages, MessageSquareText, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";

const features = [
  "WhatsApp-ready replies for daily customer questions",
  "English, Hindi, and Telugu support",
  "Professional, friendly, sales, and short tones",
  "Private reply history for each user"
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,#d1fae5,transparent_32%),linear-gradient(180deg,#ffffff,#f8fafc)] dark:border-slate-800 dark:bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.22),transparent_30%),linear-gradient(180deg,#020617,#0f172a)]">
          <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200">
                Built for Indian small businesses
              </p>
              <h1 className="max-w-3xl text-4xl font-extrabold tracking-normal sm:text-6xl">
                ReplyFlowAI
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                Generate clear, polite WhatsApp replies in seconds for stores, boutiques, salons, clinics, real estate agents, and Instagram sellers.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/signup">
                  <Button className="w-full sm:w-auto">
                    Start free
                    <ArrowRight size={17} />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button className="w-full sm:w-auto" variant="secondary">
                    View pricing
                  </Button>
                </Link>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {features.map((feature) => (
                  <p key={feature} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={17} />
                    {feature}
                  </p>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Live reply preview</p>
                  <h2 className="text-xl font-bold">Customer asks about price</h2>
                </div>
                <MessageSquareText className="text-emerald-600" />
              </div>
              <div className="space-y-3">
                <div className="rounded-lg bg-slate-100 p-4 text-sm dark:bg-slate-800">
                  Is this kurti available in medium? What is the final price?
                </div>
                <div className="rounded-lg bg-emerald-600 p-4 text-sm text-white">
                  Yes, medium size is available. The final price is Rs. 899. We can also share more colors if you want.
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-800">
                  <Languages className="mb-2 text-emerald-600" size={18} />
                  3 languages
                </div>
                <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-800">
                  <ShieldCheck className="mb-2 text-emerald-600" size={18} />
                  Secure auth
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
