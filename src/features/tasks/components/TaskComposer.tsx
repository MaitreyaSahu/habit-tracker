import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import type { TaskPriority } from "@/store/types";

interface TaskComposerProps {
  onCreate: (input: {
    title: string;
    description: string;
    subject: string;
    priority: TaskPriority;
    deadline: string;
    tags: string[];
  }) => void;
}

export default function TaskComposer({ onCreate }: TaskComposerProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState<TaskPriority | "">("");
  const [deadline, setDeadline] = useState("");
  const [tags, setTags] = useState("");

  return (
    <Card className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-base-900 dark:text-white">Plan a study block</h3>
        <p className="text-sm text-base-500 dark:text-base-300">Capture tasks with structure and intent.</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Organic chemistry recap"
          className="rounded-2xl border border-base-200 bg-white/80 px-4 py-3 text-sm outline-none transition focus:border-sky-400 dark:border-base-700 dark:bg-base-800/80"
        />
        <input
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          placeholder="Subject"
          className="rounded-2xl border border-base-200 bg-white/80 px-4 py-3 text-sm outline-none transition focus:border-sky-400 dark:border-base-700 dark:bg-base-800/80"
        />
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="What exactly needs to be done?"
          className="min-h-28 rounded-2xl border border-base-200 bg-white/80 px-4 py-3 text-sm outline-none transition focus:border-sky-400 dark:border-base-700 dark:bg-base-800/80"
        />
        <div className="grid gap-3">
          <select
            value={priority}
            onChange={(event) => setPriority(event.target.value as TaskPriority | "")}
            className="rounded-2xl border border-base-200 bg-white/80 px-4 py-3 text-sm outline-none dark:border-base-700 dark:bg-base-800/80"
          >
            <option value="">Priority</option>
            <option value="low">Low priority</option>
            <option value="medium">Medium priority</option>
            <option value="high">High priority</option>
          </select>
          <input
            type="date"
            value={deadline}
            onChange={(event) => setDeadline(event.target.value)}
            className="rounded-2xl border border-base-200 bg-white/80 px-4 py-3 text-sm outline-none dark:border-base-700 dark:bg-base-800/80"
          />
          <input
            value={tags}
            onChange={(event) => setTags(event.target.value)}
            placeholder="Tags, comma separated"
            className="rounded-2xl border border-base-200 bg-white/80 px-4 py-3 text-sm outline-none dark:border-base-700 dark:bg-base-800/80"
          />
        </div>
      </div>
      <Button
        onClick={() => {
          if (!title.trim() || !subject.trim() || !priority || !deadline) {
            return;
          }
          onCreate({
            title: title.trim(),
            description: description.trim(),
            subject: subject.trim(),
            priority,
            deadline,
            tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean)
          });
          setTitle("");
          setDescription("");
          setSubject("");
          setPriority("");
          setDeadline("");
          setTags("");
        }}
      >
        Add task
      </Button>
    </Card>
  );
}
