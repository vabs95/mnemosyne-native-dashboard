# GitHub Repository Setup

Use this checklist when publishing Mnemosyne Dashboard as an open-source GitHub
repository.

## Repository Basics

- Set visibility to public only after reviewing the repository for private
  memory data, tokens, logs, and local paths.
- Set the default branch to `main`.
- Add repository topics: `hermes-agent`, `mnemosyne`, `memory`, `dashboard`,
  `fastapi`, `react`, `sqlite`.
- Add the project homepage or documentation URL if one exists.
- Keep `LICENSE`, `NOTICE.md`, `SECURITY.md`, `CONTRIBUTING.md`, and
  `CODE_OF_CONDUCT.md` at the repository root.

## Security And Analysis

Enable these in GitHub under `Settings > Advanced Security`:

- Dependency graph.
- Dependabot alerts.
- Dependabot security updates.
- Code scanning with CodeQL.
- Secret scanning and push protection, if available for the repository.
- Private vulnerability reporting for public repositories.

This repository includes:

- `.github/dependabot.yml` for npm and GitHub Actions updates.
- `.github/workflows/codeql.yml` for Python and JavaScript/TypeScript scanning.
- `SECURITY.md` with the supported security model and reporting guidance.

## Branch Protection

Create a ruleset or branch protection rule for `main` with:

- Require a pull request before merging.
- Require at least one approving review.
- Dismiss stale approvals when new commits are pushed.
- Require review from Code Owners.
- Require status checks to pass before merging.
- Require branches to be up to date before merging.
- Required checks:
  - `test (3.11)`
  - `test (3.12)`
  - `analyze (python)`
  - `analyze (javascript-typescript)`
- Block force pushes.
- Block branch deletion.
- Require linear history if you want a simple commit history.
- Include administrators unless you intentionally need an emergency bypass.

## Pull Requests And Merges

Recommended merge settings:

- Disable direct pushes to `main`.
- Allow squash merging.
- Disable merge commits unless you specifically want them.
- Disable rebase merging unless contributors are comfortable with it.
- Enable automatic branch deletion after merge.
- Enable auto-merge only after required checks and reviews are configured.

## Actions Security

Recommended Actions settings:

- Allow GitHub Actions and reusable workflows from trusted sources.
- Set the default workflow token permission to read-only.
- Require approval for first-time contributors before running workflows.
- Avoid storing secrets unless a workflow requires them.
- Never expose private memory database files, credentials, or session data in
  workflow artifacts.

## Maintainer Checklist

- Confirm `.github/CODEOWNERS` uses the correct GitHub username or team.
- Update `SECURITY.md` with a real private contact path if GitHub private
  vulnerability reporting is not enabled.
- Review Dependabot PRs regularly.
- Triage CodeQL alerts before tagging stable releases.
- Add release notes to `CHANGELOG.md` for user-facing changes.
