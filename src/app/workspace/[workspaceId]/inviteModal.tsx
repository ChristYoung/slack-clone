'use client';

import { DialogDescription } from '@radix-ui/react-dialog';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export interface InviteModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  name: string;
  joinCode?: string;
}

export const InviteModal: React.FC<InviteModalProps> = (props: InviteModalProps) => {
  const { open, setOpen, name, joinCode } = props;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite to {name}</DialogTitle>
          <DialogDescription>
            Use the code below to invite people to your workspace
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col items-center justify-center py-10 gap-y-4'>
          <p className='text-4xl font-bold tracking-widest uppercase'>{joinCode}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
