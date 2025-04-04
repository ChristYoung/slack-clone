import { AlertTriangle, HashIcon, Loader, MessageSquareText, SendHorizonal } from 'lucide-react';

import { useGetChannels } from '@/features/channels/apis/useGetChannels';
import { useCreateChannelModal } from '@/features/channels/store/useCreateChannelModal';
import { useCurrentMemberApi } from '@/features/members/api/useCurrentMemberApi';
import { useGetMemberApi } from '@/features/members/api/useGetMemberApi';
import { useGetWorkspaceByIdApi } from '@/features/workspaces/apis/useGetWorkspaceByIdApi';
import { useChannelId } from '@/hooks/useChannelId';
import { useWorkSpaceId } from '@/hooks/useWorkSpaceId';

import { SideBarItem } from './sideBarItem';
import { UserItem } from './userItem';
import { WorkspaceHeader } from './workspaceHeader';
import { WorkspaceSection } from './workspaceSection';

export interface WorkspaceSidebarProps {}

export const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = (props: WorkspaceSidebarProps) => {
  const workspaceId = useWorkSpaceId();
  const channelId = useChannelId();
  const [_open, setOpenChannel] = useCreateChannelModal();
  const { data: currentMember, isLoading: isCurrentMembersLoading } = useCurrentMemberApi({
    workspaceId,
  });
  const { workspaceItem, isLoadingWorkspace } = useGetWorkspaceByIdApi({ id: workspaceId });
  const { data: channels, isLoading: isChannelsLoading } = useGetChannels({ workspaceId });
  const { data: members, isLoading: isMembersLoading } = useGetMemberApi({ workspaceId });

  if (isLoadingWorkspace || isCurrentMembersLoading) {
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
          variant={'default'}
        />
        <SideBarItem
          label='Drafts & Sent'
          icon={SendHorizonal}
          workspaceId={workspaceId}
          id='drafts'
          variant={'default'}
        />
      </div>
      <WorkspaceSection
        label='Channels'
        onNew={currentMember.role === 'admin' ? () => setOpenChannel(true) : undefined}
        hint='New Channel'
      >
        {channels?.map((c) => (
          <SideBarItem
            key={c._id}
            label={c.name}
            icon={HashIcon}
            workspaceId={workspaceId}
            id={c._id}
            variant={channelId === c._id ? 'active' : 'default'}
          />
        ))}
      </WorkspaceSection>
      <WorkspaceSection label='Direct messages' onNew={() => {}} hint='New DM'>
        {members?.map((m) => (
          <UserItem
            id={m._id}
            label={m?.user?.name}
            image={m.user.image}
            workspaceId={workspaceId}
            key={m._id}
          />
        ))}
      </WorkspaceSection>
    </div>
  );
};
