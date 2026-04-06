#!/usr/bin/env node
/**
 * Distribution Gate Verification
 *
 * This script must pass before any direct RevenueCat outreach is allowed.
 * See ADR-002 and CLAUDE.md for context.
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

interface CheckResult {
  name: string;
  passed: boolean;
  message: string;
}

const checks: CheckResult[] = [];

// Check 1: Live signal extraction (not static)
function checkLiveSignals(): CheckResult {
  const signalsPath = path.join(projectRoot, 'src', 'signals.ts');
  const content = fs.readFileSync(signalsPath, 'utf-8');

  // Check for GitHub API usage indicators
  const hasApiCall = content.includes('fetch(') ||
                     content.includes('octokit') ||
                     content.includes('github.com/repos');

  // Check for static data indicators
  const hasStaticData = content.includes('return [') &&
                        content.includes('"source":') &&
                        !hasApiCall;

  return {
    name: 'Live Signal Extraction',
    passed: hasApiCall && !hasStaticData,
    message: hasApiCall
      ? 'GitHub API integration detected'
      : 'BLOCKED: signals.ts uses static data, not live GitHub API'
  };
}

// Check 2: Minimum batch count
function checkBatchCount(): CheckResult {
  const reportsDir = path.join(projectRoot, 'reports');

  if (!fs.existsSync(reportsDir)) {
    return {
      name: 'Batch Count',
      passed: false,
      message: 'BLOCKED: reports/ directory does not exist'
    };
  }

  const batches = fs.readdirSync(reportsDir)
    .filter(f => f.startsWith('batch-') && f.endsWith('.md'));

  return {
    name: 'Batch Count',
    passed: batches.length >= 3,
    message: batches.length >= 3
      ? `${batches.length} batches generated`
      : `BLOCKED: ${batches.length}/3 required batches exist`
  };
}

// Check 3: Evidence URLs are real (not example URLs)
function checkEvidenceUrls(): CheckResult {
  const reportsDir = path.join(projectRoot, 'reports');

  if (!fs.existsSync(reportsDir)) {
    return {
      name: 'Evidence URLs',
      passed: false,
      message: 'BLOCKED: No reports to check'
    };
  }

  const reports = fs.readdirSync(reportsDir)
    .filter(f => f.endsWith('.md'));

  let hasExampleUrls = false;
  let hasRealUrls = false;

  for (const report of reports) {
    const content = fs.readFileSync(path.join(reportsDir, report), 'utf-8');

    // Check for placeholder/example URLs
    if (content.includes('/example-') ||
        content.includes('example.com') ||
        content.includes('/issues/example')) {
      hasExampleUrls = true;
    }

    // Check for real GitHub URLs with numeric IDs
    const realUrlPattern = /github\.com\/RevenueCat\/[\w-]+\/(issues|discussions)\/\d+/;
    if (realUrlPattern.test(content)) {
      hasRealUrls = true;
    }
  }

  return {
    name: 'Evidence URLs',
    passed: hasRealUrls && !hasExampleUrls,
    message: hasExampleUrls
      ? 'BLOCKED: Reports contain example/placeholder URLs'
      : hasRealUrls
        ? 'Real GitHub URLs detected in reports'
        : 'BLOCKED: No verifiable GitHub URLs found'
  };
}

// Check 4: Source metadata in reports
function checkSourceMetadata(): CheckResult {
  const reportsDir = path.join(projectRoot, 'reports');

  if (!fs.existsSync(reportsDir)) {
    return {
      name: 'Source Metadata',
      passed: false,
      message: 'BLOCKED: No reports to check'
    };
  }

  const latestBatch = fs.readdirSync(reportsDir)
    .filter(f => f.startsWith('batch-') && f.endsWith('.md'))
    .sort()
    .pop();

  if (!latestBatch) {
    return {
      name: 'Source Metadata',
      passed: false,
      message: 'BLOCKED: No batch reports found'
    };
  }

  const content = fs.readFileSync(path.join(reportsDir, latestBatch), 'utf-8');

  const hasTimestamp = /Generated:\s*\d{4}-\d{2}-\d{2}/.test(content) ||
                       /Fetched:\s*\d{4}-\d{2}-\d{2}/.test(content);
  const hasSourceCount = /signals?\s*(collected|fetched|analyzed)/i.test(content);

  return {
    name: 'Source Metadata',
    passed: hasTimestamp && hasSourceCount,
    message: hasTimestamp && hasSourceCount
      ? 'Reports contain timestamp and source metadata'
      : 'BLOCKED: Reports missing timestamp or source metadata'
  };
}

// Run all checks
function verify(): boolean {
  console.log('DevRel Agent — Distribution Gate Verification');
  console.log('='.repeat(50));
  console.log('');

  checks.push(checkLiveSignals());
  checks.push(checkBatchCount());
  checks.push(checkEvidenceUrls());
  checks.push(checkSourceMetadata());

  let allPassed = true;

  for (const check of checks) {
    const status = check.passed ? '✓' : '✗';
    const color = check.passed ? '\x1b[32m' : '\x1b[31m';
    const reset = '\x1b[0m';

    console.log(`${color}${status}${reset} ${check.name}`);
    console.log(`  ${check.message}`);
    console.log('');

    if (!check.passed) {
      allPassed = false;
    }
  }

  console.log('='.repeat(50));

  if (allPassed) {
    console.log('\x1b[32m✓ VERIFICATION PASSED\x1b[0m');
    console.log('');
    console.log('Direct RevenueCat outreach is ALLOWED.');
    console.log('See ADR-002 for distribution guidelines.');
  } else {
    console.log('\x1b[31m✗ VERIFICATION FAILED\x1b[0m');
    console.log('');
    console.log('Direct RevenueCat outreach is BLOCKED.');
    console.log('');
    console.log('Next steps:');
    console.log('1. Implement live GitHub API signal extraction');
    console.log('2. Generate 3+ batches with real data');
    console.log('3. Ensure all evidence URLs are verifiable');
    console.log('4. Re-run: npm run verify');
  }

  return allPassed;
}

const passed = verify();
process.exit(passed ? 0 : 1);
