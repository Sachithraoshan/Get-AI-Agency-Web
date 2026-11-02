import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, ArrowRight, CornerDownLeft } from 'lucide-react';
import { useRouter } from '../utils/router.tsx';

interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
}

// Zero Dash Rule: strictly remove -, –, or — from visible message rendering
export function enforceZeroDash(text: string): string {
  if (!text) return '';
  return text
    .replace(/[—–]/g, ', ')
    .replace(/\s+-\s+/g, ', ')
    .replace(/^-\s+/gm, '')
    .replace(/-/g, ' ');
}

const SUGGESTED_QUESTIONS = [
  'What does GET AI do?',
  'What services do you offer?',
  'I need a website',
  'I want to start a project',
];

const INITIAL_WELCOME: ChatMessage = {
  id: 'welcome-1',
  role: 'assistant',
  content: "Hi, I’m GET AI. How can I help you today?",
};

export const ChatBot: React.FC = () => {
  const { navigate } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_WELCOME]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isTyping) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) {
      setInputMessage('');
    }
    setIsTyping(true);

    try {
      // Build conversational payload
      const payload = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: payload }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      const replyRaw = data.reply || "I am here to help you understand our services and prepare your project enquiry. You can also explore our contact form at /contact.";
      const cleanReply = enforceZeroDash(replyRaw);

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: cleanReply,
        },
      ]);
    } catch {
      // Graceful fallback conforming to ZERO DASH RULE
      const fallback = enforceZeroDash(
        "I can help you understand our services and prepare your project enquiry. You can send us your requirements through the contact form at /contact and our team will review it."
      );
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: fallback,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 font-sans print:hidden">
      
      {/* Chat Window */}
      {isOpen && (
        <div
          id="getai-chat-window"
          className="w-[92vw] sm:w-[380px] md:w-[410px] h-[520px] max-h-[82vh] bg-white border border-neutral-300 rounded-sm shadow-2xl flex flex-col mb-3 overflow-hidden transition-all duration-200"
        >
          {/* Header */}
          <div className="bg-black text-white p-4 flex items-center justify-between border-b border-neutral-800">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xs bg-white text-black flex items-center justify-center font-bold text-xs tracking-wider font-mono">
                AI
              </div>
              <div>
                <h2 className="text-xs font-bold tracking-wider uppercase text-white">
                  GET AI
                </h2>
                <p className="text-[10px] text-neutral-400 font-mono">
                  GET AI Agency Assistant
                </p>
              </div>
            </div>

            <button
              id="getai-chat-close-btn"
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white p-1 rounded-xs transition-colors cursor-pointer"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-neutral-50/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`p-3 text-xs leading-relaxed rounded-xs max-w-[88%] whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-black text-white'
                      : 'bg-white text-black border border-neutral-200 shadow-2xs'
                  }`}
                >
                  {enforceZeroDash(m.content)}
                </div>

                {/* Direct Action Link if message suggests contact */}
                {m.role === 'assistant' &&
                  (m.content.toLowerCase().includes('/contact') ||
                    m.content.toLowerCase().includes('contact form') ||
                    m.content.toLowerCase().includes('project enquiry')) && (
                    <button
                      onClick={() => {
                        navigate('/contact');
                        setIsOpen(false);
                      }}
                      className="mt-1.5 inline-flex items-center gap-1.5 text-[11px] font-semibold text-black bg-neutral-100 hover:bg-neutral-200 px-2.5 py-1 rounded-xs border border-neutral-300 transition-colors cursor-pointer"
                    >
                      <span>Start a Project</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start">
                <div className="bg-white border border-neutral-200 text-neutral-500 text-xs p-3 rounded-xs flex items-center gap-1.5 shadow-2xs">
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" />
                </div>
              </div>
            )}

            {/* Suggested Questions (shown when conversation is new) */}
            {messages.length <= 2 && !isTyping && (
              <div className="pt-2">
                <p className="text-[10px] font-mono uppercase text-neutral-400 mb-1.5">
                  Suggested questions:
                </p>
                <div className="flex flex-col gap-1.5">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSendMessage(q)}
                      className="text-left text-xs bg-white hover:bg-neutral-100 text-neutral-800 p-2 rounded-xs border border-neutral-200 transition-colors cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-neutral-200">
            <div className="flex items-center gap-1.5 bg-neutral-50 border border-neutral-300 rounded-xs px-2.5 py-1.5 focus-within:border-black transition-colors">
              <input
                id="getai-chat-input"
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask GET AI about services or your project..."
                className="flex-1 bg-transparent text-xs text-black placeholder:text-neutral-400 focus:outline-hidden"
              />
              <button
                id="getai-chat-send-btn"
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isTyping}
                className="p-1.5 bg-black text-white rounded-xs hover:bg-neutral-800 disabled:opacity-30 transition-colors cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="mt-1.5 flex items-center justify-between text-[10px] text-neutral-400 font-mono">
              <span>GET AI Agency Assistant</span>
              <button
                onClick={() => {
                  navigate('/contact');
                  setIsOpen(false);
                }}
                className="text-neutral-700 hover:text-black hover:underline cursor-pointer"
              >
                Start a Project ↗
              </button>
            </div>
          </div>

        </div>
      )}

      {/* Trigger Button: "GET AI" */}
      <div className="flex justify-end">
        <button
          id="getai-chat-trigger"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2.5 bg-black text-white hover:bg-neutral-800 rounded-xs shadow-lg transition-all cursor-pointer border border-neutral-800 group"
          aria-label={isOpen ? 'Close GET AI Assistant' : 'Open GET AI Assistant'}
        >
          {isOpen ? (
            <>
              <X className="w-4 h-4 text-neutral-300" />
              <span className="text-xs font-bold uppercase tracking-wider">Close</span>
            </>
          ) : (
            <>
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider">GET AI</span>
              <MessageSquare className="w-3.5 h-3.5 text-neutral-300 ml-0.5" />
            </>
          )}
        </button>
      </div>

    </div>
  );
};
