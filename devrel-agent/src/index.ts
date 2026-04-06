#!/usr/bin/env node
/**
 * RevenueCat DevRel Agent
 *
 * Converts developer ecosystem signals into structured DevRel artifacts.
 *
 * Usage: devrel-agent run
 */

import { collectSignals } from './signals.js';
import { extractFriction } from './extractor.js';
import { generateToolConcepts } from './reasoner.js';
import { generateReport, writeReport } from './report.js';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function run(): void {
  console.log('RevenueCat DevRel Agent');
  console.log('=======================\n');

  // Stage 1: Signal Extraction
  console.log('Stage 1: Collecting developer signals...');
  const signals = collectSignals();
  console.log(`  → Collected ${signals.length} signals\n`);

  // Stage 2: Friction Extraction
  console.log('Stage 2: Extracting developer friction...');
  const frictions = extractFriction(signals);
  console.log(`  → Identified ${frictions.length} friction clusters\n`);

  for (const f of frictions) {
    console.log(`    - ${f.friction} (${f.evidence.length} signals)`);
  }
  console.log('');

  // Stage 3: Reasoning (Tool Generation)
  console.log('Stage 3: Generating AI tool concepts...');
  const tools = generateToolConcepts(frictions);
  console.log(`  → Generated ${tools.length} tool concepts\n`);

  for (const t of tools) {
    console.log(`    - ${t.name}`);
  }
  console.log('');

  // Stage 4: Report Generation
  console.log('Stage 4: Generating DevRel report...');

  const batchId = 'batch-001';
  const generatedAt = new Date().toISOString().split('T')[0];

  const reportContent = generateReport({
    batchId,
    generatedAt,
    frictions,
    tools
  });

  // Write to reports directory (relative to project root)
  const projectRoot = path.resolve(__dirname, '..');
  const outputPath = path.join(projectRoot, 'reports', `${batchId}.md`);

  writeReport(reportContent, outputPath);
  console.log(`  → Report written to: ${outputPath}\n`);

  // Summary
  console.log('=======================');
  console.log('DevRel Agent Complete');
  console.log('=======================\n');

  console.log('Output: reports/batch-001.md');
  console.log('');
  console.log('Contents:');
  console.log('  - Developer Friction Insights');
  console.log('  - Evidence from signals');
  console.log('  - Monetized AI Tool Examples');
  console.log('  - RevenueCat Integration Patterns');
  console.log('  - Tutorial Ideas');
  console.log('  - Product Feedback');
}

// CLI handling
const command = process.argv[2];

if (command === 'run') {
  run();
} else if (command === '--help' || command === '-h') {
  console.log(`
RevenueCat DevRel Agent

Usage:
  devrel-agent run    Generate DevRel report

Output:
  reports/batch-001.md
`);
} else {
  console.log('Usage: devrel-agent run');
  console.log('Run "devrel-agent --help" for more information.');
}
