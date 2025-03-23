import { getAuthUserId } from '@convex-dev/auth/server';
import { v } from 'convex/values';

import { mutation, query } from './_generated/server';

export const create = mutation({
  args: {
    workspaceId: v.id('workspaces'),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error('Not authenticated');
    }
    // Ensure the user is a member of the workspace
    const member = await ctx.db
      .query('members')
      .withIndex('by_workspace_id_and_user_id', (q) =>
        q.eq('workspaceId', args.workspaceId).eq('userId', userId)
      )
      .unique();

    if (!member || member.role !== 'admin') {
      throw new Error('Not authorized');
    }

    const parsedChannelName = args.name.replace(/\s+/g, '-').toLowerCase();
    const channelId = await ctx.db.insert('channels', {
      workspaceId: args.workspaceId,
      name: parsedChannelName,
    });
    return channelId;
  },
});

export const get = query({
  args: {
    workspaceId: v.id('workspaces'),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error('Not authenticated');
    }

    // Ensure the user is a member of the workspace
    const member = await ctx.db
      .query('members')
      .withIndex('by_workspace_id_and_user_id', (q) =>
        q.eq('workspaceId', args.workspaceId).eq('userId', userId)
      )
      .unique();

    if (!member) {
      throw new Error('Not a member of the workspace');
    }

    const channels = await ctx.db
      .query('channels')
      .withIndex('by_workspace_id', (q) => q.eq('workspaceId', args.workspaceId))
      .collect();

    return channels;
  },
});

export const getChannelById = query({
  args: {
    channelId: v.id('channels'),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error('Not authenticated');
    }

    const channel = await ctx.db.get(args.channelId);

    if (!channel) {
      throw new Error('Channel not found');
    }

    // Ensure the user is a member of the workspace
    const member = await ctx.db
      .query('members')
      .withIndex('by_workspace_id_and_user_id', (q) =>
        q.eq('workspaceId', channel.workspaceId).eq('userId', userId)
      )
      .unique();

    if (!member) {
      throw new Error('Not a member of the workspace');
    }

    return channel;
  },
});
