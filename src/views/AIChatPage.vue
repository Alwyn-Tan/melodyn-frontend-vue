<script setup lang="ts">
import {Heart} from "lucide-vue-next";
import ChatInterface from "../components/ChatInterface.vue";
</script>

<template>
  <div class="pt-20 pb-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <Heart class="w-16 h-16 mx-auto mb-4 text-pink-600"/>
        <h1
            class="text-4xl font-bold bg-gradient-to-r from-pink-600 to-gray-600 bg-clip-text text-transparent mb-4"
        >
          AI Companion Chat
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Create your personalized AI companion with advanced personality modeling and deep emotional intelligence
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
          <Brain className="w-12 h-12 text-pink-600 mb-4"/>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Personality Modeling</h3>
          <p className="text-gray-600 mb-4">Advanced neural networks create unique personality traits, preferences, and
            behavioral patterns</p>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Emotional Intelligence</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Adaptive Responses</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Personal Growth</span>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
          <MessageCircle className="w-12 h-12 text-pink-600 mb-4"/>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Deep Interaction</h3>
          <p className="text-gray-600 mb-4">Sophisticated conversation models enable meaningful, contextual, and
            emotionally resonant interactions</p>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Context Awareness</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Emotional Depth</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Natural Language</span>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
          <Zap className="w-12 h-12 text-pink-600 mb-4"/>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Memory Evolution</h3>
          <p className="text-gray-600 mb-4">Your AI companion remembers and learns from every interaction, building
            deeper connections over time</p>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Long-term Memory</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Relationship Building</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Personal Preferences</span>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-12">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
          Live Chat with Your AI Companion
        </h2>
        <div class="max-w-4xl mx-auto">
          <ChatInterface/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
