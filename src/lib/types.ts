export type Language = "english" | "hindi" | "telugu";

export type ReplyTone = "professional" | "friendly" | "sales" | "short";

export type GeneratedReplies = Record<ReplyTone, string>;

export type ReplyHistoryItem = {
  id: string;
  customer_message: string;
  language: Language;
  business_type: string;
  replies: GeneratedReplies;
  created_at: string;
};
