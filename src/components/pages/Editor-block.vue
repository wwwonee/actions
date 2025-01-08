<template>
  <div class="editor">
    <div class="editor-block" :style="blockStyle">
      <component :is="RenderComponent" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, inject } from 'vue';

// 定义 props 的类型
interface BlockItem {
  top: number;
  left: number;
  zIndex: number;
  key: string;
}

const props = defineProps<{ item: BlockItem }>();

// 注入配置对象
const config = inject<Record<string, any>>('config');
if (!config) {
  throw new Error('Config is not provided');
}

// 计算样式对象
const blockStyle = computed(() => ({
  top: `${props.item.top}px`,
  left: `${props.item.left}px`,
  zIndex: props.item.zIndex,
}));

// 计算当前渲染的组件
const RenderComponent = computed(() => {
  const componentKey = props.item.key;
  return config?.[componentKey]?.component || null;
});
</script>

<style scoped>
.editor-block {
  position: absolute;
}
</style>
