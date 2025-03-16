'use client';

import { DialogDescription } from '@radix-ui/react-dialog';
import { CopyIcon } from 'lucide-react';
import { toast, Toaster } from 'sonner';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useWorkSpaceId } from '@/hooks/useWorkSpaceId';

export interface InviteModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  name: string;
  joinCode?: string;
}

export const InviteModal: React.FC<InviteModalProps> = (props: InviteModalProps) => {
  const { open, setOpen, name, joinCode } = props;
  const workspaceId = useWorkSpaceId();
  const handleCopy = () => {
    const inviteLink = `${window.location.origin}/join/${workspaceId}`;
    navigator.clipboard.writeText(inviteLink).then(() => {
      toast.success('Link copied to clipboard');
    });
  };

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
          <Button variant={'ghost'} size='sm' onClick={handleCopy}>
            Copy Link
            <CopyIcon className='size-4 ml-2' />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
