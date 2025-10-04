#!/usr/bin/env node
/**
 * Go4u — Roadmap Sync Script
 * 
 * Syncs roadmap.yml with GitHub Issues and Project
 * 
 * Usage:
 *   node scripts/sync-roadmap.js
 * 
 * Requirements:
 *   - GitHub Personal Access Token with repo + project permissions
 *   - GITHUB_TOKEN in .env or environment
 */

import fs from 'fs';
import yaml from 'yaml';
import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';
import 'dotenv/config'
dotenv.config();

// ============================================
// CONFIGURATION
// ============================================

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'dani-io';
const REPO_NAME = 'go4u';
const ROADMAP_FILE = './roadmap.yml';
const DRY_RUN = process.argv.includes('--dry-run');

if (!GITHUB_TOKEN) {
  console.error('❌ GITHUB_TOKEN not found in environment');
  console.error('💡 Create one at: https://github.com/settings/tokens');
  console.error('   Required scopes: repo, project');
  process.exit(1);
}

const octokit = new Octokit({ auth: GITHUB_TOKEN });

// ============================================
// MAIN FUNCTION
// ============================================

async function main() {
  console.log('🚀 Go4u Roadmap Sync\n');

  // Step 1: Load roadmap.yml
  console.log('📖 Loading roadmap.yml...');
  const roadmapContent = fs.readFileSync(ROADMAP_FILE, 'utf8');
  const roadmap = yaml.parse(roadmapContent);

  console.log(`✅ Loaded ${roadmap.tasks.length} tasks\n`);

  // Step 2: Sync labels
  console.log('🏷️  Syncing labels...');
  await syncLabels(roadmap.labels);

  // Step 3: Sync milestones
  console.log('\n🎯 Syncing milestones...');
  const milestoneMap = await syncMilestones(roadmap.milestones);

  // Step 4: Sync issues
  console.log('\n📝 Syncing issues...');
  await syncIssues(roadmap.tasks, milestoneMap);

  console.log('\n✨ Sync complete!');
  
  if (DRY_RUN) {
    console.log('\n⚠️  This was a dry run. No changes were made.');
    console.log('   Run without --dry-run to apply changes.');
  }
}

// ============================================
// SYNC LABELS
// ============================================

async function syncLabels(labels) {
  for (const label of labels) {
    try {
      if (DRY_RUN) {
        console.log(`  [DRY] Would create/update label: ${label.name}`);
        continue;
      }

      // Try to get existing label
      try {
        await octokit.issues.getLabel({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          name: label.name,
        });
        
        // Update if exists
        await octokit.issues.updateLabel({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          name: label.name,
          color: label.color,
          description: label.description,
        });
        
        console.log(`  ✓ Updated label: ${label.name}`);
      } catch (error) {
        if (error.status === 404) {
          // Create if doesn't exist
          await octokit.issues.createLabel({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            name: label.name,
            color: label.color,
            description: label.description,
          });
          console.log(`  ✓ Created label: ${label.name}`);
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error(`  ✗ Error with label ${label.name}:`, error.message);
    }
  }
}

// ============================================
// SYNC MILESTONES
// ============================================

async function syncMilestones(milestones) {
  const milestoneMap = new Map();

  // Get existing milestones
  const { data: existingMilestones } = await octokit.issues.listMilestones({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    state: 'all',
  });

  for (const milestone of milestones) {
    try {
      const existing = existingMilestones.find(m => m.title === milestone.title);

      if (DRY_RUN) {
        console.log(`  [DRY] Would ${existing ? 'update' : 'create'} milestone: ${milestone.title}`);
        milestoneMap.set(milestone.id, existing?.number || null);
        continue;
      }

      if (existing) {
        // Update existing
        const { data } = await octokit.issues.updateMilestone({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          milestone_number: existing.number,
          title: milestone.title,
          description: milestone.description,
          due_on: milestone.due_date ? new Date(milestone.due_date).toISOString() : undefined,
          state: milestone.status === 'completed' ? 'closed' : 'open',
        });
        milestoneMap.set(milestone.id, data.number);
        console.log(`  ✓ Updated milestone: ${milestone.title} (#${data.number})`);
      } else {
        // Create new
        const { data } = await octokit.issues.createMilestone({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          title: milestone.title,
          description: milestone.description,
          due_on: milestone.due_date ? new Date(milestone.due_date).toISOString() : undefined,
        });
        milestoneMap.set(milestone.id, data.number);
        console.log(`  ✓ Created milestone: ${milestone.title} (#${data.number})`);
      }
    } catch (error) {
      console.error(`  ✗ Error with milestone ${milestone.title}:`, error.message);
    }
  }

  return milestoneMap;
}

// ============================================
// SYNC ISSUES
// ============================================

async function syncIssues(tasks, milestoneMap) {
  // Get existing issues
  const { data: existingIssues } = await octokit.issues.listForRepo({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    state: 'all',
    per_page: 100,
  });

  for (const task of tasks) {
    try {
      // Check if issue already exists (by task ID in body)
      const taskIdMarker = `<!-- task-id: ${task.id} -->`;
      const existing = existingIssues.find(issue => 
        issue.body?.includes(taskIdMarker)
      );

      const issueBody = `${taskIdMarker}\n\n${task.description}`;
      
      const milestoneNumber = task.milestone ? milestoneMap.get(task.milestone) : undefined;

      if (DRY_RUN) {
        console.log(`  [DRY] Would ${existing ? 'update' : 'create'} issue: ${task.title}`);
        continue;
      }

      if (existing) {
        // Update existing issue
        await octokit.issues.update({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          issue_number: existing.number,
          title: task.title,
          body: issueBody,
          labels: task.labels || [],
          milestone: milestoneNumber,
          assignees: task.assignees || [],
        });
        console.log(`  ✓ Updated issue #${existing.number}: ${task.title}`);
      } else {
        // Create new issue
        const { data } = await octokit.issues.create({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          title: task.title,
          body: issueBody,
          labels: task.labels || [],
          milestone: milestoneNumber,
          assignees: task.assignees || [],
        });
        console.log(`  ✓ Created issue #${data.number}: ${task.title}`);
      }
    } catch (error) {
      console.error(`  ✗ Error with task ${task.id}:`, error.message);
    }
  }
}

// ============================================
// EXECUTE
// ============================================

main().catch(error => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
