export interface Task {
  id: string;
  name: string;
  completed: boolean;
}

export interface Subject {
  id: string;
  name: string;
  color: string;
  tasks: Task[];
}

export interface VideoTask {
  id: string;
  name: string;
  completed: boolean;
}

export interface VideoProject {
  id: string;
  title: string;
  tasks: VideoTask[];
  isCompleted: boolean;
}

export interface GoalTask {
  id: string;
  name: string;
  completed: boolean;
}

export interface YouTubeStats {
  channelName: string;
  channelLink: string;
  subscribers: number;
  watchHours: number;
  revenue: number;
}

export interface DailyLog {
  date: string;
  priorities: string[]; // Morning check-in
  tasksCompleted: boolean; // Night check-in
  focusScore: number; // Night check-in 1-10
}

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  TIMELINE = 'TIMELINE',
  EXAMS = 'EXAMS',
  BOOKR = 'BOOKR',
  YOUTUBE = 'YOUTUBE',
  SETTINGS = 'SETTINGS'
}