Update dependencies to their latest versions, read their changelogs, and bring the codebase fully in line with new best practices.

## Arguments

`$ARGUMENTS` is an optional space-separated list of package names to update (e.g. `vite react`).
If empty, update all dependencies in `package.json`.

## Steps

### 1. Read current state
Read `package.json` to get the full dependency list and their current versions.

### 2. Determine scope
If `$ARGUMENTS` is provided, work only on those packages. Otherwise work on all dependencies and devDependencies.

### 3. Research each package
For each package in scope:
- Use web search to find the latest version on npm.
- Compare to the current version. If already up to date, skip.
- Fetch and read the changelog or release notes (GitHub releases, CHANGELOG.md, or npm page) covering the range from the current version to the latest.
- Extract all of the following that are relevant to this codebase:
  - Breaking changes and required migrations
  - Deprecations (APIs, patterns, config options that still work but are discouraged)
  - New recommended APIs or patterns that replace older ones
  - Performance or correctness improvements achievable by adopting new features
  - Changes to configuration format or recommended config

### 4. Make a plan
Before touching any files, produce a structured plan. For each package that needs work, list:
- Current version → latest version
- What needs to change in the codebase (migrations, deprecation fixes, best-practice updates)
- Which files are likely affected

Present this plan and wait for approval before proceeding.

### 5. Update `package.json`
Apply the new versions for all packages being updated.

### 6. Install
Run `pnpm install` to apply changes and update `pnpm-lock.yaml`.

### 7. Update the codebase
For each package with changes, work through the plan:
- Fix breaking changes
- Replace deprecated APIs with their modern equivalents
- Adopt new recommended patterns and config where it improves correctness, performance, or maintainability
- Do not refactor code unrelated to the dependency changes

### 8. Verify
- Run `pnpm typecheck` and fix any type errors from the updates.
- Run `pnpm check` to lint and format changed files.

### 9. Summarise
Report what was updated, what changed in the codebase, and anything that was intentionally left for the developer to decide.
