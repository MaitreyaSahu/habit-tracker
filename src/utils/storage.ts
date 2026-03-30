import { demoState } from "@/utils/demo-data";
import { clearPersistedState, loadPersistedState, savePersistedState } from "@/utils/db";
import type { PersistedAppState } from "@/store/types";

export async function restoreAppState() {
  const persisted = await loadPersistedState();
  return persisted ?? demoState;
}

export async function persistAppState(state: PersistedAppState) {
  await savePersistedState(state);
}

export async function wipeAppState() {
  await clearPersistedState();
}
