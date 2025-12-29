<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <!-- Header -->
    <header
      class="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 flex-shrink-0 z-20"
    >
      <div class="flex items-center gap-4">
        <button
          @click="goBackToEditor"
          class="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition group"
        >
          <i class="fa fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
          <span class="font-medium">Back to Editor</span>
        </button>

        <div class="h-8 w-px bg-gray-300"></div>

        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
            <i class="fa fa-check text-white text-xs"></i>
          </div>
          <span class="font-semibold text-gray-900">Form Ready</span>
        </div>
      </div>
    </header>

    <!-- Main -->
    <div class="flex-1 px-6 py-8 min-h-0">
      <div class="max-w-7xl mx-auto h-full flex flex-col">
        <!-- Success -->
        <div class="text-center mb-6">
          <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
            <i class="fa fa-check text-green-600 text-3xl"></i>
          </div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            Your Zoho Webform is ready
          </h1>
          <p class="text-gray-600 text-lg">
            Paste this code into your website or landing page.
          </p>

          <!-- 🔹 Mobile Buttons (ONLY on mobile) -->
          <div class="mt-5 flex flex-col gap-3 md:hidden">
            <button
              @click="saveToCRM"
              class="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-medium flex items-center justify-center gap-2"
            >
              <i class="fa fa-cloud-upload-alt"></i>
              Save to CRM
            </button>

            <button
              @click="downloadHTML"
              class="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium flex items-center justify-center gap-2"
            >
              <i class="fa fa-download"></i>
              Download HTML
            </button>

            <button
              @click="copyCode"
              class="w-full px-4 py-3 bg-green-600 text-white rounded-lg font-medium flex items-center justify-center gap-2"
            >
              <i class="fa fa-clipboard"></i>
              {{ copied ? 'Copied!' : 'Copy Code' }}
            </button>
          </div>
        </div>

        <!-- Content -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-0">
          <!-- Code Editor -->
          <div
            class="md:col-span-2 bg-white rounded-2xl shadow-xl border-2 border-gray-200 overflow-hidden flex flex-col min-h-0"
          >
            <!-- Toolbar (Desktop ONLY) -->
            <div
              class="border-b border-gray-200 bg-gray-50 px-6 py-4 hidden md:flex items-center justify-between flex-shrink-0"
            >
              <span class="px-4 py-2 rounded-lg font-medium bg-white text-gray-900 shadow-sm">
                HTML + CSS
              </span>

              <div class="flex items-center gap-3">
                <button
                  @click="saveToCRM"
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center gap-2"
                >
                  <i class="fa fa-cloud-upload-alt"></i>
                  Save to CRM
                </button>

                <button
                  @click="downloadHTML"
                  class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition flex items-center gap-2"
                >
                  <i class="fa fa-download"></i>
                  Download HTML
                </button>

                <button
                  @click="copyCode"
                  class="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition flex items-center gap-2"
                >
                  <i class="fa fa-clipboard"></i>
                  {{ copied ? 'Copied!' : 'Copy Code' }}
                </button>
              </div>
            </div>

            <!-- Code Area -->
            <div class="relative flex-1 min-h-0">
                <div class="relative top-3 bg-black w-full flex justify-between p-4">
              <div class="bg-black text-xs text-gray-500 font-mono z-10">
                index.html
              </div>
              <div class="bg-black flex gap-2 z-10">
                <span class="w-3 h-3 rounded-full bg-gray-400"></span>
                <span class="w-3 h-3 rounded-full bg-gray-400"></span>
              </div>

                </div>

            <pre class="bg-gray-900 text-gray-100 p-6 pt-12 overflow-x-auto text-sm font-mono leading-relaxed max-h-96"><code>{{ displayCode }}</code></pre>
            </div>
          </div>

          <!-- Right Panel -->
          <div class="space-y-6">
            <!-- Integration Steps -->
            <div class="bg-white rounded-xl shadow-md p-6">
              <h2 class="text-lg font-bold text-gray-900 mb-4">
                Integration Steps
              </h2>

              <div class="space-y-4">
                <div class="flex gap-4">
                  <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-sm">1</div>
                  <div>
                    <h3 class="font-semibold text-gray-900">Copy the code</h3>
                    <p class="text-sm text-gray-600">Use the copy button or download the file.</p>
                  </div>
                </div>

                <div class="flex gap-4">
                  <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-sm">2</div>
                  <div>
                    <h3 class="font-semibold text-gray-900">Embed in your site</h3>
                    <p class="text-sm text-gray-600">
                      Paste inside the <code class="bg-gray-100 px-1 rounded text-xs">&lt;body&gt;</code> tag.
                    </p>
                  </div>
                </div>

                <div class="flex gap-4">
                  <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-sm">3</div>
                  <div>
                    <h3 class="font-semibold text-gray-900">Test the form</h3>
                    <p class="text-sm text-gray-600">Submit a test lead to ensure data flows to CRM.</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Important Notes -->
            <div class="bg-white rounded-xl shadow-md p-6">
              <h2 class="text-lg font-bold text-gray-900 mb-4">
                Important Notes
              </h2>

              <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div class="flex gap-3">
                  <i class="fa fa-exclamation-triangle text-yellow-600 mt-0.5"></i>
                  <div>
                    <h3 class="font-semibold text-gray-900">Do not modify input names:</h3>
                    <p class="text-sm text-gray-700 mt-1">
                      The <code class="bg-yellow-100 px-1 rounded text-xs">name</code> attributes connect your form fields to Zoho CRM.
                    </p>
                  </div>
                </div>
              </div>

              <p class="text-sm text-gray-600 mt-4">
                Need help?
                <a href="https://help.zoho.com/portal/en/kb/crm/connect-with-customers/webforms/articles/web-forms-introduction" target="_blank" class="text-green-600 hover:text-green-700 font-medium ml-1">
                  Read Zoho CRM Webform Form guide
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref, computed } from 'vue';
import { useDataStore } from '../store/data';

const store = useDataStore();
const copied = ref(false);

const displayCode = computed(() => {
  return store.finalHTML || '';
});

function copyCode() {
  navigator.clipboard.writeText(displayCode.value);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}

function downloadHTML() {
  const blob = new Blob([displayCode.value], { type: 'text/html' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `zoho-form-${store.selectedTheme || 'custom'}.html`;
  a.click();
}

function saveToCRM() {
  // Placeholder for Save to CRM functionality
  alert('Save to CRM functionality - to be implemented with Zoho API');
}

function goBackToEditor() {
  store.goTo('editor');
}
</script>

<style scoped>
code {
  font-family: 'Courier New', Courier, monospace;
}

pre {
  scrollbar-width: thin;
  scrollbar-color: #4b5563 #1f2937;
}

pre::-webkit-scrollbar {
  height: 8px;
}

pre::-webkit-scrollbar-track {
  background: #1f2937;
}

pre::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 4px;
}

pre::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>