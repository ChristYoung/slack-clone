'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export interface InviteModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const InviteModal: React.FC<InviteModalProps> = (props: InviteModalProps) => {
  const { open, setOpen } = props;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite to workspace</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
