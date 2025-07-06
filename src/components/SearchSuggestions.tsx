import React from 'react';
import { Lightbulb, Code, Palette, BookOpen, Rocket, Search, Brain, Calculator, Globe, MessageSquare } from 'lucide-react';
import type { SearchSuggestion } from '../types';

interface SearchSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

const suggestions: SearchSuggestion[] = [
  {
    id: '1',
    text: 'Explain quantum computing in simple terms',
    category: 'technical',
    icon: 'brain'
  },
  {
    id: '2',
    text: 'Write a creative short story about time travel',
    category: 'creative',
    icon: 'palette'
  },
  {
    id: '3',
    text: 'Help me debug this Python code',
    category: 'technical',
    icon: 'code'
  },
  {
    id: '4',
    text: 'Create a study plan for learning Spanish',
    category: 'academic',
    icon: 'bookOpen'
  },
  {
    id: '5',
    text: 'Solve this math problem step by step',
    category: 'academic',
    icon: 'calculator'
  },
  {
    id: '6',
    text: 'What are the latest trends in AI?',
    category: 'general',
    icon: 'globe'
  },
  {
    id: '7',
    text: 'Help me brainstorm business ideas',
    category: 'creative',
    icon: 'rocket'
  },
  {
    id: '8',
    text: 'Explain the concept of machine learning',
    category: 'technical',
    icon: 'lightbulb'
  }
];

const getIcon = (iconName: string) => {
  const icons = {
    palette: Palette,
    lightbulb: Lightbulb,
    code: Code,
    bookOpen: BookOpen,
    rocket: Rocket,
    search: Search,
    brain: Brain,
    calculator: Calculator,
    globe: Globe,
    messageSquare: MessageSquare
  };
  return icons[iconName as keyof typeof icons] || Search;
};

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({ onSuggestionClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto">
      {suggestions.map((suggestion) => {
        const Icon = getIcon(suggestion.icon);
        return (
          <button
            key={suggestion.id}
            onClick={() => onSuggestionClick(suggestion.text)}
            className="flex items-center space-x-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 text-left group hover:shadow-md"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <Icon className="w-4 h-4 text-white" />
            </div>
            <span className="text-gray-700 group-hover:text-blue-700 transition-colors text-sm">
              {suggestion.text}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default SearchSuggestions;