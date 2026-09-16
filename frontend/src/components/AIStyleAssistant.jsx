import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, User, Bot, Shirt } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AIStyleAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Hi there! 👋 I am your AI Style Assistant. Looking for something specific, or need fashion advice for an upcoming event?',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const toggleAssistant = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newUserMessage = {
      id: Date.now(),
      type: 'user',
      text: inputText,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response with intelligent mock data based on keywords
    setTimeout(() => {
      let botResponse = "That sounds great! I'd love to help you find the perfect outfit for that. Could you tell me a bit more about your color preferences?";
      
      const lowerInput = newUserMessage.text.toLowerCase();
      
      if (lowerInput.includes('winter') || lowerInput.includes('cold') || lowerInput.includes('jacket')) {
        botResponse = "For winter wear, layering is key! Have you checked out our new collection of Denim Jackets and Woolen Scarves? They are trending right now.";
      } else if (lowerInput.includes('summer') || lowerInput.includes('hot') || lowerInput.includes('beach')) {
        botResponse = "Summer vibes! ☀️ I highly recommend our breathable Floral Dresses or Chino Shorts to stay cool and stylish.";
      } else if (lowerInput.includes('party') || lowerInput.includes('wedding') || lowerInput.includes('formal')) {
        botResponse = "For a formal event, you can never go wrong with a classic fit. We have some sharp blazers and elegant evening dresses in stock.";
      } else if (lowerInput.includes('shoes') || lowerInput.includes('sneakers')) {
        botResponse = "A good pair of shoes ties the whole outfit together! Our Classic White Sneakers go with almost anything. Should I take you to the shoe section?";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: 'bot',
          text: botResponse,
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const quickReplies = [
    "Need winter clothes",
    "Show me summer styles",
    "Looking for party wear",
  ];

  const handleQuickReply = (text) => {
    setInputText(text);
    // Use timeout to allow state to update before sending
    setTimeout(() => {
      document.getElementById('ai-chat-form')?.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true })
      );
    }, 50);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute bottom-20 right-0 w-80 sm:w-96 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col"
            style={{ height: '500px' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-slate-800 p-4 text-white flex justify-between items-center shadow-md z-10">
              <div className="flex items-center gap-3">
                <div className="bg-secondary/20 p-2 rounded-full relative">
                  <Sparkles size={20} className="text-secondary animate-pulse" />
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-primary"></span>
                </div>
                <div>
                  <h3 className="font-bold text-sm">StyleSphere AI</h3>
                  <p className="text-xs text-gray-300">Online & ready to style</p>
                </div>
              </div>
              <button 
                onClick={toggleAssistant}
                className="text-gray-300 hover:text-white transition-colors bg-white/10 p-1.5 rounded-full"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}
                >
                  {msg.type === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-white shadow-sm">
                      <Bot size={16} />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] p-3 text-sm shadow-sm ${
                      msg.type === 'user'
                        ? 'bg-primary text-white rounded-2xl rounded-br-sm'
                        : 'bg-white border border-gray-100 text-gray-800 rounded-2xl rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start items-end gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-white shadow-sm">
                    <Bot size={16} />
                  </div>
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm p-4 shadow-sm flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length === 1 && !isTyping && (
              <div className="px-4 py-2 flex flex-wrap gap-2 bg-gray-50/50">
                {quickReplies.map((reply, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs bg-white border border-primary/20 text-primary hover:bg-primary/5 px-3 py-1.5 rounded-full transition-colors font-medium shadow-sm"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-gray-100">
              <form id="ai-chat-form" onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask for style advice..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 bg-gray-100 border-none rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isTyping}
                  className="bg-primary hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2.5 rounded-xl transition-colors shadow-md flex items-center justify-center"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleAssistant}
        className="bg-primary hover:bg-slate-800 text-white p-4 rounded-full shadow-2xl flex items-center justify-center relative group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageSquare size={28} />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Notification dot */}
        {!isOpen && (
          <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-secondary border-2 border-primary"></span>
          </span>
        )}
      </motion.button>
    </div>
  );
};

export default AIStyleAssistant;
