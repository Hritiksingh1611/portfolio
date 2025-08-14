"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Hi! I'm Hritik's AI assistant. I can help you learn more about his experience, projects, or skills. What would you like to know?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Predefined responses for different topics
  const responses = {
    experience: "Hritik has 3+ years of experience as a Data Engineer, working with companies like TechCorp Solutions and DataFlow Systems. He specializes in building scalable data pipelines, ML model deployment, and cloud architecture. His journey started as a Data Analyst and evolved into senior data engineering roles.",
    
    skills: "Hritik's key skills include Python (95%), Apache Spark (92%), TensorFlow/Keras (88%), AWS (88%), SQL (90%), and Docker (90%). He's also proficient in React/Next.js for full-stack development and has experience with Kubernetes, MongoDB, and various ML frameworks.",
    
    projects: "Some of Hritik's notable projects include: 1) AI-Powered Customer Analytics Platform processing 1M+ events daily, 2) Real-Time Data Pipeline Orchestrator handling 10TB+ data, 3) Intelligent Document Processing System with 95% accuracy, and 4) This modern portfolio website with AI features!",
    
    education: "While specific educational details aren't mentioned in his portfolio, Hritik has multiple certifications including AWS Certified Data Engineer, Google Cloud Professional Data Engineer, Certified Kubernetes Administrator, and TensorFlow Developer Certificate.",
    
    contact: "You can reach Hritik via email at hritik.singh@example.com, phone at +91 9876543210, or connect on LinkedIn and GitHub. He's currently available for new opportunities and exciting projects!",
    
    ai: "Hritik is passionate about AI and Machine Learning! He works with TensorFlow, PyTorch, Scikit-learn, and Hugging Face transformers. He's built AI systems for customer analytics, document processing, sentiment analysis, and predictive maintenance. He's always exploring the latest in AI research!",
    
    default: "That's an interesting question! While I have information about Hritik's professional background, you might want to reach out to him directly for more specific details. You can contact him through the contact section below or via his social media links."
  };

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('experience') || message.includes('work') || message.includes('job')) {
      return responses.experience;
    }
    if (message.includes('skill') || message.includes('technology') || message.includes('tech')) {
      return responses.skills;
    }
    if (message.includes('project') || message.includes('portfolio') || message.includes('work')) {
      return responses.projects;
    }
    if (message.includes('education') || message.includes('study') || message.includes('learn') || message.includes('certification')) {
      return responses.education;
    }
    if (message.includes('contact') || message.includes('email') || message.includes('phone') || message.includes('reach')) {
      return responses.contact;
    }
    if (message.includes('ai') || message.includes('artificial intelligence') || message.includes('machine learning') || message.includes('ml')) {
      return responses.ai;
    }
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! 👋 I'm here to help you learn more about Hritik Singh. You can ask me about his experience, skills, projects, or how to get in touch with him. What interests you most?";
    }
    
    return responses.default;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputValue),
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "Tell me about Hritik's experience",
    "What are his technical skills?",
    "Show me his projects",
    "How can I contact him?"
  ];

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 z-50 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageCircle size={20} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 left-6 z-50 w-96 h-[500px] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-3rem)]"
          >
            <div className="glass-effect rounded-2xl border border-white/20 h-full flex flex-col overflow-hidden">
              {/* Chat Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">AI Assistant</h3>
                    <p className="text-xs text-gray-400">Ask me about Hritik</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <X size={18} />
                </motion.button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === 'user' 
                          ? 'bg-blue-500' 
                          : 'bg-gradient-to-r from-purple-500 to-pink-600'
                      }`}>
                        {message.sender === 'user' ? (
                          <User size={12} className="text-white" />
                        ) : (
                          <Bot size={12} className="text-white" />
                        )}
                      </div>
                      <div className={`px-3 py-2 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-white/10 text-gray-200'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                        <Bot size={12} className="text-white" />
                      </div>
                      <div className="bg-white/10 px-3 py-2 rounded-2xl">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Quick Questions */}
              {messages.length === 1 && (
                <div className="p-4 border-t border-white/10">
                  <p className="text-xs text-gray-400 mb-2">Quick questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.map((question, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setInputValue(question);
                          handleSendMessage();
                        }}
                        className="px-2 py-1 text-xs bg-white/10 text-gray-300 rounded-full hover:bg-white/20 transition-all duration-200"
                      >
                        {question}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-white/10">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about Hritik..."
                    className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300 text-sm"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={16} />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Features Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.8 }}
        className="fixed bottom-24 left-6 z-40"
      >
        <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-500/20 to-pink-600/20 border border-purple-500/30 rounded-full text-xs text-purple-300 backdrop-blur-sm">
          <Sparkles size={12} />
          AI-Powered
        </div>
      </motion.div>
    </>
  );
}
