import { useQuery } from 'convex/react';

import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';

export interface UseGetChannelsProps {
  channelId: Id<'channels'>;
}

export const useGetChannelByIdApi = ({ channelId }: UseGetChannelsProps) => {
  const data = useQuery(api.channels.getChannelById, { channelId });
  const isLoading = data === undefined;
  return { data, isLoading };
};
