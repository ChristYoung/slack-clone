'use client';

import { Loader, TriangleAlert } from 'lucide-react';

import { useGetChannelByIdApi } from '@/features/channels/apis/useGetChannelByIdApi';
import { useChannelId } from '@/hooks/useChannelId';

import { ChatInput } from './ChatInput';
import { Header } from './Header';

export interface PageProps {}

const ChannelIdPage: React.FC<PageProps> = (props: PageProps) => {
  const channelId = useChannelId();
  const { data: channel, isLoading: isChannelLoading } = useGetChannelByIdApi({ channelId });

  if (isChannelLoading) {
    return (
      <div className='h-full flex items-center justify-center'>
        <Loader className='size-6 animate-spin text-foreground' />
      </div>
    );
  }

  if (!channel) {
    return (
      <div className='h-full flex flex-col gap-y-2 items-center justify-center'>
        <TriangleAlert className='size-6 text-foreground' />
        <span className='text-sm text-muted-foreground'>Channel not found</span>
      </div>
    );
  }

  return (
    <div className='flex flex-col h-full'>
      <Header title={channel?.name} />
      <div className='flex-1'></div>
      <ChatInput />
    </div>
  );
};

export default ChannelIdPage;
