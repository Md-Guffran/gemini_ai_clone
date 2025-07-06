import React, { useEffect, useRef } from 'react';
import { Menu, Sparkles } from 'lucide-react';
import Message from './Message';
import InputArea from './InputArea';
import SearchSuggestions from './SearchSuggestions';
import ErrorMessage from './ErrorMessage';
import type { Conversation } from '../types';

interface ChatInterfaceProps {
  activeConversation: Conversation | null;
  isTyping: boolean;
  error: string | null;
  onSendMessage: (message: string) => void;
  onToggleSidebar: () => void;
  onClearError: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  activeConversation,
  isTyping,
  error,
  onSendMessage,
  onToggleSidebar,
  onClearError
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages]);

  const handleSuggestionClick = (suggestion: string) => {
    onSendMessage(suggestion);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4 sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Gemini
            </h2>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <ErrorMessage message={error} onClose={onClearError} />
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        {!activeConversation || activeConversation.messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Hello! I'm Gemini
            </h3>
            
            <p className="text-gray-600 text-center max-w-md mb-8">
              I'm Google's most capable AI model, built to be helpful, harmless, and honest. 
              I can help with writing, analysis, math, coding, creative projects, and much more.
            </p>
            
            <SearchSuggestions onSuggestionClick={handleSuggestionClick} />
          </div>
        ) : (
          <div className="p-6 max-w-4xl mx-auto">
            {activeConversation.messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <InputArea onSendMessage={onSendMessage} disabled={isTyping} />
    </div>
  );
};

export default ChatInterface;