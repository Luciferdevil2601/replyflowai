import { GoogleGenerativeAI } from "@google/generative-ai";
import { languages, tones } from "@/lib/constants";
import type { GeneratedReplies, Language } from "@/lib/types";

let client: GoogleGenerativeAI | null = null;

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY environment variable.");
  }

  if (!client) {
    client = new GoogleGenerativeAI(apiKey);
  }

  return client;
}

function getLanguageLabel(language: Language) {
  return languages.find((item) => item.value === language)?.label ?? "English";
}

function parseJsonResponse(text: string) {
  const cleaned = text.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```$/i, "").trim();
  return JSON.parse(cleaned) as Partial<GeneratedReplies>;
}

export async function generateWhatsAppReplies(input: {
  customerMessage: string;
  language: Language;
  businessType: string;
}) {
  const model = getGeminiClient().getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      temperature: 0.55,
      topP: 0.9,
      maxOutputTokens: 650,
      responseMimeType: "application/json"
    }
  });

  const toneList = tones.map((tone) => tone.value).join(", ");
  const languageLabel = getLanguageLabel(input.language);

  const prompt = `You are ReplyFlowAI, an assistant for Indian small businesses.
Generate WhatsApp replies in ${languageLabel}.
Business type: ${input.businessType}
Customer message: ${input.customerMessage}

Rules:
- Return only valid JSON.
- JSON keys must be exactly: ${toneList}.
- Each value must be one ready-to-send WhatsApp reply.
- Keep replies concise, natural, respectful, and useful for Indian customers.
- Do not use markdown, hashtags, or placeholders.
- For sales reply, be persuasive but not aggressive.
- For short reply, keep it under 25 words.`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const parsed = parseJsonResponse(text);

  return {
    professional: parsed.professional?.trim() ?? "",
    friendly: parsed.friendly?.trim() ?? "",
    sales: parsed.sales?.trim() ?? "",
    short: parsed.short?.trim() ?? ""
  } satisfies GeneratedReplies;
}
