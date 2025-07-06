import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import ProtectedRoute from './components/ProtectedRoute';
import ApiKeySetup from './components/ApiKeySetup';
import { useChat } from './hooks/useChat';
import { useAuth } from './hooks/useAuth';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [apiKeyConfigured, setApiKeyConfigured] = useState(() => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('gemini_api_key');
    return !!apiKey;
  });
  
  const { isAuthenticated } = useAuth();
  
  const {
    conversations,
    activeConversation,
    isTyping,
    error,
    sendMessage,
    createNewConversation,
    deleteConversation,
    selectConversation,
    clearError
  } = useChat();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNewConversation = () => {
    createNewConversation();
    setSidebarOpen(false);
  };

  const handleSelectConversation = (id: string) => {
    selectConversation(id);
    setSidebarOpen(false);
  };

  const handleApiKeySet = () => {
    setApiKeyConfigured(true);
  };

  // Show API key setup if not configured and user is authenticated
  if (isAuthenticated && !apiKeyConfigured) {
    return <ApiKeySetup onApiKeySet={handleApiKeySet} />;
  }

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-100">
        <Sidebar
          conversations={conversations}
          activeConversationId={activeConversation?.id || null}
          onNewConversation={handleNewConversation}
          onSelectConversation={handleSelectConversation}
          onDeleteConversation={deleteConversation}
          isOpen={sidebarOpen}
          onToggle={toggleSidebar}
        />
        
        <div className="flex-1 flex flex-col min-w-0">
          <ChatInterface
            activeConversation={activeConversation}
            isTyping={isTyping}
            error={error}
            onSendMessage={sendMessage}
            onToggleSidebar={toggleSidebar}
            onClearError={clearError}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default App;