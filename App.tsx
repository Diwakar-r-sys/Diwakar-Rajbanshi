import React, { useState, useEffect } from 'react';
import { LayoutDashboard, CalendarClock, BookOpen, Youtube, Settings, AlertTriangle, Menu, X, CheckSquare, Target, Plus, Trash2, Check, Library } from 'lucide-react';
import { Subject, YouTubeStats, VideoProject, AppView, DailyLog, GoalTask, Task } from './types';
import { Timeline } from './components/Timeline';
import { ExamTracker } from './components/ExamTracker';
import { YouTubeDashboard } from './components/YouTubeDashboard';
import { CheckInModal } from './components/CheckInModal';
import { EmergencyModal } from './components/EmergencyModal';

// Initial Mock Data
const INITIAL_SUBJECTS: Subject[] = [
  { 
    id: '1', 
    name: 'Subject A: Mathematics', 
    color: '#3b82f6', 
    tasks: [
      {id: 'm1', name: 'Sets', completed: true},
      {id: 'm2', name: 'Compound Interest', completed: true},
      {id: 'm3', name: 'Growth and Depreciation', completed: false},
      {id: 'm4', name: 'Currency and Exchange Rate', completed: false},
      {id: 'm5', name: 'Area and Volume', completed: false},
      {id: 'm6', name: 'Sequence and Series', completed: false},
      {id: 'm7', name: 'Quadratic Equation', completed: false},
      {id: 'm8', name: 'Algebraic Fraction', completed: false},
      {id: 'm9', name: 'Indices', completed: false},
      {id: 'm10', name: 'Triangle and Quadrilaterals', completed: false},
      {id: 'm11', name: 'Construction', completed: false},
      {id: 'm12', name: 'Circle', completed: false},
      {id: 'm13', name: 'Statistics', completed: false},
      {id: 'm14', name: 'Probability', completed: false},
      {id: 'm15', name: 'Trigonometry', completed: false}
    ] 
  },
  { id: '2', name: 'Subject B: Science', color: '#8b5cf6', tasks: [{id: 't1', name: 'Physics Motion', completed: true}, {id: 't2', name: 'Chemical Reactions', completed: true}, {id: 't3', name: 'Life Processes', completed: false}] },
  { id: '3', name: 'Subject C: Nepali', color: '#10b981', tasks: [{id: 't1', name: 'Byakaran (Grammar)', completed: false}, {id: 't2', name: 'Sahitya (Literature)', completed: false}, {id: 't3', name: 'Nibandha (Essays)', completed: false}] },
  { id: '4', name: 'Subject D: English', color: '#ef4444', tasks: [{id: 't1', name: 'Grammar Rules', completed: false}, {id: 't2', name: 'Reading Comprehension', completed: false}, {id: 't3', name: 'Free Writing', completed: false}] },
  { id: '5', name: 'Subject E: Social Study', color: '#f59e0b', tasks: [{id: 't1', name: 'History', completed: true}, {id: 't2', name: 'Geography', completed: false}, {id: 't3', name: 'Civics & Society', completed: false}] },
  { id: '6', name: 'Subject F: Economics', color: '#ec4899', tasks: [{id: 't1', name: 'Microeconomics', completed: false}, {id: 't2', name: 'Macroeconomics', completed: false}, {id: 't3', name: 'Economic Development', completed: false}] },
  { id: '7', name: 'Subject G: Education', color: '#6366f1', tasks: [{id: 't1', name: 'Foundations of Education', completed: true}, {id: 't2', name: 'Curriculum & Eval', completed: true}, {id: 't3', name: 'Educational Psychology', completed: false}] },
];

const DEFAULT_VIDEO_STEPS = [
  "Topic Research",
  "Script Writing",
  "Voice Recording",
  "Video & Assets (PNG/SFX)",
  "Video Editing",
  "Sound Design",
  "Thumbnail Design",
  "Title & Description"
];

const App: React.FC = () => {
  // --- State ---
  const [activeView, setActiveView] = useState<AppView>(AppView.DASHBOARD);
  const [subjects, setSubjects] = useState<Subject[]>(INITIAL_SUBJECTS);
  const [activeBookSubjectId, setActiveBookSubjectId] = useState<string>(INITIAL_SUBJECTS[0].id);
  const [ytStats, setYtStats] = useState<YouTubeStats>({ 
    channelName: 'Future Millionaire', 
    channelLink: '', 
    subscribers: 45, 
    watchHours: 12.5, 
    revenue: 0 
  });
  const [videos, setVideos] = useState<VideoProject[]>([
    { 
      id: '1', 
      title: 'How to Study for 12 Hours', 
      isCompleted: false,
      tasks: DEFAULT_VIDEO_STEPS.map((name, i) => ({ id: `vt-${i}`, name, completed: i < 2 })) 
    }
  ]);
  const [goalTasks, setGoalTasks] = useState<GoalTask[]>([
    { id: 'g1', name: 'Complete Math Set A', completed: false },
    { id: 'g2', name: 'Review Science Notes', completed: false }
  ]);
  const [newGoalTask, setNewGoalTask] = useState('');
  const [quickExamTask, setQuickExamTask] = useState('');
  
  const [checkInType, setCheckInType] = useState<'MORNING' | 'NIGHT' | null>(null);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Set exam date to 30 days from now (static for prototype)
  const examDate = new Date();
  examDate.setDate(examDate.getDate() + 30);

  // --- Handlers ---
  const handleToggleTask = (subjectId: string, taskId: string) => {
    setSubjects(prev => prev.map(s => {
      if (s.id !== subjectId) return s;
      return {
        ...s,
        tasks: s.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t)
      };
    }));
  };

  const handleDeleteTask = (subjectId: string, taskId: string) => {
    setSubjects(prev => prev.map(s => {
      if (s.id !== subjectId) return s;
      return { ...s, tasks: s.tasks.filter(t => t.id !== taskId) };
    }));
  };

  const handleAddTaskToSubject = (subjectId: string, taskName: string) => {
    setSubjects(prev => prev.map(s => {
      if (s.id !== subjectId) return s;
      return {
        ...s,
        tasks: [...s.tasks, { id: `t-${Date.now()}`, name: taskName, completed: false }]
      };
    }));
  };

  const handleAddVideo = (title: string) => {
    const newVideo: VideoProject = {
      id: Date.now().toString(),
      title,
      isCompleted: false,
      tasks: DEFAULT_VIDEO_STEPS.map((name, i) => ({ id: `vt-${Date.now()}-${i}`, name, completed: false }))
    };
    setVideos([...videos, newVideo]);
  };

  const handleToggleVideoTask = (videoId: string, taskId: string) => {
    setVideos(prev => prev.map(v => {
      if (v.id !== videoId) return v;
      return {
        ...v,
        tasks: v.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t)
      };
    }));
  };

  const handleCompleteProject = (videoId: string) => {
    setVideos(prev => prev.map(v => {
      if (v.id !== videoId) return v;
      return { ...v, isCompleted: true };
    }));
  };

  const handleDeleteVideo = (id: string) => {
    setVideos(videos.filter(v => v.id !== id));
  };

  const handleAddGoalTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoalTask.trim()) {
      setGoalTasks([...goalTasks, { id: Date.now().toString(), name: newGoalTask, completed: false }]);
      setNewGoalTask('');
    }
  };

  const handleToggleGoalTask = (id: string) => {
    setGoalTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDeleteGoalTask = (id: string) => {
    setGoalTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleSaveCheckIn = (data: Partial<DailyLog>) => {
    console.log("Saved Check-in Data:", data);
    // In a real app, save to localStorage or backend
  };

  // --- Derived Stats ---
  const totalExamTasks = subjects.reduce((acc, s) => acc + s.tasks.length, 0);
  const completedExamTasks = subjects.reduce((acc, s) => acc + s.tasks.filter(t => t.completed).length, 0);
  const examReadiness = Math.round((completedExamTasks / totalExamTasks) * 100) || 0;
  
  // Simple goal: 1000 subs and $1000 rev. Average the progress.
  const ytGoalProgress = Math.min(100, Math.round(((ytStats.subscribers / 1000) + (ytStats.revenue / 1000)) / 2 * 100));

  // --- Pending Tasks Logic ---
  
  // Find the first subject with incomplete tasks to focus on in the widget
  const focusedSubject = subjects.find(s => s.tasks.some(t => !t.completed)) || subjects[0];
  const focusedSubjectTasks = focusedSubject ? focusedSubject.tasks.filter(t => !t.completed).slice(0, 6) : [];

  // Get all incomplete video tasks
  const pendingVideoTasks = videos
    .filter(v => !v.isCompleted)
    .flatMap(video => 
      video.tasks
        .filter(t => !t.completed)
        .map(task => ({ videoTitle: video.title, taskName: task.name }))
    )
    .slice(0, 5); // Show max 5

  // Get incomplete Goal Tasks
  const pendingGoalTasks = goalTasks.filter(t => !t.completed);

  // --- Layout Components ---
  const NavItem = ({ view, icon, label }: { view: AppView, icon: React.ReactNode, label: string }) => (
    <button
      onClick={() => { setActiveView(view); setMobileMenuOpen(false); }}
      className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all ${
        activeView === view 
          ? 'bg-sprint-accent text-white shadow-lg shadow-blue-500/20' 
          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-sprint-dark text-slate-100 flex overflow-hidden">
      
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 border-r border-gray-800 bg-sprint-dark p-4">
        <div className="mb-8 px-2">
          <h1 className="text-xl font-bold tracking-tight text-white">DOUBLE<span className="text-sprint-accent">SPRINT</span></h1>
          <p className="text-xs text-gray-500 mt-1">30 Days to Glory</p>
        </div>
        
        <nav className="space-y-2 flex-1">
          <NavItem view={AppView.DASHBOARD} icon={<LayoutDashboard size={20} />} label="Command Center" />
          <NavItem view={AppView.TIMELINE} icon={<CalendarClock size={20} />} label="24h Timeline" />
          <NavItem view={AppView.EXAMS} icon={<BookOpen size={20} />} label="Exam Tracker" />
          <NavItem view={AppView.BOOKR} icon={<Library size={20} />} label="BookR" />
          <NavItem view={AppView.YOUTUBE} icon={<Youtube size={20} />} label="YouTube Growth" />
        </nav>

        <div className="pt-6 border-t border-gray-800 space-y-3">
            <button 
              onClick={() => setEmergencyMode(true)}
              className="w-full bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-600/50 p-3 rounded-lg flex items-center justify-center gap-2 transition-all group"
            >
              <AlertTriangle size={18} className="group-hover:animate-bounce" />
              <span className="font-bold">EMERGENCY</span>
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => setCheckInType('MORNING')}
                className="bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-black p-2 rounded text-xs font-bold transition-colors"
              >
                AM Check-in
              </button>
              <button 
                onClick={() => setCheckInType('NIGHT')}
                className="bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500 hover:text-white p-2 rounded text-xs font-bold transition-colors"
              >
                PM Check-in
              </button>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 border-b border-gray-800 bg-sprint-dark/50 backdrop-blur-md sticky top-0 z-20">
           <h1 className="text-lg font-bold">DOUBLE<span className="text-sprint-accent">SPRINT</span></h1>
           <button onClick={() => setMobileMenuOpen(true)} className="p-2 text-gray-300">
             <Menu size={24} />
           </button>
        </header>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-30 bg-sprint-dark p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-right-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Menu</h2>
              <button onClick={() => setMobileMenuOpen(false)}><X size={24} /></button>
            </div>
            <NavItem view={AppView.DASHBOARD} icon={<LayoutDashboard size={20} />} label="Command Center" />
            <NavItem view={AppView.TIMELINE} icon={<CalendarClock size={20} />} label="24h Timeline" />
            <NavItem view={AppView.EXAMS} icon={<BookOpen size={20} />} label="Exam Tracker" />
            <NavItem view={AppView.BOOKR} icon={<Library size={20} />} label="BookR" />
            <NavItem view={AppView.YOUTUBE} icon={<Youtube size={20} />} label="YouTube Growth" />
            <hr className="border-gray-800 my-2"/>
            <button 
              onClick={() => { setEmergencyMode(true); setMobileMenuOpen(false); }}
              className="w-full bg-red-600 text-white p-4 rounded-lg font-bold flex items-center justify-center gap-2"
            >
              <AlertTriangle size={20} /> EMERGENCY MODE
            </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-6xl mx-auto">
            
            {activeView === AppView.DASHBOARD && (
               <div className="animate-in fade-in zoom-in-95 duration-500">
                  
                  {/* Pending Tasks Notification Section */}
                  {(pendingVideoTasks.length > 0 || pendingGoalTasks.length > 0) && (
                    <div className="mb-8 bg-gradient-to-r from-gray-900 to-gray-800 border border-red-500/50 rounded-2xl p-6 relative overflow-hidden shadow-lg shadow-red-900/10">
                      <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                         <AlertTriangle className="text-red-500" size={24} />
                         Action Required: Incomplete Tasks
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         
                         {/* YouTube Section */}
                         <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
                            <h4 className="text-sprint-youtube font-bold mb-3 flex items-center gap-2">
                               <Youtube size={16} /> YouTube Growth
                            </h4>
                            <div className="space-y-2">
                               {pendingVideoTasks.map((item, idx) => (
                                  <div key={idx} className="flex items-start gap-3 p-2 hover:bg-gray-800 rounded transition-colors cursor-pointer" onClick={() => setActiveView(AppView.YOUTUBE)}>
                                     <div className="mt-1 w-4 h-4 border border-gray-500 rounded flex items-center justify-center"></div>
                                     <div>
                                        <span className="block text-sm font-bold text-gray-200">{item.videoTitle}</span>
                                        <span className="block text-xs text-gray-400">{item.taskName}</span>
                                     </div>
                                  </div>
                               ))}
                               {pendingVideoTasks.length === 0 && <p className="text-gray-500 text-sm">No pending tasks.</p>}
                            </div>
                         </div>

                         {/* Goals Section (In Notification) */}
                         <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
                            <h4 className="text-green-500 font-bold mb-3 flex items-center gap-2">
                               <Target size={16} /> Daily Goals
                            </h4>
                            <div className="space-y-2">
                               {pendingGoalTasks.slice(0, 5).map((item) => (
                                  <div key={item.id} className="flex items-start gap-3 p-2 hover:bg-gray-800 rounded transition-colors cursor-pointer">
                                     <div className="mt-1 w-4 h-4 border border-gray-500 rounded flex items-center justify-center"></div>
                                     <div>
                                        <span className="block text-sm font-bold text-gray-200">{item.name}</span>
                                        <span className="block text-xs text-red-400">Pending</span>
                                     </div>
                                  </div>
                               ))}
                               {pendingGoalTasks.length === 0 && <p className="text-gray-500 text-sm">All goals crushed!</p>}
                            </div>
                         </div>
                      </div>
                    </div>
                  )}

                  <h2 className="text-3xl font-bold text-white mb-2">Protocol Dashboard</h2>
                  <p className="text-gray-400 mb-8">Day 1 of 30. Stay focused.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Exam Progress Card */}
                    <div 
                      onClick={() => setActiveView(AppView.EXAMS)}
                      className="bg-sprint-card p-6 rounded-2xl border border-gray-800 hover:border-sprint-exam cursor-pointer transition-all group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <BookOpen size={100} />
                      </div>
                      <h3 className="text-gray-400 font-medium mb-4">Exam Readiness</h3>
                      <div className="flex items-end gap-4">
                        <span className="text-6xl font-bold text-white">{examReadiness}%</span>
                        <div className="flex-1 pb-4">
                          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-sprint-exam" style={{ width: `${examReadiness}%` }}></div>
                          </div>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-gray-500">{completedExamTasks} of {totalExamTasks} modules complete</p>
                    </div>

                    {/* YouTube Progress Card */}
                    <div 
                      onClick={() => setActiveView(AppView.YOUTUBE)}
                      className="bg-sprint-card p-6 rounded-2xl border border-gray-800 hover:border-sprint-youtube cursor-pointer transition-all group relative overflow-hidden"
                    >
                       <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Youtube size={100} />
                      </div>
                      <h3 className="text-gray-400 font-medium mb-4">Monetization Goal</h3>
                      <div className="flex items-end gap-4">
                        <span className="text-6xl font-bold text-white">{ytGoalProgress}%</span>
                        <div className="flex-1 pb-4">
                          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-sprint-youtube" style={{ width: `${ytGoalProgress}%` }}></div>
                          </div>
                        </div>
                      </div>
                       <p className="mt-4 text-sm text-gray-500">${ytStats.revenue} / $1,000 Revenue</p>
                    </div>
                  </div>

                  {/* Daily Goals & Tasks Widget */}
                  <div className="mb-8 bg-sprint-card rounded-2xl border border-gray-800 p-6">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                       <Target className="text-green-500" />
                       Goals Tasks
                    </h3>
                    
                    <form onSubmit={handleAddGoalTask} className="flex gap-2 mb-6">
                        <input 
                          type="text" 
                          value={newGoalTask}
                          onChange={(e) => setNewGoalTask(e.target.value)}
                          placeholder="Add new task..."
                          className="flex-1 bg-sprint-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-sprint-accent placeholder-gray-500"
                        />
                        <button 
                          type="submit" 
                          className="bg-white text-black font-bold px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                        >
                          <Plus size={18} /> Add
                        </button>
                    </form>

                    <div className="space-y-2">
                        {goalTasks.length === 0 && (
                          <p className="text-center text-gray-500 py-4">No active goals. Set your targets.</p>
                        )}
                        {goalTasks.map(task => (
                           <div key={task.id} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg border border-gray-700 group">
                              <div className="flex items-center gap-3">
                                 <button 
                                   onClick={() => handleToggleGoalTask(task.id)}
                                   className={`w-6 h-6 rounded border flex items-center justify-center transition-all ${
                                      task.completed ? 'bg-green-500 border-green-500' : 'border-gray-500 hover:border-white'
                                   }`}
                                 >
                                    {task.completed && <Check size={14} className="text-black" />}
                                 </button>
                                 <span className={`${task.completed ? 'text-gray-500 line-through' : 'text-gray-200'}`}>
                                    {task.name}
                                 </span>
                              </div>
                              <button 
                                onClick={() => handleDeleteGoalTask(task.id)}
                                className="text-gray-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                              >
                                 <Trash2 size={18} />
                              </button>
                           </div>
                        ))}
                    </div>
                  </div>
               </div>
            )}

            {activeView === AppView.BOOKR && (
              <div className="animate-in fade-in zoom-in-95 duration-500">
                <h2 className="text-3xl font-bold text-white mb-6">Reading & Practice</h2>

                {/* Subject Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-4 mb-4 custom-scrollbar">
                  {subjects.map(subject => (
                    <button
                      key={subject.id}
                      onClick={() => setActiveBookSubjectId(subject.id)}
                      className={`px-4 py-2 rounded-lg font-bold whitespace-nowrap transition-all border ${
                        activeBookSubjectId === subject.id
                          ? 'bg-sprint-accent text-white border-sprint-accent'
                          : 'bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-500'
                      }`}
                    >
                      {subject.name.split(':')[0]}
                    </button>
                  ))}
                </div>

                {/* Selected Subject View */}
                {(() => {
                    const activeSubject = subjects.find(s => s.id === activeBookSubjectId) || subjects[0];
                    return (
                        <div className="bg-sprint-card border border-gray-800 rounded-2xl p-6 max-w-2xl">
                            
                            {/* Add Input */}
                            <div className="flex gap-3 mb-8">
                                <input
                                    type="text"
                                    value={quickExamTask}
                                    onChange={(e) => setQuickExamTask(e.target.value)}
                                    placeholder="New Lesson..."
                                    className="flex-1 bg-sprint-dark border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sprint-accent placeholder-gray-500 text-lg transition-all"
                                />
                                <button
                                    onClick={() => {
                                        if(quickExamTask) {
                                            handleAddTaskToSubject(activeSubject.id, quickExamTask);
                                            setQuickExamTask('');
                                        }
                                    }}
                                    className="bg-white hover:bg-gray-200 text-black font-bold px-6 rounded-xl transition-colors flex items-center gap-2"
                                >
                                    <Plus size={20} /> Add
                                </button>
                            </div>

                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
                                <BookOpen size={24} style={{ color: activeSubject.color }} />
                                <h3 className="text-xl font-bold text-white">{activeSubject.name}</h3>
                            </div>

                            {/* Task List */}
                            <div className="space-y-2">
                                {activeSubject.tasks.map((task, index) => (
                                    <div key={task.id} className="group flex items-center justify-between p-4 bg-gray-900/50 hover:bg-gray-900 rounded-xl border border-gray-800/50 transition-all">
                                        <div className="flex items-center gap-4">
                                            <span className="text-gray-600 font-mono text-sm w-4">{index + 1}</span>
                                            <span className={`text-lg font-medium ${task.completed ? 'text-gray-600 line-through' : 'text-gray-200'}`}>
                                                {task.name}
                                            </span>
                                        </div>
                                        
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => handleDeleteTask(activeSubject.id, task.id)}
                                                className="text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleToggleTask(activeSubject.id, task.id)}
                                                className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all ${
                                                    task.completed
                                                    ? 'bg-sprint-accent border-sprint-accent'
                                                    : 'border-gray-600 hover:border-sprint-accent'
                                                }`}
                                            >
                                                {task.completed && <Check size={18} className="text-white" />}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {activeSubject.tasks.length === 0 && (
                                    <div className="text-center py-8 text-gray-500">
                                        No lessons added yet. Start by adding one above.
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })()}
              </div>
            )}

            {activeView === AppView.TIMELINE && <Timeline />}
            
            {activeView === AppView.EXAMS && (
              <ExamTracker subjects={subjects} onToggleTask={handleToggleTask} />
            )}

            {activeView === AppView.YOUTUBE && (
              <YouTubeDashboard 
                stats={ytStats} 
                videos={videos} 
                onStatsUpdate={setYtStats}
                onAddVideo={handleAddVideo}
                onToggleVideoTask={handleToggleVideoTask}
                onCompleteProject={handleCompleteProject}
                onDeleteVideo={handleDeleteVideo}
              />
            )}

          </div>
        </div>
      </main>

      {/* Modals */}
      <EmergencyModal 
        isOpen={emergencyMode} 
        onClose={() => setEmergencyMode(false)} 
        examDate={examDate}
      />
      
      <CheckInModal 
        type={checkInType} 
        onClose={() => setCheckInType(null)} 
        onSave={handleSaveCheckIn}
      />

    </div>
  );
};

export default App;