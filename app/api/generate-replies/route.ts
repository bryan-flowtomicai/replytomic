import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import Anthropic from "@anthropic-ai/sdk";
import { PLATFORM_CONFIG } from "@/lib/platform-config";
import { 
  getOrCreateUser, 
  canUserGenerate, 
  incrementUsage, 
  saveGeneration,
  updateAnalytics 
} from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      console.error("ANTHROPIC_API_KEY is not set");
      return NextResponse.json(
        { error: "API configuration error - Anthropic API key not configured" },
        { status: 500 }
      );
    }

    const clerkUser = await currentUser();
    const { user, error: userError } = await getOrCreateUser(
      clerkUserId,
      clerkUser?.emailAddresses[0]?.emailAddress,
      clerkUser?.firstName || clerkUser?.username || undefined
    );

    if (userError || !user) {
      console.error("Error getting/creating user:", userError);
      return NextResponse.json(
        { error: "Failed to initialize user" },
        { status: 500 }
      );
    }

    const { canGenerate, remaining, limit } = await canUserGenerate(user.id, user.subscription_tier);
    
    if (!canGenerate) {
      return NextResponse.json(
        { 
          error: "Monthly limit reached", 
          limitReached: true,
          limit,
          tier: user.subscription_tier,
          message: `You've used all ${limit} free replies this month. Upgrade to Pro for unlimited replies!`
        },
        { status: 403 }
      );
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

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

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type");
    }

    let replies;
    try {
      const jsonText = content.text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      replies = JSON.parse(jsonText);
    } catch (parseError) {
      console.error("Failed to parse Claude response:", content.text);
      throw new Error("Failed to parse AI response");
    }

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

    const repliesCount = processedReplies.length;
    
    // Save to database and get generation ID
    let generationId: string | null = null;
    
    try {
      const [, generationResult] = await Promise.all([
        incrementUsage(user.id, platform, repliesCount),
        saveGeneration(user.id, platform, comment, originalPost, tones || ["helpful"], processedReplies),
        updateAnalytics(user.id, platform, tones || ["helpful"], repliesCount),
      ]);
      
      generationId = generationResult.generation?.id || null;
    } catch (err) {
      console.error("Error saving to database:", err);
    }

    const newRemaining = limit === -1 ? -1 : Math.max(0, remaining - repliesCount);

    return NextResponse.json({
      replies: processedReplies,
      platform,
      generationId,
      usage: {
        remaining: newRemaining,
        limit,
        tier: user.subscription_tier,
      },
    });
  } catch (error) {
    console.error("Error generating replies:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to generate replies";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
