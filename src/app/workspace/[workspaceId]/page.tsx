'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';

import { useGetChannels } from '@/features/channels/apis/useGetChannels';
import { useCreateChannelModal } from '@/features/channels/store/useCreateChannelModal';
import { useGetWorkspaceByIdApi } from '@/features/workspaces/apis/useGetWorkspaceByIdApi';
import { useWorkSpaceId } from '@/hooks/useWorkSpaceId';

const WorkSpaceIdPage: React.FC = () => {
  const workspaceId = useWorkSpaceId();
  const router = useRouter();
  const [open, setOpen] = useCreateChannelModal();
  const { workspaceItem, isLoadingWorkspace } = useGetWorkspaceByIdApi({ id: workspaceId });
  const { data: channels, isLoading: isLoadingChannels } = useGetChannels({ workspaceId });

  const defaultChannelId = useMemo(() => channels?.[0]?._id, [channels]);

  useEffect(() => {
    if (isLoadingWorkspace || isLoadingChannels || !workspaceItem) return;
    if (defaultChannelId) {
      router.push(`/workspace/${workspaceId}/channel/${defaultChannelId}`);
    } else if (!open) {
      setOpen(true);
    }
  }, [
    defaultChannelId,
    isLoadingChannels,
    isLoadingWorkspace,
    open,
    router,
    setOpen,
    workspaceId,
    workspaceItem,
  ]);

  return <div className='__page'>WorkspaceItem</div>;
};

export default WorkSpaceIdPage;
