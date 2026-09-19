import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { FreeOptinForm } from "@/components/FreeOptinForm";

export function FreeOptinModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-[440px] gap-0 rounded-[24px] border-0 bg-pure-white p-8 shadow-xl data-[state=open]:slide-in-from-bottom-2 data-[state=closed]:slide-out-to-bottom-2">
        <DialogTitle className="pr-8 font-display text-[28px] font-medium leading-[1.15] tracking-[-0.02em]">Wohin dürfen wir deinen Zugang schicken?</DialogTitle>
        <DialogDescription className="mt-3 text-caption leading-relaxed text-slate">Vorname und E-Mail genügen. Keine Kreditkarte, kein Abo.</DialogDescription>
        <div className="mt-7"><FreeOptinForm placement="hero" cta="Kostenlosen Zugang holen" /></div>
      </DialogContent>
    </Dialog>
  );
}
