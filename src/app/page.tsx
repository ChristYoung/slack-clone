'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';

import { UserBtn } from '@/features/auth/components/UserBtn';
import { useGetWorkspacesApi } from '@/features/workspaces/apis/useGetWorkspacesApi';

import { useCreateWorkspaceModal } from '../features/workspaces/store/workspaceModal.store';

export default function Home() {
  const router = useRouter();
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
      router.replace(`/workspace/${workspaceId}`);
    } else if (!openCreateWorkspaceModal) {
      // TODO: handle workspace
      setOpenCreateWorkspaceModal(true);
    }
  }, [workspaceId, isLoadingWorkspaces, openCreateWorkspaceModal, setOpenCreateWorkspaceModal, router]);

  return (
    <div>
      <UserBtn></UserBtn>
    </div>
  );
}
