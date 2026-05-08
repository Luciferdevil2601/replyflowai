import type { Language, ReplyTone } from "@/lib/types";

export const languages: { value: Language; label: string }[] = [
  { value: "english", label: "English" },
  { value: "hindi", label: "Hindi" },
  { value: "telugu", label: "Telugu" }
];

export const tones: { value: ReplyTone; label: string; hint: string }[] = [
  { value: "professional", label: "Professional", hint: "Polite and trust-building" },
  { value: "friendly", label: "Friendly", hint: "Warm and conversational" },
  { value: "sales", label: "Sales", hint: "Persuasive without sounding pushy" },
  { value: "short", label: "Short", hint: "Quick WhatsApp-ready answer" }
];

export const businessTypes = [
  "Local store",
  "Boutique",
  "Salon",
  "Clinic",
  "Real estate",
  "Instagram business",
  "Other"
];
