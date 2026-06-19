<template>
  <div class="progress-bar-wrapper">
    <div class="progress-info">
      <span class="progress-label">{{ label }}</span>
      <span class="progress-text">{{ current }} / {{ total }}</span>
    </div>
    <div class="progress-track">
      <div
        class="progress-fill"
        ref="fillRef"
        :style="{ width: `${percent}%` }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { animateProgress } from '@/utils/animate.js'

const props = defineProps({
  current: { type: Number, default: 0 },
  total: { type: Number, default: 20 },
  label: { type: String, default: '答题进度' }
})

const fillRef = ref(null)

const percent = computed(() => {
  return Math.round((props.current / props.total) * 100)
})

watch(percent, (newVal) => {
  if (fillRef.value) {
    animateProgress(fillRef.value, newVal)
  }
})
</script>

<style scoped>
.progress-bar-wrapper {
  width: 100%;
  padding: 0 var(--safe-margin-lg);
}
.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.progress-label {
  font-size: var(--font-size-small);
  color: var(--text-tertiary);
}
.progress-text {
  font-size: var(--font-size-small);
  background: linear-gradient(90deg, var(--color-primary-start), var(--color-highlight));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 500;
}
.progress-track {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 2px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary-start), var(--color-primary-end));
  border-radius: 2px;
  width: 0;
}
</style>
