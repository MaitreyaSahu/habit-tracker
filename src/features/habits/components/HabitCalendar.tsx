import { format, isSameMonth } from "date-fns";
import type { Habit } from "@/store/types";
import { getMonthGrid, toDateKey } from "@/utils/date";

interface HabitCalendarProps {
  habit: Habit;
}

export default function HabitCalendar({ habit }: HabitCalendarProps) {
  const days = getMonthGrid();

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((day) => {
        const complete = Boolean(habit.history[toDateKey(day)]);
        const currentMonth = isSameMonth(day, new Date());

        return (
          <div
            key={day.toISOString()}
            className={`rounded-2xl border px-2 py-3 text-center text-xs transition ${
              complete
                ? "border-transparent bg-base-900 text-white dark:bg-white dark:text-base-900"
                : "border-base-200 bg-white/70 text-base-500 dark:border-base-700 dark:bg-base-800/60 dark:text-base-300"
            } ${currentMonth ? "" : "opacity-45"}`}
          >
            <div>{format(day, "EEEEE")}</div>
            <div className="mt-1 font-semibold">{format(day, "d")}</div>
          </div>
        );
      })}
    </div>
  );
}
