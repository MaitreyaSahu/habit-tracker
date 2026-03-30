import { openDB } from "idb";
import type { PersistedAppState } from "@/store/types";

const DB_NAME = "tracker-db";
const STORE_NAME = "app-state";
const STATE_KEY = "tracker-state";
const fallbackKey = "tracker-local-backup";

async function getDb() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    }
  });
}

export async function loadPersistedState() {
  try {
    const db = await getDb();
    const data = await db.get(STORE_NAME, STATE_KEY);
    if (data) {
      return data as PersistedAppState;
    }
  } catch {
    const fallback = localStorage.getItem(fallbackKey);
    if (fallback) {
      return JSON.parse(fallback) as PersistedAppState;
    }
  }

  return null;
}

export async function savePersistedState(state: PersistedAppState) {
  const serialized = JSON.stringify(state);

  try {
    const db = await getDb();
    await db.put(STORE_NAME, state, STATE_KEY);
  } finally {
    localStorage.setItem(fallbackKey, serialized);
  }
}

export async function clearPersistedState() {
  try {
    const db = await getDb();
    await db.delete(STORE_NAME, STATE_KEY);
  } finally {
    localStorage.removeItem(fallbackKey);
  }
}
