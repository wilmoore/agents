/**
 * Signal extraction module
 * Collects developer ecosystem signals from configured sources
 */

export interface Signal {
  source: 'github' | 'docs' | 'blog' | 'stackoverflow';
  type: 'issue' | 'discussion' | 'question' | 'friction';
  text: string;
  url?: string;
}

/**
 * MVP: Static signals based on real RevenueCat developer friction patterns
 * Future: Replace with live API calls to GitHub, docs, etc.
 */
export function collectSignals(): Signal[] {
  return [
    // GitHub Issues - Subscription Testing
    {
      source: 'github',
      type: 'issue',
      text: 'How do I test purchases without going through App Store review?',
      url: 'https://github.com/RevenueCat/purchases-ios/issues/example-1'
    },
    {
      source: 'github',
      type: 'issue',
      text: 'Sandbox testing not working during development - purchases fail silently',
      url: 'https://github.com/RevenueCat/purchases-ios/issues/example-2'
    },
    {
      source: 'github',
      type: 'discussion',
      text: 'Best practices for testing subscription flows in CI/CD pipeline?',
      url: 'https://github.com/RevenueCat/purchases-ios/discussions/example-1'
    },

    // GitHub Issues - Entitlements vs Products
    {
      source: 'github',
      type: 'issue',
      text: 'Entitlements vs products still confusing - when should I use which?',
      url: 'https://github.com/RevenueCat/purchases-ios/issues/example-3'
    },
    {
      source: 'github',
      type: 'discussion',
      text: 'My entitlements are not updating after successful purchase',
      url: 'https://github.com/RevenueCat/purchases-ios/discussions/example-2'
    },
    {
      source: 'github',
      type: 'issue',
      text: 'How do I check if user has active subscription? customerInfo vs entitlements',
      url: 'https://github.com/RevenueCat/purchases-ios/issues/example-4'
    },

    // GitHub Issues - Paywall Implementation
    {
      source: 'github',
      type: 'issue',
      text: 'How to implement a paywall that blocks content until subscription is active?',
      url: 'https://github.com/RevenueCat/purchases-ios/issues/example-5'
    },
    {
      source: 'github',
      type: 'discussion',
      text: 'Paywall not showing correct prices - offerings.current is null',
      url: 'https://github.com/RevenueCat/purchases-ios/discussions/example-3'
    },

    // StackOverflow - General Confusion
    {
      source: 'stackoverflow',
      type: 'question',
      text: 'RevenueCat sandbox testing not working during development',
      url: 'https://stackoverflow.com/questions/example-1'
    },
    {
      source: 'stackoverflow',
      type: 'question',
      text: 'How to properly configure RevenueCat for web subscriptions?',
      url: 'https://stackoverflow.com/questions/example-2'
    },

    // Docs - Friction Points
    {
      source: 'docs',
      type: 'friction',
      text: 'Getting Started guide assumes familiarity with App Store Connect setup',
    },
    {
      source: 'docs',
      type: 'friction',
      text: 'No clear migration path from Stripe to RevenueCat',
    },

    // Blog - Feature Requests
    {
      source: 'blog',
      type: 'discussion',
      text: 'Comment: Would love to see more examples of AI tool monetization',
    },
    {
      source: 'blog',
      type: 'discussion',
      text: 'Comment: How does RevenueCat work with usage-based pricing for API tools?',
    },

    // Additional signals for coverage
    {
      source: 'github',
      type: 'issue',
      text: 'Web SDK: How to handle subscription purchases in React app?',
      url: 'https://github.com/RevenueCat/purchases-js/issues/example-1'
    },
    {
      source: 'github',
      type: 'discussion',
      text: 'Best way to implement free trial with RevenueCat?',
      url: 'https://github.com/RevenueCat/purchases-js/discussions/example-1'
    },
  ];
}
