import { useQuery } from 'convex/react';
import { useEffect, useState } from 'react';

import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';

export const useGetWorkspaceByIdApi = ({ id }: { id: Id<'workspaces'> }) => {
  const workspaceItem = useQuery(api.workspaces.getWorkspaceById, { id });
  const isLoadingWorkspace = workspaceItem === undefined;
  return { workspaceItem, isLoadingWorkspace };
};
