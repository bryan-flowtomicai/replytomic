import { NextRequest, NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { stripe, STRIPE_PRICES } from '@/lib/stripe';
import { getOrCreateUser } from '@/lib/db';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const clerkUser = await currentUser();
    const { user, error: userError } = await getOrCreateUser(
      clerkUserId,
      clerkUser?.emailAddresses[0]?.emailAddress,
      clerkUser?.firstName || clerkUser?.username || undefined
    );

    if (userError || !user) {
      return NextResponse.json({ error: 'Failed to get user' }, { status: 500 });
    }

    const body = await req.json();
    const { priceId, tier } = body;

    // Validate tier
    if (!tier || !['creator_pro', 'agency'].includes(tier)) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
    }

    // Get the price ID
    const stripePriceId = priceId || STRIPE_PRICES[tier as keyof typeof STRIPE_PRICES];
    if (!stripePriceId) {
      return NextResponse.json({ error: 'Price not configured. Set STRIPE_PRICE_CREATOR_PRO or STRIPE_PRICE_AGENCY env var.' }, { status: 400 });
    }

    // Get or create Stripe customer
    let customerId = user.stripe_customer_id;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name || undefined,
        metadata: {
          clerk_user_id: clerkUserId,
          supabase_user_id: user.id,
        },
      });
      customerId = customer.id;

      // Save customer ID to database
      const supabase = getSupabaseAdmin();
      if (supabase) {
        await supabase
          .from('replytomic_users')
          .update({ stripe_customer_id: customerId })
          .eq('id', user.id);
      }
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: stripePriceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard?upgraded=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard?canceled=true`,
      metadata: {
        clerk_user_id: clerkUserId,
        supabase_user_id: user.id,
        tier: tier,
      },
      subscription_data: {
        metadata: {
          clerk_user_id: clerkUserId,
          supabase_user_id: user.id,
          tier: tier,
        },
      },
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    const message = error instanceof Error ? error.message : 'Failed to create checkout session';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
