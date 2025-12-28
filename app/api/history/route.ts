import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getOrCreateUser, getGenerationHistory } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : 20;

    const clerkUser = await currentUser();
    const { user, error: userError } = await getOrCreateUser(
      clerkUserId,
      clerkUser?.emailAddresses[0]?.emailAddress,
      clerkUser?.firstName || clerkUser?.username || undefined
    );

    if (userError || !user) {
      return NextResponse.json({ error: "Failed to get user" }, { status: 500 });
    }

    const { generations, error } = await getGenerationHistory(user.id, limit);

    if (error) {
      console.error("Error getting history:", error);
      return NextResponse.json({ error: "Failed to get history" }, { status: 500 });
    }

    const history = generations.map((gen: any) => ({
      id: gen.id,
      platform: gen.platform,
      comment: gen.comment_text,
      originalPost: gen.original_post,
      tones: gen.tones_requested,
      replies: gen.replies,
      createdAt: gen.created_at,
    }));

    return NextResponse.json({ history });
  } catch (error) {
    console.error("Error in history API:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
