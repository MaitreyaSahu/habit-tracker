import type { PersistedAppState } from "@/store/types";

export const demoState: PersistedAppState = {
  habits: [],
  tasks: [],
  settings: {
    themeMode: "light"
  }
};
