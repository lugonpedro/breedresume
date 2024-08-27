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
  description?: string;
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[90vw]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {content}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}
