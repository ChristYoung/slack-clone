'use client';

import { useEffect, useMemo } from 'react';

import { UserBtn } from '@/features/auth/components/UserBtn';
import { useGetWorkspaces } from '@/features/workspaces/apis/useGetWorkspaces';

export default function Home() {
  const { isLoadingWorkspaces, workspaces } = useGetWorkspaces();
  const workspaceId = useMemo(() => {
    return workspaces?.[0]?._id;
  }, [workspaces]);

  useEffect(() => {
    if (isLoadingWorkspaces) {
      return;
    }
    if (!workspaceId) {
      // TODO: handle no workspace
      return;
    } else {
      // TODO: handle workspace
    }
  }, [workspaceId, isLoadingWorkspaces]);

  return (
    <div>
      <UserBtn></UserBtn>
    </div>
  );
}
