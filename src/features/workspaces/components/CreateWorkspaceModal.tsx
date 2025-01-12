'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

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
      </DialogContent>
    </Dialog>
  );
};
