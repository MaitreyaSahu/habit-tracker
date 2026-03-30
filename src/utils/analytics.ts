import { isThisWeek } from "date-fns";
import type { Habit, StudyTask } from "@/store/types";
import { getCompletionPercentage, getHabitStreak, toDateKey } from "@/utils/date";

export function getDashboardMetrics(habits: Habit[], tasks: StudyTask[]) {
  const today = toDateKey(new Date());
  const habitsCompletedToday = habits.filter((habit) => habit.history[today]).length;
  const taskCompletedCount = tasks.filter((task) => task.completed).length;
  const topStreak = habits.reduce((best, habit) => Math.max(best, getHabitStreak(habit)), 0);

  const focusSeries = Array.from({ length: 7 }).map((_, index) => {
    const offset = 6 - index;
    const day = new Date();
    day.setDate(day.getDate() - offset);
    const dayKey = toDateKey(day);

    return {
      label: day.toLocaleDateString("en-US", { weekday: "short" }),
      completed:
        habits.filter((habit) => habit.history[dayKey]).length +
        tasks.filter((task) => task.completedAt?.startsWith(dayKey)).length
    };
  });

  const weeklyTaskWins = tasks.filter(
    (task) => task.completedAt && isThisWeek(new Date(task.completedAt))
  ).length;

  return {
    habitsCompletedToday,
    taskCompletedCount,
    topStreak,
    dailyProgress: getCompletionPercentage(habitsCompletedToday, habits.length),
    studyProgress: getCompletionPercentage(taskCompletedCount, tasks.length),
    weeklyTaskWins,
    focusSeries
  };
}
