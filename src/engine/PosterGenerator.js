/**
 * 海报生成引擎
 * 使用 html2canvas 将海报DOM转为图片
 * 核心难点：Chart.js 动态 canvas 需要先转为静态图片
 */

import html2canvas from 'html2canvas'

export const PosterGenerator = {
  /**
   * 生成海报图片
   */
  async generate(element) {
    if (!element) {
      console.error('[Poster] 元素为空')
      throw new Error('海报元素不存在')
    }

    console.log('[Poster] 开始生成海报, element:', element)

    // 步骤1: 将内部 Chart.js canvas 转为静态图片
    await this._replaceCanvasesWithImages(element)

    // 步骤2: 用 html2canvas 截图
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        allowTaint: true,
        useCORS: true,
        backgroundColor: '#0c0c24',
        logging: true,
        width: element.scrollWidth,
        height: element.scrollHeight
      })
      console.log('[Poster] html2canvas 生成成功')

      const dataUrl = canvas.toDataURL('image/png')
      // 恢复 canvas（将静态图片换回雷达图的容器，让页面恢复正常）
      this._restoreCanvases(element)
      return dataUrl
    } catch (e) {
      console.error('[Poster] html2canvas 失败:', e)
      this._restoreCanvases(element)
      throw e
    }
  },

  /**
   * 将元素内所有 canvas 替换为对应的静态 image
   */
  async _replaceCanvasesWithImages(element) {
    const canvases = element.querySelectorAll('canvas')
    console.log('[Poster] 找到 canvas 数量:', canvases.length)

    for (const c of canvases) {
      try {
        const dataUrl = c.toDataURL('image/png')
        const img = new Image()
        img.src = dataUrl
        img.style.cssText = c.style.cssText
        img.style.width = c.offsetWidth + 'px'
        img.style.height = c.offsetHeight + 'px'
        // 标记以便恢复
        img.setAttribute('data-poster-replace', c.offsetWidth + '|' + c.offsetHeight)
        if (c.parentNode) {
          c.parentNode.replaceChild(img, c)
          console.log('[Poster] canvas 已替换为静态图片')
        }
      } catch (e) {
        console.warn('[Poster] canvas toDataURL 失败:', e)
        // 无法转换的 canvas（如被跨域污损），隐藏它
        c.style.visibility = 'hidden'
      }
    }
  },

  /**
   * 恢复被替换的 canvas（用简单的占位方式）
   */
  _restoreCanvases(element) {
    const imgs = element.querySelectorAll('[data-poster-replace]')
    imgs.forEach(img => {
      const div = document.createElement('div')
      div.style.cssText = img.style.cssText
      div.style.background = '#0c0c24'
      if (img.parentNode) {
        img.parentNode.replaceChild(div, img)
      }
    })
  },

  /**
   * 下载海报
   */
  download(dataUrl, filename = '欲望检测报告.png') {
    console.log('[Poster] 开始下载, dataUrl 长度:', dataUrl.length)
    try {
      // 方式1: Blob + URL
      const arr = dataUrl.split(',')
      const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png'
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      const blob = new Blob([u8arr], { type: mime })
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.download = filename
      link.href = url
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      console.log('[Poster] 下载触发成功')
    } catch (e) {
      console.error('[Poster] 下载失败:', e)
      // 降级：直接 data URL
      const link = document.createElement('a')
      link.download = filename
      link.href = dataUrl
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  },

  /**
   * 获取分享数据
   */
  async getShareData(dataUrl) {
    try {
      const arr = dataUrl.split(',')
      const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png'
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) { u8arr[n] = bstr.charCodeAt(n) }
      const blob = new Blob([u8arr], { type: mime })
      const file = new File([blob], '欲望检测报告.png', { type: mime })
      return { files: [file], title: '欲望检测报告', text: '来测测你的欲望人格！' }
    } catch (e) {
      console.warn('[Poster] 分享数据获取失败:', e)
      return null
    }
  }
}
