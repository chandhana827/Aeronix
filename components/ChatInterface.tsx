
import React, { useState, useRef, useEffect } from 'react';
import { gemini } from '../services/geminiService';
import { ChatMessage, Language, PassengerType } from '../types';
import { UI_TRANSLATIONS } from '../translations';

interface ChatInterfaceProps {
  language: Language;
  passengerType: PassengerType;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ language, passengerType }) => {
  const t = UI_TRANSLATIONS[language]?.chat || UI_TRANSLATIONS.en.chat;
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: t.assistantGreeting,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Update greeting if language changes and messages list only contains the initial greeting
  useEffect(() => {
    if (messages.length === 1 && messages[0].role === 'assistant') {
      setMessages([{
        role: 'assistant',
        content: t.assistantGreeting,
        timestamp: new Date()
      }]);
    }
  }, [language, t.assistantGreeting]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({ role: m.role, content: m.content }));
    const aiResponse = await gemini.sendMessage(input, history, language, passengerType);
    
    setMessages(prev => [...prev, { role: 'assistant', content: aiResponse, timestamp: new Date() }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[500px] bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
      <div className="bg-slate-800 p-4 text-white flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-sm">Aeronix</span>
        </div>
        <div className="text-[10px] uppercase font-bold text-slate-400 bg-slate-700/50 px-2 py-0.5 rounded">
          {language} | {passengerType}
        </div>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
              msg.role === 'user' 
              ? 'bg-blue-600 text-white rounded-br-none shadow-md' 
              : 'bg-white text-slate-800 shadow-sm border border-slate-100 rounded-bl-none'
            }`}>
              {msg.content.split('\n').map((line, i) => (
                <p key={i} className={line.startsWith('-') || line.startsWith('*') ? 'ml-4' : 'mb-1 last:mb-0'}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 rounded-bl-none animate-pulse text-slate-400 text-xs italic">
              ...
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t flex gap-2">
        <input
          type="text"
          lang={language}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder={t.placeholder}
          className="flex-1 border border-slate-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          spellCheck={true}
          autoComplete="on"
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors disabled:bg-slate-400 font-bold text-sm"
        >
          {t.send}
        </button>
      </div>
    </div>
  );
};
