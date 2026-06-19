/**
 * 欲望计算引擎
 * 负责分数累加、标准化计算、六维结果输出
 */

const DIMENSIONS = ['Love', 'Control', 'Achievement', 'Freedom', 'Pleasure', 'Knowledge']
const DIMENSION_NAMES = {
  Love: '爱欲',
  Control: '掌控欲',
  Achievement: '成就欲',
  Freedom: '自由欲',
  Pleasure: '享乐欲',
  Knowledge: '求知欲'
}

/**
 * 计算六维欲望得分
 * @param {Array} answers - 用户答案数组 [{ qId, optionIndex }]
 * @param {Array} questions - 题库
 * @returns {Object} 各维度原始分和标准化百分比
 */
export function calculateDesire(answers, questions) {
  // 初始化各维度原始分数
  const rawScores = {}
  DIMENSIONS.forEach(d => { rawScores[d] = 0 })

  // 累加每题选项得分
  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.qId)
    if (!question) return
    const option = question.options[answer.optionIndex]
    if (!option) return

    DIMENSIONS.forEach(d => {
      rawScores[d] += (option.scoreMap[d] || 0)
    })
  })

  // 计算各维度满分
  const maxScores = {}
  DIMENSIONS.forEach(d => {
    maxScores[d] = 0
    questions.forEach(q => {
      let dimMax = 0
      q.options.forEach(opt => {
        dimMax = Math.max(dimMax, opt.scoreMap[d] || 0)
      })
      maxScores[d] += dimMax
    })
  })

  // 标准化为百分比 0-100
  const normalized = {}
  DIMENSIONS.forEach(d => {
    normalized[d] = maxScores[d] > 0
      ? Math.round((rawScores[d] / maxScores[d]) * 100)
      : 0
  })

  return {
    rawScores,
    maxScores,
    normalized,
    DIMENSIONS,
    DIMENSION_NAMES
  }
}

/**
 * 判定暗黑人格类型
 * @param {Object} desireScores - 标准化后的六维分数
 * @returns {Object} 暗黑人格类型及描述
 */
export function determineDarkType(desireScores) {
  const threshold = 80
  const sorted = DIMENSIONS
    .map(d => ({ dimension: d, score: desireScores[d] || 0 }))
    .sort((a, b) => b.score - a.score)

  const top = sorted[0]

  // 最高维度得分超过阈值才判定
  if (top.score >= threshold) {
    const darkTypes = {
      Love: {
        type: '情感依赖型人格',
        desc: '你的内心住着一个渴望被爱填满的灵魂，情感是你与世界连接的方式。你害怕孤独，需要持续的情感反馈来确认自己的价值。这种依赖不是软弱，而是你深层次对亲密关系的本能渴望。'
      },
      Control: {
        type: '强势掌控型人格',
        desc: '你体内住着一个天生的掌控者，秩序和主导权是你安全感的来源。你不喜欢失控的感觉，在任何局面下都想握住方向盘。这种掌控欲是你的铠甲，也是你驱动世界的原力。'
      },
      Achievement: {
        type: '野心征服型人格',
        desc: '你的血液里流淌着征服的基因，成就感是你最强烈的精神燃料。你无法接受平庸，目标感和胜负欲驱动着你不断攀登。这种野心是你与世界较量的方式。'
      },
      Freedom: {
        type: '疏离逃逸型人格',
        desc: '你的灵魂是一只永远不想被关进笼子的鸟。任何形式的束缚都会让你本能地想要挣脱。你渴望绝对的自由，讨厌被定义、被期待、被规则限制。这种逃逸倾向是你保护自我边界的方式。'
      },
      Pleasure: {
        type: '极致感官型人格',
        desc: '你是一个活在当下的享乐主义者，追求即时的愉悦和感官的满足是你的人生信条。你懂得如何取悦自己，不愿意为了遥远的未来牺牲此刻的快乐。这种享乐主义是你对抗生命虚无的方式。'
      },
      Knowledge: {
        type: '冷静观察型人格',
        desc: '你像一台永远在运转的思考机器，习惯用理性和观察来解构这个世界。情感波动很难影响你的判断，你更相信数据和逻辑。这种冷静是你保护自己不被世界伤害的盔甲。'
      }
    }
    return darkTypes[top.dimension]
  }

  // 无特别突出的维度
  return {
    type: '平衡多面型人格',
    desc: '你是一个复杂而平衡的灵魂，没有某一种欲望完全主导你。你根据情境灵活切换自己的状态，既能在人群中温暖陪伴，也能在独处时理性思考。你的多面性是你的最大魅力所在。'
  }
}

/**
 * 获取维度中文名
 */
export function getDimensionName(key) {
  return DIMENSION_NAMES[key] || key
}

export { DIMENSIONS, DIMENSION_NAMES }
