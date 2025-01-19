import { AlertTriangle, Loader } from 'lucide-react';

import { useCurrentMemberApi } from '@/features/members/api/useCurrentMemberApi';
import { useGetWorkspaceByIdApi } from '@/features/workspaces/apis/useGetWorkspaceByIdApi';
import { useWorkSpaceId } from '@/hooks/useWorkSpaceId';

import { WorkspaceHeader } from './workspaceHeader';

export interface WorkspaceSidebarProps {}

export const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = (props: WorkspaceSidebarProps) => {
  const workspaceId = useWorkSpaceId();
  const { data: members, isLoading: isMembersLoading } = useCurrentMemberApi({ workspaceId });
  const { workspaceItem, isLoadingWorkspace } = useGetWorkspaceByIdApi({ id: workspaceId });
  if (isLoadingWorkspace || isMembersLoading) {
    return (
      <div className='flex flex-col bg-[#5E2C5F] h-full items-center justify-center'>
        <Loader className='size-5 animate-spin text-white' />
      </div>
    );
  }
  if (!workspaceItem || !members) {
    return (
      <div className='flex flex-col gap-y-2 bg-[#5E2C5F] h-full items-center justify-center'>
        <AlertTriangle className='size-5 text-white' />
        <p className='text-white text-sm font-semibold'>Workspace not found</p>
      </div>
    );
  }
  return (
    <div className='__workspaceSidebar flex flex-col bg-[#5E2C5F] h-full'>
      <WorkspaceHeader workspaceItem={workspaceItem}></WorkspaceHeader>
    </div>
  );
};
