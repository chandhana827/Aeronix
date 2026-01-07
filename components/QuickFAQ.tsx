
import React, { useState } from 'react';
import { LOCALIZED_FAQS } from '../translations';
import { Language } from '../types';

interface QuickFAQProps {
  language: Language;
}

export const QuickFAQ: React.FC<QuickFAQProps> = ({ language }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = LOCALIZED_FAQS[language] || LOCALIZED_FAQS.en;

  return (
    <div className="space-y-4">
      {faqs.map((faq, idx) => (
        <div key={idx} className="bg-white border border-slate-100 rounded-2xl overflow-hidden transition-all shadow-sm">
          <button
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase">
                {faq.category}
              </span>
              <span className="text-sm font-semibold text-slate-800">{faq.question}</span>
            </div>
            <span className={`text-slate-400 transition-transform ${openIndex === idx ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          {openIndex === idx && (
            <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-50 animate-in slide-in-from-top-1 duration-200">
              <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
