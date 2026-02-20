Update dependencies to their latest versions, read their changelogs, and bring the codebase fully in line with new best practices.

## Arguments

`$ARGUMENTS` is an optional space-separated list of package names to update (e.g. `vite react`).
If empty, update all dependencies in `package.json`.

## Steps

### 1. Determine what is outdated

Run `pnpm outdated --format json` to get current and latest versions in one shot.
If `$ARGUMENTS` is provided, filter to those packages. Skip any that are already up to date.

For `@types/*` packages, the major version must match the runtime tool — e.g. `@types/node` must stay on the same major as the Node.js version in use (`node --version`). Never bump a `@types/*` package to a major version ahead of the runtime.

### 2. Read changelogs

For each outdated package, run `pnpm view <pkg> repository.url` to get the GitHub URL, then fetch the releases or CHANGELOG.md covering the range from current to latest. Extract only what is relevant to this codebase:
- Breaking changes and required migrations
- Deprecated APIs or patterns
- New recommended APIs or config that replace older ones

### 3. Plan

Produce a structured plan. For each package list: current → latest, what needs to change, which files are affected. Wait for approval before proceeding.

### 4. Update and install

Update versions in `package.json`, then run `pnpm install`.

### 5. Migrate the codebase

Work through the plan: fix breaking changes, replace deprecated APIs, adopt new recommended patterns. Do not touch code unrelated to the dependency changes.

### 6. Verify

Run `pnpm typecheck` then `pnpm check`. Fix any errors before finishing.

### 7. Summarise

Report what was updated, what changed in the codebase, and anything left for the developer to decide.
