import { model, chatModel } from '../config/gemini';
import type { Message } from '../types';

export class GeminiService {
  private chatSessions = new Map<string, any>();

  async generateResponse(message: string, conversationId?: string): Promise<string> {
    if (!model || !chatModel) {
      throw new Error('Gemini API not configured. Please add your API key to the .env file.');
    }

    try {
      // For new conversations or single queries, use the regular model
      if (!conversationId || !this.chatSessions.has(conversationId)) {
        const result = await model.generateContent(message);
        const response = await result.response;
        return response.text();
      }

      // For ongoing conversations, use chat session for context
      const chat = this.chatSessions.get(conversationId);
      const result = await chat.sendMessage(message);
      const response = await result.response;
      return response.text();
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      
      if (error.message?.includes('API_KEY_INVALID')) {
        throw new Error('Invalid API key. Please check your Gemini API key.');
      } else if (error.message?.includes('QUOTA_EXCEEDED')) {
        throw new Error('API quota exceeded. Please try again later.');
      } else if (error.message?.includes('SAFETY')) {
        throw new Error('Content was blocked for safety reasons. Please try rephrasing your message.');
      } else {
        throw new Error('Failed to generate response. Please try again.');
      }
    }
  }

  startChatSession(conversationId: string, history: Message[] = []) {
    if (!chatModel) return;

    // Convert message history to Gemini format
    const geminiHistory = history
      .filter(msg => !msg.isTyping)
      .map(msg => ({
        role: msg.type === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

    const chat = chatModel.startChat({
      history: geminiHistory,
      generationConfig: {
        temperature: 0.9,
        topP: 1,
        topK: 1,
        maxOutputTokens: 2048,
      },
    });

    this.chatSessions.set(conversationId, chat);
    return chat;
  }

  clearChatSession(conversationId: string) {
    this.chatSessions.delete(conversationId);
  }

  async generateTitle(firstMessage: string): Promise<string> {
    if (!model) {
      // Fallback to simple title generation
      const words = firstMessage.split(' ').slice(0, 6);
      return words.join(' ') + (firstMessage.split(' ').length > 6 ? '...' : '');
    }

    try {
      const prompt = `Generate a short, descriptive title (max 6 words) for a conversation that starts with: "${firstMessage}". Only return the title, nothing else.`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim().replace(/['"]/g, '');
    } catch (error) {
      console.error('Error generating title:', error);
      // Fallback to simple title generation
      const words = firstMessage.split(' ').slice(0, 6);
      return words.join(' ') + (firstMessage.split(' ').length > 6 ? '...' : '');
    }
  }
}

export const geminiService = new GeminiService();