#!/usr/bin/env node
/**
 * Bibliography Reference Validator
 *
 * Validates PMID and DOI references against PubMed and CrossRef APIs.
 * Generates a report of unfound references for manual review.
 *
 * Usage:
 *   node scripts/validate-bibliography.mjs [options]
 *
 * Options:
 *   --file <path>     Path to bibliography markdown file (default: src/data/mechanistic_framework/ad_dag_bibliography.md)
 *   --output <path>   Output report path (default: scripts/bibliography-validation-report.json)
 *   --check-only      Only check, don't prompt for fixes
 *   --verbose         Show detailed progress
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================================================
// PARSING
// ============================================================================

function parseReferences(content) {
  const lines = content.split('\n');
  const references = [];

  // Pattern for numbered references like "1. Author et al..."
  const refPattern = /^(\d+)\.\s+(.+)/;
  // PMID pattern
  const pmidPattern = /PMID[:\s]*(\d+)/i;
  // DOI pattern - handles various formats
  const doiPattern = /(?:DOI[:\s]*|https?:\/\/doi\.org\/)(10\.\d{4,}\/[^\s\]\)]+)/i;
  // Retracted pattern
  const retractedPattern = /~~.+~~|\*\*\[RETRACTED/i;
  // Year pattern in citation
  const yearPattern = /\b(19\d{2}|20\d{2})\b/;

  let currentRef = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNumber = i + 1;

    const refMatch = line.match(refPattern);
    if (refMatch) {
      // Save previous reference
      if (currentRef) {
        references.push(currentRef);
      }

      const refNumber = parseInt(refMatch[1], 10);
      const refText = refMatch[2];

      // Extract PMID
      const pmidMatch = refText.match(pmidPattern);
      const pmid = pmidMatch ? pmidMatch[1] : null;

      // Extract DOI - clean up trailing characters
      const doiMatch = refText.match(doiPattern);
      let doi = doiMatch ? doiMatch[1] : null;
      if (doi) {
        // Remove trailing punctuation that might be captured
        doi = doi.replace(/[\)\]\,\.]+$/, '');
      }

      // Check if retracted
      const isRetracted = retractedPattern.test(refText);

      // Extract year
      const yearMatch = refText.match(yearPattern);
      const year = yearMatch ? parseInt(yearMatch[1], 10) : null;

      // Extract first author (before "et al" or first comma)
      const authorMatch = refText.match(/^([A-Z][a-z]+(?:\s[A-Z])?)/);
      const firstAuthor = authorMatch ? authorMatch[1] : null;

      currentRef = {
        lineNumber,
        rawText: refText,
        refNumber,
        pmid,
        doi,
        firstAuthor,
        year,
        title: null,
        journal: null,
        isRetracted,
      };
    } else if (currentRef && line.trim().startsWith('-')) {
      // This is a sub-bullet for the current reference, append context
      currentRef.rawText += '\n' + line;
    }
  }

  // Don't forget the last reference
  if (currentRef) {
    references.push(currentRef);
  }

  return references;
}

// ============================================================================
// API VALIDATION
// ============================================================================

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function validatePMID(pmid) {
  try {
    // Use PubMed E-utilities API
    const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${pmid}&retmode=json`;

    const response = await fetch(url);
    if (!response.ok) {
      return { valid: false, error: `HTTP ${response.status}`, metadata: null };
    }

    const data = await response.json();

    if (data.error) {
      return { valid: false, error: data.error, metadata: null };
    }

    const result = data.result?.[pmid];
    if (!result || result.error) {
      return { valid: false, error: result?.error || 'PMID not found', metadata: null };
    }

    // Extract metadata
    const metadata = {
      pmid,
      title: result.title || '',
      authors: result.authors?.map(a => a.name) || [],
      journal: result.source || '',
      year: parseInt(result.pubdate?.split(' ')[0], 10) || 0,
      doi: result.elocationid?.replace('doi: ', '') || undefined,
    };

    return { valid: true, error: null, metadata };
  } catch (err) {
    return { valid: false, error: err.message || 'Unknown error', metadata: null };
  }
}

async function validateDOI(doi) {
  try {
    // Use CrossRef API
    const url = `https://api.crossref.org/works/${encodeURIComponent(doi)}`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'ALZ-Market-Viz/1.0 (mailto:research@example.com)',
      },
    });

    if (response.status === 404) {
      return { valid: false, error: 'DOI not found', metadata: null };
    }

    if (!response.ok) {
      return { valid: false, error: `HTTP ${response.status}`, metadata: null };
    }

    const data = await response.json();
    const work = data.message;

    if (!work) {
      return { valid: false, error: 'No data returned', metadata: null };
    }

    const metadata = {
      doi: work.DOI,
      title: work.title?.[0] || '',
      authors: work.author?.map(a =>
        `${a.family || ''}${a.given ? ', ' + a.given : ''}`
      ) || [],
      containerTitle: work['container-title']?.[0] || '',
      year: work.published?.['date-parts']?.[0]?.[0] || 0,
    };

    return { valid: true, error: null, metadata };
  } catch (err) {
    return { valid: false, error: err.message || 'Unknown error', metadata: null };
  }
}

// ============================================================================
// MAIN VALIDATION
// ============================================================================

async function validateReferences(references, verbose = false) {
  const results = [];

  for (let i = 0; i < references.length; i++) {
    const ref = references[i];

    if (verbose) {
      process.stdout.write(`\rValidating ${i + 1}/${references.length}: Ref #${ref.refNumber}...`);
    }

    // Skip retracted references
    if (ref.isRetracted) {
      results.push({
        reference: ref,
        pmidValid: null,
        pmidError: null,
        pmidMetadata: null,
        doiValid: null,
        doiError: null,
        doiMetadata: null,
        status: 'skipped',
        needsReview: false,
      });
      continue;
    }

    let pmidResult = { valid: null, error: null, metadata: null };
    let doiResult = { valid: null, error: null, metadata: null };

    // Validate PMID if present
    if (ref.pmid) {
      pmidResult = await validatePMID(ref.pmid);
      await sleep(150); // Rate limiting for NCBI
    }

    // Validate DOI if present
    if (ref.doi) {
      doiResult = await validateDOI(ref.doi);
      await sleep(150); // Rate limiting for CrossRef
    }

    // Determine status
    let status;
    let needsReview = false;

    if (!ref.pmid && !ref.doi) {
      status = 'no_identifiers';
      needsReview = true;
    } else if (ref.pmid && ref.doi) {
      if (pmidResult.valid && doiResult.valid) {
        status = 'valid';
      } else if (!pmidResult.valid && !doiResult.valid) {
        status = 'both_not_found';
        needsReview = true;
      } else if (!pmidResult.valid) {
        status = 'pmid_not_found';
        needsReview = true;
      } else {
        status = 'doi_not_found';
        needsReview = true;
      }
    } else if (ref.pmid) {
      status = pmidResult.valid ? 'valid' : 'pmid_not_found';
      needsReview = !pmidResult.valid;
    } else {
      status = doiResult.valid ? 'valid' : 'doi_not_found';
      needsReview = !doiResult.valid;
    }

    results.push({
      reference: ref,
      pmidValid: pmidResult.valid,
      pmidError: pmidResult.error,
      pmidMetadata: pmidResult.metadata,
      doiValid: doiResult.valid,
      doiError: doiResult.error,
      doiMetadata: doiResult.metadata,
      status,
      needsReview,
    });
  }

  if (verbose) {
    console.log('\n');
  }

  return results;
}

// ============================================================================
// INTERACTIVE REVIEW
// ============================================================================

async function interactiveReview(results) {
  const needsReview = results.filter(r => r.needsReview);

  if (needsReview.length === 0) {
    console.log('\n✅ All references validated successfully!');
    return results;
  }

  console.log(`\n⚠️  Found ${needsReview.length} references that need review:\n`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (prompt) => {
    return new Promise(resolve => rl.question(prompt, resolve));
  };

  for (const result of needsReview) {
    const ref = result.reference;
    console.log('─'.repeat(80));
    console.log(`📖 Reference #${ref.refNumber} (Line ${ref.lineNumber})`);
    console.log(`   Status: ${result.status}`);
    console.log(`   Author: ${ref.firstAuthor || 'Unknown'} (${ref.year || '?'})`);

    if (ref.pmid) {
      console.log(`   PMID: ${ref.pmid} - ${result.pmidValid ? '✅' : '❌ ' + result.pmidError}`);
    }
    if (ref.doi) {
      console.log(`   DOI: ${ref.doi} - ${result.doiValid ? '✅' : '❌ ' + result.doiError}`);
    }

    // Show truncated raw text
    const truncated = ref.rawText.substring(0, 200) + (ref.rawText.length > 200 ? '...' : '');
    console.log(`   Text: ${truncated}\n`);

    const answer = await question('   Mark for search? (y/n/q to quit): ');

    if (answer.toLowerCase() === 'q') {
      break;
    }

    result.markedForSearch = answer.toLowerCase() === 'y';
  }

  rl.close();
  return results;
}

// ============================================================================
// REPORT GENERATION
// ============================================================================

function generateReport(results, filePath) {
  return {
    timestamp: new Date().toISOString(),
    filePath,
    totalReferences: results.length,
    validCount: results.filter(r => r.status === 'valid').length,
    invalidCount: results.filter(r => r.needsReview).length,
    skippedCount: results.filter(r => r.status === 'skipped').length,
    needsReviewCount: results.filter(r => r.needsReview).length,
    results,
  };
}

function printSummary(report) {
  console.log('\n' + '═'.repeat(60));
  console.log('📊 BIBLIOGRAPHY VALIDATION SUMMARY');
  console.log('═'.repeat(60));
  console.log(`File: ${report.filePath}`);
  console.log(`Time: ${report.timestamp}`);
  console.log('');
  console.log(`Total References: ${report.totalReferences}`);
  console.log(`  ✅ Valid:        ${report.validCount}`);
  console.log(`  ❌ Needs Review: ${report.needsReviewCount}`);
  console.log(`  ⏭️  Skipped:      ${report.skippedCount}`);
  console.log('');

  // Group issues by type
  const byStatus = {};
  for (const r of report.results.filter(r => r.needsReview)) {
    if (!byStatus[r.status]) byStatus[r.status] = [];
    byStatus[r.status].push(r);
  }

  if (Object.keys(byStatus).length > 0) {
    console.log('Issues by Type:');
    for (const [status, items] of Object.entries(byStatus)) {
      console.log(`  ${status}: ${items.length}`);
      for (const item of items.slice(0, 3)) {
        console.log(`    - Ref #${item.reference.refNumber}: ${item.reference.firstAuthor} ${item.reference.year}`);
      }
      if (items.length > 3) {
        console.log(`    ... and ${items.length - 3} more`);
      }
    }
  }

  // Show marked for search
  const markedForSearch = report.results.filter(r => r.markedForSearch);
  if (markedForSearch.length > 0) {
    console.log('');
    console.log(`🔍 Marked for Search: ${markedForSearch.length}`);
    for (const item of markedForSearch) {
      console.log(`  - Ref #${item.reference.refNumber}: ${item.reference.firstAuthor} ${item.reference.year}`);
      if (item.reference.pmid) console.log(`    PMID: ${item.reference.pmid}`);
      if (item.reference.doi) console.log(`    DOI: ${item.reference.doi}`);
    }
  }

  console.log('═'.repeat(60));
}

// ============================================================================
// CLI
// ============================================================================

async function main() {
  const args = process.argv.slice(2);

  // Parse arguments
  let filePath = 'src/data/mechanistic_framework/ad_dag_bibliography.md';
  let outputPath = 'scripts/bibliography-validation-report.json';
  let checkOnly = false;
  let verbose = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--file' && args[i + 1]) {
      filePath = args[++i];
    } else if (args[i] === '--output' && args[i + 1]) {
      outputPath = args[++i];
    } else if (args[i] === '--check-only') {
      checkOnly = true;
    } else if (args[i] === '--verbose') {
      verbose = true;
    } else if (args[i] === '--help') {
      console.log(`
Bibliography Reference Validator

Usage:
  node scripts/validate-bibliography.mjs [options]

Options:
  --file <path>     Path to bibliography markdown file
  --output <path>   Output report path
  --check-only      Only check, don't prompt for fixes
  --verbose         Show detailed progress
  --help            Show this help
`);
      process.exit(0);
    }
  }

  // Resolve paths relative to project root
  const projectRoot = path.resolve(__dirname, '..');
  const resolvedFilePath = path.resolve(projectRoot, filePath);
  const resolvedOutputPath = path.resolve(projectRoot, outputPath);

  console.log('📚 Bibliography Reference Validator');
  console.log('─'.repeat(40));
  console.log(`Input:  ${resolvedFilePath}`);
  console.log(`Output: ${resolvedOutputPath}`);
  console.log('');

  // Read file
  if (!fs.existsSync(resolvedFilePath)) {
    console.error(`❌ File not found: ${resolvedFilePath}`);
    process.exit(1);
  }

  const content = fs.readFileSync(resolvedFilePath, 'utf-8');

  // Parse references
  console.log('Parsing references...');
  const references = parseReferences(content);
  console.log(`Found ${references.length} references`);

  // Validate
  console.log('\nValidating against PubMed and CrossRef APIs...');
  let results = await validateReferences(references, verbose);

  // Interactive review (unless check-only)
  if (!checkOnly) {
    results = await interactiveReview(results);
  }

  // Generate report
  const report = generateReport(results, resolvedFilePath);

  // Save report
  fs.writeFileSync(resolvedOutputPath, JSON.stringify(report, null, 2));
  console.log(`\n📄 Report saved to: ${resolvedOutputPath}`);

  // Print summary
  printSummary(report);

  // Exit with error code if issues found
  process.exit(report.needsReviewCount > 0 ? 1 : 0);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
