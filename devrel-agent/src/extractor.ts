/**
 * Friction extraction module
 * Clusters signals into developer friction insights
 */

import { Signal } from './signals.js';

export interface FrictionInsight {
  friction: string;
  description: string;
  evidence: {
    text: string;
    source: string;
    url?: string;
  }[];
}

/**
 * Classify signals into friction clusters
 * MVP: Rule-based classification
 * Future: LLM-powered clustering
 */
export function extractFriction(signals: Signal[]): FrictionInsight[] {
  const clusters: Map<string, FrictionInsight> = new Map();

  // Define friction patterns
  const patterns: { pattern: RegExp; friction: string; description: string }[] = [
    {
      pattern: /test|sandbox|development|ci\/cd/i,
      friction: 'Subscription Testing Confusion',
      description: 'Developers struggle with testing subscription flows during development. Sandbox testing, local development workflows, and CI/CD integration are common pain points.'
    },
    {
      pattern: /entitlement|product|which.*use|customerInfo/i,
      friction: 'Entitlements vs Products Confusion',
      description: 'Developers are confused about when to use entitlements vs products, how to check subscription status, and how customerInfo relates to entitlements.'
    },
    {
      pattern: /paywall|block|content|offerings|price/i,
      friction: 'Paywall Implementation Complexity',
      description: 'Developers need clearer patterns for implementing paywalls, handling offerings, and unlocking premium content after purchase.'
    },
    {
      pattern: /web|react|javascript|api|usage/i,
      friction: 'Web SDK and API Integration',
      description: 'Developers building web applications and AI tools need better guidance on web SDK usage, API integration, and usage-based pricing patterns.'
    }
  ];

  // Classify each signal
  for (const signal of signals) {
    for (const { pattern, friction, description } of patterns) {
      if (pattern.test(signal.text)) {
        if (!clusters.has(friction)) {
          clusters.set(friction, {
            friction,
            description,
            evidence: []
          });
        }
        clusters.get(friction)!.evidence.push({
          text: signal.text,
          source: `${signal.source}/${signal.type}`,
          url: signal.url
        });
        break; // First match wins
      }
    }
  }

  // Return top 3 friction clusters by evidence count
  return Array.from(clusters.values())
    .sort((a, b) => b.evidence.length - a.evidence.length)
    .slice(0, 3);
}
