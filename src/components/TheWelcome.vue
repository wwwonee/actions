<template>
  <div class="app">
    <Editor :data="state"></Editor>
  </div>
</template>

<script lang="ts" setup>
import { provide, ref } from 'vue';
import data from './data.json';
import Editor from '@/components/pages/Editor.vue';
import { registerConfig as config } from '../utils/editor-config.jsx';
const state = ref(data);
console.log(config);
provide('config', config);
</script>

<style scoped>
.app {
  width: 100%;
  height: 100vh;
}
</style>
