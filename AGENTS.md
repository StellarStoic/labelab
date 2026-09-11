# Labelab Agent Workflow

These instructions are for AI coding agents working on Labelab.

## Project Shape

Labelab is a static, local-first web app. The primary files are:

- `index.html` for app structure and controls.
- `app.js` for catalog logic, rendering, localStorage, import/export, sharing, and deploy update handling.
- `styles.css` for app chrome, print preview, labels, modals, themes, and responsive layout.
- `i18n/*.json` for every user-facing string.
- `README.md` and `CONTRIBUTING.md` for project and workflow documentation.
- `.github/workflows/pages.yml` and `scripts/prepare-deploy.mjs` for GitHub Pages deployment and cache busting.

## Development Rules

- Keep changes scoped to the requested behavior.
- Do not rewrite unrelated UI, data, or generated image/sign assets.
- Do not touch unrelated untracked local files such as `.vscode/` or ad-hoc catalog backup JSON files unless the user explicitly asks.
- Preserve user catalog data. App updates must not clear `localStorage`, reset catalog items, reset settings, or overwrite user presets/label types/saved sheets.
- Add short, useful comments for non-obvious code blocks.
- Prefer existing helpers and data normalization functions over adding parallel formats.
- Keep printed label output separate from app chrome themes. Themes should not change printed label colors unless the user changes label color controls.

## Data Model Notes

- Catalog data is stored under `labelLab.codes.v1`.
- UI/settings data is stored under `labelLab.settings.v1`.
- `codes.json` is bundled/default catalog data, not the user’s live browser catalog.
- Exported backup JSON should preserve catalog items, categories, presets, saved sheets, favorite grids, and saved label types.
- Presets store visual label setup such as typography, barcode size, colors, and padding.
- Label types store physical sheet stock such as paper size, rows, columns, margins, gaps, manufacturer, and package EAN/code.
- Catalog item `title` is the catalog name.
- Catalog item `labelTitle` is the optional printed label title. If it is empty, printing falls back to `title`.
- Item-level `settings` stores saved setup for a catalog item and is included in backup JSON.
- Category-applied layout changes are merged into each affected item’s `settings` so backup/import carries them.

## Internationalization

Every visible UI string, alert, confirmation, title, placeholder, and aria label needs an i18n key.

When adding or changing copy, update all locale files:

- `i18n/en.json`
- `i18n/de.json`
- `i18n/es.json`
- `i18n/fr.json`
- `i18n/ru.json`
- `i18n/sl.json`
- `i18n/zh.json`

Keep keys consistent across all locale files. If a translation is uncertain, add a clear best-effort translation rather than leaving the key missing.

## Validation Before Commit

Run these checks before committing:

```powershell
# Checks JavaScript syntax.
node --check app.js
```

```powershell
# Parses every locale JSON file.
node -e "const fs=require('fs'); for (const f of fs.readdirSync('i18n').filter(f=>f.endsWith('.json'))) JSON.parse(fs.readFileSync('i18n/'+f,'utf8')); console.log('i18n json ok')"
```

```powershell
# Checks for whitespace errors in the diff.
git diff --check
```

If a command needs elevated permissions because the sandbox cannot access `.git` or Node path resolution, request approval and rerun the same command.

## Git Workflow

- Check status before staging.
- Stage only intended files.
- Leave unrelated untracked files untouched.
- Use concise commit messages that describe the behavior change.
- Push only when the user asks, or when the user explicitly asks to commit and push.

Useful commands:

```powershell
# Shows modified and untracked files.
git status --short
```

```powershell
# Shows the staged change summary.
git diff --cached --stat
```

```powershell
# Commits staged files.
git commit -m "Describe the change"
```

```powershell
# Pushes the main branch.
git push origin main
```

After pushing, verify:

```powershell
# Confirms local latest commit.
git log -1 --oneline
```

```powershell
# Confirms remote main commit.
git ls-remote origin refs/heads/main
```

## Deployment And Version Updates

GitHub Pages deploys from `main` through `.github/workflows/pages.yml`.

The workflow:

- Copies the static site to `_site/`.
- Excludes repository metadata and development folders.
- Runs `scripts/prepare-deploy.mjs`.
- Generates `version.json` from recent Git commits.
- Adds the current commit hash to deployed `styles.css` and `app.js` URLs.

The app fetches `version.json` with `cache: "no-store"` on startup. When the deployed commit differs from the browser-acknowledged commit, it shows the update modal. The update modal must not clear catalog or settings storage.

## Manual QA Focus

For UI work, manually think through:

- Selection should not move the catalog scroll position.
- Selecting one catalog item must not leak styling into another item.
- Hidden controls must not erase ignored fields unexpectedly.
- Import/merge must preserve local catalog data unless the user chooses replace.
- Exported JSON must include saved user data needed on another computer.
- Collapsed sidebar ordering must keep Catalog pinned and bottom action buttons fixed.
- Themes must remain readable in panels, modals, selected rows, and controls.
