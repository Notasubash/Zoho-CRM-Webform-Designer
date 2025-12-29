<template>
  <div>
    <h2 class="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
      <i class="fa fa-tag text-green-600"></i>
      Label Settings
    </h2>

    <div class="space-y-6">
      <!-- Text Color -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Text Color
        </label>
        <div class="flex gap-2">
          <input
            v-model="labelConfig.textColor"
            type="color"
            class="h-10 w-16 rounded border border-gray-300 cursor-pointer"
          />
          <input
            v-model="labelConfig.textColor"
            type="text"
            placeholder="#374151"
            class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm
                   focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      <!-- Font Size -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Font Size: {{ labelConfig.fontSize }}px
        </label>
        <input
          v-model.number="labelConfig.fontSize"
          type="range"
          min="10"
          max="20"
          class="w-full"
        />
      </div>

      <!-- Font Weight -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Font Weight
        </label>
        <select
          v-model="labelConfig.fontWeight"
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

      <!-- Divider -->
      <div class="border-t border-gray-200 my-6"></div>

      <!-- Label Width -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Label Width: {{ labelConfig.labelWidth }}%
        </label>
        <input
          v-model.number="labelConfig.labelWidth"
          type="range"
          min="20"
          max="50"
          class="w-full"
        />
        <p class="text-xs text-gray-500 mt-1">
          Width of the label column (20% - 50%)
        </p>
      </div>

      <!-- Divider -->
      <div class="border-t border-gray-200 my-6"></div>

      <!-- Required Indicator Color -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Required Indicator Color
        </label>
        <div class="flex gap-2">
          <input
            v-model="labelConfig.requiredColor"
            type="color"
            class="h-10 w-16 rounded border border-gray-300 cursor-pointer"
          />
          <input
            v-model="labelConfig.requiredColor"
            type="text"
            placeholder="#ef4444"
            class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm
                   focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <p class="text-xs text-gray-500 mt-1">
          Color of the asterisk (*) for required fields
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useDataStore } from "../../store/data";

const store = useDataStore();
const labelConfig = computed(() => store.labelConfig);
</script>

<style scoped>
/* Add custom styling for range inputs if needed */
input[type="range"] {
  accent-color: #22c55e;
}
</style>