<template>
  <div class="home-screen">
    <ParticleBg />
    <div class="home-content" ref="contentRef">
      <div class="home-icon" ref="iconRef">◇</div>
      <h1 class="home-title" ref="titleRef">欲望检测器 Pro</h1>
      <p class="home-slogan" ref="sloganRef">探索你内心深处的底层欲望</p>
      <p class="home-desc" ref="descRef">20道选择题 · 测出你的欲望人格 · 解锁专属报告</p>
      <button class="start-btn" ref="btnRef" @click="startTest">
        <span class="btn-text">开始欲望检测</span>
        <span class="btn-arrow">→</span>
      </button>
      <div class="home-features" ref="featuresRef">
        <span class="feature-tag">六维人格</span>
        <span class="feature-tag">暗黑类型</span>
        <span class="feature-tag">MBTI映射</span>
        <span class="feature-tag">文艺报告</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from '../router.js'
import { useUserStore } from '@/store/user.js'
import { StorageEngine } from '@/engine/StorageEngine.js'
import ParticleBg from '@/components/ParticleBg.vue'
import gsap from 'gsap'

const router = useRouter()
const store = useUserStore()

const iconRef = ref(null)
const titleRef = ref(null)
const sloganRef = ref(null)
const descRef = ref(null)
const btnRef = ref(null)
const featuresRef = ref(null)

onMounted(() => {
  const tl = gsap.timeline()
  tl.fromTo(iconRef.value, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' })
    .fromTo(titleRef.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
    .fromTo(sloganRef.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
    .fromTo(descRef.value, { opacity: 0, y: 20 }, { opacity: 0.6, y: 0, duration: 0.4 }, '-=0.2')
    .fromTo(btnRef.value, { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }, '-=0.1')
    .fromTo(featuresRef.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.1')
})

function startTest() {
  StorageEngine.clearAll()
  store.restartTest()
  store.trackEvent('start_test')
  router.push('question')
}
</script>

<style scoped>
.home-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--bg-page);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.home-content {
  text-align: center;
  position: relative;
  z-index: 1;
  padding: 0 var(--safe-margin-lg);
  max-width: 400px;
}
.home-icon {
  font-size: 56px;
  background: linear-gradient(135deg, var(--color-primary-start), var(--color-love-start));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 16px;
  text-shadow: 0 0 60px var(--color-primary-glow);
}
.home-title {
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(135deg, var(--color-primary-start), var(--color-love-start));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 12px;
  letter-spacing: var(--letter-spacing-title);
}
.home-slogan {
  font-size: var(--font-size-body);
  color: var(--text-secondary);
  margin-bottom: 8px;
  letter-spacing: 1px;
}
.home-desc {
  font-size: var(--font-size-small);
  color: var(--text-muted);
  margin-bottom: 40px;
}
.start-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 85%;
  height: 52px;
  background: linear-gradient(135deg, var(--color-primary-start), var(--color-primary-end));
  border: none;
  border-radius: var(--radius-lg);
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  letter-spacing: 1px;
  transition: transform var(--duration-fast) var(--ease-smooth),
              box-shadow var(--duration-fast) var(--ease-smooth);
  box-shadow: 0 8px 32px var(--color-primary-glow);
}
.start-btn:active {
  transform: scale(0.95);
}
.start-btn:hover {
  box-shadow: 0 12px 40px var(--color-primary-glow);
}
.btn-arrow {
  font-size: 20px;
  transition: transform var(--duration-fast);
}
.start-btn:hover .btn-arrow {
  transform: translateX(4px);
}
.home-features {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 40px;
  flex-wrap: wrap;
}
.feature-tag {
  padding: 6px 16px;
  background: var(--bg-card);
  backdrop-filter: blur(var(--bg-blur));
  -webkit-backdrop-filter: blur(var(--bg-blur));
  border: 1px solid rgba(123, 97, 255, 0.25);
  border-radius: var(--radius-xl);
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  letter-spacing: 0.5px;
}
</style>
