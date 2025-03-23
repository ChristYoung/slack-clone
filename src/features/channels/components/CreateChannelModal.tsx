import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useWorkSpaceId } from '@/hooks/useWorkSpaceId';

import { useCreateChannelApi } from '../apis/useCreateChannelApi';
import { useCreateChannelModal } from '../store/useCreateChannelModal';

export interface CreateChannelModalProps {}

export const CreateChannelModal: React.FC<CreateChannelModalProps> = (
  props: CreateChannelModalProps
) => {
  const workspaceId = useWorkSpaceId();
  const router = useRouter();
  const [open, setOpen] = useCreateChannelModal();
  const [channelName, setChannelName] = useState<string>();
  const { mutate, isPending } = useCreateChannelApi();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, '-').toLowerCase();
    setChannelName(value);
  };
  const handClose = () => {
    setOpen(false);
    setChannelName('');
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!channelName) return;
    await mutate(
      { name: channelName, workspaceId },
      {
        onSuccess: (channelId) => {
          toast.success('Channel created successfully');
          router.push(`/workspace/${workspaceId}/channel/${channelId}`);
          handClose();
        },
      }
    );
  };
  return (
    <Dialog open={open} onOpenChange={handClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Channel</DialogTitle>
        </DialogHeader>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <Input
            value={channelName}
            disabled={false}
            onChange={handleChange}
            required
            autoFocus
            minLength={3}
            placeholder='Channel Name'
            maxLength={100}
          />
          <div className='flex justify-end'>
            <Button disabled={isPending}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
