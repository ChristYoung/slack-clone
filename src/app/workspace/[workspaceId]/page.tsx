'use client';

import { useGetWorkspaceByIdApi } from '@/features/workspaces/apis/useGetWorkspaceByIdApi';
import { useWorkSpaceId } from '@/hooks/useWorkSpaceId';

const WorkSpaceIdPage: React.FC = () => {
  const workspaceId = useWorkSpaceId();
  const { workspaceItem, isLoadingWorkspace } = useGetWorkspaceByIdApi({ id: workspaceId });
  return <div className='__page'>WorkspaceItem: {JSON.stringify(workspaceItem)}</div>;
};

export default WorkSpaceIdPage;
