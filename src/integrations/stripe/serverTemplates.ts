/**
 * Production Backend Skeletons for Stripe Integration
 * 
 * Drop these exact route handlers into your backend of choice (Next.js, Express,
 * Supabase Edge Functions, or Cloudflare Workers) to go live with real charges.
 */

export const STRIPE_SERVER_TEMPLATES = {
  nextjsAppRouter: {
    title: "Next.js 14/15 App Router",
    filename: "app/api/create-payment-intent/route.ts",
    description: "Serverless Route Handler for creating Stripe PaymentIntents with currency & metadata.",
    code: `import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

export async function POST(req: Request) {
  try {
    const { amount, currency = 'usd', customerEmail, description, metadata } = await req.json();

    // 1. Create or retrieve Stripe Customer
    const customer = await stripe.customers.create({
      email: customerEmail,
    });

    // 2. Create PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Amount in cents
      currency,
      customer: customer.id,
      description,
      metadata: {
        ...metadata,
        customerEmail,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error: any) {
    console.error('Stripe PaymentIntent error:', error);
    return NextResponse.json(
      { error: error.message || 'Payment authorization failed' },
      { status: 500 }
    );
  }
}`,
    webhookFilename: "app/api/webhooks/stripe/route.ts",
    webhookCode: `import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error(\`Webhook signature verification failed:\`, err.message);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  // Handle successful payment events
  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('Payment succeeded:', paymentIntent.id, 'Amount:', paymentIntent.amount);
      // TODO: Fulfill order in database (e.g. Supabase, PostgreSQL)
      // TODO: Trigger automated receipt email via Resend
      break;
    }
    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.warn('Payment failed:', paymentIntent.last_payment_error?.message);
      break;
    }
    default:
      console.log(\`Unhandled event type \${event.type}\`);
  }

  return NextResponse.json({ received: true });
}`,
  },

  expressNode: {
    title: "Node.js & Express Server",
    filename: "server.js",
    description: "Standalone Express server with raw body webhook verification and payment routes.",
    code: `const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Webhook MUST use raw express.raw body parser before express.json()
app.post('/api/webhooks/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(\`Webhook Error: \${err.message}\`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    console.log('Order verified & authorized:', paymentIntent.id);
    // Fulfill order in DB
  }

  res.json({ received: true });
});

// JSON middleware for regular API routes
app.use(cors());
app.use(express.json());

app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'usd', customerEmail } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency,
      receipt_email: customerEmail,
      automatic_payment_methods: { enabled: true },
    });

    res.json({ clientSecret: paymentIntent.client_secret, paymentIntentId: paymentIntent.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => console.log('Stripe API Server running on port 3001'));`,
  },

  supabaseEdge: {
    title: "Supabase Edge Function (Deno)",
    filename: "supabase/functions/stripe-checkout/index.ts",
    description: "Ultra-low-latency edge function deployed directly in Supabase using Deno and Stripe SDK.",
    code: `import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@14.10.0?target=deno';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
  apiVersion: '2024-06-20',
  httpClient: Stripe.createFetchHttpClient(),
});

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    });
  }

  try {
    const { amount, currency = 'usd', customerEmail, description } = await req.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      receipt_email: customerEmail,
      description,
    });

    return new Response(JSON.stringify({ clientSecret: paymentIntent.client_secret }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
});`,
  },
};
