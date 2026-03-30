import { Flame, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import Card from "@/components/ui/Card";
import type { Habit } from "@/store/types";
import { getHabitStreak, toDateKey } from "@/utils/date";

interface HabitItemProps {
  habit: Habit;
  onToggle: () => void;
  onDelete: () => void;
  onSave: (name: string, target: number) => void;
}

export default function HabitItem({ habit, onToggle, onDelete, onSave }: HabitItemProps) {
  const [name, setName] = useState(habit.name);
  const [target, setTarget] = useState(habit.target);
  const streak = getHabitStreak(habit);
  const completedToday = Boolean(habit.history[toDateKey(new Date())]);

  const handlers = useSwipeable({
    onSwipedRight: onToggle,
    onSwipedLeft: onDelete,
    trackMouse: true
  });

  return (
    <motion.div whileTap={{ scale: 0.985 }} {...handlers}>
      <Card className={`bg-gradient-to-br ${habit.color} border-white/60`}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/75 text-3xl shadow-sm dark:bg-base-900/80">
              {habit.emoji}
            </div>
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  onBlur={() => onSave(name, target)}
                  className="min-w-[180px] bg-transparent text-lg font-semibold text-base-900 outline-none dark:text-white"
                />
                <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-base-600 dark:bg-base-900/70 dark:text-base-300">
                  {habit.frequency === "daily" ? "Daily" : `${habit.target}x weekly`}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-base-600 dark:text-base-300">
                <div className="inline-flex items-center gap-1 rounded-full bg-white/65 px-3 py-1.5 dark:bg-base-900/65">
                  <Flame className="h-4 w-4 text-amber-500" />
                  <span>{streak} streak</span>
                </div>
                <label className="inline-flex items-center gap-2 rounded-full bg-white/65 px-3 py-1.5 dark:bg-base-900/65">
                  <span>Target</span>
                  <input
                    type="number"
                    min={1}
                    max={7}
                    value={target}
                    onChange={(event) => setTarget(Number(event.target.value))}
                    onBlur={() => onSave(name, target)}
                    className="w-12 bg-transparent text-right outline-none"
                  />
                </label>
                <span className="text-xs text-base-500">Swipe right to complete, left to delete</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onToggle}
              type="button"
              className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                completedToday
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                  : "bg-white/80 text-base-900 ring-1 ring-white/70 dark:bg-base-900/80 dark:text-white"
              }`}
            >
              {completedToday ? "Completed today" : "Mark complete"}
            </button>
            <button
              onClick={onDelete}
              type="button"
              className="rounded-2xl bg-white/70 p-3 text-base-500 transition hover:bg-rose-500 hover:text-white dark:bg-base-900/80"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
