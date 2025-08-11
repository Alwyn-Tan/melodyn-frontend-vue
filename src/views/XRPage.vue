<script setup lang="ts">
import {Headphones, Zap, Waves, Thermometer, Hand, Eye} from 'lucide-vue-next';

</script>

<template>
  <div class="pt-20 pb-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <Headphones class="w-16 h-16 mx-auto mb-4 text-pink-600"/>
        <h1 class="text-4xl font-bold bg-gradient-to-r from-pink-600 to-gray-600 bg-clip-text text-transparent mb-4">
          XR Immersive Experience
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Revolutionary sensory technology that brings your AI companion to life through haptic feedback and immersive
          environments
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
          <Hand class="w-12 h-12 text-pink-600 mb-4"/>
          <h3 class="text-xl font-bold text-gray-800 mb-3">Haptic Feedback</h3>
          <p class="text-gray-600 mb-4">Advanced haptic suits and gloves provide realistic touch sensations</p>
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Touch Sensitivity</span>
              <div class="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div class="w-5/6 h-full bg-gradient-to-r from-pink-500 to-pink-400"></div>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Response Time</span>
              <div class="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div class="w-full h-full bg-gradient-to-r from-green-500 to-green-400"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
          <Thermometer class="w-12 h-12 text-pink-600 mb-4"/>
          <h3 class="text-xl font-bold text-gray-800 mb-3">Thermal Feedback</h3>
          <p class="text-gray-600 mb-4">Precise temperature control creates realistic warmth and coolness</p>
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Temperature Range</span>
              <div class="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div class="w-4/5 h-full bg-gradient-to-r from-orange-500 to-orange-400"></div>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Precision</span>
              <div class="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div class="w-5/6 h-full bg-gradient-to-r from-blue-500 to-blue-400"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
          <Eye class="w-12 h-12 text-pink-600 mb-4"/>
          <h3 class="text-xl font-bold text-gray-800 mb-3">Visual Immersion</h3>
          <p class="text-gray-600 mb-4">Ultra-high resolution VR environments with photorealistic rendering</p>
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Resolution</span>
              <div class="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div class="w-full h-full bg-gradient-to-r from-purple-500 to-purple-400"></div>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Frame Rate</span>
              <div class="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div class="w-5/6 h-full bg-gradient-to-r from-indigo-500 to-indigo-400"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl mb-12">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Supported Hardware</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Haptic Devices</h3>
            <div class="space-y-3">
              <div class="flex items-center space-x-3 p-3 bg-gray-900/10 rounded-lg">
                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                <span class="text-sm text-gray-700">HaptX Gloves DK2</span>
              </div>
              <div class="flex items-center space-x-3 p-3 bg-gray-900/10 rounded-lg">
                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                <span class="text-sm text-gray-700">Ultraleap Hand Tracking</span>
              </div>
              <div class="flex items-center space-x-3 p-3 bg-gray-900/10 rounded-lg">
                <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span class="text-sm text-gray-700">Teslasuit Full Body</span>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-4">VR Headsets</h3>
            <div class="space-y-3">
              <div class="flex items-center space-x-3 p-3 bg-gray-900/10 rounded-lg">
                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                <span class="text-sm text-gray-700">Meta Quest Pro</span>
              </div>
              <div class="flex items-center space-x-3 p-3 bg-gray-900/10 rounded-lg">
                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                <span class="text-sm text-gray-700">Apple Vision Pro</span>
              </div>
              <div class="flex items-center space-x-3 p-3 bg-gray-900/10 rounded-lg">
                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                <span class="text-sm text-gray-700">Varjo Aero</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
          <Waves class="w-12 h-12 text-pink-600 mb-4"/>
          <h3 class="text-xl font-bold text-gray-800 mb-3">Spatial Audio</h3>
          <p class="text-gray-600 mb-4">3D positional audio creates an immersive soundscape</p>
          <ul class="space-y-2 text-sm text-gray-600">
            <li>• Binaural audio processing</li>
            <li>• Real-time spatial positioning</li>
            <li>• Adaptive frequency response</li>
            <li>• Noise cancellation</li>
          </ul>
        </div>

        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
          <Zap class="w-12 h-12 text-pink-600 mb-4"/>
          <h3 class="text-xl font-bold text-gray-800 mb-3">Real-time Processing</h3>
          <p class="text-gray-600 mb-4">Ultra-low latency ensures seamless interaction</p>
          <ul class="space-y-2 text-sm text-gray-600">
            <li>• Sub-20ms latency</li>
            <li>• Edge computing optimization</li>
            <li>• Predictive buffering</li>
            <li>• Adaptive quality scaling</li>
          </ul>
        </div>
      </div>

      <div class="text-center">
        <button
            class="bg-gradient-to-r from-pink-500/20 to-gray-500/20 backdrop-blur-sm border border-white/30 rounded-xl py-4 px-8 text-lg font-medium text-gray-700 hover:from-pink-500/30 hover:to-gray-500/30 hover:border-white/50 transition-all duration-300 shadow-lg hover:shadow-pink-500/20">
          Configure XR Experience
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>