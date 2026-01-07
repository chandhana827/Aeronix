
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { Language } from '../types';

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

interface LiveAssistantProps {
  language: Language;
}

export const LiveAssistant: React.FC<LiveAssistantProps> = ({ language }) => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [transcript, setTranscript] = useState<string[]>([]);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);

  const startSession = async () => {
    setIsConnecting(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    const inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
    const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    audioContextRef.current = outputAudioContext;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsActive(true);
            setIsConnecting(false);
            const source = inputAudioContext.createMediaStreamSource(stream);
            const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) int16[i] = inputData[i] * 32768;
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContext.destination);
          },
          onmessage: async (message) => {
            if (message.serverContent?.outputTranscription) {
              setTranscript(prev => [...prev.slice(-4), `Assistant: ${message.serverContent.outputTranscription.text}`]);
            }
            if (message.serverContent?.inputTranscription) {
              setTranscript(prev => [...prev.slice(-4), `You: ${message.serverContent.inputTranscription.text}`]);
            }

            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputAudioContext.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64Audio), outputAudioContext, 24000, 1);
              const source = outputAudioContext.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputAudioContext.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => {
            setIsActive(false);
            setIsConnecting(false);
          },
          onerror: (e) => console.error('Live Assistant Error:', e),
        },
        config: {
          responseModalities: [Modality.AUDIO],
          outputAudioTranscription: {},
          inputAudioTranscription: {},
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
          systemInstruction: `You are Aeronix Voice Assistant. Help passengers with airport ground operations hands-free. Respond only in the language code: ${language}. Be brief, reassuring, and clear.`,
        }
      });
      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      setIsConnecting(false);
    }
  };

  const stopSession = () => {
    if (sessionRef.current) sessionRef.current.close();
    setIsActive(false);
  };

  // Auto-stop if language changes significantly or component unmounts
  useEffect(() => {
    return () => {
      if (sessionRef.current) sessionRef.current.close();
    };
  }, []);

  return (
    <div className="bg-slate-900 rounded-2xl p-6 text-white overflow-hidden relative">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold">AeroVoice Mode</h3>
          <p className="text-xs text-slate-400">Speech support in {language.toUpperCase()}</p>
        </div>
        <button
          onClick={isActive ? stopSession : startSession}
          disabled={isConnecting}
          className={`px-4 md:px-6 py-2 rounded-full font-bold transition-all flex items-center gap-2 text-sm ${
            isActive ? 'bg-rose-500 hover:bg-rose-600' : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20'
          }`}
        >
          {isConnecting ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : isActive ? 'Stop' : 'Start Voice'}
        </button>
      </div>

      <div className="min-h-[80px] bg-slate-800/50 rounded-xl p-4 flex flex-col justify-center items-center gap-4">
        {isActive ? (
          <>
            <div className="flex gap-1 items-center h-8">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-1 bg-blue-400 rounded-full animate-bounce" 
                  style={{ height: `${20 + Math.random() * 80}%`, animationDelay: `${i * 0.1}s` }} 
                />
              ))}
            </div>
            <div className="w-full text-center">
              {transcript.length > 0 ? (
                <p className="text-xs italic text-blue-200 line-clamp-2">"{transcript[transcript.length - 1]}"</p>
              ) : (
                <p className="text-xs text-slate-500">Listening in {language.toUpperCase()}...</p>
              )}
            </div>
          </>
        ) : (
          <div className="text-center text-slate-500 text-sm">
            Press start for voice guidance.
          </div>
        )}
      </div>
      
      {isActive && (
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      )}
    </div>
  );
};
