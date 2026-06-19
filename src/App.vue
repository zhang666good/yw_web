<template>
  <div id="app-root">
    <Splash v-if="store.currentPage === 'splash'" />
    <Home v-else-if="store.currentPage === 'home'" />
    <Question v-else-if="store.currentPage === 'question'" />
    <Result v-else-if="store.currentPage === 'result'" />
    <Poster v-else-if="store.currentPage === 'poster'" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/store/user.js'
import Splash from '@/pages/Splash.vue'
import Home from '@/pages/Home.vue'
import Question from '@/pages/Question.vue'
import Result from '@/pages/Result.vue'
import Poster from '@/pages/Poster.vue'

const store = useUserStore()

onMounted(() => {
  // 初始化 - 恢复进度
  store.init()
})
</script>

<style>
#app-root {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
