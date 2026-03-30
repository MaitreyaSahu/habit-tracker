import { Clock3, Flame, Goal, Target } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProgressChart from "@/components/charts/ProgressChart";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
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
        <p className="text-sm text-base-600 dark:text-base-300">Pomodoro</p>
        <div className="text-4xl font-semibold text-base-950 dark:text-white">
          {minutes}:{seconds}
        </div>
        <p className="text-sm text-base-600 dark:text-base-300">
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

  if (habits.length === 0 && tasks.length === 0) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Calm clarity for your day"
          subtitle="Track your streaks, steer your study time, and keep momentum visible."
        />
        <EmptyState
          title="Your dashboard is ready"
          description="Create your first habit or task to start filling this space with progress, streaks, and study momentum."
        />
        <PomodoroCard />
      </div>
    );
  }

  const metrics = getDashboardMetrics(habits, tasks);
  const nextTask = tasks
    .filter((task) => !task.completed)
    .sort((a, b) => a.deadline.localeCompare(b.deadline))[0];

  const summaryStats = [
    {
      label: "Habit completion",
      value: `${metrics.dailyProgress}%`,
      icon: Target,
      iconClassName: "text-sky-700 dark:text-sky-300",
      panelClassName: "bg-sky-100/90 ring-sky-200 dark:bg-sky-500/12 dark:ring-sky-500/20"
    },
    {
      label: "Longest streak",
      value: `${metrics.topStreak}`,
      icon: Flame,
      iconClassName: "text-amber-700 dark:text-amber-300",
      panelClassName: "bg-amber-100/90 ring-amber-200 dark:bg-amber-500/12 dark:ring-amber-500/20"
    },
    {
      label: "Study tasks",
      value: `${tasks.length}`,
      icon: Goal,
      iconClassName: "text-teal-700 dark:text-teal-300",
      panelClassName: "bg-teal-100/90 ring-teal-200 dark:bg-teal-500/12 dark:ring-teal-500/20"
    },
    {
      label: "Next due task",
      value: nextTask ? relativeDateLabel(nextTask.deadline) : "No deadline",
      icon: Clock3,
      iconClassName: "text-rose-700 dark:text-rose-300",
      panelClassName: "bg-rose-100/90 ring-rose-200 dark:bg-rose-500/12 dark:ring-rose-500/20"
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Calm clarity for your day"
        subtitle="Track your streaks, steer your study time, and keep momentum visible."
      />

      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <Card className="overflow-hidden border-base-200/80 bg-gradient-to-br from-white via-base-50 to-sky-50/80 shadow-xl dark:border-white/10 dark:from-base-900 dark:via-base-900 dark:to-base-800">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.25em] text-base-500 dark:text-base-300">
                Daily pulse
              </p>
              <h2 className="max-w-lg text-3xl font-semibold leading-tight text-base-950 dark:text-white">
                You completed {metrics.habitsCompletedToday} habits today and wrapped {metrics.weeklyTaskWins} study wins this week.
              </h2>
              <p className="max-w-xl text-sm leading-6 text-base-600 dark:text-base-300">
                A quick overview of your current momentum, so the most important signals are easy to read at a glance.
              </p>
              <div className="flex flex-wrap gap-3 text-sm text-base-700 dark:text-base-200">
                <span className="rounded-full bg-base-900 px-3 py-2 text-white dark:bg-white dark:text-base-900">
                  {metrics.topStreak} best streak
                </span>
                <span className="rounded-full bg-white px-3 py-2 ring-1 ring-base-200 dark:bg-base-800 dark:ring-base-700">
                  {metrics.studyProgress}% study completion
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {summaryStats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className={`rounded-[24px] p-4 ring-1 ${stat.panelClassName}`}
                  >
                    <Icon className={`h-5 w-5 ${stat.iconClassName}`} />
                    <div className="mt-4 text-2xl font-semibold text-base-950 dark:text-white">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-sm text-base-700 dark:text-base-300">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        <PomodoroCard />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <div>
            <h3 className="text-lg font-semibold text-base-950 dark:text-white">Momentum this week</h3>
            <p className="text-sm text-base-600 dark:text-base-300">
              Habit and task completions over the last seven days.
            </p>
          </div>
          <ProgressChart data={metrics.focusSeries} />
        </Card>

        <Card>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col items-center gap-4">
              <ProgressRing value={metrics.dailyProgress} label="Habits" />
              <div className="text-center text-sm text-base-600 dark:text-base-300">
                Today's habits are {metrics.dailyProgress >= 60 ? "well on track" : "warming up"}.
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <ProgressRing value={metrics.studyProgress} label="Study" />
              <div className="text-center text-sm text-base-600 dark:text-base-300">
                Study completion reflects your total completed planner tasks.
              </div>
            </div>
          </div>
        </Card>
      </div>

      {habits.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {habits.slice(0, 2).map((habit) => (
            <motion.div key={habit.id} layout>
              <Card className={`bg-gradient-to-br ${habit.color}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-base-700 dark:text-base-200">
                      {habit.frequency}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold text-base-950 dark:text-white">
                      {habit.emoji} {habit.name}
                    </h3>
                  </div>
                  <div className="rounded-2xl bg-white/90 px-4 py-3 text-center ring-1 ring-white/70 dark:bg-base-900/85 dark:ring-white/10">
                    <div className="text-2xl font-semibold text-base-950 dark:text-white">
                      {Object.keys(habit.history).length}
                    </div>
                    <div className="text-xs text-base-600 dark:text-base-300">Total wins</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
