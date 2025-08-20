<script setup lang="ts">
import {User, Wallet} from 'lucide-vue-next';
import type {UserType} from '../composables/useAuth.ts'
import {ref} from 'vue'

const isOpen = ref(false);

interface UserMenuProps {
  user: UserType | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  onLoginWithWallet: () => void;
  onLogout: () => void;
}

const props = defineProps<UserMenuProps>();

const handleWalletLogin = () => {
  props.onLoginWithWallet();
  isOpen.value = false;
}
</script>

<template>
  <button
      @click="isOpen = !isOpen"
      class="w-10 h-10 rounded-full bg-gradient-to-br from-gray-400/20 to-gray-300/20 flex items-center justify-center hover:from-gray-400/30 hover:to-gray-300/30 transition-all duration-300"
  >
    <User className="w-5 h-5 text-gray-600"/>
  </button>

  <div v-if="isOpen"
       class="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl border border-gray/20 shadow-2xl p-6 z-50">
    <div class="text-center">
      <Wallet class="w-12 h-12 mx-auto mb-4 text-pink-600"/>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">Connect Your Wallet</h3>
      <p class="text-sm text-gray-700 mb-6">Connect your MetaMask wallet to access Melodyn and your NFTs</p>

      <div v-if="error" class="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
        <p class="text-sm text-red-600">{{ error }}</p>
      </div>

      <button
          @click="handleWalletLogin"
          :disabled="isLoading"
          class="w-full bg-gradient-to-r from-orange-500/20 to-orange-400/20 border border-gray-300 rounded-xl py-3 px-4 text-sm font-medium text-gray-800 hover:from-orange-500/30 hover:to-orange-400/30 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <template v-if="isLoading">
          <div class="w-4 h-4 border-2 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
          <span>Connecting...</span>
        </template>
        <template v-else>
          <span>Connect MetaMask</span>
        </template>
      </button>

      <p class="text-xs text-gray-500 mt-4">
        Don't have MetaMask? <a href="https://metamask.io" target="_blank" rel="noopener noreferrer"
                                class="text-pink-600 hover:underline">Download here</a>
      </p>
    </div>
  </div>
</template>

<style scoped>

</style>


