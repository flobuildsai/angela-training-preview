import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { freeAccess, freeOptin, type FreeAccess } from "@/utils/freeCourse.functions";
import { readAccess, writeAccess } from "@/lib/freeAccess";

/**
 * Zugang aus localStorage oder `?t=<token>` (E-Mail-Link). Liefert
 * `status: "none"`, wenn nichts gefunden wurde — die Seite leitet dann zu /free.
 * Optionaler Hand-off von milou.bio: ohne Token und ohne lokalen Zugang wird
 * über `email`/`firstName` der Zugang per freeOptin (idempotent) angelegt.
 */
export function useFreeAccess(tokenFromUrl?: string, handoff?: { email?: string; firstName?: string }) {
  const fetchAccess = useServerFn(freeAccess);
  const optIn = useServerFn(freeOptin);
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
        return;
      }
      if (handoff?.email) {
        const remote = await optIn({
          data: {
            firstName: handoff.firstName ?? "",
            email: handoff.email,
            utm: { source: "milou", medium: "store", campaign: "free-course" },
          },
        }).catch(() => null);
        if (cancelled) return;
        if (remote) {
          writeAccess(remote);
          setAccess(remote);
          setStatus("ok");
          return;
        }
      }
      setStatus("none");
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenFromUrl, handoff?.email, handoff?.firstName]);

  return { access, status };
}
