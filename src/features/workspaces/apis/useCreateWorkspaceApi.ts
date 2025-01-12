import { useMutation } from 'convex/react';
import { useCallback } from 'react';

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
  const mutation = useMutation(api.workspaces.create);
  const mutate = useCallback(
    async (requestBody: any, options?: Options) => {
      try {
        const response = await mutation(requestBody);
        options?.onSuccess?.(response);
      } catch (error) {
        options?.onError?.(error as Error);
      } finally {
        options?.onSettled?.();
      }
    },
    [mutation]
  );
  return { mutate };
};
