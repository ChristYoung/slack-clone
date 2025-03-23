'use client';

import { Loader, TriangleAlert } from 'lucide-react';
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

  if (isLoadingWorkspace || isLoadingChannels) {
    return (
      <div className='h-full flex items-center justify-center'>
        <Loader className='size-6 animate-spin text-foreground' />
      </div>
    );
  }

  if (!workspaceItem) {
    return (
      <div className='h-full flex items-center justify-center'>
        <TriangleAlert className='size-6 animate-spin text-foreground' />
        <span className='text-sm text-muted-foreground'>Workspace not found</span>
      </div>
    );
  }
  return null;
};

export default WorkSpaceIdPage;
