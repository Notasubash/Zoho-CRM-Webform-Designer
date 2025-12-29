<template>
  <div>
    <h2 class="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
      <i class="fa fa-window-maximize text-green-600"></i>
      Form Settings
    </h2>

    <div class="space-y-6">
      <!-- Background Type -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Background Type
        </label>
        <div class="flex gap-2">
          <button
            @click="formConfig.backgroundType = 'solid'"
            :class="[
              'flex-1 px-3 py-2 rounded-lg text-sm font-medium border transition',
              formConfig.backgroundType === 'solid'
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-white text-gray-700 border-gray-300 hover:border-green-500'
            ]"
          >
            Solid
          </button>
          <button
            @click="formConfig.backgroundType = 'gradient'"
            :class="[
              'flex-1 px-3 py-2 rounded-lg text-sm font-medium border transition',
              formConfig.backgroundType === 'gradient'
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-white text-gray-700 border-gray-300 hover:border-green-500'
            ]"
          >
            Gradient
          </button>
        </div>
      </div>

      <!-- Solid Background Color -->
      <div v-if="formConfig.backgroundType === 'solid'">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Background Color
        </label>
        <div class="flex gap-2">
          <input
            v-model="formConfig.backgroundColor"
            type="color"
            class="h-10 w-16 rounded border border-gray-300 cursor-pointer"
          />
          <input
            v-model="formConfig.backgroundColor"
            type="text"
            placeholder="#ffffff"
            class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm
                   focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      <!-- Gradient Colors -->
      <div v-if="formConfig.backgroundType === 'gradient'" class="space-y-4">
        <!-- Gradient From -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Gradient Start Color
          </label>
          <div class="flex gap-2">
            <input
              v-model="formConfig.gradientFrom"
              type="color"
              class="h-10 w-16 rounded border border-gray-300 cursor-pointer"
            />
            <input
              v-model="formConfig.gradientFrom"
              type="text"
              placeholder="#f8fafc"
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
              v-model="formConfig.gradientTo"
              type="color"
              class="h-10 w-16 rounded border border-gray-300 cursor-pointer"
            />
            <input
              v-model="formConfig.gradientTo"
              type="text"
              placeholder="#ffffff"
              class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm
                     focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        <!-- Gradient Angle -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Gradient Angle: {{ formConfig.gradientAngle }}°
          </label>
          <input
            v-model.number="formConfig.gradientAngle"
            type="range"
            min="0"
            max="360"
            class="w-full"
          />
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-gray-200 my-6"></div>

      <!-- Padding -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Padding: {{ formConfig.padding }}px
        </label>
        <input
          v-model.number="formConfig.padding"
          type="range"
          min="10"
          max="60"
          class="w-full"
        />
        <p class="text-xs text-gray-500 mt-1">
          Space between form edge and content
        </p>
      </div>

      <!-- Row Spacing -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Row Spacing: {{ formConfig.rowSpacing }}px
        </label>
        <input
          v-model.number="formConfig.rowSpacing"
          type="range"
          min="0"
          max="40"
          class="w-full"
        />
        <p class="text-xs text-gray-500 mt-1">
          Vertical space between form rows
        </p>
      </div>

      <!-- Divider -->
      <div class="border-t border-gray-200 my-6"></div>

      <!-- Border Radius -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Border Radius: {{ formConfig.borderRadius }}px
        </label>
        <input
          v-model.number="formConfig.borderRadius"
          type="range"
          min="0"
          max="30"
          class="w-full"
        />
      </div>

      <!-- Border Width -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Border Width: {{ formConfig.borderWidth }}px
        </label>
        <input
          v-model.number="formConfig.borderWidth"
          type="range"
          min="0"
          max="10"
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
            v-model="formConfig.borderColor"
            type="color"
            class="h-10 w-16 rounded border border-gray-300 cursor-pointer"
          />
          <input
            v-model="formConfig.borderColor"
            type="text"
            placeholder="#e5e7eb"
            class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm
                   focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-gray-200 my-6"></div>

      <!-- Shadow -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Shadow
        </label>
        <select
          v-model="formConfig.shadow"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm
                 focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="none">None</option>
          <option value="sm">Small</option>
          <option value="md">Medium</option>
          <option value="lg">Large</option>
          <option value="xl">Extra Large</option>
          <option value="2xl">2X Large</option>
        </select>
      </div>

      <!-- Font Family -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Font Family
        </label>
        <select
          v-model="formConfig.fontFamily"
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
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useDataStore } from "../../store/data";

const store = useDataStore();
const formConfig = computed(() => store.formConfig);

function getShadowValue(shadow) {
  const shadowMap = {
    none: "none",
    sm: "0 1px 2px rgba(0,0,0,0.05)",
    md: "0 4px 6px rgba(0,0,0,0.1)",
    lg: "0 10px 15px rgba(0,0,0,0.15)",
    xl: "0 20px 25px rgba(0,0,0,0.2)",
    "2xl": "0 25px 50px rgba(0,0,0,0.25)",
  };
  return shadowMap[shadow] || shadowMap.md;
}
</script>

<style scoped>
/* Add custom styling for range inputs if needed */
input[type="range"] {
  accent-color: #22c55e;
}
</style>