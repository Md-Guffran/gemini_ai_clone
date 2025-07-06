import { useState, useCallback } from 'react';
import type { Message, Conversation } from '../types';
import { geminiService } from '../services/geminiApi';

export const useChat = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createNewConversation = useCallback(() => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      lastActive: new Date(),
      preview: 'Start a new conversation...'
    };
    
    setConversations(prev => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
    
    return newConversation;
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    setError(null);
    let currentConversation = conversations.find(c => c.id === activeConversationId);
    
    if (!currentConversation) {
      currentConversation = createNewConversation();
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      type: 'user',
      timestamp: new Date()
    };

    // Add user message
    setConversations(prev => prev.map(conv => 
      conv.id === currentConversation!.id 
        ? { 
            ...conv, 
            messages: [...conv.messages, userMessage],
            lastActive: new Date(),
            preview: content.trim()
          }
        : conv
    ));

    // Show typing indicator
    setIsTyping(true);
    
    const typingMessage: Message = {
      id: 'typing',
      content: '',
      type: 'ai',
      timestamp: new Date(),
      isTyping: true
    };

    setConversations(prev => prev.map(conv => 
      conv.id === currentConversation!.id 
        ? { ...conv, messages: [...conv.messages, typingMessage] }
        : conv
    ));

    try {
      // Start chat session if it's a new conversation with messages
      if (currentConversation.messages.length === 0) {
        geminiService.startChatSession(currentConversation.id);
      }

      const aiResponse = await geminiService.generateResponse(content, currentConversation.id);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        type: 'ai',
        timestamp: new Date()
      };

      // Generate title for new conversations
      let newTitle = currentConversation.title;
      if (currentConversation.title === 'New Chat') {
        try {
          newTitle = await geminiService.generateTitle(content);
        } catch (titleError) {
          console.error('Error generating title:', titleError);
          // Fallback title generation
          const words = content.split(' ').slice(0, 6);
          newTitle = words.join(' ') + (content.split(' ').length > 6 ? '...' : '');
        }
      }

      setConversations(prev => prev.map(conv => 
        conv.id === currentConversation!.id 
          ? { 
              ...conv, 
              messages: [...conv.messages.filter(m => m.id !== 'typing'), aiMessage],
              lastActive: new Date(),
              title: newTitle
            }
          : conv
      ));
    } catch (error: any) {
      console.error('Error generating response:', error);
      setError(error.message || 'Failed to generate response');
      
      // Remove typing indicator on error
      setConversations(prev => prev.map(conv => 
        conv.id === currentConversation!.id 
          ? { ...conv, messages: conv.messages.filter(m => m.id !== 'typing') }
          : conv
      ));
    } finally {
      setIsTyping(false);
    }
  }, [conversations, activeConversationId, createNewConversation]);

  const deleteConversation = useCallback((conversationId: string) => {
    setConversations(prev => prev.filter(conv => conv.id !== conversationId));
    geminiService.clearChatSession(conversationId);
    if (activeConversationId === conversationId) {
      setActiveConversationId(null);
    }
  }, [activeConversationId]);

  const selectConversation = useCallback((conversationId: string) => {
    setActiveConversationId(conversationId);
    const conversation = conversations.find(c => c.id === conversationId);
    if (conversation && conversation.messages.length > 0) {
      // Restore chat session with history
      geminiService.startChatSession(conversationId, conversation.messages);
    }
  }, [conversations]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const activeConversation = conversations.find(c => c.id === activeConversationId);

  return {
    conversations,
    activeConversation,
    isTyping,
    error,
    sendMessage,
    createNewConversation,
    deleteConversation,
    selectConversation,
    clearError
  };
};