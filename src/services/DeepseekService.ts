import axios from 'axios';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatCompletionRequest {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  max_tokens?: number;
}

interface ChatCompletionResponse {
  choices: {
    message: ChatMessage;
  }[];
}

export const fetchAIResponse = async (userInput: string): Promise<string> => {
  try {
    const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;
    if (!apiKey) {
      throw new Error('Deepseek API key is not configured');
    }

    const requestData: ChatCompletionRequest = {
      model: 'deepseek-chat',
      messages: [
        {
          role: 'user',
          content: userInput
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    };

    const response = await axios.post<ChatCompletionResponse>(
      'https://api.deepseek.com/v1/chat/completions',
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling Deepseek API:', error);
    return '抱歉，AI服务暂时不可用，请稍后再试。';
  }
};
