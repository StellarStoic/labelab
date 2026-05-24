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
const BUILT_IN_GRID_PRESETS = ["5x15", "4x16", "3x10", "2x8"];

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
const FREESTYLE_MIN_SIZE_PERCENT = 3;
const FREESTYLE_DEFAULT_WIDTH_PERCENT = 24;
const FREESTYLE_DEFAULT_HEIGHT_PERCENT = 9;
const FREESTYLE_TOOLS = ["resize", "rotate", "move"];
const FREESTYLE_IMAGE_TYPES = ["image/svg+xml", "image/png", "image/jpeg", "image/webp", "image/gif"];
const FREESTYLE_IMAGE_MAX_BYTES = 2 * 1024 * 1024;
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
  catalog: { lastUpdate: "", totalItems: 0, totalCategories: 0, totalPresets: 0, totalSheets: 0, favoriteGrids: [], globalSettings: { favoriteGrids: [] }, labelSheets: [], categories: [], presets: [], items: [] },
  selectedItem: null,
  selectedCategory: null,
  selectedSheet: null,
  previewZoom: 1,
  hasSavedPreviewZoom: false,
  hasSavedCollapsedGroups: false,
  measurementUnit: "metric",
  locale: DEFAULT_LOCALE,
  messages: {},
  presets: [],
  collapsedGroups: {},
  collapsedCatalogCategories: {},
  categoryPresetFilter: "all",
  categoryEditCheckedKeys: new Set(),
  selectedItemSettingsBaseline: "",
  selectedSheetSettingsBaseline: "",
  paperPan: null,
  pendingImport: null,
  scannerStream: null,
  scannerFrameId: null,
  scannerDetector: null,
  imageSigns: [],
  labelPartOrder: ["top", "main", "bottom"],
  labelSortDrop: null,
  sheetQueue: [],
  pendingCatalogInsert: false,
  freestyleObjects: [],
  activeFreestyleObjectId: "",
  freestylePointer: null,
  freestyleHandleMoved: false,
  favoriteGrids: [],
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
  renamePresetButton: document.querySelector("#renamePresetButton"),
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
  createCategoryButton: document.querySelector("#createCategoryButton"),
  codeType: document.querySelector("#codeType"),
  labelFont: document.querySelector("#labelFont"),
  textAlignGroup: document.querySelector("#textAlignGroup"),
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
  saveGridButton: document.querySelector("#saveGridButton"),
  removeGridButton: document.querySelector("#removeGridButton"),
  favoriteGridList: document.querySelector("#favoriteGridList"),
  sheetFillMode: document.querySelector("#sheetFillMode"),
  saveSheetButton: document.querySelector("#saveSheetButton"),
  sequenceSheetControls: document.querySelector("#sequenceSheetControls"),
  sequenceStart: document.querySelector("#sequenceStart"),
  sequenceEnd: document.querySelector("#sequenceEnd"),
  sequenceStep: document.querySelector("#sequenceStep"),
  sequencePad: document.querySelector("#sequencePad"),
  sequencePrefix: document.querySelector("#sequencePrefix"),
  sequenceSuffix: document.querySelector("#sequenceSuffix"),
  queueSheetControls: document.querySelector("#queueSheetControls"),
  addSelectedToQueueButton: document.querySelector("#addSelectedToQueueButton"),
  clearQueueButton: document.querySelector("#clearQueueButton"),
  selectFreestyleImageButton: document.querySelector("#selectFreestyleImageButton"),
  freestyleImageInput: document.querySelector("#freestyleImageInput"),
  queueCustomTitle: document.querySelector("#queueCustomTitle"),
  queueCustomSigns: document.querySelector("#queueCustomSigns"),
  mixSignSearch: document.querySelector("#mixSignSearch"),
  mixsignGrid: document.querySelector("#mixsignGrid"),
  addCustomToQueueButton: document.querySelector("#addCustomToQueueButton"),
  sheetQueueList: document.querySelector("#sheetQueueList"),
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
  itemEditIgnoreDuplicateButton: document.querySelector("#itemEditIgnoreDuplicateButton"),
  itemEditLockButton: document.querySelector("#itemEditLockButton"),
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
  categoryEditLockButton: document.querySelector("#categoryEditLockButton"),
  categoryNameInput: document.querySelector("#categoryNameInput"),
  categoryColorInput: document.querySelector("#categoryColorInput"),
  categoryPresetSelect: document.querySelector("#categoryPresetSelect"),
  applyCategoryPresetButton: document.querySelector("#applyCategoryPresetButton"),
  clearCategoryPresetButton: document.querySelector("#clearCategoryPresetButton"),
  categoryPresetFilters: document.querySelector("#categoryPresetFilters"),
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
  saveItemSetupButton: document.querySelector("#saveItemSetupButton"),
  freestyleTrash: document.querySelector("#freestyleTrash"),
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

function showStatusToast(message, duration = 2600) {
  // Show one shared top status banner for short non-blocking app messages.
  el.copyToast.textContent = message;
  el.copyToast.classList.add("is-visible");
  window.clearTimeout(showCopyToast.timeoutId);
  showCopyToast.timeoutId = window.setTimeout(() => {
    el.copyToast.classList.remove("is-visible");
  }, duration);
}

function showModeChangedToast(previousMode, nextMode) {
  // Tell the user only when an action actually changes the active sheet mode.
  if (normalizeSheetFillMode(previousMode) === normalizeSheetFillMode(nextMode)) {
    return;
  }
  showStatusToast(t("status.modeChanged", { mode: t(getSheetModeLabelKey(nextMode)) }), 5000);
}

function stripPinFieldsForShare(value) {
  // Remove PIN lock secrets from any object before it is encoded into a share link.
  if (Array.isArray(value)) {
    return value.map(stripPinFieldsForShare);
  }
  if (!value || typeof value !== "object") {
    return value;
  }

  return Object.entries(value).reduce((cleanValue, [key, entryValue]) => {
    if (key === "lockPin" || key === "pin") {
      return cleanValue;
    }
    cleanValue[key] = stripPinFieldsForShare(entryValue);
    return cleanValue;
  }, {});
}

function encodeSharePayload(payload) {
  // Encode JSON safely for a URL hash without requiring a server.
  const json = JSON.stringify(stripPinFieldsForShare(payload));
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

function createSheetId(name, index = Date.now()) {
  // Create a stable local sheet id for saved repeat, sequence, and mixed label sheets.
  const source = `${name || "sheet"}-${index}`;
  return `sheet-${source.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
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

function normalizePinLock(rawEntry) {
  // Normalize optional PIN lock fields from imported or older catalog data.
  const pin = String(rawEntry?.lockPin || rawEntry?.pin || "").trim();
  return {
    locked: Boolean(rawEntry?.locked && pin),
    lockPin: pin,
  };
}

function isCatalogEntryLocked(entry) {
  // Treat entries as locked only when both the flag and PIN are present.
  return Boolean(entry?.locked && entry?.lockPin);
}

function getLockIcon(entry) {
  // Return the compact icon used by catalog item and category lock buttons.
  return isCatalogEntryLocked(entry) ? "🔒" : "🔓";
}

function updateLockButton(button, entry) {
  // Keep lock buttons visually and semantically aligned with the entry state.
  if (!button) {
    return;
  }

  const locked = isCatalogEntryLocked(entry);
  button.closest(".lock-edit-row")?.classList.toggle("is-unlocked", !locked);
  button.textContent = getLockIcon(entry);
  button.title = locked ? t("action.unlockPinLock") : t("action.lockPinLock");
  button.setAttribute("aria-label", locked ? t("action.unlockPinLock") : t("action.lockPinLock"));
}

function togglePinLock(entry, name) {
  // Add or remove the lightweight PIN lock after prompting for the matching code.
  if (!entry) {
    return false;
  }

  if (isCatalogEntryLocked(entry)) {
    const pin = window.prompt(t("prompt.unlockPin", { name }), "");
    if (pin !== entry.lockPin) {
      alert(t("alert.invalidPin"));
      return false;
    }
    entry.locked = false;
    delete entry.lockPin;
    return true;
  }

  const pin = String(window.prompt(t("prompt.setPin", { name }), "") || "").trim();
  if (!pin) {
    return false;
  }
  entry.locked = true;
  entry.lockPin = pin;
  return true;
}

function alertLockedEntry(name) {
  // Explain why a catalog change was blocked by a PIN lock.
  alert(t("alert.lockedEntry", { name }));
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

function normalizeMixedLabelSigns(value) {
  // Preserve saved mixed-label sign ids during startup before the sign catalog has loaded.
  const ids = Array.isArray(value) ? value : String(value || "").split(",");
  return [...new Set(ids.map((id) => String(id).trim()).filter(Boolean))];
}

function normalizeSheetFillMode(value) {
  // Keep sheet fill behavior limited to the supported render modes.
  return ["repeat", "sequence", "queue", "freestyle"].includes(value) ? value : "repeat";
}

function normalizeTextAlign(value) {
  // Keep text alignment constrained to values that map cleanly to CSS and buttons.
  return ["left", "center", "right"].includes(value) ? value : "center";
}

function getTextJustify(align) {
  // Convert text-align into a grid justify value for label text blocks.
  if (align === "left") {
    return "start";
  }
  if (align === "right") {
    return "end";
  }
  return "center";
}

function updateTextAlignButtons() {
  // Reflect the active text alignment on the segmented button control.
  const align = normalizeTextAlign(el.textAlignGroup?.dataset.value || "center");
  el.textAlignGroup?.querySelectorAll("[data-text-align]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.textAlign === align);
  });
}

function setTextAlign(value, shouldRender = true) {
  // Store and optionally render the chosen text alignment.
  const align = normalizeTextAlign(value);
  el.textAlignGroup.dataset.value = align;
  updateTextAlignButtons();
  if (shouldRender) {
    renderLabels();
    if (normalizeSheetFillMode(el.sheetFillMode.value) === "freestyle" && state.activeFreestyleObjectId) {
      setActiveFreestyleObject(state.activeFreestyleObjectId, true);
    }
  }
}

function getSheetModeLabelKey(mode) {
  // Map stored sheet render modes to the existing visible option labels.
  if (mode === "sequence") {
    return "option.sheetFillSequence";
  }
  if (mode === "queue") {
    return "option.sheetFillQueue";
  }
  if (mode === "freestyle") {
    return "option.sheetFillFreestyle";
  }
  return "option.sheetFillRepeat";
}

function getSavedSheetGroupLabelKey(mode) {
  // Group saved sheets by the mode that created them in the catalog list.
  if (mode === "sequence") {
    return "section.savedSequenceLabels";
  }
  if (mode === "queue") {
    return "section.savedMixedLabels";
  }
  if (mode === "freestyle") {
    return "section.savedFreestyleLabels";
  }
  return "section.savedRepeatedLabels";
}

function clampNumber(value, min, max) {
  // Keep freeform percentage geometry and rotations inside practical numeric bounds.
  const number = Number.parseFloat(value);
  if (!Number.isFinite(number)) {
    return min;
  }
  return Math.min(max, Math.max(min, number));
}

function normalizeFreestyleTool(value) {
  // Keep each drawn object on one of the three supported handle behaviors.
  return FREESTYLE_TOOLS.includes(value) ? value : "resize";
}

function normalizeFreestyleStyle(value = {}) {
  // Keep per-object freestyle text styling small, printable, and safe to restore.
  return {
    labelFont: String(value.labelFont || "Arial, Helvetica, sans-serif"),
    textAlign: normalizeTextAlign(value.textAlign),
    titleSize: clampNumber(value.titleSize ?? 2.4, 0, 200),
    textMiddleBold: value.textMiddleBold === undefined ? true : Boolean(value.textMiddleBold),
    textMiddleItalic: Boolean(value.textMiddleItalic),
    experimentalTitleColor: normalizeColor(value.experimentalTitleColor, "#111827"),
  };
}

function normalizeFreestyleObjects(value) {
  // Clean saved freestyle rectangles while preserving overlap and typed multiline content.
  return (Array.isArray(value) ? value : [])
    .map((entry, index) => {
      const width = clampNumber(entry?.width, FREESTYLE_MIN_SIZE_PERCENT, 100);
      const height = clampNumber(entry?.height, FREESTYLE_MIN_SIZE_PERCENT, 100);
      const x = clampNumber(entry?.x, -100, 100);
      const y = clampNumber(entry?.y, -100, 100);
      const text = String(entry?.text || "");
      const signs = normalizeMixedLabelSigns(entry?.signs || []);
      const customSigns = parsecustomSigns(entry?.customSigns || "");
      const imageSrc = String(entry?.imageSrc || "");
      const imageName = String(entry?.imageName || "").trim();
      const labelItem = normalizeSheetQueue(entry?.labelItem ? [entry.labelItem] : [])[0] || null;
      if (!text.trim() && !signs.length && !customSigns.length && !imageSrc && !labelItem && !entry?.keepEmpty) {
        return null;
      }

      return {
        id: String(entry.id || `freestyle-${Date.now()}-${index}`),
        x,
        y,
        width,
        height,
        rotation: clampNumber(entry?.rotation, -360, 360),
        tool: normalizeFreestyleTool(entry?.tool),
        text,
        signs,
        customSigns,
        imageSrc,
        imageName,
        labelItem,
        locked: Boolean(entry?.locked || labelItem?.locked),
        lockedSettings: normalizeLockedSheetSettings(entry?.lockedSettings || labelItem?.lockedSettings),
        style: normalizeFreestyleStyle(entry?.style || entry || {}),
      };
    })
    .filter(Boolean);
}

function normalizeSheetQueue(value) {
  // Clean temporary sheet queue entries without requiring them to be full catalog records.
  return (Array.isArray(value) ? value : [])
    .map((entry, index) => {
      const title = String(entry.title || "").trim();
      const codeType = normalizeCodeType(entry.codeType || "code128");
      const code = normalizeCodeForType(entry.code || "", codeType);
      const signs = normalizeMixedLabelSigns(entry.signs || []);
      const customSigns = parsecustomSigns(entry.customSigns || "");
      if (!title && !code && !signs.length && !customSigns.length) {
        return null;
      }

      const queueEntry = {
        id: String(entry.id || `sheet-entry-${Date.now()}-${index}`),
        title,
        code,
        codeType,
        labelMode: normalizeLabelMode(entry.labelMode, { code, signs, customSigns }),
        signs,
        customSigns,
        signalWord: String(entry.signalWord || "").trim(),
        color: normalizeColor(entry.color),
        category: "",
        presetId: "",
        textAbove: String(entry.textAbove || "").trim(),
        textBelow: String(entry.textBelow || "").trim(),
        quantity: Math.max(1, Number.parseInt(entry.quantity, 10) || 1),
        locked: Boolean(entry.locked),
        lockedSettings: normalizeLockedSheetSettings(entry.lockedSettings),
        settings: normalizeLockedSheetSettings(entry.settings),
      };
      return queueEntry;
    })
    .filter(Boolean);
}

function normalizeLockedSheetSettings(settings) {
  // Keep only label style and sheet-layout values needed to render or warn for locked queue rows.
  if (!settings || typeof settings !== "object") {
    return null;
  }

  const allowedKeys = [
    "measurementUnit",
    "paperSize",
    "paperOrientation",
    "paperWidth",
    "paperHeight",
    "gridPreset",
    "columns",
    "rows",
    "marginLeft",
    "marginRight",
    "marginTop",
    "marginBottom",
    "gapX",
    "gapY",
    "codeType",
    "labelFont",
    "textAlign",
    "titleSize",
    "codeTextSize",
    "textAboveSize",
    "textBelowSize",
    "codePaddingLeft",
    "codePaddingRight",
    "codePaddingTop",
    "codePaddingBottom",
    "barcodeMaxHeight",
    "qrMaxSize",
    "signMaxSize",
    "signPaddingLeft",
    "signPaddingRight",
    "signPaddingTop",
    "signPaddingBottom",
    "includeTitle",
    "includeCodeNumber",
    "includeTextAbove",
    "includeTextBelow",
    "titleBold",
    "titleItalic",
    "codeBold",
    "codeItalic",
    "textMiddleBold",
    "textMiddleItalic",
    "textAboveBold",
    "textAboveItalic",
    "textBelowBold",
    "textBelowItalic",
    "experimentalLabelBackground",
    "experimentalBarcodeColor",
    "experimentalTitleColor",
    "experimentalCodeNumberColor",
    "labelPartOrder",
  ];
  const snapshot = allowedKeys.reduce((cleanSettings, key) => {
    if (settings[key] !== undefined) {
      cleanSettings[key] = key === "labelPartOrder" ? normalizeLabelPartOrder(settings[key]) : settings[key];
    }
    return cleanSettings;
  }, {});
  snapshot.textAlign = normalizeTextAlign(snapshot.textAlign);
  return snapshot;
}

function createGridId(name, columns, rows) {
  // Create a stable favorite-grid id from its name and dimensions.
  const slug = String(name || `${columns}x${rows}`)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `grid-${slug || "sheet"}-${columns}x${rows}`;
}

function normalizeFavoriteGrids(value) {
  // Keep global favorite grids as small reusable column/row presets.
  const gridsById = new Map();
  (Array.isArray(value) ? value : []).forEach((grid) => {
    const columns = Math.max(1, Number.parseInt(grid?.columns, 10) || 0);
    const rows = Math.max(1, Number.parseInt(grid?.rows, 10) || 0);
    const name = String(grid?.name || `${columns} x ${rows}`).trim();
    if (!columns || !rows || !name) {
      return;
    }

    const id = String(grid.id || createGridId(name, columns, rows));
    gridsById.set(id, {
      id,
      name,
      columns,
      rows,
      updatedAt: grid.updatedAt || new Date().toISOString(),
    });
  });
  return [...gridsById.values()].sort((a, b) => a.name.localeCompare(b.name));
}

function normalizeLabelSheet(rawSheet, index = Date.now()) {
  // Normalize saved sheet entries without mixing them into single catalog items.
  const name = String(rawSheet?.name || rawSheet?.title || "").trim();
  const settings = rawSheet?.settings && typeof rawSheet.settings === "object" ? rawSheet.settings : null;
  if (!name || !settings) {
    return null;
  }

  const mode = normalizeSheetFillMode(rawSheet.mode || settings.sheetFillMode);
  return {
    id: String(rawSheet.id || createSheetId(name, index)),
    name,
    mode,
    settings: {
      ...settings,
      sheetFillMode: mode,
      sheetQueue: normalizeSheetQueue(settings.sheetQueue),
      freestyleObjects: normalizeFreestyleObjects(settings.freestyleObjects),
    },
    updatedAt: rawSheet.updatedAt || new Date().toISOString(),
  };
}

function normalizeLabelSheets(value) {
  // Keep saved label sheets exportable and searchable by id.
  const sheetsById = new Map();
  (Array.isArray(value) ? value : []).forEach((sheet, index) => {
    const normalized = normalizeLabelSheet(sheet, index);
    if (normalized) {
      sheetsById.set(normalized.id, normalized);
    }
  });
  return [...sheetsById.values()].sort((a, b) => a.name.localeCompare(b.name));
}

function normalizeLabelPartOrder(value) {
  // Keep only the three known movable label regions in a stable order.
  const parts = Array.isArray(value) ? value : String(value || "").split(",");
  const cleanParts = parts.filter((part) => ["top", "main", "bottom"].includes(part));
  return [...new Set([...cleanParts, "top", "main", "bottom"])];
}

function resetLabelPartOrder() {
  // Reset sortable label regions before applying item-specific or preset-specific order.
  state.labelPartOrder = normalizeLabelPartOrder();
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
  document.querySelectorAll("[data-i18n-html]").forEach((node) => {
    // Render trusted local translation snippets that intentionally include simple links.
    node.innerHTML = t(node.dataset.i18nHtml);
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
  renderGridPresetOptions();
  updateCategoryOptions();
  renderSheetFillControls();
  rendersignPicker(el.newsignGrid, getSelectedsigns(el.newsignGrid));
  rendersignPicker(el.mixsignGrid, getSelectedsigns(el.mixsignGrid));
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

    const collapsed = state.hasSavedCollapsedGroups ? Boolean(state.collapsedGroups[key]) : true;
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
  const favoriteGrids = normalizeFavoriteGrids(rawCatalog?.favoriteGrids || rawCatalog?.globalSettings?.favoriteGrids || []);
  const labelSheets = normalizeLabelSheets(rawCatalog?.labelSheets || rawCatalog?.sheets || []);
  const presetIdByName = new Map(presets.map((preset) => [preset.name.toLocaleLowerCase(), preset.id]));
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
      ...normalizePinLock(category),
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
      const itemSettings = getItemPresetSettings(item.settings || item.itemSettings || item.labelSettings);
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
        presetId: String(item.presetId || presetIdByName.get(String(item.presetName || item.preset || "").trim().toLocaleLowerCase()) || "").trim(),
        settings: itemSettings || undefined,
        textAbove: String(item.textAbove || item.upperText || "").trim(),
        textBelow: String(item.textBelow || item.lowerText || "").trim(),
        ...normalizePinLock(item),
      };
    })
    .filter((item) => item.title);

  const categories = [...categoriesByName.values()].sort((a, b) => a.name.localeCompare(b.name));

  return {
    lastUpdate: rawCatalog?.lastUpdate || new Date().toISOString(),
    totalItems: cleanedItems.length,
    totalCategories: categories.length,
    totalPresets: presets.length,
    totalSheets: labelSheets.length,
    favoriteGrids,
    globalSettings: {
      favoriteGrids,
    },
    labelSheets,
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
  state.catalog.items.forEach((item) => {
    // Strip sheet-composition data from catalog item setup before persisting/exporting.
    const itemSettings = getItemPresetSettings(item.settings);
    const pinLock = normalizePinLock(item);
    if (itemSettings) {
      item.settings = itemSettings;
    } else {
      delete item.settings;
    }
    item.locked = pinLock.locked;
    if (pinLock.locked) {
      item.lockPin = pinLock.lockPin;
    } else {
      delete item.lockPin;
    }
  });
  state.catalog.categories.forEach((category) => {
    // Keep category locks exportable without leaving partial lock state behind.
    const pinLock = normalizePinLock(category);
    category.locked = pinLock.locked;
    if (pinLock.locked) {
      category.lockPin = pinLock.lockPin;
    } else {
      delete category.lockPin;
    }
  });
  state.catalog.totalItems = state.catalog.items.length;
  state.catalog.categories.sort((a, b) => a.name.localeCompare(b.name));
  state.catalog.totalCategories = state.catalog.categories.length;
  state.catalog.presets = Array.isArray(state.catalog.presets) ? state.catalog.presets.map(normalizePreset).filter(Boolean) : [];
  state.catalog.presets.sort((a, b) => a.name.localeCompare(b.name));
  state.catalog.totalPresets = state.catalog.presets.length;
  state.catalog.labelSheets = normalizeLabelSheets(state.catalog.labelSheets);
  state.catalog.totalSheets = state.catalog.labelSheets.length;
  state.presets = state.catalog.presets;
  state.catalog.favoriteGrids = normalizeFavoriteGrids(state.favoriteGrids);
  state.catalog.globalSettings = {
    ...(state.catalog.globalSettings || {}),
    favoriteGrids: state.catalog.favoriteGrids,
  };
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
    syncFavoriteGridsFromCatalog();
    saveCatalog({ touch: false });
    return;
  }

  const response = await fetch("codes.json", { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Could not load codes.json");
  }

  state.catalog = normalizeCatalog(await response.json());
  syncFavoriteGridsFromCatalog();
  saveCatalog({ touch: false });
}

function syncPresetsFromCatalog() {
  // Keep the legacy in-memory preset reference pointed at the catalog-backed presets.
  state.catalog.presets = Array.isArray(state.catalog.presets) ? state.catalog.presets.map(normalizePreset).filter(Boolean) : [];
  state.presets = state.catalog.presets;
  state.catalog.labelSheets = normalizeLabelSheets(state.catalog.labelSheets);
}

function syncFavoriteGridsFromCatalog() {
  // Merge catalog-backed favorite grids into global settings so export/import carries them.
  const gridsById = new Map(state.favoriteGrids.map((grid) => [grid.id, grid]));
  normalizeFavoriteGrids(state.catalog.favoriteGrids || state.catalog.globalSettings?.favoriteGrids || []).forEach((grid) => {
    gridsById.set(grid.id, grid);
  });
  state.favoriteGrids = normalizeFavoriteGrids([...gridsById.values()]);
  state.catalog.favoriteGrids = state.favoriteGrids;
  state.catalog.globalSettings = {
    ...(state.catalog.globalSettings || {}),
    favoriteGrids: state.favoriteGrids,
  };
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
  if (el.categoryEditModal.classList.contains("is-open")) {
    populateCategoryPresetSelect();
  }
}

function getSelectedPreset() {
  // Return the currently selected preset object, if any.
  return state.presets.find((preset) => preset.id === el.presetSelect.value) || null;
}

function getPresetById(presetId) {
  // Look up a catalog-backed preset by item reference.
  return state.presets.find((preset) => preset.id === presetId) || null;
}

function getItemPresetSettings(settings) {
  // Keep catalog-item setup to repeat-label style/grid values, excluding sheet composition data.
  if (!settings || typeof settings !== "object") {
    return null;
  }

  const {
    locale,
    theme,
    sheetFillMode,
    sheetQueue,
    freestyleObjects,
    sequenceStart,
    sequenceEnd,
    sequenceStep,
    sequencePad,
    sequencePrefix,
    sequenceSuffix,
    selectedItemKey,
    selectedItemCode,
    collapsedGroups,
    collapsedCatalogCategories,
    ...itemSettings
  } = settings;
  return Object.keys(itemSettings).length ? itemSettings : null;
}

function getCurrentItemSettingsSnapshot() {
  // Capture only the settings that belong to a reusable catalog label setup.
  return getItemPresetSettings(collectSettingsSnapshot()) || {};
}

function stableStringify(value) {
  // Serialize settings with sorted keys so equivalent snapshots compare consistently.
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(",")}]`;
  }
  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

function captureSelectedItemSettingsBaseline() {
  // Remember the setup currently shown for the selected item so switching can detect unsaved edits.
  state.selectedItemSettingsBaseline = state.selectedItem ? stableStringify(getCurrentItemSettingsSnapshot()) : "";
}

function captureSelectedSheetSettingsBaseline() {
  // Remember the setup currently shown for the selected saved sheet so the floating save action only appears after edits.
  state.selectedSheetSettingsBaseline = state.selectedSheet ? stableStringify(collectSavedSheetSettings()) : "";
}

function isSavedCatalogItem(item) {
  // Confirm the selected item exists in the editable catalog before saving item-level setup data.
  return Boolean(item && state.catalog.items.some((catalogItem) => catalogItem === item || getItemKey(catalogItem) === getItemKey(item)));
}

function selectedItemHasUnsavedSetupChanges() {
  // Compare the active controls to the setup shown when this catalog item was selected or saved.
  return Boolean(isSavedCatalogItem(state.selectedItem) && state.selectedItemSettingsBaseline && stableStringify(getCurrentItemSettingsSnapshot()) !== state.selectedItemSettingsBaseline);
}

function selectedSheetHasUnsavedSetupChanges() {
  // Compare the active controls to the setup shown when this saved sheet was selected or saved.
  const activeMode = normalizeSheetFillMode(el.sheetFillMode.value);
  return Boolean(
    state.selectedSheet &&
      normalizeSheetFillMode(state.selectedSheet.mode) === activeMode &&
      state.selectedSheetSettingsBaseline &&
      stableStringify(collectSavedSheetSettings()) !== state.selectedSheetSettingsBaseline,
  );
}

function updateCurrentSaveButtonVisibility() {
  // Show the floating save button only when a selected catalog label or saved sheet has unsaved setup changes.
  el.saveItemSetupButton.classList.toggle(
    "is-hidden",
    !selectedSheetHasUnsavedSetupChanges() &&
      !(selectedItemHasUnsavedSetupChanges() && !isCatalogEntryLocked(state.selectedItem) && !state.selectedSheet && !state.selectedCategory),
  );
}

function applyItemPreset(item) {
  // Apply the assigned preset first, then overlay any item-specific saved setup such as alignment.
  const itemSettings = getItemPresetSettings(item?.settings);
  const preset = getPresetById(item?.presetId);
  let didApplySettings = false;
  setTextAlign("center", false);
  resetLabelPartOrder();
  if (preset) {
    applySettingsSnapshot(getItemPresetSettings(preset.settings));
    el.presetSelect.value = preset.id;
    didApplySettings = true;
  } else {
    el.presetSelect.value = "";
  }

  if (itemSettings) {
    applySettingsSnapshot(itemSettings);
    el.presetSelect.value = state.presets.some((savedPreset) => savedPreset.id === item?.presetId) ? item.presetId : "";
    didApplySettings = true;
  }
  return didApplySettings;
}

function saveCurrentSetupToSelectedItem() {
  // Store the current paper, grid, and label styling directly on the selected catalog item.
  if (!isSavedCatalogItem(state.selectedItem)) {
    alert(t("alert.selectItemForSetup"));
    return;
  }
  if (isCatalogEntryLocked(state.selectedItem)) {
    alertLockedEntry(state.selectedItem.title);
    return;
  }
  if (!window.confirm(t("confirm.saveItemSetup", { title: state.selectedItem.title }))) {
    return;
  }

  state.selectedItem.settings = getCurrentItemSettingsSnapshot();
  saveCatalog();
  captureSelectedItemSettingsBaseline();
  updateCurrentSaveButtonVisibility();
  showStatusToast(t("status.itemSetupSaved", { title: state.selectedItem.title }));
  renderSearchOptions();
}

function saveCurrentWork() {
  // Use one save action: saved sheets for sheet modes, item setup for normal repeat labels.
  if (state.selectedSheet || normalizeSheetFillMode(el.sheetFillMode.value) !== "repeat") {
    saveCurrentSheet();
    return;
  }

  saveCurrentSetupToSelectedItem();
}

function clearSelectedCatalogItemContext() {
  // Remove catalog item selection when the user starts building a non-repeat sheet.
  state.selectedItem = null;
  state.selectedCategory = null;
  state.selectedItemSettingsBaseline = "";
  state.selectedSheetSettingsBaseline = "";
  el.presetSelect.value = "";
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
    if (isCatalogEntryLocked(state.selectedItem)) {
      alertLockedEntry(state.selectedItem.title);
      return;
    }
    state.selectedItem.presetId = preset.id;
    state.selectedItem.settings = getItemPresetSettings(preset.settings);
    saveCatalog();
  }
  setTextAlign("center", false);
  resetLabelPartOrder();
  applySettingsSnapshot(preset.settings);
  el.presetSelect.value = preset.id;
  captureSelectedItemSettingsBaseline();
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

function renameSelectedPreset() {
  // Rename the selected preset while keeping its id stable for catalog item assignments.
  const preset = getSelectedPreset();
  if (!preset) {
    alert(t("alert.selectPreset"));
    return;
  }

  const oldName = preset.name;
  const nextName = window.prompt(t("prompt.renamePreset"), oldName)?.trim();
  if (!nextName || nextName === oldName) {
    return;
  }
  const duplicate = state.presets.some((savedPreset) => savedPreset.id !== preset.id && savedPreset.name.toLocaleLowerCase() === nextName.toLocaleLowerCase());
  if (duplicate) {
    alert(t("alert.duplicatePresetName"));
    return;
  }
  if (!window.confirm(t("confirm.renamePreset", { oldName, newName: nextName }))) {
    return;
  }

  preset.name = nextName;
  preset.updatedAt = new Date().toISOString();
  state.catalog.items.forEach((item) => {
    if (item.presetName === oldName || item.preset === oldName) {
      item.presetName = nextName;
      item.preset = nextName;
      item.presetId = preset.id;
    }
  });
  savePresets();
  renderPresetOptions();
  el.presetSelect.value = preset.id;
  renderSearchOptions();
  renderSelectedItem();
  renderLabels();
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
      favoriteGrids: state.favoriteGrids,
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
      sheetFillMode: el.sheetFillMode.value,
      sequenceStart: Number.parseInt(el.sequenceStart.value, 10) || 1,
      sequenceEnd: Number.parseInt(el.sequenceEnd.value, 10) || 1,
      sequenceStep: Number.parseInt(el.sequenceStep.value, 10) || 1,
      sequencePad: Math.max(0, Number.parseInt(el.sequencePad.value, 10) || 0),
      sequencePrefix: el.sequencePrefix.value,
      sequenceSuffix: el.sequenceSuffix.value,
      sheetQueue: normalizeSheetQueue(state.sheetQueue),
      freestyleObjects: state.freestyleObjects,
      collapsedGroups: state.collapsedGroups,
      collapsedCatalogCategories: state.collapsedCatalogCategories,
    }),
  );
}

function loadSettings() {
  // Apply saved settings or start with practical defaults.
  const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
  state.hasSavedPreviewZoom = saved.previewZoom !== undefined;
  state.hasSavedCollapsedGroups = saved.collapsedGroups !== undefined;
  state.collapsedGroups = saved.collapsedGroups || {};
  state.collapsedCatalogCategories = saved.collapsedCatalogCategories || {};
  state.labelPartOrder = normalizeLabelPartOrder(saved.labelPartOrder);
  state.sheetQueue = normalizeSheetQueue(saved.sheetQueue);
  state.freestyleObjects = normalizeFreestyleObjects(saved.freestyleObjects);
  state.favoriteGrids = normalizeFavoriteGrids(saved.favoriteGrids);
  state.measurementUnit = saved.measurementUnit || "metric";
  state.locale = saved.locale || DEFAULT_LOCALE;
  el.measurementUnit.value = state.measurementUnit;
  el.languageSelect.value = state.locale;
  updateUnitLabels();
  renderGridPresetOptions(saved.gridPreset || "5x15");
  el.paperSize.value = saved.paperSize || "A4";
  el.paperOrientation.value = saved.paperOrientation || "portrait";
  applyPaperPreset(saved.paperWidth, saved.paperHeight);
  el.gridPreset.value = saved.gridPreset || "5x15";
  applyGridPreset(saved.columns, saved.rows);
  el.sheetFillMode.value = normalizeSheetFillMode(saved.sheetFillMode);
  el.sequenceStart.value = Number.isFinite(Number(saved.sequenceStart)) ? saved.sequenceStart : 1;
  el.sequenceEnd.value = Number.isFinite(Number(saved.sequenceEnd)) ? saved.sequenceEnd : 15;
  el.sequenceStep.value = Number.isFinite(Number(saved.sequenceStep)) ? saved.sequenceStep : 1;
  el.sequencePad.value = Math.max(0, Number.parseInt(saved.sequencePad, 10) || 0);
  el.sequencePrefix.value = String(saved.sequencePrefix || "");
  el.sequenceSuffix.value = String(saved.sequenceSuffix || "");

  ["marginLeft", "marginRight", "marginTop", "marginBottom", "gapX", "gapY"].forEach((key) => {
    if (saved[key] !== undefined) {
      setMeasurementValue(el[key], saved[key]);
    }
  });

  applySavedTypography(saved);
  setTextAlign("center", false);
  setColorInputValue(el.experimentalLabelBackground, saved.experimentalLabelBackground ?? saved.experimentalListBackground, "#ffffff");
  setColorInputValue(el.experimentalBarcodeColor, saved.experimentalBarcodeColor ?? saved.experimentalCodeColor, "#111111");
  setColorInputValue(el.experimentalTitleColor, saved.experimentalTitleColor ?? saved.experimentalFontColor, "#111827");
  setColorInputValue(el.experimentalCodeNumberColor, saved.experimentalCodeNumberColor ?? saved.experimentalFontColor, "#111827");
  el.experimentalPrintCount.value = Math.max(0, Number.parseInt(saved.experimentalPrintCount, 10) || 0);
  applyExperimentalStyles();
  state.previewZoom = clampZoom(Number.parseFloat(saved.previewZoom) || 1);
  const theme = saved.theme || (saved.dark ? "dark" : "light");
  applyTheme(theme);
  renderSheetFillControls();
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
  if (snapshot.textAlign !== undefined) {
    setTextAlign(snapshot.textAlign, false);
  }
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
  if (snapshot.sheetFillMode !== undefined) {
    el.sheetFillMode.value = normalizeSheetFillMode(snapshot.sheetFillMode);
  }
  if (snapshot.sequenceStart !== undefined) {
    el.sequenceStart.value = Number.parseInt(snapshot.sequenceStart, 10) || 1;
  }
  if (snapshot.sequenceEnd !== undefined) {
    el.sequenceEnd.value = Number.parseInt(snapshot.sequenceEnd, 10) || 1;
  }
  if (snapshot.sequenceStep !== undefined) {
    el.sequenceStep.value = Number.parseInt(snapshot.sequenceStep, 10) || 1;
  }
  if (snapshot.sequencePad !== undefined) {
    el.sequencePad.value = Math.max(0, Number.parseInt(snapshot.sequencePad, 10) || 0);
  }
  if (snapshot.sequencePrefix !== undefined) {
    el.sequencePrefix.value = String(snapshot.sequencePrefix || "");
  }
  if (snapshot.sequenceSuffix !== undefined) {
    el.sequenceSuffix.value = String(snapshot.sequenceSuffix || "");
  }
  if (snapshot.sheetQueue !== undefined) {
    state.sheetQueue = normalizeSheetQueue(snapshot.sheetQueue);
  }
  if (snapshot.freestyleObjects !== undefined) {
    state.freestyleObjects = normalizeFreestyleObjects(snapshot.freestyleObjects);
    state.activeFreestyleObjectId = state.freestyleObjects[0]?.id || "";
    if (state.activeFreestyleObjectId) {
      applyFreestyleStyleToControls(state.freestyleObjects[0].style);
    }
  }
  applyExperimentalStyles();
  renderSheetFillControls();
  state.measurementUnit = el.measurementUnit.value || previousUnit;
}

function findItemFromSheetSettings(settings) {
  // Resolve a saved repeat sheet back to its catalog item by id first, then code.
  if (!settings) {
    return null;
  }

  return (
    state.catalog.items.find((item) => getItemKey(item) === settings.selectedItemKey) ||
    state.catalog.items.find((item) => item.code && item.code === settings.selectedItemCode) ||
    null
  );
}

function applySavedSheet(sheet) {
  // Restore a saved repeat, sequence, or mixed label sheet from the catalog.
  const previousMode = normalizeSheetFillMode(el.sheetFillMode.value);
  state.pendingCatalogInsert = false;
  state.selectedSheet = sheet;
  state.selectedCategory = null;
  setTextAlign("center", false);
  resetLabelPartOrder();
  applySettingsSnapshot(sheet.settings);
  state.selectedItem = sheet.mode === "repeat" ? findItemFromSheetSettings(sheet.settings) : null;
  captureSelectedSheetSettingsBaseline();
  renderSelectedItem();
  renderSearchOptions();
  renderLabels();
  const nextMode = normalizeSheetFillMode(el.sheetFillMode.value);
  showModeChangedToast(previousMode, nextMode);
  saveSettings();
}

function saveCurrentSheet() {
  // Save the current sheet mode and settings as a reusable catalog sheet.
  const mode = normalizeSheetFillMode(el.sheetFillMode.value);
  const hasRepeatItem = mode === "repeat" && state.selectedItem;
  const hasSequence = mode === "sequence";
  const hasMixedLabels = mode === "queue" && state.sheetQueue.length;
  const hasFreestyle = mode === "freestyle" && state.freestyleObjects.length;
  if (!hasRepeatItem && !hasSequence && !hasMixedLabels && !hasFreestyle) {
    alert(t("alert.noSheetToSave"));
    return;
  }

  const currentName = state.selectedSheet?.name || getSheetMetaTitle(getLabelsToPrint(getLayout().columns * getLayout().rows));
  const name = window.prompt(t("prompt.sheetName"), currentName)?.trim();
  if (!name) {
    return;
  }

  const existingBySelection = state.selectedSheet && state.catalog.labelSheets.find((sheet) => sheet.id === state.selectedSheet.id);
  const existingByName = state.catalog.labelSheets.find((sheet) => normalizeSheetFillMode(sheet.mode) === mode && sheet.name.toLocaleLowerCase() === name.toLocaleLowerCase());
  const existing = existingBySelection || existingByName || null;
  if (existing) {
    const firstWarning = window.confirm(t("confirm.overwriteSavedSheet", { name: existing.name }));
    if (!firstWarning) {
      return;
    }
    const secondWarning = window.confirm(t("confirm.overwriteSavedSheetFinal", { name: existing.name }));
    if (!secondWarning) {
      return;
    }
  }

  const savedSheet = normalizeLabelSheet({
    id: existing?.id || createSheetId(name),
    name,
    mode,
    settings: collectSavedSheetSettings(),
    updatedAt: new Date().toISOString(),
  });
  if (!savedSheet) {
    return;
  }

  if (existing) {
    Object.assign(existing, savedSheet);
    state.selectedSheet = existing;
  } else {
    state.catalog.labelSheets.push(savedSheet);
    state.selectedSheet = savedSheet;
  }
  saveCatalog();
  captureSelectedSheetSettingsBaseline();
  renderSearchOptions();
  renderSelectedItem();
}

function collectSettingsSnapshot() {
  // Capture the current label setup in millimeters so it can be restored in any unit mode.
  return {
    measurementUnit: state.measurementUnit,
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
    textAlign: normalizeTextAlign(el.textAlignGroup.dataset.value),
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
    labelPartOrder: normalizeLabelPartOrder(state.labelPartOrder),
    sheetFillMode: el.sheetFillMode.value,
    sequenceStart: Number.parseInt(el.sequenceStart.value, 10) || 1,
    sequenceEnd: Number.parseInt(el.sequenceEnd.value, 10) || 1,
    sequenceStep: Number.parseInt(el.sequenceStep.value, 10) || 1,
    sequencePad: Math.max(0, Number.parseInt(el.sequencePad.value, 10) || 0),
    sequencePrefix: el.sequencePrefix.value,
    sequenceSuffix: el.sequenceSuffix.value,
    sheetQueue: normalizeSheetQueue(state.sheetQueue),
    freestyleObjects: state.freestyleObjects,
  };
}

function collectSavedSheetSettings() {
  // Capture a reusable sheet setup plus the selected item needed for repeat sheets.
  const settings = collectSettingsSnapshot();
  if (state.selectedItem) {
    settings.selectedItemKey = getItemKey(state.selectedItem);
    settings.selectedItemCode = state.selectedItem.code || "";
  }
  return settings;
}

function collectSheetLockSettings() {
  // Capture the current visual style for one queued label without embedding the queue inside itself.
  return normalizeLockedSheetSettings({
    ...collectSettingsSnapshot(),
    textAlign: normalizeTextAlign(el.textAlignGroup.dataset.value),
  });
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

function getFavoriteGridOptionValue(id) {
  // Namespace favorite-grid option values so they cannot collide with built-in presets.
  return `favorite:${id}`;
}

function getSelectedFavoriteGrid() {
  // Resolve the selected grid preset when it points to a saved favorite grid.
  const value = el.gridPreset.value;
  if (!value.startsWith("favorite:")) {
    return null;
  }

  const id = value.slice("favorite:".length);
  return state.favoriteGrids.find((grid) => grid.id === id) || null;
}

function renderGridPresetOptions(selectedValue = el.gridPreset.value) {
  // Rebuild built-in, favorite, and custom grid choices without losing the active selection.
  el.gridPreset.innerHTML = "";
  BUILT_IN_GRID_PRESETS.forEach((preset) => {
    const option = document.createElement("option");
    option.value = preset;
    option.textContent = preset.replace("x", " x ");
    el.gridPreset.append(option);
  });
  state.favoriteGrids.forEach((grid) => {
    const option = document.createElement("option");
    option.value = getFavoriteGridOptionValue(grid.id);
    option.textContent = `${grid.name} (${grid.columns} x ${grid.rows})`;
    el.gridPreset.append(option);
  });

  const custom = document.createElement("option");
  custom.value = "Custom";
  custom.textContent = t("option.custom");
  el.gridPreset.append(custom);
  el.gridPreset.value = [...el.gridPreset.options].some((option) => option.value === selectedValue) ? selectedValue : "Custom";
  renderFavoriteGridList();
}

function applyGridPreset(savedColumns, savedRows) {
  // Split presets like 5x15 into editable column and row controls.
  const preset = el.gridPreset.value;
  const favoriteGrid = getSelectedFavoriteGrid();
  if (favoriteGrid) {
    el.columnsInput.value = favoriteGrid.columns;
    el.rowsInput.value = favoriteGrid.rows;
    return;
  }

  if (preset !== "Custom") {
    const [columns, rows] = preset.split("x").map(Number);
    el.columnsInput.value = columns;
    el.rowsInput.value = rows;
    return;
  }

  el.columnsInput.value = savedColumns || 5;
  el.rowsInput.value = savedRows || 15;
}

function getCurrentGridPreset() {
  // Capture the current sheet grid dimensions as a reusable favorite.
  const columns = Math.max(1, Number.parseInt(el.columnsInput.value, 10) || 1);
  const rows = Math.max(1, Number.parseInt(el.rowsInput.value, 10) || 1);
  return { columns, rows };
}

function persistFavoriteGrids() {
  // Save favorite grids both globally and inside the exportable catalog JSON.
  state.favoriteGrids = normalizeFavoriteGrids(state.favoriteGrids);
  renderGridPresetOptions(el.gridPreset.value);
  saveSettings();
  saveCatalog();
}

function saveCurrentGridAsFavorite() {
  // Prompt for a name and save the current columns/rows as a reusable global grid.
  const { columns, rows } = getCurrentGridPreset();
  const name = window.prompt(t("prompt.gridName"), `${columns} x ${rows}`)?.trim();
  if (!name) {
    return;
  }

  const id = createGridId(name, columns, rows);
  state.favoriteGrids = normalizeFavoriteGrids([
    ...state.favoriteGrids.filter((grid) => grid.id !== id),
    {
      id,
      name,
      columns,
      rows,
      updatedAt: new Date().toISOString(),
    },
  ]);
  renderGridPresetOptions(getFavoriteGridOptionValue(id));
  persistFavoriteGrids();
  renderLabels();
}

function removeSelectedFavoriteGrid() {
  // Remove the active favorite grid preset after confirmation.
  const favoriteGrid = getSelectedFavoriteGrid();
  if (!favoriteGrid) {
    alert(t("alert.selectFavoriteGrid"));
    return;
  }
  if (!window.confirm(t("confirm.deleteFavoriteGrid", { name: favoriteGrid.name }))) {
    return;
  }

  state.favoriteGrids = state.favoriteGrids.filter((grid) => grid.id !== favoriteGrid.id);
  el.gridPreset.value = "Custom";
  persistFavoriteGrids();
  renderLabels();
}

function renderFavoriteGridList() {
  // Show the saved favorite grids as a compact reminder below the grid controls.
  if (!el.favoriteGridList) {
    return;
  }

  el.favoriteGridList.innerHTML = "";
  if (!state.favoriteGrids.length) {
    const empty = document.createElement("p");
    empty.className = "favorite-grid-empty";
    empty.textContent = t("status.noFavoriteGrids");
    el.favoriteGridList.append(empty);
    return;
  }

  state.favoriteGrids.forEach((grid) => {
    const row = document.createElement("button");
    row.type = "button";
    row.className = "favorite-grid-chip";
    row.textContent = `${grid.name} (${grid.columns} x ${grid.rows})`;
    row.addEventListener("click", () => {
      // Selecting a favorite grid from the list applies its option and redraws the sheet.
      el.gridPreset.value = getFavoriteGridOptionValue(grid.id);
      applyGridPreset();
      renderLabels();
    });
    el.favoriteGridList.append(row);
  });
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
  const textAlign = normalizeTextAlign(el.textAlignGroup.dataset.value);
  el.paper.style.setProperty("--label-font", el.labelFont.value);
  el.paper.style.setProperty("--text-align", textAlign);
  el.paper.style.setProperty("--text-justify", getTextJustify(textAlign));
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
  // Warn only in repeat-item editing when upper/lower text controls cannot affect the active label.
  if (normalizeSheetFillMode(el.sheetFillMode.value) !== "repeat") {
    return false;
  }

  const activeItem = state.selectedItem || {
    code: normalizeCodeForType(el.newCode.value, el.codeType.value),
    labelMode: el.newLabelMode.value,
    signs: getSelectedsigns(el.newsignGrid),
    customSigns: parsecustomSigns(el.newCustomSignInput.value),
  };
  return normalizeLabelMode(activeItem.labelMode, activeItem) === "code" && Boolean(activeItem.code);
}

function shouldWarnCodeStyleControl() {
  // Warn only in repeat-item editing when Code No. controls cannot affect the active label.
  if (normalizeSheetFillMode(el.sheetFillMode.value) !== "repeat") {
    return false;
  }

  const activeItem = state.selectedItem || {
    code: normalizeCodeForType(el.newCode.value, el.codeType.value),
    labelMode: el.newLabelMode.value,
    signs: getSelectedsigns(el.newsignGrid),
    customSigns: parsecustomSigns(el.newCustomSignInput.value),
  };
  return !(normalizeLabelMode(activeItem.labelMode, activeItem) === "code" && activeItem.code);
}

function shouldWarnTitleStyleControl() {
  // Warn only when the active repeat label uses middle text instead of a separate title.
  if (normalizeSheetFillMode(el.sheetFillMode.value) !== "repeat") {
    return false;
  }

  const activeItem = state.selectedItem || {
    code: normalizeCodeForType(el.newCode.value, el.codeType.value),
    labelMode: el.newLabelMode.value,
    signs: getSelectedsigns(el.newsignGrid),
    customSigns: parsecustomSigns(el.newCustomSignInput.value),
  };
  return normalizeLabelMode(activeItem.labelMode, activeItem) === "text";
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
  if (shouldWarnTitleStyleControl()) {
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

function getPreviewZoomAnchor(event) {
  // Convert the mouse position into unscaled paper coordinates before zoom changes.
  if (!event) {
    return null;
  }

  const paperRect = el.paper.getBoundingClientRect();
  const zoom = state.previewZoom || 1;
  return {
    clientX: event.clientX,
    clientY: event.clientY,
    paperX: (event.clientX - paperRect.left) / zoom,
    paperY: (event.clientY - paperRect.top) / zoom,
  };
}

function restorePreviewZoomAnchor(anchor) {
  // Scroll the preview so the anchored paper coordinate remains under the mouse.
  if (!anchor) {
    return;
  }

  const paperRect = el.paper.getBoundingClientRect();
  const anchoredClientX = paperRect.left + anchor.paperX * state.previewZoom;
  const anchoredClientY = paperRect.top + anchor.paperY * state.previewZoom;
  el.paperWrap.scrollLeft += anchoredClientX - anchor.clientX;
  el.paperWrap.scrollTop += anchoredClientY - anchor.clientY;
}

function setPreviewZoom(nextZoom, anchorEvent = null) {
  // Update preview zoom from controls or the mouse wheel and persist the value.
  const zoom = clampZoom(nextZoom);
  if (zoom === state.previewZoom) {
    return;
  }

  const anchor = getPreviewZoomAnchor(anchorEvent);
  state.previewZoom = zoom;
  applyPreviewZoom();
  restorePreviewZoomAnchor(anchor);
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
  if (event.button !== 0 || normalizeSheetFillMode(el.sheetFillMode.value) === "freestyle" || event.target.closest?.(".freestyle-object, .freestyle-trash")) {
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
  const mode = t(getSheetModeLabelKey(normalizeSheetFillMode(el.sheetFillMode?.value)));
  el.catalogMeta.textContent = `${t("status.catalogMeta", { count: state.catalog.totalItems, updated })} | ${t("status.catalogMode", { mode })}`;
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
    locked: false,
  };
  state.catalog.categories.push(category);
  state.catalog.categories.sort((a, b) => a.name.localeCompare(b.name));
  return category;
}

function createCatalogCategoryFromAction() {
  // Create a standalone catalog category without requiring an item edit first.
  if (selectedItemHasUnsavedSetupChanges() && !window.confirm(t("confirm.unsavedItemSetup", { title: state.selectedItem.title }))) {
    return;
  }

  const name = normalizeCategoryName(window.prompt(t("prompt.categoryName"), ""));
  if (!name) {
    return;
  }

  const category = ensureCategory(name, DEFAULT_CATEGORY_COLOR);
  state.selectedItem = null;
  state.selectedSheet = null;
  state.selectedCategory = category;
  state.selectedItemSettingsBaseline = "";
  state.selectedSheetSettingsBaseline = "";
  saveCatalog();
  el.searchInput.value = "";
  updateCategoryOptions();
  renderSearchOptions();
  renderSelectedItem();
  renderLabels();
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

function toggleCatalogItemLock(item) {
  // Toggle an item's PIN lock from the catalog list or item editor.
  if (!item || !togglePinLock(item, item.title)) {
    return;
  }

  saveCatalog();
  renderSearchOptions();
  renderSelectedItem();
  if (el.itemEditModal.classList.contains("is-open") && state.selectedItem === item) {
    syncItemEditLockState();
  }
}

function toggleCatalogCategoryLock(category) {
  // Toggle a category PIN lock and cascade that state to every item currently inside it.
  if (!category || !togglePinLock(category, category.name)) {
    return;
  }

  const categoryLocked = isCatalogEntryLocked(category);
  state.catalog.items.forEach((item) => {
    if (!categoriesMatch(item.category, category.name)) {
      return;
    }

    item.locked = categoryLocked;
    if (categoryLocked) {
      item.lockPin = category.lockPin;
    } else {
      delete item.lockPin;
    }
  });
  saveCatalog();
  renderSearchOptions();
  renderSelectedItem();
  if (el.itemEditModal.classList.contains("is-open") && categoriesMatch(state.selectedItem?.category, category.name)) {
    syncItemEditLockState();
  }
  if (el.categoryEditModal.classList.contains("is-open") && state.selectedCategory === category) {
    syncCategoryEditLockState();
  }
}

function createCatalogLockButton(entry, onToggle) {
  // Build the right-side lock control used by item and category rows.
  const button = document.createElement("button");
  button.type = "button";
  button.className = "catalog-lock-button";
  updateLockButton(button, entry);
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    onToggle();
  });
  return button;
}

function renderSearchOptions() {
  // Filter by title/category/code before grouping so saved category memberships stay visible.
  const query = el.searchInput.value.trim().toLowerCase();
  const sheetMatches = state.catalog.labelSheets
    .filter((sheet) => `${sheet.name} ${t(getSheetModeLabelKey(sheet.mode))}`.toLowerCase().includes(query))
    .sort((a, b) => a.name.localeCompare(b.name));
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

  if (sheetMatches.length) {
    const sheetsByMode = new Map();
    sheetMatches.forEach((sheet) => {
      const mode = normalizeSheetFillMode(sheet.mode);
      if (!sheetsByMode.has(mode)) {
        sheetsByMode.set(mode, []);
      }
      sheetsByMode.get(mode).push(sheet);
    });
    ["repeat", "sequence", "queue", "freestyle"].forEach((mode) => {
      const sheets = sheetsByMode.get(mode) || [];
      if (!sheets.length) {
        return;
      }

      const header = document.createElement("div");
      header.className = "catalog-category";
      header.setAttribute("role", "presentation");
      header.innerHTML = `<span class="catalog-category-select">${t(getSavedSheetGroupLabelKey(mode))}</span>`;
      el.codeSelect.append(header);
      sheets.forEach((sheet) => {
        const option = document.createElement("button");
        const isSelected = state.selectedSheet?.id === sheet.id;
        const color = document.createElement("span");
        const label = document.createElement("span");
        option.type = "button";
        option.className = `catalog-option catalog-sheet-option${isSelected ? " is-selected" : ""}`;
        option.dataset.sheetId = sheet.id;
        option.setAttribute("role", "option");
        option.setAttribute("aria-selected", String(isSelected));
        color.className = "catalog-color";
        label.className = "catalog-option-label";
        label.textContent = `${sheet.name} - ${t(getSheetModeLabelKey(sheet.mode))}`;
        option.append(color, label);
        option.addEventListener("click", () => handleCatalogSheetClick(sheet));
        el.codeSelect.append(option);
      });
    });
  }

  groupCatalogMatches(matches, query).forEach(([categoryName, items]) => {
    const category = getCategory(categoryName);
    const isSelectedCategory = state.selectedCategory?.name === categoryName;
    const categoryKey = getCatalogCategoryKey(categoryName);
    const isCollapsed = !query && Boolean(state.collapsedCatalogCategories[categoryKey]);
    const header = document.createElement("div");
    const selectButton = document.createElement("button");
    const toggleButton = document.createElement("button");
    const lockButton = category ? createCatalogLockButton(category, () => toggleCatalogCategoryLock(category)) : null;
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
    if (lockButton) {
      header.append(selectButton, lockButton, toggleButton);
    } else {
      header.append(selectButton, toggleButton);
    }
    el.codeSelect.append(header);

    if (isCollapsed) {
      return;
    }

    items.forEach((item) => {
      const option = document.createElement("div");
      const isSelected = getItemKey(state.selectedItem) === getItemKey(item);
      option.className = `catalog-option${isSelected ? " is-selected" : ""}`;
      option.dataset.code = item.code;
      option.dataset.itemKey = getItemKey(item);
      option.setAttribute("role", "option");
      option.setAttribute("aria-selected", String(isSelected));
      option.tabIndex = 0;
      option.style.setProperty("--item-color", normalizeColor(item.color));

      const color = document.createElement("span");
      color.className = "catalog-color";
      const label = document.createElement("span");
      label.className = "catalog-option-label";
      const itemMeta = normalizeLabelMode(item.labelMode, item) === "sign" ? t("option.labelModeSign") : item.code || t("status.textOnly");
      label.textContent = `${item.title} - ${itemMeta}`;
      const lockButton = createCatalogLockButton(item, () => toggleCatalogItemLock(item));
      option.append(color, label, lockButton);
      option.addEventListener("click", () => handleCatalogItemClick(item));
      option.addEventListener("keydown", (event) => {
        // Preserve keyboard selection now that item rows contain their own lock button.
        if (event.target.closest(".catalog-lock-button")) {
          return;
        }
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleCatalogItemClick(item);
        }
      });
      el.codeSelect.append(option);
    });
  });

  if (!state.selectedItem && matches.length) {
    renderSelectedItem();
    renderLabels();
  }
}

function renderSelectedItem() {
  // Refresh the selected item display and enable actions only when an item exists.
  updateCurrentSaveButtonVisibility();
  if (state.selectedSheet) {
    el.selectedCode.classList.remove("is-empty");
    el.selectedTitle.textContent = state.selectedSheet.name;
    el.selectedCodeValue.textContent = t(getSheetModeLabelKey(state.selectedSheet.mode));
    el.selectedCodeValue.className = "selected-category-meta";
    el.editCodeButton.disabled = false;
    el.deleteCodeButton.disabled = false;
    return;
  }

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
  // Store the chosen catalog item as a normal repeat sheet and redraw it for printing.
  state.pendingCatalogInsert = false;
  const nextItem = itemKey ? state.catalog.items.find((item) => getItemKey(item) === itemKey || item.code === itemKey) || null : null;
  const currentKey = state.selectedItem ? getItemKey(state.selectedItem) : "";
  const nextKey = nextItem ? getItemKey(nextItem) : "";
  const previousMode = normalizeSheetFillMode(el.sheetFillMode.value);
  if (currentKey !== nextKey && selectedItemHasUnsavedSetupChanges()) {
    const shouldSwitch = window.confirm(t("confirm.unsavedItemSetup", { title: state.selectedItem.title }));
    if (!shouldSwitch) {
      return;
    }
  }

  state.selectedSheet = null;
  state.selectedCategory = null;
  state.selectedSheetSettingsBaseline = "";
  state.selectedItem = nextItem;
  if (state.selectedItem) {
    el.sheetFillMode.value = "repeat";
    const didApplyPreset = applyItemPreset(state.selectedItem);
    if (!didApplyPreset) {
      el.codeType.value = state.selectedItem.codeType;
    }
  }
  captureSelectedItemSettingsBaseline();
  renderSelectedItem();
  renderSearchOptions();
  renderLabels();
  const nextMode = normalizeSheetFillMode(el.sheetFillMode.value);
  if (state.selectedItem) {
    showModeChangedToast(previousMode, nextMode);
  }
}

function selectCategory(name) {
  // Select a category row so edit/delete actions operate on the category instead of an item.
  state.pendingCatalogInsert = false;
  state.selectedSheet = null;
  state.selectedItem = null;
  state.selectedCategory = getCategory(name);
  state.selectedItemSettingsBaseline = "";
  state.selectedSheetSettingsBaseline = "";
  renderSelectedItem();
  renderSearchOptions();
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

function getFreestyleObject(id) {
  // Find one drawn object by id so pointer and catalog actions can update it.
  return state.freestyleObjects.find((object) => object.id === id) || null;
}

function getFreestyleObjectSelector(id) {
  // Build an attribute selector for generated and imported object ids without relying on CSS.escape.
  const escapedId = String(id || "").replaceAll("\\", "\\\\").replaceAll('"', '\\"');
  return `.freestyle-object[data-id="${escapedId}"]`;
}

function getPaperPointerPoint(event) {
  // Convert a pointer location into paper-relative percentages that survive paper size changes.
  const rect = el.paper.getBoundingClientRect();
  return {
    x: clampNumber(((event.clientX - rect.left) / Math.max(1, rect.width)) * 100, -100, 200),
    y: clampNumber(((event.clientY - rect.top) / Math.max(1, rect.height)) * 100, -100, 200),
  };
}

function getCurrentFreestyleStyle() {
  // Capture only the text controls that should be independent per freestyle object.
  return normalizeFreestyleStyle({
    labelFont: el.labelFont.value,
    textAlign: el.textAlignGroup.dataset.value,
    titleSize: readMeasurement(el.titleSize, 2.4),
    textMiddleBold: el.textMiddleBold.checked,
    textMiddleItalic: el.textMiddleItalic.checked,
    experimentalTitleColor: el.experimentalTitleColor.value,
  });
}

function applyFreestyleStyleToControls(style) {
  // Load the selected freestyle object's style into the shared Style controls.
  const normalized = normalizeFreestyleStyle(style);
  el.labelFont.value = normalized.labelFont;
  setTextAlign(normalized.textAlign, false);
  setMeasurementValue(el.titleSize, normalized.titleSize);
  el.textMiddleBold.checked = Boolean(normalized.textMiddleBold);
  el.textMiddleItalic.checked = Boolean(normalized.textMiddleItalic);
  setColorInputValue(el.experimentalTitleColor, normalized.experimentalTitleColor, "#111827");
}

function applyLabelStyleSettingsToControls(settings) {
  // Load a freestyle embedded label's saved styling into the shared Style controls without changing paper format.
  const normalized = normalizeLockedSheetSettings(settings);
  if (!normalized) {
    return;
  }

  if (normalized.codeType !== undefined) {
    el.codeType.value = normalizeCodeType(normalized.codeType);
  }
  if (normalized.labelFont !== undefined) {
    el.labelFont.value = normalized.labelFont;
  }
  if (normalized.textAlign !== undefined) {
    setTextAlign(normalized.textAlign, false);
  }
  if (normalized.titleSize !== undefined) {
    setMeasurementValue(el.titleSize, normalized.titleSize);
  }
  if (normalized.codeTextSize !== undefined) {
    setMeasurementValue(el.codeTextSize, normalized.codeTextSize);
  }
  if (normalized.textAboveSize !== undefined) {
    setMeasurementValue(el.textAboveSize, normalized.textAboveSize);
  }
  if (normalized.textBelowSize !== undefined) {
    setMeasurementValue(el.textBelowSize, normalized.textBelowSize);
  }
  if (normalized.codePaddingLeft !== undefined) {
    setMeasurementValue(el.codePaddingLeft, normalized.codePaddingLeft);
  }
  if (normalized.codePaddingRight !== undefined) {
    setMeasurementValue(el.codePaddingRight, normalized.codePaddingRight);
  }
  if (normalized.codePaddingTop !== undefined) {
    setMeasurementValue(el.codePaddingTop, normalized.codePaddingTop);
  }
  if (normalized.codePaddingBottom !== undefined) {
    setMeasurementValue(el.codePaddingBottom, normalized.codePaddingBottom);
  }
  if (normalized.barcodeMaxHeight !== undefined) {
    setMeasurementValue(el.barcodeMaxHeight, normalized.barcodeMaxHeight);
  }
  if (normalized.qrMaxSize !== undefined) {
    setMeasurementValue(el.qrMaxSize, normalized.qrMaxSize);
  }
  if (normalized.signMaxSize !== undefined) {
    setMeasurementValue(el.signMaxSize, normalized.signMaxSize);
  }
  if (normalized.signPaddingLeft !== undefined) {
    setMeasurementValue(el.signPaddingLeft, normalized.signPaddingLeft);
  }
  if (normalized.signPaddingRight !== undefined) {
    setMeasurementValue(el.signPaddingRight, normalized.signPaddingRight);
  }
  if (normalized.signPaddingTop !== undefined) {
    setMeasurementValue(el.signPaddingTop, normalized.signPaddingTop);
  }
  if (normalized.signPaddingBottom !== undefined) {
    setMeasurementValue(el.signPaddingBottom, normalized.signPaddingBottom);
  }
  [
    "includeTitle",
    "includeCodeNumber",
    "includeTextAbove",
    "includeTextBelow",
    "titleBold",
    "titleItalic",
    "codeBold",
    "codeItalic",
    "textMiddleBold",
    "textMiddleItalic",
    "textAboveBold",
    "textAboveItalic",
    "textBelowBold",
    "textBelowItalic",
  ].forEach((key) => {
    if (normalized[key] !== undefined && el[key]) {
      el[key].checked = Boolean(normalized[key]);
    }
  });
  if (normalized.experimentalLabelBackground !== undefined) {
    setColorInputValue(el.experimentalLabelBackground, normalized.experimentalLabelBackground, "#ffffff");
  }
  if (normalized.experimentalBarcodeColor !== undefined) {
    setColorInputValue(el.experimentalBarcodeColor, normalized.experimentalBarcodeColor, "#111111");
  }
  if (normalized.experimentalTitleColor !== undefined) {
    setColorInputValue(el.experimentalTitleColor, normalized.experimentalTitleColor, "#111827");
  }
  if (normalized.experimentalCodeNumberColor !== undefined) {
    setColorInputValue(el.experimentalCodeNumberColor, normalized.experimentalCodeNumberColor, "#111827");
  }
  if (normalized.labelPartOrder !== undefined) {
    state.labelPartOrder = normalizeLabelPartOrder(normalized.labelPartOrder);
  }
}

function syncActiveFreestyleStyleFromControls() {
  // Save Style control changes to the active object instead of every freestyle object.
  if (normalizeSheetFillMode(el.sheetFillMode.value) !== "freestyle" || !state.activeFreestyleObjectId) {
    return;
  }

  const object = getFreestyleObject(state.activeFreestyleObjectId);
  if (object?.labelItem && !isFreestyleObjectLocked(object)) {
    object.labelItem.settings = collectSheetLockSettings();
    return;
  }
  if (object && !object.labelItem && !isFreestyleObjectLocked(object)) {
    object.style = getCurrentFreestyleStyle();
  }
}

function applyFreestyleObjectStyle(objectEl, object) {
  // Apply one freestyle object's private text style as CSS variables on that object only.
  const style = normalizeFreestyleStyle(object.style || {});
  object.style = style;
  objectEl.style.setProperty("--label-font", style.labelFont);
  objectEl.style.setProperty("--text-align", style.textAlign);
  objectEl.style.setProperty("--text-justify", getTextJustify(style.textAlign));
  objectEl.style.setProperty("--title-size", `${style.titleSize}mm`);
  objectEl.style.setProperty("--text-middle-weight", style.textMiddleBold ? "700" : "400");
  objectEl.style.setProperty("--text-middle-style", style.textMiddleItalic ? "italic" : "normal");
  objectEl.style.setProperty("--experimental-title-color", style.experimentalTitleColor);
  if (isFreestyleObjectLocked(object) && object.lockedSettings) {
    applyLockedLabelStyles(objectEl, object.lockedSettings);
  }
}

function isAllowedFreestyleImageFile(file) {
  // Accept only browser-renderable image files that can be safely embedded in a saved freestyle sheet.
  return Boolean(file && FREESTYLE_IMAGE_TYPES.includes(file.type) && file.size <= FREESTYLE_IMAGE_MAX_BYTES);
}

function readFreestyleImageFile(file) {
  // Convert a selected or dropped image file into a data URL that can be saved with the sheet.
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(String(reader.result || "")));
    reader.addEventListener("error", () => reject(reader.error));
    reader.readAsDataURL(file);
  });
}

function getFreestyleDefaultObject() {
  // Create a practical starting rectangle for catalog/sign insertion when none is active yet.
  const offset = state.freestyleObjects.length % 8;
  return {
    id: `freestyle-${Date.now()}`,
    x: 8 + offset * 2,
    y: 8 + offset * 2,
    width: FREESTYLE_DEFAULT_WIDTH_PERCENT,
    height: FREESTYLE_DEFAULT_HEIGHT_PERCENT,
    rotation: 0,
    tool: "resize",
    text: "",
    signs: [],
    customSigns: [],
    labelItem: null,
    locked: false,
    lockedSettings: null,
    style: getCurrentFreestyleStyle(),
  };
}

function ensureActiveFreestyleObject() {
  // Reuse the current rectangle or create one so catalog content has a visible target.
  let object = getFreestyleObject(state.activeFreestyleObjectId);
  if (!object) {
    object = getFreestyleDefaultObject();
    state.freestyleObjects.push(object);
    state.activeFreestyleObjectId = object.id;
  }
  return object;
}

function setActiveFreestyleObject(id, shouldFocus = false) {
  // Mark one rectangle as active and optionally put the text caret inside it.
  state.activeFreestyleObjectId = id || "";
  el.paper.querySelectorAll(".freestyle-object").forEach((objectEl) => {
    objectEl.classList.toggle("is-active", objectEl.dataset.id === state.activeFreestyleObjectId);
  });
  const activeObject = getFreestyleObject(state.activeFreestyleObjectId);
  if (activeObject && !activeObject.labelItem && isFreestyleObjectLocked(activeObject)) {
    applyLabelStyleSettingsToControls(activeObject.lockedSettings || activeObject.style);
  } else if (activeObject && !activeObject.labelItem) {
    applyFreestyleStyleToControls(activeObject.style);
  } else if (activeObject?.labelItem) {
    applyLabelStyleSettingsToControls(
      isFreestyleObjectLocked(activeObject)
        ? activeObject.lockedSettings || activeObject.labelItem.lockedSettings || activeObject.labelItem.settings
        : activeObject.labelItem.settings || collectSheetLockSettings(),
    );
  }
  if (!shouldFocus || !id) {
    return;
  }

  window.setTimeout(() => {
    const textEl = el.paper.querySelector(`${getFreestyleObjectSelector(id)} .freestyle-text`);
    if (!textEl) {
      return;
    }
    textEl.focus();
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(textEl);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }, 0);
}

function syncFreestyleObjectElement(object) {
  // Push one object's percentage geometry into its live preview node.
  const objectEl = el.paper.querySelector(getFreestyleObjectSelector(object.id));
  if (!objectEl) {
    return;
  }
  objectEl.style.left = `${object.x}%`;
  objectEl.style.top = `${object.y}%`;
  objectEl.style.width = `${object.width}%`;
  objectEl.style.height = `${object.height}%`;
  objectEl.style.transform = `rotate(${object.rotation}deg)`;
}

function getFreestyleToolLabel(tool) {
  // Give the compact corner handle a recognizable symbol for its current behavior.
  if (tool === "rotate") {
    return "⟳";
  }
  if (tool === "move") {
    return "✥";
  }
  return "↔";
}

function cycleFreestyleTool(object) {
  // Rotate the corner handle between resize, rotate, and move modes.
  const currentIndex = FREESTYLE_TOOLS.indexOf(normalizeFreestyleTool(object.tool));
  object.tool = FREESTYLE_TOOLS[(currentIndex + 1) % FREESTYLE_TOOLS.length];
  renderFreestyleObjects();
  setActiveFreestyleObject(object.id, false);
  saveSettings();
}

function renderFreestyleSigns(object, signsEl) {
  // Reuse the normal sign renderers inside freeform paper objects.
  signsEl.innerHTML = "";
  normalizesigns(object.signs || []).forEach((id) => {
    const sign = getsign(id);
    if (sign) {
      signsEl.append(createsignMark(sign));
    }
  });
  parsecustomSigns(object.customSigns || "").forEach((symbol) => {
    signsEl.append(createCustomSignMark(symbol));
  });
  signsEl.classList.toggle("is-hidden", !signsEl.children.length);
}

function createFreestyleLabelPreview(object) {
  // Render one catalog label inside a freestyle geometry object, including its barcode or QR symbol.
  const styleSettings = isFreestyleObjectLocked(object)
    ? normalizeLockedSheetSettings(object.lockedSettings || object.labelItem.lockedSettings)
    : normalizeLockedSheetSettings(object.labelItem.settings);
  const label = createLabel(object.labelItem, { styleSettings });
  label.classList.add("freestyle-label-preview");
  return label;
}

function isFreestyleObjectLocked(object) {
  // Treat any freeform geometry object as locked when its own flag or old embedded-label flag is active.
  return Boolean(object?.locked || object?.labelItem?.locked);
}

function toggleFreestyleObjectLock(object) {
  // Lock or unlock one freestyle object so style, text, and geometry edits are deliberate.
  if (!object) {
    return;
  }

  const nextLocked = !isFreestyleObjectLocked(object);
  object.locked = nextLocked;
  if (nextLocked) {
    object.lockedSettings = collectSheetLockSettings();
    object.style = normalizeFreestyleStyle(object.lockedSettings);
    if (object.labelItem) {
      object.labelItem.settings = object.lockedSettings;
      object.labelItem.locked = true;
      object.labelItem.lockedSettings = object.lockedSettings;
    }
  } else {
    const ownSettings = normalizeLockedSheetSettings(object.lockedSettings || object.labelItem?.lockedSettings || object.labelItem?.settings);
    if (ownSettings) {
      applyLabelStyleSettingsToControls(ownSettings);
      object.style = normalizeFreestyleStyle(ownSettings);
    }
    object.lockedSettings = null;
    if (object.labelItem) {
      object.labelItem.settings = ownSettings || object.labelItem.settings;
      object.labelItem.locked = false;
      object.labelItem.lockedSettings = null;
    }
  }
  if (object.labelItem) {
    object.labelItem.locked = nextLocked;
  }
  renderLabels();
  saveSettings();
}

function createFreestyleObjectElement(object) {
  // Build one editable rectangle that can be typed into and transformed from its corner handle.
  const objectEl = document.createElement("div");
  const handle = document.createElement("button");
  const lockButton = document.createElement("button");
  const imageEl = document.createElement("img");
  const signsEl = document.createElement("div");
  const textEl = document.createElement("div");
  objectEl.className = `freestyle-object${object.id === state.activeFreestyleObjectId ? " is-active" : ""}${isFreestyleObjectLocked(object) ? " is-locked" : ""}`;
  objectEl.dataset.id = object.id;
  handle.type = "button";
  handle.className = "freestyle-handle";
  handle.textContent = getFreestyleToolLabel(object.tool);
  handle.setAttribute("aria-label", t("aria.freestyleHandle"));
  lockButton.type = "button";
  lockButton.className = "freestyle-lock";
  lockButton.textContent = isFreestyleObjectLocked(object) ? "🔒" : "🔓";
  lockButton.setAttribute("aria-label", isFreestyleObjectLocked(object) ? t("action.unlockFreestyleObject") : t("action.lockFreestyleObject"));
  lockButton.title = isFreestyleObjectLocked(object) ? t("action.unlockFreestyleObject") : t("action.lockFreestyleObject");
  lockButton.addEventListener("click", (event) => {
    // Toggle the selected embedded label lock without starting a move or text edit.
    event.preventDefault();
    event.stopPropagation();
    toggleFreestyleObjectLock(object);
  });
  imageEl.className = "freestyle-image";
  imageEl.src = object.imageSrc || "";
  imageEl.alt = object.imageName || "";
  imageEl.draggable = false;
  signsEl.className = "freestyle-signs";
  textEl.className = "freestyle-text";
  textEl.spellcheck = false;
  textEl.textContent = object.text || "";
  textEl.addEventListener("input", () => {
    // Persist typed multiline text without redrawing and losing the caret.
    object.text = textEl.innerText.replace(/\n$/, "");
    saveSettings();
  });
  textEl.addEventListener("focus", () => setActiveFreestyleObject(object.id));
  handle.addEventListener("click", (event) => {
    // Keep button clicks from entering text editing; handle taps are processed on pointerup.
    event.preventDefault();
    event.stopPropagation();
  });
  renderFreestyleSigns(object, signsEl);
  if (object.labelItem) {
    objectEl.classList.add("has-label");
    objectEl.append(createFreestyleLabelPreview(object));
  } else if (object.imageSrc) {
    objectEl.classList.add("has-image");
    textEl.contentEditable = String(!isFreestyleObjectLocked(object));
    objectEl.append(imageEl);
    objectEl.append(signsEl, textEl);
  } else {
    textEl.contentEditable = String(!isFreestyleObjectLocked(object));
    objectEl.append(signsEl, textEl);
  }
  objectEl.append(lockButton);
  objectEl.append(handle);
  applyFreestyleObjectStyle(objectEl, object);
  syncFreestyleObjectElement(object);
  return objectEl;
}

function renderFreestyleObjects() {
  // Draw all freeform objects over the paper while preserving their overlap order.
  el.paper.querySelectorAll(".freestyle-object").forEach((objectEl) => objectEl.remove());
  state.freestyleObjects.forEach((object) => {
    el.paper.append(createFreestyleObjectElement(object));
    syncFreestyleObjectElement(object);
  });
  setActiveFreestyleObject(state.activeFreestyleObjectId, false);
}

function createSheetEntryFromCatalogItem(item, options = {}) {
  // Convert a catalog item into one printable sheet entry, preserving saved item styling when available.
  const lockedSettings = options.lockedSettings ? normalizeLockedSheetSettings(options.lockedSettings) : null;
  const settings = normalizeLockedSheetSettings(options.settings || options.lockedSettings || item?.settings || collectSheetLockSettings());
  return normalizeSheetQueue([
    {
      ...item,
      id: options.id || `sheet-${getItemKey(item)}-${Date.now()}`,
      locked: Boolean(lockedSettings),
      lockedSettings,
      settings,
      quantity: 1,
    },
  ])[0];
}

function insertFreestyleContent({ text = "", signs = [], customSigns = [], style = null }) {
  // Add catalog, Unicode, emoji, and sign content to the active freeform rectangle.
  el.sheetFillMode.value = "freestyle";
  let object = ensureActiveFreestyleObject();
  if (object.labelItem || isFreestyleObjectLocked(object)) {
    object = getFreestyleDefaultObject();
    state.freestyleObjects.push(object);
  }
  const nextText = String(text || "").trim();
  if (nextText) {
    object.text = [object.text, nextText].filter((value) => String(value || "").trim()).join("\n");
  }
  object.signs = [...new Set([...(object.signs || []), ...normalizeMixedLabelSigns(signs)])];
  object.customSigns = [...new Set([...parsecustomSigns(object.customSigns || ""), ...parsecustomSigns(customSigns || "")])];
  object.style = style ? normalizeFreestyleStyle(style) : object.style || getCurrentFreestyleStyle();
  state.activeFreestyleObjectId = object.id;
}

function isEmptyFreestyleObject(object) {
  // Treat only blank rectangles as reusable targets for a selected catalog label.
  return Boolean(
    object &&
      !object.labelItem &&
      !object.imageSrc &&
      !String(object.text || "").trim() &&
      !normalizeMixedLabelSigns(object.signs || []).length &&
      !parsecustomSigns(object.customSigns || "").length,
  );
}

function insertCatalogItemIntoFreestyleObject(item, settings = null) {
  // Place one full catalog label, including its barcode, into its own freestyle geometry object.
  const labelItem = createSheetEntryFromCatalogItem(item, { lockedSettings: settings });
  if (!labelItem) {
    return;
  }

  const activeObject = getFreestyleObject(state.activeFreestyleObjectId);
  const object = isEmptyFreestyleObject(activeObject) ? activeObject : getFreestyleDefaultObject();
  object.labelItem = labelItem;
  object.text = "";
  object.signs = [];
  object.customSigns = [];
  object.imageSrc = "";
  object.imageName = "";
  object.locked = Boolean(labelItem.locked);
  object.lockedSettings = labelItem.lockedSettings || null;
  object.style = settings ? normalizeFreestyleStyle(settings) : object.style || getCurrentFreestyleStyle();
  delete object.keepEmpty;
  if (!state.freestyleObjects.some((entry) => entry.id === object.id)) {
    state.freestyleObjects.push(object);
  }
  state.activeFreestyleObjectId = object.id;
}

function isPointerOverFreestyleTrash(event) {
  // Check whether a moved object was released over the floating delete target.
  if (!el.freestyleTrash || el.freestyleTrash.classList.contains("is-hidden")) {
    return false;
  }
  const rect = el.freestyleTrash.getBoundingClientRect();
  return event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
}

function updateFreestyleTrashState(event) {
  // Highlight the delete target only while a movable object is hovering above it.
  el.freestyleTrash.classList.toggle("is-hot", Boolean(event && isPointerOverFreestyleTrash(event)));
}

function startFreestyleDraw(event) {
  // Draw a new freeform rectangle directly on blank paper in freestyle mode.
  if (normalizeSheetFillMode(el.sheetFillMode.value) !== "freestyle" || event.button !== 0 || event.target !== el.paper) {
    return;
  }

  const point = getPaperPointerPoint(event);
  const object = {
    ...getFreestyleDefaultObject(),
    id: `freestyle-${Date.now()}`,
    x: point.x,
    y: point.y,
    width: FREESTYLE_MIN_SIZE_PERCENT,
    height: FREESTYLE_MIN_SIZE_PERCENT,
    keepEmpty: true,
  };
  state.freestyleObjects.push(object);
  state.activeFreestyleObjectId = object.id;
  state.freestylePointer = {
    action: "draw",
    pointerId: event.pointerId,
    id: object.id,
    startX: point.x,
    startY: point.y,
  };
  el.paper.setPointerCapture(event.pointerId);
  renderFreestyleObjects();
  setActiveFreestyleObject(object.id, true);
  event.preventDefault();
}

function startFreestyleObjectPointer(event) {
  // Start moving, resizing, or rotating an existing rectangle from its active handle mode.
  if (normalizeSheetFillMode(el.sheetFillMode.value) !== "freestyle" || event.button !== 0) {
    return;
  }

  const objectEl = event.target.closest(".freestyle-object");
  if (!objectEl) {
    return;
  }

  const object = getFreestyleObject(objectEl.dataset.id);
  if (!object) {
    return;
  }

  if (event.target.closest(".freestyle-lock")) {
    return;
  }

  const isHandle = Boolean(event.target.closest(".freestyle-handle"));
  if (isFreestyleObjectLocked(object)) {
    setActiveFreestyleObject(object.id, false);
    event.preventDefault();
    return;
  }
  setActiveFreestyleObject(object.id, !isHandle);
  if (!isHandle && normalizeFreestyleTool(object.tool) !== "move") {
    return;
  }

  const point = getPaperPointerPoint(event);
  state.freestyleHandleMoved = false;
  state.freestylePointer = {
    action: isHandle ? normalizeFreestyleTool(object.tool) : "move",
    fromHandle: isHandle,
    pointerId: event.pointerId,
    id: object.id,
    startX: point.x,
    startY: point.y,
    objectX: object.x,
    objectY: object.y,
    objectWidth: object.width,
    objectHeight: object.height,
    objectRotation: object.rotation,
  };
  el.paper.setPointerCapture(event.pointerId);
  event.preventDefault();
}

function moveFreestylePointer(event) {
  // Update live freestyle geometry while dragging without rebuilding the whole sheet.
  const pointer = state.freestylePointer;
  if (!pointer || pointer.pointerId !== event.pointerId) {
    return;
  }

  const object = getFreestyleObject(pointer.id);
  if (!object) {
    return;
  }

  const point = getPaperPointerPoint(event);
  const deltaX = point.x - pointer.startX;
  const deltaY = point.y - pointer.startY;
  if (Math.abs(deltaX) > 0.3 || Math.abs(deltaY) > 0.3) {
    state.freestyleHandleMoved = true;
  }

  if (pointer.action === "draw") {
    object.x = Math.min(pointer.startX, point.x);
    object.y = Math.min(pointer.startY, point.y);
    object.width = Math.max(FREESTYLE_MIN_SIZE_PERCENT, Math.abs(deltaX));
    object.height = Math.max(FREESTYLE_MIN_SIZE_PERCENT, Math.abs(deltaY));
  } else if (pointer.action === "resize") {
    object.width = Math.max(FREESTYLE_MIN_SIZE_PERCENT, pointer.objectWidth + deltaX);
    object.height = Math.max(FREESTYLE_MIN_SIZE_PERCENT, pointer.objectHeight + deltaY);
  } else if (pointer.action === "move") {
    object.x = pointer.objectX + deltaX;
    object.y = pointer.objectY + deltaY;
    updateFreestyleTrashState(event);
  } else if (pointer.action === "rotate") {
    const rect = el.paper.querySelector(getFreestyleObjectSelector(object.id))?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      object.rotation = Math.round((Math.atan2(event.clientY - centerY, event.clientX - centerX) * 180) / Math.PI + 90);
    }
  }

  syncFreestyleObjectElement(object);
  event.preventDefault();
}

function stopFreestylePointer(event) {
  // Finish the drag operation, delete if dropped on the bin, then persist the sheet.
  const pointer = state.freestylePointer;
  if (!pointer || pointer.pointerId !== event.pointerId) {
    return;
  }

  if (pointer.action === "move" && isPointerOverFreestyleTrash(event)) {
    state.freestyleObjects = state.freestyleObjects.filter((object) => object.id !== pointer.id || isFreestyleObjectLocked(object));
    state.activeFreestyleObjectId = "";
    renderFreestyleObjects();
  } else if (pointer.fromHandle && !state.freestyleHandleMoved) {
    const object = getFreestyleObject(pointer.id);
    if (object) {
      cycleFreestyleTool(object);
    }
  } else {
    const object = getFreestyleObject(pointer.id);
    if (object) {
      delete object.keepEmpty;
      setActiveFreestyleObject(object.id, pointer.action === "draw");
    }
  }

  if (el.paper.hasPointerCapture(event.pointerId)) {
    el.paper.releasePointerCapture(event.pointerId);
  }
  state.freestylePointer = null;
  updateFreestyleTrashState(null);
  saveSettings();
  event.preventDefault();
}

function getSheetQueueExpandedItems() {
  // Expand queue quantities into the concrete label cells to print.
  return state.sheetQueue.flatMap((entry) =>
    Array.from({ length: Math.max(1, Number.parseInt(entry.quantity, 10) || 1) }, () => ({
      ...entry,
      customSigns: [...parsecustomSigns(entry.customSigns || "")],
      signs: normalizesigns(entry.signs || []),
    })),
  );
}

function getSequenceSheetItems(limit) {
  // Generate temporary text labels such as 1-15 or Fuse 01-Fuse 15 without saving catalog items.
  const start = Number.parseInt(el.sequenceStart.value, 10) || 1;
  const end = Number.parseInt(el.sequenceEnd.value, 10) || start;
  const rawStep = Number.parseInt(el.sequenceStep.value, 10) || 1;
  const step = rawStep === 0 ? 1 : Math.abs(rawStep);
  const direction = start <= end ? 1 : -1;
  const pad = Math.max(0, Number.parseInt(el.sequencePad.value, 10) || 0);
  const prefix = el.sequencePrefix.value || "";
  const suffix = el.sequenceSuffix.value || "";
  const items = [];

  for (let value = start; direction > 0 ? value <= end : value >= end; value += step * direction) {
    const numberText = String(Math.abs(value)).padStart(pad, "0");
    const signedNumberText = value < 0 ? `-${numberText}` : numberText;
    const title = `${prefix}${signedNumberText}${suffix}`;
    items.push({
      id: `sequence-${value}`,
      title,
      code: "",
      codeType: "code128",
      labelMode: "text",
      signs: [],
      customSigns: [],
      signalWord: "",
      color: normalizeColor(el.newColor.value),
      category: "",
      presetId: "",
      textAbove: "",
      textBelow: "",
    });
    if (items.length >= limit) {
      break;
    }
  }

  return items;
}

function getSheetCellItem(index, totalCells) {
  // Return the item that belongs in one sheet cell for the selected fill mode.
  const mode = normalizeSheetFillMode(el.sheetFillMode.value);
  if (mode === "freestyle") {
    return null;
  }
  if (mode === "sequence") {
    return getSequenceSheetItems(totalCells)[index] || null;
  }
  if (mode === "queue") {
    return getSheetQueueExpandedItems()[index] || null;
  }
  return state.selectedItem;
}

function getSheetMetaTitle(totalCells) {
  // Summarize the sheet fill mode in the preview toolbar.
  const mode = normalizeSheetFillMode(el.sheetFillMode.value);
  if (mode === "sequence") {
    const items = getSequenceSheetItems(totalCells);
    return items.length ? `${items[0].title} - ${items[items.length - 1].title}` : t("status.noItemSelected");
  }
  if (mode === "queue") {
    const count = getSheetQueueExpandedItems().length;
    return count ? t("status.sheetQueueMeta", { count }) : t("status.noItemSelected");
  }
  if (mode === "freestyle") {
    return t("status.freestyleMeta", { count: state.freestyleObjects.length });
  }
  return state.selectedItem?.title || t("status.noItemSelected");
}

function getSheetQueueDisplayTitle(entry) {
  // Show a queue row label without adding fallback text to the printed label itself.
  const customSigns = parsecustomSigns(entry.customSigns || "");
  const imageSigns = normalizesigns(entry.signs || [])
    .map((id) => getsign(id)?.name)
    .filter(Boolean);
  return entry.title || [...customSigns, ...imageSigns].join(" ") || entry.code || t("option.labelModeSign");
}

function hasLockedSheetLayoutMismatch(entry) {
  // Warn when a locked row was captured with a different sheet grid or paper geometry.
  const locked = normalizeLockedSheetSettings(entry.lockedSettings);
  if (!entry.locked || !locked) {
    return false;
  }

  const current = collectSheetLockSettings();
  const layoutKeys = [
    "paperSize",
    "paperOrientation",
    "paperWidth",
    "paperHeight",
    "gridPreset",
    "columns",
    "rows",
    "marginLeft",
    "marginRight",
    "marginTop",
    "marginBottom",
    "gapX",
    "gapY",
  ];
  return layoutKeys.some((key) => String(locked[key] ?? "") !== String(current[key] ?? ""));
}

function renderSheetQueueList() {
  // Draw the manual queue rows and per-row quantity/remove controls.
  el.sheetQueueList.innerHTML = "";
  if (!state.sheetQueue.length) {
    const empty = document.createElement("p");
    empty.className = "sheet-queue-empty";
    empty.textContent = t("status.emptySheetQueue");
    el.sheetQueueList.append(empty);
    return;
  }

  state.sheetQueue.forEach((entry, index) => {
    const row = document.createElement("div");
    const text = document.createElement("div");
    const title = document.createElement("span");
    const warning = document.createElement("span");
    const quantity = document.createElement("input");
    const lock = document.createElement("button");
    const remove = document.createElement("button");
    row.className = "sheet-queue-row";
    text.className = "sheet-queue-text";
    title.className = "sheet-queue-title";
    title.textContent = getSheetQueueDisplayTitle(entry);
    warning.className = "sheet-queue-warning";
    warning.textContent = hasLockedSheetLayoutMismatch(entry) ? t("status.sheetQueueLayoutMismatch") : "";
    quantity.type = "number";
    quantity.min = "1";
    quantity.step = "1";
    quantity.value = String(entry.quantity || 1);
    quantity.setAttribute("aria-label", t("label.queueQuantity"));
    quantity.addEventListener("input", () => {
      // Update queue row count and immediately refresh the sheet.
      entry.quantity = Math.max(1, Number.parseInt(quantity.value, 10) || 1);
      saveSettings();
      renderLabels();
    });
    lock.type = "button";
    lock.className = `secondary-button compact-button${entry.locked ? " is-active" : ""}`;
    lock.textContent = entry.locked ? "🔒" : "🔓";
    lock.setAttribute("aria-label", entry.locked ? t("action.unlockQueueItem") : t("action.lockQueueItem"));
    lock.addEventListener("click", () => {
      // Toggle whether this queued label keeps its own captured style while the sheet controls change.
      entry.locked = !entry.locked;
      entry.lockedSettings = entry.locked ? collectSheetLockSettings() : null;
      renderSheetQueueList();
      renderLabels();
    });
    remove.type = "button";
    remove.className = "secondary-button compact-button";
    remove.textContent = "×";
    remove.setAttribute("aria-label", t("action.removeQueueItem"));
    remove.addEventListener("click", () => {
      // Remove this queued label from the temporary sheet composition.
      state.sheetQueue.splice(index, 1);
      renderSheetQueueList();
      renderLabels();
    });
    text.append(title);
    if (warning.textContent) {
      text.append(warning);
    }
    row.append(text, quantity, lock, remove);
    el.sheetQueueList.append(row);
  });
}

function renderSheetFillControls() {
  // Show only the controls needed for the active sheet fill mode.
  const mode = normalizeSheetFillMode(el.sheetFillMode.value);
  const showMixedTools = mode === "queue" || mode === "freestyle";
  if (!showMixedTools) {
    state.pendingCatalogInsert = false;
  }
  el.sequenceSheetControls.classList.toggle("is-hidden", mode !== "sequence");
  el.queueSheetControls.classList.toggle("is-hidden", !showMixedTools);
  el.clearQueueButton.classList.toggle("is-hidden", !showMixedTools);
  el.clearQueueButton.textContent = mode === "freestyle" ? t("action.clearFreestyle") : t("action.clearQueue");
  el.addSelectedToQueueButton.classList.toggle("is-active", Boolean(state.pendingCatalogInsert));
  el.addSelectedToQueueButton.setAttribute("aria-pressed", String(Boolean(state.pendingCatalogInsert)));
  el.codeSelect.classList.toggle("is-picking-catalog-item", Boolean(state.pendingCatalogInsert));
  el.selectFreestyleImageButton.classList.toggle("is-hidden", mode !== "freestyle");
  el.sheetQueueList.classList.toggle("is-hidden", mode !== "queue");
  el.paperWrap.classList.toggle("is-freestyle-mode", mode === "freestyle");
  el.freestyleTrash.classList.toggle("is-hidden", mode !== "freestyle");
  renderSheetQueueList();
  updateCatalogMeta();
}

function setCatalogInsertPicker(active) {
  // Arm a one-click catalog picker so Mixed/Freestyle can import an item without opening it in repeat mode.
  const mode = normalizeSheetFillMode(el.sheetFillMode.value);
  state.pendingCatalogInsert = Boolean(active && (mode === "queue" || mode === "freestyle"));
  renderSheetFillControls();
  if (!state.pendingCatalogInsert) {
    return;
  }

  showStatusToast(t("status.selectCatalogItemForSheet"), 5000);
  (el.codeSelect.querySelector(".catalog-option[data-item-key]") || el.searchInput).focus();
  el.codeSelect.scrollIntoView({ block: "nearest" });
}

function handleCatalogItemClick(item) {
  // Route catalog clicks either into the active sheet builder or into the normal repeat preview.
  if (state.pendingCatalogInsert && ["queue", "freestyle"].includes(normalizeSheetFillMode(el.sheetFillMode.value))) {
    addCatalogItemToActiveSheet(item);
    state.pendingCatalogInsert = false;
    renderSheetFillControls();
    showStatusToast(t("status.catalogItemAddedToSheet", { title: item.title }), 2600);
    return;
  }

  selectItem(getItemKey(item));
}

function handleCatalogSheetClick(sheet) {
  // In picker mode, only saved repeated labels can be inserted into Mixed/Freestyle sheets.
  if (!state.pendingCatalogInsert || !["queue", "freestyle"].includes(normalizeSheetFillMode(el.sheetFillMode.value))) {
    applySavedSheet(sheet);
    return;
  }

  if (normalizeSheetFillMode(sheet.mode) !== "repeat") {
    alert(t("alert.onlyRepeatSheetsForPicker"));
    return;
  }

  const item = findItemFromSheetSettings(sheet.settings);
  if (!item) {
    alert(t("alert.repeatSheetMissingItem"));
    return;
  }

  addCatalogItemToActiveSheet(item, { lockedSettings: sheet.settings });
  state.pendingCatalogInsert = false;
  renderSheetFillControls();
  showStatusToast(t("status.catalogItemAddedToSheet", { title: sheet.name }), 2600);
}

function addCatalogItemToActiveSheet(item, options = {}) {
  // Add a clicked catalog item to the current Mixed or Freestyle composition without selecting it as the preview item.
  if (!item) {
    return;
  }
  if (normalizeSheetFillMode(el.sheetFillMode.value) === "freestyle") {
    insertCatalogItemIntoFreestyleObject(item, options.lockedSettings);
    renderLabels();
    return;
  }

  const queueEntry = createSheetEntryFromCatalogItem(item, { lockedSettings: options.lockedSettings });
  if (queueEntry) {
    state.sheetQueue.push(queueEntry);
  }
  el.sheetFillMode.value = "queue";
  renderSheetFillControls();
  renderLabels();
}

function addSelectedItemToSheetQueue() {
  // Turn the button into a one-shot request for the next clicked catalog item.
  setCatalogInsertPicker(!state.pendingCatalogInsert);
}

async function insertFreestyleImageFile(file, point = null) {
  // Add one selected or dropped image as its own movable freestyle object.
  if (normalizeSheetFillMode(el.sheetFillMode.value) !== "freestyle") {
    return;
  }
  if (!isAllowedFreestyleImageFile(file)) {
    alert(t("alert.unsupportedFreestyleImage"));
    return;
  }

  const imageSrc = await readFreestyleImageFile(file);
  const object = {
    ...getFreestyleDefaultObject(),
    id: `freestyle-image-${Date.now()}`,
    x: point ? point.x : 8,
    y: point ? point.y : 8,
    width: point ? 28 : FREESTYLE_DEFAULT_WIDTH_PERCENT,
    height: point ? 20 : Math.max(FREESTYLE_DEFAULT_HEIGHT_PERCENT, 18),
    text: "",
    imageSrc,
    imageName: file.name || "",
  };
  state.freestyleObjects.push(object);
  state.activeFreestyleObjectId = object.id;
  renderLabels();
}

async function insertFreestyleImageFiles(files, point = null) {
  // Import every allowed dropped or selected image, offsetting additional files slightly.
  for (const [index, file] of [...files].entries()) {
    const offsetPoint = point ? { x: point.x + index * 2, y: point.y + index * 2 } : null;
    await insertFreestyleImageFile(file, offsetPoint);
  }
}

function addCustomItemToSheetQueue() {
  // Queue a one-off text or sign label without creating a catalog item.
  const title = el.queueCustomTitle.value.trim();
  const signs = getSelectedsigns(el.mixsignGrid);
  const customSigns = parsecustomSigns(el.queueCustomSigns.value);
  const labelMode = signs.length || customSigns.length ? "sign" : "text";
  if (!title && !customSigns.length && !signs.length) {
    alert(t("alert.queueCustomLabel"));
    return;
  }
  if (normalizeSheetFillMode(el.sheetFillMode.value) === "freestyle") {
    insertFreestyleContent({ text: title, signs, customSigns });
    el.queueCustomTitle.value = "";
    el.queueCustomSigns.value = "";
    el.mixSignSearch.value = "";
    rendersignPicker(el.mixsignGrid, []);
    renderSheetFillControls();
    renderLabels();
    return;
  }

  state.sheetQueue.push(
    normalizeSheetQueue([
      {
        id: `sheet-custom-${Date.now()}`,
        title,
        code: "",
        codeType: "code128",
        labelMode,
        signs,
        customSigns,
        signalWord: "",
        color: normalizeColor(el.newColor.value),
        textAbove: "",
        textBelow: "",
        locked: false,
        lockedSettings: null,
        quantity: 1,
      },
    ])[0],
  );
  el.sheetFillMode.value = "queue";
  el.queueCustomTitle.value = "";
  el.queueCustomSigns.value = "";
  el.mixSignSearch.value = "";
  rendersignPicker(el.mixsignGrid, []);
  renderSheetFillControls();
  renderLabels();
}

function clearSheetQueue() {
  // Empty the active temporary sheet composition after a confirmation prompt.
  if (normalizeSheetFillMode(el.sheetFillMode.value) === "freestyle") {
    if (state.freestyleObjects.length && !window.confirm(t("confirm.clearFreestyle"))) {
      return;
    }

    state.freestyleObjects = [];
    state.activeFreestyleObjectId = "";
    renderSheetFillControls();
    renderLabels();
    return;
  }

  if (state.sheetQueue.length && !window.confirm(t("confirm.clearMixedLabels"))) {
    return;
  }

  state.sheetQueue = [];
  renderSheetFillControls();
  renderLabels();
}

function getSignSearchInput(container) {
  // Pair each sign picker with its local dictionary search field.
  if (container === el.newsignGrid) {
    return el.newSignSearch;
  }
  if (container === el.mixsignGrid) {
    return el.mixSignSearch;
  }
  return el.editSignSearch;
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
  if (![el.newsignGrid, el.mixsignGrid].includes(container)) {
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
    const closeTooltip = document.createElement("button");
    const tooltipText = document.createElement("span");
    option.className = "sign-picker-option";
    checkbox.type = "checkbox";
    checkbox.value = sign.id;
    checkbox.checked = selected.has(sign.id);
    name.className = "sign-picker-name";
    name.textContent = sign.filename || sign.name || sign.id;
    tooltip.className = "sign-picker-tooltip";
    closeTooltip.type = "button";
    closeTooltip.className = "sign-picker-tooltip-close";
    closeTooltip.textContent = "×";
    closeTooltip.setAttribute("aria-label", t("aria.close"));
    closeTooltip.addEventListener("click", (event) => {
      // Close the touch tooltip without letting the tap toggle the sign checkbox or hit controls behind it.
      event.preventDefault();
      event.stopPropagation();
      option.classList.add("is-tooltip-dismissed");
      closeTooltip.blur();
    });
    option.addEventListener("focusin", () => {
      // Reopen the tooltip normally the next time the sign option receives focus.
      option.classList.remove("is-tooltip-dismissed");
    });
    option.addEventListener("pointerenter", () => {
      // Reset a dismissed tooltip when desktop hover starts again.
      option.classList.remove("is-tooltip-dismissed");
    });
    tooltipText.className = "sign-picker-tooltip-text";
    tooltipText.textContent = [sign.name, sign.description, sign.filename, sign.group].filter(Boolean).join("\n");
    tooltip.append(closeTooltip, createsignMark(sign), tooltipText);
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

function setItemEditDuplicateOverrideVisible(visible) {
  // Show the override action only after duplicate-code validation blocks a normal save.
  el.itemEditIgnoreDuplicateButton.classList.toggle("is-hidden", !visible);
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
  setItemEditDuplicateOverrideVisible(false);
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
  syncItemEditLockState();
  el.itemEditModal.classList.add("is-open");
  el.itemEditModal.setAttribute("aria-hidden", "false");
  if (isCatalogEntryLocked(state.selectedItem)) {
    el.itemEditLockButton.focus();
  } else {
    el.editTitleInput.focus();
    el.editTitleInput.select();
  }
}

function closeItemEditModal() {
  // Hide the item editor and return focus to the edit action.
  el.itemEditModal.classList.remove("is-open");
  el.itemEditModal.setAttribute("aria-hidden", "true");
  el.editModalError.textContent = "";
  setItemEditDuplicateOverrideVisible(false);
  el.editCodeButton.focus();
}

function syncItemEditLockState() {
  // Disable item editor fields while the selected item is PIN locked.
  const locked = isCatalogEntryLocked(state.selectedItem);
  updateLockButton(el.itemEditLockButton, state.selectedItem);
  el.itemEditForm.querySelectorAll("input, select, textarea, button").forEach((control) => {
    if ([el.itemEditLockButton, el.itemEditCancelButton, el.itemEditCloseButton].includes(control)) {
      return;
    }
    control.disabled = locked;
  });
}

function populateCategoryPresetSelect() {
  // Build the category bulk-preset dropdown from saved presets.
  const currentValue = el.categoryPresetSelect.value;
  el.categoryPresetSelect.innerHTML = "";
  const emptyOption = document.createElement("option");
  emptyOption.value = "";
  emptyOption.textContent = t("option.noPreset");
  el.categoryPresetSelect.append(emptyOption);
  state.presets
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((preset) => {
      const option = document.createElement("option");
      option.value = preset.id;
      option.textContent = preset.name;
      el.categoryPresetSelect.append(option);
    });
  el.categoryPresetSelect.value = state.presets.some((preset) => preset.id === currentValue) ? currentValue : "";
}

function getCategoryItemPreset(item) {
  // Resolve an item's saved preset so rows can show whether styling is already assigned.
  return state.presets.find((preset) => preset.id === item.presetId) || null;
}

function getCategoryItemModeLabel(item) {
  // Convert each item's mode into the same user-facing labels used elsewhere in the UI.
  const mode = normalizeLabelMode(item.labelMode, item);
  if (mode === "sign") {
    return t("option.labelModeSign");
  }
  if (mode === "text") {
    return t("option.labelModeText");
  }
  return t("option.labelModeCode");
}

function categoryItemMatchesPresetFilter(item) {
  // Keep bulk editing focused by filtering on preset assignment or label type.
  const filter = state.categoryPresetFilter;
  const mode = normalizeLabelMode(item.labelMode, item);
  if (filter === "no-preset") {
    return !getCategoryItemPreset(item);
  }
  if (filter === "has-preset") {
    return Boolean(getCategoryItemPreset(item));
  }
  if (["code", "text", "sign"].includes(filter)) {
    return mode === filter;
  }
  return true;
}

function syncCategoryPresetFilters() {
  // Mark the active filter button after rendering or when the user changes filters.
  el.categoryPresetFilters.querySelectorAll("[data-filter]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.filter === state.categoryPresetFilter);
  });
}

function getCheckedCategoryItems() {
  // Read the category editor's checked item keys and map them back to catalog items.
  const itemByKey = new Map(state.catalog.items.map((item) => [getItemKey(item), item]));
  return [...state.categoryEditCheckedKeys]
    .map((itemKey) => itemByKey.get(itemKey))
    .filter(Boolean);
}

function setVisibleCategoryItemSelection(checked) {
  // Toggle every currently visible category row checkbox and preserve the pending category assignment.
  el.categoryItemList.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
    if (checkbox.disabled) {
      return;
    }
    checkbox.checked = checked;
    if (checked) {
      state.categoryEditCheckedKeys.add(checkbox.dataset.itemKey);
    } else {
      state.categoryEditCheckedKeys.delete(checkbox.dataset.itemKey);
    }
  });
}

function appendCategorySelectionToolbar() {
  // Keep select and clear controls pinned inside the scrollable category item list.
  const toolbar = document.createElement("div");
  const selectAllButton = document.createElement("button");
  const clearAllButton = document.createElement("button");
  toolbar.className = "category-item-toolbar";
  selectAllButton.className = "secondary-button";
  selectAllButton.type = "button";
  selectAllButton.dataset.categorySelect = "all";
  selectAllButton.textContent = t("action.selectVisible");
  clearAllButton.className = "secondary-button";
  clearAllButton.type = "button";
  clearAllButton.dataset.categorySelect = "none";
  clearAllButton.textContent = t("action.clearSelection");
  toolbar.append(selectAllButton, clearAllButton);
  el.categoryItemList.append(toolbar);
}

function refreshCategoryBulkPresetView() {
  // Re-render the open category modal after preset changes or filter changes.
  if (state.selectedCategory) {
    populateCategoryPresetSelect();
    renderCategoryItemChecklist(state.selectedCategory.name);
  }
}

function renderCategoryItemChecklist(categoryName) {
  // Show catalog items with checkboxes that assign membership to the edited category.
  el.categoryItemList.innerHTML = "";
  syncCategoryPresetFilters();
  appendCategorySelectionToolbar();
  const items = state.catalog.items
    .slice()
    .filter(categoryItemMatchesPresetFilter)
    .sort((a, b) => a.title.localeCompare(b.title));
  if (!items.length) {
    const empty = document.createElement("p");
    empty.className = "category-item-empty";
    empty.textContent = t("status.noCategoryItems");
    el.categoryItemList.append(empty);
    return;
  }

  items.forEach((item) => {
    const itemKey = getItemKey(item);
    const itemCategoryName = normalizeCategoryName(item.category);
    const itemCategory = getCategory(itemCategoryName);
    const row = document.createElement("label");
    const text = document.createElement("span");
    const title = document.createElement("span");
    const meta = document.createElement("span");
    const code = document.createElement("span");
    const mode = document.createElement("span");
    const categoryTag = document.createElement("span");
    const presetTag = document.createElement("span");
    const lockTag = document.createElement("span");
    const checkbox = document.createElement("input");
    const itemPreset = getCategoryItemPreset(item);
    const itemLocked = isCatalogEntryLocked(item);
    row.className = "category-item-row";
    row.classList.toggle("is-locked", itemLocked);
    text.className = "category-item-text";
    title.textContent = item.title;
    meta.className = "category-item-meta";
    code.className = "category-item-code";
    code.textContent = normalizeLabelMode(item.labelMode, item) === "sign" ? t("option.labelModeSign") : item.code || t("status.textOnly");
    mode.className = "category-item-tag";
    mode.textContent = getCategoryItemModeLabel(item);
    mode.style.setProperty("--tag-color", DEFAULT_CATEGORY_COLOR);
    categoryTag.className = "category-item-tag";
    categoryTag.textContent = itemCategoryName || t("status.uncategorized");
    categoryTag.style.setProperty("--tag-color", normalizeCategoryColor(itemCategory?.color || DEFAULT_CATEGORY_COLOR));
    presetTag.className = `category-preset-badge${itemPreset ? "" : " is-empty"}`;
    presetTag.textContent = itemPreset ? itemPreset.name : t("status.noPresetAssigned");
    lockTag.className = `category-item-tag${itemLocked ? "" : " is-hidden"}`;
    lockTag.textContent = getLockIcon(item);
    lockTag.style.setProperty("--tag-color", DEFAULT_CATEGORY_COLOR);
    checkbox.type = "checkbox";
    checkbox.checked = state.categoryEditCheckedKeys.has(itemKey);
    checkbox.dataset.itemKey = itemKey;
    checkbox.disabled = itemLocked;
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        state.categoryEditCheckedKeys.add(itemKey);
      } else {
        state.categoryEditCheckedKeys.delete(itemKey);
      }
    });
    meta.append(code, mode, categoryTag, presetTag, lockTag);
    text.append(title, meta);
    row.append(checkbox, text);
    el.categoryItemList.append(row);
  });
}

function openCategoryEditModal() {
  // Fill the category editor with category details and the bulk preset workspace.
  if (!state.selectedCategory) {
    return;
  }

  el.categoryModalError.textContent = "";
  state.categoryPresetFilter = "all";
  state.categoryEditCheckedKeys = new Set(
    state.catalog.items
      .filter((item) => categoriesMatch(item.category, state.selectedCategory.name))
      .map(getItemKey)
  );
  el.categoryNameInput.value = state.selectedCategory.name;
  el.categoryColorInput.value = normalizeCategoryColor(state.selectedCategory.color);
  populateCategoryPresetSelect();
  renderCategoryItemChecklist(state.selectedCategory.name);
  syncCategoryEditLockState();
  el.categoryEditModal.classList.add("is-open");
  el.categoryEditModal.setAttribute("aria-hidden", "false");
  if (isCatalogEntryLocked(state.selectedCategory)) {
    el.categoryEditLockButton.focus();
  } else {
    el.categoryNameInput.focus();
    el.categoryNameInput.select();
  }
}

function closeCategoryEditModal() {
  // Hide the category editor and return focus to the shared edit action.
  el.categoryEditModal.classList.remove("is-open");
  el.categoryEditModal.setAttribute("aria-hidden", "true");
  el.categoryModalError.textContent = "";
  state.categoryEditCheckedKeys = new Set();
  el.editCodeButton.focus();
}

function syncCategoryEditLockState() {
  // Disable category editor fields while the selected category is PIN locked.
  const locked = isCatalogEntryLocked(state.selectedCategory);
  updateLockButton(el.categoryEditLockButton, state.selectedCategory);
  el.categoryEditForm.querySelectorAll("input, select, textarea, button").forEach((control) => {
    if ([el.categoryEditLockButton, el.categoryEditCancelButton, el.categoryEditCloseButton].includes(control)) {
      return;
    }
    control.disabled = locked;
  });
}

function saveCategoryEditFromModal() {
  // Persist category details and apply the checked catalog item membership.
  if (!state.selectedCategory) {
    closeCategoryEditModal();
    return;
  }
  if (isCatalogEntryLocked(state.selectedCategory)) {
    alertLockedEntry(state.selectedCategory.name);
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
  const checkedKeys = new Set(state.categoryEditCheckedKeys);
  if (!categoriesMatch(oldName, nextName) && state.catalog.items.some((item) => isCatalogEntryLocked(item) && categoriesMatch(item.category, oldName))) {
    el.categoryModalError.textContent = t("alert.lockedCategoryItems");
    return;
  }
  if (
    oldColor.toLowerCase() !== nextColor.toLowerCase() &&
    state.catalog.items.some((item) => isCatalogEntryLocked(item) && (checkedKeys.has(getItemKey(item)) || categoriesMatch(item.category, oldName)))
  ) {
    el.categoryModalError.textContent = t("alert.lockedCategoryItems");
    return;
  }
  const changesLockedItem = state.catalog.items.some((item) => {
    const itemKey = getItemKey(item);
    return isCatalogEntryLocked(item) && checkedKeys.has(itemKey) !== categoriesMatch(item.category, oldName);
  });
  if (changesLockedItem) {
    el.categoryModalError.textContent = t("alert.lockedCategoryItems");
    return;
  }
  const changesLockedCategoryMembership = state.catalog.items.some((item) => {
    const currentCategory = getCategory(item.category);
    const itemKey = getItemKey(item);
    return currentCategory && isCatalogEntryLocked(currentCategory) && !categoriesMatch(currentCategory.name, oldName) && checkedKeys.has(itemKey);
  });
  if (changesLockedCategoryMembership) {
    el.categoryModalError.textContent = t("alert.lockedCategoryItems");
    return;
  }
  const shouldAbortMove = state.catalog.items.some((item) => {
    const itemKey = getItemKey(item);
    const currentCategory = normalizeCategoryName(item.category);
    if (!checkedKeys.has(itemKey) || !currentCategory || categoriesMatch(currentCategory, oldName) || categoriesMatch(currentCategory, nextName)) {
      return false;
    }
    return !window.confirm(t("confirm.moveItemCategory", { title: item.title, category: currentCategory, nextCategory: nextName }));
  });
  if (shouldAbortMove) {
    return;
  }

  state.catalog.items.forEach((item) => {
    const itemKey = getItemKey(item);
    if (checkedKeys.has(itemKey)) {
      item.category = nextName;
    } else if (categoriesMatch(item.category, oldName)) {
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
  renderLabels();
  closeCategoryEditModal();
}

function applyPresetToSelectedCategoryItems() {
  // Assign one saved preset only to checked rows in the category editor.
  const preset = state.presets.find((savedPreset) => savedPreset.id === el.categoryPresetSelect.value) || null;
  const items = getCheckedCategoryItems();
  if (!preset) {
    el.categoryModalError.textContent = t("alert.selectPreset");
    return;
  }
  if (!items.length) {
    el.categoryModalError.textContent = t("alert.selectCategoryItems");
    return;
  }
  if (items.some(isCatalogEntryLocked)) {
    el.categoryModalError.textContent = t("alert.lockedCategoryItems");
    return;
  }
  if (!window.confirm(t("confirm.applyPresetToItems", { preset: preset.name, count: items.length }))) {
    return;
  }

  items.forEach((item) => {
    item.presetId = preset.id;
    item.settings = getItemPresetSettings(preset.settings);
  });
  el.categoryModalError.textContent = "";
  saveCatalog();
  refreshCategoryBulkPresetView();
  renderSearchOptions();
  renderSelectedItem();
  renderLabels();
}

function clearPresetFromSelectedCategoryItems() {
  // Clear saved preset links only from checked rows in the category editor.
  const items = getCheckedCategoryItems();
  if (!items.length) {
    el.categoryModalError.textContent = t("alert.selectCategoryItems");
    return;
  }
  if (items.some(isCatalogEntryLocked)) {
    el.categoryModalError.textContent = t("alert.lockedCategoryItems");
    return;
  }
  if (!window.confirm(t("confirm.clearPresetFromItems", { count: items.length }))) {
    return;
  }

  items.forEach((item) => {
    item.presetId = "";
  });
  el.categoryModalError.textContent = "";
  saveCatalog();
  refreshCategoryBulkPresetView();
  renderSearchOptions();
  renderSelectedItem();
  renderLabels();
}

function saveItemEditFromModal(options = {}) {
  // Validate and persist changes made in the standalone catalog item editor.
  if (!state.selectedItem) {
    closeItemEditModal();
    return;
  }
  if (isCatalogEntryLocked(state.selectedItem)) {
    alertLockedEntry(state.selectedItem.title);
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
  const currentCategory = getCategory(currentItem.category);

  if (!nextTitle || (nextCode && !isCodeValidForType(nextCode, nextCodeType))) {
    el.editModalError.textContent = t("alert.titleAndOptionalCode");
    setItemEditDuplicateOverrideVisible(false);
    return;
  }

  const duplicate = nextCode ? state.catalog.items.find((item) => item.code === nextCode && item !== currentItem) : null;
  if (duplicate && !options.allowDuplicateCode) {
    el.editModalError.textContent = t("alert.duplicateCodeWithItem", { title: duplicate.title, code: nextCode });
    setItemEditDuplicateOverrideVisible(true);
    return;
  }
  setItemEditDuplicateOverrideVisible(false);
  const changesLockedCategory =
    (currentCategory && isCatalogEntryLocked(currentCategory) && !categoriesMatch(currentCategory.name, nextCategory)) ||
    (existingCategory && isCatalogEntryLocked(existingCategory) && !categoriesMatch(currentItem.category, nextCategory));
  if (changesLockedCategory) {
    el.editModalError.textContent = t("alert.lockedEntry", { name: currentCategory?.name || existingCategory.name });
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
  if (state.selectedSheet) {
    alert(t("alert.editSavedSheet", { mode: t(getSheetModeLabelKey(state.selectedSheet.mode)) }));
    return;
  }
  if (state.selectedCategory) {
    openCategoryEditModal();
    return;
  }
  openItemEditModal();
}

function deleteSelectedCode() {
  // Remove the selected item or selected category from localStorage-backed catalog data.
  if (state.selectedSheet) {
    deleteSelectedSheet();
    return;
  }
  if (state.selectedCategory) {
    deleteSelectedCategory();
    return;
  }
  if (!state.selectedItem) {
    return;
  }
  if (isCatalogEntryLocked(state.selectedItem)) {
    alertLockedEntry(state.selectedItem.title);
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

function deleteSelectedSheet() {
  // Remove the selected saved sheet from the catalog-backed sheet collection.
  if (!state.selectedSheet) {
    return;
  }

  const confirmed = window.confirm(t("confirm.deleteSavedSheet", { name: state.selectedSheet.name }));
  if (!confirmed) {
    return;
  }

  const deletedId = state.selectedSheet.id;
  state.catalog.labelSheets = state.catalog.labelSheets.filter((sheet) => sheet.id !== deletedId);
  state.selectedSheet = null;
  state.selectedSheetSettingsBaseline = "";
  saveCatalog();
  renderSearchOptions();
  renderSelectedItem();
  renderLabels();
}

function deleteSelectedCategory() {
  // Delete only the category and move its items back to uncategorized.
  if (!state.selectedCategory) {
    return;
  }
  if (isCatalogEntryLocked(state.selectedCategory)) {
    alertLockedEntry(state.selectedCategory.name);
    return;
  }

  const categoryName = state.selectedCategory.name;
  if (state.catalog.items.some((item) => isCatalogEntryLocked(item) && categoriesMatch(item.category, categoryName))) {
    alert(t("alert.lockedCategoryItems"));
    return;
  }
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

function getCodePayload(item, settings = null) {
  // Choose the value printed and encoded for the currently selected symbol type.
  const sheetMode = normalizeSheetFillMode(el.sheetFillMode.value);
  const usesLiveCodeType = item === state.selectedItem || (!item?.locked && ["queue", "freestyle"].includes(sheetMode));
  const codeType = normalizeCodeType(settings?.codeType || (usesLiveCodeType ? el.codeType.value || item.codeType : item.codeType || el.codeType.value));
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

function getLabelSetting(settings, key, fallback) {
  // Read a locked queue style value while falling back to the live controls for unlocked labels.
  return settings && settings[key] !== undefined ? settings[key] : fallback;
}

function getLabelBoolean(settings, key, fallback) {
  // Normalize stored checkbox values before rendering a locked queue label.
  return Boolean(getLabelSetting(settings, key, fallback));
}

function applyLockedLabelStyles(label, settings) {
  // Apply captured style variables to one locked queue label instead of the whole sheet.
  if (!settings) {
    return;
  }

  const mmVariables = {
    titleSize: "--title-size",
    codeTextSize: "--code-text-size",
    textAboveSize: "--text-above-size",
    textBelowSize: "--text-below-size",
    codePaddingLeft: "--code-padding-left",
    codePaddingRight: "--code-padding-right",
    codePaddingTop: "--code-padding-top",
    codePaddingBottom: "--code-padding-bottom",
    barcodeMaxHeight: "--barcode-max-height",
    qrMaxSize: "--qr-max-size",
    signMaxSize: "--sign-max-size",
    signPaddingLeft: "--sign-padding-left",
    signPaddingRight: "--sign-padding-right",
    signPaddingTop: "--sign-padding-top",
    signPaddingBottom: "--sign-padding-bottom",
  };
  Object.entries(mmVariables).forEach(([key, variable]) => {
    if (settings[key] !== undefined) {
      label.style.setProperty(variable, `${Number(settings[key]) || 0}mm`);
    }
  });

  if (settings.labelFont) {
    label.style.setProperty("--label-font", settings.labelFont);
  }
  if (settings.textAlign) {
    const textAlign = normalizeTextAlign(settings.textAlign);
    label.style.setProperty("--text-align", textAlign);
    label.style.setProperty("--text-justify", getTextJustify(textAlign));
  }
  label.style.setProperty("--title-weight", settings.titleBold ? "700" : "400");
  label.style.setProperty("--title-style", settings.titleItalic ? "italic" : "normal");
  label.style.setProperty("--code-text-weight", settings.codeBold ? "700" : "400");
  label.style.setProperty("--code-text-style", settings.codeItalic ? "italic" : "normal");
  label.style.setProperty("--text-middle-weight", settings.textMiddleBold ? "700" : "400");
  label.style.setProperty("--text-middle-style", settings.textMiddleItalic ? "italic" : "normal");
  label.style.setProperty("--text-above-weight", settings.textAboveBold ? "700" : "400");
  label.style.setProperty("--text-above-style", settings.textAboveItalic ? "italic" : "normal");
  label.style.setProperty("--text-below-weight", settings.textBelowBold ? "700" : "400");
  label.style.setProperty("--text-below-style", settings.textBelowItalic ? "italic" : "normal");
  label.style.setProperty("--experimental-label-bg", normalizeColor(settings.experimentalLabelBackground, "#ffffff"));
  label.style.setProperty("--experimental-barcode-color", normalizeColor(settings.experimentalBarcodeColor, "#111111"));
  label.style.setProperty("--experimental-title-color", normalizeColor(settings.experimentalTitleColor, "#111827"));
  label.style.setProperty("--experimental-code-number-color", normalizeColor(settings.experimentalCodeNumberColor, "#111827"));
}

function getQueueLabelStyleSettings(item) {
  // Apply locked queue row styling while leaving unlocked rows on the live global style.
  if (item?.locked) {
    return normalizeLockedSheetSettings(item.lockedSettings);
  }
  return null;
}

function createLabel(item, options = {}) {
  // Build one label cell with title, selected code symbol, and readable code number.
  const styleSettings = options.styleSettings || getQueueLabelStyleSettings(item);
  const includeTitle = getLabelBoolean(styleSettings, "includeTitle", el.includeTitle.checked);
  const includeCodeNumber = getLabelBoolean(styleSettings, "includeCodeNumber", el.includeCodeNumber.checked);
  const includeTextAbove = getLabelBoolean(styleSettings, "includeTextAbove", el.includeTextAbove.checked);
  const includeTextBelow = getLabelBoolean(styleSettings, "includeTextBelow", el.includeTextBelow.checked);
  const labelPartOrder = normalizeLabelPartOrder(getLabelSetting(styleSettings, "labelPartOrder", state.labelPartOrder));
  const label = document.createElement("article");
  label.className = "label";
  label.classList.add("has-custom-order");
  label.classList.toggle("without-title", !includeTitle);
  label.classList.toggle("without-code-number", !includeCodeNumber);
  applyLockedLabelStyles(label, styleSettings);

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
    if (includeTitle && item.title) {
      topGroup.append(title);
    }
    if (item.signalWord) {
      const signalWord = document.createElement("div");
      signalWord.className = "sign-signal-word";
      signalWord.textContent = item.signalWord;
      topGroup.append(signalWord);
    }
    if (includeTextAbove && item.textAbove) {
      topGroup.append(upperText);
    }
    appendOrderedLabelParts(signLabel, {
      top: topGroup.children.length ? topGroup : null,
      main: signGrid,
      bottom: includeTextBelow && item.textBelow ? lowerText : null,
    }, labelPartOrder);
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
      top: includeTextAbove && item.textAbove ? upperText : null,
      main: centerText,
      bottom: includeTextBelow && item.textBelow ? lowerText : null,
    }, labelPartOrder);
    label.classList.add("text-only");
    label.append(textOnly);
    return label;
  }

  const payload = getCodePayload(item, styleSettings);
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
    top: includeTitle ? title : null,
    main: barcode,
    bottom: includeCodeNumber ? number : null,
  }, labelPartOrder);
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

function appendOrderedLabelParts(container, parts, order = state.labelPartOrder) {
  // Append only the visible label part nodes using the global drag-sorted order.
  normalizeLabelPartOrder(order).forEach((part) => {
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
  state.labelSortDrop = null;
  el.labelSortList.classList.remove("is-sorting");
  el.labelSortList.querySelectorAll(".label-sort-item").forEach((item) => {
    item.classList.remove("is-dragging", "is-drop-target", "is-drop-before", "is-drop-after");
  });
}

function updateLabelSortDropTarget(target, position) {
  // Open a visible before/after drop slot on the rectangle currently under the pointer.
  state.labelSortDrop = target?.dataset.part ? { part: target.dataset.part, position } : null;
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

function getLabelSortTargetFromPoint(clientY) {
  // Resolve a before/after slot from the pointer Y position, including the visual gaps opened during sorting.
  const items = [...el.labelSortList.querySelectorAll(".label-sort-item")].filter((item) => item.getAttribute("aria-disabled") !== "true");
  if (!items.length) {
    return null;
  }

  for (const item of items) {
    const rect = item.getBoundingClientRect();
    if (clientY < rect.top + rect.height / 2) {
      return { target: item, position: "before" };
    }
  }
  return { target: items[items.length - 1], position: "after" };
}

function getLabelSortDropFromState() {
  // Return the last highlighted drop slot so dropping on the opened gap still succeeds.
  if (!state.labelSortDrop) {
    return null;
  }
  const target = [...el.labelSortList.querySelectorAll(".label-sort-item")].find((item) => item.dataset.part === state.labelSortDrop.part);
  return target ? { target, position: state.labelSortDrop.position } : null;
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
  const sheetMode = normalizeSheetFillMode(el.sheetFillMode.value);
  if (sheetMode === "freestyle") {
    syncActiveFreestyleStyleFromControls();
  }
  const innerWidth = layout.width - layout.marginLeft - layout.marginRight - layout.gapX * (layout.columns - 1);
  const innerHeight = layout.height - layout.marginTop - layout.marginBottom - layout.gapY * (layout.rows - 1);
  const labelWidth = Math.max(1, innerWidth / layout.columns);
  const labelHeight = Math.max(1, innerHeight / layout.rows);

  el.paper.style.width = `${layout.width}mm`;
  el.paper.style.height = `${layout.height}mm`;
  el.paper.classList.toggle("is-freestyle", sheetMode === "freestyle");
  el.paper.style.padding =
    sheetMode === "freestyle" ? "0" : `${layout.marginTop}mm ${layout.marginRight}mm ${layout.marginBottom}mm ${layout.marginLeft}mm`;
  el.paper.style.gap = sheetMode === "freestyle" ? "0" : `${layout.gapY}mm ${layout.gapX}mm`;
  el.paper.style.gridTemplateColumns = sheetMode === "freestyle" ? "1fr" : `repeat(${layout.columns}, ${labelWidth}mm)`;
  el.paper.style.gridTemplateRows = sheetMode === "freestyle" ? "1fr" : `repeat(${layout.rows}, ${labelHeight}mm)`;
  applyTypography();
  applyExperimentalStyles();
  el.paper.innerHTML = "";
  el.experimentalPrintCount.max = String(count);

  if (sheetMode === "freestyle") {
    renderFreestyleObjects();
  } else {
    for (let index = 0; index < count; index += 1) {
      const sheetItem = index < labelsToPrint ? getSheetCellItem(index, labelsToPrint) : null;
      el.paper.append(sheetItem ? createLabel(sheetItem) : createBlankLabel());
    }
  }

  renderLabelSortControls();
  renderSheetFillControls();
  applyPreviewZoom();
  const unitLabel = state.measurementUnit === "imperial" ? "in" : "mm";
  // Show the active sheet fill content in the preview toolbar metadata.
  const labelTitle = getSheetMetaTitle(labelsToPrint);
  renderLayoutMeta({
    count: sheetMode === "freestyle" ? state.freestyleObjects.length : count,
    title: labelTitle,
    width: formatMeasurement(sheetMode === "freestyle" ? layout.width : labelWidth),
    height: formatMeasurement(sheetMode === "freestyle" ? layout.height : labelHeight),
    unit: unitLabel,
  });
  updateCurrentSaveButtonVisibility();
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
    settings: getItemPresetSettings(item.settings || item.itemSettings || item.labelSettings) || undefined,
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

function getShareableSheetTitle() {
  // Name sheet-only shares from the active saved sheet or current sheet mode.
  const mode = normalizeSheetFillMode(el.sheetFillMode.value);
  if (state.selectedSheet?.name) {
    return state.selectedSheet.name;
  }
  return t(getSheetModeLabelKey(mode));
}

function currentSheetCanBeSharedWithoutCatalogItem() {
  // Allow generated sheet modes to be shared without forcing a catalog item first.
  const mode = normalizeSheetFillMode(el.sheetFillMode.value);
  return (
    Boolean(state.selectedSheet) ||
    mode === "sequence" ||
    (mode === "queue" && state.sheetQueue.length > 0) ||
    (mode === "freestyle" && state.freestyleObjects.length > 0)
  );
}

function getPayloadTitle(payload) {
  // Pick a stable human-readable name for link files and fallback print titles.
  return payload?.item?.title || payload?.sheet?.name || getShareableSheetTitle();
}

function buildCurrentLabelPayload() {
  // Build the shared label package used by links and downloadable label files.
  if (!state.selectedItem && !currentSheetCanBeSharedWithoutCatalogItem()) {
    alert(t("alert.selectItemToShare"));
    return null;
  }

  const payload = {
    version: 1,
    settings: collectSettingsSnapshot(),
  };
  if (!state.selectedItem) {
    payload.sheet = {
      name: getShareableSheetTitle(),
      mode: normalizeSheetFillMode(el.sheetFillMode.value),
    };
    return payload;
  }

  return {
    ...payload,
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
      settings: getItemPresetSettings(state.selectedItem.settings) || undefined,
      textAbove: String(state.selectedItem.textAbove || "").trim(),
      textBelow: String(state.selectedItem.textBelow || "").trim(),
    },
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

function getPrintTimestampForFilename(date = new Date()) {
  // Format the local print timestamp without seconds so PDF filenames stay readable.
  const pad = (value) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}_${pad(date.getHours())}-${pad(date.getMinutes())}`;
}

function getPrintFilenameTitle() {
  // Build the temporary document title used by browsers as the default print-to-PDF filename.
  const layout = getLayout();
  const count = layout.columns * layout.rows;
  const itemName = state.selectedItem?.title || state.selectedSheet?.name || getSheetMetaTitle(getLabelsToPrint(count));
  return `labelab_${createFileSafeName(itemName)}_${getPrintTimestampForFilename()}`;
}

function createTimestampedLabelFilename(title) {
  // Reuse the print/PDF naming pattern for downloadable Labelab files.
  return `labelab_${createFileSafeName(title)}_${getPrintTimestampForFilename()}`;
}

function openShareModal() {
  // Open the share/save chooser while keeping the current URL share behavior available.
  if (!buildCurrentLabelPayload()) {
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

function printWithBorderChoice() {
  // Ask whether dashed cut borders should be included only for the upcoming print job.
  const includeBorders = window.confirm(t("confirm.printLabelBorders"));
  const previousTitle = document.title;
  const restoreTitle = () => {
    document.title = previousTitle;
    window.removeEventListener("afterprint", restoreTitle);
  };
  document.body.classList.toggle("print-with-label-borders", includeBorders);
  document.title = getPrintFilenameTitle();
  window.addEventListener("afterprint", restoreTitle);
  window.print();
  window.setTimeout(restoreTitle, 1000);
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
  link.download = `${createTimestampedLabelFilename(getPayloadTitle(payload))}.label.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function printCurrentLabelFromShareModal() {
  // Let the browser print dialog handle PDF output without changing the existing paper layout.
  closeShareModal();
  printWithBorderChoice();
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
    if (payload.item) {
      const sharedCode = String(payload.item?.code || "").trim();
      const sharedId = String(payload.item?.id || "").trim();
      const exists = sharedCode
        ? state.catalog.items.some((item) => item.code === sharedCode)
        : state.catalog.items.some((item) => getItemKey(item) === sharedId);
      const shouldSave = exists || window.confirm(t("confirm.saveSharedItem", { title: payload.item?.title || "" }));
      const sharedItem = upsertSharedItem(payload.item, shouldSave);
      if (!sharedItem) {
        throw new Error("Invalid shared item");
      }
      el.searchInput.value = sharedItem.title;
    } else {
      state.selectedItem = null;
      state.selectedSheet = null;
      state.selectedCategory = null;
      el.searchInput.value = "";
    }
    renderSearchOptions();
    renderSelectedItem();
    renderLabels();
    saveSettings();

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
  showStatusToast(message);
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
        importedItems: summary.importedItems,
        importedCategories: summary.importedCategories,
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
  const sheetsById = new Map();
  const favoriteGridsById = new Map();
  currentCatalog.categories.forEach((category) => {
    categoriesByName.set(normalizeCategoryName(category.name).toLowerCase(), { ...category });
  });
  currentCatalog.presets.forEach((preset) => {
    presetsById.set(preset.id, { ...preset });
  });
  normalizeLabelSheets(currentCatalog.labelSheets).forEach((sheet) => {
    sheetsById.set(sheet.id, { ...sheet });
  });
  normalizeFavoriteGrids(currentCatalog.favoriteGrids || currentCatalog.globalSettings?.favoriteGrids || []).forEach((grid) => {
    favoriteGridsById.set(grid.id, { ...grid });
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
  normalizeLabelSheets(importedCatalog.labelSheets).forEach((sheet) => {
    if (!sheetsById.has(sheet.id)) {
      sheetsById.set(sheet.id, { ...sheet });
    }
  });
  normalizeFavoriteGrids(importedCatalog.favoriteGrids || importedCatalog.globalSettings?.favoriteGrids || []).forEach((grid) => {
    if (!favoriteGridsById.has(grid.id)) {
      favoriteGridsById.set(grid.id, { ...grid });
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
  const labelSheets = normalizeLabelSheets([...sheetsById.values()]);
  const favoriteGrids = normalizeFavoriteGrids([...favoriteGridsById.values()]);
  const items = [...itemsByKey.values()].sort((a, b) => (a.category || "").localeCompare(b.category || "") || a.title.localeCompare(b.title));
  return normalizeCatalog({
    lastUpdate: new Date().toISOString(),
    categories,
    presets,
    labelSheets,
    favoriteGrids,
    globalSettings: {
      favoriteGrids,
    },
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
  state.catalog.labelSheets = normalizeLabelSheets(state.catalog.labelSheets);
  state.favoriteGrids = normalizeFavoriteGrids(state.catalog.favoriteGrids || state.catalog.globalSettings?.favoriteGrids || []);
  renderGridPresetOptions(el.gridPreset.value);
  state.selectedItem = null;
  state.selectedCategory = null;
  state.selectedSheet = null;
  state.selectedItemSettingsBaseline = "";
  state.selectedSheetSettingsBaseline = "";
  closeImportReviewModal();
  saveCatalog();
  saveSettings();
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
  el.createCategoryButton.addEventListener("click", createCatalogCategoryFromAction);
  el.saveSheetButton.addEventListener("click", saveCurrentWork);
  el.applyPresetButton.addEventListener("click", applySelectedPreset);
  el.savePresetButton.addEventListener("click", saveCurrentAsPreset);
  el.updatePresetButton.addEventListener("click", updateSelectedPreset);
  el.renamePresetButton.addEventListener("click", renameSelectedPreset);
  el.deletePresetButton.addEventListener("click", deleteSelectedPreset);
  el.exportButton.addEventListener("click", exportJson);
  el.printButton.addEventListener("click", printWithBorderChoice);
  el.saveItemSetupButton.addEventListener("click", saveCurrentWork);
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
  el.itemEditIgnoreDuplicateButton.addEventListener("click", () => {
    // Save only after the user explicitly accepts keeping a duplicate code.
    saveItemEditFromModal({ allowDuplicateCode: true });
  });
  el.itemEditLockButton.addEventListener("click", () => {
    // Let the item editor lock or unlock the current item without closing the modal.
    if (!state.selectedItem) {
      return;
    }
    toggleCatalogItemLock(state.selectedItem);
    syncItemEditLockState();
  });
  [el.editCodeInput, el.editCodeTypeInput].forEach((input) => {
    // Hide the duplicate override as soon as the code being validated changes.
    input.addEventListener("input", () => setItemEditDuplicateOverrideVisible(false));
    input.addEventListener("change", () => setItemEditDuplicateOverrideVisible(false));
  });
  el.categoryEditForm.addEventListener("submit", (event) => {
    // Save category edits without reloading the static page.
    event.preventDefault();
    saveCategoryEditFromModal();
  });
  el.categoryEditLockButton.addEventListener("click", () => {
    // Let the category editor lock or unlock the current category without closing the modal.
    if (!state.selectedCategory) {
      return;
    }
    toggleCatalogCategoryLock(state.selectedCategory);
    renderCategoryItemChecklist(state.selectedCategory.name);
    syncCategoryEditLockState();
  });
  el.applyCategoryPresetButton.addEventListener("click", applyPresetToSelectedCategoryItems);
  el.clearCategoryPresetButton.addEventListener("click", clearPresetFromSelectedCategoryItems);
  el.categoryItemList.addEventListener("click", (event) => {
    // Handle the sticky selection toolbar rendered inside the scrollable category list.
    const button = event.target.closest("[data-category-select]");
    if (!button) {
      return;
    }
    setVisibleCategoryItemSelection(button.dataset.categorySelect === "all");
  });
  el.categoryPresetFilters.addEventListener("click", (event) => {
    // Switch the category bulk-preset row filter from the filter button group.
    const button = event.target.closest("[data-filter]");
    if (!button) {
      return;
    }
    state.categoryPresetFilter = button.dataset.filter || "all";
    renderCategoryItemChecklist(state.selectedCategory?.name || "");
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
  el.paper.addEventListener("pointerdown", (event) => {
    // Route freestyle pointer starts to either drawing a new rectangle or transforming an existing one.
    if (event.target.closest(".freestyle-object")) {
      startFreestyleObjectPointer(event);
      return;
    }
    startFreestyleDraw(event);
  });
  el.paper.addEventListener("pointermove", moveFreestylePointer);
  el.paper.addEventListener("pointerup", stopFreestylePointer);
  el.paper.addEventListener("pointercancel", stopFreestylePointer);
  el.paper.addEventListener("dragover", (event) => {
    // Allow image files to be dropped directly onto the freestyle paper surface.
    if (normalizeSheetFillMode(el.sheetFillMode.value) === "freestyle") {
      event.preventDefault();
    }
  });
  el.paper.addEventListener("drop", (event) => {
    // Convert dropped image files into saved freestyle image objects at the drop point.
    if (normalizeSheetFillMode(el.sheetFillMode.value) !== "freestyle") {
      return;
    }
    event.preventDefault();
    insertFreestyleImageFiles(event.dataTransfer?.files || [], getPaperPointerPoint(event));
  });
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
      // Zoom with the mouse wheel directly over the paper, or anywhere in the preview when Ctrl is held.
      if (!event.ctrlKey && !event.target.closest("#paper")) {
        return;
      }

      event.preventDefault();
      setPreviewZoom(state.previewZoom + (event.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP), event);
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

  el.saveGridButton.addEventListener("click", saveCurrentGridAsFavorite);
  el.removeGridButton.addEventListener("click", removeSelectedFavoriteGrid);
  el.gridPreset.addEventListener("change", () => {
    applyGridPreset();
    renderLabels();
  });
  el.sheetFillMode.addEventListener("change", () => {
    // Switch between repeat, sequence, and manual queue sheet composition modes.
    const nextMode = normalizeSheetFillMode(el.sheetFillMode.value);
    let didRefreshSelection = false;
    const shouldClearSelectedSheet = Boolean(state.selectedSheet && nextMode !== normalizeSheetFillMode(state.selectedSheet.mode));
    if (nextMode !== "repeat" && state.selectedItem) {
      if (selectedItemHasUnsavedSetupChanges() && !window.confirm(t("confirm.unsavedItemSetup", { title: state.selectedItem.title }))) {
        el.sheetFillMode.value = "repeat";
        renderSheetFillControls();
        renderLabels();
        return;
      }
    }
    if (shouldClearSelectedSheet) {
      state.selectedSheet = null;
      state.selectedSheetSettingsBaseline = "";
    }
    if (nextMode !== "repeat" && state.selectedItem) {
      clearSelectedCatalogItemContext();
      renderSelectedItem();
      renderSearchOptions();
      didRefreshSelection = true;
    }
    if (!didRefreshSelection) {
      renderSelectedItem();
      renderSearchOptions();
    }
    renderSheetFillControls();
    renderLabels();
  });
  [el.sequenceStart, el.sequenceEnd, el.sequenceStep, el.sequencePad, el.sequencePrefix, el.sequenceSuffix].forEach((input) => {
    input.addEventListener("input", renderLabels);
  });
  el.addSelectedToQueueButton.addEventListener("click", addSelectedItemToSheetQueue);
  el.addCustomToQueueButton.addEventListener("click", addCustomItemToSheetQueue);
  el.selectFreestyleImageButton.addEventListener("click", () => {
    // Open the native file picker for adding raster or SVG images to freestyle sheets.
    el.freestyleImageInput.click();
  });
  el.freestyleImageInput.addEventListener("change", () => {
    // Import selected image files and clear the input so the same file can be picked again.
    insertFreestyleImageFiles(el.freestyleImageInput.files || []);
    el.freestyleImageInput.value = "";
  });
  el.clearQueueButton.addEventListener("click", clearSheetQueue);
  el.textAlignGroup.querySelectorAll("[data-text-align]").forEach((button) => {
    button.addEventListener("click", () => {
      // Change text alignment for labels and the active freestyle caret position.
      setTextAlign(button.dataset.textAlign);
    });
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
    // Track the intended slot across the full list, including opened spacing between rectangles.
    const dropTarget = getLabelSortTargetFromPoint(event.clientY);
    if (!dropTarget) {
      return;
    }
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    updateLabelSortDropTarget(dropTarget.target, dropTarget.position);
  });
  el.labelSortList.addEventListener("dragleave", (event) => {
    // Remove the open slot when the pointer leaves the whole sort list.
    if (!el.labelSortList.contains(event.relatedTarget)) {
      clearLabelSortDropState();
    }
  });
  el.labelSortList.addEventListener("drop", (event) => {
    // Move the dragged label region into the visible before/after slot.
    const dropTarget = getLabelSortDropFromState() || getLabelSortTargetFromPoint(event.clientY);
    const part = event.dataTransfer.getData("text/plain");
    if (!dropTarget || !part) {
      return;
    }
    event.preventDefault();
    const beforePart = getLabelSortDropPart(dropTarget.target, dropTarget.position);
    clearLabelSortDropState();
    if (part !== beforePart) {
      moveLabelPart(part, beforePart);
    }
  });

  el.newCustomSignInput.addEventListener("input", () => renderCustomSignPreview(el.newCustomSignInput, el.newCustomSignPreview));
  el.editCustomSignInput.addEventListener("input", () => renderCustomSignPreview(el.editCustomSignInput, el.editCustomSignPreview));
  el.newSignSearch.addEventListener("input", () => rendersignPicker(el.newsignGrid, getSelectedsigns(el.newsignGrid)));
  el.mixSignSearch.addEventListener("input", () => rendersignPicker(el.mixsignGrid, getSelectedsigns(el.mixsignGrid)));
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
  window.addEventListener("afterprint", () => {
    // Remove the one-print border preference so the next print asks again.
    document.body.classList.remove("print-with-label-borders");
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
    syncFavoriteGridsFromCatalog();
  } catch (error) {
    state.catalog = normalizeCatalog({ items: [] });
    syncPresetsFromCatalog();
    syncFavoriteGridsFromCatalog();
    el.catalogMeta.textContent = t("status.importCodesToStart");
    console.error(error);
  }

  await loadMessages(state.locale);
  applyTranslations();
  renderGridPresetOptions(el.gridPreset.value);
  rendersignPicker(el.mixsignGrid, []);
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
