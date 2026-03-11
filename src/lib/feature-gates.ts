/**
 * Feature Gates for Revive Pricing Tiers
 * 
 * Free tier: Up to $500/mo recovered
 * - Basic smart retries
 * - 1 dunning email sequence
 * - Stripe only
 * - "Powered by Revive" branding
 * 
 * Indie tier: $29/mo
 * - Unlimited recovery
 * - Advanced AI retry optimization
 * - Custom dunning sequences
 * - Win-back campaigns
 * - All platforms (Stripe, LS, Gumroad, Paddle)
 * - Advanced analytics
 * - Priority support
 * - Webhooks
 * 
 * Pro tier: $99/mo
 * - Everything in Indie
 * - A/B testing (sequences, timing)
 * - Advanced analytics (cohorts, attribution)
 * - Team access (up to 5 seats)
 * - Webhooks + Slack notifications
 * - Monthly ROI reports (PDF export)
 * - White-label emails (remove branding)
 * - Priority chat support + onboarding call
 */

export type PricingTier = 'free' | 'indie' | 'pro';

export interface UserSubscription {
  tier: PricingTier;
  recoveredThisMonth: number; // in dollars
  stripeCustomerId?: string;
  stripePriceId?: string;
  subscriptionStatus?: 'active' | 'past_due' | 'canceled' | 'trialing';
}

/**
 * Feature flags for each pricing tier
 */
export const FEATURES = {
  // Recovery limits
  UNLIMITED_RECOVERY: ['indie', 'pro'],
  
  // Dunning features
  CUSTOM_DUNNING_SEQUENCES: ['indie', 'pro'],
  MULTIPLE_SEQUENCES: ['indie', 'pro'], // Free: 1 sequence only
  AB_TESTING: ['pro'],
  
  // Platform support
  ALL_PLATFORMS: ['indie', 'pro'], // Free: Stripe only
  STRIPE: ['free', 'indie', 'pro'],
  LEMON_SQUEEZY: ['indie', 'pro'],
  GUMROAD: ['indie', 'pro'],
  PADDLE: ['indie', 'pro'],
  
  // Analytics
  BASIC_ANALYTICS: ['free', 'indie', 'pro'],
  ADVANCED_ANALYTICS: ['indie', 'pro'],
  COHORT_ANALYSIS: ['pro'],
  ATTRIBUTION_REPORTS: ['pro'],
  ROI_REPORTS_PDF: ['pro'],
  
  // Campaigns
  WINBACK_CAMPAIGNS: ['indie', 'pro'],
  
  // Team features
  TEAM_ACCESS: ['pro'],
  TEAM_SEATS_LIMIT: {
    free: 1,
    indie: 1,
    pro: 5,
  },
  
  // Integrations
  WEBHOOKS: ['indie', 'pro'],
  SLACK_NOTIFICATIONS: ['pro'],
  
  // Branding
  WHITE_LABEL_EMAILS: ['pro'],
  REMOVE_BRANDING: ['indie', 'pro'], // Free: "Powered by Revive" footer
  
  // Support
  EMAIL_SUPPORT: ['free', 'indie', 'pro'],
  PRIORITY_SUPPORT: ['indie', 'pro'],
  CHAT_SUPPORT: ['pro'],
  ONBOARDING_CALL: ['pro'],
} as const;

/**
 * Check if a user has access to a specific feature
 */
export function hasFeature(
  subscription: UserSubscription,
  feature: keyof typeof FEATURES
): boolean {
  const tier = subscription.tier;
  
  // Special case: Free tier recovery limit
  if (feature === 'UNLIMITED_RECOVERY') {
    if (tier === 'free' && subscription.recoveredThisMonth >= 500) {
      return false; // Hit free tier limit
    }
  }
  
  const allowedTiers = FEATURES[feature];
  
  if (Array.isArray(allowedTiers)) {
    return allowedTiers.includes(tier);
  }
  
  // Handle numeric limits (like team seats)
  if (typeof allowedTiers === 'object') {
    return tier in allowedTiers;
  }
  
  return false;
}

/**
 * Get the maximum number of team seats for a subscription
 */
export function getTeamSeatsLimit(subscription: UserSubscription): number {
  return FEATURES.TEAM_SEATS_LIMIT[subscription.tier];
}

/**
 * Check if user should be prompted to upgrade
 */
export function shouldPromptUpgrade(subscription: UserSubscription): {
  shouldPrompt: boolean;
  reason?: string;
  suggestedTier?: PricingTier;
} {
  // Free tier approaching limit
  if (subscription.tier === 'free' && subscription.recoveredThisMonth >= 400) {
    return {
      shouldPrompt: true,
      reason: `You've recovered $${subscription.recoveredThisMonth}/month. Upgrade to Indie ($29/mo) for unlimited recovery.`,
      suggestedTier: 'indie',
    };
  }
  
  // Free tier hit limit
  if (subscription.tier === 'free' && subscription.recoveredThisMonth >= 500) {
    return {
      shouldPrompt: true,
      reason: "You've hit the $500/mo free tier limit. Upgrade to Indie ($29/mo) to continue recovering revenue.",
      suggestedTier: 'indie',
    };
  }
  
  return { shouldPrompt: false };
}

/**
 * Get feature comparison for upgrade prompts
 */
export function getUpgradeIncentives(
  currentTier: PricingTier,
  targetTier: PricingTier
): string[] {
  const incentives: Record<string, string[]> = {
    'free->indie': [
      'Unlimited recovery (no $500/mo cap)',
      'Custom dunning sequences',
      'Win-back campaigns (7/14/30 day)',
      'All platforms (Lemon Squeezy, Gumroad, Paddle)',
      'Advanced analytics',
      'Priority support',
    ],
    'indie->pro': [
      'A/B testing for dunning sequences',
      'Advanced analytics (cohorts, attribution)',
      'Team access (up to 5 seats)',
      'Slack notifications',
      'Monthly ROI reports (PDF)',
      'White-label emails (remove branding)',
      'Priority chat support + onboarding call',
    ],
    'free->pro': [
      'Unlimited recovery',
      'A/B testing',
      'Team access (5 seats)',
      'Advanced analytics (cohorts, attribution)',
      'All platforms support',
      'Slack notifications',
      'White-label emails',
      'Priority chat support',
    ],
  };
  
  const key = `${currentTier}->${targetTier}`;
  return incentives[key] || [];
}

/**
 * Stripe Price IDs (to be configured after Stripe setup)
 */
export const STRIPE_PRICE_IDS = {
  indie: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_INDIE_MONTHLY || 'price_indie_monthly_placeholder',
    annual: process.env.NEXT_PUBLIC_STRIPE_PRICE_INDIE_ANNUAL || 'price_indie_annual_placeholder',
  },
  pro: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY || 'price_pro_monthly_placeholder',
    annual: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_ANNUAL || 'price_pro_annual_placeholder',
  },
} as const;

/**
 * Get pricing info for display
 */
export function getPricingInfo(tier: PricingTier): {
  name: string;
  price: string;
  billingPeriod: string;
  annualPrice?: string;
  annualSavings?: string;
} {
  const pricing = {
    free: {
      name: 'Free',
      price: '$0',
      billingPeriod: 'forever',
    },
    indie: {
      name: 'Indie',
      price: '$29',
      billingPeriod: 'month',
      annualPrice: '$290',
      annualSavings: 'Save $58 (16% off)',
    },
    pro: {
      name: 'Pro',
      price: '$99',
      billingPeriod: 'month',
      annualPrice: '$990',
      annualSavings: 'Save $198 (16% off)',
    },
  };
  
  return pricing[tier];
}
