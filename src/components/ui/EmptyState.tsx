import type { ReactNode } from "react";
import Card from "@/components/ui/Card";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export default function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative flex flex-col items-start gap-4">
        <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-gradient-to-br from-sky-400/20 to-teal-400/0 blur-2xl" />
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-base-900 text-2xl text-white dark:bg-white dark:text-base-900">
          ✦
        </div>
        <div>
          <h3 className="text-lg font-semibold text-base-900 dark:text-base-50">{title}</h3>
          <p className="mt-1 max-w-sm text-sm text-base-500 dark:text-base-300">{description}</p>
        </div>
        {action}
      </div>
    </Card>
  );
}
