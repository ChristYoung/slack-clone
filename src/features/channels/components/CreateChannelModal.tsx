import { useState } from 'react';

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
        onSuccess: () => {
          handClose();
          // TODO: Redirect to the new channel
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
