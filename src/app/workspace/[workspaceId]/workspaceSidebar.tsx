import { AlertTriangle, Loader, MessageSquareText } from 'lucide-react';

import { useCurrentMemberApi } from '@/features/members/api/useCurrentMemberApi';
import { useGetWorkspaceByIdApi } from '@/features/workspaces/apis/useGetWorkspaceByIdApi';
import { useWorkSpaceId } from '@/hooks/useWorkSpaceId';

import { SideBarItem } from './sideBarItem';
import { WorkspaceHeader } from './workspaceHeader';

export interface WorkspaceSidebarProps {}

export const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = (props: WorkspaceSidebarProps) => {
  const workspaceId = useWorkSpaceId();
  const { data: currentMember, isLoading: isMembersLoading } = useCurrentMemberApi({ workspaceId });
  const { workspaceItem, isLoadingWorkspace } = useGetWorkspaceByIdApi({ id: workspaceId });
  if (isLoadingWorkspace || isMembersLoading) {
    return (
      <div className='flex flex-col bg-[#5E2C5F] h-full items-center justify-center'>
        <Loader className='size-5 animate-spin text-white' />
      </div>
    );
  }
  if (!workspaceItem || !currentMember) {
    return (
      <div className='flex flex-col gap-y-2 bg-[#5E2C5F] h-full items-center justify-center'>
        <AlertTriangle className='size-5 text-white' />
        <p className='text-white text-sm font-semibold'>Workspace not found</p>
      </div>
    );
  }
  return (
    <div className='__workspaceSidebar flex flex-col bg-[#5E2C5F] h-full'>
      <WorkspaceHeader
        workspaceItem={workspaceItem}
        isAdmin={currentMember.role === 'admin'}
      ></WorkspaceHeader>
      <div className='flex flex-col px-2 mt-3'>
        <SideBarItem
          label='Threads'
          icon={MessageSquareText}
          workspaceId={workspaceId}
          id='threads'
        />
      </div>
    </div>
  );
};
