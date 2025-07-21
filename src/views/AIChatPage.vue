<script setup lang="ts">
import { Heart } from "lucide-vue-next";
import ChatInterface from "../components/ChatInterface.vue";
</script>

<template>
  <div class="pt-20 pb-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <Heart class="w-16 h-16 mx-auto mb-4 text-pink-600" />
        <h1
          class="text-4xl font-bold bg-gradient-to-r from-pink-600 to-gray-600 bg-clip-text text-transparent mb-4"
        >
          AI Companion Chat
        </h1>
      </div>

      <div class="mb-12">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
          Live Chat with Your AI Companion
        </h2>
        <div class="max-w-4xl mx-auto">
          <ChatInterface />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
