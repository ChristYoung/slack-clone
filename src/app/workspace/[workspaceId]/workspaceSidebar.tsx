import { useCurrentMemberApi } from '@/features/members/api/useCurrentMemberApi';
import { useGetWorkspaceByIdApi } from '@/features/workspaces/apis/useGetWorkspaceByIdApi';
import { useWorkSpaceId } from '@/hooks/useWorkSpaceId';

export interface WorkspaceSidebarProps {}

export const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = (props: WorkspaceSidebarProps) => {
  const workspaceId = useWorkSpaceId();
  const { data: currentMember, isLoading: isCurrentMemberLoading } = useCurrentMemberApi({ workspaceId });
  const { workspaceItem, isLoadingWorkspace } = useGetWorkspaceByIdApi({ id: workspaceId });
  return <div className='__workspaceSidebar'>workspaceSidebar component works!</div>;
};
