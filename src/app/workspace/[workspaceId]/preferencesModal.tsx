import { DialogClose, DialogTrigger } from '@radix-ui/react-dialog';
import { TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useDeleteWorkspaceApi } from '@/features/workspaces/apis/useDeleteWorkspaceApi';
import { useUpdateWorkspaceApi } from '@/features/workspaces/apis/useUpdateWorkspaceApi';
import { useConfirm } from '@/hooks/useConfirm';
import { useWorkSpaceId } from '@/hooks/useWorkSpaceId';

export interface PreferencesModalProps {
  openPreferences: boolean;
  setOpenPreferences: (open: boolean) => void;
  initialValue: string;
}

export const PreferencesModal: React.FC<PreferencesModalProps> = ({
  openPreferences,
  setOpenPreferences,
  initialValue,
}: PreferencesModalProps) => {
  const router = useRouter();
  const workspaceId = useWorkSpaceId();
  const [ConfirmDialog, confirm] = useConfirm({
    title: 'Are you sure?',
    message: 'This action cannot be undone.',
  });

  const [value, setValue] = useState(initialValue);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const { isPending: isUpdateWorkspacePending, mutate: updateWorkspace } = useUpdateWorkspaceApi();
  const { isPending: isDeleteWorkspacePending, mutate: deleteWorkspace } = useDeleteWorkspaceApi();

  const onDeleteWorkspace = async () => {
    const ok = await confirm();
    if (!ok) return;
    deleteWorkspace(
      { id: workspaceId },
      {
        onSuccess: () => {
          toast.success('Workspace deleted successfully');
          router.replace('/');
        },
        onError: (error) => {
          toast.error('Failed to delete workspace');
        },
      }
    );
  };

  const onUpdateWorkspaceSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateWorkspace(
      { name: value, id: workspaceId },
      {
        onSuccess: () => {
          setOpenEdit(false);
          toast.success('Workspace name updated successfully');
        },
        onError: (error) => {
          toast.error('Failed to update workspace name');
        },
      }
    );
  };

  return (
    <>
      <ConfirmDialog />
      <Dialog open={openPreferences} onOpenChange={setOpenPreferences}>
        <DialogContent className='p-0 bg-gray-50 overflow-hidden'>
          <DialogHeader className='p-4 border-b bg-white'>
            <DialogTitle>{value}</DialogTitle>
          </DialogHeader>
          <div className='px-4 pb-4 flex flex-col gap-y-2'>
            <Dialog open={openEdit} onOpenChange={setOpenEdit}>
              <DialogTrigger asChild>
                <div className='px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50'>
                  <div className='flex items-center justify-between'>
                    <p className='text-sm font-semibold'>Workspace name</p>
                    <p className='text-sm text-[#1264a3] hover:underline font-semibold'>Edit</p>
                  </div>
                  <p className='text-sm'>{value}</p>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Workspace Name</DialogTitle>
                </DialogHeader>
                <form className='space-y-4' onSubmit={onUpdateWorkspaceSubmit}>
                  <Input
                    value={value}
                    disabled={isUpdateWorkspacePending}
                    onChange={(e) => setValue(e.target.value)}
                    required
                    autoFocus
                    minLength={3}
                    maxLength={80}
                    placeholder='Workspace name'
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant={'outline'} disabled={isUpdateWorkspacePending}>
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button type='submit' disabled={isUpdateWorkspacePending}>
                      Save
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <Button
              type='button'
              disabled={isDeleteWorkspacePending}
              onClick={onDeleteWorkspace}
              className='flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-600'
            >
              <TrashIcon className='size-4' />
              <p className='text-sm font-semibold'>Delete Workspace</p>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
