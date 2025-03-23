'use client';

import { Loader, TriangleAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';

import { useGetChannels } from '@/features/channels/apis/useGetChannels';
import { useCreateChannelModal } from '@/features/channels/store/useCreateChannelModal';
import { useCurrentMemberApi } from '@/features/members/api/useCurrentMemberApi';
import { useGetWorkspaceByIdApi } from '@/features/workspaces/apis/useGetWorkspaceByIdApi';
import { useWorkSpaceId } from '@/hooks/useWorkSpaceId';

const WorkSpaceIdPage: React.FC = () => {
  const workspaceId = useWorkSpaceId();
  const router = useRouter();
  const [open, setOpen] = useCreateChannelModal();
  const { data: member, isLoading: isLoadingMember } = useCurrentMemberApi({ workspaceId });
  const { workspaceItem, isLoadingWorkspace } = useGetWorkspaceByIdApi({ id: workspaceId });
  const { data: channels, isLoading: isLoadingChannels } = useGetChannels({ workspaceId });

  const defaultChannelId = useMemo(() => channels?.[0]?._id, [channels]);
  const isAdmin = useMemo(() => member?.role === 'admin', [member?.role]);

  useEffect(() => {
    if (isLoadingWorkspace || isLoadingChannels || !workspaceItem || !member || isLoadingMember)
      return;
    if (defaultChannelId) {
      router.push(`/workspace/${workspaceId}/channel/${defaultChannelId}`);
    } else if (!open && isAdmin) {
      setOpen(true);
    }
  }, [
    defaultChannelId,
    isLoadingChannels,
    isLoadingMember,
    isLoadingWorkspace,
    member,
    open,
    router,
    setOpen,
    workspaceId,
    workspaceItem,
    isAdmin,
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
        <TriangleAlert className='size-6 text-foreground' />
        <span className='text-sm text-muted-foreground'>Workspace not found</span>
      </div>
    );
  }
  return (
    <div className='h-full flex items-center justify-center'>
      <TriangleAlert className='size-6 text-foreground' />
      <span className='text-sm text-muted-foreground'>Channel not found</span>
    </div>
  );
};

export default WorkSpaceIdPage;
