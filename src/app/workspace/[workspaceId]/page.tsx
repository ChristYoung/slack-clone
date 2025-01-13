'use client';

import { useWorkSpaceId } from '@/hooks/useWorkSpaceId';

const WorkSpaceIdPage: React.FC = () => {
  const workspaceId = useWorkSpaceId();
  return <div className='__page'>ID: {workspaceId}</div>;
};

export default WorkSpaceIdPage;
