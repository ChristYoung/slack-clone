'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import { useCreateWorkspaceApi } from '../apis/useCreateWorkspaceApi';
import { useCreateWorkspaceModal } from '../store/workspaceModal.store';

export interface CreateWorkspaceModalProps {}

export const CreateWorkspaceModal: React.FC<CreateWorkspaceModalProps> = (props: CreateWorkspaceModalProps) => {
  const router = useRouter();
  const [open, setOpen] = useCreateWorkspaceModal();
  const { mutate, isPending, workSpaceId } = useCreateWorkspaceApi();
  const [workSpaceName, setWorkSpaceName] = useState('');
  const handleClose = () => {
    setOpen(false);
    setWorkSpaceName('');
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      {
        name: workSpaceName,
      },
      {
        onSuccess: (id) => {
          // redirect to the workspace Id
          router.push(`/workspace/${id}`);
          handleClose();
        },
        onError: (error) => {
          // Show error toast
        },
        onSettled: () => {
          // Reset Form
        },
      }
    );
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new workspace</DialogTitle>
        </DialogHeader>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <Input
            disabled={isPending}
            value={workSpaceName}
            onChange={(e) => setWorkSpaceName(e.target.value)}
            required
            autoFocus
            minLength={3}
            placeholder='Workspace name'
          />
          <div className='flex justify-end'>
            <Button type='submit' disabled={isPending}>
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
