import { useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";

function resolveTheme(mode: "system" | "light" | "dark") {
  if (mode === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return mode;
}

export function useAppBootstrap() {
  const hydrate = useAppStore((state) => state.hydrate);
  const hydrated = useAppStore((state) => state.hydrated);
  const themeMode = useAppStore((state) => state.settings.themeMode);

  useEffect(() => {
    if (!hydrated) {
      void hydrate();
    }
  }, [hydrate, hydrated]);

  useEffect(() => {
    const root = document.documentElement;
    const nextTheme = resolveTheme(themeMode);
    root.classList.toggle("dark", nextTheme === "dark");
    root.dataset.theme = nextTheme;
  }, [themeMode]);
}
