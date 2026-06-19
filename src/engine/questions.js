/**
 * 20道欲望检测题目
 * 每题4个选项，每个选项包含6维度的分值分布（总分10）
 */
export const questions = [
  {
    id: 1,
    title: '周末终于到来，你更倾向于怎么度过？',
    options: [
      { text: '约上好友一起聚会狂欢', scoreMap: { Love: 6, Control: 1, Achievement: 0, Freedom: 2, Pleasure: 1, Knowledge: 0 }, tag: '社交' },
      { text: '独自探索新的兴趣爱好', scoreMap: { Love: 0, Control: 1, Achievement: 2, Freedom: 3, Pleasure: 1, Knowledge: 3 }, tag: '探索' },
      { text: '制定计划并完成待办事项', scoreMap: { Love: 0, Control: 3, Achievement: 5, Freedom: 0, Pleasure: 0, Knowledge: 2 }, tag: '规划' },
      { text: '随心所欲，躺平放松', scoreMap: { Love: 1, Control: 0, Achievement: 0, Freedom: 3, Pleasure: 5, Knowledge: 1 }, tag: '随性' }
    ]
  },
  {
    id: 2,
    title: '面对一个棘手的挑战，你的第一反应是？',
    options: [
      { text: '找朋友一起商量对策', scoreMap: { Love: 5, Control: 1, Achievement: 1, Freedom: 0, Pleasure: 1, Knowledge: 2 }, tag: '求助' },
      { text: '分析利弊，制定详细策略', scoreMap: { Love: 0, Control: 2, Achievement: 2, Freedom: 0, Pleasure: 0, Knowledge: 6 }, tag: '分析' },
      { text: '直接迎难而上，证明自己', scoreMap: { Love: 0, Control: 2, Achievement: 6, Freedom: 1, Pleasure: 0, Knowledge: 1 }, tag: '挑战' },
      { text: '先放一放，等有感觉了再说', scoreMap: { Love: 1, Control: 0, Achievement: 0, Freedom: 4, Pleasure: 3, Knowledge: 2 }, tag: '拖延' }
    ]
  },
  {
    id: 3,
    title: '在团队合作中，你通常扮演什么角色？',
    options: [
      { text: '凝聚团队的调和者', scoreMap: { Love: 6, Control: 1, Achievement: 1, Freedom: 0, Pleasure: 1, Knowledge: 1 }, tag: '调和者' },
      { text: '发号施令的领导者', scoreMap: { Love: 0, Control: 6, Achievement: 3, Freedom: 0, Pleasure: 0, Knowledge: 1 }, tag: '领导者' },
      { text: '推动执行的实干家', scoreMap: { Love: 0, Control: 2, Achievement: 5, Freedom: 1, Pleasure: 0, Knowledge: 2 }, tag: '实干家' },
      { text: '自由贡献的独立人', scoreMap: { Love: 1, Control: 0, Achievement: 1, Freedom: 5, Pleasure: 2, Knowledge: 1 }, tag: '独立者' }
    ]
  },
  {
    id: 4,
    title: '你对"规则"这件事怎么看？',
    options: [
      { text: '规则让世界更温暖有序', scoreMap: { Love: 5, Control: 2, Achievement: 1, Freedom: 0, Pleasure: 1, Knowledge: 1 }, tag: '守序' },
      { text: '规则是用来掌控局面的工具', scoreMap: { Love: 0, Control: 6, Achievement: 2, Freedom: 0, Pleasure: 0, Knowledge: 2 }, tag: '掌控' },
      { text: '规则是成功的方法论', scoreMap: { Love: 0, Control: 2, Achievement: 5, Freedom: 1, Pleasure: 0, Knowledge: 2 }, tag: '功利' },
      { text: '规则就是用来打破的', scoreMap: { Love: 1, Control: 1, Achievement: 1, Freedom: 6, Pleasure: 1, Knowledge: 0 }, tag: '叛逆' }
    ]
  },
  {
    id: 5,
    title: '看到身边的人取得巨大成功，你内心更多是？',
    options: [
      { text: '真心为他感到高兴', scoreMap: { Love: 6, Control: 0, Achievement: 0, Freedom: 1, Pleasure: 2, Knowledge: 1 }, tag: '共情' },
      { text: '暗暗激起我的好胜心', scoreMap: { Love: 0, Control: 2, Achievement: 6, Freedom: 0, Pleasure: 0, Knowledge: 2 }, tag: '好胜' },
      { text: '分析他成功的原因和方法', scoreMap: { Love: 0, Control: 1, Achievement: 2, Freedom: 1, Pleasure: 0, Knowledge: 6 }, tag: '学习' },
      { text: '与我无关，我过好自己的就行', scoreMap: { Love: 1, Control: 0, Achievement: 0, Freedom: 4, Pleasure: 3, Knowledge: 2 }, tag: '淡然' }
    ]
  },
  {
    id: 6,
    title: '你对未来伴侣最看重的是什么？',
    options: [
      { text: '温柔体贴，能给我情感陪伴', scoreMap: { Love: 7, Control: 1, Achievement: 0, Freedom: 0, Pleasure: 2, Knowledge: 0 }, tag: '陪伴' },
      { text: '有主见，能和我势均力敌', scoreMap: { Love: 1, Control: 4, Achievement: 3, Freedom: 0, Pleasure: 0, Knowledge: 2 }, tag: '对等' },
      { text: '独立自由，互相不束缚', scoreMap: { Love: 2, Control: 0, Achievement: 0, Freedom: 6, Pleasure: 1, Knowledge: 1 }, tag: '自由' },
      { text: '有趣浪漫，能一起享受生活', scoreMap: { Love: 3, Control: 0, Achievement: 0, Freedom: 1, Pleasure: 5, Knowledge: 1 }, tag: '浪漫' }
    ]
  },
  {
    id: 7,
    title: '朋友聚会时，你通常是哪种状态？',
    options: [
      { text: '照顾每个人感受的氛围组', scoreMap: { Love: 6, Control: 1, Achievement: 0, Freedom: 0, Pleasure: 2, Knowledge: 1 }, tag: '氛围组' },
      { text: '组织活动的核心人物', scoreMap: { Love: 1, Control: 5, Achievement: 2, Freedom: 0, Pleasure: 1, Knowledge: 1 }, tag: '组织者' },
      { text: '安静观察大家的思考者', scoreMap: { Love: 1, Control: 1, Achievement: 1, Freedom: 2, Pleasure: 0, Knowledge: 5 }, tag: '观察者' },
      { text: '随意自在，来去如风', scoreMap: { Love: 1, Control: 0, Achievement: 0, Freedom: 5, Pleasure: 3, Knowledge: 1 }, tag: '自由人' }
    ]
  },
  {
    id: 8,
    title: '面对一个完全陌生的领域，你的态度是？',
    options: [
      { text: '希望有人带带我，一起探索', scoreMap: { Love: 5, Control: 0, Achievement: 1, Freedom: 1, Pleasure: 1, Knowledge: 2 }, tag: '依赖' },
      { text: '系统学习，彻底搞懂它', scoreMap: { Love: 0, Control: 2, Achievement: 2, Freedom: 0, Pleasure: 0, Knowledge: 6 }, tag: '钻研' },
      { text: '快速掌握核心，成为专家', scoreMap: { Love: 0, Control: 2, Achievement: 5, Freedom: 1, Pleasure: 0, Knowledge: 2 }, tag: '征服' },
      { text: '随便玩玩，有兴趣就多看点', scoreMap: { Love: 1, Control: 0, Achievement: 0, Freedom: 4, Pleasure: 3, Knowledge: 2 }, tag: '随缘' }
    ]
  },
  {
    id: 9,
    title: '当你感到情绪低落时，你会怎么做？',
    options: [
      { text: '找信任的人倾诉', scoreMap: { Love: 7, Control: 0, Achievement: 0, Freedom: 1, Pleasure: 0, Knowledge: 2 }, tag: '倾诉' },
      { text: '做点有成就感的事转移注意', scoreMap: { Love: 0, Control: 2, Achievement: 5, Freedom: 1, Pleasure: 1, Knowledge: 1 }, tag: '转移' },
      { text: '一个人待着，自我消化', scoreMap: { Love: 0, Control: 1, Achievement: 0, Freedom: 4, Pleasure: 2, Knowledge: 3 }, tag: '独处' },
      { text: '吃喝玩乐犒劳自己', scoreMap: { Love: 1, Control: 0, Achievement: 0, Freedom: 2, Pleasure: 6, Knowledge: 1 }, tag: '放纵' }
    ]
  },
  {
    id: 10,
    title: '你对金钱的态度更接近以下哪种？',
    options: [
      { text: '够用就好，更看重人际关系', scoreMap: { Love: 6, Control: 1, Achievement: 0, Freedom: 1, Pleasure: 2, Knowledge: 0 }, tag: '知足' },
      { text: '钱是掌控资源的重要手段', scoreMap: { Love: 0, Control: 5, Achievement: 3, Freedom: 0, Pleasure: 0, Knowledge: 2 }, tag: '掌控' },
      { text: '努力赚钱，证明自己的价值', scoreMap: { Love: 0, Control: 1, Achievement: 6, Freedom: 1, Pleasure: 1, Knowledge: 1 }, tag: '证明' },
      { text: '钱是追求自由的工具', scoreMap: { Love: 0, Control: 1, Achievement: 1, Freedom: 5, Pleasure: 2, Knowledge: 1 }, tag: '工具' }
    ]
  },
  {
    id: 11,
    title: '在社交场合中，你更倾向于？',
    options: [
      { text: '和每个人都能聊得来', scoreMap: { Love: 5, Control: 1, Achievement: 1, Freedom: 1, Pleasure: 2, Knowledge: 0 }, tag: '社交' },
      { text: '主导话题和节奏', scoreMap: { Love: 0, Control: 5, Achievement: 2, Freedom: 1, Pleasure: 1, Knowledge: 1 }, tag: '主导' },
      { text: '和有价值的人深度交流', scoreMap: { Love: 2, Control: 1, Achievement: 3, Freedom: 0, Pleasure: 0, Knowledge: 4 }, tag: '深度' },
      { text: '不太喜欢社交场合', scoreMap: { Love: 0, Control: 1, Achievement: 0, Freedom: 4, Pleasure: 2, Knowledge: 3 }, tag: '避世' }
    ]
  },
  {
    id: 12,
    title: '你如何看待"独处"这件事？',
    options: [
      { text: '害怕孤独，希望有人陪伴', scoreMap: { Love: 7, Control: 0, Achievement: 0, Freedom: 0, Pleasure: 2, Knowledge: 1 }, tag: '怕孤单' },
      { text: '独处时才能掌控自己的节奏', scoreMap: { Love: 0, Control: 4, Achievement: 2, Freedom: 1, Pleasure: 0, Knowledge: 3 }, tag: '自主' },
      { text: '独处是充电和复盘的好时机', scoreMap: { Love: 0, Control: 1, Achievement: 3, Freedom: 1, Pleasure: 0, Knowledge: 5 }, tag: '复盘' },
      { text: '超级享受一个人自由自在', scoreMap: { Love: 0, Control: 0, Achievement: 0, Freedom: 6, Pleasure: 3, Knowledge: 1 }, tag: '享受' }
    ]
  },
  {
    id: 13,
    title: '做重要决定时，你更依赖什么？',
    options: [
      { text: '直觉和内心的感受', scoreMap: { Love: 4, Control: 0, Achievement: 1, Freedom: 2, Pleasure: 2, Knowledge: 1 }, tag: '直觉' },
      { text: '逻辑分析和客观数据', scoreMap: { Love: 0, Control: 2, Achievement: 2, Freedom: 0, Pleasure: 0, Knowledge: 6 }, tag: '理智' },
      { text: '目标导向，选最优路径', scoreMap: { Love: 0, Control: 2, Achievement: 5, Freedom: 1, Pleasure: 0, Knowledge: 2 }, tag: '目标' },
      { text: '看心情，怎么舒服怎么来', scoreMap: { Love: 1, Control: 0, Achievement: 0, Freedom: 3, Pleasure: 5, Knowledge: 1 }, tag: '随心' }
    ]
  },
  {
    id: 14,
    title: '你对"改变"的态度是什么？',
    options: [
      { text: '希望和重要的人一起面对变化', scoreMap: { Love: 6, Control: 1, Achievement: 1, Freedom: 0, Pleasure: 1, Knowledge: 1 }, tag: '共进退' },
      { text: '变化是重新掌控局面的机会', scoreMap: { Love: 0, Control: 4, Achievement: 3, Freedom: 1, Pleasure: 0, Knowledge: 2 }, tag: '机遇' },
      { text: '拥抱变化，挑战新高度', scoreMap: { Love: 0, Control: 1, Achievement: 5, Freedom: 2, Pleasure: 0, Knowledge: 2 }, tag: '挑战' },
      { text: '随遇而安，变化也挺有趣', scoreMap: { Love: 1, Control: 0, Achievement: 0, Freedom: 4, Pleasure: 3, Knowledge: 2 }, tag: '随性' }
    ]
  },
  {
    id: 15,
    title: '你最享受什么样的生活状态？',
    options: [
      { text: '被爱和温暖包围的日子', scoreMap: { Love: 7, Control: 0, Achievement: 0, Freedom: 1, Pleasure: 2, Knowledge: 0 }, tag: '温馨' },
      { text: '一切尽在掌握的掌控感', scoreMap: { Love: 0, Control: 6, Achievement: 2, Freedom: 0, Pleasure: 0, Knowledge: 2 }, tag: '掌控' },
      { text: '不断突破自我的成就感', scoreMap: { Love: 0, Control: 1, Achievement: 7, Freedom: 1, Pleasure: 0, Knowledge: 1 }, tag: '成就' },
      { text: '自由探索这个有趣的世界', scoreMap: { Love: 0, Control: 0, Achievement: 1, Freedom: 5, Pleasure: 2, Knowledge: 2 }, tag: '探索' }
    ]
  },
  {
    id: 16,
    title: '面对冲突时，你通常会怎么做？',
    options: [
      { text: '尽量缓和关系，避免伤害感情', scoreMap: { Love: 6, Control: 1, Achievement: 0, Freedom: 1, Pleasure: 1, Knowledge: 1 }, tag: '缓和' },
      { text: '据理力争，绝不退让', scoreMap: { Love: 0, Control: 5, Achievement: 3, Freedom: 1, Pleasure: 0, Knowledge: 1 }, tag: '强硬' },
      { text: '冷静分析，寻找最优解', scoreMap: { Love: 0, Control: 1, Achievement: 2, Freedom: 1, Pleasure: 0, Knowledge: 6 }, tag: '理性' },
      { text: '懒得争辩，转身离开', scoreMap: { Love: 1, Control: 0, Achievement: 0, Freedom: 5, Pleasure: 3, Knowledge: 1 }, tag: '回避' }
    ]
  },
  {
    id: 17,
    title: '你如何看待"知识"的价值？',
    options: [
      { text: '知识是用来连接人和情感的', scoreMap: { Love: 5, Control: 1, Achievement: 0, Freedom: 1, Pleasure: 1, Knowledge: 2 }, tag: '人文' },
      { text: '知识就是力量，是掌控的工具', scoreMap: { Love: 0, Control: 4, Achievement: 1, Freedom: 0, Pleasure: 0, Knowledge: 5 }, tag: '力量' },
      { text: '知识是通向成功的阶梯', scoreMap: { Love: 0, Control: 1, Achievement: 4, Freedom: 0, Pleasure: 0, Knowledge: 5 }, tag: '阶梯' },
      { text: '知识是探索世界自由的翅膀', scoreMap: { Love: 0, Control: 0, Achievement: 0, Freedom: 3, Pleasure: 2, Knowledge: 5 }, tag: '翅膀' }
    ]
  },
  {
    id: 18,
    title: '你理想中的工作是什么样的？',
    options: [
      { text: '团队氛围好，像家人一样', scoreMap: { Love: 6, Control: 1, Achievement: 1, Freedom: 0, Pleasure: 2, Knowledge: 0 }, tag: '氛围' },
      { text: '有决策权和主导权', scoreMap: { Love: 0, Control: 5, Achievement: 3, Freedom: 0, Pleasure: 0, Knowledge: 2 }, tag: '权力' },
      { text: '有明确的晋升和成就路径', scoreMap: { Love: 0, Control: 1, Achievement: 6, Freedom: 1, Pleasure: 0, Knowledge: 2 }, tag: '晋升' },
      { text: '自由灵活，不受约束', scoreMap: { Love: 1, Control: 0, Achievement: 0, Freedom: 5, Pleasure: 3, Knowledge: 1 }, tag: '自由' }
    ]
  },
  {
    id: 19,
    title: '你对于"承诺"这件事怎么看？',
    options: [
      { text: '承诺是感情最好的证明', scoreMap: { Love: 7, Control: 0, Achievement: 0, Freedom: 0, Pleasure: 2, Knowledge: 1 }, tag: '信诺' },
      { text: '承诺是让对方服从的手段', scoreMap: { Love: 0, Control: 6, Achievement: 2, Freedom: 1, Pleasure: 0, Knowledge: 1 }, tag: '手段' },
      { text: '承诺了就一定要做到', scoreMap: { Love: 1, Control: 2, Achievement: 4, Freedom: 0, Pleasure: 0, Knowledge: 3 }, tag: '责任' },
      { text: '不喜欢被承诺束缚', scoreMap: { Love: 0, Control: 0, Achievement: 0, Freedom: 7, Pleasure: 2, Knowledge: 1 }, tag: '抗拒' }
    ]
  },
  {
    id: 20,
    title: '在人生的选择上，你更偏向？',
    options: [
      { text: '选择能和重要的人在一起的路', scoreMap: { Love: 7, Control: 0, Achievement: 0, Freedom: 1, Pleasure: 1, Knowledge: 1 }, tag: '情感' },
      { text: '选择自己能掌控局面的方向', scoreMap: { Love: 0, Control: 5, Achievement: 2, Freedom: 1, Pleasure: 0, Knowledge: 2 }, tag: '掌控' },
      { text: '选择最能证明自己的赛道', scoreMap: { Love: 0, Control: 1, Achievement: 6, Freedom: 1, Pleasure: 0, Knowledge: 2 }, tag: '赛道' },
      { text: '选择让自己最自由的路', scoreMap: { Love: 0, Control: 0, Achievement: 0, Freedom: 6, Pleasure: 3, Knowledge: 1 }, tag: '自由' }
    ]
  }
]
