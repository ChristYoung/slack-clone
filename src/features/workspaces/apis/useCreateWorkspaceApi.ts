import { useMutation } from 'convex/react';
import { useCallback, useState } from 'react';

import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';

type Options = {
  onSuccess?: (data?: Id<'workspaces'>) => void;
  onError?: (error?: Error) => void;
  onSettled?: () => void;
};

type RequestProp = { name: string; description?: string };

// TODO: add more fields

export const useCreateWorkspaceApi = () => {
  const [workSpaceId, setWorkSpaceId] = useState<Id<'workspaces'> | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [settled, setIsSettled] = useState(false);

  const mutation = useMutation(api.workspaces.create);
  const mutate = useCallback(
    async (requestBody: any, options?: Options) => {
      try {
        setIsPending(true);
        setIsError(false);
        setIsSuccess(false);
        setIsSettled(false);
        setError(null);
        setWorkSpaceId(null);

        const response = await mutation(requestBody);
        setWorkSpaceId(response);
        setIsSuccess(true);
        options?.onSuccess?.(response);
        return response;
      } catch (error) {
        setError(error as Error);
        setIsError(true);
        options?.onError?.(error as Error);
      } finally {
        setIsPending(false);
        setIsSettled(true);
        options?.onSettled?.();
      }
    },
    [mutation]
  );
  return { mutate, workSpaceId, error, isPending, isSuccess, isError, settled };
};
