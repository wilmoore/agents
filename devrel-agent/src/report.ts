/**
 * Report generation module
 * Produces the final DevRel Agent Report in Markdown
 */

import { FrictionInsight } from './extractor.js';
import { AIToolConcept } from './reasoner.js';
import * as fs from 'fs';
import * as path from 'path';

export interface ReportData {
  batchId: string;
  generatedAt: string;
  frictions: FrictionInsight[];
  tools: AIToolConcept[];
}

/**
 * Generate the DevRel Agent Report
 */
export function generateReport(data: ReportData): string {
  const { batchId, generatedAt, frictions, tools } = data;

  const sections: string[] = [];

  // Header
  sections.push(`# RevenueCat DevRel Agent Report

**Batch:** ${batchId}
**Generated:** ${generatedAt}

---

## Agent Metadata

**Sources Analyzed:**
- RevenueCat Documentation
- RevenueCat Blog Posts
- GitHub Issues and Discussions

**Pipeline:** signals → extraction → reasoning → report

---`);

  // Developer Friction Section
  sections.push(`\n## Developer Friction Insights\n`);

  for (const friction of frictions) {
    sections.push(`### ${friction.friction}

${friction.description}

**Evidence:**
`);
    for (const evidence of friction.evidence.slice(0, 3)) {
      const sourceLabel = evidence.source.replace('/', ' → ');
      const urlPart = evidence.url ? ` ([source](${evidence.url}))` : '';
      sections.push(`- **${sourceLabel}:** "${evidence.text}"${urlPart}`);
    }
    sections.push('');
  }

  // Simulated Developer Questions
  sections.push(`---

## Simulated Developer Questions

Common questions developers might ask based on detected friction:

`);

  const questions = [
    'How do I test subscriptions locally without app store review?',
    'What is the difference between products and entitlements?',
    'How do I unlock premium features after a successful purchase?',
    'Why is offerings.current returning null in my paywall?',
    'How do I implement usage-based limits for free tier users?'
  ];

  for (const q of questions) {
    sections.push(`- ${q}`);
  }

  // Growth Experiment
  sections.push(`

---

## Growth Experiment

**Experiment:** Generate monetized AI tools demonstrating subscription monetization using RevenueCat.

**Goal:** Provide developers with concrete examples showing how to build AI tools that monetize with subscriptions.

**Hypothesis:** Developers who see working examples of AI tools with RevenueCat integration will adopt faster than those reading abstract documentation.

---`);

  // Generated AI Tools Section
  sections.push(`\n## Generated Monetized AI Tools\n`);

  for (let i = 0; i < tools.length; i++) {
    const tool = tools[i];
    sections.push(`### Tool #${i + 1} — ${tool.name}

${tool.description}

**Target Users:** ${tool.targetUsers}

**Addresses Friction:** ${tool.addressesFriction}

**Subscription Model:**

| Tier | Access |
|------|--------|
| Free | ${tool.monetization.freeTier} |
| Pro | ${tool.monetization.proTier} |

**Price:** ${tool.monetization.price}

**RevenueCat Products:**
\`\`\`
${tool.revenueCatProducts.join('\n')}
\`\`\`

**RevenueCat Integration Example (TypeScript):**

\`\`\`typescript
${tool.integrationExample}
\`\`\`

**DevRel Tutorial Idea:** ${tool.tutorialIdea}

---
`);
  }

  // Integration Pattern
  sections.push(`## RevenueCat Integration Pattern

The common pattern for monetizing AI tools using RevenueCat:

\`\`\`
user selects upgrade
        ↓
RevenueCat purchase
        ↓
entitlement granted
        ↓
premium features unlocked
\`\`\`

**Key Principles:**
1. Always check entitlements, not products
2. Handle null offerings gracefully
3. Use customerInfo for subscription status
4. Implement proper error handling for purchase failures

---`);

  // Tutorial Ideas
  sections.push(`## DevRel Tutorial Ideas

Potential developer education content derived from this report:

`);

  for (const tool of tools) {
    sections.push(`- ${tool.tutorialIdea}`);
  }

  sections.push(`- Testing subscription purchases during development
- Implementing usage-based limits with entitlements
- Building a complete paywall flow from scratch

---`);

  // Product Feedback
  sections.push(`## Product Feedback

Developer onboarding friction appears around **subscription testing workflows** and **entitlement configuration**.

**Suggested Improvements:**

1. **Quickstart Subscription Testing Guide**
   - Sandbox purchase setup
   - Entitlement verification steps
   - Local development workflow

2. **Entitlements vs Products Decision Tree**
   - Clear guidance on when to use which
   - Visual flowchart for common scenarios

3. **Web SDK Getting Started**
   - React integration example
   - Usage tracking patterns

---`);

  // Recommended Action
  sections.push(`## Recommended Next DevRel Action

Publish a tutorial demonstrating how to build a **monetized AI tool using RevenueCat**.

**Include:**
- Minimal working example
- Entitlement verification
- Local subscription testing workflow
- Paywall implementation

**Suggested First Tutorial:** ${tools[0]?.tutorialIdea || 'Build an AI tool with RevenueCat subscriptions'}

---

*Generated by RevenueCat DevRel Agent*
`);

  return sections.join('\n');
}

/**
 * Write report to file
 */
export function writeReport(content: string, outputPath: string): void {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(outputPath, content, 'utf-8');
}
