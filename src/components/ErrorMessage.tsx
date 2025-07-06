import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onClose: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose }) => {
  return (
    <div className="mx-6 mb-4 max-w-4xl mx-auto">
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3">
        <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <AlertCircle className="w-4 h-4 text-red-600" />
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-red-800 text-sm leading-relaxed">{message}</p>
        </div>
        
        <button
          onClick={onClose}
          className="p-1 hover:bg-red-100 rounded-md transition-colors flex-shrink-0"
        >
          <X className="w-4 h-4 text-red-600" />
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;