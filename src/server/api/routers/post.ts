import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { db } from "@/server/db";
import { TRPCError } from "@trpc/server";

export const newRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.post.findMany();

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
});
