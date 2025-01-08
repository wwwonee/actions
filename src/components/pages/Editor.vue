<template>
  <div class="editor">
    <div class="editor-left">左侧物料区</div>
    <div class="editor-top">菜单栏</div>
    <div class="editor-right">属性控制区</div>
    <div class="editor-container">
      <div class="editor-container-canvas">
        <div
          class="editor-container-canvas-content"
          :style="{ width: `${width}`, height: `${height}` }"
        >
          <div v-for="(item, index) in data" :key="index">
            <EditorBlock :item="item"></EditorBlock>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import './editor.scss';
import EditorBlock from './Editor-block.vue';

interface ContainerData {
  width: number;
  height: number;
}

interface Props {
  data: {
    container: ContainerData;
  };
}

const props = defineProps<Props>();

// 使用 Vue 的响应式引用来存储数据
const width = ref(props.data.container.width);
const height = ref(props.data.container.height);

console.log(props.data);
</script>

<style scoped></style>
