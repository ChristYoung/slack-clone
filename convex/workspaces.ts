import { getAuthUserId } from '@convex-dev/auth/server';
import { v } from 'convex/values';

import { mutation, query } from './_generated/server';

const generateJoinCode = () => {
  return Array.from(
    { length: 6 },
    () =>
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'[
        Math.floor(Math.random() * 62)
      ]
  ).join('');
};

export const join = mutation({
  args: {
    joinCode: v.string(),
    workSpaceId: v.id('workspaces'),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error('User not authenticated');
    }
    const workspace = await ctx.db.get(args.workSpaceId);
    if (!workspace || workspace.joinCode !== args.joinCode) {
      throw new Error('Invalid join code');
    }
    if (workspace.joinCode.toLowerCase() !== args.joinCode.toLowerCase()) {
      throw new Error('Invalid join code');
    }
    const existingMember = await ctx.db
      .query('members')
      .withIndex('by_user_id', (q) => q.eq('userId', userId))
      .collect();
    if (existingMember) {
      throw new Error('User already in a workspace');
    }
    await ctx.db.insert('members', {
      workspaceId: workspace._id,
      userId,
      role: 'member',
    });
    return workspace._id;
  },
});

export const newJoinCode = mutation({
  args: {
    workspaceId: v.id('workspaces'),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error('User not authenticated');
    }
    const member = await ctx.db
      .query('members')
      .withIndex('by_workspace_id_and_user_id', (q) =>
        q.eq('workspaceId', args.workspaceId).eq('userId', userId)
      )
      .unique();
    if (!member || member.role !== 'admin') {
      throw new Error('User not authenticated');
    }
    const joinCode = generateJoinCode();
    await ctx.db.patch(args.workspaceId, {
      joinCode,
    });
    return args.workspaceId;
  },
});

export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, { name }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error('User not authenticated');
    }
    const joinCode = generateJoinCode();
    const workspaceId = await ctx.db.insert('workspaces', {
      name,
      joinCode,
      userId,
    });

    // the user who created the workspace is an admin and member of the workspace
    await ctx.db.insert('members', {
      workspaceId,
      userId,
      role: 'admin',
    });

    await ctx.db.insert('channels', {
      workspaceId,
      name: 'General',
    });

    return workspaceId;
  },
});

export const get = query({
  args: {},
  handler: async (ctx) => {
    // Only return workspaces that the user is a member of
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error('User not authenticated');
    }

    // get all the members that the user is a part of
    const members = await ctx.db
      .query('members')
      .withIndex('by_user_id', (q) => q.eq('userId', userId))
      .collect();

    const workspaceIds = members.map((member) => member.workspaceId);
    const workspaces = [];
    for (const workspaceId of workspaceIds) {
      const workspace = await ctx.db.get(workspaceId);
      if (workspace) {
        workspaces.push(workspace);
      }
    }
    return workspaces;
  },
});

export const getWorkspaceById = query({
  args: {
    id: v.id('workspaces'),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error('User not authenticated');
    }
    const member = await ctx.db
      .query('members')
      .withIndex('by_workspace_id_and_user_id', (q) =>
        q.eq('workspaceId', args.id).eq('userId', userId)
      )
      .unique();
    // 判断当前登录的用户是否是当前工作区的成员
    if (!member) {
      return null;
    }
    return await ctx.db.get(args.id);
  },
});

export const update = mutation({
  args: {
    id: v.id('workspaces'),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error('User not authenticated');
    }
    const member = await ctx.db
      .query('members')
      .withIndex('by_workspace_id_and_user_id', (q) =>
        q.eq('workspaceId', args.id).eq('userId', userId)
      )
      .unique();
    // 判断当前登录的用户是否是当前工作区的成员
    if (!member || member.role !== 'admin') {
      throw new Error('User is not an admin of this workspace');
    }
    await ctx.db.patch(args.id, { name: args.name });
    return args.id;
  },
});

export const deleteWorkspace = mutation({
  args: {
    id: v.id('workspaces'),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error('User not authenticated');
    }
    const member = await ctx.db
      .query('members')
      .withIndex('by_workspace_id_and_user_id', (q) =>
        q.eq('workspaceId', args.id).eq('userId', userId)
      )
      .unique();
    // 判断当前登录的用户是否是当前工作区的成员
    if (!member || member.role !== 'admin') {
      throw new Error('User is not an admin of this workspace');
    }

    // delete all the members of the workspace
    const [members] = await Promise.all([
      ctx.db
        .query('members')
        .withIndex('by_workspace_id', (q) => q.eq('workspaceId', args.id))
        .collect(),
    ]);
    for (const member of members) {
      await ctx.db.delete(member._id);
    }

    await ctx.db.delete(args.id);
    return args.id;
  },
});
