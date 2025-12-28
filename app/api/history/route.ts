import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getOrCreateUser, getGenerationHistory } from "@/lib/db";
import { getSupabaseAdmin } from "@/lib/supabase";

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
      console.error("Failed to get user:", userError);
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
      selectedReplyId: gen.selected_reply_id,
      createdAt: gen.created_at,
    }));

    return NextResponse.json({ history });
  } catch (error) {
    console.error("Error in history API:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Track which reply was selected/copied
export async function POST(req: NextRequest) {
  try {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { generationId, replyId } = body;

    if (!generationId || !replyId) {
      return NextResponse.json({ error: "Missing generationId or replyId" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      // Supabase not configured - just return success
      return NextResponse.json({ success: true });
    }

    // Update the generation with selected reply
    const { error } = await supabase
      .from('generations')
      .update({ selected_reply_id: replyId })
      .eq('id', generationId);

    if (error) {
      console.error("Error updating selected reply:", error);
      return NextResponse.json({ error: "Failed to track selection" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error tracking reply selection:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
