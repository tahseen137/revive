import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

// Lazy initialization to avoid build-time errors when env vars aren't set
function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not configured')
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2026-01-28.clover',
  })
}

// CORS headers for AI agent access
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

// Handle CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

// GET /api/acp - Return product catalog
export async function GET() {
  const catalog = {
    acp_version: '2026-01-30',
    name: 'Revive',
    description: 'Automated payment recovery for Stripe. Recover failed payments before losing customers.',
    plans: [
      {
        id: 'starter',
        name: 'Starter',
        description: 'Perfect for small SaaS businesses. Recover failed payments automatically.',
        price: {
          amount: 2900,
          currency: 'usd',
          billing_period: 'monthly',
        },
        trial_days: 14,
        features: [
          'Up to 500 recovered payments/month',
          'Smart retry engine',
          'Email notification sequences',
          'Stripe integration',
          'Basic analytics',
          '14-day free trial',
        ],
      },
      {
        id: 'growth',
        name: 'Growth',
        description: 'For growing businesses with higher volume. Advanced features and priority support.',
        price: {
          amount: 7900,
          currency: 'usd',
          billing_period: 'monthly',
        },
        trial_days: 14,
        features: [
          'Unlimited recovered payments',
          'Advanced retry strategies',
          'Custom email templates',
          'Webhooks & API access',
          'Advanced analytics & reports',
          'Priority support',
          '14-day free trial',
        ],
      },
    ],
  }

  return NextResponse.json(catalog, { headers: corsHeaders })
}

// POST /api/acp - Create checkout session for AI agents
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { plan_id, buyer_email, agent_id } = body

    // Validate plan
    const validPlans = ['starter', 'growth']
    if (!plan_id || !validPlans.includes(plan_id)) {
      return NextResponse.json(
        { error: 'Invalid plan_id. Must be "starter" or "growth".' },
        { status: 400, headers: corsHeaders }
      )
    }

    // Plan configuration
    const planConfig: Record<string, { name: string; amount: number }> = {
      starter: { name: 'Revive Starter', amount: 2900 },
      growth: { name: 'Revive Growth', amount: 7900 },
    }

    const plan = planConfig[plan_id]
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://revive-hq.com'

    // Create Stripe checkout session
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: plan.name,
              description: `${plan.name} - Monthly subscription for payment recovery`,
            },
            unit_amount: plan.amount,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      ...(buyer_email ? { customer_email: buyer_email } : {}),
      metadata: {
        source: 'acp',
        agent_id: agent_id || 'unknown',
        plan: plan_id,
      },
      success_url: `${appUrl}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/pricing`,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      subscription_data: {
        trial_period_days: 14,
        metadata: {
          plan: plan_id,
        },
      },
    })

    // Return ACP-compliant response
    return NextResponse.json(
      {
        checkout_session: {
          id: session.id,
          status: 'pending',
          checkout_url: session.url,
          plan_id: plan_id,
          amount: session.amount_total,
          currency: session.currency,
          trial_days: 14,
        },
      },
      { headers: corsHeaders }
    )
  } catch (error) {
    console.error('ACP checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500, headers: corsHeaders }
    )
  }
}
