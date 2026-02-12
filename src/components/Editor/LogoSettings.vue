<template>
  <div>
    <h2 class="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
      <i class="fa fa-image text-green-600"></i>
      Logo Settings
    </h2>

    <!-- Logo URL (Always visible) -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Logo URL
      </label>
      <input
        v-model="logo.url"
        type="text"
        placeholder="https://example.com/logo.png"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm
               focus:ring-2 focus:ring-green-500 focus:border-transparent"
      />
      <p class="text-xs text-gray-500 mt-1">
        Enter a logo URL to display it on your form
      </p>
    </div>

    <!-- Logo Options (Only shown when URL is entered) -->
    <div v-if="logo.url && logo.url.trim()" class="space-y-6">
      <!-- Size -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Logo Size
        </label>
        <div class="flex gap-2">
          <button
            v-for="size in sizes"
            :key="size.value"
            @click="logo.size = size.value"
            :class="[
              'flex-1 px-3 py-2 rounded-lg text-sm font-medium border transition',
              logo.size === size.value
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-white text-gray-700 border-gray-300 hover:border-green-500'
            ]"
          >
            {{ size.label }}
          </button>
        </div>
      </div>

      <!-- Position -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Logo Position
        </label>

        <div class="space-y-2">
          <p class="text-xs text-gray-500">Top Positions:</p>
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="pos in topPositions"
              :key="pos.value"
              @click="logo.position = pos.value"
              :class="[
                'py-2 rounded-lg border text-sm font-medium transition',
                logo.position === pos.value
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-green-500'
              ]"
            >
              {{ pos.label }}
            </button>
          </div>

          <p class="text-xs text-gray-500 mt-4">Bottom Positions:</p>
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="pos in bottomPositions"
              :key="pos.value"
              @click="logo.position = pos.value"
              :class="[
                'py-2 rounded-lg border text-sm font-medium transition',
                logo.position === pos.value
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-green-500'
              ]"
            >
              {{ pos.label }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDataStore } from "../../store/data";

const store = useDataStore();
const logo = store.logoConfig;

const sizes = [
  { label: "Small", value: "small" },
  { label: "Medium", value: "medium" },
  { label: "Large", value: "large" },
];

const topPositions = [
  { label: "Top Left", value: "TL" },
  { label: "Top Center", value: "TC" },
  { label: "Top Right", value: "TR" },
];

const bottomPositions = [
  { label: "Bottom Left", value: "BL" },
  { label: "Bottom Center", value: "BC" },
  { label: "Bottom Right", value: "BR" },
];
</script>