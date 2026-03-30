export type ThemeMode = "system" | "light" | "dark";
export type HabitFrequency = "daily" | "weekly";
export type TaskPriority = "low" | "medium" | "high";
export type TaskFilter = "today" | "upcoming" | "completed";

export interface Habit {
  id: string;
  name: string;
  emoji: string;
  frequency: HabitFrequency;
  target: number;
  color: string;
  createdAt: string;
  updatedAt: string;
  history: Record<string, boolean>;
}

export interface StudyTask {
  id: string;
  title: string;
  description: string;
  subject: string;
  priority: TaskPriority;
  deadline: string;
  completed: boolean;
  completedAt?: string;
  order: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SettingsState {
  themeMode: ThemeMode;
}

export interface PersistedAppState {
  habits: Habit[];
  tasks: StudyTask[];
  settings: SettingsState;
}

export interface AppState extends PersistedAppState {
  hydrated: boolean;
  hydrate: () => Promise<void>;
  addHabit: (input: Pick<Habit, "name" | "emoji" | "frequency" | "target" | "color">) => void;
  updateHabit: (id: string, updates: Partial<Omit<Habit, "id" | "history" | "createdAt">>) => void;
  deleteHabit: (id: string) => void;
  toggleHabitCompletion: (id: string, dateKey?: string) => void;
  addTask: (
    input: Pick<StudyTask, "title" | "description" | "subject" | "priority" | "deadline" | "tags">
  ) => void;
  updateTask: (id: string, updates: Partial<Omit<StudyTask, "id" | "createdAt">>) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  reorderTasks: (orderedIds: string[]) => void;
  setThemeMode: (themeMode: ThemeMode) => void;
  resetAllData: () => Promise<void>;
  importData: (state: PersistedAppState) => Promise<void>;
}
