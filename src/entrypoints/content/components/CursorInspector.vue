<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  isInspecting: boolean;
}>();

const emits = defineEmits<{
  (e: 'update:isInspecting', value: boolean): void;
  (e: 'select', value: HTMLElement): void;
}>();

const highlightRef = ref<HTMLElement>();
const isSelecting = ref(false);
let lastTarget: HTMLElement | null = null;

const updateHighlightPosition = (target: HTMLElement) => {
  const { top, left, width, height } = target.getBoundingClientRect();
  if (highlightRef.value) {
    const scrollTop = window.scrollY;
    const scrollLeft = window.scrollX;
    highlightRef.value.style.transform = `translate(${left + scrollLeft}px, ${top + scrollTop}px)`;
    highlightRef.value.style.width = `${width}px`;
    highlightRef.value.style.height = `${height}px`;
  }
};

const resetHighlightPosition = () => {
  if (highlightRef.value) {
    highlightRef.value.style.transform = 'translate(0, 0)';
    highlightRef.value.style.width = '0';
    highlightRef.value.style.height = '0';
  }
};

const handleMouseMove = (e: MouseEvent) => {
  if (!isSelecting.value) {
    return;
  }

  e.preventDefault();
  e.stopPropagation();

  const target = e.target as HTMLElement;
  lastTarget = target;
  updateHighlightPosition(target);
};

const handleClick = (e: MouseEvent) => {
  if (!isSelecting.value) {
    return;
  }

  e.preventDefault();
  e.stopPropagation();

  const target = e.target as HTMLElement;
  if (target) {
    isSelecting.value = false;

    removeEventListeners();

    emits('select', target);
  }
};

const handleScroll = () => {
  if (!isSelecting.value || !lastTarget) {
    return;
  }
  updateHighlightPosition(lastTarget);
};

const addEventListeners = () => {
  window.addEventListener('mousemove', handleMouseMove, true);
  window.addEventListener('click', handleClick, true);
  window.addEventListener('scroll', handleScroll, true);
};

const removeEventListeners = () => {
  window.removeEventListener('mousemove', handleMouseMove, true);
  window.removeEventListener('click', handleClick, true);
  window.removeEventListener('scroll', handleScroll, true);
};

watch(
  () => props.isInspecting,
  value => {
    isSelecting.value = value;

    if (value) {
      addEventListeners();
    } else {
      removeEventListeners();
      lastTarget = null;
      resetHighlightPosition();
    }
  }
);
</script>

<template>
  <div class="layer-craft-inspector">
    <div ref="highlightRef" class="inspector__highlight" v-show="props.isInspecting"></div>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";

.inspector__highlight {
  @apply absolute top-0 left-0 z-[2147483646] pointer-events-none rounded-xs transition-all duration-150 ease-linear;

  background: var(--lc-inspector-fill);
  box-shadow:
    0 0 0 1px var(--lc-inspector-main),
    0 0 3px var(--lc-inspector-glow);
}
</style>
