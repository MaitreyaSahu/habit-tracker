import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import type { TaskPriority } from "@/store/types";
import { cn } from "@/utils/cn";

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
  const [submitted, setSubmitted] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

  const errors = {
    title:
      !title.trim() ? "Task title is required." : title.trim().length < 3 ? "Use at least 3 characters for the title." : "",
    subject:
      !subject.trim() ? "Subject is required." : subject.trim().length < 2 ? "Use at least 2 characters for the subject." : "",
    priority: !priority ? "Select a priority level." : "",
    deadline: !deadline ? "Deadline is required." : deadline < today ? "Deadline cannot be in the past." : ""
  };
  const hasErrors = Object.values(errors).some(Boolean);
  const showError = (message: string) => submitted && Boolean(message);

  return (
    <Card className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-base-900 dark:text-base-50">Plan a study block</h3>
        <p className="text-sm text-base-500 dark:text-base-300">Capture tasks with structure and intent.</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-1.5">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Organic chemistry recap"
            className={cn(
              "w-full rounded-2xl border bg-white/80 px-4 py-3 text-base outline-none transition focus:border-sky-400 sm:text-sm dark:bg-base-800/80",
              showError(errors.title) ? "border-rose-400 dark:border-rose-400" : "border-base-200 dark:border-base-700"
            )}
          />
          <p className={cn("min-h-5 text-xs", showError(errors.title) ? "text-rose-600 dark:text-rose-300" : "text-transparent")}>
            {showError(errors.title) ? errors.title : "."}
          </p>
        </div>
        <div className="space-y-1.5">
          <input
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            placeholder="Subject"
            className={cn(
              "w-full rounded-2xl border bg-white/80 px-4 py-3 text-base outline-none transition focus:border-sky-400 sm:text-sm dark:bg-base-800/80",
              showError(errors.subject) ? "border-rose-400 dark:border-rose-400" : "border-base-200 dark:border-base-700"
            )}
          />
          <p className={cn("min-h-5 text-xs", showError(errors.subject) ? "text-rose-600 dark:text-rose-300" : "text-transparent")}>
            {showError(errors.subject) ? errors.subject : "."}
          </p>
        </div>
        <div className="space-y-1.5">
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="What exactly needs to be done?"
            className="min-h-28 w-full rounded-2xl border border-base-200 bg-white/80 px-4 py-3 text-base outline-none transition focus:border-sky-400 sm:text-sm dark:border-base-700 dark:bg-base-800/80"
          />
          <p className="min-h-5 text-xs text-base-400 dark:text-base-500">
            Optional, but useful for breaking the task down.
          </p>
        </div>
        <div className="grid gap-3">
          <div className="space-y-1.5">
            <select
              value={priority}
              onChange={(event) => setPriority(event.target.value as TaskPriority | "")}
              className={cn(
                "w-full rounded-2xl border bg-white/80 px-4 py-3 text-base outline-none sm:text-sm dark:bg-base-800/80",
                showError(errors.priority) ? "border-rose-400 dark:border-rose-400" : "border-base-200 dark:border-base-700"
              )}
            >
              <option value="">Priority</option>
              <option value="low">Low priority</option>
              <option value="medium">Medium priority</option>
              <option value="high">High priority</option>
            </select>
            <p className={cn("min-h-5 text-xs", showError(errors.priority) ? "text-rose-600 dark:text-rose-300" : "text-transparent")}>
              {showError(errors.priority) ? errors.priority : "."}
            </p>
          </div>
          <div className="space-y-1.5">
            <input
              type="date"
              value={deadline}
              onChange={(event) => setDeadline(event.target.value)}
              min={today}
              className={cn(
                "w-full rounded-2xl border bg-white/80 px-4 py-3 text-base outline-none sm:text-sm dark:bg-base-800/80",
                showError(errors.deadline) ? "border-rose-400 dark:border-rose-400" : "border-base-200 dark:border-base-700"
              )}
            />
            <p className={cn("min-h-5 text-xs", showError(errors.deadline) ? "text-rose-600 dark:text-rose-300" : "text-transparent")}>
              {showError(errors.deadline) ? errors.deadline : "."}
            </p>
          </div>
          <div className="space-y-1.5">
            <input
            value={tags}
            onChange={(event) => setTags(event.target.value)}
            placeholder="Tags, comma separated"
            className="w-full rounded-2xl border border-base-200 bg-white/80 px-4 py-3 text-base outline-none sm:text-sm dark:border-base-700 dark:bg-base-800/80"
          />
            <p className="min-h-5 text-xs text-base-400 dark:text-base-500">
              Optional tags help with quick search later.
            </p>
          </div>
        </div>
      </div>
      {submitted && hasErrors ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-200">
          Please fix the highlighted task fields and try again.
        </div>
      ) : null}
      <Button
        onClick={() => {
          setSubmitted(true);
          if (hasErrors || !priority) {
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
          setSubmitted(false);
        }}
      >
        Add task
      </Button>
    </Card>
  );
}
