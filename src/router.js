/**
 * 简易路由系统 - 基于 Pinia 状态管理进行页面切换
 * 由于是单页H5应用，用状态驱动页面切换而非 vue-router
 */

import { useUserStore } from '@/store/user.js'

export function useRouter() {
  const store = useUserStore()

  return {
    push(page) {
      if (['splash', 'home', 'question', 'result', 'poster'].includes(page)) {
        store.setPage(page)
      }
    },
    replace(page) {
      this.push(page)
    },
    currentPage: () => store.currentPage
  }
}
