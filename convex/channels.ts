import { getAuthUserId } from '@convex-dev/auth/server';
import { v } from 'convex/values';

import { mutation, query } from './_generated/server';

export const get = query({
  args: {
    workspaceId: v.id('workspaces'),
  },
  handler: async (ctx) => {},
});
