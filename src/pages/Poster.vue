<template>
  <div class="poster-screen" v-if="result">
    <div class="poster-preview">
      <div class="poster-card" ref="posterRef">
        <!-- 星尘装饰 -->
        <div class="poster-stars">
          <span class="star" v-for="n in 30" :key="n" :style="getStarStyle(n)"></span>
        </div>

        <!-- 标题区 -->
        <div class="poster-header">
          <div class="poster-badge">{{ result.darkType.type }}</div>
          <h2 class="poster-title">{{ result.report.shortQuote }}</h2>
          <div class="poster-mbti">
            <span class="poster-mbti-code">{{ result.mbti.code }}</span>
            <span class="poster-mbti-dash">—</span>
            <span class="poster-mbti-name">{{ result.mbti.detail.name }}</span>
          </div>
        </div>

        <!-- 雷达图 -->
        <div class="poster-radar">
          <RadarChart :scores="result.desire.normalized" />
        </div>

        <!-- 维度分数 -->
        <div class="poster-scores">
          <div
            v-for="(val, key) in result.desire.normalized"
            :key="key"
            class="poster-score-item"
          >
            <span class="poster-score-label">{{ dimNameMap[key] }}</span>
            <div class="poster-score-track">
              <div class="poster-score-fill" :class="`fill-${key}`" :style="{ width: `${val}%` }"></div>
            </div>
            <span class="poster-score-value">{{ val }}</span>
          </div>
        </div>

        <!-- 底部 -->
        <div class="poster-footer">
          <p class="poster-quote">{{ result.report.shortQuote }}</p>
          <p class="poster-brand">欲望检测器 Pro</p>
          <div class="poster-qr-placeholder">
            <span class="qr-icon">◈</span>
            <span class="qr-text">扫码测你的欲望人格</span>
          </div>
        </div>
      </div>
    </div>

    <div class="poster-actions">
      <button class="action-btn primary-btn" @click="downloadPoster" :disabled="isGenerating">
        <span class="action-icon" v-if="!isGenerating">⬇</span>
        <span class="loading-spinner" v-else></span>
        {{ isGenerating ? '生成中...' : '保存到相册' }}
      </button>
      <button class="action-btn secondary-btn" @click="sharePoster">
        <span class="action-icon">📤</span>
        分享海报
      </button>
      <button class="action-btn ghost-btn" @click="goBack">← 返回</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRouter } from '../router.js'
import { useUserStore } from '@/store/user.js'
import { PosterGenerator } from '@/engine/PosterGenerator.js'
import RadarChart from '@/components/RadarChart.vue'
import gsap from 'gsap'

const router = useRouter()
const store = useUserStore()

const result = computed(() => store.result)
const posterRef = ref(null)

const dimNameMap = {
  Love: '爱欲', Control: '掌控欲', Achievement: '成就欲',
  Freedom: '自由欲', Pleasure: '享乐欲', Knowledge: '求知欲'
}

// 预生成30个星尘样式
const starStyleList = Array.from({ length: 30 }, () => ({
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  width: `${Math.random() * 3 + 1}px`,
  height: `${Math.random() * 3 + 1}px`,
  animationDelay: `${Math.random() * 3}s`,
  opacity: Math.random() * 0.5 + 0.1
}))
function getStarStyle(index) {
  return starStyleList[index % 30]
}

const isGenerating = ref(false)

onMounted(() => {
  if (!result.value) { router.push('home'); return }
  nextTick(() => {
    gsap.fromTo(posterRef.value,
      { scale: 0.92, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out' }
    )
  })
})

async function downloadPoster() {
  console.log('[Poster.vue] downloadPoster 被调用, isGenerating:', isGenerating.value, 'posterRef:', posterRef.value)
  if (isGenerating.value) {
    console.log('[Poster.vue] 正在生成中，跳过')
    return
  }
  if (!posterRef.value) {
    console.error('[Poster.vue] posterRef 为空!')
    alert('海报元素未找到，请刷新页面后重试')
    return
  }
  isGenerating.value = true
  try {
    const dataUrl = await PosterGenerator.generate(posterRef.value)
    console.log('[Poster.vue] 生成完成, dataUrl 前50字符:', dataUrl.substring(0, 50))
    PosterGenerator.download(dataUrl)
    store.trackEvent('download_poster')
  } catch (e) {
    console.error('[Poster.vue] 生成失败:', e)
    alert('海报生成失败: ' + (e?.message || '未知错误'))
  } finally {
    isGenerating.value = false
  }
}

async function sharePoster() {
  try {
    store.trackEvent('share_report')
    const dataUrl = await PosterGenerator.generate(posterRef.value)
    const shareData = await PosterGenerator.getShareData(dataUrl)
    if (shareData && navigator.share) {
      await navigator.share(shareData)
    } else {
      PosterGenerator.download(dataUrl)
    }
  } catch (e) { /* 取消分享 */ }
}

function goBack() { router.push('result') }
</script>

<style scoped>
.poster-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #08081a;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: var(--safe-margin-lg);
}
.poster-preview {
  display: flex;
  justify-content: center;
  padding: 16px 0;
  flex: 1;
}
.poster-card {
  width: 360px;
  min-height: 640px;
  max-width: 100%;
  background: linear-gradient(165deg, #0c0c24 0%, #14143a 30%, #0c0c24 60%, #14143a 100%);
  border-radius: 28px;
  padding: 36px 28px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  box-shadow: 0 24px 80px rgba(123, 97, 255, 0.15);
  border: 1px solid rgba(123, 97, 255, 0.12);
}
.poster-stars {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  pointer-events: none;
}
.star {
  position: absolute;
  border-radius: 50%;
  background: rgba(255,255,255,0.5);
  animation: twinkle 3s ease-in-out infinite;
}
@keyframes twinkle {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.8; }
}
.poster-header {
  text-align: center;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
}
.poster-badge {
  display: inline-block;
  padding: 5px 16px;
  background: var(--bg-card);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(123, 97, 255, 0.3);
  border-radius: var(--radius-xl);
  font-size: var(--font-size-xs);
  color: var(--color-primary-start);
  margin-bottom: 14px;
}
.poster-title {
  font-size: 26px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 10px;
  line-height: 1.3;
}
.poster-mbti {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
.poster-mbti-code {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-primary-start);
  letter-spacing: 3px;
}
.poster-mbti-dash { color: var(--text-muted); }
.poster-mbti-name {
  font-size: var(--font-size-small);
  color: var(--text-tertiary);
}
.poster-radar {
  margin: 10px 0 16px;
  position: relative;
  z-index: 1;
}
.poster-scores {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 16px 0;
  position: relative;
  z-index: 1;
}
.poster-score-item {
  display: flex;
  align-items: center;
  gap: 8px;
}
.poster-score-label {
  font-size: 11px;
  color: var(--text-tertiary);
  width: 36px;
  text-align: right;
  flex-shrink: 0;
}
.poster-score-track {
  flex: 1;
  height: 4px;
  background: rgba(255,255,255,0.04);
  border-radius: 2px;
  overflow: hidden;
}
.poster-score-fill {
  height: 100%;
  border-radius: 2px;
}
.fill-Love { background: linear-gradient(90deg, var(--color-love-start), var(--color-love-end)); }
.fill-Control { background: linear-gradient(90deg, var(--color-control-start), var(--color-control-end)); }
.fill-Achievement { background: linear-gradient(90deg, var(--color-achievement-start), var(--color-achievement-end)); }
.fill-Freedom { background: linear-gradient(90deg, var(--color-freedom-start), var(--color-freedom-end)); }
.fill-Pleasure { background: linear-gradient(90deg, var(--color-pleasure-start), var(--color-pleasure-end)); }
.fill-Knowledge { background: linear-gradient(90deg, var(--color-knowledge-start), var(--color-knowledge-end)); }
.poster-score-value {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-tertiary);
  width: 24px;
}
.poster-footer {
  text-align: center;
  margin-top: auto;
  padding-top: 20px;
  position: relative;
  z-index: 1;
}
.poster-quote {
  font-size: 14px;
  color: var(--text-muted);
  font-style: italic;
  margin-bottom: 8px;
}
.poster-brand {
  font-size: var(--font-size-xs);
  color: rgba(255,255,255,0.15);
  letter-spacing: 3px;
  margin-bottom: 14px;
}
.poster-qr-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255,255,255,0.02);
  border: 1px dashed rgba(255,255,255,0.08);
  border-radius: var(--radius-sm);
}
.qr-icon { color: var(--color-primary-start); font-size: 16px; }
.qr-text { font-size: 11px; color: rgba(255,255,255,0.2); }

.poster-actions {
  display: flex;
  gap: 10px;
  padding: 16px 0;
  padding-bottom: calc(16px + env(safe-area-inset-bottom, 0px));
  flex-shrink: 0;
}
.action-btn {
  flex: 1;
  padding: 14px 12px;
  border: none;
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-smooth);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 48px;
}
.action-icon { font-size: 16px; }
.primary-btn {
  background: linear-gradient(135deg, var(--color-primary-start), var(--color-primary-end));
  color: #fff;
  box-shadow: 0 6px 20px var(--color-primary-glow);
}
.primary-btn:active { transform: scale(0.97); }
.secondary-btn {
  background: var(--bg-card);
  backdrop-filter: blur(var(--bg-blur));
  -webkit-backdrop-filter: blur(var(--bg-blur));
  border: var(--border-card);
  color: var(--text-secondary);
}
.secondary-btn:active { background: var(--bg-card-hover); }
.ghost-btn {
  background: transparent;
  color: var(--text-tertiary);
  flex: 0.5;
}
.ghost-btn:hover { color: var(--text-secondary); }
.primary-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}
.loading-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
