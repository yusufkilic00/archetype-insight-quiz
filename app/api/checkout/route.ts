import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  /* STRIPE INTEGRATION POINT:
   * 1. npm install stripe
   * 2. Add STRIPE_SECRET_KEY to .env.local
   * 3. Replace mock response with:
   *    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-04-10' });
   *    const session = await stripe.checkout.sessions.create({ ... });
   *    return NextResponse.json({ url: session.url });
   */
  return NextResponse.json({ url: null });
}
