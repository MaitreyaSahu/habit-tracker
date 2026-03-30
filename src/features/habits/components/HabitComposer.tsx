import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import type { HabitFrequency } from "@/store/types";
import { cn } from "@/utils/cn";

interface HabitComposerProps {
  onCreate: (input: {
    name: string;
    emoji: string;
    frequency: HabitFrequency;
    target: number;
    color: string;
  }) => void;
}

const colorChoices = [
  "from-sky-500/25 to-cyan-400/10",
  "from-emerald-500/25 to-teal-400/10",
  "from-amber-500/25 to-orange-400/10",
  "from-rose-500/25 to-pink-400/10"
];

const iconChoices = ["📚", "💪", "🧘", "💧", "🏃", "🎯", "🧠", "🌙"];

export default function HabitComposer({ onCreate }: HabitComposerProps) {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [frequency, setFrequency] = useState<HabitFrequency | "">("");
  const [target, setTarget] = useState("");
  const [color, setColor] = useState(colorChoices[0]);
  const [submitted, setSubmitted] = useState(false);

  const parsedTarget = Number(target);
  const errors = {
    emoji: !emoji.trim() ? "Choose an emoji for the habit." : "",
    name:
      !name.trim() ? "Habit name is required." : name.trim().length < 3 ? "Use at least 3 characters." : "",
    frequency: !frequency ? "Select daily or weekly." : "",
    target:
      !target
        ? "Target is required."
        : Number.isNaN(parsedTarget) || !Number.isInteger(parsedTarget)
          ? "Target must be a whole number."
          : parsedTarget < 1 || parsedTarget > 7
            ? "Target must be between 1 and 7."
            : ""
  };
  const hasErrors = Object.values(errors).some(Boolean);
  const showError = (message: string) => submitted && Boolean(message);

  return (
    <Card className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-base-900 dark:text-base-50">New habit</h3>
        <p className="text-sm text-base-500 dark:text-base-300">Add a ritual worth repeating.</p>
      </div>
      <div className="grid gap-3 md:grid-cols-[1.2fr_2fr_1fr_1fr]">
        <div className="space-y-1.5">
          <div
            className={cn(
              "grid grid-cols-4 gap-2 rounded-2xl border bg-white/50 p-2 dark:bg-base-800/40",
              showError(errors.emoji) ? "border-rose-400 dark:border-rose-400" : "border-base-200 dark:border-base-700"
            )}
          >
            {iconChoices.map((icon) => (
              <button
                key={icon}
                type="button"
                onClick={() => setEmoji(icon)}
                className={cn(
                  "flex h-11 items-center justify-center rounded-2xl text-xl transition",
                  emoji === icon
                    ? "bg-base-900 text-white shadow-md dark:bg-white dark:text-base-900"
                    : "bg-white/80 text-base-900 hover:bg-white dark:bg-base-800 dark:text-white dark:hover:bg-base-700"
                )}
                aria-label={`Select ${icon}`}
              >
                {icon}
              </button>
            ))}
          </div>
          <p className={cn("min-h-5 text-xs", showError(errors.emoji) ? "text-rose-600 dark:text-rose-300" : "text-base-400 dark:text-base-500")}>
            {showError(errors.emoji) ? errors.emoji : "Pick an icon for the habit."}
          </p>
        </div>
        <div className="space-y-1.5">
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={cn(
              "w-full rounded-2xl border bg-white/80 px-4 py-3 text-sm outline-none transition focus:border-sky-400 dark:bg-base-800/80",
              showError(errors.name) ? "border-rose-400 dark:border-rose-400" : "border-base-200 dark:border-base-700"
            )}
            placeholder="Morning walk"
          />
          <p className={cn("min-h-5 text-xs", showError(errors.name) ? "text-rose-600 dark:text-rose-300" : "text-transparent")}>
            {showError(errors.name) ? errors.name : "."}
          </p>
        </div>
        <div className="space-y-1.5">
          <select
            value={frequency}
            onChange={(event) => setFrequency(event.target.value as HabitFrequency | "")}
            className={cn(
              "w-full rounded-2xl border bg-white/80 px-4 py-3 text-sm outline-none dark:bg-base-800/80",
              showError(errors.frequency) ? "border-rose-400 dark:border-rose-400" : "border-base-200 dark:border-base-700"
            )}
          >
            <option value="">Frequency</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
          <p className={cn("min-h-5 text-xs", showError(errors.frequency) ? "text-rose-600 dark:text-rose-300" : "text-transparent")}>
            {showError(errors.frequency) ? errors.frequency : "."}
          </p>
        </div>
        <div className="space-y-1.5">
          <input
            type="number"
            min={1}
            max={7}
            value={target}
            onChange={(event) => setTarget(event.target.value)}
            className={cn(
              "w-full rounded-2xl border bg-white/80 px-4 py-3 text-sm outline-none dark:bg-base-800/80",
              showError(errors.target) ? "border-rose-400 dark:border-rose-400" : "border-base-200 dark:border-base-700"
            )}
            placeholder="Target"
          />
          <p className={cn("min-h-5 text-xs", showError(errors.target) ? "text-rose-600 dark:text-rose-300" : "text-transparent")}>
            {showError(errors.target) ? errors.target : "."}
          </p>
        </div>
      </div>
      {submitted && hasErrors ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-200">
          Please fix the highlighted habit fields and try again.
        </div>
      ) : null}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {colorChoices.map((choice) => (
            <button
              key={choice}
              className={`h-10 w-10 rounded-2xl bg-gradient-to-br ${choice} ring-2 transition ${color === choice ? "ring-base-900 dark:ring-white" : "ring-transparent"}`}
              onClick={() => setColor(choice)}
              type="button"
            />
          ))}
        </div>
        <Button
          onClick={() => {
            setSubmitted(true);
            if (hasErrors || !frequency) {
              return;
            }
            onCreate({
              name: name.trim(),
              emoji: emoji.trim(),
              frequency,
              target: parsedTarget,
              color
            });
            setName("");
            setEmoji("");
            setFrequency("");
            setTarget("");
            setColor(colorChoices[0]);
            setSubmitted(false);
          }}
        >
          Create habit
        </Button>
      </div>
    </Card>
  );
}
