// labelab.net - A platform for creating simple labels.
// Copyright (C) 2026 StellarStoic stelarstoic@tuta.io

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

const STORAGE_KEY = "labelLab.codes.v1";
const SETTINGS_KEY = "labelLab.settings.v1";
const PRESETS_KEY = "labelLab.presets.v1";
const CATALOG_BACKUP_KEY = "labelLab.codes.backup.v1";
const DEFAULT_LOCALE = "en";
const SIGN_MANIFEST_URL = "images/signs.json";
const SIGN_METADATA_URL = "images/iso_signs/signs_metadata.json";
const UNICODE_SEARCH_URL = "https://home.unicode.org/";
const SIGN_PICKER_BATCH_SIZE = 150;
const SIGN_PICKER_SCROLL_THRESHOLD = 80;

const PAPER_SIZES = {
  A0: { width: 841, height: 1189 },
  A1: { width: 594, height: 841 },
  A2: { width: 420, height: 594 },
  A3: { width: 297, height: 420 },
  A4: { width: 210, height: 297 },
  A5: { width: 148, height: 210 },
  A6: { width: 105, height: 148 },
  A7: { width: 74, height: 105 },
  A8: { width: 52, height: 74 },
  A9: { width: 37, height: 52 },
  A10: { width: 26, height: 37 },
  B0: { width: 1000, height: 1414 },
  B1: { width: 707, height: 1000 },
  B2: { width: 500, height: 707 },
  B3: { width: 353, height: 500 },
  B4: { width: 250, height: 353 },
  B5: { width: 176, height: 250 },
  B6: { width: 125, height: 176 },
  B7: { width: 88, height: 125 },
  B8: { width: 62, height: 88 },
  B9: { width: 44, height: 62 },
  B10: { width: 31, height: 44 },
  C0: { width: 917, height: 1297 },
  C1: { width: 648, height: 917 },
  C2: { width: 458, height: 648 },
  C3: { width: 324, height: 458 },
  C4: { width: 229, height: 324 },
  C5: { width: 162, height: 229 },
  C6: { width: 114, height: 162 },
  C7: { width: 81, height: 114 },
  C8: { width: 57, height: 81 },
  C9: { width: 40, height: 57 },
  C10: { width: 28, height: 40 },
  Letter: { width: 215.9, height: 279.4 },
  Legal: { width: 215.9, height: 355.6 },
  Tabloid: { width: 279.4, height: 431.8 },
  Ledger: { width: 431.8, height: 279.4 },
  Executive: { width: 184.2, height: 266.7 },
  Statement: { width: 139.7, height: 215.9 },
  Folio: { width: 215.9, height: 330.2 },
  Quarto: { width: 215, height: 275 },
  "10x15Photo": { width: 100, height: 150 },
  "13x18Photo": { width: 130, height: 180 },
  "4x6Photo": { width: 101.6, height: 152.4 },
  "5x7Photo": { width: 127, height: 177.8 },
};

const EAN_LEFT_ODD = {
  0: "0001101",
  1: "0011001",
  2: "0010011",
  3: "0111101",
  4: "0100011",
  5: "0110001",
  6: "0101111",
  7: "0111011",
  8: "0110111",
  9: "0001011",
};

const EAN_LEFT_EVEN = {
  0: "0100111",
  1: "0110011",
  2: "0011011",
  3: "0100001",
  4: "0011101",
  5: "0111001",
  6: "0000101",
  7: "0010001",
  8: "0001001",
  9: "0010111",
};

const EAN_RIGHT = {
  0: "1110010",
  1: "1100110",
  2: "1101100",
  3: "1000010",
  4: "1011100",
  5: "1001110",
  6: "1010000",
  7: "1000100",
  8: "1001000",
  9: "1110100",
};

const EAN_PARITY = {
  0: "OOOOOO",
  1: "OOEOEE",
  2: "OOEEOE",
  3: "OOEEEO",
  4: "OEOOEE",
  5: "OEEOOE",
  6: "OEEEOO",
  7: "OEOEOE",
  8: "OEOEEO",
  9: "OEEOEO",
};

const CODE39_PATTERNS = {
  0: "nnnwwnwnn",
  1: "wnnwnnnnw",
  2: "nnwwnnnnw",
  3: "wnwwnnnnn",
  4: "nnnwwnnnw",
  5: "wnnwwnnnn",
  6: "nnwwwnnnn",
  7: "nnnwnnwnw",
  8: "wnnwnnwnn",
  9: "nnwwnnwnn",
  A: "wnnnnwnnw",
  B: "nnwnnwnnw",
  C: "wnwnnwnnn",
  D: "nnnnwwnnw",
  E: "wnnnwwnnn",
  F: "nnwnwwnnn",
  G: "nnnnnwwnw",
  H: "wnnnnwwnn",
  I: "nnwnnwwnn",
  J: "nnnnwwwnn",
  K: "wnnnnnnww",
  L: "nnwnnnnww",
  M: "wnwnnnnwn",
  N: "nnnnwnnww",
  O: "wnnnwnnwn",
  P: "nnwnwnnwn",
  Q: "nnnnnnwww",
  R: "wnnnnnwwn",
  S: "nnwnnnwwn",
  T: "nnnnwnwwn",
  U: "wwnnnnnnw",
  V: "nwwnnnnnw",
  W: "wwwnnnnnn",
  X: "nwnnwnnnw",
  Y: "wwnnwnnnn",
  Z: "nwwnwnnnn",
  "-": "nwnnnnwnw",
  ".": "wwnnnnwnn",
  " ": "nwwnnnwnn",
  "$": "nwnwnwnnn",
  "/": "nwnwnnnwn",
  "+": "nwnnnwnwn",
  "%": "nnnwnwnwn",
  "*": "nwnnwnwnn",
};

const CODE128_PATTERNS = [
  "212222",
  "222122",
  "222221",
  "121223",
  "121322",
  "131222",
  "122213",
  "122312",
  "132212",
  "221213",
  "221312",
  "231212",
  "112232",
  "122132",
  "122231",
  "113222",
  "123122",
  "123221",
  "223211",
  "221132",
  "221231",
  "213212",
  "223112",
  "312131",
  "311222",
  "321122",
  "321221",
  "312212",
  "322112",
  "322211",
  "212123",
  "212321",
  "232121",
  "111323",
  "131123",
  "131321",
  "112313",
  "132113",
  "132311",
  "211313",
  "231113",
  "231311",
  "112133",
  "112331",
  "132131",
  "113123",
  "113321",
  "133121",
  "313121",
  "211331",
  "231131",
  "213113",
  "213311",
  "213131",
  "311123",
  "311321",
  "331121",
  "312113",
  "312311",
  "332111",
  "314111",
  "221411",
  "431111",
  "111224",
  "111422",
  "121124",
  "121421",
  "141122",
  "141221",
  "112214",
  "112412",
  "122114",
  "122411",
  "142112",
  "142211",
  "241211",
  "221114",
  "413111",
  "241112",
  "134111",
  "111242",
  "121142",
  "121241",
  "114212",
  "124112",
  "124211",
  "411212",
  "421112",
  "421211",
  "212141",
  "214121",
  "412121",
  "111143",
  "111341",
  "131141",
  "114113",
  "114311",
  "411113",
  "411311",
  "113141",
  "114131",
  "311141",
  "411131",
  "211412",
  "211214",
  "211232",
  "2331112",
];

const QR_SIZE = 21;
const QR_DATA_CODEWORDS = 19;
const QR_ECC_CODEWORDS = 7;
const MM_TO_PX = 96 / 25.4;
const MM_PER_INCH = 25.4;
const MIN_ZOOM = 0.2;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.1;
const DEFAULT_CATEGORY_COLOR = "#e5e7eb";
const COLOR_PRESETS = [
  "#0f766e",
  "#ef4444",
  "#f97316",
  "#facc15",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#111827",
  "#6b7280",
  "#ffffff",
];

const state = {
  catalog: { lastUpdate: "", totalItems: 0, totalCategories: 0, totalPresets: 0, categories: [], presets: [], items: [] },
  selectedItem: null,
  selectedCategory: null,
  previewZoom: 1,
  hasSavedPreviewZoom: false,
  measurementUnit: "metric",
  locale: DEFAULT_LOCALE,
  messages: {},
  presets: [],
  collapsedGroups: {},
  collapsedCatalogCategories: {},
  paperPan: null,
  pendingImport: null,
  scannerStream: null,
  scannerFrameId: null,
  scannerDetector: null,
  imageSigns: [],
  labelPartOrder: ["top", "main", "bottom"],
};

const signPickerState = new WeakMap();

const el = {
  catalogMeta: document.querySelector("#catalogMeta"),
  searchInput: document.querySelector("#searchInput"),
  codeSelect: document.querySelector("#codeSelect"),
  selectedCode: document.querySelector("#selectedCode"),
  selectedTitle: document.querySelector("#selectedTitle"),
  selectedCodeValue: document.querySelector("#selectedCodeValue"),
  presetSelect: document.querySelector("#presetSelect"),
  applyPresetButton: document.querySelector("#applyPresetButton"),
  savePresetButton: document.querySelector("#savePresetButton"),
  updatePresetButton: document.querySelector("#updatePresetButton"),
  deletePresetButton: document.querySelector("#deletePresetButton"),
  newTitle: document.querySelector("#newTitle"),
  newLabelMode: document.querySelector("#newLabelMode"),
  newCode: document.querySelector("#newCode"),
  newTextAbove: document.querySelector("#newTextAbove"),
  newTextBelow: document.querySelector("#newTextBelow"),
  newsignalWord: document.querySelector("#newsignalWord"),
  newCustomSignInput: document.querySelector("#newCustomSignInput"),
  newCustomSignPreview: document.querySelector("#newCustomSignPreview"),
  newUnicodeHelpButton: document.querySelector("#newUnicodeHelpButton"),
  newSignSearch: document.querySelector("#newSignSearch"),
  newsignGrid: document.querySelector("#newsignGrid"),
  newPresetSelect: document.querySelector("#newPresetSelect"),
  newCategorySelect: document.querySelector("#newCategorySelect"),
  addNewCategoryButton: document.querySelector("#addNewCategoryButton"),
  newCategoryFields: document.querySelector("#newCategoryFields"),
  newCategory: document.querySelector("#newCategory"),
  newCategoryColor: document.querySelector("#newCategoryColor"),
  newColor: document.querySelector("#newColor"),
  addCodeButton: document.querySelector("#addCodeButton"),
  scanCodeButton: document.querySelector("#scanCodeButton"),
  editCodeButton: document.querySelector("#editCodeButton"),
  deleteCodeButton: document.querySelector("#deleteCodeButton"),
  codeType: document.querySelector("#codeType"),
  labelFont: document.querySelector("#labelFont"),
  titleSize: document.querySelector("#titleSize"),
  codeTextSize: document.querySelector("#codeTextSize"),
  textAboveSize: document.querySelector("#textAboveSize"),
  textBelowSize: document.querySelector("#textBelowSize"),
  codePaddingLeft: document.querySelector("#codePaddingLeft"),
  codePaddingRight: document.querySelector("#codePaddingRight"),
  codePaddingTop: document.querySelector("#codePaddingTop"),
  codePaddingBottom: document.querySelector("#codePaddingBottom"),
  barcodeMaxHeight: document.querySelector("#barcodeMaxHeight"),
  qrMaxSize: document.querySelector("#qrMaxSize"),
  signMaxSize: document.querySelector("#signMaxSize"),
  signPaddingLeft: document.querySelector("#signPaddingLeft"),
  signPaddingRight: document.querySelector("#signPaddingRight"),
  signPaddingTop: document.querySelector("#signPaddingTop"),
  signPaddingBottom: document.querySelector("#signPaddingBottom"),
  includeTitle: document.querySelector("#includeTitle"),
  includeCodeNumber: document.querySelector("#includeCodeNumber"),
  includeTextAbove: document.querySelector("#includeTextAbove"),
  includeTextBelow: document.querySelector("#includeTextBelow"),
  titleBold: document.querySelector("#titleBold"),
  titleItalic: document.querySelector("#titleItalic"),
  codeBold: document.querySelector("#codeBold"),
  codeItalic: document.querySelector("#codeItalic"),
  textMiddleBold: document.querySelector("#textMiddleBold"),
  textMiddleItalic: document.querySelector("#textMiddleItalic"),
  textAboveBold: document.querySelector("#textAboveBold"),
  textAboveItalic: document.querySelector("#textAboveItalic"),
  textBelowBold: document.querySelector("#textBelowBold"),
  textBelowItalic: document.querySelector("#textBelowItalic"),
  paperSize: document.querySelector("#paperSize"),
  paperOrientation: document.querySelector("#paperOrientation"),
  paperWidth: document.querySelector("#paperWidth"),
  paperHeight: document.querySelector("#paperHeight"),
  gridPreset: document.querySelector("#gridPreset"),
  columnsInput: document.querySelector("#columnsInput"),
  rowsInput: document.querySelector("#rowsInput"),
  marginLeft: document.querySelector("#marginLeft"),
  marginRight: document.querySelector("#marginRight"),
  marginTop: document.querySelector("#marginTop"),
  marginBottom: document.querySelector("#marginBottom"),
  gapX: document.querySelector("#gapX"),
  gapY: document.querySelector("#gapY"),
  exportButton: document.querySelector("#exportButton"),
  importInput: document.querySelector("#importInput"),
  printButton: document.querySelector("#printButton"),
  shareButton: document.querySelector("#shareButton"),
  donateButton: document.querySelector("#donateButton"),
  itemEditModal: document.querySelector("#itemEditModal"),
  itemEditCloseButton: document.querySelector("#itemEditCloseButton"),
  itemEditForm: document.querySelector("#itemEditForm"),
  itemEditCancelButton: document.querySelector("#itemEditCancelButton"),
  editTitleInput: document.querySelector("#editTitleInput"),
  editLabelModeInput: document.querySelector("#editLabelModeInput"),
  editCodeInput: document.querySelector("#editCodeInput"),
  editTextAboveInput: document.querySelector("#editTextAboveInput"),
  editTextBelowInput: document.querySelector("#editTextBelowInput"),
  editsignalWordInput: document.querySelector("#editsignalWordInput"),
  editCustomSignInput: document.querySelector("#editCustomSignInput"),
  editCustomSignPreview: document.querySelector("#editCustomSignPreview"),
  editUnicodeHelpButton: document.querySelector("#editUnicodeHelpButton"),
  editSignSearch: document.querySelector("#editSignSearch"),
  editsignGrid: document.querySelector("#editsignGrid"),
  editCodeTypeInput: document.querySelector("#editCodeTypeInput"),
  editPresetSelect: document.querySelector("#editPresetSelect"),
  editCategorySelect: document.querySelector("#editCategorySelect"),
  editNewCategoryButton: document.querySelector("#editNewCategoryButton"),
  editCategoryFields: document.querySelector("#editCategoryFields"),
  editCategoryInput: document.querySelector("#editCategoryInput"),
  editCategoryColorInput: document.querySelector("#editCategoryColorInput"),
  editColorInput: document.querySelector("#editColorInput"),
  editColorPresets: document.querySelector("#editColorPresets"),
  editModalError: document.querySelector("#editModalError"),
  categoryEditModal: document.querySelector("#categoryEditModal"),
  categoryEditCloseButton: document.querySelector("#categoryEditCloseButton"),
  categoryEditForm: document.querySelector("#categoryEditForm"),
  categoryEditCancelButton: document.querySelector("#categoryEditCancelButton"),
  categoryNameInput: document.querySelector("#categoryNameInput"),
  categoryColorInput: document.querySelector("#categoryColorInput"),
  categoryItemList: document.querySelector("#categoryItemList"),
  categoryModalError: document.querySelector("#categoryModalError"),
  importReviewModal: document.querySelector("#importReviewModal"),
  importReviewCloseButton: document.querySelector("#importReviewCloseButton"),
  importOlderWarning: document.querySelector("#importOlderWarning"),
  importSummary: document.querySelector("#importSummary"),
  importReplaceButton: document.querySelector("#importReplaceButton"),
  importMergeButton: document.querySelector("#importMergeButton"),
  importCancelButton: document.querySelector("#importCancelButton"),
  scannerModal: document.querySelector("#scannerModal"),
  scannerCloseButton: document.querySelector("#scannerCloseButton"),
  scannerVideo: document.querySelector("#scannerVideo"),
  scannerStatus: document.querySelector("#scannerStatus"),
  shareModal: document.querySelector("#shareModal"),
  shareCloseButton: document.querySelector("#shareCloseButton"),
  copyShareLinkButton: document.querySelector("#copyShareLinkButton"),
  saveLabelFileButton: document.querySelector("#saveLabelFileButton"),
  savePdfButton: document.querySelector("#savePdfButton"),
  categoryOptions: document.querySelector("#categoryOptions"),
  donationModal: document.querySelector("#donationModal"),
  donationCloseButton: document.querySelector("#donationCloseButton"),
  donationNote: document.querySelector("#donationNote"),
  qrViewer: document.querySelector("#qrViewer"),
  qrViewerCloseButton: document.querySelector("#qrViewerCloseButton"),
  qrViewerTitle: document.querySelector("#qrViewerTitle"),
  qrViewerImage: document.querySelector("#qrViewerImage"),
  measurementUnit: document.querySelector("#measurementUnit"),
  languageSelect: document.querySelector("#languageSelect"),
  themeSelect: document.querySelector("#themeSelect"),
  experimentalLabelBackground: document.querySelector("#experimentalLabelBackground"),
  experimentalBarcodeColor: document.querySelector("#experimentalBarcodeColor"),
  experimentalTitleColor: document.querySelector("#experimentalTitleColor"),
  experimentalCodeNumberColor: document.querySelector("#experimentalCodeNumberColor"),
  experimentalPrintCount: document.querySelector("#experimentalPrintCount"),
  labelSortList: document.querySelector("#labelSortList"),
  layoutMeta: document.querySelector("#layoutMeta"),
  zoomMeta: document.querySelector("#zoomMeta"),
  zoomOutButton: document.querySelector("#zoomOutButton"),
  zoomFitButton: document.querySelector("#zoomFitButton"),
  zoomInButton: document.querySelector("#zoomInButton"),
  paperWrap: document.querySelector("#paperWrap"),
  paperStage: document.querySelector("#paperStage"),
  paper: document.querySelector("#paper"),
  copyToast: document.querySelector("#copyToast"),
};

function t(key, values = {}) {
  // Translate a stable i18n key and interpolate simple {placeholders}.
  const template = state.messages[key] || key;
  return Object.entries(values).reduce((text, [name, value]) => text.replaceAll(`{${name}}`, String(value)), template);
}

function escapeHtml(value) {
  // Escape dynamic text before placing it inside small translated HTML snippets.
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderLayoutMeta({ count, title, width, height, unit }) {
  // Render layout metadata while allowing the selected title to use the button accent color.
  const template = state.messages["status.layoutMeta"] || "{count} stickers for {title} | {width} x {height} {unit} each";
  el.layoutMeta.innerHTML = template
    .replaceAll("{count}", escapeHtml(count))
    .replaceAll("{title}", `<span class="layout-meta-title">${escapeHtml(title)}</span>`)
    .replaceAll("{width}", escapeHtml(width))
    .replaceAll("{height}", escapeHtml(height))
    .replaceAll("{unit}", escapeHtml(unit));
}

function encodeSharePayload(payload) {
  // Encode JSON safely for a URL hash without requiring a server.
  const json = JSON.stringify(payload);
  const bytes = new TextEncoder().encode(json);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
}

function decodeSharePayload(value) {
  // Decode a base64url JSON payload from a shared label link.
  const padded = value.replaceAll("-", "+").replaceAll("_", "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}

function normalizeCodeType(value) {
  // Normalize stored code type names so old or display-style values map to app option ids.
  const normalized = String(value || "ean13").toLowerCase().replace(/[^a-z0-9]/g, "");
  const aliases = {
    ean13: "ean13",
    ean8: "ean8",
    upca: "upca",
    upc: "upca",
    code39: "code39",
    code128: "code128",
    qr: "qr",
    qrcode: "qr",
  };
  return aliases[normalized] || "ean13";
}

function normalizeCodeForType(value, codeType) {
  // Keep numeric retail codes digit-only while allowing text-capable symbols to store text.
  const rawValue = String(value || "").trim();
  if (["ean13", "ean8", "upca"].includes(normalizeCodeType(codeType))) {
    return rawValue.replace(/\D/g, "");
  }
  return rawValue;
}

function mapScannerFormatToCodeType(format) {
  // Convert native BarcodeDetector format names into this app's code type ids.
  const formats = {
    ean_13: "ean13",
    ean_8: "ean8",
    upc_a: "upca",
    code_39: "code39",
    code_128: "code128",
    qr_code: "qr",
  };
  return formats[format] || "";
}

function createItemId(title, code, index = Date.now()) {
  // Create a stable local item id so text-only items can be selected without a code value.
  const source = `${title || "item"}-${code || "text"}-${index}`;
  return `item-${source.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

function getItemKey(item) {
  // Prefer explicit ids, with code fallback for older in-memory items.
  return item?.id || item?.code || "";
}

function getImportItemKey(item) {
  // Match imported products by code first, then by stable id or title for text-only labels.
  const code = String(item?.code || "").trim();
  if (code) {
    return `code:${code}`;
  }
  const id = String(item?.id || "").trim();
  if (id) {
    return `id:${id}`;
  }
  return `title:${String(item?.title || "").trim().toLowerCase()}`;
}

function normalizeColor(value, fallback = "#0f766e") {
  // Keep catalog marker colors as simple hex values.
  const color = String(value || "").trim();
  return /^#[0-9a-f]{6}$/i.test(color) ? color : fallback;
}

function setColorInputValue(input, value, fallback) {
  // Apply only valid hex colors to native color inputs.
  input.value = normalizeColor(value, fallback);
}

function normalizeCategoryName(value) {
  // Store category names as trimmed plain text while allowing empty uncategorized items.
  return String(value || "").trim();
}

function categoriesMatch(first, second) {
  // Compare category names case-insensitively so duplicates are not created by capitalization changes.
  return normalizeCategoryName(first).toLocaleLowerCase() === normalizeCategoryName(second).toLocaleLowerCase();
}

function getCatalogCategoryKey(name) {
  // Use a stable key for remembering catalog category collapsed state.
  return normalizeCategoryName(name).toLocaleLowerCase();
}

function normalizeCategoryColor(value) {
  // Keep category background colors as simple hex values.
  return normalizeColor(value, DEFAULT_CATEGORY_COLOR);
}

function normalizeLabelMode(value, item = {}) {
  // Decide whether the item renders as a code, text-only label, or sign label.
  const mode = String(value || "").trim().toLowerCase();
  const hasSigns =
    (Array.isArray(item.signs) && item.signs.length) ||
    (Array.isArray(item.pictograms) && item.pictograms.length) ||
    parsecustomSigns(item.customSigns || item.customPictograms || "").length;
  if (mode === "pictogram") {
    return "sign";
  }
  if (mode === "code" && !String(item.code || "").trim() && hasSigns) {
    return "sign";
  }
  if (["code", "text", "sign"].includes(mode)) {
    return mode;
  }
  if (hasSigns) {
    return "sign";
  }
  return item.code ? "code" : "text";
}

function getAllsigns() {
  // Return local signs loaded from the configured manifest and metadata files.
  return state.imageSigns;
}

function getsign(id) {
  // Look up one sign definition by its stable id.
  return getAllsigns().find((sign) => sign.id === id);
}

function normalizesigns(value) {
  // Keep only known sign ids so imported data cannot create broken controls.
  const ids = Array.isArray(value) ? value : String(value || "").split(",");
  return [...new Set(ids.map((id) => String(id).trim()).filter((id) => getsign(id)))];
}

function normalizeLabelPartOrder(value) {
  // Keep only the three known movable label regions in a stable order.
  const parts = Array.isArray(value) ? value : String(value || "").split(",");
  const cleanParts = parts.filter((part) => ["top", "main", "bottom"].includes(part));
  return [...new Set([...cleanParts, "top", "main", "bottom"])];
}

function decodeUnicodeToken(token) {
  // Convert common user-entered Unicode formats into the visible symbol.
  const trimmed = String(token || "").trim();
  if (!trimmed) {
    return "";
  }

  const numericEntity = trimmed.match(/^&#(x?[0-9a-f]+);?$/i);
  const codePoint = trimmed.match(/^(?:(?:U\+|0x|\\u\{?)([0-9a-f]{2,6})\}?|([0-9a-f]{4,6}))$/i);
  if (numericEntity) {
    const rawValue = numericEntity[1];
    const radix = rawValue.toLowerCase().startsWith("x") ? 16 : 10;
    const number = Number.parseInt(radix === 16 ? rawValue.slice(1) : rawValue, radix);
    return Number.isFinite(number) ? String.fromCodePoint(number) : "";
  }
  if (codePoint) {
    const number = Number.parseInt(codePoint[1] || codePoint[2], 16);
    try {
      return Number.isFinite(number) ? String.fromCodePoint(number) : "";
    } catch {
      return "";
    }
  }
  return trimmed;
}

function parsecustomSigns(value) {
  // Accept multiple emoji/symbols or code values separated by commas, semicolons, pipes, spaces, or new lines.
  if (Array.isArray(value)) {
    return value.flatMap((item) => parsecustomSigns(item));
  }

  return String(value || "")
    .split(/[\s,;|]+/)
    .map(decodeUnicodeToken)
    .map((symbol) => symbol.trim())
    .filter(Boolean);
}

function isCodeValidForType(code, codeType) {
  // Validate against the selected symbol so saved items match their declared code type.
  switch (normalizeCodeType(codeType)) {
    case "ean13":
      return Boolean(normalizeEanForBarcode(code));
    case "ean8":
      return Boolean(normalizeEan8ForBarcode(code));
    case "upca":
      return Boolean(normalizeUpcAForBarcode(code));
    case "code39":
      return Boolean(encodeCode39(code));
    case "code128":
      return Boolean(encodeCode128(code));
    case "qr":
      return Boolean(createQrDataCodewords(String(code || "")));
    default:
      return Boolean(code);
  }
}

async function loadMessages(locale) {
  // Load one flat JSON file per locale so translation tools can map keys directly.
  try {
    const response = await fetch(`i18n/${locale}.json`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Missing locale ${locale}`);
    }
    state.messages = await response.json();
    state.locale = locale;
  } catch (error) {
    if (locale !== DEFAULT_LOCALE) {
      await loadMessages(DEFAULT_LOCALE);
      return;
    }
    state.messages = {};
    state.locale = DEFAULT_LOCALE;
    console.error(error);
  }
}

function applyTranslations() {
  // Apply translated strings from data attributes without changing form values.
  document.documentElement.lang = state.locale;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.setAttribute("placeholder", t(node.dataset.i18nPlaceholder));
  });
  document.querySelectorAll("[data-i18n-title]").forEach((node) => {
    node.setAttribute("title", t(node.dataset.i18nTitle));
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
    node.setAttribute("aria-label", t(node.dataset.i18nAriaLabel));
  });
  document.title = t("app.title");
  updateUnitLabels();
  syncThemeSelect();
  updateCatalogMeta();
  renderSelectedItem();
  renderPresetOptions();
  updateCategoryOptions();
  rendersignPicker(el.newsignGrid, getSelectedsigns(el.newsignGrid));
  if (el.itemEditModal.classList.contains("is-open")) {
    rendersignPicker(el.editsignGrid, getSelectedsigns(el.editsignGrid));
  }
  updateCollapseLabels();
}

function getControlGroupKey(group, index) {
  // Use a stable key from the first heading translation key, with index as fallback.
  const heading = group.querySelector(".control-group-header h2, h2");
  return heading?.dataset.i18n || heading?.querySelector("[data-i18n]")?.dataset.i18n || `group.${index}`;
}

function updateCollapseButton(button, collapsed) {
  // Keep the +/- icon and accessibility label aligned with collapsed state.
  button.textContent = collapsed ? "+" : "-";
  button.setAttribute("aria-expanded", String(!collapsed));
  button.setAttribute("aria-label", collapsed ? t("aria.expandGroup") : t("aria.collapseGroup"));
}

function updateCollapseLabels() {
  // Refresh translated aria labels on existing collapse buttons.
  document.querySelectorAll(".collapse-toggle").forEach((button) => {
    updateCollapseButton(button, button.closest(".control-group")?.classList.contains("is-collapsed"));
  });
}

function setupCollapsibleGroups() {
  // Add a +/- toggle to every control group and persist collapsed states.
  document.querySelectorAll(".control-group").forEach((group, index) => {
    if (group.dataset.collapseReady === "true") {
      return;
    }

    const heading = group.querySelector(":scope > h2");
    if (!heading) {
      return;
    }

    const key = getControlGroupKey(group, index);
    const header = document.createElement("div");
    const body = document.createElement("div");
    const toggle = document.createElement("button");
    header.className = "control-group-header";
    body.className = "control-group-body";
    toggle.className = "collapse-toggle";
    toggle.type = "button";

    heading.replaceWith(header);
    header.append(heading, toggle);

    while (header.nextSibling) {
      body.append(header.nextSibling);
    }

    group.append(body);
    group.dataset.collapseReady = "true";
    group.dataset.groupKey = key;

    const collapsed = Boolean(state.collapsedGroups[key]);
    group.classList.toggle("is-collapsed", collapsed);
    updateCollapseButton(toggle, collapsed);

    toggle.addEventListener("click", () => {
      const nextCollapsed = !group.classList.contains("is-collapsed");
      group.classList.toggle("is-collapsed", nextCollapsed);
      state.collapsedGroups[key] = nextCollapsed;
      updateCollapseButton(toggle, nextCollapsed);
      saveSettings();
    });
  });
}

function normalizeCatalog(rawCatalog) {
  // Normalize imported data so the app always works with the same object shape.
  const rawCategories = Array.isArray(rawCatalog?.categories) ? rawCatalog.categories : [];
  const presets = Array.isArray(rawCatalog?.presets) ? rawCatalog.presets.map(normalizePreset).filter(Boolean) : [];
  const categoriesByName = new Map();
  rawCategories.forEach((category) => {
    const name = normalizeCategoryName(category.name || category.title || category.category);
    const key = name.toLocaleLowerCase();
    if (!name) {
      return;
    }
    categoriesByName.set(key, {
      name,
      color: normalizeCategoryColor(category.color),
    });
  });

  const items = Array.isArray(rawCatalog?.items) ? rawCatalog.items : [];
  const cleanedItems = items
    .map((item, index) => {
      const codeType = normalizeCodeType(item.codeType || "ean13");
      const title = String(item.title || "").trim();
      const code = normalizeCodeForType(item.code ?? item.eanCode ?? "", codeType);
      const category = normalizeCategoryName(item.category || item.categoryName || "");
      const categoryKey = category.toLocaleLowerCase();
      if (category && !categoriesByName.has(categoryKey)) {
        categoriesByName.set(categoryKey, {
          name: category,
          color: normalizeCategoryColor(item.categoryColor),
        });
      }
      return {
        id: String(item.id || createItemId(title, code, index)),
        title,
        code,
        codeType,
        labelMode: normalizeLabelMode(item.labelMode, { ...item, code }),
        signs: normalizesigns(item.signs || item.pictograms || []),
        customSigns: parsecustomSigns(item.customSigns || item.customPictograms || item.unicodesigns || item.unicodePictograms || ""),
        signalWord: String(item.signalWord || "").trim(),
        color: normalizeColor(item.color),
        category,
        presetId: String(item.presetId || "").trim(),
        textAbove: String(item.textAbove || item.upperText || "").trim(),
        textBelow: String(item.textBelow || item.lowerText || "").trim(),
      };
    })
    .filter((item) => item.title);

  const categories = [...categoriesByName.values()].sort((a, b) => a.name.localeCompare(b.name));

  return {
    lastUpdate: rawCatalog?.lastUpdate || new Date().toISOString(),
    totalItems: cleanedItems.length,
    totalCategories: categories.length,
    totalPresets: presets.length,
    categories,
    presets,
    items: cleanedItems,
  };
}

function saveCatalog(options = {}) {
  // Persist the editable catalog in browser storage because static pages cannot write files.
  if (options.touch !== false) {
    state.catalog.lastUpdate = new Date().toISOString();
  }
  state.catalog.totalItems = state.catalog.items.length;
  state.catalog.categories.sort((a, b) => a.name.localeCompare(b.name));
  state.catalog.totalCategories = state.catalog.categories.length;
  state.catalog.presets = Array.isArray(state.catalog.presets) ? state.catalog.presets.map(normalizePreset).filter(Boolean) : [];
  state.catalog.presets.sort((a, b) => a.name.localeCompare(b.name));
  state.catalog.totalPresets = state.catalog.presets.length;
  state.presets = state.catalog.presets;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.catalog));
  updateCatalogMeta();
}

function saveCatalogBackup(reason) {
  // Keep one automatic rollback copy before replacing or merging imported catalog data.
  localStorage.setItem(
    CATALOG_BACKUP_KEY,
    JSON.stringify({
      createdAt: new Date().toISOString(),
      reason,
      catalog: state.catalog,
    }),
  );
}

async function loadCatalog() {
  // Prefer saved browser data, then fall back to the bundled codes.json file.
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    state.catalog = normalizeCatalog(JSON.parse(saved));
    saveCatalog({ touch: false });
    return;
  }

  const response = await fetch("codes.json", { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Could not load codes.json");
  }

  state.catalog = normalizeCatalog(await response.json());
  saveCatalog({ touch: false });
}

function syncPresetsFromCatalog() {
  // Keep the legacy in-memory preset reference pointed at the catalog-backed presets.
  state.catalog.presets = Array.isArray(state.catalog.presets) ? state.catalog.presets.map(normalizePreset).filter(Boolean) : [];
  state.presets = state.catalog.presets;
}

function normalizePreset(rawPreset) {
  // Keep saved presets small and discard entries without a usable name or settings object.
  const name = String(rawPreset?.name || "").trim();
  if (!name || !rawPreset?.settings || typeof rawPreset.settings !== "object") {
    return null;
  }

  return {
    id: String(rawPreset.id || createPresetId(name)),
    name,
    settings: rawPreset.settings,
    updatedAt: rawPreset.updatedAt || new Date().toISOString(),
  };
}

function createPresetId(name) {
  // Create a local preset id from the name plus time so duplicate display names do not collide.
  const slug = String(name || "preset")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `preset-${slug || "label"}-${Date.now()}`;
}

function loadPresets() {
  // Migrate old localStorage-only presets into the catalog-backed preset list.
  const rawPresets = JSON.parse(localStorage.getItem(PRESETS_KEY) || "[]");
  const legacyPresets = Array.isArray(rawPresets) ? rawPresets.map(normalizePreset).filter(Boolean) : [];
  const presetsById = new Map((state.catalog.presets || []).map((preset) => [preset.id, preset]));
  legacyPresets.forEach((preset) => {
    if (!presetsById.has(preset.id)) {
      presetsById.set(preset.id, preset);
    }
  });
  state.catalog.presets = [...presetsById.values()];
  syncPresetsFromCatalog();
  if (legacyPresets.length) {
    saveCatalog();
    localStorage.removeItem(PRESETS_KEY);
  }
}

function savePresets() {
  // Persist named label-setting presets inside the catalog so export/import carries them.
  state.catalog.presets = state.presets;
  saveCatalog();
}

function renderPresetOptions() {
  // Refresh preset dropdowns while preserving each current selection.
  const currentValue = el.presetSelect.value;
  const currentNewPreset = el.newPresetSelect.value;
  const currentEditPreset = el.editPresetSelect.value;
  el.presetSelect.innerHTML = "";
  el.newPresetSelect.innerHTML = "";
  el.editPresetSelect.innerHTML = "";

  const emptyOption = document.createElement("option");
  emptyOption.value = "";
  emptyOption.textContent = t("option.noPreset");
  el.presetSelect.append(emptyOption);
  [el.newPresetSelect, el.editPresetSelect].forEach((select) => {
    const itemEmptyOption = document.createElement("option");
    itemEmptyOption.value = "";
    itemEmptyOption.textContent = t("option.noItemPreset");
    select.append(itemEmptyOption);
  });

  state.presets
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((preset) => {
      const option = document.createElement("option");
      option.value = preset.id;
      option.textContent = preset.name;
      el.presetSelect.append(option);
      [el.newPresetSelect, el.editPresetSelect].forEach((select) => {
        const itemOption = document.createElement("option");
        itemOption.value = preset.id;
        itemOption.textContent = preset.name;
        select.append(itemOption);
      });
    });

  el.presetSelect.value = state.presets.some((preset) => preset.id === currentValue) ? currentValue : "";
  el.newPresetSelect.value = state.presets.some((preset) => preset.id === currentNewPreset) ? currentNewPreset : "";
  el.editPresetSelect.value = state.presets.some((preset) => preset.id === currentEditPreset) ? currentEditPreset : "";
}

function getSelectedPreset() {
  // Return the currently selected preset object, if any.
  return state.presets.find((preset) => preset.id === el.presetSelect.value) || null;
}

function getPresetById(presetId) {
  // Look up a catalog-backed preset by item reference.
  return state.presets.find((preset) => preset.id === presetId) || null;
}

function applyItemPreset(item) {
  // Apply the preset assigned to an item without changing catalog data.
  const preset = getPresetById(item?.presetId);
  if (preset) {
    applySettingsSnapshot(preset.settings);
    el.presetSelect.value = preset.id;
    return true;
  }
  el.presetSelect.value = "";
  return false;
}

function saveCurrentAsPreset() {
  // Save the visible label setup under a user-provided preset name.
  const name = window.prompt(t("prompt.presetName"), "")?.trim();
  if (!name) {
    return;
  }

  const preset = {
    id: createPresetId(name),
    name,
    settings: collectSettingsSnapshot(),
    updatedAt: new Date().toISOString(),
  };
  state.presets.push(preset);
  savePresets();
  renderPresetOptions();
  el.presetSelect.value = preset.id;
}

function applySelectedPreset() {
  // Apply the chosen preset to the current controls and assign it to the active item when present.
  const preset = getSelectedPreset();
  if (!preset) {
    alert(t("alert.selectPreset"));
    return;
  }

  if (state.selectedItem) {
    state.selectedItem.presetId = preset.id;
    saveCatalog();
  }
  applySettingsSnapshot(preset.settings);
  el.presetSelect.value = preset.id;
  renderLabels();
  saveSettings();
}

function updateSelectedPreset() {
  // Replace the chosen preset with the current control values.
  const preset = getSelectedPreset();
  if (!preset) {
    alert(t("alert.selectPreset"));
    return;
  }

  if (!window.confirm(t("confirm.updatePreset", { name: preset.name }))) {
    return;
  }

  preset.settings = collectSettingsSnapshot();
  preset.updatedAt = new Date().toISOString();
  savePresets();
  renderPresetOptions();
  el.presetSelect.value = preset.id;
}

function deleteSelectedPreset() {
  // Remove the chosen preset from browser storage.
  const preset = getSelectedPreset();
  if (!preset) {
    alert(t("alert.selectPreset"));
    return;
  }

  if (!window.confirm(t("confirm.deletePreset", { name: preset.name }))) {
    return;
  }

  state.presets = state.presets.filter((savedPreset) => savedPreset.id !== preset.id);
  state.catalog.items.forEach((item) => {
    if (item.presetId === preset.id) {
      item.presetId = "";
    }
  });
  savePresets();
  renderPresetOptions();
}

function saveSettings() {
  // Save layout and theme choices so printing stays consistent between sessions.
  localStorage.setItem(
    SETTINGS_KEY,
    JSON.stringify({
      measurementUnit: state.measurementUnit,
      locale: state.locale,
      paperSize: el.paperSize.value,
      paperOrientation: el.paperOrientation.value,
      paperWidth: readMeasurement(el.paperWidth, 210),
      paperHeight: readMeasurement(el.paperHeight, 297),
      gridPreset: el.gridPreset.value,
      columns: el.columnsInput.value,
      rows: el.rowsInput.value,
      marginLeft: readMeasurement(el.marginLeft, 0),
      marginRight: readMeasurement(el.marginRight, 0),
      marginTop: readMeasurement(el.marginTop, 0),
      marginBottom: readMeasurement(el.marginBottom, 0),
      gapX: readMeasurement(el.gapX, 0),
      gapY: readMeasurement(el.gapY, 0),
      codeType: el.codeType.value,
      labelFont: el.labelFont.value,
      titleSize: readMeasurement(el.titleSize, 2.4),
      codeTextSize: readMeasurement(el.codeTextSize, 2.1),
      textAboveSize: readMeasurement(el.textAboveSize, 2.1),
      textBelowSize: readMeasurement(el.textBelowSize, 2.1),
      codePaddingLeft: readMeasurement(el.codePaddingLeft, 1),
      codePaddingRight: readMeasurement(el.codePaddingRight, 1),
      codePaddingTop: readMeasurement(el.codePaddingTop, 0),
      codePaddingBottom: readMeasurement(el.codePaddingBottom, 0),
      barcodeMaxHeight: readMeasurement(el.barcodeMaxHeight, 12),
      qrMaxSize: readMeasurement(el.qrMaxSize, 16),
      signMaxSize: readMeasurement(el.signMaxSize, 24),
      signPaddingLeft: readMeasurement(el.signPaddingLeft, 0),
      signPaddingRight: readMeasurement(el.signPaddingRight, 0),
      signPaddingTop: readMeasurement(el.signPaddingTop, 0),
      signPaddingBottom: readMeasurement(el.signPaddingBottom, 0),
      includeTitle: el.includeTitle.checked,
      includeCodeNumber: el.includeCodeNumber.checked,
      includeTextAbove: el.includeTextAbove.checked,
      includeTextBelow: el.includeTextBelow.checked,
      titleBold: el.titleBold.checked,
      titleItalic: el.titleItalic.checked,
      codeBold: el.codeBold.checked,
      codeItalic: el.codeItalic.checked,
      textMiddleBold: el.textMiddleBold.checked,
      textMiddleItalic: el.textMiddleItalic.checked,
      textAboveBold: el.textAboveBold.checked,
      textAboveItalic: el.textAboveItalic.checked,
      textBelowBold: el.textBelowBold.checked,
      textBelowItalic: el.textBelowItalic.checked,
      previewZoom: state.previewZoom,
      theme: document.body.classList.contains("dark") ? "dark" : "light",
      experimentalLabelBackground: el.experimentalLabelBackground.value,
      experimentalBarcodeColor: el.experimentalBarcodeColor.value,
      experimentalTitleColor: el.experimentalTitleColor.value,
      experimentalCodeNumberColor: el.experimentalCodeNumberColor.value,
      experimentalPrintCount: Math.max(0, Number.parseInt(el.experimentalPrintCount.value, 10) || 0),
      labelPartOrder: state.labelPartOrder,
      collapsedGroups: state.collapsedGroups,
      collapsedCatalogCategories: state.collapsedCatalogCategories,
    }),
  );
}

function loadSettings() {
  // Apply saved settings or start with practical defaults.
  const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
  state.hasSavedPreviewZoom = saved.previewZoom !== undefined;
  state.collapsedGroups = saved.collapsedGroups || {};
  state.collapsedCatalogCategories = saved.collapsedCatalogCategories || {};
  state.labelPartOrder = normalizeLabelPartOrder(saved.labelPartOrder);
  state.measurementUnit = saved.measurementUnit || "metric";
  state.locale = saved.locale || DEFAULT_LOCALE;
  el.measurementUnit.value = state.measurementUnit;
  el.languageSelect.value = state.locale;
  updateUnitLabels();
  el.paperSize.value = saved.paperSize || "A4";
  el.paperOrientation.value = saved.paperOrientation || "portrait";
  applyPaperPreset(saved.paperWidth, saved.paperHeight);
  el.gridPreset.value = saved.gridPreset || "5x15";
  applyGridPreset(saved.columns, saved.rows);

  ["marginLeft", "marginRight", "marginTop", "marginBottom", "gapX", "gapY"].forEach((key) => {
    if (saved[key] !== undefined) {
      setMeasurementValue(el[key], saved[key]);
    }
  });

  applySavedTypography(saved);
  setColorInputValue(el.experimentalLabelBackground, saved.experimentalLabelBackground ?? saved.experimentalListBackground, "#ffffff");
  setColorInputValue(el.experimentalBarcodeColor, saved.experimentalBarcodeColor ?? saved.experimentalCodeColor, "#111111");
  setColorInputValue(el.experimentalTitleColor, saved.experimentalTitleColor ?? saved.experimentalFontColor, "#111827");
  setColorInputValue(el.experimentalCodeNumberColor, saved.experimentalCodeNumberColor ?? saved.experimentalFontColor, "#111827");
  el.experimentalPrintCount.value = Math.max(0, Number.parseInt(saved.experimentalPrintCount, 10) || 0);
  applyExperimentalStyles();
  state.previewZoom = clampZoom(Number.parseFloat(saved.previewZoom) || 1);
  const theme = saved.theme || (saved.dark ? "dark" : "light");
  applyTheme(theme);
}

function applySavedTypography(saved) {
  // Restore text styling controls from localStorage.
  if (saved.codeType !== undefined) {
    el.codeType.value = saved.codeType;
  }
  if (saved.labelFont !== undefined) {
    el.labelFont.value = saved.labelFont;
  }
  if (saved.titleSize !== undefined) {
    setMeasurementValue(el.titleSize, saved.titleSize);
  }
  if (saved.codeTextSize !== undefined || saved.eanTextSize !== undefined) {
    setMeasurementValue(el.codeTextSize, saved.codeTextSize ?? saved.eanTextSize);
  }
  if (saved.textAboveSize !== undefined) {
    setMeasurementValue(el.textAboveSize, saved.textAboveSize);
  }
  if (saved.textBelowSize !== undefined) {
    setMeasurementValue(el.textBelowSize, saved.textBelowSize);
  }
  if (saved.codePaddingLeft !== undefined) {
    setMeasurementValue(el.codePaddingLeft, saved.codePaddingLeft);
  }
  if (saved.codePaddingRight !== undefined) {
    setMeasurementValue(el.codePaddingRight, saved.codePaddingRight);
  }
  if (saved.codePaddingTop !== undefined) {
    setMeasurementValue(el.codePaddingTop, saved.codePaddingTop);
  }
  if (saved.codePaddingBottom !== undefined) {
    setMeasurementValue(el.codePaddingBottom, saved.codePaddingBottom);
  }
  if (saved.barcodeMaxHeight !== undefined) {
    setMeasurementValue(el.barcodeMaxHeight, saved.barcodeMaxHeight);
  }
  if (saved.qrMaxSize !== undefined) {
    setMeasurementValue(el.qrMaxSize, saved.qrMaxSize);
  }
  if (saved.signMaxSize !== undefined) {
    setMeasurementValue(el.signMaxSize, saved.signMaxSize);
  }
  if (saved.signPaddingLeft !== undefined) {
    setMeasurementValue(el.signPaddingLeft, saved.signPaddingLeft);
  }
  if (saved.signPaddingRight !== undefined) {
    setMeasurementValue(el.signPaddingRight, saved.signPaddingRight);
  }
  if (saved.signPaddingTop !== undefined) {
    setMeasurementValue(el.signPaddingTop, saved.signPaddingTop);
  }
  if (saved.signPaddingBottom !== undefined) {
    setMeasurementValue(el.signPaddingBottom, saved.signPaddingBottom);
  }
  if (saved.includeTitle !== undefined) {
    el.includeTitle.checked = Boolean(saved.includeTitle);
  }
  if (saved.includeCodeNumber !== undefined) {
    el.includeCodeNumber.checked = Boolean(saved.includeCodeNumber);
  }
  if (saved.includeTextAbove !== undefined) {
    el.includeTextAbove.checked = Boolean(saved.includeTextAbove);
  }
  if (saved.includeTextBelow !== undefined) {
    el.includeTextBelow.checked = Boolean(saved.includeTextBelow);
  }
  if (saved.titleBold !== undefined) {
    el.titleBold.checked = Boolean(saved.titleBold);
  }
  if (saved.titleItalic !== undefined) {
    el.titleItalic.checked = Boolean(saved.titleItalic);
  }
  if (saved.codeBold !== undefined || saved.eanBold !== undefined) {
    el.codeBold.checked = Boolean(saved.codeBold ?? saved.eanBold);
  }
  if (saved.codeItalic !== undefined || saved.eanItalic !== undefined) {
    el.codeItalic.checked = Boolean(saved.codeItalic ?? saved.eanItalic);
  }
  if (saved.textMiddleBold !== undefined) {
    el.textMiddleBold.checked = Boolean(saved.textMiddleBold);
  }
  if (saved.textMiddleItalic !== undefined) {
    el.textMiddleItalic.checked = Boolean(saved.textMiddleItalic);
  }
  if (saved.textAboveBold !== undefined) {
    el.textAboveBold.checked = Boolean(saved.textAboveBold);
  }
  if (saved.textAboveItalic !== undefined) {
    el.textAboveItalic.checked = Boolean(saved.textAboveItalic);
  }
  if (saved.textBelowBold !== undefined) {
    el.textBelowBold.checked = Boolean(saved.textBelowBold);
  }
  if (saved.textBelowItalic !== undefined) {
    el.textBelowItalic.checked = Boolean(saved.textBelowItalic);
  }
}

function applySettingsSnapshot(snapshot) {
  // Apply shared label settings without replacing the receiver's whole saved setup.
  if (!snapshot) {
    return;
  }

  const previousUnit = state.measurementUnit;
  state.measurementUnit = snapshot.measurementUnit || state.measurementUnit;
  el.measurementUnit.value = state.measurementUnit;
  updateUnitLabels();
  el.paperSize.value = snapshot.paperSize || el.paperSize.value;
  el.paperOrientation.value = snapshot.paperOrientation || el.paperOrientation.value;
  setMeasurementValue(el.paperWidth, snapshot.paperWidth ?? readMeasurement(el.paperWidth, 210));
  setMeasurementValue(el.paperHeight, snapshot.paperHeight ?? readMeasurement(el.paperHeight, 297));
  el.gridPreset.value = snapshot.gridPreset || el.gridPreset.value;
  el.columnsInput.value = snapshot.columns || el.columnsInput.value;
  el.rowsInput.value = snapshot.rows || el.rowsInput.value;
  ["marginLeft", "marginRight", "marginTop", "marginBottom", "gapX", "gapY"].forEach((key) => {
    if (snapshot[key] !== undefined) {
      setMeasurementValue(el[key], snapshot[key]);
    }
  });
  applySavedTypography(snapshot);
  if (snapshot.experimentalLabelBackground !== undefined) {
    setColorInputValue(el.experimentalLabelBackground, snapshot.experimentalLabelBackground, "#ffffff");
  }
  if (snapshot.experimentalBarcodeColor !== undefined) {
    setColorInputValue(el.experimentalBarcodeColor, snapshot.experimentalBarcodeColor, "#111111");
  }
  if (snapshot.experimentalTitleColor !== undefined) {
    setColorInputValue(el.experimentalTitleColor, snapshot.experimentalTitleColor, "#111827");
  }
  if (snapshot.experimentalCodeNumberColor !== undefined) {
    setColorInputValue(el.experimentalCodeNumberColor, snapshot.experimentalCodeNumberColor, "#111827");
  }
  if (snapshot.experimentalPrintCount !== undefined) {
    el.experimentalPrintCount.value = Math.max(0, Number.parseInt(snapshot.experimentalPrintCount, 10) || 0);
  }
  if (snapshot.labelPartOrder !== undefined) {
    state.labelPartOrder = normalizeLabelPartOrder(snapshot.labelPartOrder);
  }
  applyExperimentalStyles();
  applyTheme(snapshot.theme || (document.body.classList.contains("dark") ? "dark" : "light"));
  state.measurementUnit = el.measurementUnit.value || previousUnit;
}

function collectSettingsSnapshot() {
  // Capture the current label setup in millimeters so it can be restored in any unit mode.
  return {
    measurementUnit: state.measurementUnit,
    locale: state.locale,
    theme: document.body.classList.contains("dark") ? "dark" : "light",
    paperSize: el.paperSize.value,
    paperOrientation: el.paperOrientation.value,
    paperWidth: readMeasurement(el.paperWidth, 210),
    paperHeight: readMeasurement(el.paperHeight, 297),
    gridPreset: el.gridPreset.value,
    columns: el.columnsInput.value,
    rows: el.rowsInput.value,
    marginLeft: readMeasurement(el.marginLeft, 0),
    marginRight: readMeasurement(el.marginRight, 0),
    marginTop: readMeasurement(el.marginTop, 0),
    marginBottom: readMeasurement(el.marginBottom, 0),
    gapX: readMeasurement(el.gapX, 0),
    gapY: readMeasurement(el.gapY, 0),
    codeType: el.codeType.value,
    labelFont: el.labelFont.value,
    titleSize: readMeasurement(el.titleSize, 2.4),
    codeTextSize: readMeasurement(el.codeTextSize, 2.1),
    textAboveSize: readMeasurement(el.textAboveSize, 2.1),
    textBelowSize: readMeasurement(el.textBelowSize, 2.1),
    codePaddingLeft: readMeasurement(el.codePaddingLeft, 1),
    codePaddingRight: readMeasurement(el.codePaddingRight, 1),
    codePaddingTop: readMeasurement(el.codePaddingTop, 0),
    codePaddingBottom: readMeasurement(el.codePaddingBottom, 0),
    barcodeMaxHeight: readMeasurement(el.barcodeMaxHeight, 12),
    qrMaxSize: readMeasurement(el.qrMaxSize, 16),
    signMaxSize: readMeasurement(el.signMaxSize, 24),
    signPaddingLeft: readMeasurement(el.signPaddingLeft, 0),
    signPaddingRight: readMeasurement(el.signPaddingRight, 0),
    signPaddingTop: readMeasurement(el.signPaddingTop, 0),
    signPaddingBottom: readMeasurement(el.signPaddingBottom, 0),
    includeTitle: el.includeTitle.checked,
    includeCodeNumber: el.includeCodeNumber.checked,
    includeTextAbove: el.includeTextAbove.checked,
    includeTextBelow: el.includeTextBelow.checked,
    titleBold: el.titleBold.checked,
    titleItalic: el.titleItalic.checked,
    codeBold: el.codeBold.checked,
    codeItalic: el.codeItalic.checked,
    textMiddleBold: el.textMiddleBold.checked,
    textMiddleItalic: el.textMiddleItalic.checked,
    textAboveBold: el.textAboveBold.checked,
    textAboveItalic: el.textAboveItalic.checked,
    textBelowBold: el.textBelowBold.checked,
    textBelowItalic: el.textBelowItalic.checked,
    experimentalLabelBackground: el.experimentalLabelBackground.value,
    experimentalBarcodeColor: el.experimentalBarcodeColor.value,
    experimentalTitleColor: el.experimentalTitleColor.value,
    experimentalCodeNumberColor: el.experimentalCodeNumberColor.value,
    experimentalPrintCount: Math.max(0, Number.parseInt(el.experimentalPrintCount.value, 10) || 0),
    labelPartOrder: state.labelPartOrder,
  };
}

function getOrientedPaperSize(preset) {
  // Return paper dimensions in the selected orientation.
  if (!preset) {
    return null;
  }

  if (el.paperOrientation.value === "landscape") {
    return {
      width: Math.max(preset.width, preset.height),
      height: Math.min(preset.width, preset.height),
    };
  }

  return {
    width: Math.min(preset.width, preset.height),
    height: Math.max(preset.width, preset.height),
  };
}

function applyPaperPreset(savedWidth, savedHeight) {
  // Fill custom paper dimensions from the selected standard size and orientation.
  const preset = PAPER_SIZES[el.paperSize.value];
  const orientedSize = getOrientedPaperSize(preset);
  setMeasurementValue(el.paperWidth, savedWidth || orientedSize?.width || 210);
  setMeasurementValue(el.paperHeight, savedHeight || orientedSize?.height || 297);
}

function applyOrientationChange() {
  // Rotate standard presets directly and swap custom dimensions for convenience.
  if (el.paperSize.value !== "Custom") {
    applyPaperPreset();
    return;
  }

  const currentWidth = el.paperWidth.value;
  el.paperWidth.value = el.paperHeight.value;
  el.paperHeight.value = currentWidth;
}

function applyGridPreset(savedColumns, savedRows) {
  // Split presets like 5x15 into editable column and row controls.
  const preset = el.gridPreset.value;
  if (preset !== "Custom") {
    const [columns, rows] = preset.split("x").map(Number);
    el.columnsInput.value = columns;
    el.rowsInput.value = rows;
    return;
  }

  el.columnsInput.value = savedColumns || 5;
  el.rowsInput.value = savedRows || 15;
}

function fromMillimeters(mmValue) {
  // Convert internal millimeter values to the currently selected display unit.
  return state.measurementUnit === "imperial" ? mmValue / MM_PER_INCH : mmValue;
}

function toMillimeters(displayValue) {
  // Convert a visible input value back into millimeters for layout and printing.
  return state.measurementUnit === "imperial" ? displayValue * MM_PER_INCH : displayValue;
}

function formatMeasurement(mmValue) {
  // Format a millimeter value for the active unit without adding noisy decimals.
  const value = fromMillimeters(mmValue);
  return Number(value.toFixed(state.measurementUnit === "imperial" ? 3 : 1));
}

function setMeasurementValue(input, mmValue) {
  // Put an internal millimeter value into a visible measurement input.
  input.value = formatMeasurement(Number.parseFloat(mmValue) || 0);
}

function readMeasurement(input, fallbackMm) {
  // Read a visible measurement input and return the internal millimeter value.
  const value = Number.parseFloat(input.value);
  return Number.isFinite(value) ? toMillimeters(value) : fallbackMm;
}

function updateUnitLabels() {
  // Refresh all inline unit labels when switching metric or imperial mode.
  const unitLabel = state.measurementUnit === "imperial" ? "in" : "mm";
  document.querySelectorAll("[data-unit-label]").forEach((node) => {
    node.textContent = unitLabel;
  });
}

function syncThemeSelect() {
  // Keep the theme dropdown synchronized with the active body class.
  el.themeSelect.value = document.body.classList.contains("dark") ? "dark" : "light";
}

function applyTheme(theme) {
  // Apply the selected theme from the settings dropdown.
  document.body.classList.toggle("dark", theme === "dark");
  syncThemeSelect();
}

function convertMeasurementInputs(nextUnit) {
  // Convert currently visible physical controls when the unit switch changes.
  const previousUnit = state.measurementUnit;
  const measurementInputs = [
    el.paperWidth,
    el.paperHeight,
    el.marginLeft,
    el.marginRight,
    el.marginTop,
    el.marginBottom,
    el.gapX,
    el.gapY,
    el.titleSize,
    el.codeTextSize,
    el.textAboveSize,
    el.textBelowSize,
    el.codePaddingLeft,
    el.codePaddingRight,
    el.codePaddingTop,
    el.codePaddingBottom,
    el.barcodeMaxHeight,
    el.qrMaxSize,
    el.signMaxSize,
    el.signPaddingLeft,
    el.signPaddingRight,
    el.signPaddingTop,
    el.signPaddingBottom,
    el.signPaddingLeft,
    el.signPaddingRight,
    el.signPaddingTop,
    el.signPaddingBottom,
  ];

  measurementInputs.forEach((input) => {
    const value = Number.parseFloat(input.value);
    if (!Number.isFinite(value)) {
      return;
    }

    const mmValue = previousUnit === "imperial" ? value * MM_PER_INCH : value;
    state.measurementUnit = nextUnit;
    setMeasurementValue(input, mmValue);
    state.measurementUnit = previousUnit;
  });

  state.measurementUnit = nextUnit;
  updateUnitLabels();
}

function clampZoom(value) {
  // Keep preview zoom within a useful range for mouse wheel and buttons.
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value));
}

function getLayout() {
  // Collect the current label-sheet geometry from the form.
  return {
    width: readMeasurement(el.paperWidth, 210),
    height: readMeasurement(el.paperHeight, 297),
    columns: Math.max(1, Number.parseInt(el.columnsInput.value, 10) || 1),
    rows: Math.max(1, Number.parseInt(el.rowsInput.value, 10) || 1),
    marginLeft: readMeasurement(el.marginLeft, 0),
    marginRight: readMeasurement(el.marginRight, 0),
    marginTop: readMeasurement(el.marginTop, 0),
    marginBottom: readMeasurement(el.marginBottom, 0),
    gapX: readMeasurement(el.gapX, 0),
    gapY: readMeasurement(el.gapY, 0),
  };
}

function applyTypography() {
  // Push text style controls into CSS variables used by every rendered label.
  el.paper.style.setProperty("--label-font", el.labelFont.value);
  el.paper.style.setProperty("--title-size", `${readMeasurement(el.titleSize, 2.4)}mm`);
  el.paper.style.setProperty("--code-text-size", `${readMeasurement(el.codeTextSize, 2.1)}mm`);
  el.paper.style.setProperty("--text-above-size", `${readMeasurement(el.textAboveSize, 2.1)}mm`);
  el.paper.style.setProperty("--text-below-size", `${readMeasurement(el.textBelowSize, 2.1)}mm`);
  el.paper.style.setProperty("--title-weight", el.titleBold.checked ? "700" : "400");
  el.paper.style.setProperty("--title-style", el.titleItalic.checked ? "italic" : "normal");
  el.paper.style.setProperty("--code-text-weight", el.codeBold.checked ? "700" : "400");
  el.paper.style.setProperty("--code-text-style", el.codeItalic.checked ? "italic" : "normal");
  el.paper.style.setProperty("--text-middle-weight", el.textMiddleBold.checked ? "700" : "400");
  el.paper.style.setProperty("--text-middle-style", el.textMiddleItalic.checked ? "italic" : "normal");
  el.paper.style.setProperty("--text-above-weight", el.textAboveBold.checked ? "700" : "400");
  el.paper.style.setProperty("--text-above-style", el.textAboveItalic.checked ? "italic" : "normal");
  el.paper.style.setProperty("--text-below-weight", el.textBelowBold.checked ? "700" : "400");
  el.paper.style.setProperty("--text-below-style", el.textBelowItalic.checked ? "italic" : "normal");
  el.paper.style.setProperty("--code-padding-left", `${readMeasurement(el.codePaddingLeft, 1)}mm`);
  el.paper.style.setProperty("--code-padding-right", `${readMeasurement(el.codePaddingRight, 1)}mm`);
  el.paper.style.setProperty("--code-padding-top", `${readMeasurement(el.codePaddingTop, 0)}mm`);
  el.paper.style.setProperty("--code-padding-bottom", `${readMeasurement(el.codePaddingBottom, 0)}mm`);
  el.paper.style.setProperty("--barcode-max-height", `${readMeasurement(el.barcodeMaxHeight, 12)}mm`);
  el.paper.style.setProperty("--qr-max-size", `${readMeasurement(el.qrMaxSize, 16)}mm`);
  el.paper.style.setProperty("--sign-max-size", `${readMeasurement(el.signMaxSize, 24)}mm`);
  el.paper.style.setProperty("--sign-padding-left", `${readMeasurement(el.signPaddingLeft, 0)}mm`);
  el.paper.style.setProperty("--sign-padding-right", `${readMeasurement(el.signPaddingRight, 0)}mm`);
  el.paper.style.setProperty("--sign-padding-top", `${readMeasurement(el.signPaddingTop, 0)}mm`);
  el.paper.style.setProperty("--sign-padding-bottom", `${readMeasurement(el.signPaddingBottom, 0)}mm`);
}

function applyExperimentalStyles() {
  // Push experimental color controls into CSS variables without changing catalog data.
  el.paperStage.style.setProperty("--experimental-label-bg", normalizeColor(el.experimentalLabelBackground.value, "#ffffff"));
  el.paperStage.style.setProperty("--experimental-barcode-color", normalizeColor(el.experimentalBarcodeColor.value, "#111111"));
  el.paperStage.style.setProperty("--experimental-title-color", normalizeColor(el.experimentalTitleColor.value, "#111827"));
  el.paperStage.style.setProperty("--experimental-code-number-color", normalizeColor(el.experimentalCodeNumberColor.value, "#111827"));
}

function shouldWarnTextOnlyStyleControl() {
  // Warn when text-only controls are used while the active work is a code/barcode label.
  const pendingCode = normalizeCodeForType(el.newCode.value, el.codeType.value);
  return Boolean(state.selectedItem?.code || pendingCode);
}

function shouldWarnCodeStyleControl() {
  // Warn when Code No. controls are used while the active work is a text-only label.
  return Boolean(state.selectedItem && !state.selectedItem.code);
}

function warnTextOnlyStyleControl() {
  // Explain that upper/lower text styling is ignored for code-based labels.
  if (shouldWarnTextOnlyStyleControl()) {
    alert(t("alert.textOnlyControls"));
  }
}

function warnCodeStyleControl() {
  // Explain that Code No. styling is ignored for text-only labels.
  if (shouldWarnCodeStyleControl()) {
    alert(t("alert.codeControls"));
  }
}

function warnTitleStyleControl() {
  // Explain that title styling is ignored for text-only labels.
  if (shouldWarnCodeStyleControl()) {
    alert(t("alert.titleControls"));
  }
}

function applyPreviewZoom() {
  // Scale only the on-screen sheet; print output keeps the real millimeter size.
  const layout = getLayout();
  el.paper.style.setProperty("--preview-zoom", String(state.previewZoom));
  el.paper.style.width = `${layout.width}mm`;
  el.paper.style.height = `${layout.height}mm`;
  el.paper.style.margin = "0";
  el.paper.style.marginRight = `${Math.max(0, layout.width * (state.previewZoom - 1))}mm`;
  el.paper.style.marginBottom = `${Math.max(0, layout.height * (state.previewZoom - 1))}mm`;
  el.paperStage.style.setProperty("--stage-width", `${layout.width * state.previewZoom}mm`);
  el.paperStage.style.setProperty("--stage-height", `${layout.height * state.previewZoom}mm`);
  el.zoomMeta.textContent = `${Math.round(state.previewZoom * 100)}%`;
}

function setPreviewZoom(nextZoom) {
  // Update preview zoom from controls or the mouse wheel and persist the value.
  state.previewZoom = clampZoom(nextZoom);
  applyPreviewZoom();
  saveSettings();
}

function fitPreviewToWindow() {
  // Calculate a zoom that fits the selected paper inside the visible preview pane.
  const layout = getLayout();
  const wrapRect = el.paperWrap.getBoundingClientRect();
  const availableWidth = Math.max(1, wrapRect.width - 56);
  const availableHeight = Math.max(1, wrapRect.height - 56);
  const fitZoom = Math.min(availableWidth / (layout.width * MM_TO_PX), availableHeight / (layout.height * MM_TO_PX), 1);
  setPreviewZoom(fitZoom);
}

function startPaperPan(event) {
  // Start drag-panning the preview by remembering the pointer and current scroll position.
  if (event.button !== 0) {
    return;
  }

  state.paperPan = {
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    scrollLeft: el.paperWrap.scrollLeft,
    scrollTop: el.paperWrap.scrollTop,
  };
  el.paperWrap.classList.add("is-panning");
  el.paperWrap.setPointerCapture(event.pointerId);
  event.preventDefault();
}

function movePaperPan(event) {
  // Move the scroll container opposite to pointer movement for click-and-hold panning.
  if (!state.paperPan || state.paperPan.pointerId !== event.pointerId) {
    return;
  }

  const deltaX = event.clientX - state.paperPan.startX;
  const deltaY = event.clientY - state.paperPan.startY;
  el.paperWrap.scrollLeft = state.paperPan.scrollLeft - deltaX;
  el.paperWrap.scrollTop = state.paperPan.scrollTop - deltaY;
}

function stopPaperPan(event) {
  // End drag-panning and release pointer capture cleanly.
  if (!state.paperPan || state.paperPan.pointerId !== event.pointerId) {
    return;
  }

  if (el.paperWrap.hasPointerCapture(event.pointerId)) {
    el.paperWrap.releasePointerCapture(event.pointerId);
  }
  state.paperPan = null;
  el.paperWrap.classList.remove("is-panning");
}

function updateCatalogMeta() {
  // Show compact catalog status in the sidebar.
  const updated = state.catalog.lastUpdate ? new Date(state.catalog.lastUpdate).toLocaleString() : t("status.unknown");
  el.catalogMeta.textContent = t("status.catalogMeta", { count: state.catalog.totalItems, updated });
}

function getCategory(name) {
  // Find a category by its normalized display name.
  const categoryName = normalizeCategoryName(name);
  return state.catalog.categories.find((category) => categoriesMatch(category.name, categoryName)) || null;
}

function ensureCategory(name, color = null) {
  // Create or update a category entry used by catalog grouping.
  const categoryName = normalizeCategoryName(name);
  if (!categoryName) {
    return null;
  }

  const existing = getCategory(categoryName);
  if (existing) {
    if (color !== null && color !== undefined) {
      existing.color = normalizeCategoryColor(color);
    }
    return existing;
  }

  const category = {
    name: categoryName,
    color: normalizeCategoryColor(color),
  };
  state.catalog.categories.push(category);
  state.catalog.categories.sort((a, b) => a.name.localeCompare(b.name));
  return category;
}

function updateCategoryOptions() {
  // Keep category selectors synchronized with the catalog.
  const currentAddValue = el.newCategorySelect.value;
  const currentEditValue = el.editCategorySelect.value;
  [el.newCategorySelect, el.editCategorySelect].forEach((select) => {
    select.innerHTML = "";
    const emptyOption = document.createElement("option");
    emptyOption.value = "";
    emptyOption.textContent = t("option.noCategory");
    select.append(emptyOption);

    state.catalog.categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.name;
      option.textContent = category.name;
      select.append(option);
    });
  });
  el.newCategorySelect.value = [...el.newCategorySelect.options].some((option) => option.value === currentAddValue) ? currentAddValue : "";
  el.editCategorySelect.value = [...el.editCategorySelect.options].some((option) => option.value === currentEditValue) ? currentEditValue : "";

  el.categoryOptions.innerHTML = "";
  state.catalog.categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.name;
    el.categoryOptions.append(option);
  });
}

function groupCatalogMatches(matches, query) {
  // Build category groups from the category list first so empty JSON categories stay visible.
  const groups = new Map();
  const normalizedQuery = query.trim().toLowerCase();

  state.catalog.categories.forEach((category) => {
    const name = normalizeCategoryName(category.name);
    if (!name) {
      return;
    }
    if (normalizedQuery && !name.toLowerCase().includes(normalizedQuery)) {
      return;
    }
    groups.set(name, []);
  });

  matches.forEach((item) => {
    const categoryName = normalizeCategoryName(item.category) || t("status.uncategorized");
    if (!groups.has(categoryName)) {
      groups.set(categoryName, []);
    }
    groups.get(categoryName).push(item);
  });

  if (normalizedQuery) {
    state.catalog.categories.forEach((category) => {
      const name = normalizeCategoryName(category.name);
      if (!name || !name.toLowerCase().includes(normalizedQuery)) {
        return;
      }
      const categoryItems = state.catalog.items
        .filter((item) => categoriesMatch(item.category, name))
        .sort((a, b) => a.title.localeCompare(b.title));
      groups.set(name, categoryItems);
    });
  }

  return [...groups.entries()].sort(([nameA], [nameB]) => nameA.localeCompare(nameB));
}

function renderSearchOptions() {
  // Filter by title/category/code before grouping so saved category memberships stay visible.
  const query = el.searchInput.value.trim().toLowerCase();
  const matches = state.catalog.items
    .filter((item) => `${item.title} ${item.code} ${item.category}`.toLowerCase().includes(query))
    .sort((a, b) => (a.category || "").localeCompare(b.category || "") || a.title.localeCompare(b.title));

  el.codeSelect.innerHTML = "";
  updateCategoryOptions();

  const emptyOption = document.createElement("button");
  emptyOption.type = "button";
  emptyOption.className = `catalog-option${!state.selectedItem && !state.selectedCategory ? " is-selected" : ""}`;
  emptyOption.dataset.code = "";
  emptyOption.setAttribute("role", "option");
  emptyOption.setAttribute("aria-selected", String(!state.selectedItem));
  emptyOption.innerHTML = `<span class="catalog-color"></span><span class="catalog-option-label">&nbsp;</span>`;
  emptyOption.addEventListener("click", () => selectItem(""));
  el.codeSelect.append(emptyOption);

  groupCatalogMatches(matches, query).forEach(([categoryName, items]) => {
    const category = getCategory(categoryName);
    const isSelectedCategory = state.selectedCategory?.name === categoryName;
    const categoryKey = getCatalogCategoryKey(categoryName);
    const isCollapsed = !query && Boolean(state.collapsedCatalogCategories[categoryKey]);
    const header = document.createElement("div");
    const selectButton = document.createElement("button");
    const toggleButton = document.createElement("button");
    header.className = `catalog-category${isSelectedCategory ? " is-selected" : ""}`;
    header.dataset.category = categoryName;
    header.setAttribute("role", "option");
    header.setAttribute("aria-selected", String(isSelectedCategory));
    header.style.setProperty("--category-color", normalizeCategoryColor(category?.color));
    selectButton.type = "button";
    selectButton.className = "catalog-category-select";
    selectButton.textContent = categoryName;
    if (category) {
      selectButton.addEventListener("click", () => selectCategory(categoryName));
    } else {
      selectButton.disabled = true;
    }
    toggleButton.type = "button";
    toggleButton.className = "catalog-category-toggle";
    toggleButton.textContent = isCollapsed ? "+" : "-";
    toggleButton.setAttribute("aria-expanded", String(!isCollapsed));
    toggleButton.setAttribute("aria-label", isCollapsed ? t("aria.expandCategory") : t("aria.collapseCategory"));
    toggleButton.addEventListener("click", () => {
      // Toggle only this catalog group without changing the selected category.
      state.collapsedCatalogCategories[categoryKey] = !isCollapsed;
      saveSettings();
      renderSearchOptions();
    });
    header.append(selectButton, toggleButton);
    el.codeSelect.append(header);

    if (isCollapsed) {
      return;
    }

    items.forEach((item) => {
      const option = document.createElement("button");
      const isSelected = getItemKey(state.selectedItem) === getItemKey(item);
      option.type = "button";
      option.className = `catalog-option${isSelected ? " is-selected" : ""}`;
      option.dataset.code = item.code;
      option.dataset.itemKey = getItemKey(item);
      option.setAttribute("role", "option");
      option.setAttribute("aria-selected", String(isSelected));
      option.style.setProperty("--item-color", normalizeColor(item.color));

      const color = document.createElement("span");
      color.className = "catalog-color";
      const label = document.createElement("span");
      label.className = "catalog-option-label";
      const itemMeta = normalizeLabelMode(item.labelMode, item) === "sign" ? t("option.labelModeSign") : item.code || t("status.textOnly");
      label.textContent = `${item.title} - ${itemMeta}`;
      option.append(color, label);
      option.addEventListener("click", () => selectItem(getItemKey(item)));
      el.codeSelect.append(option);
    });
  });

  if (!state.selectedItem && matches.length) {
    renderSelectedItem();
    renderLabels();
  }
}

function scrollSelectedCatalogOptionIntoView() {
  // Center the selected catalog row after filtering or editing changes rebuild the list.
  if (!state.selectedItem && !state.selectedCategory) {
    return;
  }

  requestAnimationFrame(() => {
    const selectedOption = state.selectedCategory
      ? [...el.codeSelect.querySelectorAll(".catalog-category")].find((option) => option.dataset.category === state.selectedCategory.name)
      : [...el.codeSelect.querySelectorAll(".catalog-option")].find((option) => option.dataset.itemKey === getItemKey(state.selectedItem));
    selectedOption?.scrollIntoView({ block: "center", inline: "nearest" });
  });
}

function renderSelectedItem() {
  // Refresh the selected item display and enable actions only when an item exists.
  if (state.selectedCategory) {
    const color = normalizeCategoryColor(state.selectedCategory.color);
    const count = state.catalog.items.filter((item) => normalizeCategoryName(item.category) === state.selectedCategory.name).length;
    el.selectedTitle.textContent = t("status.selectedCategory", { category: state.selectedCategory.name });
    el.selectedCodeValue.textContent = t("status.categoryMeta", { count, color });
    el.selectedCodeValue.className = "selected-category-meta";
    el.selectedCodeValue.style.backgroundColor = color;
    el.editCodeButton.disabled = false;
    el.deleteCodeButton.disabled = false;
    return;
  }

  el.selectedCodeValue.className = "";
  el.selectedCodeValue.style.backgroundColor = "";
  if (!state.selectedItem) {
    el.selectedTitle.textContent = t("status.noItemSelected");
    el.selectedCodeValue.textContent = "";
    el.editCodeButton.disabled = true;
    el.deleteCodeButton.disabled = true;
    return;
  }

  el.selectedTitle.textContent = state.selectedItem.title;
  const activeCodeType = normalizeCodeType(el.codeType.value || state.selectedItem.codeType);
  el.selectedCodeValue.textContent =
    normalizeLabelMode(state.selectedItem.labelMode, state.selectedItem) === "sign"
      ? t("option.labelModeSign")
      : state.selectedItem.code
        ? `${state.selectedItem.code} (${activeCodeType})`
        : t("status.textOnly");
  el.editCodeButton.disabled = false;
  el.deleteCodeButton.disabled = false;
}

function selectItem(itemKey) {
  // Store the chosen item and redraw every label with the same barcode.
  state.selectedCategory = null;
  state.selectedItem = itemKey ? state.catalog.items.find((item) => getItemKey(item) === itemKey || item.code === itemKey) || null : null;
  if (state.selectedItem) {
    const didApplyPreset = applyItemPreset(state.selectedItem);
    if (!didApplyPreset) {
      el.codeType.value = state.selectedItem.codeType;
    }
  }
  renderSelectedItem();
  renderSearchOptions();
  scrollSelectedCatalogOptionIntoView();
  renderLabels();
}

function selectCategory(name) {
  // Select a category row so edit/delete actions operate on the category instead of an item.
  state.selectedItem = null;
  state.selectedCategory = getCategory(name);
  renderSelectedItem();
  renderSearchOptions();
  scrollSelectedCatalogOptionIntoView();
  renderLabels();
}

function syncEditColorPresets(selectedColor) {
  // Highlight the matching preset swatch when the modal color value changes.
  const normalizedColor = normalizeColor(selectedColor);
  el.editColorPresets.querySelectorAll(".color-preset").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.color.toLowerCase() === normalizedColor.toLowerCase());
  });
}

function populateEditColorPresets() {
  // Build the reusable color preset buttons for the catalog item editor.
  el.editColorPresets.innerHTML = "";
  COLOR_PRESETS.forEach((color) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "color-preset";
    button.dataset.color = color;
    button.style.setProperty("--swatch-color", color);
    button.setAttribute("aria-label", color);
    button.addEventListener("click", () => {
      el.editColorInput.value = color;
      syncEditColorPresets(color);
    });
    el.editColorPresets.append(button);
  });
}

function createsignMark(sign) {
  // Render one built-in or image-based sign mark.
  const mark = document.createElement("span");
  mark.className = `sign-mark sign-${sign.kind || "handling"}`;
  mark.setAttribute("aria-label", sign.labelKey ? t(sign.labelKey) : sign.name || sign.id);
  if (sign.src) {
    const image = document.createElement("img");
    image.className = "sign-img";
    image.src = sign.src;
    image.alt = sign.name || sign.id;
    mark.append(image);
  } else {
    const symbol = document.createElement("span");
    symbol.className = "sign-symbol";
    symbol.textContent = sign.symbol;
    mark.append(symbol);
  }
  return mark;
}

function createCustomSignMark(symbol) {
  // Render one user-entered Unicode or emoji sign mark.
  const mark = document.createElement("span");
  const text = document.createElement("span");
  mark.className = "sign-mark sign-custom";
  mark.setAttribute("aria-label", symbol);
  text.className = "sign-symbol";
  text.textContent = symbol;
  mark.append(text);
  return mark;
}

function renderCustomSignPreview(input, preview) {
  // Show the exact symbols that will be saved from the manual Unicode field.
  preview.innerHTML = "";
  parsecustomSigns(input.value).forEach((symbol) => {
    preview.append(createCustomSignMark(symbol));
  });
}

function getSignSearchInput(container) {
  // Pair each sign picker with its local dictionary search field.
  return container === el.newsignGrid ? el.newSignSearch : el.editSignSearch;
}

function signMatchesQuery(sign, query) {
  // Search across title, filename, description, and keywords from the metadata dictionary.
  const haystack = [sign.name, sign.filename, sign.description, sign.group, sign.keywords].join(" ").toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
}

function getDefaultSignPickerSigns(allSigns, container) {
  // Use the full dictionary for lazy scrolling while pinning GHS pictograms near the new label grid start.
  if (container !== el.newsignGrid) {
    return allSigns;
  }

  const ghsSigns = allSigns.filter((sign) => sign.group === "GHS_Hazard_Pictograms");
  return [...new Map([...ghsSigns, ...allSigns].map((sign) => [sign.id, sign])).values()];
}

function getSignPickerState(container) {
  // Keep lazy-render state per picker without storing DOM-only details in the catalog state.
  if (!signPickerState.has(container)) {
    signPickerState.set(container, {
      isListening: false,
      limit: SIGN_PICKER_BATCH_SIZE,
      query: "",
      total: 0,
    });
  }
  return signPickerState.get(container);
}

function ensureSignPickerScrollListener(container) {
  // Attach one scroll listener that expands the rendered sign batch near the bottom.
  const pickerState = getSignPickerState(container);
  if (pickerState.isListening) {
    return;
  }

  pickerState.isListening = true;
  container.addEventListener("scroll", () => {
    const currentState = getSignPickerState(container);
    const remainingScroll = container.scrollHeight - container.scrollTop - container.clientHeight;
    if (remainingScroll > SIGN_PICKER_SCROLL_THRESHOLD || currentState.limit >= currentState.total) {
      return;
    }

    currentState.limit += SIGN_PICKER_BATCH_SIZE;
    rendersignPicker(container, getSelectedsigns(container), { preserveScroll: true });
  });
}

function rendersignPicker(container, selectedIds = [], options = {}) {
  // Build a searchable checkbox grid from the local sign metadata dictionary.
  ensureSignPickerScrollListener(container);
  const pickerState = getSignPickerState(container);
  const selected = new Set(normalizesigns(selectedIds));
  const query = getSignSearchInput(container)?.value.trim() || "";
  const allSigns = getAllsigns();
  const didQueryChange = pickerState.query !== query;
  if (didQueryChange) {
    pickerState.limit = SIGN_PICKER_BATCH_SIZE;
    pickerState.query = query;
  }

  const matchingSigns = query ? allSigns.filter((sign) => signMatchesQuery(sign, query)) : getDefaultSignPickerSigns(allSigns, container);
  const visibleSigns = matchingSigns.slice(0, pickerState.limit);
  const selectedSigns = [...selected].map(getsign).filter(Boolean);
  const signsToRender = [...new Map([...selectedSigns, ...visibleSigns].map((sign) => [sign.id, sign])).values()];
  const previousScrollTop = container.scrollTop;
  pickerState.total = matchingSigns.length;
  container.innerHTML = "";
  signsToRender.forEach((sign) => {
    const option = document.createElement("label");
    const checkbox = document.createElement("input");
    const name = document.createElement("span");
    const tooltip = document.createElement("span");
    const tooltipText = document.createElement("span");
    option.className = "sign-picker-option";
    checkbox.type = "checkbox";
    checkbox.value = sign.id;
    checkbox.checked = selected.has(sign.id);
    name.className = "sign-picker-name";
    name.textContent = sign.filename || sign.name || sign.id;
    tooltip.className = "sign-picker-tooltip";
    tooltipText.className = "sign-picker-tooltip-text";
    tooltipText.textContent = [sign.name, sign.description, sign.filename, sign.group].filter(Boolean).join("\n");
    tooltip.append(createsignMark(sign), tooltipText);
    option.append(checkbox, createsignMark(sign), name, tooltip);
    container.append(option);
  });
  if (options.preserveScroll) {
    container.scrollTop = previousScrollTop;
  } else if (didQueryChange) {
    container.scrollTop = 0;
  }
}

function getSelectedsigns(container) {
  // Read selected sign ids from a picker grid.
  return [...container.querySelectorAll("input[type='checkbox']:checked")].map((checkbox) => checkbox.value);
}

async function loadImagesigns() {
  // Load local image signs from the folder manifest and Wikimedia Commons metadata dictionary.
  try {
    const response = await fetch(SIGN_MANIFEST_URL, { cache: "no-store" });
    if (!response.ok) {
      return;
    }
    const manifest = await response.json();
    const folderPrefixes = new Set(
      (Array.isArray(manifest?.folders) ? manifest.folders : [])
        .map((folder) => String(folder).replaceAll("\\", "/").replace(/^images\//, "").replace(/\/?$/, "/"))
        .filter(Boolean),
    );
    const manualItems = Array.isArray(manifest?.items) ? manifest.items : [];
    const metadataUrl = String(manifest?.metadata || SIGN_METADATA_URL);
    const metadataResponse = await fetch(metadataUrl, { cache: "no-store" });
    const metadata = metadataResponse.ok ? await metadataResponse.json() : {};
    const metadataItems = Object.entries(metadata).flatMap(([group, items]) =>
      (Array.isArray(items) ? items : []).map((item) => ({
        ...item,
        group,
      })),
    );
    const signs = [
      ...metadataItems.map((item) => {
        const localPath = String(item.local_path || "").replaceAll("\\", "/");
        const src = `images/${localPath}`;
        const extension = src.split(".").pop()?.toLowerCase() || "";
        const isAllowedFolder = [...folderPrefixes].some((folder) => localPath.startsWith(folder));
        if (!localPath || !isAllowedFolder || !["svg", "png", "jpg", "jpeg", "webp", "gif"].includes(extension)) {
          return null;
        }
        return {
          id: `sign:${localPath}`,
          name: String(item.description || item.title || item.filename || localPath).replace(/<[^>]+>/g, ""),
          filename: String(item.filename || ""),
          description: String(item.description || "").replace(/<[^>]+>/g, ""),
          sourceUrl: String(item.source_url || ""),
          src,
          kind: "image",
          group: String(item.group || ""),
        };
      }),
      ...manualItems.map((item) => {
        const src = String(item.src || "").trim();
        const extension = src.split(".").pop()?.toLowerCase() || "";
        if (!src || !["svg", "png", "jpg", "jpeg", "webp", "gif"].includes(extension)) {
          return null;
        }
        return {
          id: `sign:${String(item.id || src).trim()}`,
          name: String(item.name || item.id || src).trim(),
          filename: src.split("/").pop() || "",
          description: String(item.description || item.name || "").trim(),
          sourceUrl: String(item.sourceUrl || item.source_url || "").trim(),
          src,
          kind: "image",
          group: String(item.group || "").trim(),
        };
      }),
    ].filter(Boolean);
    state.imageSigns = [...new Map(signs.map((sign) => [sign.id, sign])).values()];
  } catch (error) {
    console.warn("Could not load sign image manifest.", error);
  }
}

function syncCategoryColorInput(categoryInput, colorInput) {
  // Fill a category color picker when the typed category already exists.
  const category = getCategory(categoryInput.value);
  if (category) {
    colorInput.value = normalizeCategoryColor(category.color);
  }
}

function setNewCategoryFieldsVisible(fields, visible) {
  // Reveal or hide the new-category inputs next to a category dropdown.
  fields.classList.toggle("is-hidden", !visible);
}

function getSelectedCategoryFromControls(select, fields, nameInput, colorInput) {
  // Read either an existing selected category or the revealed new category fields.
  if (!fields.classList.contains("is-hidden")) {
    const category = normalizeCategoryName(nameInput.value);
    return {
      category,
      color: normalizeCategoryColor(colorInput.value),
      isNewField: Boolean(category),
    };
  }

  const category = normalizeCategoryName(select.value);
  return {
    category,
    color: normalizeCategoryColor(getCategory(category)?.color),
    isNewField: false,
  };
}

function openItemEditModal() {
  // Fill the standalone editor with the selected catalog item and show it.
  if (!state.selectedItem) {
    return;
  }

  const color = normalizeColor(state.selectedItem.color);
  el.editModalError.textContent = "";
  el.editTitleInput.value = state.selectedItem.title;
  el.editLabelModeInput.value = normalizeLabelMode(state.selectedItem.labelMode, state.selectedItem);
  el.editCodeInput.value = state.selectedItem.code;
  el.editTextAboveInput.value = state.selectedItem.textAbove || "";
  el.editTextBelowInput.value = state.selectedItem.textBelow || "";
  el.editsignalWordInput.value = state.selectedItem.signalWord || "";
  el.editCustomSignInput.value = (state.selectedItem.customSigns || []).join(", ");
  renderCustomSignPreview(el.editCustomSignInput, el.editCustomSignPreview);
  rendersignPicker(el.editsignGrid, state.selectedItem.signs);
  el.editCodeTypeInput.value = normalizeCodeType(state.selectedItem.codeType);
  renderPresetOptions();
  el.editPresetSelect.value = state.presets.some((preset) => preset.id === state.selectedItem.presetId) ? state.selectedItem.presetId : "";
  setNewCategoryFieldsVisible(el.editCategoryFields, false);
  el.editCategorySelect.value = getCategory(state.selectedItem.category)?.name || "";
  el.editCategoryInput.value = "";
  el.editCategoryColorInput.value = DEFAULT_CATEGORY_COLOR;
  el.editColorInput.value = color;
  syncEditColorPresets(color);
  el.itemEditModal.classList.add("is-open");
  el.itemEditModal.setAttribute("aria-hidden", "false");
  el.editTitleInput.focus();
  el.editTitleInput.select();
}

function closeItemEditModal() {
  // Hide the item editor and return focus to the edit action.
  el.itemEditModal.classList.remove("is-open");
  el.itemEditModal.setAttribute("aria-hidden", "true");
  el.editModalError.textContent = "";
  el.editCodeButton.focus();
}

function renderCategoryItemChecklist(categoryName) {
  // Show every catalog item with membership checkboxes for the selected category.
  el.categoryItemList.innerHTML = "";
  state.catalog.items
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title))
    .forEach((item) => {
      const row = document.createElement("label");
      const text = document.createElement("span");
      const title = document.createElement("span");
      const meta = document.createElement("span");
      const code = document.createElement("span");
      const tag = document.createElement("span");
      const checkbox = document.createElement("input");
      const itemCategory = normalizeCategoryName(item.category);
      const category = getCategory(itemCategory);
      row.className = "category-item-row";
      text.className = "category-item-text";
      title.textContent = item.title;
      meta.className = "category-item-meta";
      code.className = "category-item-code";
      code.textContent = normalizeLabelMode(item.labelMode, item) === "sign" ? t("option.labelModeSign") : item.code || t("status.textOnly");
      tag.className = "category-item-tag";
      tag.textContent = itemCategory || t("status.uncategorized");
      tag.style.setProperty("--tag-color", normalizeCategoryColor(category?.color));
      checkbox.type = "checkbox";
      checkbox.dataset.itemKey = getItemKey(item);
      checkbox.checked = itemCategory === categoryName;
      meta.append(code, tag);
      text.append(title, meta);
      row.append(text, checkbox);
      el.categoryItemList.append(row);
    });
}

function openCategoryEditModal() {
  // Fill the category editor with name, color, and item membership checkboxes.
  if (!state.selectedCategory) {
    return;
  }

  el.categoryModalError.textContent = "";
  el.categoryNameInput.value = state.selectedCategory.name;
  el.categoryColorInput.value = normalizeCategoryColor(state.selectedCategory.color);
  renderCategoryItemChecklist(state.selectedCategory.name);
  el.categoryEditModal.classList.add("is-open");
  el.categoryEditModal.setAttribute("aria-hidden", "false");
  el.categoryNameInput.focus();
  el.categoryNameInput.select();
}

function closeCategoryEditModal() {
  // Hide the category editor and return focus to the shared edit action.
  el.categoryEditModal.classList.remove("is-open");
  el.categoryEditModal.setAttribute("aria-hidden", "true");
  el.categoryModalError.textContent = "";
  el.editCodeButton.focus();
}

function saveCategoryEditFromModal() {
  // Persist category rename, color, and checkbox membership changes.
  if (!state.selectedCategory) {
    closeCategoryEditModal();
    return;
  }

  const oldName = state.selectedCategory.name;
  const nextName = normalizeCategoryName(el.categoryNameInput.value);
  const nextColor = normalizeCategoryColor(el.categoryColorInput.value);
  if (!nextName) {
    el.categoryModalError.textContent = t("alert.categoryName");
    return;
  }

  const oldColor = normalizeCategoryColor(state.selectedCategory.color);
  const checkedCodes = new Set(
    [...el.categoryItemList.querySelectorAll("input[type='checkbox']:checked")].map((checkbox) => checkbox.dataset.itemKey),
  );
  const movedItems = state.catalog.items.filter((item) => {
    // Detect checked items that would be moved from another existing category into this category.
    const currentCategory = normalizeCategoryName(item.category);
    return checkedCodes.has(getItemKey(item)) && currentCategory && !categoriesMatch(currentCategory, oldName) && !categoriesMatch(currentCategory, nextName);
  });
  const canMoveItems = movedItems.every((item) =>
    window.confirm(
      t("confirm.moveItemCategory", {
        title: item.title,
        category: normalizeCategoryName(item.category),
        nextCategory: nextName,
      }),
    ),
  );
  if (!canMoveItems) {
    return;
  }

  state.catalog.items.forEach((item) => {
    if (checkedCodes.has(getItemKey(item))) {
      item.category = nextName;
      return;
    }
    if (normalizeCategoryName(item.category) === oldName) {
      item.category = "";
    }
  });

  state.catalog.categories = state.catalog.categories.filter((category) => category.name !== oldName && category.name !== nextName);
  const category = ensureCategory(nextName, nextColor);
  if (oldColor.toLowerCase() !== nextColor.toLowerCase()) {
    const shouldApplyCategoryColor = window.confirm(t("confirm.applyCategoryColor", { category: nextName }));
    if (shouldApplyCategoryColor) {
      state.catalog.items.forEach((item) => {
        if (normalizeCategoryName(item.category) === nextName) {
          item.color = nextColor;
        }
      });
    }
  }

  state.selectedCategory = category;
  state.selectedItem = null;
  saveCatalog();
  el.searchInput.value = "";
  renderSearchOptions();
  renderSelectedItem();
  scrollSelectedCatalogOptionIntoView();
  renderLabels();
  closeCategoryEditModal();
}

function saveItemEditFromModal() {
  // Validate and persist changes made in the standalone catalog item editor.
  if (!state.selectedItem) {
    closeItemEditModal();
    return;
  }

  const currentItem = state.selectedItem;
  const nextTitle = el.editTitleInput.value.trim();
  const nextCodeType = normalizeCodeType(el.editCodeTypeInput.value);
  const nextCode = normalizeCodeForType(el.editCodeInput.value, nextCodeType);
  const nextTextAbove = el.editTextAboveInput.value.trim();
  const nextTextBelow = el.editTextBelowInput.value.trim();
  const nextsignalWord = el.editsignalWordInput.value.trim();
  const nextsigns = getSelectedsigns(el.editsignGrid);
  const nextcustomSigns = parsecustomSigns(el.editCustomSignInput.value);
  const nextLabelMode = normalizeLabelMode(el.editLabelModeInput.value, { code: nextCode, signs: nextsigns, customSigns: nextcustomSigns });
  const nextPresetId = state.presets.some((preset) => preset.id === el.editPresetSelect.value) ? el.editPresetSelect.value : "";
  const categorySelection = getSelectedCategoryFromControls(el.editCategorySelect, el.editCategoryFields, el.editCategoryInput, el.editCategoryColorInput);
  const existingCategory = getCategory(categorySelection.category);
  const nextCategory = existingCategory?.name || categorySelection.category;
  const previousCategoryColor = normalizeCategoryColor(existingCategory?.color);
  const nextCategoryColor = categorySelection.color;
  const nextColor = normalizeColor(el.editColorInput.value);

  if (!nextTitle || (nextCode && !isCodeValidForType(nextCode, nextCodeType))) {
    el.editModalError.textContent = t("alert.titleAndOptionalCode");
    return;
  }

  const duplicate = nextCode ? state.catalog.items.find((item) => item.code === nextCode && item !== currentItem) : null;
  if (duplicate) {
    el.editModalError.textContent = t("alert.duplicateCode");
    return;
  }

  currentItem.title = nextTitle;
  currentItem.code = nextCode;
  currentItem.id = currentItem.id || createItemId(nextTitle, nextCode);
  currentItem.codeType = nextCodeType;
  currentItem.labelMode = nextLabelMode;
  currentItem.signs = nextsigns;
  currentItem.customSigns = nextcustomSigns;
  currentItem.signalWord = nextsignalWord;
  currentItem.color = nextColor;
  currentItem.category = nextCategory;
  currentItem.presetId = nextPresetId;
  currentItem.textAbove = nextTextAbove;
  currentItem.textBelow = nextTextBelow;
  if (nextCategory) {
    ensureCategory(nextCategory, nextCategoryColor);
    if (categorySelection.isNewField && existingCategory && previousCategoryColor.toLowerCase() !== nextCategoryColor.toLowerCase()) {
      const shouldApplyCategoryColor = window.confirm(t("confirm.applyCategoryColor", { category: nextCategory }));
      if (shouldApplyCategoryColor) {
        state.catalog.items.forEach((item) => {
          if (normalizeCategoryName(item.category) === nextCategory) {
            item.color = nextCategoryColor;
          }
        });
      }
    }
  }
  state.catalog.items.sort((a, b) => a.title.localeCompare(b.title));
  state.selectedItem = currentItem;
  el.codeType.value = nextCodeType;
  saveCatalog();
  el.searchInput.value = "";
  selectItem(getItemKey(currentItem));
  closeItemEditModal();
}

function editSelectedCode() {
  // Open the correct editor for the current catalog selection.
  if (state.selectedCategory) {
    openCategoryEditModal();
    return;
  }
  openItemEditModal();
}

function deleteSelectedCode() {
  // Remove the selected item or selected category from localStorage-backed catalog data.
  if (state.selectedCategory) {
    deleteSelectedCategory();
    return;
  }
  if (!state.selectedItem) {
    return;
  }

  const confirmed = window.confirm(t("confirm.deleteItem", { title: state.selectedItem.title }));
  if (!confirmed) {
    return;
  }

  const deletedKey = getItemKey(state.selectedItem);
  state.catalog.items = state.catalog.items.filter((item) => getItemKey(item) !== deletedKey);
  state.selectedItem = null;
  saveCatalog();
  renderSearchOptions();

  if (!state.selectedItem) {
    renderSelectedItem();
    renderLabels();
  }
}

function deleteSelectedCategory() {
  // Delete only the category and move its items back to uncategorized.
  if (!state.selectedCategory) {
    return;
  }

  const categoryName = state.selectedCategory.name;
  const count = state.catalog.items.filter((item) => normalizeCategoryName(item.category) === categoryName).length;
  const confirmed = window.confirm(t("confirm.deleteCategory", { category: categoryName, count }));
  if (!confirmed) {
    return;
  }

  state.catalog.items.forEach((item) => {
    if (normalizeCategoryName(item.category) === categoryName) {
      item.category = "";
    }
  });
  state.catalog.categories = state.catalog.categories.filter((category) => category.name !== categoryName);
  state.selectedCategory = null;
  saveCatalog();
  renderSearchOptions();
  renderSelectedItem();
  renderLabels();
}

function calculateGs1CheckDigit(digits) {
  // Compute the GS1 checksum used by EAN and UPC numeric symbols.
  const sum = digits
    .split("")
    .map(Number)
    .reverse()
    .reduce((total, digit, index) => total + digit * (index % 2 === 0 ? 3 : 1), 0);
  return String((10 - (sum % 10)) % 10);
}

function normalizeEanForBarcode(value) {
  // Accept 12-digit EAN input by adding its checksum; keep valid 13-digit codes as-is.
  const digits = String(value || "").replace(/\D/g, "");
  if (digits.length === 12) {
    return digits + calculateGs1CheckDigit(digits);
  }
  return digits.length === 13 ? digits : "";
}

function normalizeEan8ForBarcode(value) {
  // Accept 7-digit EAN-8 input by adding its checksum; keep valid 8-digit codes as-is.
  const digits = String(value || "").replace(/\D/g, "");
  if (digits.length === 7) {
    return digits + calculateGs1CheckDigit(digits);
  }
  return digits.length === 8 ? digits : "";
}

function normalizeUpcAForBarcode(value) {
  // Accept 11-digit UPC-A input, 12-digit UPC-A, or EAN-13 values with a leading zero.
  const digits = String(value || "").replace(/\D/g, "");
  if (digits.length === 11) {
    return digits + calculateGs1CheckDigit(digits);
  }
  if (digits.length === 12) {
    return digits;
  }
  if (digits.length === 13 && digits.startsWith("0")) {
    return digits.slice(1);
  }
  return "";
}

function encodeEan13(eanCode) {
  // Convert an EAN-13 number into the 95-bit bar pattern used by the SVG renderer.
  const digits = normalizeEanForBarcode(eanCode);
  if (!digits) {
    return "";
  }

  const firstDigit = digits[0];
  const parity = EAN_PARITY[firstDigit];
  let pattern = "101";

  for (let index = 1; index <= 6; index += 1) {
    const digit = digits[index];
    pattern += parity[index - 1] === "O" ? EAN_LEFT_ODD[digit] : EAN_LEFT_EVEN[digit];
  }

  pattern += "01010";

  for (let index = 7; index <= 12; index += 1) {
    pattern += EAN_RIGHT[digits[index]];
  }

  return pattern + "101";
}

function encodeEan8(eanCode) {
  // Convert an EAN-8 number into its compact 67-bit bar pattern.
  const digits = normalizeEan8ForBarcode(eanCode);
  if (!digits) {
    return "";
  }

  let pattern = "101";

  for (let index = 0; index < 4; index += 1) {
    pattern += EAN_LEFT_ODD[digits[index]];
  }

  pattern += "01010";

  for (let index = 4; index < 8; index += 1) {
    pattern += EAN_RIGHT[digits[index]];
  }

  return pattern + "101";
}

function encodeUpcA(upcCode) {
  // Render UPC-A through the equivalent EAN-13 pattern with a leading zero.
  const digits = normalizeUpcAForBarcode(upcCode);
  return digits ? encodeEan13(`0${digits}`) : "";
}

function encodeCode39(value) {
  // Convert Code 39 text into a binary bar pattern using narrow and wide modules.
  const text = `*${String(value || "").toUpperCase()}*`;
  let pattern = "";

  for (const char of text) {
    const charPattern = CODE39_PATTERNS[char];
    if (!charPattern) {
      return "";
    }

    [...charPattern].forEach((widthCode, index) => {
      const width = widthCode === "w" ? 3 : 1;
      const isBar = index % 2 === 0;
      pattern += (isBar ? "1" : "0").repeat(width);
    });
    pattern += "0";
  }

  return pattern;
}

function encodeCode128(value) {
  // Convert printable ASCII text into Code 128 Set B modules with checksum.
  const text = String(value || "");
  if (!text || /[^\x20-\x7e]/.test(text)) {
    return "";
  }

  const values = [104];

  for (const char of text) {
    values.push(char.charCodeAt(0) - 32);
  }

  const checksum = values.reduce((total, value, index) => total + value * (index === 0 ? 1 : index), 0) % 103;
  values.push(checksum, 106);

  return values.map((value) => CODE128_PATTERNS[value]).join("");
}

function createPatternSvg(pattern, width = pattern.length) {
  // Draw a one-dimensional barcode pattern as SVG rectangles for crisp printing.
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "barcode");
  svg.setAttribute("viewBox", `0 0 ${width} 40`);
  svg.setAttribute("preserveAspectRatio", "none");
  svg.setAttribute("aria-hidden", "true");

  let x = 0;

  [...pattern].forEach((bit) => {
    const barWidth = Number.parseInt(bit, 10);

    if (Number.isFinite(barWidth) && barWidth > 1) {
      if (x % 2 === 0) {
        const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        bar.setAttribute("x", String(x));
        bar.setAttribute("y", "0");
        bar.setAttribute("width", String(barWidth));
        bar.setAttribute("height", "40");
        bar.setAttribute("fill", "currentColor");
        svg.append(bar);
      }
      x += barWidth;
      return;
    }

    if (bit !== "1") {
      x += 1;
      return;
    }

    const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    bar.setAttribute("x", String(x));
    bar.setAttribute("y", "0");
    bar.setAttribute("width", "1");
    bar.setAttribute("height", "40");
    bar.setAttribute("fill", "currentColor");
    svg.append(bar);
    x += 1;
  });

  return svg;
}

function createWidthSvg(widthPattern) {
  // Draw width-based barcode encodings such as Code 128 where bars and spaces alternate.
  const totalWidth = [...widthPattern].reduce((total, width) => total + Number.parseInt(width, 10), 0);
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "barcode");
  svg.setAttribute("viewBox", `0 0 ${totalWidth} 40`);
  svg.setAttribute("preserveAspectRatio", "none");
  svg.setAttribute("aria-hidden", "true");

  let x = 0;

  [...widthPattern].forEach((width, index) => {
    const moduleWidth = Number.parseInt(width, 10);

    if (index % 2 === 0) {
      const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      bar.setAttribute("x", String(x));
      bar.setAttribute("y", "0");
      bar.setAttribute("width", String(moduleWidth));
      bar.setAttribute("height", "40");
      bar.setAttribute("fill", "currentColor");
      svg.append(bar);
    }

    x += moduleWidth;
  });

  return svg;
}

function createInvalidCodeNode(message) {
  // Show an inline warning when the selected value cannot render as the chosen type.
  const warning = document.createElement("div");
  warning.className = "empty-label";
  warning.textContent = message;
  return warning;
}

function gfMultiply(a, b) {
  // Multiply two values in the QR Reed-Solomon GF(256) field.
  let result = 0;

  while (b > 0) {
    if (b & 1) {
      result ^= a;
    }
    a <<= 1;
    if (a & 0x100) {
      a ^= 0x11d;
    }
    b >>= 1;
  }

  return result;
}

function gfPow(value, power) {
  // Raise a GF(256) value to a power for generator polynomial creation.
  let result = 1;

  for (let index = 0; index < power; index += 1) {
    result = gfMultiply(result, value);
  }

  return result;
}

function qrGeneratorPolynomial(degree) {
  // Build the Reed-Solomon generator polynomial for the QR error correction length.
  let polynomial = [1];

  for (let index = 0; index < degree; index += 1) {
    const next = new Array(polynomial.length + 1).fill(0);
    const coefficient = gfPow(2, index);

    polynomial.forEach((value, position) => {
      next[position] ^= value;
      next[position + 1] ^= gfMultiply(value, coefficient);
    });

    polynomial = next;
  }

  return polynomial;
}

function qrErrorCorrection(dataCodewords) {
  // Calculate QR version 1-L Reed-Solomon correction bytes.
  const generator = qrGeneratorPolynomial(QR_ECC_CODEWORDS);
  const message = [...dataCodewords, ...new Array(QR_ECC_CODEWORDS).fill(0)];

  for (let index = 0; index < dataCodewords.length; index += 1) {
    const coefficient = message[index];
    if (coefficient === 0) {
      continue;
    }

    generator.forEach((value, position) => {
      message[index + position] ^= gfMultiply(value, coefficient);
    });
  }

  return message.slice(-QR_ECC_CODEWORDS);
}

function bytesToBits(bytes) {
  // Convert codewords into a flat bit stream for QR module placement.
  return bytes.flatMap((byte) =>
    byte
      .toString(2)
      .padStart(8, "0")
      .split("")
      .map((bit) => Number(bit)),
  );
}

function createQrDataCodewords(text) {
  // Build byte-mode QR version 1-L payload codewords for short local data.
  const bytes = [...new TextEncoder().encode(text)];
  if (bytes.length > 17) {
    return null;
  }

  let bits = [0, 1, 0, 0, ...bytesToBits([bytes.length]), ...bytesToBits(bytes)];
  bits = [...bits, ...new Array(Math.min(4, QR_DATA_CODEWORDS * 8 - bits.length)).fill(0)];

  while (bits.length < QR_DATA_CODEWORDS * 8 && bits.length % 8 !== 0) {
    bits.push(0);
  }

  while (bits.length < QR_DATA_CODEWORDS * 8) {
    bits.push(...bytesToBits([bits.length / 8 % 2 === 0 ? 0xec : 0x11]));
  }

  return Array.from({ length: QR_DATA_CODEWORDS }, (_, index) => {
    const byteBits = bits.slice(index * 8, index * 8 + 8).join("");
    return Number.parseInt(byteBits, 2);
  });
}

function createQrMatrix(text) {
  // Create a QR Code version 1-L matrix with mask 0 for short EAN/code data.
  const dataCodewords = createQrDataCodewords(text);
  if (!dataCodewords) {
    return null;
  }

  const matrix = Array.from({ length: QR_SIZE }, () => new Array(QR_SIZE).fill(null));
  const reserved = Array.from({ length: QR_SIZE }, () => new Array(QR_SIZE).fill(false));

  const setModule = (row, col, value, isReserved = true) => {
    if (row < 0 || col < 0 || row >= QR_SIZE || col >= QR_SIZE) {
      return;
    }
    matrix[row][col] = value;
    reserved[row][col] = isReserved;
  };

  const addFinder = (row, col) => {
    for (let y = -1; y <= 7; y += 1) {
      for (let x = -1; x <= 7; x += 1) {
        const inOuter = x >= 0 && x <= 6 && y >= 0 && y <= 6;
        const inCenter = x >= 2 && x <= 4 && y >= 2 && y <= 4;
        const inRing = x === 0 || x === 6 || y === 0 || y === 6;
        setModule(row + y, col + x, inOuter && (inRing || inCenter), true);
      }
    }
  };

  addFinder(0, 0);
  addFinder(0, 14);
  addFinder(14, 0);

  for (let index = 8; index <= 12; index += 1) {
    setModule(6, index, index % 2 === 0, true);
    setModule(index, 6, index % 2 === 0, true);
  }

  setModule(13, 8, true, true);

  const allCodewords = [...dataCodewords, ...qrErrorCorrection(dataCodewords)];
  const bits = bytesToBits(allCodewords);
  let bitIndex = 0;
  let direction = -1;

  for (let col = QR_SIZE - 1; col > 0; col -= 2) {
    if (col === 6) {
      col -= 1;
    }

    for (let rowStep = 0; rowStep < QR_SIZE; rowStep += 1) {
      const row = direction === -1 ? QR_SIZE - 1 - rowStep : rowStep;

      for (let offset = 0; offset < 2; offset += 1) {
        const currentCol = col - offset;
        if (reserved[row][currentCol]) {
          continue;
        }

        const dataBit = bits[bitIndex] || 0;
        const maskedBit = Boolean(dataBit) !== ((row + currentCol) % 2 === 0);
        setModule(row, currentCol, maskedBit, false);
        bitIndex += 1;
      }
    }

    direction *= -1;
  }

  const formatBits = "111011111000100";
  const formatPositionsA = [
    [8, 0],
    [8, 1],
    [8, 2],
    [8, 3],
    [8, 4],
    [8, 5],
    [8, 7],
    [8, 8],
    [7, 8],
    [5, 8],
    [4, 8],
    [3, 8],
    [2, 8],
    [1, 8],
    [0, 8],
  ];
  const formatPositionsB = [
    [20, 8],
    [19, 8],
    [18, 8],
    [17, 8],
    [16, 8],
    [15, 8],
    [14, 8],
    [8, 13],
    [8, 14],
    [8, 15],
    [8, 16],
    [8, 17],
    [8, 18],
    [8, 19],
    [8, 20],
  ];

  [...formatBits].forEach((bit, index) => {
    setModule(formatPositionsA[index][0], formatPositionsA[index][1], bit === "1", true);
    setModule(formatPositionsB[index][0], formatPositionsB[index][1], bit === "1", true);
  });

  return matrix;
}

function createQrSvg(value) {
  // Draw a short QR Code as SVG squares without using any external library.
  const matrix = createQrMatrix(String(value || ""));
  if (!matrix) {
    return null;
  }

  const quietZone = 4;
  const size = QR_SIZE + quietZone * 2;
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "qr-code");
  svg.setAttribute("viewBox", `0 0 ${size} ${size}`);
  svg.setAttribute("aria-hidden", "true");

  matrix.forEach((row, rowIndex) => {
    row.forEach((module, colIndex) => {
      if (!module) {
        return;
      }

      const square = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      square.setAttribute("x", String(colIndex + quietZone));
      square.setAttribute("y", String(rowIndex + quietZone));
      square.setAttribute("width", "1");
      square.setAttribute("height", "1");
      square.setAttribute("fill", "currentColor");
      svg.append(square);
    });
  });

  return svg;
}

function getCodePayload(item) {
  // Choose the value printed and encoded for the currently selected symbol type.
  const codeType = normalizeCodeType(el.codeType.value || item.codeType);
  const rawCode = normalizeCodeForType(item.code || "", codeType);

  switch (codeType) {
    case "ean8":
      return {
        display: normalizeEan8ForBarcode(rawCode),
        pattern: encodeEan8(rawCode),
        invalid: t("invalid.ean8"),
      };
    case "upca": {
      const upc = normalizeUpcAForBarcode(rawCode);
      return {
        display: upc,
        pattern: encodeUpcA(rawCode),
        invalid: t("invalid.upca"),
      };
    }
    case "code39":
      return {
        display: rawCode,
        pattern: encodeCode39(rawCode),
        invalid: t("invalid.code39"),
      };
    case "code128":
      return {
        display: rawCode,
        widths: encodeCode128(rawCode),
        invalid: t("invalid.code128"),
      };
    case "qr":
      return {
        display: rawCode,
        qr: createQrSvg(rawCode),
        invalid: t("invalid.qr"),
      };
    case "ean13":
    default:
      return {
        display: normalizeEanForBarcode(rawCode),
        pattern: encodeEan13(rawCode),
        invalid: t("invalid.ean13"),
      };
  }
}

function createLabel(item) {
  // Build one label cell with title, selected code symbol, and readable code number.
  const label = document.createElement("article");
  label.className = "label";
  label.classList.add("has-custom-order");
  label.classList.toggle("without-title", !el.includeTitle.checked);
  label.classList.toggle("without-code-number", !el.includeCodeNumber.checked);

  if (!item) {
    const empty = document.createElement("span");
    empty.className = "empty-label";
    empty.textContent = t("status.selectCode");
    label.append(empty);
    return label;
  }

  const title = document.createElement("div");
  title.className = "label-title label-part-top";
  title.textContent = item.title;

  if (normalizeLabelMode(item.labelMode, item) === "sign") {
    const signLabel = document.createElement("div");
    const signGrid = document.createElement("div");
    const topGroup = document.createElement("div");
    const upperText = document.createElement("div");
    const lowerText = document.createElement("div");
    signLabel.className = "sign-label-content";
    signGrid.className = "sign-label-grid label-part-main";
    topGroup.className = "label-part-top sign-top-group";
    upperText.className = "text-only-extra text-only-above";
    upperText.textContent = item.textAbove || "";
    lowerText.className = "text-only-extra text-only-below label-part-bottom";
    lowerText.textContent = item.textBelow || "";
    normalizesigns(item.signs).forEach((id) => {
      const sign = getsign(id);
      if (sign) {
        signGrid.append(createsignMark(sign));
      }
    });
    parsecustomSigns(item.customSigns || "").forEach((symbol) => {
      signGrid.append(createCustomSignMark(symbol));
    });
    if (el.includeTitle.checked) {
      topGroup.append(title);
    }
    if (item.signalWord) {
      const signalWord = document.createElement("div");
      signalWord.className = "sign-signal-word";
      signalWord.textContent = item.signalWord;
      topGroup.append(signalWord);
    }
    if (el.includeTextAbove.checked && item.textAbove) {
      topGroup.append(upperText);
    }
    appendOrderedLabelParts(signLabel, {
      top: topGroup.children.length ? topGroup : null,
      main: signGrid,
      bottom: el.includeTextBelow.checked && item.textBelow ? lowerText : null,
    });
    label.classList.add("sign-label");
    label.append(signLabel);
    return label;
  }

  if (!item.code || normalizeLabelMode(item.labelMode, item) === "text") {
    const textOnly = document.createElement("div");
    const centerText = document.createElement("div");
    const upperText = document.createElement("div");
    const lowerText = document.createElement("div");
    textOnly.className = "text-only-stack";
    centerText.className = "text-only-label label-part-main";
    centerText.textContent = item.title;
    upperText.className = "text-only-extra text-only-above label-part-top";
    upperText.textContent = item.textAbove;
    lowerText.className = "text-only-extra text-only-below label-part-bottom";
    lowerText.textContent = item.textBelow;
    appendOrderedLabelParts(textOnly, {
      top: el.includeTextAbove.checked && item.textAbove ? upperText : null,
      main: centerText,
      bottom: el.includeTextBelow.checked && item.textBelow ? lowerText : null,
    });
    label.classList.add("text-only");
    label.append(textOnly);
    return label;
  }

  const payload = getCodePayload(item);
  const barcode =
    payload.qr ||
    (payload.widths
      ? createWidthSvg(payload.widths)
      : payload.pattern
        ? createPatternSvg(payload.pattern)
        : createInvalidCodeNode(payload.invalid));

  const number = document.createElement("div");
  number.className = "code-number label-part-bottom";
  number.textContent = payload.display || item.code;
  barcode.classList.add("label-part-main");

  appendOrderedLabelParts(label, {
    top: el.includeTitle.checked ? title : null,
    main: barcode,
    bottom: el.includeCodeNumber.checked ? number : null,
  });
  return label;
}

function createBlankLabel() {
  // Preserve the sheet grid while intentionally leaving a reusable label cell empty.
  const label = document.createElement("article");
  label.className = "label blank-label";
  return label;
}

function getLabelsToPrint(totalLabels) {
  // Interpret 0 as the normal full-sheet behavior and clamp positive counts to the grid.
  const requestedCount = Math.max(0, Number.parseInt(el.experimentalPrintCount.value, 10) || 0);
  return requestedCount === 0 ? totalLabels : Math.min(requestedCount, totalLabels);
}

function getLabelPartLabel(part) {
  // Translate one sortable label region into the current selected item context.
  const mode = normalizeLabelMode(state.selectedItem?.labelMode, state.selectedItem || {});
  if (part === "main") {
    return mode === "sign" ? t("sort.signs") : mode === "text" ? t("sort.middleText") : t("sort.code");
  }
  if (part === "top") {
    return mode === "code" ? t("sort.title") : t("sort.textAbove");
  }
  return mode === "code" ? t("sort.codeNumber") : t("sort.textBelow");
}

function getVisibleLabelParts(item = state.selectedItem) {
  // Determine which sortable regions are currently visible for the active label.
  if (!item) {
    return [];
  }
  const mode = normalizeLabelMode(item.labelMode, item);
  const parts = [];
  if (mode === "code") {
    if (el.includeTitle.checked) {
      parts.push("top");
    }
    parts.push("main");
    if (el.includeCodeNumber.checked) {
      parts.push("bottom");
    }
    return parts;
  }
  if (mode === "sign" && ((el.includeTitle.checked && item.title) || item.signalWord)) {
    parts.push("top");
  } else if (el.includeTextAbove.checked && item.textAbove) {
    parts.push("top");
  }
  parts.push("main");
  if (el.includeTextBelow.checked && item.textBelow) {
    parts.push("bottom");
  }
  return parts;
}

function appendOrderedLabelParts(container, parts) {
  // Append only the visible label part nodes using the global drag-sorted order.
  state.labelPartOrder.forEach((part) => {
    if (parts[part]) {
      container.append(parts[part]);
    }
  });
}

function renderLabelSortControls() {
  // Draw draggable rectangles for the visible label regions.
  const visibleParts = getVisibleLabelParts();
  el.labelSortList.innerHTML = "";
  if (!visibleParts.length) {
    const empty = document.createElement("div");
    empty.className = "label-sort-empty";
    empty.textContent = t("status.noItemSelected");
    el.labelSortList.append(empty);
    return;
  }

  normalizeLabelPartOrder(state.labelPartOrder)
    .filter((part) => visibleParts.includes(part))
    .forEach((part, index) => {
      const row = document.createElement("button");
      const number = document.createElement("span");
      const label = document.createElement("span");
      row.type = "button";
      row.className = "label-sort-item";
      row.draggable = visibleParts.length > 1;
      row.dataset.part = part;
      row.setAttribute("aria-disabled", String(visibleParts.length === 1));
      number.className = "label-sort-number";
      number.textContent = String(index + 1);
      label.textContent = getLabelPartLabel(part);
      row.append(number, label);
      el.labelSortList.append(row);
    });
}

function moveLabelPart(part, beforePart) {
  // Reorder one label region and keep the hidden regions in a stable fallback order.
  const order = normalizeLabelPartOrder(state.labelPartOrder).filter((item) => item !== part);
  const beforeIndex = order.indexOf(beforePart);
  if (beforeIndex >= 0) {
    order.splice(beforeIndex, 0, part);
  } else {
    order.push(part);
  }
  state.labelPartOrder = normalizeLabelPartOrder(order);
  renderLabels();
}

function clearLabelSortDropState() {
  // Remove drag spacing and hover state from every sort rectangle.
  el.labelSortList.classList.remove("is-sorting");
  el.labelSortList.querySelectorAll(".label-sort-item").forEach((item) => {
    item.classList.remove("is-dragging", "is-drop-target", "is-drop-before", "is-drop-after");
  });
}

function updateLabelSortDropTarget(target, position) {
  // Open a visible before/after drop slot on the rectangle currently under the pointer.
  el.labelSortList.classList.add("is-sorting");
  el.labelSortList.querySelectorAll(".label-sort-item").forEach((item) => {
    const isTarget = item === target;
    item.classList.toggle("is-drop-target", isTarget);
    item.classList.toggle("is-drop-before", isTarget && position === "before");
    item.classList.toggle("is-drop-after", isTarget && position === "after");
  });
}

function getLabelSortDropPart(target, position) {
  // Convert the visual before/after slot into the part that the dragged item should be inserted before.
  if (position === "before") {
    return target.dataset.part;
  }

  const nextItem = target.nextElementSibling?.closest?.(".label-sort-item");
  return nextItem?.dataset.part || null;
}

function updatePrintPageSize(layout) {
  // Inject @page sizing so browser print dialogs use the selected sheet dimensions.
  let style = document.querySelector("#printPageStyle");
  if (!style) {
    style = document.createElement("style");
    style.id = "printPageStyle";
    document.head.append(style);
  }
  style.textContent = `@media print { @page { size: ${layout.width}mm ${layout.height}mm; margin: 0; } }`;
}

function renderLabels() {
  // Redraw the full paper preview whenever geometry or selected code changes.
  const layout = getLayout();
  const count = layout.columns * layout.rows;
  const labelsToPrint = getLabelsToPrint(count);
  const innerWidth = layout.width - layout.marginLeft - layout.marginRight - layout.gapX * (layout.columns - 1);
  const innerHeight = layout.height - layout.marginTop - layout.marginBottom - layout.gapY * (layout.rows - 1);
  const labelWidth = Math.max(1, innerWidth / layout.columns);
  const labelHeight = Math.max(1, innerHeight / layout.rows);

  el.paper.style.width = `${layout.width}mm`;
  el.paper.style.height = `${layout.height}mm`;
  el.paper.style.padding = `${layout.marginTop}mm ${layout.marginRight}mm ${layout.marginBottom}mm ${layout.marginLeft}mm`;
  el.paper.style.gap = `${layout.gapY}mm ${layout.gapX}mm`;
  el.paper.style.gridTemplateColumns = `repeat(${layout.columns}, ${labelWidth}mm)`;
  el.paper.style.gridTemplateRows = `repeat(${layout.rows}, ${labelHeight}mm)`;
  applyTypography();
  applyExperimentalStyles();
  el.paper.innerHTML = "";
  el.experimentalPrintCount.max = String(count);

  for (let index = 0; index < count; index += 1) {
    el.paper.append(index < labelsToPrint ? createLabel(state.selectedItem) : createBlankLabel());
  }

  renderLabelSortControls();
  applyPreviewZoom();
  const unitLabel = state.measurementUnit === "imperial" ? "in" : "mm";
  // Show the selected catalog title in the preview toolbar metadata.
  const labelTitle = state.selectedItem?.title || t("status.noItemSelected");
  renderLayoutMeta({
    count,
    title: labelTitle,
    width: formatMeasurement(labelWidth),
    height: formatMeasurement(labelHeight),
    unit: unitLabel,
  });
  updatePrintPageSize(layout);
  saveSettings();
}

function addCode() {
  // Add a new catalog item and immediately save it to localStorage.
  const title = el.newTitle.value.trim();
  const codeType = normalizeCodeType(el.codeType.value);
  const code = normalizeCodeForType(el.newCode.value, codeType);
  const textAbove = el.newTextAbove.value.trim();
  const textBelow = el.newTextBelow.value.trim();
  const signalWord = el.newsignalWord.value.trim();
  const signs = getSelectedsigns(el.newsignGrid);
  const customSigns = parsecustomSigns(el.newCustomSignInput.value);
  const labelMode = normalizeLabelMode(el.newLabelMode.value, { code, signs, customSigns });
  const presetId = state.presets.some((preset) => preset.id === el.newPresetSelect.value) ? el.newPresetSelect.value : "";
  const categorySelection = getSelectedCategoryFromControls(el.newCategorySelect, el.newCategoryFields, el.newCategory, el.newCategoryColor);
  const existingCategory = getCategory(categorySelection.category);
  const category = existingCategory?.name || categorySelection.category;
  const categoryColor = categorySelection.color;
  const previousCategoryColor = normalizeCategoryColor(existingCategory?.color);
  const color = normalizeColor(el.newColor.value);

  if (!title || (code && !isCodeValidForType(code, codeType))) {
    alert(t("alert.titleAndOptionalCode"));
    return;
  }

  const existing = code ? state.catalog.items.find((item) => item.code === code) : null;
  if (existing) {
    alert(t("alert.duplicateCode"));
    return;
  }

  const item = {
    id: createItemId(title, code),
    title,
    code,
    codeType,
    labelMode,
    signs,
    customSigns,
    signalWord,
    color,
    category,
    presetId,
    textAbove,
    textBelow,
  };

  if (category) {
    ensureCategory(category, categoryColor);
  }
  state.catalog.items.push(item);
  if (categorySelection.isNewField && existingCategory && previousCategoryColor.toLowerCase() !== categoryColor.toLowerCase()) {
    const shouldApplyCategoryColor = window.confirm(t("confirm.applyCategoryColor", { category }));
    if (shouldApplyCategoryColor) {
      state.catalog.items.forEach((catalogItem) => {
        if (normalizeCategoryName(catalogItem.category) === category) {
          catalogItem.color = categoryColor;
        }
      });
    }
  }
  state.catalog.items.sort((a, b) => a.title.localeCompare(b.title));
  saveCatalog();
  el.searchInput.value = title;
  renderSearchOptions();
  selectItem(getItemKey(item));
  el.newTitle.value = "";
  el.newCode.value = "";
  el.newTextAbove.value = "";
  el.newTextBelow.value = "";
  el.newsignalWord.value = "";
  el.newCustomSignInput.value = "";
  renderCustomSignPreview(el.newCustomSignInput, el.newCustomSignPreview);
  rendersignPicker(el.newsignGrid, []);
  el.newLabelMode.value = "code";
  el.newPresetSelect.value = "";
  el.newCategorySelect.value = "";
  el.newCategory.value = "";
  el.newCategoryColor.value = DEFAULT_CATEGORY_COLOR;
  setNewCategoryFieldsVisible(el.newCategoryFields, false);
  el.newColor.value = "#0f766e";
}

function upsertSharedItem(item, shouldSave) {
  // Use a shared item for the preview and optionally save it into the local catalog.
  const sharedItem = {
    id: String(item.id || createItemId(item.title, item.code)),
    title: String(item.title || "").trim(),
    code: normalizeCodeForType(item.code || "", item.codeType || "ean13"),
    codeType: normalizeCodeType(item.codeType || "ean13"),
    labelMode: normalizeLabelMode(item.labelMode, item),
    signs: normalizesigns(item.signs || item.pictograms || []),
    customSigns: parsecustomSigns(item.customSigns || item.customPictograms || item.unicodesigns || item.unicodePictograms || ""),
    signalWord: String(item.signalWord || "").trim(),
    color: normalizeColor(item.color),
    category: normalizeCategoryName(item.category),
    presetId: String(item.presetId || "").trim(),
    textAbove: String(item.textAbove || "").trim(),
    textBelow: String(item.textBelow || "").trim(),
  };

  if (!sharedItem.title || (sharedItem.code && !isCodeValidForType(sharedItem.code, sharedItem.codeType))) {
    return null;
  }

  const existing = sharedItem.code
    ? state.catalog.items.find((catalogItem) => catalogItem.code === sharedItem.code)
    : state.catalog.items.find((catalogItem) => getItemKey(catalogItem) === sharedItem.id);
  if (sharedItem.category) {
    ensureCategory(sharedItem.category, item.categoryColor || getCategory(sharedItem.category)?.color || DEFAULT_CATEGORY_COLOR);
  }
  if (existing) {
    Object.assign(existing, sharedItem);
    state.selectedItem = existing;
  } else if (shouldSave) {
    state.catalog.items.push(sharedItem);
    state.catalog.items.sort((a, b) => a.title.localeCompare(b.title));
    state.selectedItem = sharedItem;
    saveCatalog();
  } else {
    state.selectedItem = sharedItem;
  }

  el.codeType.value = sharedItem.codeType;
  return sharedItem;
}

function buildCurrentLabelPayload() {
  // Build the shared label package used by links and downloadable label files.
  if (!state.selectedItem) {
    alert(t("alert.selectItemToShare"));
    return null;
  }

  return {
    version: 1,
    item: {
      id: getItemKey(state.selectedItem),
      title: state.selectedItem.title,
      code: state.selectedItem.code,
      codeType: state.selectedItem.codeType,
      labelMode: normalizeLabelMode(state.selectedItem.labelMode, state.selectedItem),
      signs: normalizesigns(state.selectedItem.signs),
      customSigns: parsecustomSigns(state.selectedItem.customSigns || ""),
      signalWord: String(state.selectedItem.signalWord || "").trim(),
      color: normalizeColor(state.selectedItem.color),
      category: normalizeCategoryName(state.selectedItem.category),
      categoryColor: normalizeCategoryColor(getCategory(state.selectedItem.category)?.color),
      presetId: String(state.selectedItem.presetId || "").trim(),
      textAbove: String(state.selectedItem.textAbove || "").trim(),
      textBelow: String(state.selectedItem.textBelow || "").trim(),
    },
    settings: collectSettingsSnapshot(),
  };
}

function createCurrentLabelShareUrl(payload) {
  // Convert a label package into the existing self-contained URL hash format.
  return `${location.origin}${location.pathname}#label=${encodeSharePayload(payload)}`;
}

function createFileSafeName(value) {
  // Create a conservative local filename from a label title.
  const fallback = "label";
  const slug = String(value || fallback)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || fallback;
}

function openShareModal() {
  // Open the share/save chooser while keeping the current URL share behavior available.
  if (!state.selectedItem) {
    alert(t("alert.selectItemToShare"));
    return;
  }
  el.shareModal.classList.add("is-open");
  el.shareModal.setAttribute("aria-hidden", "false");
  el.copyShareLinkButton.focus();
}

function closeShareModal() {
  // Close the share/save chooser and return focus to its standalone button.
  el.shareModal.classList.remove("is-open");
  el.shareModal.setAttribute("aria-hidden", "true");
  el.shareButton.focus();
}

async function copyCurrentLabelShareLink() {
  // Copy the same URL payload as before, now from the share/save modal.
  const payload = buildCurrentLabelPayload();
  if (!payload) {
    return;
  }
  const url = `${location.origin}${location.pathname}#label=${encodeSharePayload(payload)}`;

  try {
    await navigator.clipboard.writeText(url);
    showGenericCopyToast(t("status.shareLinkCopied"));
  } catch {
    window.prompt(t("prompt.copyShareLink"), url);
  }
}

function saveCurrentLabelFile() {
  // Download the selected label and current settings as an editable Labelab file.
  const payload = buildCurrentLabelPayload();
  if (!payload) {
    return;
  }
  const packageData = {
    type: "label-lab-label",
    exportedAt: new Date().toISOString(),
    shareUrl: createCurrentLabelShareUrl(payload),
    ...payload,
  };
  const blob = new Blob([JSON.stringify(packageData, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${createFileSafeName(payload.item.title)}.label.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function printCurrentLabelFromShareModal() {
  // Let the browser print dialog handle PDF output without changing the existing paper layout.
  closeShareModal();
  window.print();
}

function resetDirectionControls(button) {
  // Reset one left/right/top/bottom control group to zero after user confirmation.
  const keys = String(button.dataset.resetControls || "")
    .split(/\s+/)
    .filter(Boolean);
  if (!keys.length || !window.confirm(t("confirm.resetDirectionValues"))) {
    return;
  }

  keys.forEach((key) => {
    if (el[key]) {
      setMeasurementValue(el[key], 0);
    }
  });
  renderLabels();
}

function handleSharedLabelFromUrl() {
  // Import a shared label from the URL hash and prompt before saving unknown items.
  const match = location.hash.match(/^#label=(.+)$/);
  if (!match) {
    return;
  }

  try {
    const payload = decodeSharePayload(match[1]);
    applySettingsSnapshot(payload.settings);
    const sharedCode = String(payload.item?.code || "").trim();
    const sharedId = String(payload.item?.id || "").trim();
    const exists = sharedCode
      ? state.catalog.items.some((item) => item.code === sharedCode)
      : state.catalog.items.some((item) => getItemKey(item) === sharedId);
    const shouldSave = exists || window.confirm(t("confirm.saveSharedItem", { title: payload.item?.title || "" }));
    const sharedItem = upsertSharedItem(payload.item, shouldSave);

    if (sharedItem) {
      el.searchInput.value = sharedItem.title;
      renderSearchOptions();
      renderSelectedItem();
      renderLabels();
      saveSettings();
    }

    history.replaceState(null, document.title, `${location.pathname}${location.search}`);
  } catch (error) {
    console.error(error);
    alert(t("alert.invalidShareLink"));
  }
}

function exportJson() {
  // Download the current localStorage catalog as a backup JSON file.
  saveCatalog();
  const blob = new Blob([JSON.stringify(state.catalog, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "codes.json";
  link.click();
  URL.revokeObjectURL(url);
}

function openDonationModal() {
  // Show the donation dialog and keep screen readers informed.
  el.donationModal.classList.add("is-open");
  el.donationModal.setAttribute("aria-hidden", "false");
  el.donationCloseButton.focus();
}

function closeDonationModal() {
  // Hide the donation dialog and return focus to the opener.
  el.donationModal.classList.remove("is-open");
  el.donationModal.setAttribute("aria-hidden", "true");
  closeQrViewer();
  el.donateButton.focus();
}

function openQrViewer(image) {
  // Open a larger QR preview from a donation QR thumbnail.
  el.qrViewerTitle.textContent = image.dataset.qrTitle || "QR Code";
  el.qrViewerImage.src = image.dataset.qrSrc || image.src;
  el.qrViewerImage.alt = image.alt || "";
  el.qrViewer.classList.add("is-open");
  el.qrViewer.setAttribute("aria-hidden", "false");
  el.qrViewerCloseButton.focus();
}

function closeQrViewer() {
  // Close the larger QR preview without closing the donation modal.
  el.qrViewer.classList.remove("is-open");
  el.qrViewer.setAttribute("aria-hidden", "true");
  el.qrViewerImage.src = "";
}

function showDonationNote(message) {
  // Show a short copy status inside the donation modal.
  el.donationNote.textContent = message;
  el.donationNote.classList.add("is-visible");
  window.clearTimeout(showDonationNote.timeoutId);
  showDonationNote.timeoutId = window.setTimeout(() => {
    el.donationNote.classList.remove("is-visible");
  }, 1800);
}

function showCopyToast(type, address) {
  // Slide a top banner down briefly after a wallet address is copied.
  el.copyToast.textContent = t("status.walletCopied", { type, address });
  el.copyToast.classList.add("is-visible");
  window.clearTimeout(showCopyToast.timeoutId);
  showCopyToast.timeoutId = window.setTimeout(() => {
    el.copyToast.classList.remove("is-visible");
  }, 2600);
}

function showGenericCopyToast(message) {
  // Slide the same top banner for non-wallet copy messages.
  el.copyToast.textContent = message;
  el.copyToast.classList.add("is-visible");
  window.clearTimeout(showCopyToast.timeoutId);
  showCopyToast.timeoutId = window.setTimeout(() => {
    el.copyToast.classList.remove("is-visible");
  }, 2600);
}

async function copyDonationAddress(address, type) {
  // Copy donation addresses with a clipboard fallback for older local browsers.
  if (!address) {
    showDonationNote(t("status.noAddress"));
    return;
  }

  try {
    await navigator.clipboard.writeText(address);
  } catch {
    const helper = document.createElement("textarea");
    helper.value = address;
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.append(helper);
    helper.select();
    document.execCommand("copy");
    helper.remove();
  }

  showDonationNote(t("status.copied"));
  showCopyToast(type, address);
}

async function openScannerModal() {
  // Start the camera scanner and fill the Add Code input when a code is detected.
  if (!window.BarcodeDetector || !navigator.mediaDevices?.getUserMedia) {
    alert(t("alert.scannerUnsupported"));
    return;
  }

  try {
    const wantedFormats = ["ean_13", "ean_8", "upc_a", "code_39", "code_128", "qr_code"];
    const supportedFormats = await window.BarcodeDetector.getSupportedFormats?.();
    const formats = Array.isArray(supportedFormats) ? wantedFormats.filter((format) => supportedFormats.includes(format)) : wantedFormats;
    if (!formats.length) {
      alert(t("alert.scannerUnsupported"));
      return;
    }

    state.scannerDetector = new window.BarcodeDetector({ formats });
    state.scannerStream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: { ideal: "environment" },
      },
      audio: false,
    });
    el.scannerVideo.srcObject = state.scannerStream;
    el.scannerModal.classList.add("is-open");
    el.scannerModal.setAttribute("aria-hidden", "false");
    el.scannerStatus.textContent = t("status.scannerSearching");
    await el.scannerVideo.play();
    scanCameraFrame();
  } catch (error) {
    console.error(error);
    closeScannerModal();
    alert(t("alert.scannerCamera"));
  }
}

function closeScannerModal() {
  // Stop camera tracks and close the scanner modal cleanly.
  if (state.scannerFrameId) {
    cancelAnimationFrame(state.scannerFrameId);
    state.scannerFrameId = null;
  }
  if (state.scannerStream) {
    state.scannerStream.getTracks().forEach((track) => track.stop());
  }
  state.scannerStream = null;
  state.scannerDetector = null;
  el.scannerVideo.pause();
  el.scannerVideo.srcObject = null;
  el.scannerModal.classList.remove("is-open");
  el.scannerModal.setAttribute("aria-hidden", "true");
}

async function scanCameraFrame() {
  // Check the current video frame for supported codes until one is found or scanning stops.
  if (!state.scannerStream || !state.scannerDetector) {
    return;
  }

  try {
    if (el.scannerVideo.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      const codes = await state.scannerDetector.detect(el.scannerVideo);
      const detected = codes[0];
      if (detected?.rawValue) {
        const codeType = mapScannerFormatToCodeType(detected.format);
        if (codeType) {
          el.codeType.value = codeType;
        }
        el.newCode.value = normalizeCodeForType(detected.rawValue, codeType || el.codeType.value);
        closeScannerModal();
        el.newCode.focus();
        renderLabels();
        return;
      }
    }
  } catch (error) {
    console.error(error);
    el.scannerStatus.textContent = t("status.scannerSearching");
  }

  state.scannerFrameId = requestAnimationFrame(scanCameraFrame);
}

async function importJson(file) {
  // Read an imported catalog file and ask how it should affect the current catalog.
  try {
    const text = await file.text();
    const imported = normalizeCatalog(JSON.parse(text));
    state.pendingImport = {
      fileName: file.name,
      catalog: imported,
      summary: createImportSummary(imported),
    };
    openImportReviewModal();
  } catch (error) {
    console.error(error);
    alert(t("alert.invalidImportJson"));
  }
}

function parseCatalogTimestamp(value) {
  // Convert catalog timestamps into comparable milliseconds, or null when absent.
  const timestamp = Date.parse(value || "");
  return Number.isFinite(timestamp) ? timestamp : null;
}

function isPendingImportOlder() {
  // Detect when the import file declares an older lastUpdate than the current browser catalog.
  const importedTime = parseCatalogTimestamp(state.pendingImport?.catalog.lastUpdate);
  const currentTime = parseCatalogTimestamp(state.catalog.lastUpdate);
  return importedTime !== null && currentTime !== null && importedTime < currentTime;
}

function createImportSummary(imported) {
  // Count what replace or merge will affect before the user confirms an import action.
  const currentItemKeys = new Set(state.catalog.items.map(getImportItemKey));
  const importedItemKeys = new Set(imported.items.map(getImportItemKey));
  const currentCategoryKeys = new Set(state.catalog.categories.map((category) => normalizeCategoryName(category.name).toLowerCase()));
  const importedCategoryKeys = new Set(imported.categories.map((category) => normalizeCategoryName(category.name).toLowerCase()));
  const newItems = imported.items.filter((item) => !currentItemKeys.has(getImportItemKey(item))).length;
  const existingItems = imported.items.length - newItems;
  const newCategories = imported.categories.filter((category) => !currentCategoryKeys.has(normalizeCategoryName(category.name).toLowerCase())).length;
  const existingCategories = imported.categories.length - newCategories;
  const removedByReplace = state.catalog.items.filter((item) => !importedItemKeys.has(getImportItemKey(item))).length;
  const categoriesRemovedByReplace = state.catalog.categories.filter(
    (category) => !importedCategoryKeys.has(normalizeCategoryName(category.name).toLowerCase()),
  ).length;

  return {
    currentItems: state.catalog.items.length,
    currentCategories: state.catalog.categories.length,
    importedItems: imported.items.length,
    importedCategories: imported.categories.length,
    newItems,
    existingItems,
    newCategories,
    existingCategories,
    removedByReplace,
    categoriesRemovedByReplace,
  };
}

function formatCatalogDate(value) {
  // Format catalog dates for import review, falling back cleanly for missing metadata.
  const timestamp = parseCatalogTimestamp(value);
  return timestamp === null ? t("status.unknown") : new Date(timestamp).toLocaleString();
}

function renderImportSummary() {
  // Show import counts and timestamps inside the review modal.
  const pending = state.pendingImport;
  if (!pending) {
    return;
  }

  const summary = pending.summary;
  el.importOlderWarning.classList.toggle("is-hidden", !isPendingImportOlder());
  el.importSummary.innerHTML = "";

  [
    ["label.importFile", pending.fileName],
    ["label.currentCatalogDate", formatCatalogDate(state.catalog.lastUpdate)],
    ["label.importCatalogDate", formatCatalogDate(pending.catalog.lastUpdate)],
    ["label.currentCatalogSize", t("status.importCatalogSize", { items: summary.currentItems, categories: summary.currentCategories })],
    ["label.importCatalogSize", t("status.importCatalogSize", { items: summary.importedItems, categories: summary.importedCategories })],
    [
      "label.mergeSummary",
      t("status.mergeSummary", {
        newItems: summary.newItems,
        existingItems: summary.existingItems,
        newCategories: summary.newCategories,
        existingCategories: summary.existingCategories,
      }),
    ],
    [
      "label.replaceSummary",
      t("status.replaceSummary", {
        removedItems: summary.removedByReplace,
        removedCategories: summary.categoriesRemovedByReplace,
      }),
    ],
  ].forEach(([labelKey, value]) => {
    const row = document.createElement("div");
    const label = document.createElement("span");
    const text = document.createElement("strong");
    row.className = "import-summary-row";
    label.textContent = t(labelKey);
    text.textContent = value;
    row.append(label, text);
    el.importSummary.append(row);
  });
}

function openImportReviewModal() {
  // Open the import mode selector after a valid JSON catalog file is parsed.
  renderImportSummary();
  el.importReviewModal.classList.add("is-open");
  el.importReviewModal.setAttribute("aria-hidden", "false");
  el.importMergeButton.focus();
}

function closeImportReviewModal() {
  // Close the import selector and discard the pending parsed file.
  el.importReviewModal.classList.remove("is-open");
  el.importReviewModal.setAttribute("aria-hidden", "true");
  state.pendingImport = null;
}

function mergeCatalogs(currentCatalog, importedCatalog) {
  // Merge imported data by appending only missing items and missing categories.
  const categoriesByName = new Map();
  const presetsById = new Map();
  currentCatalog.categories.forEach((category) => {
    categoriesByName.set(normalizeCategoryName(category.name).toLowerCase(), { ...category });
  });
  currentCatalog.presets.forEach((preset) => {
    presetsById.set(preset.id, { ...preset });
  });
  importedCatalog.categories.forEach((category) => {
    const key = normalizeCategoryName(category.name).toLowerCase();
    if (!key || categoriesByName.has(key)) {
      return;
    }
    categoriesByName.set(key, { ...category });
  });
  importedCatalog.presets.forEach((preset) => {
    if (!presetsById.has(preset.id)) {
      presetsById.set(preset.id, { ...preset });
    }
  });

  const itemsByKey = new Map();
  currentCatalog.items.forEach((item) => {
    itemsByKey.set(getImportItemKey(item), { ...item });
  });
  importedCatalog.items.forEach((item) => {
    const key = getImportItemKey(item);
    if (itemsByKey.has(key)) {
      return;
    }
    itemsByKey.set(key, { ...item });
  });

  const categories = [...categoriesByName.values()].sort((a, b) => a.name.localeCompare(b.name));
  const presets = [...presetsById.values()].sort((a, b) => a.name.localeCompare(b.name));
  const items = [...itemsByKey.values()].sort((a, b) => (a.category || "").localeCompare(b.category || "") || a.title.localeCompare(b.title));
  return normalizeCatalog({
    lastUpdate: new Date().toISOString(),
    categories,
    presets,
    items,
  });
}

function finishCatalogImport(mode) {
  // Commit either a full replace or a local-preserving merge after saving a rollback backup.
  if (!state.pendingImport) {
    return;
  }

  saveCatalogBackup(mode);
  state.catalog = mode === "merge" ? mergeCatalogs(state.catalog, state.pendingImport.catalog) : state.pendingImport.catalog;
  state.selectedItem = null;
  state.selectedCategory = null;
  closeImportReviewModal();
  saveCatalog();
  renderSearchOptions();
  renderLabels();
}

function bindEvents() {
  // Wire form controls to catalog filtering, layout rendering, and backup actions.
  el.searchInput.addEventListener("input", renderSearchOptions);
  el.addCodeButton.addEventListener("click", addCode);
  el.scanCodeButton.addEventListener("click", openScannerModal);
  el.editCodeButton.addEventListener("click", editSelectedCode);
  el.deleteCodeButton.addEventListener("click", deleteSelectedCode);
  el.applyPresetButton.addEventListener("click", applySelectedPreset);
  el.savePresetButton.addEventListener("click", saveCurrentAsPreset);
  el.updatePresetButton.addEventListener("click", updateSelectedPreset);
  el.deletePresetButton.addEventListener("click", deleteSelectedPreset);
  el.exportButton.addEventListener("click", exportJson);
  el.printButton.addEventListener("click", () => window.print());
  el.shareButton.addEventListener("click", openShareModal);
  el.shareCloseButton.addEventListener("click", closeShareModal);
  el.copyShareLinkButton.addEventListener("click", copyCurrentLabelShareLink);
  el.saveLabelFileButton.addEventListener("click", saveCurrentLabelFile);
  el.savePdfButton.addEventListener("click", printCurrentLabelFromShareModal);
  el.donateButton.addEventListener("click", openDonationModal);
  document.querySelectorAll("[data-reset-controls]").forEach((button) => {
    // Connect every plus-shaped movement reset button to the shared reset behavior.
    button.addEventListener("click", () => resetDirectionControls(button));
  });
  el.itemEditForm.addEventListener("submit", (event) => {
    // Save modal edits without reloading the static page.
    event.preventDefault();
    saveItemEditFromModal();
  });
  el.categoryEditForm.addEventListener("submit", (event) => {
    // Save category edits without reloading the static page.
    event.preventDefault();
    saveCategoryEditFromModal();
  });
  el.itemEditCancelButton.addEventListener("click", closeItemEditModal);
  el.itemEditCloseButton.addEventListener("click", closeItemEditModal);
  el.categoryEditCancelButton.addEventListener("click", closeCategoryEditModal);
  el.categoryEditCloseButton.addEventListener("click", closeCategoryEditModal);
  el.importReviewCloseButton.addEventListener("click", closeImportReviewModal);
  el.importCancelButton.addEventListener("click", closeImportReviewModal);
  el.importMergeButton.addEventListener("click", () => finishCatalogImport("merge"));
  el.importReplaceButton.addEventListener("click", () => finishCatalogImport("replace"));
  el.scannerCloseButton.addEventListener("click", closeScannerModal);
  el.editColorInput.addEventListener("input", () => syncEditColorPresets(el.editColorInput.value));
  el.addNewCategoryButton.addEventListener("click", () => {
    // Reveal fields for creating a category from the Add Code panel.
    setNewCategoryFieldsVisible(el.newCategoryFields, el.newCategoryFields.classList.contains("is-hidden"));
    if (!el.newCategoryFields.classList.contains("is-hidden")) {
      el.newCategory.focus();
    }
  });
  el.editNewCategoryButton.addEventListener("click", () => {
    // Reveal fields for assigning the edited item to a new category.
    setNewCategoryFieldsVisible(el.editCategoryFields, el.editCategoryFields.classList.contains("is-hidden"));
    if (!el.editCategoryFields.classList.contains("is-hidden")) {
      el.editCategoryInput.focus();
    }
  });
  el.newCategory.addEventListener("change", () => syncCategoryColorInput(el.newCategory, el.newCategoryColor));
  el.editCategoryInput.addEventListener("change", () => syncCategoryColorInput(el.editCategoryInput, el.editCategoryColorInput));
  el.itemEditModal.addEventListener("click", (event) => {
    if (event.target === el.itemEditModal) {
      closeItemEditModal();
    }
  });
  el.categoryEditModal.addEventListener("click", (event) => {
    if (event.target === el.categoryEditModal) {
      closeCategoryEditModal();
    }
  });
  el.importReviewModal.addEventListener("click", (event) => {
    if (event.target === el.importReviewModal) {
      closeImportReviewModal();
    }
  });
  el.scannerModal.addEventListener("click", (event) => {
    if (event.target === el.scannerModal) {
      closeScannerModal();
    }
  });
  el.donationCloseButton.addEventListener("click", closeDonationModal);
  el.qrViewerCloseButton.addEventListener("click", closeQrViewer);
  el.donationModal.addEventListener("click", (event) => {
    if (event.target === el.donationModal) {
      closeDonationModal();
    }
  });
  el.qrViewer.addEventListener("click", (event) => {
    if (event.target === el.qrViewer) {
      closeQrViewer();
    }
  });
  document.querySelectorAll(".donation-qr").forEach((image) => {
    image.addEventListener("click", () => openQrViewer(image));
  });
  document.querySelectorAll(".copy-donation-button").forEach((button) => {
    button.addEventListener("click", () => copyDonationAddress(button.dataset.donationAddress || "", button.dataset.donationType || "Wallet"));
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && el.qrViewer.classList.contains("is-open")) {
      closeQrViewer();
      return;
    }
    if (event.key === "Escape" && el.itemEditModal.classList.contains("is-open")) {
      closeItemEditModal();
      return;
    }
    if (event.key === "Escape" && el.categoryEditModal.classList.contains("is-open")) {
      closeCategoryEditModal();
      return;
    }
    if (event.key === "Escape" && el.importReviewModal.classList.contains("is-open")) {
      closeImportReviewModal();
      return;
    }
    if (event.key === "Escape" && el.scannerModal.classList.contains("is-open")) {
      closeScannerModal();
      return;
    }
    if (event.key === "Escape" && el.donationModal.classList.contains("is-open")) {
      closeDonationModal();
    }
  });
  el.zoomOutButton.addEventListener("click", () => setPreviewZoom(state.previewZoom - ZOOM_STEP));
  el.zoomInButton.addEventListener("click", () => setPreviewZoom(state.previewZoom + ZOOM_STEP));
  el.zoomFitButton.addEventListener("click", fitPreviewToWindow);
  el.paperWrap.addEventListener("pointerdown", startPaperPan);
  el.paperWrap.addEventListener("pointermove", movePaperPan);
  el.paperWrap.addEventListener("pointerup", stopPaperPan);
  el.paperWrap.addEventListener("pointercancel", stopPaperPan);
  el.measurementUnit.addEventListener("change", () => {
    convertMeasurementInputs(el.measurementUnit.value);
    renderLabels();
  });
  el.languageSelect.addEventListener("change", async () => {
    // Load a locale file and re-render translated static and dynamic UI strings.
    await loadMessages(el.languageSelect.value);
    applyTranslations();
    renderLabels();
    saveSettings();
  });

  el.paperWrap.addEventListener(
    "wheel",
    (event) => {
      // Hold Ctrl while scrolling over the preview to zoom without changing label geometry.
      if (!event.ctrlKey) {
        return;
      }

      event.preventDefault();
      setPreviewZoom(state.previewZoom + (event.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP));
    },
    { passive: false },
  );

  el.importInput.addEventListener("change", async () => {
    if (el.importInput.files?.[0]) {
      await importJson(el.importInput.files[0]);
      el.importInput.value = "";
    }
  });

  el.paperSize.addEventListener("change", () => {
    applyPaperPreset();
    renderLabels();
  });

  el.paperOrientation.addEventListener("change", () => {
    applyOrientationChange();
    renderLabels();
  });

  el.gridPreset.addEventListener("change", () => {
    applyGridPreset();
    renderLabels();
  });

  [
    el.paperWidth,
    el.paperHeight,
    el.columnsInput,
    el.rowsInput,
    el.marginLeft,
    el.marginRight,
    el.marginTop,
    el.marginBottom,
    el.gapX,
    el.gapY,
    el.codeType,
    el.labelFont,
    el.titleSize,
    el.codeTextSize,
    el.textAboveSize,
    el.textBelowSize,
    el.codePaddingLeft,
    el.codePaddingRight,
    el.codePaddingTop,
    el.codePaddingBottom,
    el.barcodeMaxHeight,
    el.qrMaxSize,
    el.signMaxSize,
    el.experimentalLabelBackground,
    el.experimentalBarcodeColor,
    el.experimentalTitleColor,
    el.experimentalCodeNumberColor,
    el.experimentalPrintCount,
  ].forEach((input) => input.addEventListener("input", renderLabels));

  [
    el.includeTitle,
    el.includeCodeNumber,
    el.includeTextAbove,
    el.includeTextBelow,
    el.titleBold,
    el.titleItalic,
    el.codeBold,
    el.codeItalic,
    el.textMiddleBold,
    el.textMiddleItalic,
    el.textAboveBold,
    el.textAboveItalic,
    el.textBelowBold,
    el.textBelowItalic,
  ].forEach((input) => {
    input.addEventListener("change", renderLabels);
  });

  [
    el.textAboveSize,
    el.textBelowSize,
    el.includeTextAbove,
    el.includeTextBelow,
    el.textMiddleBold,
    el.textMiddleItalic,
    el.textAboveBold,
    el.textAboveItalic,
    el.textBelowBold,
    el.textBelowItalic,
  ].forEach((input) => {
    input.addEventListener("change", warnTextOnlyStyleControl);
  });

  [el.includeCodeNumber, el.codeBold, el.codeItalic, el.codeTextSize].forEach((input) => {
    input.addEventListener("change", warnCodeStyleControl);
  });

  [el.titleBold, el.titleItalic].forEach((input) => {
    input.addEventListener("change", warnTitleStyleControl);
  });

  el.labelSortList.addEventListener("dragstart", (event) => {
    // Store the dragged label part id for the drop handler.
    const item = event.target.closest(".label-sort-item");
    if (!item || item.getAttribute("aria-disabled") === "true") {
      event.preventDefault();
      return;
    }
    event.dataTransfer.setData("text/plain", item.dataset.part);
    event.dataTransfer.effectAllowed = "move";
    el.labelSortList.classList.add("is-sorting");
    item.classList.add("is-dragging");
  });
  el.labelSortList.addEventListener("dragend", () => {
    // Clear drag styling after the browser completes a move operation.
    clearLabelSortDropState();
  });
  el.labelSortList.addEventListener("dragover", (event) => {
    // Track whether the pointer is above or below the hovered rectangle midpoint.
    const target = event.target.closest(".label-sort-item");
    if (!target || target.getAttribute("aria-disabled") === "true") {
      return;
    }
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    const targetRect = target.getBoundingClientRect();
    const position = event.clientY < targetRect.top + targetRect.height / 2 ? "before" : "after";
    updateLabelSortDropTarget(target, position);
  });
  el.labelSortList.addEventListener("dragleave", (event) => {
    // Remove the open slot when the pointer leaves the whole sort list.
    if (!el.labelSortList.contains(event.relatedTarget)) {
      clearLabelSortDropState();
    }
  });
  el.labelSortList.addEventListener("drop", (event) => {
    // Move the dragged label region into the visible before/after slot.
    const target = event.target.closest(".label-sort-item");
    const part = event.dataTransfer.getData("text/plain");
    if (!target || !part || target.getAttribute("aria-disabled") === "true") {
      return;
    }
    event.preventDefault();
    const position = target.classList.contains("is-drop-after") ? "after" : "before";
    const beforePart = getLabelSortDropPart(target, position);
    clearLabelSortDropState();
    if (part !== beforePart) {
      moveLabelPart(part, beforePart);
    }
  });

  el.newCustomSignInput.addEventListener("input", () => renderCustomSignPreview(el.newCustomSignInput, el.newCustomSignPreview));
  el.editCustomSignInput.addEventListener("input", () => renderCustomSignPreview(el.editCustomSignInput, el.editCustomSignPreview));
  el.newSignSearch.addEventListener("input", () => rendersignPicker(el.newsignGrid, getSelectedsigns(el.newsignGrid)));
  el.editSignSearch.addEventListener("input", () => rendersignPicker(el.editsignGrid, getSelectedsigns(el.editsignGrid)));
  [el.newUnicodeHelpButton, el.editUnicodeHelpButton].forEach((button) => {
    button.addEventListener("click", () => {
      // Open a dedicated Unicode search site so users can find symbol code points.
      window.open(UNICODE_SEARCH_URL, "_blank", "noopener");
    });
  });

  el.labelFont.addEventListener("change", renderLabels);
  el.codeType.addEventListener("change", () => {
    // Persist the selected item's code type when the renderer type changes.
    if (state.selectedItem) {
      state.selectedItem.codeType = normalizeCodeType(el.codeType.value);
      saveCatalog();
      renderSearchOptions();
      renderSelectedItem();
    }
    renderLabels();
  });

  el.themeSelect.addEventListener("change", () => {
    // Apply theme changes from the settings dropdown.
    applyTheme(el.themeSelect.value);
    saveSettings();
  });

  window.addEventListener("resize", () => {
    applyPreviewZoom();
  });
}

async function init() {
  // Start the app by loading settings, catalog data, and the first visible preview.
  populateEditColorPresets();
  bindEvents();
  loadSettings();
  setupCollapsibleGroups();
  await loadImagesigns();

  try {
    await loadCatalog();
    loadPresets();
  } catch (error) {
    state.catalog = normalizeCatalog({ items: [] });
    syncPresetsFromCatalog();
    el.catalogMeta.textContent = t("status.importCodesToStart");
    console.error(error);
  }

  await loadMessages(state.locale);
  applyTranslations();
  updateCatalogMeta();
  handleSharedLabelFromUrl();
  renderSearchOptions();
  renderLabels();
  requestAnimationFrame(() => {
    // Start with a fitted preview unless the user has already saved a zoom value.
    if (!state.hasSavedPreviewZoom) {
      fitPreviewToWindow();
    }
  });
}

init();
