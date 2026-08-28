import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { freeAccess, type FreeAccess } from "@/utils/freeCourse.functions";
import { readAccess, writeAccess } from "@/lib/freeAccess";

/**
 * Zugang aus localStorage oder `?t=<token>` (E-Mail-Link). Liefert
 * `status: "none"`, wenn nichts gefunden wurde — die Seite leitet dann zu /free.
 */
export function useFreeAccess(tokenFromUrl?: string) {
  const fetchAccess = useServerFn(freeAccess);
  const [access, setAccess] = useState<FreeAccess | null>(null);
  const [status, setStatus] = useState<"loading" | "ok" | "none">("loading");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (tokenFromUrl) {
        const remote = await fetchAccess({ data: { token: tokenFromUrl } }).catch(() => null);
        if (cancelled) return;
        if (remote) {
          writeAccess(remote);
          setAccess(remote);
          setStatus("ok");
          return;
        }
      }
      const local = readAccess();
      if (cancelled) return;
      if (local) {
        setAccess(local);
        setStatus("ok");
      } else {
        setStatus("none");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [tokenFromUrl, fetchAccess]);

  return { access, status };
}
