
import React, { useState, useEffect } from 'react';
import { ProcessGuide } from './components/ProcessGuide';
import { ChatInterface } from './components/ChatInterface';
import { StatsVisualizer } from './components/StatsVisualizer';
import { TerminalMap } from './components/TerminalMap';
import { LiveAssistant } from './components/LiveAssistant';
import { QuickFAQ } from './components/QuickFAQ';
import { GroundOpGuide, TerminalZone, Language, PassengerType } from './types';
import { LANGUAGES, PASSENGER_TYPES } from './constants';
import { UI_TRANSLATIONS } from './translations';

const App: React.FC = () => {
  const [selectedGuide, setSelectedGuide] = useState<GroundOpGuide | null>(null);
  const [selectedZone, setSelectedZone] = useState<TerminalZone | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [passengerType, setPassengerType] = useState<PassengerType>('standard');

  const currentLanguage = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  // Update HTML lang attribute to help OS-level keyboards switch layout automatically
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <nav className="glass sticky top-0 z-50 px-4 md:px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4 md:gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold">A</div>
            <span className="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 truncate">
              Aeronix
            </span>
          </div>
          
          {/* Language Selector Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-xl text-xs font-bold transition-colors border border-slate-200">
              <span className="text-base">{currentLanguage.flag}</span>
              <span className="hidden sm:inline">{currentLanguage.name}</span>
              <svg className="w-3 h-3 text-slate-400 group-hover:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute left-0 top-full mt-2 w-40 bg-white rounded-2xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2 z-[100] max-h-[400px] overflow-y-auto">
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as Language)}
                  className={`w-full text-left p-2.5 rounded-xl transition-colors hover:bg-slate-50 flex items-center gap-3 ${
                    language === lang.code ? 'bg-blue-50 text-blue-600' : 'text-slate-700'
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span className="text-xs font-bold">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <div className="hidden lg:flex gap-4 text-xs font-medium text-slate-500 mr-4">
             <a href="#" className="hover:text-blue-600 transition-colors">{t.nav.map}</a>
             <a href="#" className="hover:text-blue-600 transition-colors">{t.nav.terminals}</a>
          </div>
          {/* Passenger Type Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-2 bg-slate-900 text-white px-3 md:px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors">
              <span>{PASSENGER_TYPES.find(p => p.id === passengerType)?.icon}</span>
              <span className="hidden md:inline">{PASSENGER_TYPES.find(p => p.id === passengerType)?.name}</span>
            </button>
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2 z-[100]">
              {PASSENGER_TYPES.map(p => (
                <button
                  key={p.id}
                  onClick={() => setPassengerType(p.id as PassengerType)}
                  className={`w-full text-left p-3 rounded-xl transition-colors hover:bg-slate-50 ${
                    passengerType === p.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span>{p.icon}</span>
                    <span className={`text-xs font-bold ${passengerType === p.id ? 'text-blue-600' : 'text-slate-800'}`}>
                      {p.name}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400">{p.description}</p>
                </button>
              ))}
            </div>
          </div>
          <button className="hidden lg:block bg-blue-600 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-lg shadow-blue-500/20">
            {t.nav.helpdesk}
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 md:px-6 mt-8 space-y-12">
        {/* Hero Section */}
        <section className="relative rounded-3xl overflow-hidden bg-slate-900 text-white p-8 md:p-16">
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-20 pointer-events-none">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
              <path fill="#3b82f6" d="M40.3,-68.8C52.7,-61.6,63.6,-51.7,71.2,-39.7C78.7,-27.6,83,-13.8,81.4,-0.9C79.8,11.9,72.4,23.8,63.3,34.1C54.2,44.4,43.4,53,31.7,61.4C20,69.8,7.3,77.9,-5.3,87.1C-17.9,96.3,-30.4,106.5,-41,102.5C-51.6,98.5,-60.2,80.3,-66.9,64.9C-73.6,49.5,-78.4,36.9,-81.4,24.3C-84.4,11.7,-85.5,-1,-82.7,-12.9C-79.8,-24.8,-73.1,-35.8,-64,-45.3C-54.9,-54.8,-43.4,-62.7,-31.8,-70.2C-20.3,-77.7,-8.7,-84.8,2.7,-89.6C14.1,-94.3,27.9,-76,40.3,-68.8Z" transform="translate(100 100)" />
            </svg>
          </div>
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              {t.hero.tag}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              {t.hero.title}
            </h1>
            <p className="text-slate-400 text-lg mb-8">
              {t.hero.desc}
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg shadow-blue-500/25"
              >
                {t.hero.cta1}
              </button>
              <div className="bg-white/10 text-white backdrop-blur-md px-6 py-3 rounded-full font-bold flex items-center gap-3">
                <span className="text-xs uppercase opacity-60">Status:</span>
                <span className="text-emerald-400">OPERATIONAL</span>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Map Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-800">{t.sections.mapTitle}</h2>
              <p className="text-slate-500">{t.sections.mapDesc}</p>
            </div>
            <TerminalMap onSelectZone={setSelectedZone} selectedZone={selectedZone} />
            <div className="mt-8">
              <h3 className="text-lg font-bold text-slate-800 mb-4">{t.sections.faqTitle}</h3>
              <QuickFAQ language={language} />
            </div>
          </div>
          <div className="lg:col-span-4 space-y-6">
            <LiveAssistant language={language} />
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-2">{t.sections.analyticsTitle}</h3>
              <p className="text-sm text-slate-500 mb-4">{t.sections.analyticsDesc}</p>
              <StatsVisualizer language={language} />
            </div>
            {/* Passenger Mode Context Tip */}
            <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl">
              <h4 className="font-bold text-indigo-800 mb-2 flex items-center gap-2">
                <span>💡</span> Travel Pro-Tip
              </h4>
              <p className="text-xs text-indigo-700 leading-relaxed">
                {t.proTips[passengerType]}
              </p>
            </div>
          </div>
        </section>

        {/* Core Steps */}
        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">{t.sections.checklistTitle}</h2>
              <p className="text-slate-500">{t.sections.checklistDesc}</p>
            </div>
          </div>
          <ProcessGuide language={language} onSelectGuide={setSelectedGuide} />
        </section>

        {/* Modal-like Detail View for Selected Guide */}
        {selectedGuide && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
              <div className={`${selectedGuide.color} p-8 text-white relative`}>
                <button 
                  onClick={() => setSelectedGuide(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 flex items-center justify-center hover:bg-black/30 text-white"
                >
                  ✕
                </button>
                <div className="text-4xl mb-2">{selectedGuide.icon}</div>
                <h2 className="text-3xl font-bold">{selectedGuide.title}</h2>
                <p className="opacity-90">{selectedGuide.description}</p>
              </div>
              <div className="p-8">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
                  Guide Details
                </h3>
                <div className="space-y-4">
                  {selectedGuide.steps.map((step, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-8 border-t border-slate-100 flex justify-end">
                  <button 
                    onClick={() => setSelectedGuide(null)}
                    className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold hover:bg-slate-800 transition-colors"
                  >
                    Got it!
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Chat Support */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12">
          <div className="lg:col-span-12">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-slate-800">{t.sections.assistantTitle}</h2>
              <p className="text-slate-500 text-sm">
                Chatting in <span className="text-blue-600 font-bold">{currentLanguage.name}</span> for your {passengerType} journey.
              </p>
            </div>
            <ChatInterface language={language} passengerType={passengerType} />
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-600 text-white w-6 h-6 rounded flex items-center justify-center text-xs font-bold">A</div>
              <span className="font-bold text-slate-800 text-lg">Aeronix Operations</span>
            </div>
            <p className="text-slate-500 text-sm max-w-sm">
              {t.footer.desc}
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 mb-4">{t.footer.info}</h4>
            <ul className="text-sm text-slate-500 space-y-2">
              <li><a href="#" className="hover:text-blue-600 transition-colors">{t.nav.terminals}</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">{t.nav.safety}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 mb-4">{t.footer.system}</h4>
            <ul className="text-sm text-slate-500 space-y-2">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Gemini Live API</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
