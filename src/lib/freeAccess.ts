import type { FreeAccess } from "@/utils/freeCourse.functions";

/** Client-seitiger Zugang zum kostenlosen System (localStorage). */

const KEY = "tcs_free_access";
const PROGRESS_KEY = "tcs_free_progress";

export function readAccess(): FreeAccess | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as FreeAccess;
    return parsed && typeof parsed.token === "string" ? parsed : null;
  } catch {
    return null;
  }
}

export function writeAccess(access: FreeAccess): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(access));
  } catch {
    /* privater Modus o. ä. — der Kurs bleibt über den E-Mail-Link erreichbar */
  }
}

export function clearAccess(): void {
  try {
    window.localStorage.removeItem(KEY);
    window.localStorage.removeItem(PROGRESS_KEY);
  } catch {
    /* ignore */
  }
}

export function readProgress(): Record<string, "started" | "completed"> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(PROGRESS_KEY) ?? "{}") as Record<string, "started" | "completed">;
  } catch {
    return {};
  }
}

export function writeProgress(slug: string, state: "started" | "completed"): void {
  const current = readProgress();
  if (current[slug] === "completed" && state === "started") return;
  current[slug] = state;
  try {
    window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(current));
  } catch {
    /* ignore */
  }
}

/** UTM-Parameter aus der aktuellen URL — für die Quelle in Close. */
export function readUtm(): { source?: string; medium?: string; campaign?: string; content?: string } {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  const get = (k: string) => p.get(k) ?? undefined;
  return { source: get("utm_source"), medium: get("utm_medium"), campaign: get("utm_campaign"), content: get("utm_content") };
}
