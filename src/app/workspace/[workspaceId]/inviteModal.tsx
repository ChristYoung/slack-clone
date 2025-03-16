'use client';

import { DialogClose, DialogDescription } from '@radix-ui/react-dialog';
import { CopyIcon, RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useNewJoinCodeApi } from '@/features/workspaces/apis/useNewJoinCode';
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
  const { mutate, isPending } = useNewJoinCodeApi();
  const handleCopy = () => {
    const inviteLink = `${window.location.origin}/join/${workspaceId}`;
    navigator.clipboard.writeText(inviteLink).then(() => {
      toast.success('Link copied to clipboard');
    });
  };
  const handleGenerateNewJoinCode = () => {
    mutate(
      { workspaceId },
      {
        onSuccess: (data) => {
          toast.success('New join code generated successfully');
        },
        onError: (error) => {
          toast.error('Failed to generate new join code');
        },
      }
    );
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
        <div className='flex items-center justify-between w-full'>
          <Button disabled={isPending} onClick={handleGenerateNewJoinCode} variant={'outline'}>
            New Code <RefreshCcw />
          </Button>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
