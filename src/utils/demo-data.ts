import { addDays, formatISO, subDays } from "date-fns";
import type { PersistedAppState } from "@/store/types";
import { toDateKey } from "@/utils/date";

const now = new Date();

export const demoState: PersistedAppState = {
  habits: [
    {
      id: "habit-read",
      name: "Deep Reading",
      emoji: "📚",
      frequency: "daily",
      target: 1,
      color: "from-sky-500/25 to-cyan-400/10",
      createdAt: formatISO(subDays(now, 24)),
      updatedAt: formatISO(now),
      history: {
        [toDateKey(subDays(now, 4))]: true,
        [toDateKey(subDays(now, 3))]: true,
        [toDateKey(subDays(now, 2))]: true,
        [toDateKey(subDays(now, 1))]: true,
        [toDateKey(now)]: true
      }
    },
    {
      id: "habit-focus",
      name: "Focus Session",
      emoji: "🎯",
      frequency: "daily",
      target: 1,
      color: "from-violet-500/25 to-fuchsia-400/10",
      createdAt: formatISO(subDays(now, 21)),
      updatedAt: formatISO(now),
      history: {
        [toDateKey(subDays(now, 6))]: true,
        [toDateKey(subDays(now, 4))]: true,
        [toDateKey(subDays(now, 2))]: true,
        [toDateKey(now)]: true
      }
    },
    {
      id: "habit-review",
      name: "Weekly Review",
      emoji: "🧠",
      frequency: "weekly",
      target: 3,
      color: "from-amber-500/25 to-orange-400/10",
      createdAt: formatISO(subDays(now, 40)),
      updatedAt: formatISO(now),
      history: {
        [toDateKey(subDays(now, 12))]: true,
        [toDateKey(subDays(now, 10))]: true,
        [toDateKey(subDays(now, 8))]: true,
        [toDateKey(subDays(now, 5))]: true,
        [toDateKey(subDays(now, 2))]: true,
        [toDateKey(now)]: true
      }
    }
  ],
  tasks: [
    {
      id: "task-math",
      title: "Calculus problem set",
      description: "Work through limits and differentiation chapter exercises.",
      subject: "Mathematics",
      priority: "high",
      deadline: formatISO(now, { representation: "date" }),
      completed: false,
      order: 0,
      tags: ["exam", "chapter-4"],
      createdAt: formatISO(subDays(now, 2)),
      updatedAt: formatISO(now)
    },
    {
      id: "task-history",
      title: "Modern history revision",
      description: "Summarise cold war milestones and create flashcards.",
      subject: "History",
      priority: "medium",
      deadline: formatISO(addDays(now, 1), { representation: "date" }),
      completed: false,
      order: 1,
      tags: ["flashcards"],
      createdAt: formatISO(subDays(now, 4)),
      updatedAt: formatISO(now)
    },
    {
      id: "task-code",
      title: "React state patterns",
      description: "Review hooks, derived state, and persistence strategies.",
      subject: "Computer Science",
      priority: "low",
      deadline: formatISO(addDays(now, 3), { representation: "date" }),
      completed: true,
      completedAt: formatISO(subDays(now, 1)),
      order: 2,
      tags: ["frontend", "notes"],
      createdAt: formatISO(subDays(now, 3)),
      updatedAt: formatISO(subDays(now, 1))
    }
  ],
  settings: {
    themeMode: "light"
  }
};
