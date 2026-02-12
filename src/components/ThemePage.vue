<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-blue-50">
    <!-- Header -->
    <header class="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <button
          @click="goBack"
          class="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
        >
          <i class="fa fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
          <span class="font-medium">Back</span>
        </button>
        
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-green-500 flex items-center justify-center">
            <i class="fa fa-th-large text-white text-sm"></i>
          </div>
          <span class="text-lg font-semibold text-gray-900">Zoho Designer</span>
        </div>
        
        <div class="w-20"></div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 md:px-6 py-12">
      <!-- Title Section -->
      <div class="text-center mb-12 animate-fade-in">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          Choose Your Theme
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Select a pre-designed theme to instantly transform your form, or customize every detail manually.
        </p>
      </div>

      <!-- Theme Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <!-- Theme Card 1: Modern Minimal -->
        <div
          @click="selectTheme('modern-minimal')"
          class="theme-card group cursor-pointer bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-green-500 transition-all duration-300 hover:shadow-2xl hover:scale-105"
        >
          <div class="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 p-8 flex items-center justify-center relative overflow-hidden">
            <div class="absolute inset-0 opacity-10">
              <div class="absolute top-4 left-4 w-32 h-32 bg-slate-400 rounded-full"></div>
              <div class="absolute bottom-4 right-4 w-24 h-24 bg-slate-500 rounded-full"></div>
            </div>
            <div class="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-xs transform group-hover:scale-105 transition-transform">
              <div class="h-3 bg-slate-200 rounded mb-3 w-3/4"></div>
              <div class="h-2 bg-slate-100 rounded mb-2"></div>
              <div class="h-2 bg-slate-100 rounded mb-4 w-5/6"></div>
              <div class="h-8 bg-slate-800 rounded"></div>
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2">Modern Minimal</h3>
            <p class="text-sm text-gray-600">Clean lines, subtle shadows, and elegant spacing for a professional look.</p>
            <div class="mt-4 flex items-center text-green-600 font-medium text-sm">
              <span>Select Theme</span>
              <i class="fa fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
            </div>
          </div>
        </div>

        <!-- Theme Card 2: Bold Gradient -->
        <div
          @click="selectTheme('bold-gradient')"
          class="theme-card group cursor-pointer bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-purple-500 transition-all duration-300 hover:shadow-2xl hover:scale-105"
        >
          <div class="aspect-video bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-8 flex items-center justify-center relative">
            <div class="relative bg-white rounded-xl shadow-2xl p-6 w-full max-w-xs transform group-hover:scale-105 transition-transform">
              <div class="h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded mb-3 w-3/4"></div>
              <div class="h-2 bg-gray-100 rounded mb-2"></div>
              <div class="h-2 bg-gray-100 rounded mb-4 w-5/6"></div>
              <div class="h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded"></div>
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2">Bold Gradient</h3>
            <p class="text-sm text-gray-600">Vibrant colors and dynamic gradients that make your form stand out.</p>
            <div class="mt-4 flex items-center text-purple-600 font-medium text-sm">
              <span>Select Theme</span>
              <i class="fa fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
            </div>
          </div>
        </div>

        <!-- Theme Card 3: Nature Organic -->
        <div
          @click="selectTheme('nature-organic')"
          class="theme-card group cursor-pointer bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-emerald-500 transition-all duration-300 hover:shadow-2xl hover:scale-105"
        >
          <div class="aspect-video bg-gradient-to-br from-emerald-200 via-teal-100 to-cyan-200 p-8 flex items-center justify-center relative overflow-hidden">
            <div class="absolute inset-0 opacity-20">
              <div class="absolute top-2 left-8 w-16 h-16 bg-emerald-300 rounded-full"></div>
              <div class="absolute bottom-8 right-4 w-20 h-20 bg-teal-300 rounded-full"></div>
              <div class="absolute top-12 right-12 w-12 h-12 bg-cyan-300 rounded-full"></div>
            </div>
            <div class="relative bg-white rounded-2xl shadow-lg p-6 w-full max-w-xs transform group-hover:scale-105 transition-transform">
              <div class="h-3 bg-emerald-300 rounded-full mb-3 w-3/4"></div>
              <div class="h-2 bg-emerald-100 rounded-full mb-2"></div>
              <div class="h-2 bg-emerald-100 rounded-full mb-4 w-5/6"></div>
              <div class="h-8 bg-emerald-500 rounded-full"></div>
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2">Nature Organic</h3>
            <p class="text-sm text-gray-600">Soft, rounded edges with earthy tones for a warm, welcoming feel.</p>
            <div class="mt-4 flex items-center text-emerald-600 font-medium text-sm">
              <span>Select Theme</span>
              <i class="fa fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
            </div>
          </div>
        </div>

        <!-- Theme Card 4: Tech Dark -->
        <div
          @click="selectTheme('tech-dark')"
          class="theme-card group cursor-pointer bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:scale-105"
        >
          <div class="aspect-video bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-8 flex items-center justify-center relative">
            <div class="absolute inset-0 opacity-10">
              <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
              <div class="absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
            </div>
            <div class="relative bg-slate-800 rounded-lg shadow-2xl p-6 w-full max-w-xs border border-slate-700 transform group-hover:scale-105 transition-transform">
              <div class="h-3 bg-blue-500 rounded mb-3 w-3/4"></div>
              <div class="h-2 bg-slate-700 rounded mb-2"></div>
              <div class="h-2 bg-slate-700 rounded mb-4 w-5/6"></div>
              <div class="h-8 bg-blue-600 rounded"></div>
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2">Tech Dark</h3>
            <p class="text-sm text-gray-600">Sleek dark mode with neon accents for a modern, tech-forward aesthetic.</p>
            <div class="mt-4 flex items-center text-blue-600 font-medium text-sm">
              <span>Select Theme</span>
              <i class="fa fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
            </div>
          </div>
        </div>

        <!-- Theme Card 5: Corporate Professional -->
        <div
          @click="selectTheme('corporate-professional')"
          class="theme-card group cursor-pointer bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-indigo-500 transition-all duration-300 hover:shadow-2xl hover:scale-105"
        >
          <div class="aspect-video bg-gradient-to-br from-indigo-100 to-blue-100 p-8 flex items-center justify-center relative">
            <div class="absolute top-0 left-0 right-0 h-12 bg-indigo-600 opacity-80"></div>
            <div class="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-xs transform group-hover:scale-105 transition-transform">
              <div class="h-3 bg-indigo-600 rounded mb-3 w-3/4"></div>
              <div class="h-2 bg-gray-200 rounded mb-2"></div>
              <div class="h-2 bg-gray-200 rounded mb-4 w-5/6"></div>
              <div class="h-8 bg-indigo-600 rounded"></div>
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2">Corporate Professional</h3>
            <p class="text-sm text-gray-600">Traditional business style with structured layouts and formal colors.</p>
            <div class="mt-4 flex items-center text-indigo-600 font-medium text-sm">
              <span>Select Theme</span>
              <i class="fa fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
            </div>
          </div>
        </div>

        <!-- Customize Manually Card -->
        <div
          @click="customizeManually"
          class="theme-card group cursor-pointer bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border-2 border-gray-700 hover:border-green-500 transition-all duration-300 hover:shadow-2xl hover:scale-105 relative"
        >
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(16,185,129,0.1),transparent)]"></div>
          <div class="aspect-video flex items-center justify-center p-8 relative">
            <div class="text-center">
              <div class="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center transform group-hover:rotate-12 transition-transform">
                <i class="fa fa-palette text-white text-3xl"></i>
              </div>
              <div class="text-white/80 text-sm font-medium">Full Creative Control</div>
            </div>
          </div>
          <div class="p-6 relative">
            <h3 class="text-xl font-bold text-white mb-2">Customize Manually</h3>
            <p class="text-sm text-gray-400">Design your form from scratch with complete control over every element.</p>
            <div class="mt-4 flex items-center text-green-400 font-medium text-sm">
              <span>Start Customizing</span>
              <i class="fa fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useDataStore } from "../store/data";

const dataStore = useDataStore();

function goBack() {
  dataStore.goTo('home');
}

  // Watch for theme changes
function selectTheme(themeName) {
  dataStore.selectedTheme = themeName;
  dataStore.editorMode = "view";
  
  // ⭐ CRITICAL: Initialize header styles immediately when theme is selected
  if (themeName !== 'custom') {
    dataStore.initializeHeaderStylesFromTheme(themeName);
  }
  
  dataStore.goTo("editor");
}
function customizeManually() {
  dataStore.selectedTheme = "custom";
  dataStore.editorMode = "customize"; // 👈 important
  dataStore.goTo("editor");
}

</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

.theme-card {
  animation: fade-in 0.6s ease-out;
  animation-fill-mode: both;
}

.theme-card:nth-child(1) { animation-delay: 0.1s; }
.theme-card:nth-child(2) { animation-delay: 0.2s; }
.theme-card:nth-child(3) { animation-delay: 0.3s; }
.theme-card:nth-child(4) { animation-delay: 0.4s; }
.theme-card:nth-child(5) { animation-delay: 0.5s; }
.theme-card:nth-child(6) { animation-delay: 0.6s; }
</style>