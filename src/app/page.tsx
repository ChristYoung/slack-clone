'use client';

import { useEffect, useMemo } from 'react';

import { UserBtn } from '@/features/auth/components/UserBtn';
import { useGetWorkspacesApi } from '@/features/workspaces/apis/useGetWorkspacesApi';

import { useCreateWorkspaceModal } from '../features/workspaces/store/workspaceModal.store';

export default function Home() {
  const { isLoadingWorkspaces, workspaces } = useGetWorkspacesApi();
  const [openCreateWorkspaceModal, setOpenCreateWorkspaceModal] = useCreateWorkspaceModal();
  const workspaceId = useMemo(() => {
    return workspaces?.[0]?._id;
  }, [workspaces]);

  useEffect(() => {
    if (isLoadingWorkspaces) {
      return;
    }
    if (workspaceId) {
      // TODO: handle no workspace
      return;
    } else if (!openCreateWorkspaceModal) {
      // TODO: handle workspace
      setOpenCreateWorkspaceModal(true);
    }
  }, [workspaceId, isLoadingWorkspaces, openCreateWorkspaceModal, setOpenCreateWorkspaceModal]);

  return (
    <div>
      <UserBtn></UserBtn>
    </div>
  );
}
