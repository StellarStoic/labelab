# Labelab

Labelab is a browser-based label maker for creating printable barcode, QR code, text, and safety-sign label sheets. It is designed to run as a static website, keep the working catalog in the browser, and give users detailed control over label content, paper size, spacing, typography, colors, and print output.

The app is useful for simple product labels, warehouse labels, shelf tags, warning labels, handling labels, QR labels, and custom printable sheets where the user needs exact layout control without sending label data to a backend service. Everything runs and is saved on your machine.

## What Labelab Can Do

- Create label items with a title, code value, optional upper text, optional lower text, signal word, category, color, and preset.
- Render multiple label modes:
  - Barcode or QR code labels.
  - Text-only labels.
  - Sign and pictogram labels.
- Generate these code types:
  - EAN-13.
  - EAN-8.
  - UPC-A.
  - Code 39.
  - Code 128.
  - QR Code.
- Search, select, edit, and delete catalog items from the left-side catalog panel.
- Group catalog items by category and assign category colors.
- Save reusable layout and style presets, then apply them to new or existing labels.
- Save manufacturer label types with package EAN/code, paper size, grid, margins, and gaps, then apply them by selecting or scanning the package code.
- Explicitly adapt text, barcode, QR, sign size, and padding controls to the current individual label size when switching to a different label type.
- Scan supported barcodes with the device camera through the browser `BarcodeDetector` API when the browser supports it.
- Add manual Unicode or emoji signs by typing symbols or code point formats such as `U+2620`.
- Search a local sign dictionary and attach SVG/image signs to labels.
- Lazy-load large sign dictionaries while scrolling so the sign picker stays responsive.
- Use ISO, recycling, public information, safety, warning, mandatory, prohibition, fire safety, plastic recycling, and GHS hazard pictograms from local image metadata.
- Preview the full printable sheet live in the browser.
- Zoom the preview in, out, or fit it to the available preview area.
- Print labels directly from the browser.
- Use the browser print dialog to save the result as a PDF.
- Share the current label setup through a generated link.
- Save a single label setup as a `.label.json` file.
- Export and import the full catalog as JSON.
- Store catalog, settings, presets, saved sheets, and label types in browser `localStorage`.
- Switch between light and dark themes.
- Switch between metric and imperial measurement units.
- Use the interface in English, Slovenian, French, and Chinese.

## Label Layout Features

Labelab exposes detailed layout controls for users who need labels to match specific paper sheets or printers:

- Paper sizes:
  - ISO A0-A10.
  - ISO B0-B10.
  - ISO C0-C10 envelopes.
  - US Letter, Legal, Tabloid, Ledger, Executive, Statement, and Folio.
  - Photo sizes.
  - Custom paper width and height.
- Portrait and landscape orientation.
- Saved label types for physical manufacturer sheets, including optional package EAN/code lookup.
- Grid presets such as `5 x 15`, `4 x 16`, `3 x 10`, and `2 x 8`.
- Custom rows and columns.
- Page margins for top, right, bottom, and left.
- Horizontal and vertical gaps between labels.
- Per-label print count limit.
- Label background color.
- Barcode color.
- Title color.
- Code number color.
- Font family selection across sans serif, serif, monospace, and display fonts.
- Title size, code number size, barcode max height, QR max size, and sign max size.
- Directional padding controls for barcode placement and sign placement.
- Manual `Adapt content` action for retuning content sizes after changing to a smaller or larger label format.
- Toggle controls for title, code number, text above, text below, bold, and italic styles.
- Drag-and-drop ordering for label parts.

Presets and label types intentionally serve different jobs. Presets store visual label setup, such as typography, barcode size, colors, and padding. Label types store the physical sheet stock, such as paper size, row/column count, margins, gaps, and package code. Selecting a label type changes the sheet geometry; adapting content is a separate button so carefully tuned label styling is not changed automatically.

## Sign And Pictogram Dictionary

The sign picker is powered by local image files and metadata:

- The manifest lives in `images/signs.json`.
- The metadata dictionary lives in `images/iso_signs/signs_metadata.json`.
- Local sign assets are under `images/iso_signs/` and `images/ghs/`.
- The GHS hazard pictograms are included in the `GHS_Hazard_Pictograms` metadata group.
- The picker searches sign title, filename, description, group, and keywords.
- The picker renders signs in batches while scrolling, which keeps the UI usable with large metadata sets.

More information about adding local sign files is in `images/README.md`.

## Privacy And Storage

Labelab is built as a local-first static web app:

- Catalog data is stored in browser `localStorage`.
- Settings, presets, saved sheets, and label types are stored in browser `localStorage`.
- Exported JSON files can be kept as backups or moved between browsers.
- The app does not require a database.
- The app does not require a server-side account system.
- Camera scanning only runs when the user starts the scanner and grants camera permission.

Because browser storage is local to the current browser profile, export JSON backups regularly if the catalog matters.

## Running Locally

Labelab is a static site. Use a local web server so the browser can load JSON and SVG assets through normal `fetch()` requests.

```powershell
# Starts a simple static server in the project folder.
python -m http.server 8000
```

Then open:

```text
# Local Labelab URL served by the command above.
http://localhost:8000/
```

You can also deploy the repository to any static hosting provider that serves `index.html`, `app.js`, `styles.css`, `i18n/`, `images/`, and `assets/` like Github.

## Website Updates

The GitHub Pages workflow in `.github/workflows/pages.yml` deploys the static site from `main`.

On each deploy it:

- Copies the site into a clean `_site/` folder.
- Generates `version.json` from the latest Git commits.
- Adds the current commit hash to `styles.css` and `app.js` URLs in the deployed `index.html`.

The app fetches `version.json` with `cache: "no-store"` during startup. When the deployed commit differs from the version already acknowledged in that browser, Labelab shows a small "What's new" dialog with the latest commit messages and a reload button. Reloading keeps the same page URL and origin so browser-stored catalog data remains available, while the deployed `index.html` already points to commit-stamped CSS and JavaScript files.

For GitHub Pages, set the site source to **GitHub Actions** so this workflow controls deployment.

## Data Files

- `codes.json` contains catalog data used by the app as a bundled/default catalog source.
- `codes.json.bak`, `codes_2.json`, and `codes_copy.json` are catalog backup or migration-related files.
- `i18n/*.json` contains translated UI strings.
- `images/signs.json` defines sign folders and metadata sources.
- `images/iso_signs/signs_metadata.json` describes searchable sign assets.
- `assets/qr/` contains QR images used by the donation modal.

## Import And Export

Use the Backup controls in the app to:

- Export the current catalog to `codes.json`.
- Import a compatible JSON catalog.
- Preserve catalog items, categories, presets, saved sheets, favorite grids, and saved label types before clearing browser storage, changing browser profiles, or deploying updates.

The share/save controls can also package the currently selected label as a standalone `.label.json` file or a shareable link.

## Browser Support Notes

The core editor works in modern desktop browsers. Some features depend on browser APIs:

- Camera scanning requires `BarcodeDetector` and `navigator.mediaDevices.getUserMedia`.
- Clipboard actions require browser clipboard permissions.
- Printing and PDF saving use the browser print dialog.
- Local file import uses standard browser file input support.

## Project Structure

```text
# Main static website files.
index.html
app.js
styles.css

# Catalog and translation data.
codes.json
i18n/

# Sign manifests, metadata, and local sign images.
images/

# Static assets used by the app UI.
assets/
```

## License

Labelab is licensed under the GNU Affero General Public License, version 3 or later. See `LICENSE.txt` for the full license text.
