
export enum AirportStage {
  CHECK_IN = 'Check-in',
  SECURITY = 'Security',
  TERMINAL = 'Terminal/Lounge',
  BOARDING = 'Boarding',
  BAGGAGE = 'Baggage Claim'
}

export type Language = 'en' | 'es' | 'fr' | 'de' | 'zh' | 'ja' | 'hi' | 'bn' | 'te' | 'mr' | 'ta';

export type PassengerType = 'standard' | 'business' | 'family' | 'mobility';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface GroundOpGuide {
  id: AirportStage;
  title: string;
  description: string;
  steps: string[];
  icon: string;
  color: string;
}

export interface TerminalZone {
  id: string;
  name: string;
  status: 'Clear' | 'Busy' | 'Crowded';
  waitTime: number;
  description: string;
  x: number;
  y: number;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface KBEntry {
  keywords: string[];
  content: string;
}
