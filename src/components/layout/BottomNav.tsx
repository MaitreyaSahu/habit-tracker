import { BarChart3, CheckSquare, Settings, Sparkles } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/utils/cn";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { to: "/habits", label: "Habits", icon: Sparkles },
  { to: "/study-planner", label: "Study", icon: CheckSquare },
  { to: "/settings", label: "Settings", icon: Settings }
];

export default function BottomNav() {
  return (
    <nav className="sticky bottom-4 z-40 mt-6">
      <div className="mx-auto grid max-w-xl grid-cols-4 rounded-[28px] border border-white/60 bg-white/80 p-2 shadow-card backdrop-blur-xl dark:border-white/10 dark:bg-base-900/80">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-1 rounded-2xl px-3 py-2 text-xs font-medium transition",
                isActive
                  ? "bg-base-900 text-white dark:bg-white dark:text-base-900"
                  : "text-base-500 hover:bg-base-100 dark:text-base-400 dark:hover:bg-base-800"
              )
            }
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
