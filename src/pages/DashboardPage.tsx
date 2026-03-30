import { Clock3, Flame, Goal, Target } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProgressChart from "@/components/charts/ProgressChart";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ProgressRing from "@/components/ui/ProgressRing";
import Skeleton from "@/components/ui/Skeleton";
import { useAppStore } from "@/store/useAppStore";
import { getDashboardMetrics } from "@/utils/analytics";
import { relativeDateLabel } from "@/utils/date";

function PomodoroCard() {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) {
      return;
    }

    const timer = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          setRunning(false);
          return 25 * 60;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [running]);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  return (
    <Card className="flex flex-col justify-between gap-5">
      <div className="space-y-2">
        <p className="text-sm text-base-500 dark:text-base-300">Pomodoro</p>
        <div className="text-4xl font-semibold text-base-900 dark:text-white">
          {minutes}:{seconds}
        </div>
        <p className="text-sm text-base-500 dark:text-base-300">
          Use quick focus sprints to keep your study sessions moving.
        </p>
      </div>
      <div className="flex gap-2">
        <Button onClick={() => setRunning((value) => !value)}>{running ? "Pause" : "Start"}</Button>
        <Button variant="secondary" onClick={() => setSecondsLeft(25 * 60)}>
          Reset
        </Button>
      </div>
    </Card>
  );
}

export default function DashboardPage() {
  const hydrated = useAppStore((state) => state.hydrated);
  const habits = useAppStore((state) => state.habits);
  const tasks = useAppStore((state) => state.tasks);

  if (!hydrated) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32" />
        <div className="grid gap-4 md:grid-cols-3">
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
        </div>
      </div>
    );
  }

  const metrics = getDashboardMetrics(habits, tasks);
  const nextTask = tasks
    .filter((task) => !task.completed)
    .sort((a, b) => a.deadline.localeCompare(b.deadline))[0];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Calm clarity for your day"
        subtitle="Track your streaks, steer your study time, and keep momentum visible."
      />

      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <Card className="overflow-hidden bg-base-900 text-white dark:bg-base-900">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.25em] text-white/60">Daily pulse</p>
              <h2 className="max-w-lg text-3xl font-semibold leading-tight">
                You completed {metrics.habitsCompletedToday} habits today and wrapped {metrics.weeklyTaskWins} study wins this week.
              </h2>
              <div className="flex flex-wrap gap-3 text-sm text-white/75">
                <span className="rounded-full bg-white/10 px-3 py-2">{metrics.topStreak} best streak</span>
                <span className="rounded-full bg-white/10 px-3 py-2">{metrics.studyProgress}% study completion</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-[24px] bg-white/10 p-4">
                <Target className="h-5 w-5 text-teal-300" />
                <div className="mt-4 text-3xl font-semibold">{metrics.dailyProgress}%</div>
                <div className="mt-1 text-sm text-white/65">Habit completion</div>
              </div>
              <div className="rounded-[24px] bg-white/10 p-4">
                <Flame className="h-5 w-5 text-amber-300" />
                <div className="mt-4 text-3xl font-semibold">{metrics.topStreak}</div>
                <div className="mt-1 text-sm text-white/65">Longest streak</div>
              </div>
              <div className="rounded-[24px] bg-white/10 p-4">
                <Goal className="h-5 w-5 text-sky-300" />
                <div className="mt-4 text-3xl font-semibold">{tasks.length}</div>
                <div className="mt-1 text-sm text-white/65">Study tasks</div>
              </div>
              <div className="rounded-[24px] bg-white/10 p-4">
                <Clock3 className="h-5 w-5 text-rose-300" />
                <div className="mt-4 text-lg font-semibold">{nextTask ? relativeDateLabel(nextTask.deadline) : "No deadline"}</div>
                <div className="mt-1 text-sm text-white/65">Next due task</div>
              </div>
            </div>
          </div>
        </Card>

        <PomodoroCard />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <div>
            <h3 className="text-lg font-semibold text-base-900 dark:text-white">Momentum this week</h3>
            <p className="text-sm text-base-500 dark:text-base-300">
              Habit and task completions over the last seven days.
            </p>
          </div>
          <ProgressChart data={metrics.focusSeries} />
        </Card>

        <Card>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col items-center gap-4">
              <ProgressRing value={metrics.dailyProgress} label="Habits" />
              <div className="text-center text-sm text-base-500 dark:text-base-300">
                Today’s habits are {metrics.dailyProgress >= 60 ? "well on track" : "warming up"}.
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <ProgressRing value={metrics.studyProgress} label="Study" />
              <div className="text-center text-sm text-base-500 dark:text-base-300">
                Study completion reflects your total completed planner tasks.
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {habits.slice(0, 2).map((habit) => (
          <motion.div key={habit.id} layout>
            <Card className={`bg-gradient-to-br ${habit.color}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-base-500 dark:text-base-300">{habit.frequency}</p>
                  <h3 className="mt-1 text-xl font-semibold text-base-900 dark:text-white">
                    {habit.emoji} {habit.name}
                  </h3>
                </div>
                <div className="rounded-2xl bg-white/75 px-4 py-3 text-center dark:bg-base-900/80">
                  <div className="text-2xl font-semibold text-base-900 dark:text-white">
                    {Object.keys(habit.history).length}
                  </div>
                  <div className="text-xs text-base-500">Total wins</div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
