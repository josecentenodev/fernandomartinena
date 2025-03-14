import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const newRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.post.findMany({
      orderBy: {  createdAt: "desc" },
    });

    return {
      posts: posts,
    };
  }),
  getById: publicProcedure
    .input(
      z.object({
        postId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { postId } = input;

      try {
        const post = await ctx.db.post.findFirst({
          where: {
            id: postId,
          },
        });
        if (!post) {
          return {
            message: "Post not found",
            error: true,
            post: null,
          };
        }

        return {
          post: post,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `There was a problem in the server: ${error as string}`,
        });
      }
    }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        imageUrl: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { title, content, imageUrl } = input;

        const post = await ctx.db.post.create({
          data: {
            title,
            content,
            imageUrl,
            authorId: ctx.session.user.id,
          },
        });

        return {
          post: post,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `There was a problem in the server: ${error as string}`,
        });
      }
    }),

  update: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
        title: z.string(),
        content: z.string(),
        imageUrl: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { postId, title, content, imageUrl } = input;

        const post = await ctx.db.post.update({
          where: {
            id: postId,
          },
          data: {
            title,
            content,
            imageUrl,
          },
        });

        return {
          post: post,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `There was a problem in the server: ${error as string}`,
        });
      }
    }),

  delete: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { postId } = input;

        const post = await ctx.db.post.delete({
          where: {
            id: postId,
          },
        });

        return {
          post: post,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `There was a problem in the server: ${error as string}`,
        });
      }
      }),
  getCount: publicProcedure.query(async ({ ctx }) => {
    try {
      const count = await ctx.db.post.count();
      return count;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to get post count: ${String(error)}`,
      });
    }
  }),
});
