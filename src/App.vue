<script setup>
import HomePage from './components/HomePage.vue';
import ThemePage from './components/ThemePage.vue';
import EditorPage from './components/EditorPage.vue';
import {useDataStore} from './store/data.js';

const data = useDataStore();
</script>

<template>
  <HomePage v-if="data.currentPage === 'home'" />
  <ThemePage v-else-if="data.currentPage === 'theme'" />
  <EditorPage v-else-if="data.currentPage === 'editor'" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
