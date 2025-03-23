import { useQuery } from 'convex/react';

import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';

export const useGetWorkspaceInfoByIdApi = ({ id }: { id: Id<'workspaces'> }) => {
  const workspaceItem = useQuery(api.workspaces.getWorkspaceInfoById, { id });
  const isLoadingWorkspace = workspaceItem === undefined;
  return { workspaceItem, isLoadingWorkspace };
};
