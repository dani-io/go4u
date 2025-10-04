# 🗺️ Go4u Roadmap Sync Guide

## Overview

This guide explains how to manage the Go4u project roadmap using `roadmap.yml` as the single source of truth and syncing it with GitHub Issues and Projects.

---

## 📁 File Structure

```
go4u/
├── roadmap.yml                 # Source of truth for all tasks
├── scripts/
│   ├── sync-roadmap.js        # Sync roadmap → GitHub
│   └── export-csv.js          # Export to CSV format
├── ROADMAP_SYNC.md            # This file
└── package.json               # Scripts configured here
```

---

## 🚀 Quick Start

### 1. Setup GitHub Token

Create a Personal Access Token:
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes: `repo`, `project`
4. Copy token and add to `.env`:

```bash
echo "GITHUB_TOKEN=ghp_your_token_here" >> .env.local
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Sync Roadmap to GitHub

```bash
# Dry run first (no changes made)
pnpm roadmap:dry-run

# Apply changes
pnpm roadmap:sync
```

---

## 📝 How It Works

### Workflow

```
roadmap.yml (edit here)
    ↓
scripts/sync-roadmap.js
    ↓
GitHub Issues + Projects (auto-updated)
```

### What Gets Synced

✅ **Labels**: Created/updated with colors and descriptions  
✅ **Milestones**: Created with due dates  
✅ **Issues**: Created or updated based on task ID  
✅ **Dependencies**: Tracked in roadmap (manual link in GitHub)

### Idempotency

The script is **idempotent**:
- Existing issues are updated, not duplicated
- Task ID embedded in issue body as HTML comment: `<!-- task-id: task-001 -->`
- Safe to run multiple times

---

## 📋 Roadmap.yml Structure

```yaml
milestones:
  - id: mvp
    title: "Phase 1 — MVP"
    due_date: "2026-02-01"
    status: "planned"

labels:
  - name: "MVP"
    color: "d73a4a"
    description: "Must-have for MVP"

tasks:
  - id: task-001
    title: "Setup GitHub Project"
    description: |
      Long description with acceptance criteria
    labels:
      - "MVP"
      - "priority:high"
    milestone: "mvp"
    estimate: 2  # story points
    assignees: []
```

---

## 🛠️ Common Tasks

### Add a New Task

1. Edit `roadmap.yml`
2. Add task under appropriate phase
3. Run sync:

```bash
pnpm roadmap:sync
```

### Update Existing Task

1. Modify task in `roadmap.yml`
2. Run sync (will update existing issue):

```bash
pnpm roadmap:sync
```

### Export to CSV (backup)

```bash
pnpm roadmap:csv > backups/roadmap-$(date +%Y%m%d).csv
```

### View Roadmap Stats

```bash
# Count tasks by phase
grep "Phase-1" roadmap.yml | wc -l
grep "Phase-2" roadmap.yml | wc -l

# Count by priority
grep "priority:high" roadmap.yml | wc -l
```

---

## 📊 GitHub Project Setup

### Manual Steps (One-time)

1. **Create Project**:
   - Go to: https://github.com/users/dani-io/projects/2
   - Or create new: https://github.com/dani-io/go4u/projects

2. **Add Columns**:
   - Backlog
   - To Do
   - In Progress
   - Review
   - Done

3. **Configure Automation**:
   - Auto-add issues with label `MVP`
   - Auto-move to "Done" when PR merged

4. **Link Issues**:
   - Issues created by script will appear in project
   - Manually drag to appropriate columns

---

## 🎯 Story Point Estimation

We use Fibonacci sequence for estimates:

| Points | Complexity | Time Estimate |
|--------|-----------|---------------|
| 1 | Trivial | < 2 hours |
| 2 | Simple | 2-4 hours |
| 3 | Small | 4-8 hours (1 day) |
| 5 | Medium | 2-3 days |
| 8 | Large | 1 week |
| 13 | Very Large | 2 weeks |
| 21 | Huge | 3-4 weeks |
| 34 | Epic | 1-2 months |

---

## 🔍 Tracking Progress

### View Milestones

```bash
# GitHub CLI
gh milestone list

# Or visit
https://github.com/dani-io/go4u/milestones
```

### View Issues by Label

```bash
gh issue list --label "MVP"
gh issue list --label "priority:high"
gh issue list --milestone "Phase 1 — MVP"
```

### Burndown Chart

GitHub Projects automatically generates:
- Velocity chart
- Burndown chart
- Insights dashboard

---

## 🚨 Troubleshooting

### Issue: "GITHUB_TOKEN not found"

```bash
# Check if token exists
echo $GITHUB_TOKEN

# Add to .env.local
echo "GITHUB_TOKEN=ghp_xxx" >> .env.local

# Source it
source .env.local
```

### Issue: "API rate limit exceeded"

GitHub API limits:
- Authenticated: 5000 req/hour
- Unauthenticated: 60 req/hour

Solution: Wait 1 hour or use authenticated token

### Issue: Duplicate issues created

Check task IDs in roadmap.yml are unique.

Script matches by: `<!-- task-id: xxx -->`

---

## 📅 Maintenance

### Weekly

- Review completed tasks
- Update estimates if needed
- Move tasks between phases

### Monthly

- Review milestone progress
- Adjust due dates
- Archive completed milestones

### Quarterly

- Export CSV backup
- Review roadmap alignment with business goals
- Update long-term phases

---

## 🤝 Contributing

When adding tasks to roadmap:

1. ✅ Use clear, actionable titles
2. ✅ Include acceptance criteria
3. ✅ Add appropriate labels
4. ✅ Link related docs
5. ✅ Estimate story points
6. ✅ Define dependencies

Template:

```yaml
- id: task-XXX
  title: "Verb + Object (e.g., Build Chat System)"
  description: |
    Context and motivation
    
    **Acceptance Criteria:**
    - [ ] Criterion 1
    - [ ] Criterion 2
    
    **Related Docs:**
    - `/docs/path/to/doc.md`
  labels:
    - "area:backend"
    - "priority:high"
    - "Phase-1"
  milestone: "mvp"
  estimate: 8
```

---

## 🔗 Resources

- [GitHub Issues Docs](https://docs.github.com/en/issues)
- [GitHub Projects Docs](https://docs.github.com/en/issues/planning-and-tracking-with-projects)
- [Octokit API Docs](https://octokit.github.io/rest.js/)
- [Agile Estimation Guide](https://www.atlassian.com/agile/project-management/estimation)

---

## 📞 Support

Questions? Open an issue:
- [GitHub Issues](https://github.com/dani-io/go4u/issues)

Or discuss in:
- [GitHub Discussions](https://github.com/dani-io/go4u/discussions)
