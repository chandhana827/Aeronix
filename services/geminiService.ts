
import { GoogleGenAI } from "@google/genai";
import { Language, PassengerType } from "../types";
import { KNOWLEDGE_BASE } from "../constants";

const SYSTEM_INSTRUCTION_BASE = `
You are Aeronix, a world-class AI assistant specialized in Airport Ground Operations. 
Your goal is to provide clear, helpful, and reassuring explanations about airport processes.

STRICT RULES:
1. DO NOT issue boarding passes or modify flight details.
2. DO NOT provide specific live flight status (gates/times) unless it's in the provided context.
3. Keep answers concise and structured using bullet points.
4. If asked for something out of scope, politely redirect to the helpdesk.
5. Provide "Pro-tips" relevant to the passenger's situation.
`;

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  private getRelevantContext(query: string): string {
    const q = query.toLowerCase();
    const matches = KNOWLEDGE_BASE.filter(entry => 
      entry.keywords.some(k => q.includes(k))
    );
    
    if (matches.length === 0) return "";
    
    return "\n\nRELEVANT LOCAL AIRPORT INFO:\n" + 
      matches.map(m => m.content).join("\n");
  }

  async sendMessage(
    message: string, 
    history: {role: string, content: string}[], 
    language: Language = 'en',
    passengerType: PassengerType = 'standard'
  ) {
    try {
      const localContext = this.getRelevantContext(message);
      const languageInstruction = `Respond ONLY in the following language: ${language}.`;
      const passengerInstruction = `The user is a ${passengerType} passenger. Tailor your advice to their needs (e.g., if family, mention kid zones; if mobility, mention elevators).`;
      
      const fullSystemInstruction = `${SYSTEM_INSTRUCTION_BASE}\n${languageInstruction}\n${passengerInstruction}\n${localContext}`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...history.map(h => ({ 
            role: h.role === 'assistant' ? 'model' : 'user', 
            parts: [{ text: h.content }] 
          })),
          { role: 'user', parts: [{ text: message }] }
        ],
        config: {
          systemInstruction: fullSystemInstruction,
          temperature: 0.7,
        }
      });

      return response.text || "I'm sorry, I couldn't process that request.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "I'm having trouble connecting to my brain. Please try again in a moment.";
    }
  }
}

export const gemini = new GeminiService();
