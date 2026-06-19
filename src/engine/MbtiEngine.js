/**
 * MBTI 智能映射引擎
 * 将六维欲望分数映射到 MBTI 人格类型
 */

/**
 * 映射规则：
 * - Knowledge 求知欲 → N/S 维度：高分=N 直觉，低分=S 实感
 * - Control 掌控欲 → T/F 维度：高分=T 理性，低分=F 感性
 * - Achievement 成就欲 → J/P 维度：高分=J 判断，低分=P 感知
 * - Freedom 自由欲 → 辅助修正 J/P
 * - Love 爱欲 → 辅助修正 T/F
 * - Pleasure 享乐欲 → 辅助修正 N/S
 */

export function calculateMBTI(desireScores) {
  const { Love, Control, Achievement, Freedom, Pleasure, Knowledge } = desireScores

  // 主维度判定 (使用阈值50)
  const N = Knowledge >= 50 // N: 直觉 > 50, S: 实感 < 50
  const T = Control >= 50   // T: 理性 > 50, F: 感性 < 50
  const J = Achievement >= 50 // J: 判断 > 50, P: 感知 < 50

  // 辅助修正
  // Freedom 辅助修正 J/P: 高自由欲向P偏移
  const jpCorrection = Freedom >= 60 ? -1 : (Freedom <= 30 ? 1 : 0)
  // Love 辅助修正 T/F: 高爱欲向F偏移
  const tfCorrection = Love >= 60 ? -1 : (Love <= 30 ? 1 : 0)
  // Pleasure 辅助修正 N/S: 高享乐欲向S偏移(降低N)
  const nsCorrection = Pleasure >= 60 ? -1 : (Pleasure <= 30 ? 1 : 0)

  // 应用辅助修正
  const finalN = applyCorrection(N, nsCorrection)
  const finalT = applyCorrection(T, tfCorrection)
  const finalJ = applyCorrection(J, jpCorrection)

  // 构建MBTI代码
  const code = `${finalN ? 'N' : 'S'}${finalT ? 'T' : 'F'}${finalJ ? 'J' : 'P'}`

  return {
    code,
    first: finalN ? 'N' : 'S',
    second: finalT ? 'T' : 'F',
    third: finalJ ? 'J' : 'P',
    detail: getMBTIDetail(code)
  }
}

function applyCorrection(main, correction) {
  if (correction === 0) return main
  // correction > 0 加强原判定, < 0 削弱/反向
  if (correction > 0) return main
  return !main // 修正方向为负时翻转
}

/**
 * MBTI 人格描述
 */
function getMBTIDetail(code) {
  const details = {
    'INTJ': { name: '建筑师', desc: '独立、理性、有远见的战略家，永远在思考如何让世界变得更好。' },
    'INTP': { name: '逻辑学家', desc: '充满好奇心的思考者，痴迷于解构一切事物的底层逻辑。' },
    'ENTJ': { name: '指挥官', desc: '天生的领导者，果断、高效、善于将愿景变为现实。' },
    'ENTP': { name: '辩论家', desc: '思维敏捷的挑战者，享受智力交锋和打破常规的快感。' },
    'INFJ': { name: '提倡者', desc: '安静而深刻的思想家，对自己坚信的事业充满使命感。' },
    'INFP': { name: '调停者', desc: '内心充满理想主义的诗人，温柔地守护着自己相信的美好。' },
    'ENFJ': { name: '主人公', desc: '魅力四射的引领者，善于感染和激励身边的人共同成长。' },
    'ENFP': { name: '竞选者', desc: '热情洋溢的探索者，用无限的好奇心点亮周围的人。' },
    'ISTJ': { name: '物流师', desc: '可靠务实的守护者，用责任感和执行力维护着世界的秩序。' },
    'ISFJ': { name: '守卫者', desc: '温柔而坚定的守护者，用默默的付出温暖着身边的人。' },
    'ESTJ': { name: '总经理', desc: '雷厉风行的管理者，用高效的执行力推动一切向前发展。' },
    'ESFJ': { name: '执政官', desc: '热情周到的社交者，用真诚的关怀维系着社群的和谐。' },
    'ISTP': { name: '鉴赏家', desc: '冷静机敏的实践者，用灵巧的双手和敏锐的洞察力解决问题。' },
    'ISFP': { name: '探险家', desc: '安静敏感的艺术家，用独特的审美感知着世界的美好。' },
    'ESTP': { name: '企业家', desc: '精力充沛的行动派，在冒险和挑战中寻找生命的激情。' },
    'ESFP': { name: '表演者', desc: '活力四射的表演者，用快乐和热情感染着身边的每一个人。' }
  }
  return details[code] || { name: '探索者', desc: '独特的个体，无法被简单定义。' }
}
