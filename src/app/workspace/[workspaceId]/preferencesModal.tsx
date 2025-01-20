import { TrashIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useDeleteWorkspaceApi } from '@/features/workspaces/apis/useDeleteWorkspaceApi';
import { useUpdateWorkspaceApi } from '@/features/workspaces/apis/useUpdateWorkspaceApi';

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
  const [value, setValue] = useState(initialValue);
  const { isPending: isUpdateWorkspacePending } = useUpdateWorkspaceApi();
  const { isPending: isDeleteWorkspacePending } = useDeleteWorkspaceApi();

  return (
    <Dialog open={openPreferences} onOpenChange={setOpenPreferences}>
      <DialogContent className='p-0 bg-gray-50 overflow-hidden'>
        <DialogHeader className='p-4 border-b bg-white'>
          <DialogTitle>{value}</DialogTitle>
        </DialogHeader>
        <div className='px-4 pb-4 flex flex-col gap-y-2'>
          <div className='px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50'>
            <div className='flex items-center justify-between'>
              <p className='text-sm font-semibold'>Workspace name</p>
              <p className='text-sm text-[#1264a3] hover:underline font-semibold'>Edit</p>
            </div>
            <p className='text-sm'>{value}</p>
          </div>
          <Button
            type='button'
            disabled={false}
            className='flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-600'
          >
            <TrashIcon className='size-4' />
            <p className='text-sm font-semibold'>Delete Workspace</p>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
