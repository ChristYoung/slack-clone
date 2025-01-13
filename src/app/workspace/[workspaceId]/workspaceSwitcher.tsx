'use client';

import { Loader, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCreateWorkspaceApi } from '@/features/workspaces/apis/useCreateWorkspaceApi';
import { useGetWorkspaceByIdApi } from '@/features/workspaces/apis/useGetWorkspaceByIdApi';
import { useGetWorkspacesApi } from '@/features/workspaces/apis/useGetWorkspacesApi';
import { useCreateWorkspaceModal } from '@/features/workspaces/store/workspaceModal.store';
import { useWorkSpaceId } from '@/hooks/useWorkSpaceId';

export interface WorkspaceSwitcherProps {}

const WorkspaceSwitcher: React.FC<WorkspaceSwitcherProps> = (props: WorkspaceSwitcherProps) => {
  const router = useRouter();
  const workspaceId = useWorkSpaceId();
  const [_open, setOpen] = useCreateWorkspaceModal();
  const { workspaceItem, isLoadingWorkspace } = useGetWorkspaceByIdApi({ id: workspaceId });
  const { workspaces, isLoadingWorkspaces } = useGetWorkspacesApi();
  const filteredWorkspaces = workspaces?.filter((workspace) => workspace._id !== workspaceId);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 text-slate-800 font-semibold text-xl'>
          {isLoadingWorkspace ? (
            <Loader className='size-5 animate-spin shrink-0' />
          ) : (
            workspaceItem?.name?.charAt(0)?.toUpperCase()
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side='bottom' align='start' className='w-64'>
        <DropdownMenuItem
          onClick={() => {
            router.push(`/workspace/${workspaceId}`);
          }}
          className='__DropdownMenuItem cursor-pointer flex-col justify-start items-start capitalize'
        >
          {workspaceItem?.name}
          <span className='text-xs text-muted-foreground'>Active Workspace</span>
        </DropdownMenuItem>
        {filteredWorkspaces?.map((w) => {
          return (
            <DropdownMenuItem
              key={w._id}
              onClick={() => {
                router.push(`/workspace/${w._id}`);
              }}
              className='__DropdownMenuItem cursor-pointer justify-start items-center capitalize overflow-hidden truncate'
            >
              <div className='size-9 shrink-0 relative mr-2 overflow-hidden bg-[#616061] text-white font-semibold text-lg rounded-md flex items-center justify-center'>
                {w?.name?.charAt(0)?.toUpperCase()}
              </div>
              <p className='truncate'>{w.name}</p>
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuItem
          onClick={() => {
            setOpen(true);
          }}
          className='__DropdownMenuItem cursor-pointer'
        >
          <div className='size-9 relative mr-2 overflow-hidden bg-[#F2F2F2] text-slate-800 font-semibold text-lg rounded-md flex items-center justify-center'>
            <Plus />
          </div>
          Create a new workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WorkspaceSwitcher;
