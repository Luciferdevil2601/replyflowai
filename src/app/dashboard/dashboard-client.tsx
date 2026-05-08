"use client";

import { Copy, Loader2, MessageSquarePlus } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { businessTypes, languages, tones } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import type { GeneratedReplies, Language, ReplyHistoryItem } from "@/lib/types";

const emptyReplies: GeneratedReplies = {
  professional: "",
  friendly: "",
  sales: "",
  short: ""
};

type ApiResponse = {
  replies: GeneratedReplies;
  historyItem: ReplyHistoryItem;
};

export function DashboardClient({ initialHistory }: { initialHistory: ReplyHistoryItem[] }) {
  const [message, setMessage] = useState("");
  const [language, setLanguage] = useState<Language>("english");
  const [businessType, setBusinessType] = useState("Local store");
  const [replies, setReplies] = useState<GeneratedReplies>(emptyReplies);
  const [history, setHistory] = useState(initialHistory);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const hasReplies = useMemo(() => Object.values(replies).some(Boolean), [replies]);

  async function handleGenerate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (message.trim().length < 5) {
      setError("Please enter a customer message with at least 5 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerMessage: message, language, businessType })
      });

      const data = (await response.json()) as ApiResponse & { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Could not generate replies.");
      }

      setReplies(data.replies);
      setHistory((items) => [data.historyItem, ...items].slice(0, 12));
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function copyReply(value: string) {
    if (value) void navigator.clipboard.writeText(value);
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[1fr_0.9fr]">
      <section className="space-y-6">
        <Card className="p-5">
          <div className="mb-5">
            <h2 className="text-xl font-bold">Generate WhatsApp replies</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Paste a customer message, choose a language, and generate four ready-to-send replies.
            </p>
          </div>
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Customer message</label>
              <Textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                maxLength={1200}
                placeholder="Example: Is this product available? Can you deliver today?"
              />
              <p className="mt-1 text-right text-xs text-slate-500">{message.length}/1200</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">Language</label>
                <Select value={language} onChange={(event) => setLanguage(event.target.value as Language)}>
                  {languages.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Business type</label>
                <Select value={businessType} onChange={(event) => setBusinessType(event.target.value)}>
                  {businessTypes.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
            {error ? <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-200">{error}</p> : null}
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" size={17} /> : <MessageSquarePlus size={17} />}
              Generate replies
            </Button>
          </form>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2">
          {tones.map((tone) => (
            <Card key={tone.value} className="p-4">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold">{tone.label}</h3>
                  <p className="text-xs text-slate-500">{tone.hint}</p>
                </div>
                <Button
                  aria-label={`Copy ${tone.label} reply`}
                  className="size-9 shrink-0 p-0"
                  type="button"
                  variant="ghost"
                  onClick={() => copyReply(replies[tone.value])}
                  disabled={!replies[tone.value]}
                >
                  <Copy size={15} />
                </Button>
              </div>
              <p className="min-h-24 whitespace-pre-wrap text-sm leading-6 text-slate-700 dark:text-slate-200">
                {replies[tone.value] || "Your generated reply will appear here."}
              </p>
            </Card>
          ))}
        </div>
        {!hasReplies ? null : (
          <p className="text-sm text-slate-500">
            Tip: review every AI response before sending it to a customer.
          </p>
        )}
      </section>

      <aside>
        <Card className="p-5">
          <h2 className="text-xl font-bold">Recent history</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Latest saved generations from your account.
          </p>
          <div className="mt-5 space-y-4">
            {history.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-slate-700">
                No replies saved yet.
              </div>
            ) : (
              history.map((item) => (
                <article key={item.id} className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
                  <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span>{formatDate(item.created_at)}</span>
                    <span>-</span>
                    <span>{item.language}</span>
                    <span>-</span>
                    <span>{item.business_type}</span>
                  </div>
                  <p className="line-clamp-2 text-sm font-medium">{item.customer_message}</p>
                  <p className="mt-3 line-clamp-3 text-sm text-slate-600 dark:text-slate-300">
                    {item.replies.professional}
                  </p>
                </article>
              ))
            )}
          </div>
        </Card>
      </aside>
    </div>
  );
}
