import React, { useState, useEffect } from 'react';
import { X, Flame } from 'lucide-react';
import { getMotivationalQuote } from '../services/geminiService';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  examDate: Date;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose, examDate }) => {
  const [quote, setQuote] = useState<string>("Loading injection of will power...");
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (isOpen) {
      setQuote("Analyzing resolve...");
      getMotivationalQuote("the user feels like giving up on their dreams").then(setQuote);
    }
  }, [isOpen]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = examDate.getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [examDate]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 text-white p-6 animate-in fade-in duration-300">
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white transition-colors"
      >
        <X size={32} />
      </button>

      <div className="max-w-2xl w-full text-center space-y-12">
        <div className="flex justify-center mb-8">
          <div className="p-4 bg-red-600/20 rounded-full animate-pulse">
            <Flame size={64} className="text-red-500" />
          </div>
        </div>

        <div>
          <h2 className="text-xl md:text-2xl font-bold text-red-500 tracking-widest uppercase mb-4">Time Remaining</h2>
          <div className="grid grid-cols-4 gap-4 text-center">
             <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
               <span className="block text-4xl md:text-6xl font-mono font-bold text-white">{timeLeft.days}</span>
               <span className="text-xs text-gray-400 uppercase">Days</span>
             </div>
             <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
               <span className="block text-4xl md:text-6xl font-mono font-bold text-white">{timeLeft.hours}</span>
               <span className="text-xs text-gray-400 uppercase">Hours</span>
             </div>
             <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
               <span className="block text-4xl md:text-6xl font-mono font-bold text-white">{timeLeft.minutes}</span>
               <span className="text-xs text-gray-400 uppercase">Mins</span>
             </div>
             <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
               <span className="block text-4xl md:text-6xl font-mono font-bold text-red-500">{timeLeft.seconds}</span>
               <span className="text-xs text-gray-400 uppercase">Secs</span>
             </div>
          </div>
        </div>

        <div className="space-y-4">
           <h3 className="text-gray-400 uppercase tracking-widest text-sm">Protocol Message</h3>
           <blockquote className="text-2xl md:text-4xl font-serif italic text-white leading-relaxed">
             "{quote}"
           </blockquote>
        </div>

        <button 
          onClick={onClose}
          className="mt-8 px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors rounded-sm w-full md:w-auto"
        >
          Return to The Grind
        </button>
      </div>
    </div>
  );
};