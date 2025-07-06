export interface Message {
  id: string;
  content: string;
  type: 'user' | 'ai';
  timestamp: Date;
  isTyping?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  lastActive: Date;
  preview: string;
}

export interface SearchSuggestion {
  id: string;
  text: string;
  category: 'general' | 'creative' | 'technical' | 'academic';
  icon: string;
}