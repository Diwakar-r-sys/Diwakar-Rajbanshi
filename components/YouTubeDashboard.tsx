import React, { useState } from 'react';
import { YouTubeStats, VideoProject } from '../types';
import { Youtube, TrendingUp, DollarSign, Users, Trash2, CheckSquare, Check, Link as LinkIcon, Edit2 } from 'lucide-react';

interface YouTubeDashboardProps {
  stats: YouTubeStats;
  videos: VideoProject[];
  onStatsUpdate: (stats: YouTubeStats) => void;
  onAddVideo: (title: string) => void;
  onToggleVideoTask: (videoId: string, taskId: string) => void;
  onCompleteProject: (videoId: string) => void;
  onDeleteVideo: (id: string) => void;
}

export const YouTubeDashboard: React.FC<YouTubeDashboardProps> = ({ 
  stats, videos, onStatsUpdate, onAddVideo, onToggleVideoTask, onCompleteProject, onDeleteVideo 
}) => {
  const [newVideoTitle, setNewVideoTitle] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newVideoTitle.trim()) {
      onAddVideo(newVideoTitle);
      setNewVideoTitle('');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Channel Header */}
      <div className="bg-sprint-card p-6 rounded-2xl border border-gray-800 flex flex-col md:flex-row items-center gap-6">
        {/* Logo Placeholder */}
        <div className="relative group cursor-pointer">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border-4 border-sprint-dark shadow-2xl flex items-center justify-center overflow-hidden">
                {stats.channelName ? (
                    <span className="text-4xl font-bold text-gray-500 group-hover:text-white transition-colors">
                        {stats.channelName.charAt(0).toUpperCase()}
                    </span>
                ) : (
                    <Youtube size={40} className="text-gray-600" />
                )}
            </div>
             <div className="absolute bottom-0 right-0 bg-sprint-youtube p-1.5 rounded-full border-2 border-sprint-dark text-white">
                <Edit2 size={12} />
             </div>
        </div>

        <div className="flex-1 text-center md:text-left space-y-2 w-full">
            <div>
                 <label className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1 block">Channel Name</label>
                 <input 
                    type="text" 
                    value={stats.channelName}
                    onChange={(e) => onStatsUpdate({...stats, channelName: e.target.value})}
                    placeholder="Enter Channel Name"
                    className="bg-transparent text-3xl md:text-4xl font-black text-white focus:outline-none focus:border-b-2 focus:border-sprint-youtube w-full md:w-auto placeholder-gray-700 transition-all"
                 />
            </div>
            
            <div className="flex items-center justify-center md:justify-start gap-2 group">
                 <div className="bg-gray-800 p-1.5 rounded-md text-gray-400 group-hover:text-sprint-youtube transition-colors">
                    <LinkIcon size={14} />
                 </div>
                 <input 
                    type="text" 
                    value={stats.channelLink}
                    onChange={(e) => onStatsUpdate({...stats, channelLink: e.target.value})}
                    placeholder="Add channel link (e.g., youtube.com/@yourchannel)"
                    className="bg-transparent text-sm text-blue-400 focus:outline-none hover:text-blue-300 w-full md:w-1/2 placeholder-gray-600"
                 />
            </div>
        </div>
        
        <div className="hidden md:block text-right">
             <div className="text-sm text-gray-400 bg-sprint-dark px-4 py-2 rounded-xl border border-gray-700 inline-block">
                 <span className="block text-xs uppercase text-gray-500 mb-1">Monthly Target</span>
                 <span className="font-bold text-white">$1,000.00</span>
             </div>
        </div>
      </div>

      {/* Stats Input Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-sprint-card p-4 rounded-xl border border-gray-800">
          <div className="flex items-center gap-2 text-gray-400 mb-2">
            <Users size={16} />
            <span className="text-xs uppercase tracking-wide">Subscribers</span>
          </div>
          <div className="flex items-end gap-2">
            <input 
              type="number" 
              value={stats.subscribers}
              onChange={(e) => onStatsUpdate({...stats, subscribers: parseInt(e.target.value) || 0})}
              className="bg-transparent text-3xl font-bold text-white w-full focus:outline-none focus:border-b focus:border-sprint-youtube"
            />
          </div>
        </div>
        <div className="bg-sprint-card p-4 rounded-xl border border-gray-800">
          <div className="flex items-center gap-2 text-gray-400 mb-2">
            <TrendingUp size={16} />
            <span className="text-xs uppercase tracking-wide">Watch Hours</span>
          </div>
           <div className="flex items-end gap-2">
            <input 
              type="number" 
              value={stats.watchHours}
              onChange={(e) => onStatsUpdate({...stats, watchHours: parseFloat(e.target.value) || 0})}
              className="bg-transparent text-3xl font-bold text-white w-full focus:outline-none focus:border-b focus:border-sprint-youtube"
            />
          </div>
        </div>
        <div className="bg-sprint-card p-4 rounded-xl border border-gray-800">
          <div className="flex items-center gap-2 text-gray-400 mb-2">
            <DollarSign size={16} />
            <span className="text-xs uppercase tracking-wide">Est. Revenue</span>
          </div>
           <div className="flex items-end gap-2">
             <span className="text-3xl font-bold text-green-500">$</span>
            <input 
              type="number" 
              value={stats.revenue}
              onChange={(e) => onStatsUpdate({...stats, revenue: parseFloat(e.target.value) || 0})}
              className="bg-transparent text-3xl font-bold text-green-500 w-full focus:outline-none focus:border-b focus:border-green-500"
            />
          </div>
        </div>
      </div>

      {/* Content Pipeline */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white">Content Pipeline</h3>
        
        {/* Step 1: Input Field */}
        <form onSubmit={handleAdd} className="flex gap-2">
          <input 
            type="text" 
            value={newVideoTitle}
            onChange={(e) => setNewVideoTitle(e.target.value)}
            placeholder="New video idea..."
            className="flex-1 bg-sprint-dark border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-sprint-youtube placeholder-gray-500"
          />
          <button 
            type="submit"
            className="bg-gray-200 hover:bg-white text-black px-6 rounded-lg font-bold transition-colors flex items-center gap-2"
          >
             + Add
          </button>
        </form>

        {/* Step 2: Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.filter(v => !v.isCompleted).length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500 bg-sprint-card/50 rounded-xl border border-dashed border-gray-800">
              Your pipeline is empty. Add a video idea to start the protocol.
            </div>
          )}
          
          {videos.filter(v => !v.isCompleted).map((video) => (
            <div key={video.id} className="bg-sprint-card border border-gray-700 rounded-xl overflow-hidden flex flex-col shadow-lg">
              
              {/* Card Header */}
              <div className="p-4 bg-gray-800/50 border-b border-gray-700 flex justify-between items-start">
                <div className="flex gap-3">
                   <div className="mt-1">
                      <div className="w-5 h-5 border-2 border-white rounded flex items-center justify-center">
                         <span className="text-xs font-bold text-white">V</span>
                      </div>
                   </div>
                   <h4 className="font-bold text-white text-lg leading-tight">{video.title}</h4>
                </div>
                <button 
                  onClick={() => onDeleteVideo(video.id)}
                  className="text-gray-500 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Checklist */}
              <div className="p-0 flex-1">
                {video.tasks.map((task, index) => (
                  <div 
                    key={task.id} 
                    className={`flex items-center justify-between p-3 border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors cursor-pointer ${task.completed ? 'opacity-50' : ''}`}
                    onClick={() => onToggleVideoTask(video.id, task.id)}
                  >
                    <div className="flex items-center gap-3">
                       <span className="text-gray-500 font-mono text-xs w-4">{index + 1}</span>
                       <span className={`text-sm font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-200'}`}>
                         {task.name}
                       </span>
                    </div>
                    
                    <div className={`w-5 h-5 border rounded flex items-center justify-center transition-all ${task.completed ? 'bg-sprint-youtube border-sprint-youtube' : 'border-gray-600'}`}>
                       {task.completed && <Check size={14} className="text-white" />}
                    </div>
                  </div>
                ))}
              </div>

              {/* Complete Action */}
              <div className="p-4 bg-gray-800/30 border-t border-gray-700">
                 <button 
                    onClick={() => onCompleteProject(video.id)}
                    className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
                        video.tasks.every(t => t.completed) 
                        ? 'bg-sprint-youtube hover:bg-red-600 text-white shadow-lg shadow-red-900/20' 
                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!video.tasks.every(t => t.completed)}
                 >
                   <CheckSquare size={18} />
                   Complete Project
                 </button>
                 {!video.tasks.every(t => t.completed) && (
                   <p className="text-center text-xs text-gray-500 mt-2">Complete all 8 steps to finish</p>
                 )}
              </div>
            </div>
          ))}
        </div>

        {/* Completed History Section */}
        {videos.some(v => v.isCompleted) && (
          <div className="mt-8 pt-8 border-t border-gray-800">
             <h3 className="text-gray-400 font-bold mb-4">Uploaded Archive</h3>
             <div className="space-y-2">
               {videos.filter(v => v.isCompleted).map(video => (
                 <div key={video.id} className="flex justify-between items-center p-3 bg-gray-900/50 rounded border border-gray-800 text-gray-500">
                    <span className="line-through decoration-gray-700">{video.title}</span>
                    <span className="text-xs bg-green-900 text-green-500 px-2 py-1 rounded">UPLOADED</span>
                 </div>
               ))}
             </div>
          </div>
        )}

      </div>
    </div>
  );
};