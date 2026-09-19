import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function StickyCTA({ label, targetId, onClick }: { label: string; targetId: string; onClick?: () => void }) {
  const [targetVisible, setTargetVisible] = useState(false);
  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => setTargetVisible(Boolean(entry?.isIntersecting)), { threshold: 0.1 });
    observer.observe(target);
    return () => observer.disconnect();
  }, [targetId]);
  if (targetVisible) return null;
  return <div className="fixed inset-x-0 bottom-0 z-40 border-t border-fog bg-cream-paper/95 p-3 backdrop-blur sm:hidden"><Button className="w-full" onClick={onClick ?? (() => document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" }))}>{label}</Button></div>;
}