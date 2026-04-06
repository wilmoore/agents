/**
 * Reasoning module
 * Generates AI tool concepts, monetization models, and integration examples
 */

import { FrictionInsight } from './extractor.js';

export interface AIToolConcept {
  name: string;
  description: string;
  targetUsers: string;
  addressesFriction: string;
  monetization: {
    freeTier: string;
    proTier: string;
    price: string;
  };
  revenueCatProducts: string[];
  integrationExample: string;
  tutorialIdea: string;
}

/**
 * Map friction insights to AI tool concepts
 * Each friction maps to a specific tool that demonstrates the solution
 */
const FRICTION_TO_TOOL: Record<string, Omit<AIToolConcept, 'addressesFriction'>> = {
  'Subscription Testing Confusion': {
    name: 'AI Meeting Summarizer',
    description: 'AI tool that summarizes meeting recordings and emails summaries to teams. Demonstrates subscription testing with a clear sandbox workflow.',
    targetUsers: 'Remote teams and managers',
    monetization: {
      freeTier: '10 summaries per month',
      proTier: 'Unlimited summaries + team sharing',
      price: '$12/month'
    },
    revenueCatProducts: ['meeting_pro_monthly', 'meeting_pro_yearly'],
    integrationExample: `import Purchases from "@revenuecat/purchases-js"

// Configure with your API key
Purchases.configure({ apiKey: process.env.REVENUECAT_API_KEY })

// Get available subscription offerings
const offerings = await Purchases.getOfferings()

// Purchase a subscription package
const purchase = await Purchases.purchasePackage(
  offerings.current.availablePackages[0]
)

// Check entitlements to unlock features
if (purchase.customerInfo.entitlements.active["pro"]) {
  unlockPremiumFeatures()
}`,
    tutorialIdea: 'Build an AI Meeting Summarizer with subscription monetization using RevenueCat'
  },

  'Entitlements vs Products Confusion': {
    name: 'AI Resume Optimizer',
    description: 'AI tool that reviews resumes and suggests improvements. Demonstrates clear entitlement-based feature gating.',
    targetUsers: 'Job seekers and career changers',
    monetization: {
      freeTier: '5 resume reviews per month',
      proTier: 'Unlimited reviews + cover letter generation',
      price: '$8/month'
    },
    revenueCatProducts: ['resume_pro_monthly', 'resume_pro_yearly'],
    integrationExample: `import Purchases from "@revenuecat/purchases-js"

// Get current customer info
const customerInfo = await Purchases.getCustomerInfo()

// Check specific entitlement (NOT product)
const hasProAccess = customerInfo.entitlements.active["pro"] !== undefined

// Use entitlements for feature gating
if (hasProAccess) {
  // User has pro - unlock all features
  enableCoverLetterGeneration()
  enableUnlimitedReviews()
} else {
  // Free tier - show upgrade prompt
  showPaywall()
}`,
    tutorialIdea: 'Implement entitlement-based feature unlocking in your AI tool'
  },

  'Paywall Implementation Complexity': {
    name: 'AI Workout Planner',
    description: 'AI tool that generates personalized workout plans. Demonstrates clean paywall implementation with proper offering handling.',
    targetUsers: 'Fitness enthusiasts and personal trainers',
    monetization: {
      freeTier: '3 plans per week',
      proTier: 'Unlimited plans + nutrition tracking',
      price: '$10/month'
    },
    revenueCatProducts: ['workout_pro_monthly', 'workout_pro_yearly'],
    integrationExample: `import Purchases from "@revenuecat/purchases-js"

// Fetch offerings (handles null safely)
async function showPaywall() {
  const offerings = await Purchases.getOfferings()

  // Always check for current offering
  if (!offerings.current) {
    console.error("No offerings configured")
    return
  }

  // Display packages with prices
  for (const pkg of offerings.current.availablePackages) {
    console.log(\`\${pkg.identifier}: \${pkg.product.priceString}\`)
  }

  // Handle purchase
  const selectedPackage = offerings.current.availablePackages[0]
  const result = await Purchases.purchasePackage(selectedPackage)

  if (result.customerInfo.entitlements.active["pro"]) {
    dismissPaywall()
    unlockPremiumContent()
  }
}`,
    tutorialIdea: 'Build a robust paywall with RevenueCat offerings and error handling'
  },

  'Web SDK and API Integration': {
    name: 'AI Code Reviewer',
    description: 'AI tool that reviews code and suggests improvements. Demonstrates web SDK integration for developer tools.',
    targetUsers: 'Software developers and engineering teams',
    monetization: {
      freeTier: '50 reviews per month',
      proTier: 'Unlimited reviews + team dashboard',
      price: '$15/month'
    },
    revenueCatProducts: ['code_pro_monthly', 'code_pro_yearly'],
    integrationExample: `import Purchases from "@revenuecat/purchases-js"

// Web SDK initialization for React
function App() {
  useEffect(() => {
    Purchases.configure({
      apiKey: process.env.REVENUECAT_API_KEY,
    })
  }, [])

  // Track usage for metered billing
  async function reviewCode(code: string) {
    const customerInfo = await Purchases.getCustomerInfo()
    const isPro = customerInfo.entitlements.active["pro"]

    if (!isPro) {
      const usage = await getMonthlyUsage()
      if (usage >= 50) {
        return showUpgradePrompt()
      }
    }

    // Perform review
    return aiReviewCode(code)
  }
}`,
    tutorialIdea: 'Integrate RevenueCat Web SDK in your React application'
  }
};

/**
 * Generate AI tool concepts from friction insights
 */
export function generateToolConcepts(frictions: FrictionInsight[]): AIToolConcept[] {
  return frictions.map(friction => {
    const template = FRICTION_TO_TOOL[friction.friction];

    if (!template) {
      // Fallback for unmapped friction
      return {
        name: 'AI Assistant Tool',
        description: `AI tool addressing: ${friction.friction}`,
        targetUsers: 'Developers and power users',
        addressesFriction: friction.friction,
        monetization: {
          freeTier: 'Limited usage',
          proTier: 'Unlimited access',
          price: '$10/month'
        },
        revenueCatProducts: ['assistant_pro_monthly'],
        integrationExample: '// See RevenueCat documentation',
        tutorialIdea: `Tutorial: Monetizing AI tools that solve ${friction.friction}`
      };
    }

    return {
      ...template,
      addressesFriction: friction.friction
    };
  });
}
