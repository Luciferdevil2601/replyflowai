import { NextResponse } from "next/server";
import { generateWhatsAppReplies } from "@/lib/gemini";
import { createClient } from "@/lib/supabase/server";
import { cleanBusinessType, cleanMessage, isSupportedLanguage } from "@/lib/validations";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const supabase = createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Please login first." }, { status: 401 });
    }

    const body = (await request.json()) as {
      customerMessage?: string;
      language?: string;
      businessType?: string;
    };

    const customerMessage = cleanMessage(body.customerMessage);
    const businessType = cleanBusinessType(body.businessType);
    const language = body.language || "english";

    if (customerMessage.length < 5) {
      return NextResponse.json({ error: "Customer message is too short." }, { status: 400 });
    }

    if (!isSupportedLanguage(language)) {
      return NextResponse.json({ error: "Unsupported language." }, { status: 400 });
    }

    const replies = await generateWhatsAppReplies({
      customerMessage,
      language,
      businessType
    });

    const { data, error } = await supabase
      .from("reply_history")
      .insert({
        user_id: user.id,
        customer_message: customerMessage,
        language,
        business_type: businessType,
        replies
      })
      .select("id, customer_message, language, business_type, replies, created_at")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ replies, historyItem: data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to generate replies.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
