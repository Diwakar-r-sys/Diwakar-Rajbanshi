import React, { useState } from 'react';
import { Sun, Moon, Save } from 'lucide-react';
import { DailyLog } from '../types';

interface CheckInModalProps {
  type: 'MORNING' | 'NIGHT' | null;
  onClose: () => void;
  onSave: (data: Partial<DailyLog>) => void;
}

export const CheckInModal: React.FC<CheckInModalProps> = ({ type, onClose, onSave }) => {
  const [priorities, setPriorities] = useState<string[]>(['', '', '']);
  const [tasksCompleted, setTasksCompleted] = useState(false);
  const [focusScore, setFocusScore] = useState(5);

  if (!type) return null;

  const handlePriorityChange = (index: number, value: string) => {
    const newPriorities = [...priorities];
    newPriorities[index] = value;
    setPriorities(newPriorities);
  };

  const handleSubmit = () => {
    if (type === 'MORNING') {
      onSave({ priorities: priorities.filter(p => p.trim() !== '') });
    } else {
      onSave({ tasksCompleted, focusScore });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 p-4">
      <div className="bg-sprint-card w-full max-w-md rounded-xl border border-gray-700 shadow-2xl p-6 relative">
        <div className="flex items-center gap-3 mb-6">
          {type === 'MORNING' ? (
            <div className="p-3 bg-amber-500/20 rounded-full">
              <Sun className="text-amber-500" size={24} />
            </div>
          ) : (
            <div className="p-3 bg-indigo-500/20 rounded-full">
              <Moon className="text-indigo-500" size={24} />
            </div>
          )}
          <div>
            <h2 className="text-xl font-bold text-white">
              {type === 'MORNING' ? '08:00 Protocol Start' : '22:00 Protocol End'}
            </h2>
            <p className="text-sm text-gray-400">
              {type === 'MORNING' ? 'Set your trajectory for the day.' : 'Review your performance.'}
            </p>
          </div>
        </div>

        {type === 'MORNING' ? (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-300">Top 3 Priorities Today</label>
            {priorities.map((p, i) => (
              <div key={i} className="flex gap-3 items-center">
                <span className="text-gray-500 font-mono">0{i + 1}</span>
                <input
                  type="text"
                  value={p}
                  onChange={(e) => handlePriorityChange(i, e.target.value)}
                  placeholder={`Priority #${i + 1}`}
                  className="flex-1 bg-sprint-dark border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:border-sprint-accent"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-3 p-4 bg-sprint-dark rounded-lg cursor-pointer border border-gray-700 hover:border-gray-500 transition-colors">
                <input
                  type="checkbox"
                  checked={tasksCompleted}
                  onChange={(e) => setTasksCompleted(e.target.checked)}
                  className="w-5 h-5 accent-sprint-success rounded"
                />
                <span className="text-white font-medium">Did you complete all planned tasks?</span>
              </label>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-300">Focus Score (1-10)</label>
                <span className="text-sprint-accent font-bold">{focusScore}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={focusScore}
                onChange={(e) => setFocusScore(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-sprint-accent"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Distracted</span>
                <span>Laser Focused</span>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full mt-8 bg-sprint-accent hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all"
        >
          <Save size={18} />
          {type === 'MORNING' ? 'Lock In Priorities' : 'Submit Daily Report'}
        </button>
      </div>
    </div>
  );
};