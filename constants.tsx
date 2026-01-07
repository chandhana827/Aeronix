
import { AirportStage, GroundOpGuide, TerminalZone, FAQItem, KBEntry } from './types';

export const GUIDES: GroundOpGuide[] = [
  {
    id: AirportStage.CHECK_IN,
    title: "Step 1: Check-in",
    description: "Register your presence and drop off large luggage.",
    steps: [
      "Locate your airline's kiosk or counter.",
      "Have your passport/ID and booking reference ready.",
      "Tag your checked bags and receive your baggage claim stickers.",
      "Collect your physical or digital boarding pass."
    ],
    icon: "🎟️",
    color: "bg-blue-500"
  },
  {
    id: AirportStage.SECURITY,
    title: "Step 2: Security",
    description: "Screening of passengers and carry-on items.",
    steps: [
      "Remove liquids (max 100ml/3.4oz) and large electronics from bags.",
      "Place jacket, belt, and metal items in the bins.",
      "Pass through the metal detector or body scanner.",
      "Collect all belongings promptly to keep the line moving."
    ],
    icon: "🛡️",
    color: "bg-amber-500"
  },
  {
    id: AirportStage.TERMINAL,
    title: "Step 3: Terminal",
    description: "Navigate to your gate and relax.",
    steps: [
      "Check flight information screens for your gate number.",
      "Listen for announcements regarding gate changes or delays.",
      "Explore duty-free shops, lounges, and dining options.",
      "Arrive at the gate at least 45 minutes before departure."
    ],
    icon: "🏬",
    color: "bg-indigo-500"
  },
  {
    id: AirportStage.BOARDING,
    title: "Step 4: Boarding",
    description: "Entering the aircraft based on priority groups.",
    steps: [
      "Wait for your boarding group to be called.",
      "Have your boarding pass and ID visible for scanning.",
      "Follow the jet bridge to the aircraft.",
      "Locate your seat and stow carry-on luggage efficiently."
    ],
    icon: "✈️",
    color: "bg-emerald-500"
  },
  {
    id: AirportStage.BAGGAGE,
    title: "Step 5: Baggage Claim",
    description: "Retrieving your checked luggage after arrival.",
    steps: [
      "Follow 'Baggage Claim' signs to the arrivals hall.",
      "Find the carousel number assigned to your flight.",
      "Verify the luggage is yours by checking the tag names.",
      "Report any missing or damaged bags at the airline service desk."
    ],
    icon: "🧳",
    color: "bg-rose-500"
  }
];

export const TERMINAL_ZONES: TerminalZone[] = [
  { id: 'z1', name: 'Zone A: Main Check-in', status: 'Busy', waitTime: 25, description: 'International departures hub.', x: 20, y: 30 },
  { id: 'z2', name: 'Zone B: Security North', status: 'Clear', waitTime: 8, description: 'Fast-track and priority lane.', x: 50, y: 25 },
  { id: 'z3', name: 'Zone C: Duty Free Central', status: 'Crowded', waitTime: 0, description: 'Main shopping and dining plaza.', x: 60, y: 50 },
  { id: 'z4', name: 'Zone D: Gate 1-20', status: 'Busy', waitTime: 12, description: 'Regional flight departures.', x: 80, y: 70 },
  { id: 'z5', name: 'Zone E: Baggage Hall', status: 'Clear', waitTime: 15, description: 'Arrivals and customs area.', x: 30, y: 80 },
];

export const PEAK_HOURS_DATA = [
  { hour: '04:00', load: 30 },
  { hour: '06:00', load: 85 },
  { hour: '08:00', load: 95 },
  { hour: '10:00', load: 70 },
  { hour: '12:00', load: 60 },
  { hour: '14:00', load: 80 },
  { hour: '16:00', load: 90 },
  { hour: '18:00', load: 85 },
  { hour: '20:00', load: 50 },
  { hour: '22:00', load: 20 },
];

export const FAQS: FAQItem[] = [
  {
    category: "Liquids",
    question: "How much liquid can I bring?",
    answer: "Each container must be 100ml (3.4oz) or less. All containers must fit in one clear, quart-sized bag."
  },
  {
    category: "Documents",
    question: "Do I need a physical boarding pass?",
    answer: "Most airlines accept digital passes on your phone, but it's always safe to have a backup or use a self-service kiosk."
  },
  {
    category: "Arrival",
    question: "How early should I arrive?",
    answer: "Generally 2 hours for domestic flights and 3 hours for international flights is recommended."
  },
  {
    category: "Lounge",
    question: "Where are the lounges?",
    answer: "Most lounges are located in Terminal 2, Level 3, near Gate B12 and Gate C4."
  }
];

export const KNOWLEDGE_BASE: KBEntry[] = [
  {
    keywords: ["power", "charging", "plug", "outlet"],
    content: "Charging stations are available at every gate. Premium USB-C ports are found near Gate A5 and B10."
  },
  {
    keywords: ["water", "refill", "drink", "fountain"],
    content: "Filtered water refill stations are located next to every set of restrooms throughout the terminal."
  },
  {
    keywords: ["pharmacy", "medicine", "doctor", "health"],
    content: "A 24/7 pharmacy is located in Terminal 1, landside, near the main entrance."
  },
  {
    keywords: ["pet", "dog", "animal", "relief"],
    content: "Pet relief areas are located outside Terminal 1 (Area B) and inside Terminal 2 near Gate D1."
  },
  {
    keywords: ["smoking", "cigarette"],
    content: "The terminal is smoke-free. Designated smoking areas are available outside the departure level."
  }
];

export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'bn', name: 'বাংলা', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
  { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
  { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
];

export const PASSENGER_TYPES = [
  { id: 'standard', name: 'Standard', icon: '👤', description: 'General travelers' },
  { id: 'business', name: 'Business', icon: '💼', description: 'Speed & efficiency' },
  { id: 'family', name: 'Family', icon: '👨‍👩‍👧', description: 'Strollers & play areas' },
  { id: 'mobility', name: 'Reduced Mobility', icon: '♿', description: 'Access & support' },
];
