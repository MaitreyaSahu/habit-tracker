import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  formatDistanceToNowStrict,
  isAfter,
  isBefore,
  isSameDay,
  parseISO,
  startOfMonth,
  startOfWeek,
  subDays
} from "date-fns";
import type { Habit, StudyTask } from "@/store/types";

export function toDateKey(date: Date) {
  return format(date, "yyyy-MM-dd");
}

export function formatShortDate(date: string) {
  return format(parseISO(date), "MMM d");
}

export function relativeDateLabel(date: string) {
  return formatDistanceToNowStrict(parseISO(date), { addSuffix: true });
}

export function getHabitStreak(habit: Habit) {
  const today = new Date();

  if (habit.frequency === "daily") {
    let streak = 0;
    let pointer = today;
    while (habit.history[toDateKey(pointer)]) {
      streak += 1;
      pointer = subDays(pointer, 1);
    }
    return streak;
  }

  let streak = 0;
  let endPointer = endOfWeek(today, { weekStartsOn: 1 });

  while (true) {
    const startPointer = startOfWeek(endPointer, { weekStartsOn: 1 });
    const days = eachDayOfInterval({ start: startPointer, end: endPointer });
    const completions = days.filter((day) => habit.history[toDateKey(day)]).length;

    if (completions >= habit.target) {
      streak += 1;
      endPointer = subDays(startPointer, 1);
      continue;
    }

    return streak;
  }
}

export function getCompletionPercentage(completed: number, total: number) {
  if (!total) {
    return 0;
  }

  return Math.round((completed / total) * 100);
}

export function getTaskFilterLabel(filter: string) {
  if (filter === "today") {
    return "Due today";
  }
  if (filter === "upcoming") {
    return "Upcoming";
  }
  return "Completed";
}

export function isTaskToday(task: StudyTask) {
  return isSameDay(parseISO(task.deadline), new Date());
}

export function isTaskUpcoming(task: StudyTask) {
  const deadline = parseISO(task.deadline);
  const now = new Date();
  return isAfter(deadline, now) || isSameDay(deadline, now);
}

export function isTaskOverdue(task: StudyTask) {
  return !task.completed && isBefore(parseISO(task.deadline), new Date()) && !isTaskToday(task);
}

export function getMonthGrid(date = new Date()) {
  return eachDayOfInterval({
    start: startOfWeek(startOfMonth(date), { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(date), { weekStartsOn: 1 })
  });
}
