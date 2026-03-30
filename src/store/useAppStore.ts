import { create } from "zustand";
import type { AppState, Habit, PersistedAppState, StudyTask, ThemeMode } from "@/store/types";
import { demoState } from "@/utils/demo-data";
import { persistAppState, restoreAppState, wipeAppState } from "@/utils/storage";
import { toDateKey } from "@/utils/date";

function createPersistedSlice(): PersistedAppState {
  return structuredClone(demoState);
}

function extractPersistedState(state: AppState): PersistedAppState {
  return {
    habits: state.habits,
    tasks: state.tasks,
    settings: state.settings
  };
}

function withTimestamps<T extends Record<string, unknown>>(input: T) {
  return {
    ...input,
    updatedAt: new Date().toISOString()
  };
}

export const useAppStore = create<AppState>((set, get) => ({
  ...createPersistedSlice(),
  hydrated: false,
  async hydrate() {
    const restored = await restoreAppState();
    set({ ...restored, hydrated: true });
  },
  addHabit(input) {
    const habit: Habit = {
      id: crypto.randomUUID(),
      history: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...input
    };

    set((state) => ({ habits: [habit, ...state.habits] }));
    void persistAppState(extractPersistedState(get()));
  },
  updateHabit(id, updates) {
    set((state) => ({
      habits: state.habits.map((habit) =>
        habit.id === id ? { ...habit, ...withTimestamps(updates) } : habit
      )
    }));
    void persistAppState(extractPersistedState(get()));
  },
  deleteHabit(id) {
    set((state) => ({ habits: state.habits.filter((habit) => habit.id !== id) }));
    void persistAppState(extractPersistedState(get()));
  },
  toggleHabitCompletion(id, dateKey = toDateKey(new Date())) {
    set((state) => ({
      habits: state.habits.map((habit) => {
        if (habit.id !== id) {
          return habit;
        }

        const history = { ...habit.history };
        if (history[dateKey]) {
          delete history[dateKey];
        } else {
          history[dateKey] = true;
        }

        return {
          ...habit,
          history,
          updatedAt: new Date().toISOString()
        };
      })
    }));
    void persistAppState(extractPersistedState(get()));
  },
  addTask(input) {
    const task: StudyTask = {
      id: crypto.randomUUID(),
      completed: false,
      order: get().tasks.length,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...input
    };

    set((state) => ({ tasks: [...state.tasks, task] }));
    void persistAppState(extractPersistedState(get()));
  },
  updateTask(id, updates) {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...withTimestamps(updates) } : task
      )
    }));
    void persistAppState(extractPersistedState(get()));
  },
  deleteTask(id) {
    set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) }));
    void persistAppState(extractPersistedState(get()));
  },
  toggleTaskCompletion(id) {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed ? new Date().toISOString() : undefined,
              updatedAt: new Date().toISOString()
            }
          : task
      )
    }));
    void persistAppState(extractPersistedState(get()));
  },
  reorderTasks(orderedIds) {
    set((state) => ({
      tasks: (() => {
        const orderedAll = [...state.tasks].sort((a, b) => a.order - b.order);
        const visibleSet = new Set(orderedIds);
        const visibleIndexes = orderedAll
          .map((task, index) => (visibleSet.has(task.id) ? index : -1))
          .filter((index) => index !== -1);

        const reorderedVisible = orderedIds
          .map((id) => orderedAll.find((task) => task.id === id))
          .filter((task): task is StudyTask => task !== undefined);

        const merged = [...orderedAll];
        visibleIndexes.forEach((slot, index) => {
          merged[slot] = reorderedVisible[index];
        });

        return merged.map((task, index) => ({
          ...task,
          order: index,
          updatedAt: new Date().toISOString()
        }));
      })()
    }));
    void persistAppState(extractPersistedState(get()));
  },
  setThemeMode(themeMode: ThemeMode) {
    set((state) => ({ settings: { ...state.settings, themeMode } }));
    void persistAppState(extractPersistedState(get()));
  },
  async resetAllData() {
    await wipeAppState();
    set({ ...createPersistedSlice(), hydrated: true });
    await persistAppState(extractPersistedState(get()));
  },
  async importData(state) {
    set({ ...state, hydrated: true });
    await persistAppState(extractPersistedState(get()));
  }
}));
