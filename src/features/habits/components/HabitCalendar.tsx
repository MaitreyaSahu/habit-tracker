import { eachDayOfInterval, format, subDays } from "date-fns";
import type { Habit } from "@/store/types";
import { toDateKey } from "@/utils/date";

interface HabitCalendarProps {
  habit: Habit;
}

export default function HabitCalendar({ habit }: HabitCalendarProps) {
  const end = new Date();
  const days = eachDayOfInterval({
    start: subDays(end, 27),
    end
  });
  const completedCount = days.filter((day) => habit.history[toDateKey(day)]).length;
  const weekdayLabels = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <div className="p-0">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-base-500 dark:text-base-400">
            Activity
          </p>
          <p className="mt-1 text-sm text-base-700 dark:text-base-300">
            {completedCount} completions in the last 28 days
          </p>
        </div>
        <div className="rounded-full bg-white/75 px-3 py-1.5 text-xs font-medium text-base-600 ring-1 ring-white/60 dark:bg-base-900/70 dark:text-base-300 dark:ring-white/10">
          {format(days[0], "MMM d")} - {format(days[days.length - 1], "MMM d")}
        </div>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-1.5">
        {weekdayLabels.map((label, index) => (
          <div
            key={`${label}-${index}`}
            className="text-center text-[10px] font-medium uppercase tracking-wide text-base-400 dark:text-base-500"
          >
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {days.map((day) => {
          const complete = Boolean(habit.history[toDateKey(day)]);

          return (
            <div
              key={day.toISOString()}
              title={`${format(day, "MMM d")}${complete ? " - completed" : ""}`}
              className={`group relative h-8 rounded-xl transition ${
                complete
                  ? "bg-base-900 shadow-sm shadow-base-900/10 dark:bg-white"
                  : "border border-white/60 bg-white/75 dark:border-white/10 dark:bg-base-900/65"
              }`}
            >
              <div
                className={`absolute inset-0 flex items-center justify-center text-[11px] font-semibold ${
                  complete ? "text-white dark:text-base-900" : "text-base-500 dark:text-base-400"
                }`}
              >
                {format(day, "d")}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
