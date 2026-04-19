'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, Loader2, Sparkles, MessageSquare } from 'lucide-react';
import { SUGGESTED_QUESTIONS } from '@/lib/ai-knowledge';

type Message = { text: string; isBot: boolean };

const INITIAL_MESSAGE: Message = {
  text: "Hey! I'm Delulu ✨ — Ravikumar's slightly unhinged but very capable AI assistant. What would you like to know?",
  isBot: true,
};

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = async (customMessage?: string) => {
    const textToSend = customMessage || input.trim();
    if (!textToSend || isLoading) return;

    const userMsg: Message = { text: textToSend, isBot: false };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    if (!customMessage) setInput('');
    setIsLoading(true);

    try {
      // Send all messages except the last user one as history
      const history = updatedMessages.slice(0, -1);
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend, history }),
      });

      const data = await res.json();
      setMessages(prev => [...prev, { text: data.reply, isBot: true }]);
    } catch {
      setMessages(prev => [
        ...prev,
        { text: "Oops, something went wrong on my end. Try the Contact form to reach Ravikumar directly!", isBot: true },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="mb-4 w-[320px] md:w-[380px] h-[500px] flex flex-col overflow-hidden shadow-2xl rounded-2xl border border-white/10"
            style={{ background: 'rgba(11,15,25,0.95)', backdropFilter: 'blur(20px)' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[var(--primary)] to-[#8400FF] p-4 flex justify-between items-center flex-shrink-0">
              <div className="flex items-center gap-3 text-[var(--background)]">
                <div className="relative">
                  <Bot size={20} />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full border border-[var(--background)]" />
                </div>
                <div>
                  <p className="font-bold text-sm leading-none">Delulu AI</p>
                  <p className="text-xs opacity-70 mt-0.5">Ravikumar's assistant · Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[var(--background)] hover:opacity-70 transition-opacity p-1"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-grow p-4 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-gray-700">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  {msg.isBot && (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--primary)] to-[#8400FF] flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                      <Sparkles size={10} className="text-black" />
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.isBot
                        ? 'bg-white/5 text-gray-200 rounded-tl-none border border-white/5'
                        : 'bg-gradient-to-r from-[var(--primary)] to-[#38bdf8] text-black font-medium rounded-tr-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--primary)] to-[#8400FF] flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                    <Sparkles size={10} className="text-black" />
                  </div>
                  <div className="bg-white/5 border border-white/5 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}

              {messages.length === 1 && !isLoading && (
                <div className="mt-4 pt-4 border-t border-white/5">
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-3 ml-1 font-bold">Suggested Questions</p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTED_QUESTIONS.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(q)}
                        className="text-xs bg-white/5 border border-white/10 hover:bg-[var(--primary)] hover:text-black hover:border-transparent px-3 py-1.5 rounded-lg transition-all text-left"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/5 flex gap-2 flex-shrink-0 bg-black/20">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                disabled={isLoading}
                className="flex-grow bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all placeholder-gray-600 disabled:opacity-50"
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="bg-[var(--primary)] text-black p-2.5 rounded-full hover:scale-105 transition-all disabled:opacity-40 disabled:scale-100 flex-shrink-0"
              >
                {isLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Send size={16} />
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--primary), #8400FF)' }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={24} className="text-black" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={24} className="text-black" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        {!isOpen && (
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-[var(--primary)]"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.button>
    </div>
  );
}
