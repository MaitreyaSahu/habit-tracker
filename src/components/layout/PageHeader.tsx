import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  action?: ReactNode;
}

export default function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-base-500 dark:text-base-200">
          Tracker
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-base-900 dark:text-base-50">{title}</h1>
        <p className="mt-2 text-sm text-base-500 dark:text-base-200">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}
