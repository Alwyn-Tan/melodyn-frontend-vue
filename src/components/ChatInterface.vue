<script setup lang="ts">
import { ref, reactive, onMounted, watch, nextTick } from "vue";
import { Heart, User, Bot, Send, Mic } from "lucide-vue-next";
import { send } from "vite";

interface Message {
  id: String,
  content: String,
  sender: String,
  timestamp: Date,
}

const messages = ref([]);
const inputMessage = ref("");
const isTyping = ref(false);
const messagesEndRef = ref(null);
const currentAIName = ref("AI Companion");

const formatTime = (date:Date) :string => {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const fetchAIResponse = async (userInput:string):Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const responses = [
    `你好！我是AI助手，很高兴为您服务。您说"${userInput}"是什么意思呢？`,
    `我理解您说的是"${userInput}"，这是一个有趣的话题。您想了解更多相关信息吗？`,
    `感谢您的提问："${userInput}"。我可以为您提供详细的解释和相关信息。`,
    `您提到的"${userInput}"让我想到一些相关的概念。让我详细解释一下...`,
    `关于"${userInput}"，我可以从几个角度为您分析：首先...其次...最后...`,
    `我检测到您对"${userInput}"感兴趣。需要我提供更深入的技术细节吗？`,
    `您的问题"${userInput}"很有深度。让我整理一下思路，给您一个全面的回答。`,
  ];

  return responses[Math.floor(Math.random() * responses.length)];
};

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesEndRef.value) {
      messagesEndRef.value.scrollIntoView({ behavior: "smooth" });
    }
  });
};

const handleSendMessage = async () => {
  const message = inputMessage.value.trim();
  if (!message) return;

  const userMessage: Message = {
    id: Date.now().toString(),
    content: message,
    sender: "user",
    timestamp: new Date(),
  };

  messages.value.push(userMessage);
  inputMessage.value = "";
  isTyping.value = true;

  const aiReply = await fetchAIResponse(message);

  const aiMessage = {
    id: (Date.now() + 1).toString(),
    content: aiReply,
    sender: "ai",
    timestamp: new Date(),
    emotion: "caring",
  };

  messages.value.push(aiMessage);
  isTyping.value = false;
};

onMounted(() => {
  const initialMessage = {
    id: (Date.now() + 1).toString(),
    content: "Hi, I'm ChatGPT. How can I help you?",
    sender: "ai",
    timestamp: new Date(),
    emotion: "caring",
  };
  messages.value.push(initialMessage);
});

watch(
  messages,
  () => {
    scrollToBottom();
  },
  { deep: true }
);
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50 py-12 px-4"
  >
    <div class="max-w-7xl mx-auto">

      <div class="max-w-6xl mx-auto">
        <div
          class="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 mb-12"
        >
          <!-- 聊天界面组件 -->
          <div
            class="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl h-96 flex flex-col"
          >
            <!-- Chat Header -->
            <div class="p-4 border-b border-white/20">
              <div class="flex items-center space-x-3">
                <div
                  class="w-10 h-10 bg-gradient-to-br from-pink-500/30 to-gray-500/30 rounded-full flex items-center justify-center"
                >
                  <Heart class="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <h3 class="font-semibold text-gray-800">
                    {{ currentAIName }}
                  </h3>
                  <p class="text-xs text-gray-600">
                    Your AI Companion • Online
                  </p>
                </div>
                <div class="ml-auto">
                  <div
                    class="w-2 h-2 bg-green-500 rounded-full animate-pulse"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Messages Area -->
            <div class="flex-1 overflow-y-auto p-4 space-y-4">
              <div
                v-for="message in messages"
                :key="message.id"
                :class="[
                  'flex',
                  message.sender === 'user' ? 'justify-end' : 'justify-start',
                ]"
              >
                <div
                  :class="[
                    'flex items-start space-x-2 max-w-xs',
                    message.sender === 'user'
                      ? 'flex-row-reverse space-x-reverse'
                      : '',
                  ]"
                >
                  <div
                    :class="[
                      'w-8 h-8 rounded-full flex items-center justify-center',
                      message.sender === 'user'
                        ? 'bg-gradient-to-br from-gray-500/20 to-gray-400/20'
                        : 'bg-gradient-to-br from-pink-500/20 to-pink-400/20',
                    ]"
                  >
                    <User
                      v-if="message.sender === 'user'"
                      class="w-4 h-4 text-gray-600"
                    />
                    <Bot v-else class="w-4 h-4 text-pink-600" />
                  </div>
                  <div
                    :class="[
                      'rounded-2xl px-4 py-2',
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-gray-500/20 to-gray-400/20 text-gray-800'
                        : 'bg-gradient-to-r from-pink-500/20 to-pink-400/20 text-gray-800',
                    ]"
                  >
                    <p class="text-sm">{{ message.content }}</p>
                    <p class="text-xs opacity-60 mt-1">
                      {{ formatTime(message.timestamp) }}
                    </p>
                  </div>
                </div>
              </div>
              <div v-if="isTyping" class="flex justify-start">
                <div class="flex items-start space-x-2">
                  <div
                    class="w-8 h-8 bg-gradient-to-br from-pink-500/20 to-pink-400/20 rounded-full flex items-center justify-center"
                  >
                    <Bot class="w-4 h-4 text-pink-600" />
                  </div>
                  <div
                    class="bg-gradient-to-r from-pink-500/20 to-pink-400/20 rounded-2xl px-4 py-2"
                  >
                    <div class="flex space-x-1">
                      <div
                        class="w-2 h-2 bg-pink-600 rounded-full animate-bounce"
                      ></div>
                      <div
                        class="w-2 h-2 bg-pink-600 rounded-full animate-bounce"
                        style="animation-delay: 0.1s"
                      ></div>
                      <div
                        class="w-2 h-2 bg-pink-600 rounded-full animate-bounce"
                        style="animation-delay: 0.2s"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div ref="messagesEndRef"></div>
            </div>

            <!-- Input Area -->
            <div class="p-4 border-t border-white/20">
              <div class="flex items-center space-x-2">
                <div class="flex-1 relative">
                  <textarea
                    v-model="inputMessage"
                    @keydown.enter.exact.prevent="handleSendMessage"
                    placeholder="Share your thoughts with your AI companion"
                    class="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-sm text-gray-800 placeholder-gray-500 resize-none focus:outline-none focus:border-pink-500/50 transition-colors"
                    rows="1"
                  ></textarea>
                </div>
                <button
                  @click="handleSendMessage"
                  :disabled="!inputMessage.trim()"
                  :class="[
                    'w-10 h-10 bg-gradient-to-r from-pink-500/20 to-gray-500/20 backdrop-blur-sm border border-white/30 rounded-xl flex items-center justify-center transition-all duration-300',
                    inputMessage.trim()
                      ? 'hover:from-pink-500/30 hover:to-gray-500/30 hover:border-white/50'
                      : 'opacity-50 cursor-not-allowed',
                  ]"
                >
                  <Send class="w-4 h-4 text-pink-600" />
                </button>
                <button
                  class="w-10 h-10 bg-gradient-to-r from-pink-500/20 to-gray-500/20 backdrop-blur-sm border border-white/30 rounded-xl flex items-center justify-center hover:from-pink-500/30 hover:to-gray-500/30 hover:border-white/50 transition-all duration-300"
                >
                  <Mic class="w-4 h-4 text-pink-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");

body {
  font-family: "Inter", sans-serif;
  background-color: #f9fafb;
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(249, 250, 251, 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(192, 132, 252, 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(192, 132, 252, 0.7);
}

/* 动画效果 */
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}

/* 毛玻璃效果 */
.backdrop-blur-md {
  backdrop-filter: blur(12px);
}

/* 渐变文本 */
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}

/* 消息框过渡效果 */
.message-enter-active,
.message-leave-active {
  transition: all 0.3s ease;
}
.message-enter-from,
.message-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
