import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import * as trpc from "@trpc/server";

export const messageRouter = createTRPCRouter({
  send: publicProcedure
    .input(
      z.object({
        name: z.string().min(2),
        email: z.string().email(),
        subject: z.string().min(3),
        message: z.string().min(10),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const message = await ctx.db.message.create({
          data: {
            ...input,
            userId: ctx.session?.user?.id ?? "default-user-id",
          },
        });
        return message;
      } catch (error) {
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to send message: ${String(error)}`,
        });
      }
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      const messages = await ctx.db.message.findMany({
        orderBy: { createdAt: "desc" },
        where: { userId: ctx.session.user.id },
      });
      return messages;
    } catch (error) {
      throw new trpc.TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to fetch messages: ${String(error)}`,
      });
    }
  }),

  markAsRead: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const message = await ctx.db.message.update({
          where: {
            id: input.id,
            userId: ctx.session.user.id,
          },
          data: { status: "READ" },
        });
        return message;
      } catch (error) {
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to mark message as read: ${String(error)}`,
        });
      }
    }),

  archive: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const message = await ctx.db.message.update({
          where: {
            id: input.id,
            userId: ctx.session.user.id,
          },
          data: { status: "ARCHIVED" },
        });
        return message;
      } catch (error) {
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to archive message: ${String(error)}`,
        });
      }
    }),

  getUnreadCount: protectedProcedure.query(async ({ ctx }) => {
    try {
      const count = await ctx.db.message.count({
        where: {
          status: "UNREAD",
          userId: ctx.session.user.id,
        },
      });
      return count;
    } catch (error) {
      throw new trpc.TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to get unread count: ${String(error)}`,
      });
    }
  }),
});
