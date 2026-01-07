
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PEAK_HOURS_DATA } from '../constants';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../translations';

interface StatsVisualizerProps {
  language: Language;
}

export const StatsVisualizer: React.FC<StatsVisualizerProps> = ({ language }) => {
  const t = UI_TRANSLATIONS[language]?.stats || UI_TRANSLATIONS.en.stats;

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-slate-800 text-sm">{t.loadDesc.split(' based')[0]}</h3>
          <p className="text-[10px] text-slate-500">{t.loadDesc}</p>
        </div>
        <div className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[10px] font-semibold">
          {t.traffic}
        </div>
      </div>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={PEAK_HOURS_DATA}>
            <defs>
              <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              itemStyle={{ color: '#3b82f6', fontSize: '12px' }}
            />
            <Area 
              type="monotone" 
              dataKey="load" 
              stroke="#3b82f6" 
              fillOpacity={1} 
              fill="url(#colorLoad)" 
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
          <p className="text-[10px] uppercase font-bold text-slate-400">{t.waitTime}</p>
          <p className="text-lg font-bold text-slate-800">~18 mins</p>
          <p className="text-[10px] text-emerald-500">{t.normal}</p>
        </div>
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
          <p className="text-[10px] uppercase font-bold text-slate-400">{t.securityStatus}</p>
          <p className="text-lg font-bold text-slate-800">Operational</p>
          <p className="text-[10px] text-amber-500">{t.staffing}</p>
        </div>
      </div>
    </div>
  );
};
