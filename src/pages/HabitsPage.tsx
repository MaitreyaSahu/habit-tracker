import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import PageHeader from "@/components/layout/PageHeader";
import EmptyState from "@/components/ui/EmptyState";
import HabitComposer from "@/features/habits/components/HabitComposer";
import HabitCalendar from "@/features/habits/components/HabitCalendar";
import HabitItem from "@/features/habits/components/HabitItem";
import { useAppStore } from "@/store/useAppStore";

export default function HabitsPage() {
  const habits = useAppStore((state) => state.habits);
  const addHabit = useAppStore((state) => state.addHabit);
  const updateHabit = useAppStore((state) => state.updateHabit);
  const deleteHabit = useAppStore((state) => state.deleteHabit);
  const restoreHabit = useAppStore((state) => state.restoreHabit);
  const toggleHabitCompletion = useAppStore((state) => state.toggleHabitCompletion);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Habit tracking"
        subtitle="Build rhythms you can trust, with streaks and history that work offline."
      />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        <HabitComposer
          onCreate={(input) => {
            addHabit(input);
            toast.success("Habit created");
          }}
        />
      </motion.div>

      <AnimatePresence mode="wait">
        {habits.length === 0 ? (
          <motion.div
            key="empty-habits"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
          >
            <EmptyState
              title="No habits yet"
              description="Start with one habit you want to make effortless. It will show streaks and history instantly."
            />
          </motion.div>
        ) : (
          <motion.div
            key="habit-list"
            className="space-y-4"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.06
                }
              }
            }}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -12 }}
          >
            {habits.map((habit) => (
              <motion.div
                key={habit.id}
                className="space-y-4"
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
              <HabitItem
                  habit={habit}
                  onToggle={() => {
                    toggleHabitCompletion(habit.id);
                    toast.success("Habit updated");
                  }}
                  onDelete={() => {
                    const deletedHabit = habit;
                    const deletedIndex = habits.findIndex((entry) => entry.id === habit.id);
                    deleteHabit(habit.id);
                    toast("Habit deleted", {
                      action: {
                        label: "Undo",
                        onClick: () => restoreHabit(deletedHabit, deletedIndex)
                      }
                    });
                  }}
                  onSave={(name, target) => updateHabit(habit.id, { name, target })}
                >
                  <HabitCalendar habit={habit} />
                </HabitItem>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
