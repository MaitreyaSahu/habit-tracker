import { Check, Flame, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import Card from "@/components/ui/Card";
import type { Habit } from "@/store/types";
import { cn } from "@/utils/cn";
import { getHabitStreak, toDateKey } from "@/utils/date";

interface HabitItemProps {
  habit: Habit;
  onToggle: () => void;
  onDelete: () => void;
  onSave: (name: string, target: number) => void;
  children?: ReactNode;
}

export default function HabitItem({ habit, onToggle, onDelete, onSave, children }: HabitItemProps) {
  const swipeCommitThreshold = 110;
  const [name, setName] = useState(habit.name);
  const [target, setTarget] = useState(habit.target);
  const [swipeX, setSwipeX] = useState(0);
  const streak = getHabitStreak(habit);
  const completedToday = Boolean(habit.history[toDateKey(new Date())]);
  const swipeDirection =
    swipeX > 18 ? "right" : swipeX < -18 ? "left" : null;
  const swipeStrength = Math.min(Math.abs(swipeX) / 120, 1);

  const handlers = useSwipeable({
    onSwiping: ({ deltaX }) => setSwipeX(deltaX),
    onSwiped: ({ deltaX, dir }) => {
      setSwipeX(0);

      if (Math.abs(deltaX) < swipeCommitThreshold) {
        return;
      }

      if (dir === "Right") {
        onToggle();
      }

      if (dir === "Left") {
        onDelete();
      }
    },
    trackMouse: true
  });

  return (
    <motion.div
      whileTap={{ scale: 0.985 }}
      animate={{
        x: swipeX,
        y: completedToday ? -2 : 0
      }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      {...handlers}
    >
      <motion.div
        animate={{
          boxShadow: completedToday
            ? "0 20px 60px -20px rgba(16, 185, 129, 0.22)"
            : "0 20px 60px -20px rgba(15, 23, 42, 0.28)"
        }}
        className="relative space-y-4 rounded-[28px]"
      >
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]">
        <div
          className={cn(
            "absolute inset-y-0 left-0 flex w-48 items-center gap-3 rounded-l-[28px] px-5 text-sm font-semibold transition",
            swipeDirection === "right"
              ? "bg-emerald-500/18 text-emerald-700 dark:text-emerald-300"
              : "bg-transparent text-transparent"
          )}
          style={{ opacity: swipeDirection === "right" ? swipeStrength : 0 }}
        >
          <div
            className={cn(
              "rounded-full px-2.5 py-1 text-xs text-white shadow-sm transition",
              Math.abs(swipeX) >= swipeCommitThreshold
                ? "bg-emerald-600 shadow-emerald-500/40"
                : "bg-emerald-500 shadow-emerald-500/30"
            )}
          >
            {Math.abs(swipeX) >= swipeCommitThreshold ? "Release" : "Keep swiping"}
          </div>
          <span>
            {Math.abs(swipeX) >= swipeCommitThreshold
              ? "Release to mark complete"
              : "Swipe right to complete"}
          </span>
        </div>
        <div
          className={cn(
            "absolute inset-y-0 right-0 flex w-44 items-center justify-end gap-3 rounded-r-[28px] px-5 text-sm font-semibold transition",
            swipeDirection === "left"
              ? "bg-rose-500/18 text-rose-700 dark:text-rose-300"
              : "bg-transparent text-transparent"
          )}
          style={{ opacity: swipeDirection === "left" ? swipeStrength : 0 }}
        >
          <span>
            {Math.abs(swipeX) >= swipeCommitThreshold
              ? "Release to delete"
              : "Swipe left to delete"}
          </span>
          <div
            className={cn(
              "rounded-full px-2.5 py-1 text-xs text-white shadow-sm transition",
              Math.abs(swipeX) >= swipeCommitThreshold
                ? "bg-rose-600 shadow-rose-500/40"
                : "bg-rose-500 shadow-rose-500/30"
            )}
          >
            {Math.abs(swipeX) >= swipeCommitThreshold ? "Release" : "Keep swiping"}
          </div>
        </div>
      </div>
      <Card className={`bg-gradient-to-br ${habit.color} border-white/60`}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 space-y-3">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <motion.div
                  animate={{ scale: completedToday ? [1, 1.08, 1] : 1, rotate: completedToday ? [0, -4, 0] : 0 }}
                  transition={{ duration: 0.35 }}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/80 text-2xl shadow-sm dark:bg-base-900/80"
                >
                  {habit.emoji}
                </motion.div>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  onBlur={() => onSave(name, target)}
                  className="min-w-[180px] flex-1 bg-transparent text-lg font-semibold leading-tight text-base-900 outline-none dark:text-white"
                />
                <span className="inline-flex h-8 items-center rounded-full bg-white/70 px-3 text-xs font-medium text-base-600 dark:bg-base-900/70 dark:text-base-300">
                  {habit.frequency === "daily" ? "Daily" : `${habit.target}x weekly`}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-base-600 dark:text-base-300">
                <div className="inline-flex h-9 items-center gap-1.5 rounded-full bg-white/65 px-3 dark:bg-base-900/65">
                  <Flame className="h-4 w-4 text-amber-500" />
                  <span>{streak} streak</span>
                </div>
                <label className="inline-flex h-9 items-center gap-2 rounded-full bg-white/65 px-3 dark:bg-base-900/65">
                  <span className="text-sm">Target</span>
                  <input
                    type="number"
                    min={1}
                    max={7}
                    value={target}
                    onChange={(event) => setTarget(Number(event.target.value))}
                    onBlur={() => onSave(name, target)}
                    className="w-12 bg-transparent text-right text-base font-medium outline-none sm:text-sm"
                  />
                </label>
                <span className="pt-0.5 text-xs text-base-500">Swipe right to complete, left to delete</span>
              </div>
          </div>

          <div className="flex w-full items-stretch gap-2 lg:w-auto lg:items-start lg:justify-end lg:pt-1">
            <motion.button
              onClick={onToggle}
              type="button"
              whileTap={{ scale: 0.95 }}
              animate={{ scale: completedToday ? [1, 1.04, 1] : 1 }}
              transition={{ duration: 0.28 }}
              className={`flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition lg:flex-none ${
                completedToday
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                  : "bg-white/80 text-base-900 ring-1 ring-white/70 dark:bg-base-900/80 dark:text-white"
              }`}
            >
              <Check className="h-4 w-4" />
              {completedToday ? "Completed today" : "Mark complete"}
            </motion.button>
            <button
              onClick={onDelete}
              type="button"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/75 text-base-500 ring-1 ring-white/60 transition hover:bg-rose-500 hover:text-white dark:bg-base-900/80 dark:ring-white/10"
              aria-label="Delete habit"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        {children ? (
          <div className="mt-4 border-t border-white/40 pt-4 dark:border-white/10">
            {children}
          </div>
        ) : null}
      </Card>
      </motion.div>
    </motion.div>
  );
}
