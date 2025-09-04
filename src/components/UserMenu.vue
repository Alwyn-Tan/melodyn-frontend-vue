<script setup lang="ts">
import {User, Wallet, Copy} from "lucide-vue-next";
import type {UserType} from "../composables/useAuth";
import {ref} from "vue";


interface UserMenuProps {
  user: UserType | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  onLoginWithWallet: () => void;
  onLogout: () => void;
}

const props = defineProps<UserMenuProps>();
const emit = defineEmits<{
  (e: 'logout'): void;
  (e: 'loginWithWallet'): void;
}>();

const showSettings = ref(false);
const isOpen = ref(false);


const handleWalletLogin = () => {
  props.onLoginWithWallet();
  isOpen.value = false;
};

const handleLogout = () => {
  props.onLogout();
  isOpen.value = false;
  showSettings.value = false;
}

</script>
<template>
  <div class="relative">
    <div>{{ isAuthenticated }}</div>
    <template v-if="!isAuthenticated">
      <button
          @click="isOpen = !isOpen"
          class="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400/20 to-pink-300/20 flex items-center justify-center"
      >
        <User
            class="w-8 h-8  text-purple-700"
        />
      </button>
      <div
          v-if="isOpen"
          class="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl p-6 z-50"
      >
        <div class="text-center">
          <Wallet class="w-12 h-12 mx-auto mb-4 text-pink-600"/>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">
            Connect Your Wallet
          </h3>
          <p class="text-sm text-gray-700 mb-6">
            Connect your MetaMask wallet to access Melodyn and your NFTs
          </p>

          <div
              v-if="error"
              class="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
          >
            <p class="text-sm text-red-600">{{ error }}</p>
          </div>

          <button
              @click="handleWalletLogin"
              :disabled="isLoading"
              class="w-full bg-gradient-to-r from-orange-500/20 to-orange-400/20 border border-gray-300 rounded-xl py-3 px-4 text-sm font-medium text-gray-800 hover:from-orange-500/30 hover:to-orange-400/30 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <template v-if="isLoading">
              <div
                  class="w-4 h-4 border-2 border-gray-800 border-t-transparent rounded-full animate-spin"
              ></div>
              <span>Connecting...</span>
            </template>
            <template v-else>
              <span>Connect MetaMask</span>
            </template>
          </button>

          <p class="text-xs text-gray-500 mt-4">
            Don't have MetaMask?
            <a
                href="https://metamask.io"
                target="_blank"
                rel="noopener noreferrer"
                class="text-pink-600 hover:underline"
            >Download here</a
            >
          </p>
        </div>
      </div>
    </template>

    <template v-else>
      <button
          @click="isOpen = !isOpen"
          class="w-10 h-10 rounded`-full overflow-hidden border-2 border-white/20 hover:border-b-pink-500/50 transition-all duration-300"
      >

        <template v-if="user?.avatar">
          <img :src="user.avatar" :alt="user.name" class="w-full h-full object-cover"/>
        </template>
        <template v-else>
          <div class="w-full h-full bg-gradient-to-br from-pink-500/20 to-gray-500/20 flex items-center justify-center">
            <User class="w-8 h-8 text-pink-600"/>
          </div>
        </template>

      </button>

      <div v-if="isOpen && !showSettings"
           class="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl p-4 z-50">
        <div class="flex items-center space-x-3 mb-4">
          <template v-if="user?.avatar">
            <img :src="user.avatar" :alt="user.name" class="w-10 h-10 rounded-full object-cover"/>
          </template>
          <template v-else>
            <div
                class="w-full h-full bg-gradient-to-br from-pink-500/20 to-gray-500/20 flex items-center justify-center">
              <User class="w-8 h-8 text-pink-600"/>
            </div>
          </template>

          <div class="flex-1">
            <h4 class="font-semibold text-gray-900">
              {{ user?.name }}
            </h4>
            <div class="flex items-center space-x-2">
              <p class="text-xs text-gray-700 font-mono">
                {{ user?.walletAddress.slice(0, 6) }}...{{ user?.walletAddress.slice(-4) }}
              </p>
              <button
                  @click="copyAddress"
                  class="p-1 hover:bg-gray-100 rounded transition-colors"
                  title="Copy address"
              >
                <Copy class="w-3 h-3 text-gray-600"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped></style>
