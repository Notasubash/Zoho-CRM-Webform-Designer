import { ref, reactive, watch } from "vue";
import { defineStore } from "pinia";

export const useDataStore = defineStore("data", () => {
  const currentPage = ref("home");
  const rawHTML = ref("");
  const finalHTML = ref("");
  const selectedTheme = ref(null);
  const editorMode = ref("view");

  // Logo configuration
  const logoConfig = reactive({
    enabled: false,
    url: "",
    size: "small",
    position: "TL",
  });

  // Header configuration
  const headerConfig = reactive({
    headerEnabled: false,
    headerText: "",
    headerExistsInOriginal: false, // ⭐ NEW: Track if header existed in original HTML
    backgroundType: "",
    backgroundColor: "",
    gradientFrom: "",
    gradientTo: "",
    gradientAngle: 135,
    textColor: "",
    fontSize: 22,
    fontWeight: "",
    fontFamily: "",
    padding: 40,
    subheaderEnabled: false,
    subheaderText: "",
    subheaderTextColor: "",
    subheaderFontSize: 14,
    subheaderFontWeight: "",
    subheaderFontFamily: "",
    subheaderGap: 8,
  });


  // Form configuration
  const formConfig = reactive({
    backgroundType: "solid",
    backgroundColor: "#ffffff",
    gradientFrom: "#f8fafc",
    gradientTo: "#ffffff",
    gradientAngle: 135,
    padding: 40,
    rowSpacing: 15,  // ⭐ ADD THIS - moved from layoutConfig
    borderRadius: 8,
    borderColor: "#e5e7eb",
    borderWidth: 1,
    shadow: "md",
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  });

  // Label configuration
  const labelConfig = reactive({
    textColor: "",
    fontSize: 14,
    fontWeight: "500",
    requiredColor: "#ef4444",
    labelWidth: 30,  // ⭐ ADD THIS - moved from layoutConfig
  });

  // Input configuration
  const inputConfig = reactive({
    backgroundColor: "#ffffff",
    borderColor: "#d1d5db",
    borderWidth: 1,
    borderRadius: 6,
    placeholderColor: "#9ca3af",
    textColor: "#1f2937",
    fontSize: 14,
    padding: 10,
    inputSize: "medium",
    focusBorderColor: "#3b82f6",
  });

  // Button configuration
  const buttonConfig = reactive({
    submit: {
      label: "",
      backgroundType: "",
      backgroundColor: "",
      gradientFrom: "",
      gradientTo: "",
      textColor: "",
      borderRadius: null,
      borderColor: "",
      borderThickness: null,
      fontSize: null,
      buttonSize: "",
      paddingX: 0,
      paddingY: 0,
      hoverEffect: "",
    },
    reset: {
      label: "",
      backgroundType: "",
      backgroundColor: "",
      gradientFrom: "",
      gradientTo: "",
      textColor: "",
      borderRadius: null,
      borderColor: "",
      borderThickness: null,
      fontSize: null,
      buttonSize: "",
      paddingX: 0,
      paddingY: 0,
      hoverEffect: "",
    },
  });

  // History tracking
  const history = ref([]);

  // Flag to prevent history tracking during programmatic changes
  let isReverting = false;

  // Helper function to add history entry
  function addHistory(action, type, oldValue = null, newValue = null) {
    // Don't add to history if we're reverting a change
    if (isReverting) return;

    history.value.unshift({
      action,
      type,
      oldValue,
      newValue,
      timestamp: Date.now(),
    });
  }

  // Helper to revert without creating new history
  function revertChange(callback) {
    isReverting = true;
    callback();
    setTimeout(() => {
      isReverting = false;
    }, 100);
  }

  // Watch logo config changes
  watch(() => logoConfig.enabled, (newVal, oldVal) => {
    if (oldVal !== undefined) {
      addHistory(
        newVal ? "Logo enabled" : "Logo disabled",
        "logo_enabled",
        oldVal,
        newVal
      );
    }
  });

  watch(() => logoConfig.url, (newVal, oldVal) => {
    if (oldVal !== undefined && oldVal !== newVal) {
      const action = newVal
        ? `Logo URL changed to "${newVal.substring(0, 30)}${newVal.length > 30 ? '...' : ''}"`
        : "Logo URL removed";
      addHistory(action, "logo_url", oldVal, newVal);
    }
  });

  watch(() => logoConfig.size, (newVal, oldVal) => {
    if (oldVal !== undefined && oldVal !== newVal) {
      addHistory(
        `Logo size changed to ${newVal}`,
        "logo_size",
        oldVal,
        newVal
      );
    }
  });

  watch(() => logoConfig.position, (newVal, oldVal) => {
    if (oldVal !== undefined && oldVal !== newVal) {
      const positions = {
        TL: "Top Left",
        TC: "Top Center",
        TR: "Top Right",
        BL: "Bottom Left",
        BC: "Bottom Center",
        BR: "Bottom Right",
      };
      addHistory(
        `Logo position changed to ${positions[newVal]}`,
        "logo_position",
        oldVal,
        newVal
      );
    }
  });

  // Watch header enabled
  watch(() => headerConfig.headerEnabled, (newVal, oldVal) => {
    if (oldVal !== undefined) {
      addHistory(
        newVal ? "Header enabled" : "Header disabled",
        "header_enabled",
        oldVal,
        newVal
      );
    }
  });

  // Watch header config changes
  const watchHeaderProperty = (property, label) => {
    watch(
      () => headerConfig[property],
      (newVal, oldVal) => {
        if (oldVal !== undefined && oldVal !== newVal) {
          addHistory(
            `Header ${label} changed`,
            `header_${property}`,
            oldVal,
            newVal
          );
        }
      }
    );
  };

  // Watch all header properties
  watchHeaderProperty('headerText', 'text');
  watchHeaderProperty('backgroundType', 'background type');
  watchHeaderProperty('backgroundColor', 'background color');
  watchHeaderProperty('gradientFrom', 'gradient start color');
  watchHeaderProperty('gradientTo', 'gradient end color');
  watchHeaderProperty('gradientAngle', 'gradient angle');
  watchHeaderProperty('textColor', 'text color');
  watchHeaderProperty('fontSize', 'font size');
  watchHeaderProperty('fontWeight', 'font weight');
  watchHeaderProperty('fontFamily', 'font family');
  watchHeaderProperty('padding', 'padding');
  watchHeaderProperty('subheaderEnabled', 'subheader visibility');
  watchHeaderProperty('subheaderText', 'subheader text');
  watchHeaderProperty('subheaderTextColor', 'subheader text color');
  watchHeaderProperty('subheaderFontSize', 'subheader font size');
  watchHeaderProperty('subheaderFontWeight', 'subheader font weight');
  watchHeaderProperty('subheaderFontFamily', 'subheader font family');
  watchHeaderProperty('subheaderGap', 'subheader gap');

  // Watch label config changes
  const watchLabelProperty = (property, label) => {
    watch(
      () => labelConfig[property],
      (newVal, oldVal) => {
        if (oldVal !== undefined && oldVal !== newVal) {
          addHistory(
            `Label ${label} changed`,
            `label_${property}`,
            oldVal,
            newVal
          );
        }
      }
    );
  };

  // Watch all label properties
  watchLabelProperty('textColor', 'text color');
  watchLabelProperty('fontSize', 'font size');
  watchLabelProperty('fontWeight', 'font weight');
  watchLabelProperty('requiredColor', 'required indicator color');
  watchLabelProperty('labelWidth', 'label width');  // ⭐ ADD THIS


  // Watch input config changes
  const watchInputProperty = (property, label) => {
    watch(
      () => inputConfig[property],
      (newVal, oldVal) => {
        if (oldVal !== undefined && oldVal !== newVal) {
          addHistory(
            `Input ${label} changed`,
            `input_${property}`,
            oldVal,
            newVal
          );
        }
      }
    );
  };

  // Watch all input properties
  watchInputProperty('backgroundColor', 'background color');
  watchInputProperty('borderColor', 'border color');
  watchInputProperty('borderWidth', 'border width');
  watchInputProperty('borderRadius', 'border radius');
  watchInputProperty('placeholderColor', 'placeholder color');
  watchInputProperty('textColor', 'text color');
  watchInputProperty('fontSize', 'font size');
  watchInputProperty('padding', 'padding');
  watchInputProperty('inputSize', 'size');
  watchInputProperty('focusBorderColor', 'focus border color');

  // Watch form config changes
  const watchFormProperty = (property, label) => {
    watch(
      () => formConfig[property],
      (newVal, oldVal) => {
        if (oldVal !== undefined && oldVal !== newVal) {
          addHistory(
            `Form ${label} changed`,
            `form_${property}`,
            oldVal,
            newVal
          );
        }
      }
    );
  };

  // Watch all form properties
  watchFormProperty('backgroundType', 'background type');
  watchFormProperty('backgroundColor', 'background color');
  watchFormProperty('gradientFrom', 'gradient start color');
  watchFormProperty('gradientTo', 'gradient end color');
  watchFormProperty('gradientAngle', 'gradient angle');
  watchFormProperty('padding', 'padding');
  watchFormProperty('rowSpacing', 'row spacing');  // ⭐ ADD THIS
  watchFormProperty('borderRadius', 'border radius');
  watchFormProperty('borderColor', 'border color');
  watchFormProperty('borderWidth', 'border width');
  watchFormProperty('shadow', 'shadow');
  watchFormProperty('fontFamily', 'font family');

  // Watch button config changes
  const watchButtonProperty = (buttonType, property, label) => {
    watch(
      () => buttonConfig[buttonType][property],
      (newVal, oldVal) => {
        if (oldVal !== undefined && oldVal !== newVal) {
          const buttonLabel = buttonType === 'submit' ? 'Submit' : 'Reset';
          addHistory(
            `${buttonLabel} button ${label} changed`,
            `button_${buttonType}_${property}`,
            oldVal,
            newVal
          );
        }
      }
    );
  };

  // Watch all button properties
  ['submit', 'reset'].forEach(btnType => {
    watchButtonProperty(btnType, 'label', 'label');
    watchButtonProperty(btnType, 'backgroundType', 'background type');
    watchButtonProperty(btnType, 'backgroundColor', 'background color');
    watchButtonProperty(btnType, 'gradientFrom', 'gradient start color');
    watchButtonProperty(btnType, 'gradientTo', 'gradient end color');
    watchButtonProperty(btnType, 'textColor', 'text color');
    watchButtonProperty(btnType, 'borderRadius', 'border radius');
    watchButtonProperty(btnType, 'borderColor', 'border color');
    watchButtonProperty(btnType, 'borderThickness', 'border thickness');
    watchButtonProperty(btnType, 'fontSize', 'font size');
    watchButtonProperty(btnType, 'buttonSize', 'size');
    watchButtonProperty(btnType, 'paddingX', 'horizontal padding');
    watchButtonProperty(btnType, 'paddingY', 'vertical padding');
    watchButtonProperty(btnType, 'hoverEffect', 'hover effect');
  });

  function goTo(page) {
    currentPage.value = page;
  }

  // Function to initialize button labels from HTML
  function initializeButtonLabelsFromHTML() {
    if (!rawHTML.value) return;

    // Use revertChange to prevent history tracking during initialization
    isReverting = true;

    // Extract submit button label
    const submitMatch = rawHTML.value.match(
      /<input[^>]*type\s*=\s*["']submit["'][^>]*value\s*=\s*["']([^"']*)["']/i
    );
    if (submitMatch && submitMatch[1]) {
      buttonConfig.submit.label = submitMatch[1];
    }

    // Extract reset button label
    const resetMatch = rawHTML.value.match(
      /<input[^>]*type\s*=\s*["']reset["'][^>]*value\s*=\s*["']([^"']*)["']/i
    );
    if (resetMatch && resetMatch[1]) {
      buttonConfig.reset.label = resetMatch[1];
    }

    // Re-enable history tracking after initialization
    setTimeout(() => {
      isReverting = false;
    }, 100);
  }


  function initializeHeaderStylesFromTheme(themeName) {
    if (!themeName || themeName === 'custom') {
      return;
    }

    isReverting = true;

    try {
      const themeStyles = parseThemeHeaderStyles(themeName);

      if (themeStyles && Object.keys(themeStyles).length > 0) {
        Object.keys(themeStyles).forEach(key => {
          if (themeStyles[key] !== undefined && themeStyles[key] !== null) {
            headerConfig[key] = themeStyles[key];
          }
        });
      }
    } catch (err) {
      console.error('Failed to initialize header styles from theme:', err);
    }

    setTimeout(() => {
      isReverting = false;
    }, 100);
  }

  function parseThemeHeaderStyles(themeName) {
    const themeDefaults = {
      'modern-minimal': {
        backgroundType: 'solid',
        backgroundColor: '#f8fafc',
        textColor: '#111827',
        fontSize: 22,
        fontWeight: '600',
        padding: 20,
      },
      'bold-gradient': {
        backgroundType: 'gradient',
        gradientFrom: '#9333ea',
        gradientTo: '#db2777',
        gradientAngle: 90,
        textColor: '#ffffff',
        fontSize: 24,
        fontWeight: '700',
        padding: 18,
      },
      'nature-organic': {
        backgroundType: 'solid',
        backgroundColor: '#10b981',
        textColor: '#ffffff',
        fontSize: 22,
        fontWeight: '600',
        padding: 16,
      },
      'tech-dark': {
        backgroundType: 'solid',
        backgroundColor: '#020617',
        textColor: '#ffffff',
        fontSize: 22,
        fontWeight: '600',
        padding: 16,
      },
      'corporate-professional': {
        backgroundType: 'solid',
        backgroundColor: '#4f46e5',
        textColor: '#ffffff',
        fontSize: 22,
        fontWeight: '600',
        padding: 16,
      },
    };

    return themeDefaults[themeName] || {};
  }

  watch(selectedTheme, (newTheme) => {
    if (newTheme && newTheme !== 'custom') {
      initializeButtonStylesFromTheme(newTheme);
      initializeFormStylesFromTheme(newTheme);
      initializeHeaderStylesFromTheme(newTheme); // ⭐ ADD THIS
    }
  });

  // Function to extract button styles from theme definition
  function initializeButtonStylesFromTheme(themeName, previewHTML = null) {
    console.log('=== initializeButtonStylesFromTheme called ===');
    console.log('Theme name:', themeName);

    if (!themeName || themeName === 'custom') {
      console.log('Skipping: no theme or custom theme');
      return;
    }

    isReverting = true;

    try {
      // Parse the CSS directly from the preview HTML (which has theme applied)
      // or from rawHTML if previewHTML not provided
      const htmlToParse = previewHTML || rawHTML.value;
      console.log('HTML to parse length:', htmlToParse?.length);
      console.log('Using preview HTML?', !!previewHTML);

      const themeStyles = parseThemeButtonStyles(themeName, htmlToParse);

      console.log('Parsed theme styles:', themeStyles);

      if (themeStyles.submit && Object.keys(themeStyles.submit).length > 0) {
        console.log('Updating submit button config with:', themeStyles.submit);
        // Only update non-empty values
        Object.keys(themeStyles.submit).forEach(key => {
          if (themeStyles.submit[key] !== undefined && themeStyles.submit[key] !== null) {
            console.log(`Setting submit.${key} = ${themeStyles.submit[key]}`);
            buttonConfig.submit[key] = themeStyles.submit[key];
          }
        });
      } else {
        console.log('No submit styles to apply');
      }

      if (themeStyles.reset && Object.keys(themeStyles.reset).length > 0) {
        console.log('Updating reset button config with:', themeStyles.reset);
        Object.keys(themeStyles.reset).forEach(key => {
          if (themeStyles.reset[key] !== undefined && themeStyles.reset[key] !== null) {
            buttonConfig.reset[key] = themeStyles.reset[key];
          }
        });
      }

      console.log('Final button config after update:', {
        submit: JSON.parse(JSON.stringify(buttonConfig.submit)),
        reset: JSON.parse(JSON.stringify(buttonConfig.reset))
      });
    } catch (err) {
      console.error('Failed to initialize button styles from theme:', err);
    }

    setTimeout(() => {
      isReverting = false;
      console.log('isReverting set back to false');
    }, 100);
  }

  // Parse button styles from theme CSS string
  function parseThemeButtonStyles(themeName, html) {
    const styles = {
      submit: {},
      reset: {}
    };

    console.log('Parsing theme button styles for:', themeName);
    console.log('HTML includes theme style?', html ? html.includes('zoho-designer-theme') : 'No HTML');

    if (!html) {
      console.log('No HTML available');
      return styles;
    }

    const themeStyleMatch = html.match(/<style id="zoho-designer-theme">([\s\S]*?)<\/style>/);
    if (!themeStyleMatch) {
      console.log('No theme style tag found in HTML');
      return styles;
    }

    const css = themeStyleMatch[1];
    console.log('Theme CSS found, length:', css.length);
    console.log('First 200 chars:', css.substring(0, 200));

    // Extract .zd-button styles
    const buttonStyleMatch = css.match(/\.zd-button[^{]*\{([^}]*)\}/);
    if (!buttonStyleMatch) {
      console.log('No .zd-button styles found');
      return styles;
    }

    const cssText = buttonStyleMatch[1];
    console.log('Button CSS extracted:', cssText);

    // Parse background
    const bgMatch = cssText.match(/background:\s*([^;!]+)/);
    if (bgMatch) {
      const bg = bgMatch[1].trim();
      console.log('Background found:', bg);

      if (bg.includes('linear-gradient')) {
        styles.submit.backgroundType = 'gradient';
        // Match gradient colors - handle both 90deg and 135deg formats
        const colorMatch = bg.match(/#[0-9a-f]{6}|#[0-9a-f]{3}/gi);
        if (colorMatch && colorMatch.length >= 2) {
          styles.submit.gradientFrom = colorMatch[0];
          styles.submit.gradientTo = colorMatch[1];
          console.log('Gradient colors:', colorMatch[0], colorMatch[1]);
        }
      } else {
        styles.submit.backgroundType = 'solid';
        styles.submit.backgroundColor = bg;
        console.log('Solid background:', bg);
      }
    }

    // Parse other properties
    const colorMatch = cssText.match(/color:\s*([^;!]+)/);
    if (colorMatch) {
      styles.submit.textColor = colorMatch[1].trim();
      console.log('Text color:', styles.submit.textColor);
    }

    const radiusMatch = cssText.match(/border-radius:\s*(\d+)px/);
    if (radiusMatch) {
      styles.submit.borderRadius = parseInt(radiusMatch[1]);
      console.log('Border radius:', styles.submit.borderRadius);
    }

    const paddingMatch = cssText.match(/padding:\s*(\d+)px\s+(\d+)px/);
    if (paddingMatch) {
      styles.submit.paddingY = parseInt(paddingMatch[1]);
      styles.submit.paddingX = parseInt(paddingMatch[2]);
      console.log('Padding:', styles.submit.paddingY, styles.submit.paddingX);
    }

    const fontSizeMatch = cssText.match(/font-size:\s*(\d+)px/);
    if (fontSizeMatch) {
      styles.submit.fontSize = parseInt(fontSizeMatch[1]);
      console.log('Font size:', styles.submit.fontSize);
    }

    const borderMatch = cssText.match(/border:\s*(\d+)px\s+solid\s+([^;!]+)/);
    if (borderMatch) {
      styles.submit.borderThickness = parseInt(borderMatch[1]);
      styles.submit.borderColor = borderMatch[2].trim();
      console.log('Border:', styles.submit.borderThickness, styles.submit.borderColor);
    }

    console.log('Final parsed styles:', styles.submit);

    // Reset button gets similar styles but outlined
    styles.reset = {
      ...styles.submit,
      backgroundType: 'outlined',
      textColor: styles.submit.backgroundColor || styles.submit.gradientFrom || '#6b7280',
      borderColor: styles.submit.backgroundColor || styles.submit.gradientFrom || '#6b7280',
    };

    return styles;
  }

  // Function to extract form styles from theme definition
  function initializeFormStylesFromTheme(themeName) {
    console.log('=== initializeFormStylesFromTheme called ===');
    console.log('Theme name:', themeName);

    if (!themeName || themeName === 'custom') {
      console.log('Skipping: no theme or custom theme');
      return;
    }

    isReverting = true;

    try {
      const themeStyles = parseThemeFormStyles(themeName);
      console.log('Parsed form theme styles:', themeStyles);

      if (themeStyles && Object.keys(themeStyles).length > 0) {
        Object.keys(themeStyles).forEach(key => {
          if (themeStyles[key] !== undefined && themeStyles[key] !== null) {
            console.log(`Setting formConfig.${key} = ${themeStyles[key]}`);
            formConfig[key] = themeStyles[key];
          }
        });
      }

      console.log('Final form config after update:', JSON.parse(JSON.stringify(formConfig)));
    } catch (err) {
      console.error('Failed to initialize form styles from theme:', err);
    }

    setTimeout(() => {
      isReverting = false;
      console.log('isReverting set back to false');
    }, 100);
  }

  // Parse form styles from theme CSS
  function parseThemeFormStyles(themeName) {
    const styles = {};

    // Theme-specific defaults based on your existing themes
    const themeDefaults = {
      'modern-minimal': {
        backgroundType: 'solid',
        backgroundColor: '#f8fafc',
        padding: 40,
        borderRadius: 8,
        borderColor: '#e2e8f0',
        borderWidth: 1,
        shadow: 'sm',
        fontFamily: "'Helvetica Neue', sans-serif",
      },
      'bold-gradient': {
        backgroundType: 'solid',
        backgroundColor: '#fceeff',
        padding: 40,
        borderRadius: 12,
        borderColor: '#e9d5ff',
        borderWidth: 0,
        shadow: 'lg',
        fontFamily: "'Helvetica Neue', sans-serif",
      },
      'nature-organic': {
        backgroundType: 'gradient',
        gradientFrom: '#d1fae5',
        gradientTo: '#ecfeff',
        gradientAngle: 135,
        padding: 40,
        borderRadius: 20,
        borderColor: '#6ee7b7',
        borderWidth: 0,
        shadow: 'md',
        fontFamily: "'Georgia', serif",
      },
      'tech-dark': {
        backgroundType: 'solid',
        backgroundColor: '#1e293b',
        padding: 40,
        borderRadius: 4,
        borderColor: '#475569',
        borderWidth: 1,
        textColor: '#ffffff',
        shadow: 'xl',
        fontFamily: "'Courier New', monospace",
      },
      'corporate-professional': {
        backgroundType: 'solid',
        backgroundColor: '#f1f5f9',
        padding: 40,
        borderRadius: 4,
        borderColor: '#c7d2fe',
        borderWidth: 1,
        shadow: 'md',
        fontFamily: "'Times New Roman', serif",
      },
    };

    return themeDefaults[themeName] || {};
  }

  // Watch for theme changes
  watch(selectedTheme, (newTheme) => {
    if (newTheme && newTheme !== 'custom') {
      initializeButtonStylesFromTheme(newTheme);
      initializeFormStylesFromTheme(newTheme);
    }
  });

  watch(rawHTML, (newHTML) => {
    console.log('=== rawHTML watcher triggered ===');

    // Initialize button labels
    initializeButtonLabelsFromHTML();

    // Initialize header state from HTML
    if (newHTML) {
      // Check for actual <div> with zcwf_title class
      const hasHeaderDiv = /<div[^>]*class\s*=\s*['"][^'"]*zcwf_title[^'"]*['"][^>]*>/i.test(newHTML);
      console.log('Has header DIV in HTML?', hasHeaderDiv);

      if (hasHeaderDiv) {
        // Extract original header text
        const titleMatch = newHTML.match(/<div[^>]*class\s*=\s*['"][^'"]*zcwf_title[^'"]*['"][^>]*>(.*?)<\/div>/i);

        if (titleMatch && titleMatch[1]) {
          // Remove HTML tags and get text
          const textContent = titleMatch[1].replace(/<[^>]*>/g, '').trim();

          console.log('Found header in HTML:', textContent);

          // ⭐ Set header config - ENABLED and LOCKED (cannot be disabled)
          isReverting = true;
          headerConfig.headerEnabled = true;
          headerConfig.headerText = textContent || 'Lead';
          headerConfig.headerExistsInOriginal = true; // ⭐ NEW: Track if header was in original HTML
          setTimeout(() => { isReverting = false; }, 100);
        } else {
          // Has the div but no text content
          isReverting = true;
          headerConfig.headerEnabled = true;
          headerConfig.headerText = 'Lead';
          headerConfig.headerExistsInOriginal = true; // ⭐ NEW
          setTimeout(() => { isReverting = false; }, 100);
        }
      } else {
        // No header div in HTML - user can add one
        console.log('No header DIV found in HTML - setting defaults');

        isReverting = true;
        headerConfig.headerEnabled = false;
        headerConfig.headerText = 'Lead';
        headerConfig.headerExistsInOriginal = false; // ⭐ NEW: Header not in original
        setTimeout(() => { isReverting = false; }, 100);
      }
    }
  }, { immediate: true });


  return {
    currentPage,
    rawHTML,
    finalHTML,
    selectedTheme,
    editorMode,
    logoConfig,
    headerConfig,
    formConfig,
    labelConfig,
    inputConfig,
    buttonConfig,
    history,
    addHistory,
    revertChange,
    goTo,
    initializeButtonLabelsFromHTML,
    initializeFormStylesFromTheme,
    initializeButtonStylesFromTheme,
    initializeHeaderStylesFromTheme,
  };
});