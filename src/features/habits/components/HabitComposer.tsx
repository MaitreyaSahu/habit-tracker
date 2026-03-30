import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import type { HabitFrequency } from "@/store/types";

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

export default function HabitComposer({ onCreate }: HabitComposerProps) {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [frequency, setFrequency] = useState<HabitFrequency | "">("");
  const [target, setTarget] = useState("");
  const [color, setColor] = useState(colorChoices[0]);

  return (
    <Card className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-base-900 dark:text-white">New habit</h3>
        <p className="text-sm text-base-500 dark:text-base-300">Add a ritual worth repeating.</p>
      </div>
      <div className="grid gap-3 md:grid-cols-[0.9fr_2.1fr_1fr_1fr]">
        <input
          value={emoji}
          maxLength={2}
          onChange={(event) => setEmoji(event.target.value)}
          className="rounded-2xl border border-base-200 bg-white/80 px-4 py-3 text-center text-2xl outline-none transition focus:border-sky-400 dark:border-base-700 dark:bg-base-800/80"
          placeholder="✨"
        />
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="rounded-2xl border border-base-200 bg-white/80 px-4 py-3 text-sm outline-none transition focus:border-sky-400 dark:border-base-700 dark:bg-base-800/80"
          placeholder="Morning walk"
        />
        <select
          value={frequency}
          onChange={(event) => setFrequency(event.target.value as HabitFrequency | "")}
          className="rounded-2xl border border-base-200 bg-white/80 px-4 py-3 text-sm outline-none dark:border-base-700 dark:bg-base-800/80"
        >
          <option value="">Frequency</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
        <input
          type="number"
          min={1}
          max={7}
          value={target}
          onChange={(event) => setTarget(event.target.value)}
          className="rounded-2xl border border-base-200 bg-white/80 px-4 py-3 text-sm outline-none dark:border-base-700 dark:bg-base-800/80"
          placeholder="Target"
        />
      </div>
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
            const parsedTarget = Number(target);
            if (
              !name.trim() ||
              !emoji.trim() ||
              !frequency ||
              !target ||
              Number.isNaN(parsedTarget) ||
              parsedTarget < 1
            ) {
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
          }}
        >
          Create habit
        </Button>
      </div>
    </Card>
  );
}
