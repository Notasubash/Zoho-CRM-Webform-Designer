<template>
  <div>
    <h2 class="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
      <i class="fa fa-th text-green-600"></i>
      Layout Settings
    </h2>

    <div class="space-y-6">
      <!-- Label Width -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Label Width: {{ layoutConfig.labelWidth }}%
        </label>
        <input
          v-model.number="layoutConfig.labelWidth"
          type="range"
          min="20"
          max="50"
          class="w-full"
        />
        <p class="text-xs text-gray-500 mt-1">
          Width of the label column (20% - 50%)
        </p>
      </div>

      <!-- Input Width -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Input Width: {{ layoutConfig.inputWidth }}%
        </label>
        <input
          v-model.number="layoutConfig.inputWidth"
          type="range"
          min="50"
          max="80"
          class="w-full"
        />
        <p class="text-xs text-gray-500 mt-1">
          Width of the input field column (50% - 80%)
        </p>
      </div>

      <!-- Divider -->
      <div class="border-t border-gray-200 my-6"></div>

      <!-- Row Spacing -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Row Spacing: {{ layoutConfig.rowSpacing }}px
        </label>
        <input
          v-model.number="layoutConfig.rowSpacing"
          type="range"
          min="0"
          max="40"
          class="w-full"
        />
        <p class="text-xs text-gray-500 mt-1">
          Vertical space between form rows
        </p>
      </div>

      <!-- Field Spacing -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Field Spacing: {{ layoutConfig.fieldSpacing }}px
        </label>
        <input
          v-model.number="layoutConfig.fieldSpacing"
          type="range"
          min="0"
          max="30"
          class="w-full"
        />
        <p class="text-xs text-gray-500 mt-1">
          Horizontal space between label and input
        </p>
      </div>

      <!-- Preview -->
      <div class="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 class="text-xs font-semibold text-gray-500 uppercase mb-3">
          Preview
        </h3>
        <div class="bg-white p-4 rounded-lg border border-gray-200">
          <!-- Sample Row 1 -->
          <div 
            class="flex items-center"
            :style="{ marginBottom: `${layoutConfig.rowSpacing}px` }"
          >
            <div 
              class="text-sm font-medium text-gray-700"
              :style="{ width: `${layoutConfig.labelWidth}%`, marginRight: `${layoutConfig.fieldSpacing}px` }"
            >
              First Name
            </div>
            <div :style="{ width: `${layoutConfig.inputWidth}%` }">
              <input
                type="text"
                disabled
                placeholder="Enter first name"
                class="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-gray-50"
              />
            </div>
          </div>

          <!-- Sample Row 2 -->
          <div class="flex items-center">
            <div 
              class="text-sm font-medium text-gray-700"
              :style="{ width: `${layoutConfig.labelWidth}%`, marginRight: `${layoutConfig.fieldSpacing}px` }"
            >
              Email
            </div>
            <div :style="{ width: `${layoutConfig.inputWidth}%` }">
              <input
                type="email"
                disabled
                placeholder="Enter email"
                class="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-gray-50"
              />
            </div>
          </div>
        </div>
        <p class="text-xs text-gray-500 mt-2">
          <i class="fa fa-info-circle"></i>
          This shows how your form layout will appear
        </p>
      </div>

      <!-- Reset Button -->
      <div class="pt-4 border-t border-gray-200">
        <button
          @click="resetLayout"
          class="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition flex items-center justify-center gap-2"
        >
          <i class="fa fa-undo"></i>
          Reset to Default
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useDataStore } from "../../store/data";

const store = useDataStore();
const layoutConfig = computed(() => store.layoutConfig);

function resetLayout() {
  store.layoutConfig.labelWidth = 30;
  store.layoutConfig.inputWidth = 68;
  store.layoutConfig.rowSpacing = 15;
  store.layoutConfig.fieldSpacing = 10;
}
</script>

<style scoped>
/* Add custom styling for range inputs */
input[type="range"] {
  accent-color: #22c55e;
}
</style>