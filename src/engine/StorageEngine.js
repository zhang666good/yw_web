/**
 * 存储引擎 - 本地缓存读写、进度持久化
 */

const STORAGE_KEYS = {
  ANSWERS: 'dde_answers',
  CURRENT_INDEX: 'dde_current_index',
  RESULT: 'dde_result',
  COMPLETED: 'dde_completed'
}

export const StorageEngine = {
  /**
   * 保存用户作答数据
   */
  saveAnswers(answers) {
    try {
      localStorage.setItem(STORAGE_KEYS.ANSWERS, JSON.stringify(answers))
    } catch (e) {
      console.warn('保存答案失败:', e)
    }
  },

  /**
   * 读取用户作答数据
   */
  loadAnswers() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ANSWERS)
      return data ? JSON.parse(data) : []
    } catch (e) {
      console.warn('读取答案失败:', e)
      return []
    }
  },

  /**
   * 保存当前题目索引
   */
  saveCurrentIndex(index) {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_INDEX, String(index))
    } catch (e) {
      console.warn('保存进度失败:', e)
    }
  },

  /**
   * 读取当前题目索引
   */
  loadCurrentIndex() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CURRENT_INDEX)
      return data ? parseInt(data, 10) : 0
    } catch (e) {
      console.warn('读取进度失败:', e)
      return 0
    }
  },

  /**
   * 保存最终结果
   */
  saveResult(result) {
    try {
      localStorage.setItem(STORAGE_KEYS.RESULT, JSON.stringify(result))
      localStorage.setItem(STORAGE_KEYS.COMPLETED, 'true')
    } catch (e) {
      console.warn('保存结果失败:', e)
    }
  },

  /**
   * 读取最终结果
   */
  loadResult() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RESULT)
      return data ? JSON.parse(data) : null
    } catch (e) {
      console.warn('读取结果失败:', e)
      return null
    }
  },

  /**
   * 检查是否已完成测试
   */
  isCompleted() {
    return localStorage.getItem(STORAGE_KEYS.COMPLETED) === 'true'
  },

  /**
   * 清空所有缓存（开始新测试时调用）
   */
  clearAll() {
    Object.values(STORAGE_KEYS).forEach(key => {
      try {
        localStorage.removeItem(key)
      } catch (e) {
        console.warn('清除缓存失败:', e)
      }
    })
  },

  /**
   * 保存分享/下载记录
   */
  saveEvent(eventName) {
    try {
      const key = `dde_event_${eventName}`
      const count = parseInt(localStorage.getItem(key) || '0', 10)
      localStorage.setItem(key, String(count + 1))
    } catch (e) {
      console.warn('保存事件失败:', e)
    }
  }
}
