import { defineStore } from 'pinia'
import { questions } from '@/engine/questions.js'
import { calculateDesire, determineDarkType } from '@/engine/DesireEngine.js'
import { calculateMBTI } from '@/engine/MbtiEngine.js'
import { generateReport } from '@/engine/ReportGenerator.js'
import { StorageEngine } from '@/engine/StorageEngine.js'

export const useUserStore = defineStore('user', {
  state: () => ({
    // 当前页面路由
    currentPage: 'splash',

    // 当前题目索引（0-19）
    currentIndex: 0,

    // 用户答案 [{ qId, optionIndex }]
    answers: [],

    // 是否已完成所有题目
    isCompleted: false,

    // 最终结果
    result: null,

    // 加载状态
    isLoading: true,

    // 是否正在过渡动画
    isTransitioning: false
  }),

  getters: {
    // 总题数
    totalQuestions: () => 20,

    // 当前题目数据
    currentQuestion: (state) => {
      return questions[state.currentIndex] || null
    },

    // 当前题目已选答案
    currentAnswer: (state) => {
      const q = questions[state.currentIndex]
      if (!q) return -1
      const answer = state.answers.find(a => a.qId === q.id)
      return answer ? answer.optionIndex : -1
    },

    // 进度百分比
    progressPercent: (state) => {
      return Math.round((state.answers.length / 20) * 100)
    },

    // 是否可以进入下一题
    canNext: (state) => {
      const q = questions[state.currentIndex]
      if (!q) return false
      return state.answers.some(a => a.qId === q.id)
    },

    // 是否在第一题
    isFirstQuestion: (state) => state.currentIndex === 0,

    // 是否是最后一题
    isLastQuestion: (state) => state.currentIndex === 19
  },

  actions: {
    /**
     * 初始化 - 恢复进度或开始新测试
     */
    init() {
      this.isLoading = true

      // 检查是否有已完成的测试结果
      if (StorageEngine.isCompleted()) {
        const savedResult = StorageEngine.loadResult()
        if (savedResult) {
          this.result = savedResult
          this.isCompleted = true
          this.currentPage = 'result'
          this.isLoading = false
          return
        }
      }

      // 恢复答题进度
      const savedAnswers = StorageEngine.loadAnswers()
      const savedIndex = StorageEngine.loadCurrentIndex()

      if (savedAnswers.length > 0) {
        this.answers = savedAnswers
        this.currentIndex = savedIndex
        // 跳转到答题页
        this.currentPage = savedIndex >= 20 ? 'result' : 'question'
      }

      this.isLoading = false
    },

    /**
     * 选择答案
     */
    selectAnswer(optionIndex) {
      const q = questions[this.currentIndex]
      if (!q) return

      const existing = this.answers.findIndex(a => a.qId === q.id)
      if (existing >= 0) {
        this.answers[existing].optionIndex = optionIndex
      } else {
        this.answers.push({ qId: q.id, optionIndex })
      }

      // 保存到本地存储
      StorageEngine.saveAnswers(this.answers)
      StorageEngine.saveCurrentIndex(this.currentIndex)
    },

    /**
     * 上一题
     */
    prevQuestion() {
      if (this.currentIndex > 0) {
        this.currentIndex--
        StorageEngine.saveCurrentIndex(this.currentIndex)
      }
    },

    /**
     * 下一题
     */
    nextQuestion() {
      if (this.currentIndex < 19) {
        this.currentIndex++
        StorageEngine.saveCurrentIndex(this.currentIndex)
      }
    },

    /**
     * 提交完成测试
     */
    submitTest() {
      // 计算六维欲望分数
      const desireResult = calculateDesire(this.answers, questions)
      const normalized = desireResult.normalized

      // 判定暗黑人格
      const darkType = determineDarkType(normalized)

      // 计算MBTI
      const mbti = calculateMBTI(normalized)

      // 构建结果对象
      this.result = {
        answers: [...this.answers],
        desire: desireResult,
        mbti,
        darkType
      }

      // 生成报告
      const report = generateReport(this.result)
      this.result.report = report

      this.isCompleted = true
      this.currentPage = 'result'

      // 保存到本地存储
      StorageEngine.saveResult(this.result)
    },

    /**
     * 重新开始测试
     */
    restartTest() {
      StorageEngine.clearAll()
      this.answers = []
      this.currentIndex = 0
      this.isCompleted = false
      this.result = null
      this.currentPage = 'home'
    },

    /**
     * 跳转到海报页
     */
    goToPoster() {
      this.currentPage = 'poster'
    },

    /**
     * 返回结果页
     */
    backToResult() {
      this.currentPage = 'result'
    },

    /**
     * 设置页面
     */
    setPage(page) {
      this.currentPage = page
    },

    /**
     * 记录埋点事件
     */
    trackEvent(eventName) {
      StorageEngine.saveEvent(eventName)
    }
  }
})
