<script setup lang="ts">
const props = defineProps<{
  isInspecting: boolean;
}>();

const highlightRef = ref<HTMLElement>();

const handleMouseMove = (e: MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();

  const target = e.target as HTMLElement;
  const { top, left, width, height } = target.getBoundingClientRect();
  console.log(top, left, width, height);
  if (highlightRef.value) {
    highlightRef.value.style.transform = `translate(${left}px, ${top}px)`;
    highlightRef.value.style.width = `${width}px`;
    highlightRef.value.style.height = `${height}px`;
  }
};

watch(
  () => props.isInspecting,
  value => {
    if (value) {
      window.addEventListener('mousemove', handleMouseMove, true);
    } else {
      window.removeEventListener('mousemove', handleMouseMove, true);
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
  @apply fixed top-0 left-0 z-[2147483647] pointer-events-none transition-all duration-150 ease-linear;

  background: var(--lc-inspector-fill);
  border: 1px solid var(--lc-inspector-main);
  border-radius: 4px;
  box-shadow:
    0 0 0 1px var(--lc-inspector-main),
    0 0 3px var(--lc-inspector-glow);
}
</style>
