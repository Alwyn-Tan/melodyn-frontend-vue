<script setup lang="ts">
import {Zap, Star, Waves, Sparkles} from 'lucide-vue-next';

const navItems = [
  {id: 'home', label: 'Home', icon: Star},
  {id: 'ai-companion', label: 'AI Companion', icon: Zap},
  {id: 'xr-experience', label: 'XR Experience', icon: Waves},

]
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-center h-16 relative">
        <!-- 左侧Logo区域 -->
        <div class="absolute left-0 flex items-center space-x-4">
          <div
              class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 flex items-center justify-center animate-pulse">
            <Sparkles class="w-6 h-6 text-white"/>
          </div>
          <h1 class="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            Melodyn
          </h1>
        </div>

        <div class="flex space-x-1">
          <template v-for="item in navItems" :key="item.id">
            <button>
              <component :is="item.icon" class="w-5 h-5"/>
              <span class="text-xs">{{ item.label }}</span>
            </button>
          </template>
        </div>

        <div class="absolute right-0">

        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>