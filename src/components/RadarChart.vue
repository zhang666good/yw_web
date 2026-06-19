<template>
  <div class="radar-chart-wrapper">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import {
  Chart,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js'

Chart.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const props = defineProps({
  scores: {
    type: Object,
    required: true
  },
  labels: {
    type: Array,
    default: () => ['爱欲', '掌控欲', '成就欲', '自由欲', '享乐欲', '求知欲']
  }
})

// 六维专属色
const dimColors = {
  Love: { bg: 'rgba(248, 122, 216, 0.2)', border: '#f87ad8', point: '#b066ff' },
  Control: { bg: 'rgba(255, 107, 107, 0.2)', border: '#ff6b6b', point: '#ff9557' },
  Achievement: { bg: 'rgba(255, 208, 100, 0.2)', border: '#ffd064', point: '#ff9f43' },
  Freedom: { bg: 'rgba(76, 209, 224, 0.2)', border: '#4cd1e0', point: '#36bffb' },
  Pleasure: { bg: 'rgba(255, 158, 205, 0.2)', border: '#ff9ecd', point: '#ff7eb9' },
  Knowledge: { bg: 'rgba(168, 184, 216, 0.2)', border: '#a8b8d8', point: '#829fff' }
}

// 六维渐变混合填充 (用于雷达图区域)
function getMixedFill(ctx) {
  const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 120)
  gradient.addColorStop(0, 'rgba(123, 97, 255, 0.25)')
  gradient.addColorStop(0.3, 'rgba(248, 122, 216, 0.15)')
  gradient.addColorStop(0.6, 'rgba(76, 209, 224, 0.10)')
  gradient.addColorStop(1, 'rgba(168, 184, 216, 0.05)')
  return gradient
}

const chartCanvas = ref(null)
let chartInstance = null

onMounted(() => {
  initChart()
})

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy()
    chartInstance = null
  }
})

watch(() => props.scores, () => {
  if (chartInstance) {
    const data = getDataValues()
    chartInstance.data.datasets[0].data = data
    chartInstance.update()
  }
}, { deep: true })

function getDataValues() {
  return [
    props.scores.Love || 0,
    props.scores.Control || 0,
    props.scores.Achievement || 0,
    props.scores.Freedom || 0,
    props.scores.Pleasure || 0,
    props.scores.Knowledge || 0
  ]
}

function initChart() {
  if (!chartCanvas.value) return

  const ctx = chartCanvas.value.getContext('2d')

  chartInstance = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: props.labels,
      datasets: [{
        data: getDataValues(),
        backgroundColor: getMixedFill(ctx),
        borderColor: '#7b61ff',
        borderWidth: 2,
        pointBackgroundColor: [
          dimColors.Love.border,
          dimColors.Control.border,
          dimColors.Achievement.border,
          dimColors.Freedom.border,
          dimColors.Pleasure.border,
          dimColors.Knowledge.border
        ],
        pointBorderColor: '#0a0a18',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      animation: {
        duration: 2500,
        easing: 'easeOutQuart'
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(25, 25, 50, 0.9)',
          titleColor: '#fff',
          bodyColor: '#c8c8e0',
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            label: (ctx) => `${ctx.label}: ${ctx.parsed.r}分`
          }
        }
      },
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 20,
            color: 'rgba(255,255,255,0.25)',
            backdropColor: 'transparent',
            font: { size: 10 }
          },
          grid: {
            color: 'rgba(255,255,255,0.06)'
          },
          angleLines: {
            color: 'rgba(255,255,255,0.08)'
          },
          pointLabels: {
            color: '#c8c8e0',
            font: {
              size: 12,
              family: "'PingFang SC', 'Microsoft YaHei', sans-serif"
            }
          }
        }
      }
    }
  })
}
</script>

<style scoped>
.radar-chart-wrapper {
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
}
canvas {
  width: 100% !important;
  height: auto !important;
}
</style>
