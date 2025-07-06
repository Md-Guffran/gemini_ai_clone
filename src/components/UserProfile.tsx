import React, { useState } from 'react';
import { User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const UserProfile: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-xl transition-colors w-full"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-white" />
        </div>
        
        <div className="flex-1 text-left min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {user.name}
          </p>
          <p className="text-xs text-gray-500 truncate">
            {user.email}
          </p>
        </div>
        
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50">
          <button
            onClick={() => setIsOpen(false)}
            className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors w-full text-left"
          >
            <Settings className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">Settings</span>
          </button>
          
          <hr className="my-2 border-gray-200" />
          
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-2 hover:bg-red-50 transition-colors w-full text-left"
          >
            <LogOut className="w-4 h-4 text-red-500" />
            <span className="text-sm text-red-700">Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;