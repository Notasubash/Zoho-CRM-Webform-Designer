<template>
  <div>
    <h2 class="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
      <i class="fa fa-i-cursor text-green-600"></i>
      Input Settings
    </h2>

    <div class="space-y-6">
      <!-- Background Color -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Background Color
        </label>
        <div class="flex gap-2">
          <input
            v-model="inputConfig.backgroundColor"
            type="color"
            class="h-10 w-16 rounded border border-gray-300 cursor-pointer"
          />
          <input
            v-model="inputConfig.backgroundColor"
            type="text"
            placeholder="#ffffff"
            class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm
                   focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      <!-- Border Color -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Border Color
        </label>
        <div class="flex gap-2">
          <input
            v-model="inputConfig.borderColor"
            type="color"
            class="h-10 w-16 rounded border border-gray-300 cursor-pointer"
          />
          <input
            v-model="inputConfig.borderColor"
            type="text"
            placeholder="#d1d5db"
            class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm
                   focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      <!-- Border Width -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Border Width: {{ inputConfig.borderWidth }}px
        </label>
        <input
          v-model.number="inputConfig.borderWidth"
          type="range"
          min="0"
          max="5"
          class="w-full"
        />
      </div>

      <!-- Border Radius -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Border Radius: {{ inputConfig.borderRadius }}px
        </label>
        <input
          v-model.number="inputConfig.borderRadius"
          type="range"
          min="0"
          max="30"
          class="w-full"
        />
      </div>

      <!-- Text Color -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Text Color
        </label>
        <div class="flex gap-2">
          <input
            v-model="inputConfig.textColor"
            type="color"
            class="h-10 w-16 rounded border border-gray-300 cursor-pointer"
          />
          <input
            v-model="inputConfig.textColor"
            type="text"
            placeholder="#1f2937"
            class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm
                   focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <p class="text-xs text-gray-500 mt-1">
          Color of the text user types in the input
        </p>
      </div>

      <!-- Placeholder Color -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Placeholder Color
        </label>
        <div class="flex gap-2">
          <input
            v-model="inputConfig.placeholderColor"
            type="color"
            class="h-10 w-16 rounded border border-gray-300 cursor-pointer"
          />
          <input
            v-model="inputConfig.placeholderColor"
            type="text"
            placeholder="#9ca3af"
            class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm
                   focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      <!-- Font Size -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Font Size: {{ inputConfig.fontSize }}px
        </label>
        <input
          v-model.number="inputConfig.fontSize"
          type="range"
          min="10"
          max="20"
          class="w-full"
        />
      </div>

      <!-- Padding -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Padding: {{ inputConfig.padding }}px
        </label>
        <input
          v-model.number="inputConfig.padding"
          type="range"
          min="4"
          max="20"
          class="w-full"
        />
        <p class="text-xs text-gray-500 mt-1">
          Internal spacing inside the input
        </p>
      </div>

      <!-- Input Size -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Input Size (Width)
        </label>
        <select
          v-model="inputConfig.inputSize"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm
                 focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="small">Small (50%)</option>
          <option value="medium">Medium (75%)</option>
          <option value="large">Large (100%)</option>
        </select>
        <p class="text-xs text-gray-500 mt-1">
          Controls the width of input fields relative to container
        </p>
      </div>

      <!-- Focus Border Color -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Focus State Border Color
        </label>
        <div class="flex gap-2">
          <input
            v-model="inputConfig.focusBorderColor"
            type="color"
            class="h-10 w-16 rounded border border-gray-300 cursor-pointer"
          />
          <input
            v-model="inputConfig.focusBorderColor"
            type="text"
            placeholder="#3b82f6"
            class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm
                   focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <p class="text-xs text-gray-500 mt-1">
          Border color when input is focused/active
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useDataStore } from "../../store/data";

const store = useDataStore();
const showFocusState = ref(false);

const inputConfig = computed(() => store.inputConfig);

// Calculate width based on input size - using percentages
const inputWidth = computed(() => {
  const sizes = {
    small: '50%',
    medium: '75%',
    large: '100%'
  };
  return sizes[inputConfig.value.inputSize] || sizes.medium;
});

// Generate input style for preview
const inputStyle = computed(() => ({
  backgroundColor: inputConfig.value.backgroundColor,
  borderColor: showFocusState.value 
    ? inputConfig.value.focusBorderColor 
    : inputConfig.value.borderColor,
  borderWidth: `${inputConfig.value.borderWidth}px`,
  borderStyle: 'solid',
  borderRadius: `${inputConfig.value.borderRadius}px`,
  fontSize: `${inputConfig.value.fontSize}px`,
  color: inputConfig.value.textColor,
  padding: `${inputConfig.value.padding}px`,
  width: inputWidth.value,
  display: 'block',
  outline: 'none',
  '--placeholder-color': inputConfig.value.placeholderColor,
}));
</script>

<style scoped>
input::placeholder,
textarea::placeholder {
  color: var(--placeholder-color);
}
</style>