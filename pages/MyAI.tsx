
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiChat } from '../services/gemini';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const MyAI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hello! I'm MaaSakhi, your AI companion. How are you feeling today? Remember, I'm here to listen and help, but always talk to your doctor for medical advice." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      
      const chat = await getGeminiChat(history);
      const result = await chat.sendMessage({ message: userMessage });
      const responseText = result.text;

      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "I'm having a little trouble connecting right now. Please try again in a moment, dear." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "I'm feeling very tired lately.",
    "What should I eat in the 2nd trimester?",
    "Tips for better sleep tonight?",
    "Is it normal to have mild cramping?"
  ];

  return (
    <div className="h-screen pt-16 pb-20 md:pb-6 md:pl-64 flex flex-col">
      {/* Header */}
      <div className="bg-white/50 backdrop-blur-md p-4 border-b border-pink-50 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white">
          <i className="fa-solid fa-robot"></i>
        </div>
        <div>
          <h2 className="font-bold text-gray-800">MaaSakhi AI</h2>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] text-gray-500 font-medium">Empathetic Assistant</span>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-pink-50/20">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-3xl ${
              msg.role === 'user' 
                ? 'bg-pink-600 text-white rounded-tr-none shadow-lg' 
                : 'bg-white text-gray-800 rounded-tl-none border border-pink-50 shadow-sm'
            }`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-3xl rounded-tl-none border border-pink-50 flex gap-2">
              <div className="w-2 h-2 bg-pink-300 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-pink-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-pink-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length < 3 && !isLoading && (
        <div className="p-4 flex gap-2 overflow-x-auto whitespace-nowrap hide-scrollbar bg-pink-50/20">
          {suggestions.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setInput(s)}
              className="px-4 py-2 bg-white border border-pink-100 rounded-full text-xs font-medium text-pink-600 hover:bg-pink-50 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-pink-50">
        <div className="flex gap-2 max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything, e.g. 'I feel a bit stressed'..."
            className="flex-1 bg-gray-50 border border-gray-100 rounded-2xl px-6 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200 text-sm"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-pink-600 text-white w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-pink-700 transition-all disabled:opacity-50"
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
        <p className="text-[10px] text-gray-400 text-center mt-3">
          AI can make mistakes. Consider checking important information with your doctor.
        </p>
      </div>
    </div>
  );
};

export default MyAI;
