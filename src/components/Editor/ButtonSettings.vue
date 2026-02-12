<template>
  <div>
    <h2 class="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
      <i class="fa fa-square text-green-600"></i>
      Button Settings
    </h2>

    <!-- Tabbed Button Selection -->
    <div class="mb-6">
      <div class="border-b border-gray-200">
        <nav
          class="-mb-px flex gap-2 align-middle justify-center"
          aria-label="Tabs"
        >
          <button
            v-for="btn in buttons"
            :key="btn.value"
            @click="selectedButton = btn.value"
            :class="[
              'w-1/2 px-4 py-3 text-sm font-medium border-b-2 transition-colors flex justify-center align-middle items-center',
              selectedButton === btn.value
                ? 'border-green-600 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            ]"
          >
            <i
              :class="btn.icon"
              class="mr-2"
            ></i>
            <div>{{ btn.label }}</div>
          </button>
        </nav>
      </div>
      <div class="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p class="text-xs text-gray-600">
          <i class="fa fa-info-circle text-blue-500 mr-1"></i>
          Customizing:
          <span class="font-semibold text-gray-900">{{
            selectedButton === "submit" ? "Submit" : "Reset"
          }}</span>
          button
        </p>
      </div>
    </div>

    <div class="space-y-6">
      <!-- Label Content -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Button Label
        </label>
        <input
          v-model="currentConfig.label"
          type="text"
          :placeholder="selectedButton === 'submit' ? 'Submit' : 'Reset'"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <p class="text-xs text-gray-500 mt-1">
          Original: {{ getOriginalLabel() }}
        </p>
      </div>

      <!-- Background Type -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Background Style
        </label>
        <div class="flex gap-2">
          <button
            v-for="type in backgroundTypes"
            :key="type.value"
            @click="currentConfig.backgroundType = type.value"
            :class="[
              'flex-1 px-3 py-2 rounded-lg text-sm font-medium border transition',
              currentConfig.backgroundType === type.value
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-white text-gray-700 border-gray-300 hover:border-green-500',
            ]"
          >
            {{ type.label }}
          </button>
        </div>
      </div>

      <!-- Background Color/Gradient -->
      <div v-if="currentConfig.backgroundType === 'solid'">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Background Color
        </label>
        <div class="flex gap-2">
          <input
            v-model="currentConfig.backgroundColor"
            type="color"
            class="h-10 w-16 rounded border border-gray-300 cursor-pointer"
          />
          <input
            v-model="currentConfig.backgroundColor"
            type="text"
            placeholder="#000000"
            class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      <div v-if="currentConfig.backgroundType === 'gradient'">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Gradient Colors
        </label>
        <div class="space-y-2">
          <div class="flex gap-2 items-center">
            <span class="text-xs text-gray-500 w-12">From:</span>
            <input
              v-model="currentConfig.gradientFrom"
              type="color"
              class="h-10 w-16 rounded border border-gray-300 cursor-pointer"
            />
            <input
              v-model="currentConfig.gradientFrom"
              type="text"
              placeholder="#000000"
              class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div class="flex gap-2 items-center">
            <span class="text-xs text-gray-500 w-12">To:</span>
            <input
              v-model="currentConfig.gradientTo"
              type="color"
              class="h-10 w-16 rounded border border-gray-300 cursor-pointer"
            />
            <input
              v-model="currentConfig.gradientTo"
              type="text"
              placeholder="#000000"
              class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <!-- Text Color -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Text Color
        </label>
        <div class="flex gap-2">
          <input
            v-model="currentConfig.textColor"
            type="color"
            class="h-10 w-16 rounded border border-gray-300 cursor-pointer"
          />
          <input
            v-model="currentConfig.textColor"
            type="text"
            placeholder="#000000"
            class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      <!-- Border Radius -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Border Radius: {{ currentConfig.borderRadius }}px
        </label>
        <input
          v-model.number="currentConfig.borderRadius"
          type="range"
          min="0"
          max="50"
          class="w-full"
        />
      </div>

      <!-- Border Color -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Border Color
        </label>
        <div class="flex gap-2">
          <input
            v-model="currentConfig.borderColor"
            type="color"
            class="h-10 w-16 rounded border border-gray-300 cursor-pointer"
          />
          <input
            v-model="currentConfig.borderColor"
            type="text"
            placeholder="#000000"
            class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      <!-- Border Thickness -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Border Thickness: {{ currentConfig.borderThickness }}px
        </label>
        <input
          v-model.number="currentConfig.borderThickness"
          type="range"
          min="0"
          max="10"
          class="w-full"
        />
      </div>

      <!-- Font Size -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Font Size: {{ currentConfig.fontSize }}px
        </label>
        <input
          v-model.number="currentConfig.fontSize"
          type="range"
          min="10"
          max="24"
          class="w-full"
        />
      </div>

      <!-- Button Size -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Button Size
        </label>
        <div class="flex gap-2">
          <button
            v-for="size in buttonSizes"
            :key="size.value"
            @click="currentConfig.buttonSize = size.value"
            :class="[
              'flex-1 px-3 py-2 rounded-lg text-sm font-medium border transition',
              currentConfig.buttonSize === size.value
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-white text-gray-700 border-gray-300 hover:border-green-500',
            ]"
          >
            {{ size.label }}
          </button>
        </div>
      </div>

      <!-- Padding -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Padding
        </label>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-xs text-gray-500 mb-1 block">Horizontal</label>
            <input
              v-model.number="currentConfig.paddingX"
              type="number"
              min="0"
              max="50"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label class="text-xs text-gray-500 mb-1 block">Vertical</label>
            <input
              v-model.number="currentConfig.paddingY"
              type="number"
              min="0"
              max="50"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <!-- Hover Effect -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Hover Effect
        </label>
        <select
          v-model="currentConfig.hoverEffect"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="none">None</option>
          <option value="darken">Darken</option>
          <option value="lighten">Lighten</option>
          <option value="scale">Scale Up</option>
          <option value="shadow">Add Shadow</option>
        </select>
      </div>

      <!-- Live Preview -->
      <div class="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 class="text-xs font-semibold text-gray-500 uppercase mb-3">
          Live Preview
        </h3>
        <div class="flex gap-3 items-center justify-center p-4">
          <button
            :style="submitPreviewStyle"
            @mouseenter="hoveredButton = 'submit'"
            @mouseleave="hoveredButton = null"
            class="transition-all duration-200"
          >
            {{ store.buttonConfig.submit.label || "Submit" }}
          </button>
          <button
            :style="resetPreviewStyle"
            @mouseenter="hoveredButton = 'reset'"
            @mouseleave="hoveredButton = null"
            class="transition-all duration-200"
          >
            {{ store.buttonConfig.reset.label || "Reset" }}
          </button>
        </div>
        <p class="text-xs text-gray-500 mt-3 text-center">
          <i class="fa fa-mouse-pointer mr-1"></i>
          Hover over buttons to see effects
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useDataStore } from "../../store/data";

const store = useDataStore();
const selectedButton = ref("submit");
const hoveredButton = ref(null);

const buttons = [
  { label: "Submit", value: "submit", icon: "fa fa-paper-plane" },
  { label: "Reset", value: "reset", icon: "fa fa-undo" },
];

const backgroundTypes = [
  { label: "Solid", value: "solid" },
  { label: "Outlined", value: "outlined" },
  { label: "Gradient", value: "gradient" },
];

const buttonSizes = [
  { label: "Small", value: "small" },
  { label: "Medium", value: "medium" },
  { label: "Large", value: "large" },
];

// Current button config
const currentConfig = computed(() => {
  return selectedButton.value === "submit"
    ? store.buttonConfig.submit
    : store.buttonConfig.reset;
});

// Get original label from HTML
const getOriginalLabel = () => {
  if (!store.rawHTML) return "N/A";

  const type = selectedButton.value === "submit" ? "submit" : "reset";
  const match = store.rawHTML.match(
    new RegExp(
      `<input[^>]*type\\s*=\\s*["']${type}["'][^>]*value\\s*=\\s*["']([^"']*)["']`,
      "i"
    )
  );

  return match && match[1] ? match[1] : "N/A";
};

// Helper to generate button style
const generateButtonStyle = (config, buttonType) => {
  let style = {
    color: config.textColor,
    borderRadius: `${config.borderRadius}px`,
    borderColor: config.borderColor,
    borderWidth: `${config.borderThickness}px`,
    borderStyle: "solid",
    fontSize: `${config.fontSize}px`,
    paddingLeft: `${config.paddingX}px`,
    paddingRight: `${config.paddingX}px`,
    paddingTop: `${config.paddingY}px`,
    paddingBottom: `${config.paddingY}px`,
    cursor: "pointer",
  };

  // Background
  if (config.backgroundType === "solid") {
    style.background = config.backgroundColor;
  } else if (config.backgroundType === "gradient") {
    style.background = `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`;
  } else if (config.backgroundType === "outlined") {
    style.background = "transparent";
  }

  // Button size
  if (config.buttonSize === "small") {
    style.minWidth = "80px";
  } else if (config.buttonSize === "medium") {
    style.minWidth = "120px";
  } else if (config.buttonSize === "large") {
    style.minWidth = "160px";
  }

  // Hover effects
  if (hoveredButton.value === buttonType && config.hoverEffect !== "none") {
    if (config.hoverEffect === "darken") {
      style.filter = "brightness(0.85)";
    } else if (config.hoverEffect === "lighten") {
      style.filter = "brightness(1.15)";
    } else if (config.hoverEffect === "scale") {
      style.transform = "scale(1.05)";
    } else if (config.hoverEffect === "shadow") {
      style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
    }
  }

  return style;
};

// Submit button preview style
const submitPreviewStyle = computed(() => {
  return generateButtonStyle(store.buttonConfig.submit, "submit");
});

// Reset button preview style
const resetPreviewStyle = computed(() => {
  return generateButtonStyle(store.buttonConfig.reset, "reset");
});
</script>
