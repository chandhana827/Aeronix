
import React from 'react';
import { GUIDES } from '../constants';
import { LOCALIZED_GUIDES } from '../translations';
import { Language, GroundOpGuide } from '../types';

interface ProcessGuideProps {
  language: Language;
  onSelectGuide: (guide: GroundOpGuide) => void;
}

export const ProcessGuide: React.FC<ProcessGuideProps> = ({ language, onSelectGuide }) => {
  const localizedGuides = LOCALIZED_GUIDES[language] || LOCALIZED_GUIDES.en;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {localizedGuides.map((lGuide, idx) => {
        // We find the original guide object to keep consistent styling/icons, but use translated text
        const original = GUIDES[idx];
        const displayGuide: GroundOpGuide = {
          ...original,
          title: lGuide.title,
          description: lGuide.desc,
          steps: lGuide.steps
        };

        return (
          <button
            key={original.id}
            onClick={() => onSelectGuide(displayGuide)}
            className="group relative flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-100 overflow-hidden"
          >
            <div className={`w-12 h-12 rounded-full ${original.color} text-white flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
              {original.icon}
            </div>
            <h3 className="font-bold text-slate-800 text-center text-sm">{displayGuide.title}</h3>
            <p className="text-[11px] text-slate-500 text-center mt-2 line-clamp-2 leading-tight">
              {displayGuide.description}
            </p>
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-blue-500 group-hover:w-full transition-all duration-300" />
          </button>
        );
      })}
    </div>
  );
};
