import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import { useCreateChannelModal } from '../store/useCreateChannelModal';

export interface CreateChannelModalProps {}

export const CreateChannelModal: React.FC<CreateChannelModalProps> = (
  props: CreateChannelModalProps
) => {
  const [open, setOpen] = useCreateChannelModal();
  const [channelName, setChannelName] = useState<string>();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, '-').toLowerCase();
    setChannelName(value);
  };
  const handClose = () => {
    setOpen(false);
    setChannelName('');
  };
  return (
    <Dialog open={open} onOpenChange={handClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Channel</DialogTitle>
        </DialogHeader>
        <form>
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
          <div className='flex justify-end mt-5'>
            <Button disabled={false}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
