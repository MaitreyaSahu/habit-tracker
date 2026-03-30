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
  const toggleHabitCompletion = useAppStore((state) => state.toggleHabitCompletion);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Habit tracking"
        subtitle="Build rhythms you can trust, with streaks and history that work offline."
      />

      <HabitComposer
        onCreate={(input) => {
          addHabit(input);
          toast.success("Habit created");
        }}
      />

      {habits.length === 0 ? (
        <EmptyState
          title="No habits yet"
          description="Start with one habit you want to make effortless. It will show streaks and history instantly."
        />
      ) : (
        <div className="space-y-4">
          {habits.map((habit) => (
            <div key={habit.id} className="space-y-4">
              <HabitItem
                habit={habit}
                onToggle={() => {
                  toggleHabitCompletion(habit.id);
                  toast.success("Habit updated");
                }}
                onDelete={() => {
                  deleteHabit(habit.id);
                  toast.success("Habit deleted");
                }}
                onSave={(name, target) => updateHabit(habit.id, { name, target })}
              />
              <HabitCalendar habit={habit} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
