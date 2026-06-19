/**
 * AI 文艺报告生成系统
 * 根据六维分数、暗黑人格、MBTI 生成文艺风格报告
 */

export function generateReport(result) {
  const { desire, mbti, darkType } = result
  const { normalized } = desire

  // 按分数排序维度
  const sorted = Object.entries(normalized)
    .map(([key, val]) => ({ key, val }))
    .sort((a, b) => b.val - a.val)

  const topDim = sorted[0]
  const secondDim = sorted[1] || { key: 'Love', val: 50 }
  const lowestDim = sorted[sorted.length - 1]

  // 生成专属标题
  const title = generateTitle(darkType.type, mbti.code)

  // 生成人格定位
  const positioning = generatePositioning(darkType, mbti)

  // 生成欲望解析
  const analysis = generateDesireAnalysis(sorted, normalized)

  // 生成性格优势
  const strengths = generateStrengths(sorted, darkType)

  // 生成成长建议
  const advice = generateAdvice(topDim, lowestDim, darkType)

  // 生成短句（用于海报）
  const shortQuote = generateShortQuote(darkType.type)

  // 组合完整报告
  const reportText = `${title}\n\n${positioning}\n\n${analysis}\n\n${strengths}\n\n${advice}`

  return {
    title,
    positioning,
    analysis,
    strengths,
    advice,
    shortQuote,
    reportText
  }
}

function generateTitle(darkType, mbtiCode) {
  const titles = {
    '情感依赖型人格': '你是我藏在心底的柔软',
    '强势掌控型人格': '这世界，由我定义规则',
    '野心征服型人格': '山巅之上，才是我的归处',
    '疏离逃逸型人格': '风不属于任何人',
    '极致感官型人格': '活在此刻，就是全部的意义',
    '冷静观察型人格': '看透一切，依然热爱',
    '平衡多面型人格': '每一个我，都是真实的我'
  }
  const baseTitle = titles[darkType] || '探索内心的宇宙'
  return `${baseTitle} —— ${mbtiCode} · ${darkType}`
}

function generatePositioning(darkType, mbti) {
  return `你是一个${darkType}，MBTI类型为 ${mbti.code}（${mbti.detail.name}）。${mbti.detail.desc}`
}

function generateDesireAnalysis(sorted, normalized) {
  let text = '【欲望解构图】\n'
  const dimNames = {
    Love: '爱欲', Control: '掌控欲', Achievement: '成就欲',
    Freedom: '自由欲', Pleasure: '享乐欲', Knowledge: '求知欲'
  }
  const dimDescs = {
    Love: '你对情感连接有着深层的渴望',
    Control: '你追求秩序和主导权',
    Achievement: '你有着强烈的目标和征服欲',
    Freedom: '你渴望不受束缚的自由',
    Pleasure: '你懂得享受当下的美好',
    Knowledge: '你有着敏锐的观察力和求知欲'
  }

  sorted.forEach((item, index) => {
    const level = item.val >= 80 ? '极强' : item.val >= 60 ? '较强' : item.val >= 40 ? '适中' : '较弱'
    text += `• ${dimNames[item.key]}（${item.val}分 | ${level}）：${dimDescs[item.key]}。\n`
  })

  return text
}

function generateStrengths(sorted, darkType) {
  const top2 = sorted.slice(0, 2).map(s => s.key)
  const strengthMap = {
    Love: '你拥有深刻共情的能力，能感知他人情绪，温暖而有力量。',
    Control: '你天生具备领导力和决断力，在混乱中也能找到方向。',
    Achievement: '你有着不达目的不罢休的韧劲，这种执着将带你走得很远。',
    Freedom: '你有不被定义的勇气，这种独特的思维方式是你的超能力。',
    Pleasure: '你懂得取悦自己，这种活在当下的能力让很多人羡慕。',
    Knowledge: '你的理性分析能力让你在任何领域都能快速抓住本质。'
  }

  let text = '【你的性格优势】\n'
  top2.forEach(key => {
    text += `• ${strengthMap[key] || ''}\n`
  })

  // 加一句针对暗黑人格的优势
  const darkStrengths = {
    '情感依赖型人格': '你的柔软是一种力量，它让你与这个世界产生了深刻的连接。',
    '强势掌控型人格': '你的掌控力让复杂的事情变得有序，这种能力值得敬畏。',
    '野心征服型人格': '你的野心是你前进的燃料，它让你不甘平庸、不断超越。',
    '疏离逃逸型人格': '你的独立性让你在人群中保持清醒，这是难得的自我觉知。',
    '极致感官型人格': '你对美好的感知力让生活变得鲜活而富有诗意。',
    '冷静观察型人格': '你的冷静和理性让你成为这个喧嚣世界中最清醒的人。',
    '平衡多面型人格': '你的平衡感让你在不同场合都能自如切换，这是高级的智慧。'
  }
  text += `• ${darkStrengths[darkType] || ''}`

  return text
}

function generateAdvice(topDim, lowestDim, darkType) {
  const adviceMap = {
    Love: '试着在爱别人之前，先好好爱自己。你的完整不需要别人来成全。',
    Control: '学会放手，人生中最好的事情往往发生在计划之外。',
    Achievement: '偶尔停下来，看看路上的风景。成功不是唯一的答案。',
    Freedom: '自由不是逃避，而是有能力选择自己想要的生活。',
    Pleasure: '享受当下很好，但也别忘了为未来的自己存一点美好。',
    Knowledge: '理性是你的铠甲，但别忘了，有些问题没有标准答案。'
  }

  let text = '【成长建议】\n'
  text += `• 给你的建议：${adviceMap[topDim.key] || '保持真实的自己，就是最好的状态。'}\n`
  text += `• 可以尝试：在「${getDimName(lowestDim.key)}」上给自己多一点空间，也许会发现新的自己。\n`
  text += `• 最后：人格不是标签，而是一面镜子。重要的不是你是什么类型，而是你如何成为更好的自己。`

  return text
}

function generateShortQuote(darkType) {
  const quotes = {
    '情感依赖型人格': '爱是唯一的答案。',
    '强势掌控型人格': '规则由我定义。',
    '野心征服型人格': '山巅相见。',
    '疏离逃逸型人格': '风不属于任何人。',
    '极致感官型人格': '此刻即永恒。',
    '冷静观察型人格': '看清，然后热爱。',
    '平衡多面型人格': '不被定义。'
  }
  return quotes[darkType] || '探索内心的宇宙'
}

function getDimName(key) {
  const map = {
    Love: '爱欲', Control: '掌控欲', Achievement: '成就欲',
    Freedom: '自由欲', Pleasure: '享乐欲', Knowledge: '求知欲'
  }
  return map[key] || key
}
