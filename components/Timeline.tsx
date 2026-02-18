import React from 'react';
import { Clock, Coffee, Monitor, Video, Moon } from 'lucide-react';

interface Block {
  start: string;
  end: string;
  activity: string;
  type: 'study' | 'youtube' | 'rest' | 'health';
  icon: React.ReactNode;
}

export const Timeline: React.FC = () => {
  const schedule: Block[] = [
    { start: '06:00', end: '08:00', activity: 'Wake Up & Routine', type: 'health', icon: <Coffee size={16} /> },
    { start: '08:00', end: '12:00', activity: 'Deep Study Block A', type: 'study', icon: <Monitor size={16} /> },
    { start: '12:00', end: '13:00', activity: 'Lunch & Reset', type: 'rest', icon: <Clock size={16} /> },
    { start: '13:00', end: '16:00', activity: 'YouTube Production', type: 'youtube', icon: <Video size={16} /> },
    { start: '16:00', end: '20:00', activity: 'Deep Study Block B', type: 'study', icon: <Monitor size={16} /> },
    { start: '20:00', end: '22:00', activity: 'Dinner & Wind Down', type: 'rest', icon: <Coffee size={16} /> },
    { start: '22:00', end: '06:00', activity: 'Sleep Recovery', type: 'health', icon: <Moon size={16} /> },
  ];

  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
       <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Clock className="text-blue-400" />
        24-Hour Protocol
      </h2>
      
      <div className="relative border-l-2 border-gray-800 ml-4 space-y-0">
        {schedule.map((block, idx) => {
          const startHour = parseInt(block.start.split(':')[0]);
          const endHour = parseInt(block.end.split(':')[0]);
          // Adjust end hour for overnight block (22:00 - 06:00)
          const adjustedEndHour = endHour < startHour ? endHour + 24 : endHour;
          
          const isActive = currentHour >= startHour && currentHour < adjustedEndHour;
          
          let colorClass = "bg-gray-800 border-gray-700 text-gray-400";
          if (block.type === 'study') colorClass = "bg-sprint-exam/10 border-sprint-exam text-sprint-exam";
          if (block.type === 'youtube') colorClass = "bg-sprint-youtube/10 border-sprint-youtube text-sprint-youtube";
          if (block.type === 'health') colorClass = "bg-emerald-500/10 border-emerald-500 text-emerald-500";
          
          if (isActive) {
             colorClass += " ring-2 ring-white ring-offset-2 ring-offset-slate-900";
          }

          return (
            <div key={idx} className="relative pl-8 py-4">
              <div className={`absolute -left-[9px] top-6 w-4 h-4 rounded-full border-2 ${isActive ? 'bg-white border-white' : 'bg-gray-900 border-gray-600'}`}></div>
              
              <div className={`p-4 rounded-lg border ${colorClass} transition-all`}>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono font-bold text-lg">{block.start} - {block.end}</span>
                  {isActive && <span className="text-xs bg-white text-black px-2 py-0.5 rounded font-bold animate-pulse">NOW</span>}
                </div>
                <div className="flex items-center gap-2 font-medium text-white">
                  {block.icon}
                  {block.activity}
                </div>
                <div className="text-xs opacity-70 mt-1 uppercase tracking-wide">
                    {block.type === 'study' ? '4 Hours Focus' : block.type === 'youtube' ? '3 Hours Create' : 'Recharge'}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
