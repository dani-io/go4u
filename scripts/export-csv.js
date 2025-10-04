#!/usr/bin/env node
/**
 * Go4u — Export Roadmap to CSV
 * 
 * Exports roadmap.yml to CSV format for GitHub bulk import
 * 
 * Usage:
 *   node scripts/export-csv.js > roadmap.csv
 */

import fs from 'fs';
import yaml from 'yaml';

const ROADMAP_FILE = './roadmap.yml';

function main() {
  const content = fs.readFileSync(ROADMAP_FILE, 'utf8');
  const roadmap = yaml.parse(content);

  // CSV Header (GitHub Issues import format)
  const header = [
    'title',
    'body',
    'labels',
    'milestone',
    'assignees',
    'estimate',
  ];

  console.log(header.join(','));

  // Export each task
  for (const task of roadmap.tasks) {
    const row = [
      escapeCSV(task.title),
      escapeCSV(task.description),
      escapeCSV(task.labels?.join(';') || ''),
      escapeCSV(task.milestone || ''),
      escapeCSV(task.assignees?.join(';') || ''),
      task.estimate || '',
    ];

    console.log(row.join(','));
  }
}

function escapeCSV(field) {
  if (field === null || field === undefined) return '';
  
  const str = String(field);
  
  // Escape quotes and wrap in quotes if contains comma/newline/quote
  if (str.includes(',') || str.includes('\n') || str.includes('"')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  
  return str;
}

main();
