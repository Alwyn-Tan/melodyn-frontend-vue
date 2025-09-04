<script setup lang="ts">
import {Zap, Star, Waves, Sparkles} from "lucide-vue-next";
import {useRoute, useRouter} from "vue-router";
import UserMenu from "./UserMenu.vue";
import {useAuth} from "../composables/useAuth";
import {watch} from "vue";

defineOptions({
  name: "Navigation",
});

const router = useRouter();
const route = useRoute();

const navItems = [
  {id: "home", label: "Home", icon: Star},
  {id: "ai-chat", label: "AI Companion", icon: Zap},
  {id: "xr-experience", label: "XR Experience", icon: Waves},
];

const navigate = (routeName: string) => {
  router.push({name: routeName});
};

const {
  user,
  isAuthenticated,
  isLoading,
  error,
  loginWithWallet,
  logout,
  wallet,
} = useAuth();

</script>

<template>
  <nav
      class="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-center h-20 relative">
        <!-- 左侧Logo区域 -->
        <div class="absolute left-0 flex items-center space-x-4">
          <div
              class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 flex items-center justify-center animate-pulse"
          >
            <Sparkles class="w-6 h-6 text-white"/>
          </div>
          <h1
              class="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent"
          >
            Melodyn
          </h1>
        </div>

        <div class="flex space-x-1">
          <template v-for="item in navItems" :key="item.id">
            <button
                @click="navigate(item.id)"
                :class="[
                'px-3 py-2 w-40 rounded-full text-sm font-medium transition-all duration-300 flex flex-col items-center space-y-1',
                route.name === item.id
                  ? 'bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-orange-500/30 text-purple-700 shadow-lg shadow-purple-500/20'
                  : 'text-gray-700 hover:bg-gradient-to-r hover:from-purple-500/10 hover:via-pink-500/10 hover:to-orange-500/10 hover:text-purple-600',
              ]"
            >
              <component :is="item.icon" class="w-5 h-5"/>
              <span class="text-xs">{{ item.label }}</span>
            </button>
          </template>
        </div>

        <div class="absolute right-0">
          <UserMenu
              :user="user"
              :is-authenticated="isAuthenticated"
              :is-loading="isLoading"
              :error="error"
              :on-login-with-wallet="loginWithWallet"
              :on-logout="logout"
          />
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
