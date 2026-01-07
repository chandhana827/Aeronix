
import React from 'react';
import { TERMINAL_ZONES } from '../constants';
import { TerminalZone } from '../types';

interface TerminalMapProps {
  onSelectZone: (zone: TerminalZone) => void;
  selectedZone: TerminalZone | null;
}

export const TerminalMap: React.FC<TerminalMapProps> = ({ onSelectZone, selectedZone }) => {
  return (
    <div className="relative bg-slate-100 rounded-3xl p-6 border border-slate-200 overflow-hidden min-h-[400px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-slate-800">Terminal Interactive Layout</h3>
        <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Clear</span>
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500" /> Busy</span>
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-rose-500" /> Crowded</span>
        </div>
      </div>

      <svg viewBox="0 0 100 100" className="w-full h-full max-h-[300px] drop-shadow-sm">
        {/* Terminal Walls */}
        <path d="M10,20 L90,20 L90,80 L10,80 Z" fill="none" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2,2" />
        
        {/* Connection paths */}
        <path d="M25,30 Q50,25 75,30" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
        <path d="M50,30 L50,70" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />

        {/* Zones */}
        {TERMINAL_ZONES.map((zone) => {
          const isSelected = selectedZone?.id === zone.id;
          const statusColor = zone.status === 'Clear' ? '#10b981' : zone.status === 'Busy' ? '#f59e0b' : '#ef4444';
          
          return (
            <g key={zone.id} onClick={() => onSelectZone(zone)} className="cursor-pointer">
              <circle 
                cx={zone.x} 
                cy={zone.y} 
                r={isSelected ? 5 : 3} 
                fill={statusColor} 
                className={`transition-all duration-300 ${isSelected ? 'stroke-white stroke-[2px]' : ''}`}
              />
              {isSelected && (
                <circle cx={zone.x} cy={zone.y} r={8} fill={statusColor} opacity="0.2" className="animate-ping" />
              )}
              <text 
                x={zone.x} 
                y={zone.y - 6} 
                textAnchor="middle" 
                fontSize="3" 
                className={`font-bold fill-slate-600 transition-opacity ${isSelected ? 'opacity-100' : 'opacity-60'}`}
              >
                {zone.name}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Zone Details Overlay */}
      <div className={`mt-6 p-4 rounded-2xl transition-all duration-300 ${selectedZone ? 'bg-white opacity-100 translate-y-0' : 'bg-transparent opacity-0 translate-y-4'}`}>
        {selectedZone && (
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-blue-600 uppercase mb-1">Detailed Status</p>
              <h4 className="font-bold text-slate-800">{selectedZone.name}</h4>
              <p className="text-xs text-slate-500 mt-1">{selectedZone.description}</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-slate-800">{selectedZone.waitTime} min</div>
              <p className="text-[10px] text-slate-400">EST. WAIT</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
