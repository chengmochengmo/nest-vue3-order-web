<template>
  <div class="modal-popup">
    <a-modal
      ref="modalRef"
      v-model:visible="props.visible"
      :wrap-style="{ overflow: 'hidden' }"
      @ok="handleOk"
      @cancel="cancel"
      cancelText="再想想"
      okText="确定"
    >
      <slot name="content"></slot>
      <template #title>
        <div ref="modalTitleRef" style="width: 100%; cursor: move">
          {{ props.title }}
        </div>
      </template>
      <template #modalRender="{ originVNode }">
        <div :style="transformStyle">
          <component :is="originVNode" />
        </div>
      </template>
    </a-modal>
  </div>
</template>
<script setup lang="ts">
import {
  ref,
  computed,
  CSSProperties,
  watch,
  watchEffect,
  defineProps,
  defineEmits,
} from "vue";
import { useDraggable } from "@vueuse/core";

const props = defineProps({
  title: String,
  visible: Boolean,
});
const handleOkEmit = defineEmits(["close"]);

const modalTitleRef = ref<HTMLElement>(null);
const { x, y, isDragging } = useDraggable(modalTitleRef);
// 确定
const handleOk = (e: MouseEvent) => {
  handleOkEmit('close', true);
};
// 取消
const cancel = (e: MouseEvent) => {
  handleOkEmit('close', false);
};
const startX = ref<number>(0);
const startY = ref<number>(0);
const startedDrag = ref(false);
const transformX = ref(0);
const transformY = ref(0);
const preTransformX = ref(0);
const preTransformY = ref(0);
const dragRect = ref({ left: 0, right: 0, top: 0, bottom: 0 });
watch([x, y], () => {
  if (!startedDrag.value) {
    startX.value = x.value;
    startY.value = y.value;
    const bodyRect = document.body.getBoundingClientRect();
    const titleRect = modalTitleRef.value.getBoundingClientRect();
    dragRect.value.right = bodyRect.width - titleRect.width;
    dragRect.value.bottom = bodyRect.height - titleRect.height;
    preTransformX.value = transformX.value;
    preTransformY.value = transformY.value;
  }
  startedDrag.value = true;
});
watch(isDragging, () => {
  if (!isDragging) {
    startedDrag.value = false;
  }
});

watchEffect(() => {
  if (startedDrag.value) {
    transformX.value =
      preTransformX.value +
      Math.min(Math.max(dragRect.value.left, x.value), dragRect.value.right) -
      startX.value;
    transformY.value =
      preTransformY.value +
      Math.min(Math.max(dragRect.value.top, y.value), dragRect.value.bottom) -
      startY.value;
  }
});
const transformStyle = computed<CSSProperties>(() => {
  return {
    transform: `translate(${transformX.value}px, ${transformY.value}px)`,
  };
});
</script>