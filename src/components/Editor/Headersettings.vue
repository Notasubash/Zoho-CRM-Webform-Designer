<template>
  <div>
    <h2 class="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
      <i class="fa fa-heading text-green-600"></i>
      Header Settings
    </h2>

    <div class="space-y-6">
      <!-- Enable Header -->
<div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
  <label class="flex items-center gap-3 cursor-pointer">
    <input
      type="checkbox"
      v-model="headerConfig.headerEnabled"
      :disabled="headerConfig.headerExistsInOriginal"
      class="w-4 h-4 accent-green-600"
      :class="{ 'opacity-50 cursor-not-allowed': headerConfig.headerExistsInOriginal }"
    />
    <span class="text-sm font-medium text-gray-800">
      Show Header
    </span>
  </label>
  <p class="text-xs text-gray-600 mt-2 ml-7">
    <template v-if="headerConfig.headerExistsInOriginal">
      <i class="fa fa-lock text-green-600"></i>
      Header detected in your form - always visible (text is editable)
    </template>
    <template v-else>
      Enable this to add a header to your form
    </template>
  </p>
</div>

      <!-- Show rest only if header is enabled -->
      <template v-if="headerConfig.headerEnabled">
        <!-- Header Text Input -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Header Text
          </label>
          <input
            v-model="headerConfig.headerText"
            type="text"
            placeholder="e.g., Lead, Contact Us, Get Started"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm
                   focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <p class="text-xs text-gray-500 mt-1">
            The main title text for your form
          </p>
        </div>

        <!-- Divider -->
        <div class="border-t border-gray-200 my-6"></div>

        <!-- Background Type -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Background Type
          </label>
          <div class="flex gap-2">
            <button
              @click="headerConfig.backgroundType = 'solid'"
              :class="[
                'flex-1 px-3 py-2 rounded-lg text-sm font-medium border transition',
                headerConfig.backgroundType === 'solid'
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-green-500'
              ]"
            >
              Solid
            </button>
            <button
              @click="headerConfig.backgroundType = 'gradient'"
              :class="[
                'flex-1 px-3 py-2 rounded-lg text-sm font-medium border transition',
                headerConfig.backgroundType === 'gradient'
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-green-500'
              ]"
            >
              Gradient
            </button>
          </div>
        </div>

        <!-- Solid Background Color -->
        <div v-if="headerConfig.backgroundType === 'solid'">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Background Color
          </label>
          <div class="flex gap-2">
            <input
              v-model="headerConfig.backgroundColor"
              type="color"
              class="h-10 w-16 rounded border border-gray-300 cursor-pointer"
            />
            <input
              v-model="headerConfig.backgroundColor"
              type="text"
              placeholder="#22c55e"
              class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm
                     focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        <!-- Gradient Colors -->
        <div v-if="headerConfig.backgroundType === 'gradient'" class="space-y-4">
          <!-- Gradient From -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Gradient Start Color
            </label>
            <div class="flex gap-2">
              <input
                v-model="headerConfig.gradientFrom"
                type="color"
                class="h-10 w-16 rounded border border-gray-300 cursor-pointer"
              />
              <input
                v-model="headerConfig.gradientFrom"
                type="text"
                placeholder="#22c55e"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm
                       focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <!-- Gradient To -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Gradient End Color
            </label>
            <div class="flex gap-2">
              <input
                v-model="headerConfig.gradientTo"
                type="color"
                class="h-10 w-16 rounded border border-gray-300 cursor-pointer"
              />
              <input
                v-model="headerConfig.gradientTo"
                type="text"
                placeholder="#16a34a"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm
                       focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <!-- Gradient Angle -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Gradient Angle: {{ headerConfig.gradientAngle }}°
            </label>
            <input
              v-model.number="headerConfig.gradientAngle"
              type="range"
              min="0"
              max="360"
              class="w-full"
            />
          </div>
        </div>

        <!-- Divider -->
        <div class="border-t border-gray-200 my-6"></div>

        <!-- Text Color -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Text Color
          </label>
          <div class="flex gap-2">
            <input
              v-model="headerConfig.textColor"
              type="color"
              class="h-10 w-16 rounded border border-gray-300 cursor-pointer"
            />
            <input
              v-model="headerConfig.textColor"
              type="text"
              placeholder="#ffffff"
              class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm
                     focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        <!-- Font Size -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Font Size: {{ headerConfig.fontSize }}px
          </label>
          <input
            v-model.number="headerConfig.fontSize"
            type="range"
            min="16"
            max="40"
            class="w-full"
          />
        </div>

        <!-- Font Weight -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Font Weight
          </label>
          <select
            v-model="headerConfig.fontWeight"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm
                   focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="300">Light (300)</option>
            <option value="400">Regular (400)</option>
            <option value="500">Medium (500)</option>
            <option value="600">Semi-Bold (600)</option>
            <option value="700">Bold (700)</option>
            <option value="800">Extra Bold (800)</option>
          </select>
        </div>

        <!-- Font Family -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Font Family
          </label>
          <select
            v-model="headerConfig.fontFamily"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm
                   focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="'Helvetica Neue', Helvetica, Arial, sans-serif">Helvetica Neue</option>
            <option value="Inter, system-ui, sans-serif">Inter</option>
            <option value="'Segoe UI', system-ui, sans-serif">Segoe UI</option>
            <option value="Roboto, sans-serif">Roboto</option>
            <option value="'Open Sans', sans-serif">Open Sans</option>
            <option value="Lato, sans-serif">Lato</option>
            <option value="Poppins, sans-serif">Poppins</option>
            <option value="Montserrat, sans-serif">Montserrat</option>
            <option value="Nunito, sans-serif">Nunito</option>
            <option value="Georgia, serif">Georgia</option>
            <option value="'Times New Roman', serif">Times New Roman</option>
            <option value="'Courier New', monospace">Courier New</option>
            <option value="'Fira Code', monospace">Fira Code</option>
          </select>
        </div>

        <!-- Divider -->
        <div class="border-t border-gray-200 my-6"></div>

        <!-- Enable Subheader -->
        <label class="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            v-model="headerConfig.subheaderEnabled"
            class="w-4 h-4 accent-green-600"
          />
          <span class="text-sm font-medium text-gray-800">
            Show Subheader
          </span>
        </label>

        <!-- Subheader Options -->
        <div v-if="headerConfig.subheaderEnabled" class="space-y-6 pl-7">
          <!-- Subheader Text -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Subheader Text
            </label>
            <input
              v-model="headerConfig.subheaderText"
              type="text"
              placeholder="e.g., Fill out the form below"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm
                     focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <p class="text-xs text-gray-500 mt-1">
              Optional subtitle text below the main header
            </p>
          </div>

          <!-- Subheader Color -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Subheader Color
            </label>
            <div class="flex gap-2">
              <input
                v-model="headerConfig.subheaderTextColor"
                type="color"
                class="h-10 w-16 rounded border border-gray-300 cursor-pointer"
              />
              <input
                v-model="headerConfig.subheaderTextColor"
                type="text"
                placeholder="#e5e7eb"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm
                       focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <!-- Subheader Font Size -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Subheader Font Size: {{ headerConfig.subheaderFontSize }}px
            </label>
            <input
              v-model.number="headerConfig.subheaderFontSize"
              type="range"
              min="10"
              max="24"
              class="w-full"
            />
          </div>

          <!-- Subheader Font Weight -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Subheader Font Weight
            </label>
            <select
              v-model="headerConfig.subheaderFontWeight"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm
                     focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="300">Light (300)</option>
              <option value="400">Regular (400)</option>
              <option value="500">Medium (500)</option>
              <option value="600">Semi-Bold (600)</option>
              <option value="700">Bold (700)</option>
            </select>
          </div>

          <!-- Subheader Font Family -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Subheader Font Family
            </label>
            <select
              v-model="headerConfig.subheaderFontFamily"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm
                     focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="'Helvetica Neue', Helvetica, Arial, sans-serif">Helvetica Neue</option>
              <option value="Inter, system-ui, sans-serif">Inter</option>
              <option value="'Segoe UI', system-ui, sans-serif">Segoe UI</option>
              <option value="Roboto, sans-serif">Roboto</option>
              <option value="'Open Sans', sans-serif">Open Sans</option>
              <option value="Lato, sans-serif">Lato</option>
              <option value="Poppins, sans-serif">Poppins</option>
              <option value="Montserrat, sans-serif">Montserrat</option>
              <option value="Nunito, sans-serif">Nunito</option>
              <option value="Georgia, serif">Georgia</option>
              <option value="'Times New Roman', serif">Times New Roman</option>
              <option value="'Courier New', monospace">Courier New</option>
              <option value="'Fira Code', monospace">Fira Code</option>
            </select>
          </div>

          <!-- Subheader Gap -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Gap from Header: {{ headerConfig.subheaderGap }}px
            </label>
            <input
              v-model.number="headerConfig.subheaderGap"
              type="range"
              min="0"
              max="24"
              class="w-full"
            />
            <p class="text-xs text-gray-500 mt-1">
              Spacing between header and subheader
            </p>
          </div>
        </div>

        <!-- Preview -->
        <div class="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 class="text-xs font-semibold text-gray-500 uppercase mb-3">
            Preview
          </h3>
          <div 
            class="p-4 rounded-lg"
            :style="previewBackgroundStyle"
          >
            <div :style="headerStyle">
              {{ headerConfig.headerText || 'Contact Us' }}
            </div>
            <div 
              v-if="headerConfig.subheaderEnabled && headerConfig.subheaderText"
              :style="subheaderStyle"
            >
              {{ headerConfig.subheaderText }}
            </div>
          </div>
          <p class="text-xs text-gray-500 mt-2">
            <i class="fa fa-info-circle"></i>
            This shows how your header will appear in the form
          </p>
        </div>
      </template>

      <!-- Message when header is disabled -->
      <div v-else class="text-center py-8">
        <i class="fa fa-eye-slash text-gray-300 text-3xl mb-2"></i>
        <p class="text-sm text-gray-500">Enable "Show Header" to customize your form header</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useDataStore } from "../../store/data";

const store = useDataStore();
const headerConfig = computed(() => store.headerConfig);

// Generate preview background style
const previewBackgroundStyle = computed(() => {
  if (headerConfig.value.backgroundType === 'solid') {
    return {
      background: headerConfig.value.backgroundColor,
      borderRadius: '8px'
    };
  } else {
    return {
      background: `linear-gradient(${headerConfig.value.gradientAngle}deg, ${headerConfig.value.gradientFrom}, ${headerConfig.value.gradientTo})`,
      borderRadius: '8px'
    };
  }
});

const headerStyle = computed(() => ({
  color: headerConfig.value.textColor,
  fontSize: `${headerConfig.value.fontSize}px`,
  fontWeight: headerConfig.value.fontWeight,
  fontFamily: headerConfig.value.fontFamily,
  marginBottom: headerConfig.value.subheaderEnabled && headerConfig.value.subheaderText 
    ? `${headerConfig.value.subheaderGap}px` 
    : '0'
}));

const subheaderStyle = computed(() => ({
  color: headerConfig.value.subheaderTextColor,
  fontSize: `${headerConfig.value.subheaderFontSize}px`,
  fontWeight: headerConfig.value.subheaderFontWeight,
  fontFamily: headerConfig.value.subheaderFontFamily
}));
</script>

<style scoped>
/* Add custom styling for range inputs if needed */
input[type="range"] {
  accent-color: #22c55e;
}
</style>