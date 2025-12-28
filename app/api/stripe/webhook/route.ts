import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getSupabaseAdmin } from '@/lib/supabase';
import Stripe from 'stripe';

// Disable body parsing - Stripe needs raw body
export const runtime = 'nodejs';

async function updateUserTier(supabaseUserId: string, tier: string, stripeCustomerId?: string) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    console.error('Supabase not configured');
    return;
  }

  const updateData: Record<string, string> = {
    subscription_tier: tier,
    subscription_status: 'active',
    updated_at: new Date().toISOString(),
  };

  if (stripeCustomerId) {
    updateData.stripe_customer_id = stripeCustomerId;
  }

  const { error } = await supabase
    .from('replytomic_users')
    .update(updateData)
    .eq('id', supabaseUserId);

  if (error) {
    console.error('Error updating user tier:', error);
  } else {
    console.log(`Updated user ${supabaseUserId} to tier: ${tier}`);
  }
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const supabaseUserId = subscription.metadata?.supabase_user_id;
  const tier = subscription.metadata?.tier;
  const customerId = subscription.customer as string;

  if (!supabaseUserId) {
    console.error('No supabase_user_id in subscription metadata');
    return;
  }

  if (subscription.status === 'active' || subscription.status === 'trialing') {
    await updateUserTier(supabaseUserId, tier || 'creator_pro', customerId);
  } else if (subscription.status === 'canceled' || subscription.status === 'unpaid') {
    await updateUserTier(supabaseUserId, 'free', customerId);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('STRIPE_WEBHOOK_SECRET not set');
      return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
    }

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    console.log(`Processing webhook event: ${event.type}`);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode === 'subscription' && session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
          );
          await handleSubscriptionChange(subscription);
        }
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionChange(subscription);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const supabaseUserId = subscription.metadata?.supabase_user_id;
        if (supabaseUserId) {
          await updateUserTier(supabaseUserId, 'free');
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log(`Payment failed for invoice: ${invoice.id}`);
        // Could send email notification here
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
