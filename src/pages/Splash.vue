<template>
  <div class="splash-screen" ref="splashScreen">
    <ParticleBg />
    <div class="splash-content" ref="contentRef">
      <div class="brand-icon" ref="iconRef">✦</div>
      <h1 class="brand-title" ref="titleRef">欲望检测器 Pro</h1>
      <p class="brand-subtitle" ref="subtitleRef">Deep Desire Engine</p>
      <div class="loading-dots" ref="dotsRef">
        <span></span><span></span><span></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from '../router.js'
import ParticleBg from '@/components/ParticleBg.vue'
import gsap from 'gsap'

const router = useRouter()
const splashScreen = ref(null)
const contentRef = ref(null)
const iconRef = ref(null)
const titleRef = ref(null)
const subtitleRef = ref(null)
const dotsRef = ref(null)

onMounted(() => {
  const tl = gsap.timeline()

  tl.fromTo(iconRef.value,
    { scale: 0, rotation: -180, opacity: 0 },
    { scale: 1, rotation: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }
  )
  .fromTo(titleRef.value,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
    '-=0.3'
  )
  .fromTo(subtitleRef.value,
    { opacity: 0, y: 20 },
    { opacity: 0.6, y: 0, duration: 0.5, ease: 'power2.out' },
    '-=0.2'
  )
  .fromTo(dotsRef.value,
    { opacity: 0 },
    { opacity: 1, duration: 0.3 },
    '-=0.1'
  )

  // 1.5s 后跳转
  tl.to({}, { duration: 1.5 })
    .to(splashScreen.value, {
      opacity: 0,
      duration: 0.4,
      onComplete: () => {
        router.push('home')
      }
    })
})
</script>

<style scoped>
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--bg-page);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}
.splash-content {
  text-align: center;
  position: relative;
  z-index: 1;
  padding: 0 20px;
}
.brand-icon {
  font-size: 52px;
  color: var(--color-primary-start);
  margin-bottom: 20px;
  text-shadow: 0 0 60px var(--color-primary-glow);
}
.brand-title {
  font-size: var(--font-size-title);
  font-weight: 700;
  background: linear-gradient(135deg, var(--color-primary-start), var(--color-love-start));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 10px;
  letter-spacing: var(--letter-spacing-title);
}
.brand-subtitle {
  font-size: 14px;
  color: var(--text-muted);
  letter-spacing: 4px;
  text-transform: uppercase;
  margin-bottom: 40px;
}
.loading-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
}
.loading-dots span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-primary-start);
  animation: dotPulse 1.2s ease-in-out infinite;
}
.loading-dots span:nth-child(2) { animation-delay: 0.2s; }
.loading-dots span:nth-child(3) { animation-delay: 0.4s; }
@keyframes dotPulse {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
  40% { transform: scale(1); opacity: 1; }
}
</style>
