<template>
  <div class="particle-bg" ref="particleContainer">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)
const particleContainer = ref(null)
let animationId = null

onMounted(() => { initParticles() })
onUnmounted(() => { if (animationId) cancelAnimationFrame(animationId) })

function initParticles() {
  const cvs = canvas.value
  const container = particleContainer.value
  if (!cvs || !container) return

  const ctx = cvs.getContext('2d')
  let particles = []
  // 六维主题色 + 主色
  const colors = ['#7b61ff', '#f87ad8', '#ff6b6b', '#ffd064', '#4cd1e0', '#ff9ecd', '#a8b8d8', '#63e4ff']

  function resize() {
    cvs.width = container.offsetWidth
    cvs.height = container.offsetHeight
  }
  resize()
  window.addEventListener('resize', resize)

  const particleCount = 45

  class Particle {
    constructor() {
      this.reset()
    }
    reset() {
      this.x = Math.random() * cvs.width
      this.y = Math.random() * cvs.height
      this.size = Math.random() * 2.5 + 0.8
      this.speedX = (Math.random() - 0.5) * 0.5
      this.speedY = (Math.random() - 0.5) * 0.5
      this.color = colors[Math.floor(Math.random() * colors.length)]
      this.opacity = Math.random() * 0.35 + 0.1
    }
    update() {
      this.x += this.speedX
      this.y += this.speedY
      if (this.x < 0 || this.x > cvs.width) this.speedX *= -1
      if (this.y < 0 || this.y > cvs.height) this.speedY *= -1
    }
    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fillStyle = this.color
      ctx.globalAlpha = this.opacity
      ctx.fill()
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle())
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 150) {
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = '#7b61ff'
          ctx.globalAlpha = 0.06 * (1 - distance / 150)
          ctx.stroke()
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, cvs.width, cvs.height)
    particles.forEach(p => { p.update(); p.draw() })
    connectParticles()
    animationId = requestAnimationFrame(animate)
  }

  animate()
}
</script>

<style scoped>
.particle-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}
canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
