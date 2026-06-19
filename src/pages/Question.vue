<template>
  <div class="question-screen">
    <ParticleBg />
    <div class="question-container">
      <!-- 顶部进度条 -->
      <ProgressBar
        :current="answeredCount"
        :total="20"
        label="欲望检测"
      />

      <!-- 题目区域 -->
      <div class="question-body" ref="bodyRef">
        <div class="question-number">{{ currentIndex + 1 }} / 20</div>

        <transition name="slide-fade" mode="out-in">
          <h2 class="question-title" :key="currentIndex">{{ question.title }}</h2>
        </transition>

        <div class="options-list">
          <transition-group name="list-fade" tag="div" class="options-grid">
            <div
              v-for="(option, idx) in question.options"
              :key="`${currentIndex}-${idx}`"
              class="option-card glass-card"
              :class="{ selected: selectedIndex === idx }"
              @click="selectOption(idx)"
            >
              <div class="option-indicator">{{ ['A', 'B', 'C', 'D'][idx] }}</div>
              <div class="option-text">{{ option.text }}</div>
              <div class="option-check" v-if="selectedIndex === idx">✓</div>
            </div>
          </transition-group>
        </div>
      </div>

      <!-- 底部操作栏 -->
      <div class="question-footer">
        <button
          class="footer-btn prev-btn"
          :class="{ visible: !isFirst }"
          @click="goPrev"
        >
          ← 上一题
        </button>
        <button
          class="footer-btn next-btn"
          :disabled="selectedIndex < 0"
          @click="goNext"
        >
          {{ isLast ? '完成检测' : '下一题 →' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRouter } from '../router.js'
import { useUserStore } from '@/store/user.js'
import { questions } from '@/engine/questions.js'
import ParticleBg from '@/components/ParticleBg.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import gsap from 'gsap'

const router = useRouter()
const store = useUserStore()

const bodyRef = ref(null)

const currentIndex = computed(() => store.currentIndex)
const question = computed(() => questions[currentIndex.value])
const selectedIndex = computed(() => store.currentAnswer)
const isFirst = computed(() => store.isFirstQuestion)
const isLast = computed(() => store.isLastQuestion)
const answeredCount = computed(() => store.answers.length)

onMounted(() => {
  if (!question.value) {
    router.push('home')
    return
  }
  if (store.isCompleted) {
    router.push('result')
    return
  }
  nextTick(() => {
    if (bodyRef.value) {
      gsap.fromTo(bodyRef.value,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      )
    }
  })
})

function selectOption(index) {
  store.selectAnswer(index)
  store.trackEvent('answer_question')
}

function goPrev() {
  if (!isFirst.value) {
    store.prevQuestion()
    animateTransition()
  }
}

function goNext() {
  if (selectedIndex.value < 0) return
  if (isLast.value) {
    store.submitTest()
    store.trackEvent('finish_test')
    router.push('result')
  } else {
    store.nextQuestion()
    animateTransition()
  }
}

function animateTransition() {
  if (bodyRef.value) {
    gsap.fromTo(bodyRef.value,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' }
    )
  }
}
</script>

<style scoped>
.question-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--bg-page-vertical);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.question-container {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: calc(20px + env(safe-area-inset-top, 0px));
}
.question-body {
  flex: 1;
  overflow-y: auto;
  padding: var(--safe-margin-lg);
  -webkit-overflow-scrolling: touch;
}
.question-number {
  font-size: var(--font-size-small);
  color: var(--text-muted);
  margin-bottom: 12px;
  font-weight: 500;
}
.question-title {
  font-size: var(--font-size-subtitle);
  line-height: 1.6;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 28px;
  letter-spacing: 0.5px;
}
.options-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.option-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-smooth);
  position: relative;
  min-height: 56px;
}
.option-card:hover {
  background: var(--bg-card-hover);
  border-color: rgba(255, 255, 255, 0.15);
}
.option-card.selected {
  background: rgba(123, 97, 255, 0.12);
  border-color: var(--color-primary-start);
  box-shadow: 0 0 24px var(--color-primary-glow);
}
.option-indicator {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-small);
  font-weight: 600;
  background: rgba(255, 255, 255, 0.06);
  color: var(--text-tertiary);
  flex-shrink: 0;
  transition: all var(--duration-fast) var(--ease-smooth);
}
.option-card.selected .option-indicator {
  background: var(--color-primary-start);
  color: #fff;
}
.option-text {
  font-size: var(--font-size-option);
  color: var(--text-secondary);
  line-height: 1.4;
  flex: 1;
}
.option-card.selected .option-text {
  color: var(--text-primary);
}
.option-check {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--color-primary-start);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  flex-shrink: 0;
}
.question-footer {
  display: flex;
  justify-content: space-between;
  padding: 16px var(--safe-margin-lg);
  padding-bottom: calc(16px + env(safe-area-inset-bottom, 0px));
  gap: 12px;
  border-top: var(--border-card);
}
.footer-btn {
  padding: 14px 28px;
  border: none;
  border-radius: var(--radius-md);
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-smooth);
  min-height: 48px;
}
.prev-btn {
  background: rgba(255, 255, 255, 0.06);
  color: var(--text-tertiary);
  visibility: hidden;
  opacity: 0;
}
.prev-btn.visible {
  visibility: visible;
  opacity: 1;
}
.prev-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-secondary);
}
.next-btn {
  flex: 1;
  background: linear-gradient(135deg, var(--color-primary-start), var(--color-primary-end));
  color: #fff;
  font-weight: 600;
  max-width: 200px;
  margin-left: auto;
  box-shadow: 0 6px 20px var(--color-primary-glow);
}
.next-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
  box-shadow: none;
}
.next-btn:not(:disabled):active {
  transform: scale(0.95);
}

/* 过渡动画 */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.25s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
.list-fade-enter-active {
  transition: all 0.3s ease;
}
.list-fade-leave-active {
  transition: all 0.2s ease;
}
.list-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.list-fade-leave-to {
  opacity: 0;
}
</style>
