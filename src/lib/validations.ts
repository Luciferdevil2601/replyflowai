import { languages } from "@/lib/constants";
import type { Language } from "@/lib/types";

export function isSupportedLanguage(value: string): value is Language {
  return languages.some((language) => language.value === value);
}

export function cleanMessage(value: unknown) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, 1200);
}

export function cleanBusinessType(value: unknown) {
  if (typeof value !== "string") return "Other";
  return value.trim().slice(0, 80) || "Other";
}
