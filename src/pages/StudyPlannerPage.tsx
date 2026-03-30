import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import TaskComposer from "@/features/tasks/components/TaskComposer";
import TaskBoard from "@/features/tasks/components/TaskBoard";
import type { TaskFilter } from "@/store/types";
import { useAppStore } from "@/store/useAppStore";
import { getTaskFilterLabel, isTaskToday, isTaskUpcoming } from "@/utils/date";

const filters: TaskFilter[] = ["today", "upcoming", "completed"];

export default function StudyPlannerPage() {
  const [filter, setFilter] = useState<TaskFilter>("today");
  const [query, setQuery] = useState("");
  const tasks = useAppStore((state) => state.tasks);
  const addTask = useAppStore((state) => state.addTask);
  const updateTask = useAppStore((state) => state.updateTask);
  const deleteTask = useAppStore((state) => state.deleteTask);
  const restoreTask = useAppStore((state) => state.restoreTask);
  const toggleTaskCompletion = useAppStore((state) => state.toggleTaskCompletion);
  const reorderTasks = useAppStore((state) => state.reorderTasks);

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        if (filter === "today") {
          return !task.completed && isTaskToday(task);
        }
        if (filter === "upcoming") {
          return !task.completed && isTaskUpcoming(task);
        }
        return task.completed;
      })
      .filter((task) => {
        const haystack = `${task.title} ${task.description} ${task.subject} ${task.tags.join(" ")}`.toLowerCase();
        return haystack.includes(query.toLowerCase());
      });
  }, [filter, query, tasks]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Study planner"
        subtitle="Structure your workload with priorities, drag-and-drop ordering, and fast completion."
      />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        <TaskComposer
          onCreate={(input) => {
            addTask(input);
            toast.success("Task added");
          }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, delay: 0.04, ease: "easeOut" }}
        className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"
      >
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <Button
              key={item}
              variant={filter === item ? "primary" : "secondary"}
              onClick={() => setFilter(item)}
            >
              {getTaskFilterLabel(item)}
            </Button>
          ))}
        </div>

        <label className="flex min-w-[260px] items-center gap-2 rounded-2xl border border-base-200 bg-white/80 px-4 py-3 text-sm dark:border-base-700 dark:bg-base-800/80">
          <Search className="h-4 w-4 text-base-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search tasks or tags"
            className="w-full bg-transparent outline-none"
          />
        </label>
      </motion.div>

      <AnimatePresence mode="wait">
        {filteredTasks.length === 0 ? (
          <motion.div
            key="empty-tasks"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
          >
            <EmptyState
              title="Nothing in this lane"
              description="Change the filter or add a task to shape your next focused session."
            />
          </motion.div>
        ) : (
          <motion.div
            key={`tasks-${filter}-${query}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.24 }}
          >
            <TaskBoard
              tasks={filteredTasks}
              onReorder={reorderTasks}
              onToggle={(id) => {
                toggleTaskCompletion(id);
                toast.success("Task updated");
              }}
              onDelete={(id) => {
                const deletedTask = tasks.find((task) => task.id === id);
                const deletedIndex = tasks.findIndex((task) => task.id === id);
                deleteTask(id);
                toast("Task deleted", {
                  action:
                    deletedTask && deletedIndex !== -1
                      ? {
                          label: "Undo",
                          onClick: () => restoreTask(deletedTask, deletedIndex)
                        }
                      : undefined
                });
              }}
              onUpdate={updateTask}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
