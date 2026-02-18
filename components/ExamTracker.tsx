import React from 'react';
import { Subject } from '../types';
import { BookOpen, Check } from 'lucide-react';

interface ExamTrackerProps {
  subjects: Subject[];
  onToggleTask: (subjectId: string, taskId: string) => void;
}

export const ExamTracker: React.FC<ExamTrackerProps> = ({ subjects, onToggleTask }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <BookOpen className="text-sprint-exam" />
          Exam Syllabus Tracker
        </h2>
        <span className="text-sm text-gray-400 bg-sprint-dark px-3 py-1 rounded-full border border-gray-700">
          7 Subjects / 30 Days
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((subject) => {
          const completedCount = subject.tasks.filter(t => t.completed).length;
          const totalCount = subject.tasks.length;
          const progress = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

          return (
            <div key={subject.id} className="bg-sprint-card border border-gray-800 rounded-xl overflow-hidden hover:border-gray-600 transition-colors">
              <div className="p-4 border-b border-gray-800 flex justify-between items-center" style={{ borderLeft: `4px solid ${subject.color}` }}>
                <h3 className="font-bold text-white">{subject.name}</h3>
                <span className={`text-xs font-bold px-2 py-1 rounded bg-gray-900 ${progress === 100 ? 'text-green-500' : 'text-gray-300'}`}>
                  {progress}%
                </span>
              </div>
              
              <div className="h-2 bg-gray-900 w-full">
                <div 
                  className="h-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%`, backgroundColor: subject.color }}
                />
              </div>

              <div className="p-4 space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                {subject.tasks.map((task) => (
                  <button
                    key={task.id}
                    onClick={() => onToggleTask(subject.id, task.id)}
                    className="w-full flex items-center gap-3 text-left group"
                  >
                    <div className={`
                      w-5 h-5 rounded border flex items-center justify-center transition-colors
                      ${task.completed 
                        ? 'bg-green-500/20 border-green-500 text-green-500' 
                        : 'bg-transparent border-gray-600 text-transparent group-hover:border-gray-400'}
                    `}>
                      <Check size={12} />
                    </div>
                    <span className={`text-sm ${task.completed ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
                      {task.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
