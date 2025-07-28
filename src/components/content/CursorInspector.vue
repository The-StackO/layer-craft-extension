<script setup lang="ts">
const props = defineProps<{
  isInspecting: boolean;
}>();

const emits = defineEmits<{
  (e: 'update:isInspecting', value: boolean): void;
  (e: 'select', value: HTMLElement): void;
}>();

const highlightRef = ref<HTMLElement>();
const isSelecting = ref(false);

const handleMouseMove = (e: MouseEvent) => {
  if (!isSelecting.value) {
    return;
  }

  e.preventDefault();
  e.stopPropagation();

  const target = e.target as HTMLElement;
  const { top, left, width, height } = target.getBoundingClientRect();
  if (highlightRef.value) {
    highlightRef.value.style.transform = `translate(${left}px, ${top}px)`;
    highlightRef.value.style.width = `${width}px`;
    highlightRef.value.style.height = `${height}px`;
  }
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

    window.removeEventListener('mousemove', handleMouseMove, true);
    window.removeEventListener('click', handleClick, true);

    emits('select', target);
  }
};

watch(
  () => props.isInspecting,
  value => {
    isSelecting.value = value;

    if (value) {
      window.addEventListener('mousemove', handleMouseMove, true);
      window.addEventListener('click', handleClick, true);
    } else {
      window.removeEventListener('mousemove', handleMouseMove, true);
      window.removeEventListener('click', handleClick, true);
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
  @apply fixed top-0 left-0 z-[2147483647] pointer-events-none rounded-xs transition-all duration-150 ease-linear;

  background: var(--lc-inspector-fill);
  box-shadow:
    0 0 0 1px var(--lc-inspector-main),
    0 0 3px var(--lc-inspector-glow);
}
</style>
