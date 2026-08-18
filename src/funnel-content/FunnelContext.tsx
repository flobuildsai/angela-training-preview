import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { resolveNiche, type NicheProfile } from "./niches";
import { trackEvent } from "@/lib/track";

const STORAGE_KEY = "cs_content_funnel_v1";

export const TOTAL_STEPS = 13;

export interface FunnelData {
  niche: string;
  followers: number; // index into FOLLOWER_BUCKETS
  posting: number;
  skill: number;
  camera: number;
  hours: number;
  readiness: number; // 1..10
  price: number;
  buyers: number;
  firstName: string;
  email: string;
  instagram: string;
}

export const FOLLOWER_BUCKETS = [
  { label: "Ich fange bei 0 an", value: 0, monthlyViews: 8000 },
  { label: "Unter 1.000", value: 500, monthlyViews: 20000 },
  { label: "1.000 – 10.000", value: 5000, monthlyViews: 60000 },
  { label: "10.000 – 50.000", value: 25000, monthlyViews: 200000 },
  { label: "50.000 – 250.000", value: 120000, monthlyViews: 700000 },
  { label: "Mehr als 250.000", value: 400000, monthlyViews: 2000000 },
];

export const POSTING_OPTIONS = [
  "Ich poste gerade gar nicht",
  "Unregelmäßig, wenn ich Lust habe",
  "1 bis 2 Mal pro Woche",
  "Fast jeden Tag",
];

export const SKILL_OPTIONS = [
  "Ich kann etwas erklären, das andere lernen wollen",
  "Ich begleite Menschen gerne persönlich, 1:1",
  "Ich möchte eine Community aufbauen",
  "Ich möchte ein digitales Produkt verkaufen",
  "Ich weiß es noch nicht genau",
];

export const CAMERA_OPTIONS = [
  "Ja, ich zeige mich schon",
  "Noch nicht, aber ich bin bereit",
  "Lieber ohne Gesicht",
];

export const HOURS_OPTIONS = [
  "Weniger als 5 Stunden",
  "5 bis 10 Stunden",
  "10 bis 20 Stunden",
  "Mehr als 20 Stunden",
];

const defaultData: FunnelData = {
  niche: "",
  followers: -1,
  posting: -1,
  skill: -1,
  camera: -1,
  hours: -1,
  readiness: 7,
  price: 297,
  buyers: 10,
  firstName: "",
  email: "",
  instagram: "",
};

interface Ctx {
  step: number;
  data: FunnelData;
  profile: NicheProfile;
  monthlyViews: number;
  score: number;
  setStep: (s: number) => void;
  next: () => void;
  back: () => void;
  update: (partial: Partial<FunnelData>) => void;
}

const FunnelContext = createContext<Ctx | null>(null);

export function useFunnel() {
  const ctx = useContext(FunnelContext);
  if (!ctx) throw new Error("useFunnel must be used within FunnelProvider");
  return ctx;
}

export const formatEur = (n: number) =>
  `${Math.round(n).toLocaleString("de-DE")}\u00A0€`;

export function FunnelProvider({ children }: { children: ReactNode }) {
  const [step, setStepRaw] = useState(0);
  const [data, setData] = useState<FunnelData>(defaultData);

  // hydrate once on the client
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setData((d) => ({ ...d, ...JSON.parse(raw) }));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* ignore */
    }
  }, [data]);

  const setStep = useCallback((s: number) => {
    const clamped = Math.min(Math.max(s, 0), TOTAL_STEPS - 1);
    setStepRaw(clamped);
    trackEvent("content_funnel_step", { step: clamped });
    if (typeof window !== "undefined") window.scrollTo({ top: 0, left: 0 });
  }, []);

  const next = useCallback(() => setStepRaw((s) => {
    const n = Math.min(s + 1, TOTAL_STEPS - 1);
    trackEvent("content_funnel_step", { step: n });
    if (typeof window !== "undefined") window.scrollTo({ top: 0, left: 0 });
    return n;
  }), []);

  const back = useCallback(() => setStepRaw((s) => {
    const n = Math.max(s - 1, 0);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, left: 0 });
    return n;
  }), []);

  const update = useCallback(
    (partial: Partial<FunnelData>) => setData((d) => ({ ...d, ...partial })),
    [],
  );

  const profile = useMemo(() => resolveNiche(data.niche), [data.niche]);

  const monthlyViews = useMemo(() => {
    const base = FOLLOWER_BUCKETS[Math.max(data.followers, 0)]?.monthlyViews ?? 8000;
    const postingFactor = [0.6, 1, 1.4, 1.9][Math.max(data.posting, 0)] ?? 1;
    return Math.round(base * postingFactor);
  }, [data.followers, data.posting]);

  const score = useMemo(() => {
    let s = 42;
    s += [0, 3, 6, 9, 11, 13][Math.max(data.followers, 0)] ?? 0;
    s += [0, 5, 9, 12][Math.max(data.posting, 0)] ?? 0;
    s += [10, 10, 8, 9, 4][Math.max(data.skill, 0)] ?? 0;
    s += [8, 6, 3][Math.max(data.camera, 0)] ?? 0;
    s += [2, 5, 8, 9][Math.max(data.hours, 0)] ?? 0;
    s += Math.round((data.readiness / 10) * 8);
    return Math.min(Math.max(s, 38), 96);
  }, [data]);

  const value: Ctx = {
    step,
    data,
    profile,
    monthlyViews,
    score,
    setStep,
    next,
    back,
    update,
  };

  return <FunnelContext.Provider value={value}>{children}</FunnelContext.Provider>;
}
