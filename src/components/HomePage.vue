<template>
  <!-- Header -->
  <header class="h-16 flex items-center justify-between
         px-4 md:px-6 bg-white border-b border-gray-200">
    <!-- Left section -->
    <div class="flex items-center gap-3">
      <div class="w-9 h-9 rounded-xl bg-green-500 flex items-center justify-center">
        <i class="fa fa-th-large text-white text-sm"></i>
      </div>
      <span class="text-lg font-semibold text-gray-900">
        Zoho Designer
      </span>
    </div>

    <!-- Help Button -->
    <button class="flex items-center gap-2 px-1 md:px-2 md:py-2 py-1 rounded-full
           border border-gray-300 text-sm text-gray-800
           hover:bg-gray-100 transition">
      <!-- Icon always visible -->
      <span class="w-8 h-8 md:w-5 md:h-5 flex items-center justify-center
             rounded-full text-xs">
        <i class="fa fa-question"></i>
      </span>

      <!-- Text only on desktop -->
      <span class="hidden md:inline">
        Help
      </span>
    </button>
  </header>

  <!-- Main Section -->
  <section class="bg-gray-50 py-10 md:py-16 px-4">
    <!-- Heading -->
    <div class="text-center mb-8 md:mb-10">
      <h1 class="text-2xl md:text-4xl font-bold text-gray-900">
        Zoho Webform Designer
      </h1>
      <p class="mt-3 text-base md:text-lg text-gray-600">
        Visually customize your Zoho CRM webforms without touching the logic.
      </p>
    </div>

    <!-- Card -->
    <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm
             border border-gray-200 overflow-hidden">
      <!-- Card Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between
               px-4 md:px-6 py-4 border-b border-gray-200 bg-gray-50 gap-3">
        <!-- Mac dots -->
        <div class="flex gap-2">
          <span class="w-3 h-3 rounded-full bg-red-500"></span>
          <span class="w-3 h-3 rounded-full bg-yellow-400"></span>
          <span class="w-3 h-3 rounded-full bg-green-500"></span>
        </div>

        <!-- Help link -->
        <a href="#" class="flex items-center gap-2 text-sm text-green-600 hover:underline">
          <i class="fa fa-external-link-alt text-xs"></i>
          Where do I find this code?
        </a>
      </div>

      <!-- Card Body -->
      <div class="p-4 md:p-8">
        <h3 class="text-lg font-semibold text-gray-900">
          Paste Zoho CRM HTML
        </h3>

        <p class="mt-1 text-sm text-gray-600">
          Copy the full HTML code provided by Zoho CRM's webform setup wizard
          and paste it below.
        </p>

        <!-- Textarea -->
        <div class="mt-4 md:mt-6">
          <textarea 
            v-model="htmlInput"
            rows="8" 
            placeholder="<!-- Paste your full Zoho CRM webform code here -->" 
            class="w-full rounded-lg border-2 border-green-500
                   p-3 md:p-4 text-sm font-mono text-gray-800
                   placeholder-gray-400 focus:outline-none
                   focus:ring-2 focus:ring-green-200">
          </textarea>
        </div>

        <!-- Footer -->
        <div class="mt-6 flex flex-col md:flex-row md:items-center
                 md:justify-between gap-4">
          <!-- Privacy note -->
          <div class="flex items-center gap-2 text-sm text-gray-600">
            <i class="fa fa-shield-alt text-green-600 mt-0.5"></i>
            <p>
              <span class="font-medium">Privacy Note:</span>
              Code is processed locally in your browser.
              We never store your form data or logic.
            </p>
          </div>

          <!-- CTA Button -->
          <button 
            @click="goToThemes"
            :disabled="!htmlInput.trim()"
            :class="[
              'w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold transition',
              htmlInput.trim() 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            ]"
          >
            Next
            <i class="fa fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useDataStore } from "../store/data";

const dataStore = useDataStore();
const htmlInput = ref(dataStore.rawHTML || '');

function goToThemes() {
  if (htmlInput.value.trim()) {
    dataStore.rawHTML = htmlInput.value;
    dataStore.goTo('theme');
  }
}
</script>