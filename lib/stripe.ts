import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
  typescript: true,
});

// Price IDs - set these in Stripe Dashboard and add to env vars
export const STRIPE_PRICES = {
  creator_pro: process.env.STRIPE_PRICE_CREATOR_PRO || '', // $29/month
  agency: process.env.STRIPE_PRICE_AGENCY || '', // $99/month
};

export const TIER_NAMES: Record<string, string> = {
  creator_pro: 'Creator Pro',
  agency: 'Agency',
};
