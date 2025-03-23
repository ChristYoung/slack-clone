import { useMutation } from 'convex/react';
import { useCallback, useMemo, useState } from 'react';

import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';

type Options = {
  onSuccess?: (data?: Id<'workspaces'>) => void;
  onError?: (error?: Error) => void;
  onSettled?: () => void;
};

type RequestProp = { workspaceId: Id<'workspaces'>; joinCode: string };

export const useJoinApi = () => {
  const [workSpaceId, setWorkSpaceId] = useState<Id<'workspaces'> | null>(null);
  const [status, setStatus] = useState<'settled' | 'pending' | 'success' | 'error' | null>(null);
  const isPending = useMemo(() => status === 'pending', [status]);
  const isSuccess = useMemo(() => status === 'success', [status]);
  const isError = useMemo(() => status === 'error', [status]);
  const settled = useMemo(() => status === 'settled', [status]);

  const mutation = useMutation(api.workspaces.join);
  const mutate = useCallback(
    async (requestBody: RequestProp, options?: Options) => {
      try {
        setStatus('pending');
        setWorkSpaceId(null);
        const response = await mutation(requestBody);
        setWorkSpaceId(response);
        setStatus('success');
        options?.onSuccess?.(response);
        return response;
      } catch (error) {
        setStatus('error');
        options?.onError?.(error as Error);
      } finally {
        setStatus('settled');
        options?.onSettled?.();
      }
    },
    [mutation]
  );
  return { mutate, workSpaceId, isPending, isSuccess, isError, settled };
};
