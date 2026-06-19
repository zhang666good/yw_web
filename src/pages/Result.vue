<template>
  <div class="result-screen" v-if="result">
    <div class="result-bg-particles">
      <ParticleBg />
    </div>

    <div class="result-container">
      <!-- 顶部返回 -->
      <div class="result-header">
        <button class="result-back-btn" @click="goHome">← 重新测试</button>
      </div>

      <div class="result-scroll">
        <!-- 人格标题区 -->
        <div class="result-hero" ref="heroRef">
          <div class="dark-type-badge" :class="`badge-${topDimKey}`">{{ result.darkType.type }}</div>
          <h1 class="result-title">{{ result.report.title }}</h1>
          <div class="mbti-badge glass-card">
            <span class="mbti-code">{{ result.mbti.code }}</span>
            <span class="mbti-dash">—</span>
            <span class="mbti-name">{{ result.mbti.detail.name }}</span>
          </div>
        </div>

        <!-- 雷达图 -->
        <div class="radar-section" ref="radarRef">
          <h3 class="section-title">六维欲望图谱</h3>
          <RadarChart :scores="result.desire.normalized" />
          <div class="dimension-scores">
            <div
              v-for="(val, key) in result.desire.normalized"
              :key="key"
              class="dimension-item"
            >
              <span class="dim-label">{{ getDimName(key) }}</span>
              <div class="dim-bar-track">
                <div
                  class="dim-bar-fill"
                  :class="`dim-bar-${key}`"
                  :style="{ width: `${val}%` }"
                ></div>
              </div>
              <span class="dim-value">{{ val }}</span>
            </div>
          </div>
        </div>

        <!-- 报告内容 -->
        <div class="report-section" ref="reportRef">
          <h3 class="section-title">你的人格解读</h3>
          <div class="report-card glass-card">
            <div class="report-paragraph">
              <h4 class="para-title">📍 人格定位</h4>
              <p>{{ result.report.positioning }}</p>
            </div>
            <div class="report-paragraph">
              <h4 class="para-title">📊 欲望解构图</h4>
              <p v-for="(line, i) in analysisLines" :key="i" style="margin-bottom: 4px">{{ line }}</p>
            </div>
            <div class="report-paragraph">
              <h4 class="para-title">⭐ 你的性格优势</h4>
              <p v-for="(line, i) in strengthsLines" :key="i" style="margin-bottom: 4px">{{ line }}</p>
            </div>
            <div class="report-paragraph">
              <h4 class="para-title">💡 成长建议</h4>
              <p v-for="(line, i) in adviceLines" :key="i" style="margin-bottom: 4px">{{ line }}</p>
            </div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="result-actions" ref="actionsRef">
          <button class="action-btn primary-btn" @click="goToPoster">
            <span class="action-icon">🖼️</span>
            生成专属海报
          </button>
          <button class="action-btn secondary-btn" @click="shareResult">
            <span class="action-icon">📤</span>
            分享报告
          </button>
        </div>

        <div class="bottom-spacer"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, nextTick } from 'vue'
import { useRouter } from '../router.js'
import { useUserStore } from '@/store/user.js'
import ParticleBg from '@/components/ParticleBg.vue'
import RadarChart from '@/components/RadarChart.vue'
import { staggerIn } from '@/utils/animate.js'

const router = useRouter()
const store = useUserStore()

const result = computed(() => store.result)
const heroRef = ref(null)
const radarRef = ref(null)
const reportRef = ref(null)
const actionsRef = ref(null)

const dimNameMap = {
  Love: '爱欲', Control: '掌控欲', Achievement: '成就欲',
  Freedom: '自由欲', Pleasure: '享乐欲', Knowledge: '求知欲'
}

onMounted(() => {
  if (!result.value) {
    router.push('home')
    return
  }
  nextTick(() => {
    const els = [heroRef.value, radarRef.value, reportRef.value, actionsRef.value].filter(Boolean)
    if (els.length) staggerIn(els, 0.15, 0.6)
  })
})

// 最高维度key
const topDimKey = computed(() => {
  if (!result.value?.desire?.normalized) return 'Love'
  const sorted = Object.entries(result.value.desire.normalized).sort((a, b) => b[1] - a[1])
  return sorted[0][0].toLowerCase()
})

const analysisLines = computed(() => {
  if (!result.value?.report?.analysis) return []
  return result.value.report.analysis.split('\n').filter(l => l.trim())
})

const strengthsLines = computed(() => {
  if (!result.value?.report?.strengths) return []
  return result.value.report.strengths.split('\n').filter(l => l.trim())
})

const adviceLines = computed(() => {
  if (!result.value?.report?.advice) return []
  return result.value.report.advice.split('\n').filter(l => l.trim())
})

function getDimName(key) { return dimNameMap[key] || key }

function goHome() {
  store.restartTest()
  router.push('home')
}

function goToPoster() {
  store.trackEvent('share_report')
  router.push('poster')
}

async function shareResult() {
  store.trackEvent('share_report')
  try {
    if (navigator.share) {
      await navigator.share({
        title: '欲望检测报告',
        text: `我测出了${result.value.darkType.type}！快来测测你的底层欲望人格`,
        url: window.location.href
      })
    } else {
      await navigator.clipboard.writeText(window.location.href)
    }
  } catch (e) { /* 用户取消分享 */ }
}
</script>

<style scoped>
.result-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--bg-page-vertical);
  overflow: hidden;
}
.result-bg-particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}
.result-container {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.result-header {
  padding: 12px var(--safe-margin);
  padding-top: calc(12px + env(safe-area-inset-top, 0px));
  flex-shrink: 0;
}
.result-back-btn {
  background: var(--bg-card);
  backdrop-filter: blur(var(--bg-blur));
  -webkit-backdrop-filter: blur(var(--bg-blur));
  border: var(--border-card);
  color: var(--text-tertiary);
  padding: 8px 18px;
  border-radius: var(--radius-xl);
  font-size: var(--font-size-small);
  cursor: pointer;
  transition: all var(--duration-fast);
}
.result-back-btn:hover {
  color: var(--text-secondary);
  border-color: rgba(255,255,255,0.15);
}
.result-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 0 var(--safe-margin-lg) 20px;
  -webkit-overflow-scrolling: touch;
}
.result-hero {
  text-align: center;
  padding: 24px 0 16px;
}
.dark-type-badge {
  display: inline-block;
  padding: 6px 20px;
  background: var(--bg-card);
  backdrop-filter: blur(var(--bg-blur));
  -webkit-backdrop-filter: blur(var(--bg-blur));
  border: 1px solid rgba(123, 97, 255, 0.35);
  border-radius: var(--radius-xl);
  font-size: 14px;
  color: var(--color-primary-start);
  margin-bottom: 16px;
}
.result-title {
  font-size: var(--font-size-title);
  font-weight: 700;
  line-height: 1.4;
  color: var(--text-primary);
  margin-bottom: 14px;
  padding: 0 var(--safe-margin);
}
.mbti-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: var(--radius-md);
  padding: 10px 20px;
}
.mbti-code {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-primary-start);
  letter-spacing: 2px;
}
.mbti-dash { color: var(--text-muted); }
.mbti-name {
  font-size: 14px;
  color: var(--text-tertiary);
}
.section-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 16px;
  text-align: center;
}
.radar-section {
  padding: 24px 0 16px;
}
.dimension-scores {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 var(--safe-margin);
}
.dimension-item {
  display: flex;
  align-items: center;
  gap: 10px;
}
.dim-label {
  font-size: var(--font-size-small);
  color: var(--text-tertiary);
  width: 50px;
  text-align: right;
  flex-shrink: 0;
}
.dim-bar-track {
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 3px;
  overflow: hidden;
}
.dim-bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 1s var(--ease-smooth);
}
.dim-value {
  font-size: var(--font-size-small);
  font-weight: 600;
  color: var(--text-tertiary);
  width: 30px;
  text-align: left;
}
.report-section {
  padding: 20px 0 0;
}
.report-card {
  border-radius: var(--radius-lg);
  padding: 24px;
}
.report-paragraph {
  margin-bottom: 22px;
}
.report-paragraph:last-child { margin-bottom: 0; }
.para-title {
  font-size: var(--font-size-option);
  font-weight: 600;
  color: var(--color-primary-start);
  margin-bottom: 8px;
}
.report-paragraph p {
  font-size: var(--font-size-body);
  line-height: var(--line-height-body);
  color: var(--text-secondary);
}
.result-actions {
  display: flex;
  gap: 12px;
  padding: 24px 0 16px;
}
.action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 20px;
  border: none;
  border-radius: var(--radius-md);
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-smooth);
  min-height: 50px;
}
.primary-btn {
  background: linear-gradient(135deg, var(--color-primary-start), var(--color-primary-end));
  color: #fff;
  box-shadow: 0 6px 20px var(--color-primary-glow);
}
.primary-btn:active { transform: scale(0.97); }
.primary-btn:hover { box-shadow: 0 8px 28px var(--color-primary-glow); }
.secondary-btn {
  background: var(--bg-card);
  backdrop-filter: blur(var(--bg-blur));
  -webkit-backdrop-filter: blur(var(--bg-blur));
  border: var(--border-card);
  color: var(--text-secondary);
}
.secondary-btn:active { background: var(--bg-card-hover); }
.action-icon { font-size: 18px; }
.bottom-spacer { height: 30px; }
</style>
