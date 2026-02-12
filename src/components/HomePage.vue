<template>
<div class="flex min-h-screen flex-col bg-white font-sans lg:flex-row">
  <div class="flex flex-col bg-white lg:w-[45%]">
    <div class="px-8 pb-6 pt-12 md:px-8 lg:px-8">
      <div class="flex items-center gap-2 border-b pb-4">
        <img src="../assets/image.png" height="100px" />
      </div>
    </div>

    <div class="flex flex-col px-8 py-4 md:px-8 lg:px-8">
      <div class="max-w-xl">
        <h1 class="mb-6 text-2xl font-bold text-gray-900 lg:text-2xl">Give your webform your brand's look</h1>
        <p class="mb-10 text-sm leading-relaxed text-gray-500">With Formz Studio, you can transform standard Zoho webforms into on-brand, professional forms using a powerful visual editor without modifying the underlying logic.</p>

        <div class="group relative mb-12 flex aspect-video cursor-pointer items-center justify-center rounded-sm bg-[#E5E7EB]">
          <div class="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-sm transition group-hover:scale-105">
            <svg class="ml-1 h-6 w-6 fill-current text-gray-400" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        <div class="mb-8 h-[1px] w-full bg-gray-100"></div>

        <div class="flex flex-col gap-4">
          <div class="flex items-start gap-3">
            <svg class="mt-1 h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke-width="2" />
              <path stroke-width="2" d="M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" />
            </svg>
            <div>
              <h3 class="font-bold text-gray-900">Having trouble ?</h3>
              <p class="text-sm text-gray-500">Feel free to contact us and we will guide you through the tool</p>
            </div>
          </div>
          <button class="w-fit rounded-md border border-gray-300 px-6 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50">Contact us</button>
        </div>
      </div>
    </div>
  </div>

  <div class="flex items-center justify-center bg-[#D1D5DB] p-4 lg:w-[55%] lg:p-8">
    <div class="flex w-full max-w-2xl flex-col gap-4">
      <div class="overflow-hidden rounded-2xl bg-white shadow-xl">
        <div class="flex items-center justify-between border-b border-gray-100 bg-white px-5 py-3">
          <div class="flex gap-2">
            <span class="h-3 w-3 rounded-full bg-[#FF5F57]"></span>
            <span class="h-3 w-3 rounded-full bg-[#FFBD2E]"></span>
            <span class="h-3 w-3 rounded-full bg-[#28CA42]"></span>
          </div>
          <a href="#" class="flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-500"> <span class="font-bold">?</span> help </a>
        </div>

        <div class="p-6">
          <textarea v-model="htmlInput" class="h-80 w-full resize-none border-none p-2 font-mono text-sm text-gray-400 placeholder-gray-400 focus:outline-none lg:h-[450px]" placeholder="<!--Paste your Zoho CRM Webform code here-->"></textarea>
        </div>
      </div>

      <button @click="goToThemes" :disabled="!htmlInput.trim()" class="flex w-full items-center justify-center gap-2 rounded-xl py-5 text-lg font-bold shadow-lg transition" :class="htmlInput.trim() ? 'bg-[#0070C1] text-white' : 'bg-[#0070C1] text-white opacity-90'">
        <svg class="h-5 w-5 rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
          <path d="M12 19l9 2-2-9-9-9-9 9 2 9 9-2zm0 0l-1-1" />
        </svg>
        Start Designing
      </button>

      <div class="flex items-start gap-3 rounded-lg border border-[#BFDBFE] bg-[#EBF5FF] p-4">
        <div class="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#0070C1] text-[10px] font-bold text-white">i</div>
        <p class="text-xs leading-snug text-[#1E40AF]">All code you paste is processed locally in your browser, we don't store your data or logic anywhere in the system.</p>
      </div>
    </div>
  </div>
</div>
</template>


<script setup>
import { ref } from 'vue'
import { useDataStore } from '../store/data'

const dataStore = useDataStore()
const htmlInput = ref(dataStore.rawHTML || '')

function goToThemes() {
  if (htmlInput.value.trim()) {
    dataStore.rawHTML = htmlInput.value
    dataStore.goTo('theme')
  }
}
</script>
