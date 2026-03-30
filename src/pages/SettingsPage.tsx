import { Moon, Sun, Upload } from "lucide-react";
import type { ChangeEvent } from "react";
import { toast } from "sonner";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useAppStore } from "@/store/useAppStore";
import type { PersistedAppState, ThemeMode } from "@/store/types";

const themeModes: Array<{ value: ThemeMode; label: string }> = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" }
];

export default function SettingsPage() {
  const themeMode = useAppStore((state) => state.settings.themeMode);
  const setThemeMode = useAppStore((state) => state.setThemeMode);
  const resetAllData = useAppStore((state) => state.resetAllData);
  const importData = useAppStore((state) => state.importData);
  const habits = useAppStore((state) => state.habits);
  const tasks = useAppStore((state) => state.tasks);
  const settings = useAppStore((state) => state.settings);
  const appVersion = __APP_VERSION__;
  const buildHash = __APP_BUILD_HASH__;
  const buildTimestamp = new Date(__APP_BUILD_TIMESTAMP__).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  });

  const handleExport = () => {
    const blob = new Blob([JSON.stringify({ habits, tasks, settings }, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "tracker-backup.json";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Data exported");
  };

  const handleImport = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as PersistedAppState;
      await importData(parsed);
      toast.success("Data imported");
    } catch {
      toast.error("Import failed");
    } finally {
      event.target.value = "";
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        subtitle="Control theme, safeguard your data, and keep Tracker tuned to your workflow."
      />

      <div className="grid gap-4 xl:grid-cols-2">
        <Card className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-base-900 dark:text-base-50">Appearance</h3>
            <p className="text-sm text-base-500 dark:text-base-300">Switch between automatic and manual theme modes.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {themeModes.map((theme) => (
              <Button
                key={theme.value}
                variant={themeMode === theme.value ? "primary" : "secondary"}
                onClick={() => setThemeMode(theme.value)}
                className="gap-2"
              >
                {theme.value === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                {theme.label}
              </Button>
            ))}
          </div>
        </Card>

        <Card className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-base-900 dark:text-base-50">Data controls</h3>
            <p className="text-sm text-base-500 dark:text-base-300">Export your workspace, restore a backup, or reset everything.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" onClick={handleExport}>
              Export JSON
            </Button>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-white/80 px-4 py-2.5 text-sm font-semibold text-base-900 ring-1 ring-base-200 transition hover:bg-white dark:bg-base-800/80 dark:text-white dark:ring-base-700">
              <Upload className="h-4 w-4" />
              Import JSON
              <input type="file" accept="application/json" className="hidden" onChange={handleImport} />
            </label>
            <Button
              variant="danger"
              onClick={async () => {
                await resetAllData();
                toast.success("Data reset");
              }}
            >
              Reset all data
            </Button>
          </div>
        </Card>
      </div>

      <Card className="space-y-3">
        <h3 className="text-lg font-semibold text-base-900 dark:text-base-50">Preview & install</h3>
        <p className="text-sm text-base-500 dark:text-base-300">
          Open the app in a mobile browser or Chromium desktop browser and use the install prompt to add Tracker to the home screen.
        </p>
        <p className="text-sm text-base-500 dark:text-base-300">
          Offline data is stored locally in IndexedDB with a LocalStorage fallback for resilience.
        </p>
        <div className="flex items-center justify-between rounded-2xl bg-base-100/90 px-4 py-3 text-sm ring-1 ring-base-200 dark:bg-base-800/80 dark:ring-base-700">
          <span className="font-medium text-base-700 dark:text-base-200">App version</span>
          <span className="rounded-full bg-white px-3 py-1 font-semibold text-base-900 ring-1 ring-base-200 dark:bg-base-900 dark:text-base-50 dark:ring-base-700">
            v{appVersion}
          </span>
        </div>
        <div className="grid gap-3 rounded-2xl bg-base-100/90 px-4 py-3 text-sm ring-1 ring-base-200 dark:bg-base-800/80 dark:ring-base-700 sm:grid-cols-2">
          <div className="space-y-1">
            <div className="font-medium text-base-700 dark:text-base-200">Build</div>
            <div className="font-mono text-base-900 dark:text-base-50">{buildHash}</div>
          </div>
          <div className="space-y-1">
            <div className="font-medium text-base-700 dark:text-base-200">Built on</div>
            <div className="text-base-900 dark:text-base-50">{buildTimestamp}</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
