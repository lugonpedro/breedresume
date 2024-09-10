import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  setOpen: (bool: boolean) => void;
  title: string;
  description: string;
  content: ReactNode;
  footer?: ReactNode;
}

export function Modal({
  open,
  setOpen,
  title,
  description,
  content,
  footer,
}: ModalProps) {
  return (
    <>
      {open && (
        <div className="bg-black/80 absolute w-screen h-screen top-0 left-0 z-50"></div>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[90vw] text-primary">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription className="text-secondary-foreground">
              {description}
            </DialogDescription>
          </DialogHeader>
          {content}
          {footer && <DialogFooter>{footer}</DialogFooter>}
        </DialogContent>
      </Dialog>
    </>
  );
}
