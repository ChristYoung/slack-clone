import { useMutation } from 'convex/react';
import { useCallback } from 'react';

import { api } from '../../../../convex/_generated/api';

type Options = {
  onSuccess?: () => void;
  onError?: (error?: unknown) => void;
  onSettled?: () => void;
};

export const useCreateWorkspaceApi = () => {
  const mutation = useMutation(api.workspaces.create);
  const mutate = useCallback(
    async (values: any, options?: Options) => {
      try {
        const response = await mutation(values);
        options?.onSuccess?.();
      } catch (error) {
        options?.onError?.(error);
      } finally {
        options?.onSettled?.();
      }
    },
    [mutation]
  );
  return { mutate };
};
