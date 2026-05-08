import Link from "next/link";
import { Check } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const plans = [
  {
    name: "Starter",
    price: "Free",
    details: ["Use your own Gemini free-tier key", "Save reply history", "English, Hindi, Telugu", "Best for testing"]
  },
  {
    name: "Growth",
    price: "Rs. 299/mo",
    details: ["Higher monthly usage", "Priority templates", "Multi-staff ready structure", "For active small businesses"]
  }
];

export default function PricingPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-16">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold">Simple pricing for small teams</h1>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            The starter setup runs on Supabase, Gemini, and Vercel free tiers so you can launch without heavy upfront costs.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {plans.map((plan) => (
            <Card key={plan.name} className="p-6">
              <h2 className="text-xl font-bold">{plan.name}</h2>
              <p className="mt-3 text-3xl font-extrabold">{plan.price}</p>
              <ul className="mt-6 space-y-3">
                {plan.details.map((detail) => (
                  <li key={detail} className="flex gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <Check className="shrink-0 text-emerald-600" size={18} />
                    {detail}
                  </li>
                ))}
              </ul>
              <Link href="/signup">
                <Button className="mt-6 w-full">{plan.name === "Starter" ? "Start free" : "Join waitlist"}</Button>
              </Link>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
}
