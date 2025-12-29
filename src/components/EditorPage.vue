<template>
  <div class="h-screen flex flex-col bg-gray-100">
    <!-- ================= HEADER ================= -->
    <header class="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 flex-shrink-0 z-20">
      <!-- Left -->
      <div class="flex items-center gap-4">
        <button @click="goBack" class="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition group">
          <i class="fa fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
          <span class="font-medium">Back to Themes</span>
        </button>

        <div class="h-8 w-px bg-gray-300"></div>

        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
            <i class="fa fa-th-large text-white text-xs"></i>
          </div>
          <span class="font-semibold text-gray-900">Form Editor</span>
        </div>
      </div>

      <!-- Right -->
      <div class="flex items-center gap-3">
        <!-- Device Toggle -->
        <div class="flex bg-gray-100 rounded-lg p-1">
          <button @click="previewDevice = 'desktop'" :class="deviceBtnClass('desktop')">
            <i class="fa fa-desktop mr-1"></i> Desktop
          </button>
          <button @click="previewDevice = 'mobile'" :class="deviceBtnClass('mobile')">
            <i class="fa fa-mobile-alt mr-1"></i> Mobile
          </button>
        </div>

        <div class="h-8 w-px bg-gray-300"></div>

        <!-- History Button -->
        <button @click="showHistory = !showHistory" :class="[
          'px-4 py-2 rounded-lg font-medium transition flex items-center gap-2',
          showHistory
            ? 'bg-green-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        ]">
          <i class="fa fa-history"></i>
          History
        </button>

        <div class="h-8 w-px bg-gray-300"></div>

        <!-- Export -->
        <button @click="generateCode"
          class="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition flex items-center gap-2">
          <i class="fa fa-code"></i>
          Generate Code
        </button>

      </div>
    </header>

    <!-- ================= BODY ================= -->
    <div class="flex-1 flex overflow-hidden">
      <!-- LEFT PANEL -->
      <aside v-if="store.editorMode === 'customize'"
        class="w-80 bg-white border-r border-gray-200 overflow-y-auto flex-shrink-0">
        <div class="p-6">
          <h2 class="text-sm font-semibold text-gray-900 mb-4">
            Style Sections
          </h2>

          <!-- Grid -->
          <div class="grid grid-cols-2 gap-4">
            <!-- Card -->
            <button v-for="item in styleSections" :key="item.key" @click="selectSection(item.key)" :class="[
              'group border rounded-xl p-4 flex flex-col items-center justify-center transition text-center',
              activeSection === item.key
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-green-500 hover:bg-green-50'
            ]">
              <div :class="[
                'w-10 h-10 rounded-lg flex items-center justify-center transition',
                activeSection === item.key
                  ? 'bg-green-100 text-green-600'
                  : 'bg-gray-100 text-gray-600 group-hover:bg-green-100 group-hover:text-green-600'
              ]">
                <i :class="item.icon"></i>
              </div>

              <span :class="[
                'mt-3 text-sm font-medium',
                activeSection === item.key ? 'text-green-700' : 'text-gray-700'
              ]">
                {{ item.label }}
              </span>
            </button>
          </div>
        </div>
      </aside>

      <!-- CENTER PREVIEW -->
      <main class="flex-1 overflow-y-auto bg-gray-100 p-8">
        <div class="flex justify-center">
          <div :class="[
            'bg-white rounded-2xl shadow-xl transition-all duration-300',
            previewDevice === 'desktop'
              ? 'w-full max-w-4xl'
              : 'w-full max-w-sm'
          ]">
            <!-- Window Bar -->
            <div class="bg-gray-50 px-4 py-3 border-b rounded-t-2xl flex items-center">
              <div class="flex gap-2">
                <span class="w-3 h-3 rounded-full bg-red-400"></span>
                <span class="w-3 h-3 rounded-full bg-yellow-400"></span>
                <span class="w-3 h-3 rounded-full bg-green-400"></span>
              </div>
              <span class="ml-auto text-xs text-gray-500">Live Preview</span>
            </div>

            <!-- Preview Content -->
            <div class="p-8 bg-gray-50">
              <div v-html="previewHTML" class="mx-auto"></div>
            </div>
          </div>
        </div>
      </main>

      <!-- RIGHT PANEL -->
      <aside v-if="store.editorMode === 'customize' && activeSection"
        class="w-80 bg-white border-l border-gray-200 overflow-y-auto flex-shrink-0">
        <div class="p-6">
          <component :is="getRightPanelComponent" />
        </div>
      </aside>

      <!-- HISTORY PANEL -->
      <aside v-if="showHistory" class="w-96 bg-white border-l border-gray-200 overflow-y-auto flex-shrink-0">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-lg font-bold text-gray-900 flex items-center gap-2">
              <i class="fa fa-history text-green-600"></i>
              Edit History
            </h2>
            <button v-if="latestHistory.length > 0" @click="clearAllHistory"
              class="text-sm text-red-600 hover:text-red-700 font-medium">
              Clear All
            </button>
          </div>

          <!-- History List -->
          <div v-if="latestHistory.length > 0" class="space-y-3">
            <div v-for="(item, index) in latestHistory" :key="index"
              class="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition relative group">
              <div class="flex items-start justify-between gap-3">
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-900">
                    {{ item.action }}
                  </p>
                  <p class="text-xs text-gray-500 mt-1">
                    {{ formatTime(item.timestamp) }}
                  </p>
                </div>
                <button @click="undoHistoryItem(item)"
                  class="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition flex items-center gap-1.5 flex-shrink-0">
                  <i class="fa fa-undo"></i>
                  Undo
                </button>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-12">
            <i class="fa fa-history text-gray-300 text-4xl mb-3"></i>
            <p class="text-gray-500 text-sm">No edit history yet</p>
          </div>
        </div>
      </aside>

      <!-- STATUS PANEL (View Mode Only) -->
      <aside v-if="store.editorMode === 'view'" class="w-96 flex items-center justify-center bg-gray-50">
        <div class="text-center px-6">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
            <i class="fa fa-check text-green-600 text-2xl"></i>
          </div>

          <h3 class="text-lg font-semibold">
            {{ appliedThemeLabel }} Applied
          </h3>

          <p class="text-sm text-gray-600 mt-2">
            Your form is styled with the selected theme.
          </p>

          <button @click="enterCustomizeMode"
            class="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700">
            Customize Further
          </button>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useDataStore } from "../store/data";
import { formThemes } from "../themes/formThemes";
import LogoSettings from "../components/Editor/LogoSettings.vue";
import ButtonSettings from "../components/Editor/ButtonSettings.vue";
import FormSettings from "../components/Editor/Formsettings.vue";
import LabelSettings from "../components/Editor/Labelsettings.vue";
import InputSettings from "../components/Editor/Inputsettings.vue";
import HeaderSettings from "../components/Editor/Headersettings.vue";
/* ================= STORE ================= */
const store = useDataStore();
const previewDevice = ref("desktop");
const activeSection = ref(null);
const showHistory = ref(false);

/* ================= INITIALIZATION ================= */
onMounted(() => {
  console.log('EditorPage mounted, theme:', store.selectedTheme);
  // Initialize button styles from selected theme when editor loads
  if (store.selectedTheme && store.selectedTheme !== 'custom') {
    // Give time for HTML to be processed
    setTimeout(() => {
      console.log('Calling initializeButtonStylesFromTheme from onMounted');
      console.log('PreviewHTML length:', previewHTML.value?.length);
      store.initializeButtonStylesFromTheme(store.selectedTheme, previewHTML.value);
    }, 500);
  }
});

// Re-initialize when buttons section is selected
watch(activeSection, (newSection, oldSection) => {
  console.log('Active section changed from', oldSection, 'to', newSection);

  if (newSection === 'buttons' && store.selectedTheme && store.selectedTheme !== 'custom') {
    console.log('Buttons section selected, initializing styles');
    console.log('Current button config:', JSON.stringify(store.buttonConfig.submit, null, 2));
    console.log('PreviewHTML length:', previewHTML.value?.length);

    // Always try to initialize when buttons section is clicked, pass the preview HTML
    setTimeout(() => {
      store.initializeButtonStylesFromTheme(store.selectedTheme, previewHTML.value);
    }, 100);
  }
});

/* ================= LEFT PANEL ================= */
const styleSections = [
  { key: "form", label: "Form", icon: "fa fa-window-maximize" },
  { key: "header", label: "Header", icon: "fa fa-heading" },
  { key: "input", label: "Input", icon: "fa fa-i-cursor" },
  { key: "label", label: "Label", icon: "fa fa-tag" },
  { key: "buttons", label: "Buttons", icon: "fa fa-square" },
  { key: "logo", label: "Logo", icon: "fa fa-image" },
];

const getRightPanelComponent = computed(() => {
  if (activeSection.value === "logo") return LogoSettings;
  if (activeSection.value === "buttons") return ButtonSettings;
  if (activeSection.value === "form") return FormSettings;
  if (activeSection.value === "label") return LabelSettings;
  if (activeSection.value === "input") return InputSettings;
  if (activeSection.value === "header") return HeaderSettings;
  return {
    template: `<div class="text-sm text-gray-500">Select a section to customize</div>`
  };
});


/* ================= HELPERS ================= */
function appendClass(html, regex, cls) {
  return html.replace(regex, (m, g1 = "") => {
    if (g1.includes(cls)) return m;
    return m.replace(g1, `${g1} ${cls}`.trim());
  });
}

/* ================= THEME ================= */
function applyThemeToHTML(rawHTML, themeName) {
  if (!rawHTML || !themeName) return rawHTML;
  const css = formThemes[themeName];
  if (!css) return rawHTML;

  let html = rawHTML;

  html = appendClass(
    html,
    /id\s*=\s*['"]crmWebToEntityForm['"][^>]*class\s*=\s*['"]([^'"]*)['"]/,
    "zd-form"
  );

  html = appendClass(html, /<input[^>]*class\s*=\s*['"]([^'"]*)['"]/g, "zd-input");
  html = appendClass(html, /<textarea[^>]*class\s*=\s*['"]([^'"]*)['"]/g, "zd-textarea");
  html = appendClass(html, /<select[^>]*class\s*=\s*['"]([^'"]*)['"]/g, "zd-select");
  html = appendClass(html, /class\s*=\s*['"]formsubmit zcwf_button([^'"]*)['"]/g, "zd-button");

  if (!html.includes("zoho-designer-theme")) {
    html = html.replace(
      "</style>",
      `</style><style id="zoho-designer-theme">${css}</style>`
    );
  }

  return html;
}

/* ================= LOGO ================= */
function injectLogo(html) {
  const logo = store.logoConfig;

  const placeholder = "https://dummyimage.com/120x40/22c55e/ffffff&text=Logo";
  const imgSrc = logo.url?.trim() ? logo.url : placeholder;

  const isTop = ["TL", "TC", "TR"].includes(logo.position);

  /* ===============================
     REMOVE LOGO WHEN DISABLED
     =============================== */
  if (!logo.enabled) {
    return html
      .replace(/<div class="zd-logo-container[\s\S]*?<\/div>/g, "");
  }

  const logoHTML = `<div class="zd-logo-container zd-pos-${logo.position} zd-size-${logo.size}">
      <img src="${imgSrc}" alt="Logo" />
    </div>`;

  /* ===============================
     UPDATE EXISTING LOGO
     =============================== */
  if (html.includes("zd-logo-container")) {
    return html
      .replace(
        /<img[^>]*src=['"][^'"]*['"]/,
        `<img src="${imgSrc}"`
      )
      .replace(/zd-pos-(TL|TC|TR|BL|BC|BR)/, `zd-pos-${logo.position}`)
      .replace(/zd-size-(small|medium|large)/, `zd-size-${logo.size}`);
  }

  /* ===============================
     TOP POSITIONS → INSIDE HEADER
     =============================== */
  if (isTop) {
    html = html.replace(
      /<div([^>]*)class\s*=\s*['"]([^'"]*zcwf_title[^'"]*)['"]([^>]*)>([\s\S]*?)<\/div>/i,
      (match, p1, p2, p3, inner) => {
        // Avoid double wrapping
        if (inner.includes("zd-title-text")) return match;

        return `<div${p1}class="${p2}"${p3}>
  ${logoHTML}
  <span class="zd-title-text">${inner}</span>
</div>`;
      }
    );
    return html;
  }

  /* ===============================
     BOTTOM POSITIONS → END OF FORM
     =============================== */
  return html.replace(
    /(<\/form>)/i,
    `${logoHTML}$1`
  );
}

function injectLogoStyles(html) {
  if (html.includes("zd-logo-style")) return html;

  const css = `
<style id="zd-logo-style">
/* ================= HEADER BASE ================= */
.zcwf_title {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  min-height: 64px;
  position: relative;
}

/* ================= LOGO CONTAINER ================= */
.zd-logo-container {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

/* Title text wrapper */
.zd-title-text {
  flex: 1;
}

/* Logo Sizes */
.zd-size-small img { height: 40px; }
.zd-size-medium img { height: 70px; }
.zd-size-large img { height: 100px; }

/* ================= TOP POSITIONS ================= */

/* TL - Top Left */
.zcwf_title .zd-pos-TL {
  order: -1;
  margin-right: auto;
}

.zcwf_title:has(.zd-pos-TL) .zd-title-text {
  margin-left: 16px;
}

/* TC - Top Center (stacked) */
.zcwf_title:has(.zd-pos-TC) {
  flex-direction: column !important;
  align-items: center !important;
  text-align: center;
}

.zcwf_title .zd-pos-TC {
  margin-bottom: 12px;
}

/* TR - Top Right */
.zcwf_title .zd-pos-TR {
  order: 1;
  margin-left: auto;
}

.zcwf_title:has(.zd-pos-TR) .zd-title-text {
  margin-right: 16px;
}

/* ================= BOTTOM POSITIONS ================= */
.zd-pos-BL,
.zd-pos-BC,
.zd-pos-BR {
  margin-top: 24px;
  width: 100%;
}

/* BL - Bottom Left */
.zd-pos-BL {
  justify-content: flex-start;
}

/* BC - Bottom Center */
.zd-pos-BC {
  justify-content: center;
}

/* BR - Bottom Right */
.zd-pos-BR {
  justify-content: flex-end;
}

/* ================= MOBILE RESPONSIVE ================= */
@media (max-width: 640px) {
  .zcwf_title {
    flex-direction: column !important;
    align-items: center !important;
    text-align: center;
  }

  .zd-logo-container {
    justify-content: center !important;
    margin: 0 0 12px 0 !important;
    order: -1 !important;
  }

  .zcwf_title .zd-title-text {
    margin: 0 !important;
  }
}
</style>
`;

  return html.includes("</head>")
    ? html.replace("</head>", `${css}</head>`)
    : css + html;
}

/* ================= HEADER DETECTION AND INJECTION ================= */
function detectAndInjectHeader(html) {
  console.log('=== detectAndInjectHeader called ===');
  console.log('headerEnabled:', store.headerConfig.headerEnabled);
  console.log('headerText:', store.headerConfig.headerText);

  const headerText = store.headerConfig.headerText || 'Lead';

  // Check for actual DIV element
  const hasHeaderDiv = /<div[^>]*class\s*=\s*['"][^'"]*zcwf_title[^'"]*['"][^>]*>/i.test(html);

  console.log('HTML has header DIV?', hasHeaderDiv);

  // CASE 1: Header DIV exists in HTML
  if (hasHeaderDiv) {
    if (!store.headerConfig.headerEnabled) {
      // User disabled header - remove it (only possible if not in original HTML)
      console.log('Removing existing header (user disabled it)');
      html = html.replace(
        /<div class="zcwf_row">\s*<div[^>]*class\s*=\s*['"][^'"]*zcwf_title[^'"]*['"][^>]*>[\s\S]*?<\/div>\s*<\/div>/gi,
        ''
      );
      return html;
    }

    // User wants header - update the text
    console.log('Updating existing header text to:', headerText);
    html = html.replace(
      /<div([^>]*class\s*=\s*['"][^'"]*zcwf_title[^'"]*['"][^>]*)>([\s\S]*?)<\/div>/i,
      (fullMatch, attributes, innerContent) => {
        // Handle various header structures
        if (innerContent.includes('zd-title-text')) {
          const updated = innerContent.replace(
            /<span class="zd-title-text">[^<]*<\/span>/i,
            `<span class="zd-title-text">${headerText}</span>`
          );
          return `<div${attributes}>${updated}</div>`;
        }

        if (innerContent.includes('zd-title-content')) {
          const updated = innerContent.replace(
            /(<div class="zd-title-content">[\s\S]*?<\/div>\s*)([^<]*)([\s\S]*)/i,
            `$1${headerText}$3`
          );
          return `<div${attributes}>${updated}</div>`;
        }

        if (innerContent.includes('zd-subheader')) {
          const updated = innerContent.replace(
            /^[\s\S]*?(<div class="zd-subheader">)/i,
            `${headerText}$1`
          );
          return `<div${attributes}>${updated}</div>`;
        }

        // Simple header
        return `<div${attributes}>${headerText}</div>`;
      }
    );

    return html;
  }

  // CASE 2: No header DIV in HTML
  if (!store.headerConfig.headerEnabled) {
    // User doesn't want header - don't inject
    console.log('No header DIV and user has not enabled it - skipping');
    return html;
  }

  // User wants header - inject it with proper wrapper!
  console.log('No header DIV but user enabled it - injecting with text:', headerText);

  // ⭐ IMPORTANT: Wrap header in zcwf_row so theme styles apply
  const headerHTML = `
<div class="zcwf_row">
  <div class="zcwf_title" style="max-width: 600px; color: black; overflow-wrap: break-word; font-size: 22px; padding: 0px 6px 10px; font-weight: bold;">
    ${headerText}
  </div>
</div>`;

  // Find where to inject - right after the opening <form> tag
  const formMatch = html.match(/<form[^>]*>/i);

  if (formMatch) {
    const formTag = formMatch[0];
    const formEndIndex = html.indexOf(formTag) + formTag.length;

    // Inject the header right after <form>
    html = html.slice(0, formEndIndex) + '\n' + headerHTML + html.slice(formEndIndex);
    console.log('✅ Header injected successfully');
  } else {
    console.log('❌ Could not find <form> tag to inject header');
  }

  return html;
}

/* ================= HEADER STYLES ================= */
function injectHeaderStyles(html) {
  // Check for actual DIV element
  const hasHeaderDiv = /<div[^>]*class\s*=\s*['"][^'"]*zcwf_title[^'"]*['"][^>]*>/i.test(html);

  // ⭐ IMPORTANT: Apply styles if header is enabled OR exists in HTML
  // This ensures theme styles apply to injected headers too
  if (!hasHeaderDiv) {
    console.log('No header DIV in HTML - skipping header styles');
    return html;
  }

  console.log('Applying header styles');

  // Remove old header styles
  if (html.includes("zd-header-style")) {
    html = html.replace(
      /<style id="zd-header-style">[\s\S]*?<\/style>/g,
      ""
    );
  }

  // Remove old subheader elements
  html = html.replace(
    /<div class="zd-subheader"[^>]*>[\s\S]*?<\/div>/g,
    ""
  );

  const h = store.headerConfig;
  const f = store.formConfig;

  // Generate background CSS
  let backgroundCSS = "";
  if (h.backgroundType === "solid") {
    backgroundCSS = `background: ${h.backgroundColor} !important;`;
  } else if (h.backgroundType === "gradient") {
    backgroundCSS = `background: linear-gradient(${h.gradientAngle}deg, ${h.gradientFrom}, ${h.gradientTo}) !important;`;
  }

  const css = `
<style id="zd-header-style">
/* ================= HEADER STYLES - EXTENDED BACKGROUND ================= */
#crmWebToEntityForm .zcwf_title,
#crmWebToEntityForm.zd-form .zcwf_title {
  ${backgroundCSS}
  color: ${h.textColor} !important;
  font-size: ${h.fontSize}px !important;
  font-weight: ${h.fontWeight} !important;
  font-family: ${h.fontFamily} !important;
  
  /* Extend header to form edges using negative margins */
  margin-left: -${f.padding}px !important;
  margin-right: -${f.padding}px !important;
  margin-top: -${f.padding}px !important;
  margin-bottom: ${Math.max(20, f.padding * 0.6)}px !important;
  padding: ${h.padding}px ${f.padding}px !important;
  
  /* Round top corners to match form */
  border-radius: ${f.borderRadius}px ${f.borderRadius}px 0 0 !important;
  
  /* Make header full width */
  width: calc(100% + ${f.padding * 2}px) !important;
}

/* When subheader exists, make header flex column to stack vertically */
#crmWebToEntityForm .zcwf_title:has(.zd-subheader),
#crmWebToEntityForm.zd-form .zcwf_title:has(.zd-subheader) {
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
}

/* Subheader styles - below the header title */
#crmWebToEntityForm .zd-subheader,
#crmWebToEntityForm.zd-form .zd-subheader {
  color: ${h.subheaderTextColor} !important;
  font-size: ${h.subheaderFontSize}px !important;
  font-weight: ${h.subheaderFontWeight} !important;
  font-family: ${h.subheaderFontFamily} !important;
  margin-top: ${h.subheaderGap}px !important;
  display: block !important;
  line-height: 1.5 !important;
}

/* If there's a logo with title text, wrap them properly */
#crmWebToEntityForm .zd-title-content {
  display: flex;
  align-items: center;
  width: 100%;
}
</style>
`;

  // Inject styles
  if (html.includes("</head>")) {
    html = html.replace("</head>", `${css}</head>`);
  } else if (html.includes("zoho-designer-theme")) {
    html = html.replace(
      /(<style id="zoho-designer-theme">[\s\S]*?<\/style>)/,
      `$1${css}`
    );
  } else {
    html = css + html;
  }

  // Inject subheader if enabled
  if (h.subheaderEnabled && h.subheaderText && h.subheaderText.trim()) {
    const subheaderHTML = `<div class="zd-subheader">${h.subheaderText}</div>`;

    const titleRegex = /<div([^>]*)class\s*=\s*['"]([^'"]*zcwf_title[^'"]*)['"]([^>]*)>([\s\S]*?)<\/div>/i;

    if (html.match(titleRegex)) {
      html = html.replace(
        titleRegex,
        (match, p1, p2, p3, inner) => {
          if (inner.includes('zd-subheader')) {
            return match;
          }

          if (inner.includes('zd-title-text')) {
            const wrappedContent = inner.replace(
              /([\s\S]*)/,
              `<div class="zd-title-content">$1</div>${subheaderHTML}`
            );
            return `<div${p1}class="${p2}"${p3}>${wrappedContent}</div>`;
          } else {
            return `<div${p1}class="${p2}"${p3}>${inner}${subheaderHTML}</div>`;
          }
        }
      );
    }
  }

  return html;
}


/* ================= PREVIEW ================= */
const previewHTML = computed(() => {
  let html =
    store.selectedTheme && store.selectedTheme !== "custom"
      ? applyThemeToHTML(store.rawHTML, store.selectedTheme)
      : store.rawHTML;

  html = detectAndInjectHeader(html);  // Check and inject header if missing
  html = injectLogo(html);
  html = injectLogoStyles(html);
  html = injectHeaderStyles(html);  // Apply header styling
  html = injectFormStyles(html);
  html = injectLabelStyles(html);
  html = injectInputStyles(html);
  html = injectButtonStyles(html);

  return html;
});

/* ================= FORM STYLES ================= */
function injectFormStyles(html) {
  // Remove old form styles
  if (html.includes("zd-form-style")) {
    html = html.replace(
      /<style id="zd-form-style">[\s\S]*?<\/style>/g,
      ""
    );
  }

  // Remove old Google Fonts link if present
  if (html.includes("zd-google-fonts")) {
    html = html.replace(
      /<link[^>]*id="zd-google-fonts"[^>]*>/g,
      ""
    );
  }

  const f = store.formConfig;

  // Themes with extended headers (negative margin headers)
  const themesWithExtendedHeaders = ['bold-gradient', 'nature-organic', 'corporate-professional', 'tech-dark'];
  const hasExtendedHeader = themesWithExtendedHeaders.includes(store.selectedTheme);

  let backgroundCSS = "";
  if (f.backgroundType === "solid") {
    backgroundCSS = `background: ${f.backgroundColor} !important;`;
  } else if (f.backgroundType === "gradient") {
    backgroundCSS = `background: linear-gradient(${f.gradientAngle}deg, ${f.gradientFrom}, ${f.gradientTo}) !important;`;
  }

  const shadowMap = {
    none: "none",
    sm: "0 1px 2px rgba(0,0,0,0.05)",
    md: "0 4px 6px rgba(0,0,0,0.1)",
    lg: "0 10px 15px rgba(0,0,0,0.15)",
    xl: "0 20px 25px rgba(0,0,0,0.2)",
    "2xl": "0 25px 50px rgba(0,0,0,0.25)",
  };

  // Google Fonts CDN link
  const googleFontsLink = `<link id="zd-google-fonts" rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto:wght@400;500;700&family=Open+Sans:wght@400;600;700&family=Lato:wght@400;700&family=Poppins:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&family=Nunito:wght@400;600;700&family=Fira+Code:wght@400;500;600&display=swap">`;

  let css = '';

  if (hasExtendedHeader) {
    css = `
<style id="zd-form-style">
/* ================= FORM CONTAINER - WITH EXTENDED HEADER ================= */
#crmWebToEntityForm.zd-form,
#crmWebToEntityForm {
  ${backgroundCSS}
  padding: ${f.padding}px !important;
  border-radius: ${f.borderRadius}px !important;
  border: ${f.borderWidth}px solid ${f.borderColor} !important;
  box-shadow: ${shadowMap[f.shadow]} !important;
  font-family: ${f.fontFamily} !important;
  margin: 0 auto !important;
  box-sizing: border-box !important;
}

/* Apply font family to all child elements with highest priority */
#crmWebToEntityForm.zd-form,
#crmWebToEntityForm.zd-form *,
#crmWebToEntityForm,
#crmWebToEntityForm * {
  font-family: ${f.fontFamily} !important;
}

/* Header extends beyond form padding with negative margins */
#crmWebToEntityForm.zd-form .zcwf_title {
  margin-left: -${f.padding}px !important;
  margin-right: -${f.padding}px !important;
  margin-top: -${f.padding}px !important;
  margin-bottom: ${Math.max(20, f.padding * 0.6)}px !important;
  border-radius: ${f.borderRadius}px ${f.borderRadius}px 0 0 !important;
  width: calc(100% + ${f.padding * 2}px) !important;
  font-family: ${f.fontFamily} !important;
}

/* ⭐ ADD THIS - Row spacing */
#crmWebToEntityForm .zcwf_row,
#crmWebToEntityForm.zd-form .zcwf_row {
  margin: ${f.rowSpacing}px 0px !important;
}

/* Ensure inner content stretches properly */
#crmWebToEntityForm * {
  box-sizing: border-box;
}

/* Override any theme-specific form background */
#crmWebToEntityForm.zd-form {
  ${backgroundCSS}
}
</style>
`;

    // For themes WITHOUT extended headers (standard padding):
    css = `
<style id="zd-form-style">
/* ================= FORM CONTAINER - STANDARD ================= */
#crmWebToEntityForm.zd-form,
#crmWebToEntityForm {
  ${backgroundCSS}
  padding: ${f.padding}px !important;
  border-radius: ${f.borderRadius}px !important;
  border: ${f.borderWidth}px solid ${f.borderColor} !important;
  box-shadow: ${shadowMap[f.shadow]} !important;
  font-family: ${f.fontFamily} !important;
  margin: 0 auto !important;
  box-sizing: border-box !important;
}

/* Apply font family to all child elements with highest priority */
#crmWebToEntityForm.zd-form,
#crmWebToEntityForm.zd-form *,
#crmWebToEntityForm,
#crmWebToEntityForm * {
  font-family: ${f.fontFamily} !important;
}

/* ⭐ ADD THIS - Row spacing */
#crmWebToEntityForm .zcwf_row,
#crmWebToEntityForm.zd-form .zcwf_row {
  margin: ${f.rowSpacing}px 0px !important;
}

/* Ensure inner content stretches properly */
#crmWebToEntityForm * {
  box-sizing: border-box;
}

/* Override any theme-specific form background */
#crmWebToEntityForm.zd-form {
  ${backgroundCSS}
}
</style>
`;


  }

  // Inject Google Fonts link and CSS
  if (html.includes("</head>")) {
    html = html.replace("</head>", `${googleFontsLink}${css}</head>`);
  } else if (html.includes("zoho-designer-theme")) {
    // If no head tag but theme exists, inject after theme style
    html = html.replace(
      /(<style id="zoho-designer-theme">[\s\S]*?<\/style>)/,
      `${googleFontsLink}$1${css}`
    );
  } else {
    html = googleFontsLink + css + html;
  }

  return html;
}

/* ================= LABEL STYLES ================= */
function injectLabelStyles(html) {
  // Remove old label styles
  if (html.includes("zd-label-style")) {
    html = html.replace(
      /<style id="zd-label-style">[\s\S]*?<\/style>/g,
      ""
    );
  }

  const l = store.labelConfig;

  const css = `
<style id="zd-label-style">
/* ================= LABEL STYLES ================= */

/* Label column width */
#crmWebToEntityForm .zcwf_col_lab,
#crmWebToEntityForm.zd-form .zcwf_col_lab {
  width: ${l.labelWidth}% !important;
  margin-right: 10px !important;
}

/* Regular field labels */
#crmWebToEntityForm label,
#crmWebToEntityForm.zd-form label {
  color: ${l.textColor} !important;
  font-size: ${l.fontSize}px !important;
  font-weight: ${l.fontWeight} !important;
}

/* Checkbox labels (privacy policy, etc) */
#crmWebToEntityForm .zcwf_privacy_txt,
#crmWebToEntityForm.zd-form .zcwf_privacy_txt {
  color: ${l.textColor} !important;
  font-size: ${l.fontSize}px !important;
  font-weight: ${l.fontWeight} !important;
}

/* Apply to all label-like elements */
#crmWebToEntityForm label *,
#crmWebToEntityForm.zd-form label *,
#crmWebToEntityForm .zcwf_privacy_txt *,
#crmWebToEntityForm.zd-form .zcwf_privacy_txt * {
  color: ${l.textColor} !important;
  font-size: ${l.fontSize}px !important;
  font-weight: ${l.fontWeight} !important;
}

/* Required indicator (*) color */
#crmWebToEntityForm label span,
#crmWebToEntityForm.zd-form label span,
#crmWebToEntityForm label span[style*="color"],
#crmWebToEntityForm.zd-form label span[style*="color"] {
  color: ${l.requiredColor} !important;
}

/* Mobile responsive */
@media all and (max-width: 600px) {
  #crmWebToEntityForm .zcwf_col_lab,
  #crmWebToEntityForm.zd-form .zcwf_col_lab {
    width: auto !important;
  }
}
</style>
`;

  // Inject styles before </head> or at appropriate location
  if (html.includes("</head>")) {
    html = html.replace("</head>", `${css}</head>`);
  } else if (html.includes("zoho-designer-theme")) {
    html = html.replace(
      /(<style id="zoho-designer-theme">[\s\S]*?<\/style>)/,
      `$1${css}`
    );
  } else {
    html = css + html;
  }

  return html;
}


/* ================= INPUT STYLES ================= */
function injectInputStyles(html) {
  // Remove old input styles
  if (html.includes("zd-input-style")) {
    html = html.replace(
      /<style id="zd-input-style">[\s\S]*?<\/style>/g,
      ""
    );
  }

  const i = store.inputConfig;

  // Calculate width based on input size - using percentages
  const sizeWidthMap = {
    small: '50%',
    medium: '75%',
    large: '100%'
  };
  const inputWidth = sizeWidthMap[i.inputSize] || sizeWidthMap.medium;

  const css = `
<style id="zd-input-style">
/* ================= INPUT STYLES ================= */
/* Text inputs, textareas, selects - ONLY for form fields, NOT buttons */
#crmWebToEntityForm input[type="text"],
#crmWebToEntityForm input[type="email"],
#crmWebToEntityForm input[type="tel"],
#crmWebToEntityForm input[type="number"],
#crmWebToEntityForm input[type="url"],
#crmWebToEntityForm textarea,
#crmWebToEntityForm select,
#crmWebToEntityForm.zd-form input[type="text"],
#crmWebToEntityForm.zd-form input[type="email"],
#crmWebToEntityForm.zd-form input[type="tel"],
#crmWebToEntityForm.zd-form input[type="number"],
#crmWebToEntityForm.zd-form input[type="url"],
#crmWebToEntityForm.zd-form textarea,
#crmWebToEntityForm.zd-form select {
  background-color: ${i.backgroundColor} !important;
  border-color: ${i.borderColor} !important;
  border-width: ${i.borderWidth}px !important;
  border-style: solid !important;
  border-radius: ${i.borderRadius}px !important;
  color: ${i.textColor} !important;
  font-size: ${i.fontSize}px !important;
  padding: ${i.padding}px !important;
  transition: border-color 0.2s ease !important;
  box-sizing: border-box !important;
  width: ${inputWidth} !important;
  max-width: 100% !important;
}

/* Placeholder color */
#crmWebToEntityForm input[type="text"]::placeholder,
#crmWebToEntityForm input[type="email"]::placeholder,
#crmWebToEntityForm input[type="tel"]::placeholder,
#crmWebToEntityForm input[type="number"]::placeholder,
#crmWebToEntityForm input[type="url"]::placeholder,
#crmWebToEntityForm textarea::placeholder,
#crmWebToEntityForm.zd-form input[type="text"]::placeholder,
#crmWebToEntityForm.zd-form input[type="email"]::placeholder,
#crmWebToEntityForm.zd-form input[type="tel"]::placeholder,
#crmWebToEntityForm.zd-form input[type="number"]::placeholder,
#crmWebToEntityForm.zd-form input[type="url"]::placeholder,
#crmWebToEntityForm.zd-form textarea::placeholder {
  color: ${i.placeholderColor} !important;
  opacity: 1 !important;
}

/* Focus state - ONLY for form fields, NOT buttons */
#crmWebToEntityForm input[type="text"]:focus,
#crmWebToEntityForm input[type="email"]:focus,
#crmWebToEntityForm input[type="tel"]:focus,
#crmWebToEntityForm input[type="number"]:focus,
#crmWebToEntityForm input[type="url"]:focus,
#crmWebToEntityForm textarea:focus,
#crmWebToEntityForm select:focus,
#crmWebToEntityForm.zd-form input[type="text"]:focus,
#crmWebToEntityForm.zd-form input[type="email"]:focus,
#crmWebToEntityForm.zd-form input[type="tel"]:focus,
#crmWebToEntityForm.zd-form input[type="number"]:focus,
#crmWebToEntityForm.zd-form input[type="url"]:focus,
#crmWebToEntityForm.zd-form textarea:focus,
#crmWebToEntityForm.zd-form select:focus {
  border-color: ${i.focusBorderColor} !important;
  outline: none !important;
}
</style>
`;

  // Inject styles before </head> or at appropriate location
  if (html.includes("</head>")) {
    html = html.replace("</head>", `${css}</head>`);
  } else if (html.includes("zoho-designer-theme")) {
    html = html.replace(
      /(<style id="zoho-designer-theme">[\s\S]*?<\/style>)/,
      `$1${css}`
    );
  } else {
    html = css + html;
  }

  return html;
}

/* ================= BUTTON STYLES ================= */
function injectButtonStyles(html) {
  // Remove existing button styles if present
  if (html.includes("zd-button-style")) {
    html = html.replace(
      /<style id="zd-button-style">[\s\S]*?<\/style>/g,
      ''
    );
  }

  // Remove existing button script if present
  if (html.includes("zd-button-script")) {
    html = html.replace(
      /<script id="zd-button-script">[\s\S]*?<\/script>/g,
      ''
    );
  }

  // Update button labels - more robust regex to handle various HTML formats
  const submitLabel = store.buttonConfig.submit.label;
  const resetLabel = store.buttonConfig.reset.label;

  // Only update if custom label is set (not empty)
  if (submitLabel && submitLabel.trim()) {
    html = html.replace(
      /(<input[^>]*type\s*=\s*["']submit["'][^>]*)value\s*=\s*["'][^"']*["']/gi,
      `$1value="${submitLabel}"`
    );
  }

  if (resetLabel && resetLabel.trim()) {
    html = html.replace(
      /(<input[^>]*type\s*=\s*["']reset["'][^>]*)value\s*=\s*["'][^"']*["']/gi,
      `$1value="${resetLabel}"`
    );
  }

  const submitConfig = store.buttonConfig.submit;
  const resetConfig = store.buttonConfig.reset;

  const generateButtonCSS = (selector, config) => {
    let background = '';
    if (config.backgroundType === 'solid') {
      background = `background: ${config.backgroundColor} !important;`;
    } else if (config.backgroundType === 'gradient') {
      background = `background: linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo}) !important;`;
    } else if (config.backgroundType === 'outlined') {
      background = `background: transparent !important;`;
    }

    // Button size calculations
    let minWidth = '120px';
    let height = 'auto';
    if (config.buttonSize === 'small') {
      minWidth = '80px';
    } else if (config.buttonSize === 'medium') {
      minWidth = '120px';
    } else if (config.buttonSize === 'large') {
      minWidth = '160px';
    }

    let baseStyles = `
${selector} {
  ${background}
  color: ${config.textColor} !important;
  border-radius: ${config.borderRadius}px !important;
  border: ${config.borderThickness}px solid ${config.borderColor} !important;
  font-size: ${config.fontSize}px !important;
  padding: ${config.paddingY}px ${config.paddingX}px !important;
  min-width: ${minWidth} !important;
  transition: all 0.2s ease !important;
  cursor: pointer !important;
  box-sizing: border-box !important;
  outline: none !important;
  display: inline-block !important;
}
`;

    // Generate hover styles based on effect
    let hoverStyles = '';
    if (config.hoverEffect !== 'none') {
      if (config.hoverEffect === 'darken') {
        hoverStyles = `
${selector}:hover {
  filter: brightness(0.85) !important;
}
`;
      } else if (config.hoverEffect === 'lighten') {
        hoverStyles = `
${selector}:hover {
  filter: brightness(1.15) !important;
}
`;
      } else if (config.hoverEffect === 'scale') {
        hoverStyles = `
${selector}:hover {
  transform: scale(1.05) !important;
}
`;
      } else if (config.hoverEffect === 'shadow') {
        hoverStyles = `
${selector}:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
}
`;
      }
    }

    return baseStyles + hoverStyles;
  };

  const css = `
<style id="zd-button-style">
/* Submit button - high specificity selectors */
${generateButtonCSS('#crmWebToEntityForm input[type="submit"], #crmWebToEntityForm .formsubmit.zcwf_button, #crmWebToEntityForm input#formsubmit', submitConfig)}

/* Reset button - high specificity selectors */
${generateButtonCSS('#crmWebToEntityForm input[type="reset"], #crmWebToEntityForm input[type="reset"].zcwf_button', resetConfig)}
</style>
`;

  const script = `
<script id="zd-button-script">
// Ensure button labels are updated after DOM loads
(function() {
  function updateButtonLabels() {
    // Only update if custom labels are set
    ${submitLabel && submitLabel.trim() ? `
    const submitBtn = document.querySelector('input[type="submit"]');
    if (submitBtn) {
      submitBtn.value = '${submitLabel}';
    }
    ` : ''}
    
    ${resetLabel && resetLabel.trim() ? `
    const resetBtn = document.querySelector('input[type="reset"]');
    if (resetBtn) {
      resetBtn.value = '${resetLabel}';
    }
    ` : ''}
  }
  
  // Run immediately
  updateButtonLabels();
  
  // Run after DOM loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateButtonLabels);
  }
  
  // Run after everything loads
  window.addEventListener('load', updateButtonLabels);
})();
<\/script>
`;

  // Inject styles before </head> or at start if no head
  if (html.includes("</head>")) {
    html = html.replace("</head>", `${css}</head>`);
  } else {
    html = css + html;
  }

  // Inject script before </body> or at end if no body
  if (html.includes("</body>")) {
    html = html.replace("</body>", `${script}</body>`);
  } else {
    html = html + script;
  }

  return html;
}

/* ================= UI ================= */
function selectSection(section) {
  activeSection.value = section;
}

function enterCustomizeMode() {
  store.editorMode = "customize";
}

function goBack() {
  activeSection.value = null;
  
  // Confirm if user wants to go back and lose changes
  if (store.history.length > 0) {
    if (confirm('Going back will reset all your customizations. Are you sure?')) {
      store.goTo("theme");
    }
  } else {
    store.goTo("theme");
  }
}

function generateCode() {
  // Store the final HTML in the store
  store.finalHTML = previewHTML.value;
  // Navigate to final page
  store.goTo("final");
}


function deviceBtnClass(type) {
  return [
    "px-3 py-1.5 rounded text-sm font-medium transition",
    previewDevice.value === type
      ? "bg-white text-gray-900 shadow"
      : "text-gray-600 hover:text-gray-900",
  ];
}

const appliedThemeLabel = computed(() => ({
  "modern-minimal": "Modern Minimal",
  "bold-gradient": "Bold Gradient",
  "nature-organic": "Nature Organic",
  "tech-dark": "Tech Dark",
  "corporate-professional": "Corporate Professional",
}[store.selectedTheme] || "Theme"));

/* ================= HISTORY FUNCTIONS ================= */
// Computed property to show only the latest change for each type
const latestHistory = computed(() => {
  const seen = new Set();
  return store.history.filter(item => {
    if (seen.has(item.type)) {
      return false;
    }
    seen.add(item.type);
    return true;
  });
});

function formatTime(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

function undoHistoryItem(item) {
  // Find all history items of this type
  const itemsToRemove = store.history.filter(h => h.type === item.type);

  // Get the original value (from the oldest entry of this type)
  const oldestItem = itemsToRemove[itemsToRemove.length - 1];
  const originalValue = oldestItem.oldValue;

  // Remove all history items of this type
  store.history = store.history.filter(h => h.type !== item.type);

  // Revert to original value
  store.revertChange(() => {
    if (item.type === 'logo_enabled') {
      store.logoConfig.enabled = originalValue;
    } else if (item.type === 'logo_url') {
      store.logoConfig.url = originalValue || '';
    } else if (item.type === 'logo_size') {
      store.logoConfig.size = originalValue || 'small';
    } else if (item.type === 'logo_position') {
      store.logoConfig.position = originalValue || 'TL';
    } else if (item.type === 'header_enabled') {
      store.headerConfig.headerEnabled = originalValue;
    } else if (item.type.startsWith('header_')) {
      // Handle header properties
      const property = item.type.substring(7); // Remove 'header_' prefix

      if (store.headerConfig.hasOwnProperty(property)) {
        store.headerConfig[property] = originalValue;
      }
    } else if (item.type.startsWith('form_')) {
      // Handle form properties: form_padding, form_backgroundColor, etc.
      const property = item.type.substring(5); // Remove 'form_' prefix

      if (store.formConfig.hasOwnProperty(property)) {
        store.formConfig[property] = originalValue;
      }
    } else if (item.type.startsWith('label_')) {
      // Handle label properties: label_textColor, label_fontSize, etc.
      const property = item.type.substring(6); // Remove 'label_' prefix

      if (store.labelConfig.hasOwnProperty(property)) {
        store.labelConfig[property] = originalValue;
      }
    } else if (item.type.startsWith('input_')) {
      // Handle input properties: input_backgroundColor, input_borderColor, etc.
      const property = item.type.substring(6); // Remove 'input_' prefix

      if (store.inputConfig.hasOwnProperty(property)) {
        store.inputConfig[property] = originalValue;
      }
    } else if (item.type.startsWith('button_')) {
      // Handle button properties: button_submit_label, button_reset_backgroundColor, etc.
      const parts = item.type.split('_');
      const buttonType = parts[1]; // 'submit' or 'reset'
      const property = parts.slice(2).join('_'); // rest is the property name

      if (store.buttonConfig[buttonType]) {
        store.buttonConfig[buttonType][property] = originalValue;
      }
    }
  });
}

function clearAllHistory() {
  if (confirm('Are you sure you want to clear all history? This will not revert any changes.')) {
    store.history = [];
  }
}
</script>

<style scoped>
aside::-webkit-scrollbar {
  width: 6px;
}

aside::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}
</style>