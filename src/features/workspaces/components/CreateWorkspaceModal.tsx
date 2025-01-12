'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import { useCreateWorkspaceModal } from '../store/workspaceModal.store';

export interface CreateWorkspaceModalProps {}

export const CreateWorkspaceModal: React.FC<CreateWorkspaceModalProps> = (props: CreateWorkspaceModalProps) => {
  const [open, setOpen] = useCreateWorkspaceModal();
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new workspace</DialogTitle>
        </DialogHeader>
        <form className='space-y-4'>
          <Input disabled={false} value={''} required autoFocus minLength={3} placeholder='Workspace name' />
          <div className='flex justify-end'>
            <Button type='submit'>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
