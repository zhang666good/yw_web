/**
 * 动画工具函数
 * 基于 GSAP 的全局动画统一管理
 */

import gsap from 'gsap'

/**
 * 淡入动画
 */
export function fadeIn(el, duration = 0.6, delay = 0) {
  return gsap.fromTo(el,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration, delay, ease: 'power2.out' }
  )
}

/**
 * 淡出动画
 */
export function fadeOut(el, duration = 0.3) {
  return gsap.to(el, {
    opacity: 0,
    y: -20,
    duration,
    ease: 'power2.in'
  })
}

/**
 * 缩放弹入动画
 */
export function scaleIn(el, duration = 0.8, delay = 0) {
  return gsap.fromTo(el,
    { scale: 0.8, opacity: 0 },
    { scale: 1, opacity: 1, duration, delay, ease: 'back.out(1.7)' }
  )
}

/**
 * 呼吸缩放效果（无限循环）
 */
export function breathing(el, duration = 2) {
  return gsap.to(el, {
    scale: 1.03,
    duration,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut'
  })
}

/**
 * 进度条动画
 */
export function animateProgress(el, targetWidth, duration = 0.5) {
  return gsap.to(el, {
    width: `${targetWidth}%`,
    duration,
    ease: 'power2.out'
  })
}

/**
 * 文字渐入（逐字效果）
 */
export function textReveal(el, duration = 1.5) {
  return gsap.fromTo(el,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration, ease: 'power3.out' }
  )
}

/**
 * 入场序列动画（多个元素依次进入）
 */
export function staggerIn(elements, staggerDelay = 0.1, duration = 0.6) {
  return gsap.fromTo(elements,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger: staggerDelay,
      ease: 'power2.out'
    }
  )
}

/**
 * 粒子动画配置生成
 */
export function getParticleConfig() {
  return {
    particles: {
      number: { value: 60, density: { enable: true, value_area: 800 } },
      color: { value: ['#6c5ce7', '#a29bfe', '#fd79a8', '#00cec9'] },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#6c5ce7',
        opacity: 0.2,
        width: 1
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'grab' },
        resize: true
      },
      modes: {
        grab: { distance: 140, line_linked: { opacity: 0.3 } }
      }
    },
    retina_detect: true
  }
}

/**
 * 选项卡片点击反馈动画
 */
export function optionTap(el) {
  return gsap.timeline()
    .to(el, { scale: 0.95, duration: 0.1 })
    .to(el, { scale: 1, duration: 0.15, ease: 'back.out(2)' })
}

/**
 * 结果页面数字滚动动画
 */
export function countUp(el, target, duration = 1.5) {
  const obj = { val: 0 }
  return gsap.to(obj, {
    val: target,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      el.textContent = Math.round(obj.val)
    }
  })
}
