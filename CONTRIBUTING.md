# Contributing

Labelab is a static, local-first web app. Most changes touch `index.html`, `app.js`, `styles.css`, and the locale files in `i18n/`.

Before committing, run:

```powershell
# Checks JavaScript syntax.
node --check app.js
```

```powershell
# Parses every translation file.
node -e "const fs=require('fs'); for (const f of fs.readdirSync('i18n').filter(f=>f.endsWith('.json'))) JSON.parse(fs.readFileSync('i18n/'+f,'utf8')); console.log('i18n json ok')"
```

```powershell
# Checks for whitespace errors.
git diff --check
```

Update all `i18n/*.json` files whenever visible text, placeholders, alerts, confirmations, titles, or aria labels change.

Preserve local-first behavior. Updates must not clear browser catalog data, settings, presets, saved sheets, saved label types, or imported user data.

For AI coding agents, follow the detailed workflow in `AGENTS.md`.
