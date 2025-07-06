import type { Message } from '../types';

const responses = [
  "I'm a helpful AI assistant created by Google. I can help you with a wide variety of tasks including answering questions, writing, analysis, math, coding, creative projects, and much more. What would you like to explore today?",
  
  "That's a great question! Let me break this down for you in a comprehensive way...",
  
  "I'd be happy to help you with that. Here's what I think about your query:",
  
  "Based on my knowledge, I can provide you with several perspectives on this topic:",
  
  "This is an interesting topic that has multiple dimensions. Let me explore this with you:",
  
  "I can definitely assist you with that. Here's a detailed response:",
  
  "That's a fascinating subject! Let me share some insights:",
  
  "I'm here to help! Based on your question, here's what I can tell you:",
  
  "Great question! This touches on several important concepts:",
  
  "I'd be delighted to help you explore this topic further:"
];

const detailedResponses = {
  coding: [
    "I can help you with coding! Whether you need help with Python, JavaScript, TypeScript, React, or any other programming language, I'm here to assist. What specific coding challenge are you working on?",
    
    "Programming is one of my strengths! I can help with debugging, code optimization, algorithm design, architecture patterns, and much more. What would you like to code today?",
    
    "Let's dive into some code! I can assist with frontend development, backend systems, databases, APIs, mobile development, and emerging technologies. What's your project about?"
  ],
  
  creative: [
    "I love creative projects! I can help with writing stories, poetry, scripts, brainstorming ideas, creative problem-solving, and artistic concepts. What creative endeavor are you working on?",
    
    "Creativity is where I shine! Whether you need help with writing, storytelling, creative writing, artistic concepts, or innovative thinking, I'm here to collaborate. What's your creative vision?",
    
    "Let's create something amazing together! I can assist with creative writing, content creation, artistic projects, design thinking, and innovative solutions. What would you like to create?"
  ],
  
  academic: [
    "I'm well-versed in academic topics! I can help with research, essay writing, analysis, studying strategies, explaining complex concepts, and academic writing. What subject are you exploring?",
    
    "Academic excellence is my goal! Whether you need help with mathematics, science, literature, history, philosophy, or any other field, I'm here to support your learning journey. What topic interests you?",
    
    "Let's tackle your academic challenges together! I can assist with research methodology, critical thinking, paper writing, concept explanation, and study strategies. What are you working on?"
  ]
};

export const generateResponse = async (userMessage: string): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  const message = userMessage.toLowerCase();
  
  // Check for specific topics
  if (message.includes('code') || message.includes('programming') || message.includes('javascript') || message.includes('python') || message.includes('react')) {
    return detailedResponses.coding[Math.floor(Math.random() * detailedResponses.coding.length)];
  }
  
  if (message.includes('write') || message.includes('story') || message.includes('creative') || message.includes('poem') || message.includes('art')) {
    return detailedResponses.creative[Math.floor(Math.random() * detailedResponses.creative.length)];
  }
  
  if (message.includes('study') || message.includes('research') || message.includes('academic') || message.includes('essay') || message.includes('science')) {
    return detailedResponses.academic[Math.floor(Math.random() * detailedResponses.academic.length)];
  }
  
  // Generate contextual response
  const contextualResponse = generateContextualResponse(message);
  if (contextualResponse) {
    return contextualResponse;
  }
  
  // Default response
  return responses[Math.floor(Math.random() * responses.length)];
};

const generateContextualResponse = (message: string): string | null => {
  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return "Hello! I'm Gemini, your AI assistant. I'm here to help you with anything you need - from answering questions to creative projects, coding help, research, and much more. What would you like to explore today?";
  }
  
  if (message.includes('weather')) {
    return "I don't have access to real-time weather data, but I can help you find weather information! You can check weather apps, websites like weather.com, or ask me about weather patterns, climate, or meteorology concepts. What specifically about weather interests you?";
  }
  
  if (message.includes('time') || message.includes('date')) {
    return "I don't have access to real-time information, but I can help you with time-related calculations, time zone conversions, scheduling, or historical dates. What time-related question can I help you with?";
  }
  
  if (message.includes('help')) {
    return "I'm here to help! I can assist you with a wide range of tasks including:\n\n• Answering questions and providing explanations\n• Writing and editing content\n• Coding and programming help\n• Creative projects and brainstorming\n• Research and analysis\n• Math and problem-solving\n• Learning and education support\n\nWhat would you like help with today?";
  }
  
  return null;
};

export const generateConversationTitle = (firstMessage: string): string => {
  const words = firstMessage.split(' ').slice(0, 6);
  return words.join(' ') + (firstMessage.split(' ').length > 6 ? '...' : '');
};