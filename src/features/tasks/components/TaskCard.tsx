import type { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";
import { CalendarDays, GripVertical, Tag, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import type { StudyTask } from "@/store/types";
import { cn } from "@/utils/cn";
import { formatShortDate, isTaskOverdue } from "@/utils/date";

interface TaskCardProps {
  task: StudyTask;
  dragHandleProps?: DraggableProvidedDragHandleProps;
  onToggle: () => void;
  onDelete: () => void;
  onUpdate: (updates: Partial<StudyTask>) => void;
}

const priorityStyles = {
  low: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  high: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300"
};

export default function TaskCard({
  task,
  dragHandleProps,
  onToggle,
  onDelete,
  onUpdate
}: TaskCardProps) {
  return (
    <motion.div
      layout
      whileTap={{ scale: 0.985 }}
      animate={{
        scale: task.completed ? 0.985 : 1,
        opacity: task.completed ? 0.88 : 1
      }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
    >
      <motion.div
        className="rounded-[28px] border border-white/60 bg-white/70 p-4 shadow-card backdrop-blur-xl dark:border-white/10 dark:bg-base-900/70"
        animate={{
          boxShadow: task.completed
            ? "0 20px 60px -20px rgba(16, 185, 129, 0.18)"
            : "0 20px 60px -20px rgba(15, 23, 42, 0.28)"
        }}
      >
        <div className="flex items-start gap-3">
          <motion.button
            type="button"
            onClick={onToggle}
            whileTap={{ scale: 0.88 }}
            animate={{
              scale: task.completed ? [1, 1.16, 1] : 1
            }}
            transition={{ duration: 0.28 }}
            className={cn(
              "mt-1 h-6 w-6 rounded-full border-2 transition",
              task.completed
                ? "border-emerald-500 bg-emerald-500"
                : "border-base-300 bg-transparent dark:border-base-600"
            )}
          />

          <div className="min-w-0 flex-1 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <input
                  value={task.title}
                  onChange={(event) => onUpdate({ title: event.target.value })}
                  className={cn(
                    "w-full bg-transparent text-base font-semibold outline-none",
                    task.completed && "line-through opacity-60"
                  )}
                />
                <textarea
                  value={task.description}
                  onChange={(event) => onUpdate({ description: event.target.value })}
                  className="mt-1 min-h-14 w-full resize-none bg-transparent text-sm text-base-500 outline-none dark:text-base-300"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-2xl p-2 text-base-400 transition hover:bg-base-100 dark:hover:bg-base-800"
                  {...dragHandleProps}
                >
                  <GripVertical className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="rounded-2xl p-2 text-base-400 transition hover:bg-rose-500 hover:text-white"
                  onClick={onDelete}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full bg-base-100 px-3 py-1.5 text-base-600 dark:bg-base-800 dark:text-base-300">
                {task.subject}
              </span>
              <span className={cn("rounded-full px-3 py-1.5 font-medium", priorityStyles[task.priority])}>
                {task.priority}
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full bg-base-100 px-3 py-1.5 text-base-600 dark:bg-base-800 dark:text-base-300",
                  isTaskOverdue(task) && "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300"
                )}
              >
                <CalendarDays className="h-3.5 w-3.5" />
                {formatShortDate(task.deadline)}
              </span>
              {task.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-3 py-1.5 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300"
                >
                  <Tag className="h-3.5 w-3.5" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
