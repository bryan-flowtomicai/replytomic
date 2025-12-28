import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import Anthropic from "@anthropic-ai/sdk";
import { PLATFORM_CONFIG } from "@/lib/platform-config";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { comment, platform, originalPost, tones } = body;

    if (!comment || !platform) {
      return NextResponse.json(
        { error: "Comment and platform are required" },
        { status: 400 }
      );
    }

    const platformConfig = PLATFORM_CONFIG[platform];
    if (!platformConfig) {
      return NextResponse.json(
        { error: "Invalid platform" },
        { status: 400 }
      );
    }

    // Build the prompt
    const prompt = `You are an expert at crafting engaging social media replies for ${platformConfig.name}.

ORIGINAL POST (for context):
${originalPost || "Not provided"}

COMMENT TO REPLY TO:
"${comment}"

PLATFORM: ${platformConfig.name}
CHARACTER LIMIT: ${platformConfig.maxLength}
RECOMMENDED LENGTH: ${platformConfig.recommendedLength}
STYLE: ${platformConfig.style}
EMOJI LEVEL: ${platformConfig.emojiLevel}

${platformConfig.systemPrompt}

Generate 5 unique reply options in these tones: ${(tones || ["helpful"]).join(", ")}

CRITICAL REQUIREMENTS:
- Stay under ${platformConfig.maxLength} characters STRICTLY
- Match the platform's typical communication style
- Sound natural and authentic, never robotic
- Add value or build the relationship
- Encourage further engagement when appropriate
- Use appropriate emojis for ${platformConfig.name} (${platformConfig.emojiLevel} usage)
- If original post is provided, reference it naturally
- Avoid generic responses like "Great post!" or "Thanks for sharing!"

TONE DEFINITIONS:
- helpful: Provide value, answer questions, be informative
- casual: Friendly, laid-back, conversational
- witty: Clever, funny, memorable
- professional: Polished, industry-aware, thoughtful
- engaging: Ask questions, encourage discussion, build community

Return ONLY a JSON array with this exact format:
[
  {
    "tone": "helpful",
    "text": "reply text here",
    "length": 142
  },
  ...
]

NO preamble, NO markdown formatting, ONLY the JSON array.`;

    // Call Claude API
    const message = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022", // Claude Sonnet 3.5 (latest stable)
      max_tokens: 2048,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // Parse response
    const content = message.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type");
    }

    let replies;
    try {
      // Extract JSON from response (remove markdown code blocks if present)
      const jsonText = content.text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      replies = JSON.parse(jsonText);
    } catch (parseError) {
      console.error("Failed to parse Claude response:", content.text);
      throw new Error("Failed to parse AI response");
    }

    // Validate and process replies
    const processedReplies = replies.map((reply: any, index: number) => {
      const text = reply.text || "";
      const length = text.length;
      const tone = reply.tone || tones[index % tones.length] || "helpful";

      return {
        id: `reply-${Date.now()}-${index}`,
        tone,
        text,
        length,
        withinLimit: length <= platformConfig.maxLength,
      };
    });

    // TODO: Update usage count in database
    // TODO: Save to generation history

    return NextResponse.json({
      replies: processedReplies,
      platform,
      usageRemaining: 24, // TODO: Get from database
    });
  } catch (error) {
    console.error("Error generating replies:", error);
    return NextResponse.json(
      { error: "Failed to generate replies" },
      { status: 500 }
    );
  }
}
