import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import * as trpc from "@trpc/server";

export const artworkRouter = createTRPCRouter({
  // Create Artwork
  createArtwork: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string().optional(),
        imageUrl: z.string().url(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { title, description, imageUrl } = input;
      const userId = ctx.session.user.id;

      try {
        const artwork = await ctx.db.artwork.create({
          data: {
            title,
            description,
            imageUrl,
            userId,
          },
        });

        return artwork;
      } catch (error) {
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to create artwork: ${String(error)}`,
        });
      }
    }),

  // Get All Artworks
  getAllArtworks: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.db.artwork.findMany({
        include: {
          user: true,
        },
      });
    } catch (error) {
      throw new trpc.TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to fetch artworks: ${String(error)}`,
      });
    }
  }),

  // Get Artwork by ID
  getArtworkById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.artwork.findUnique({
          where: {
            id: input.id,
          },
          include: {
            user: true,
          },
        });
      } catch (error) {
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to fetch artwork by ID: ${String(error)}`,
        });
      }
    }),

  // Update Artwork
  updateArtwork: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        imageUrl: z.string().url().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, title, description, imageUrl } = input;
      const userId = ctx.session.user.id;

      try {
        const artwork = await ctx.db.artwork.findUnique({
          where: { id },
        });

        if (artwork?.userId !== userId) {
          throw new trpc.TRPCError({ code: "UNAUTHORIZED" });
        }

        const updatedArtwork = await ctx.db.artwork.update({
          where: { id },
          data: {
            title,
            description,
            imageUrl,
          },
        });

        return updatedArtwork;
      } catch (error) {
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to update artwork: ${String(error)}`,
        });
      }
    }),

  // Delete Artwork
  deleteArtwork: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const userId = ctx.session.user.id;

      try {
        const artwork = await ctx.db.artwork.findUnique({
          where: { id },
        });

        if (artwork?.userId !== userId) {
          throw new trpc.TRPCError({ code: "UNAUTHORIZED" });
        }

        await ctx.db.artwork.delete({
          where: { id },
        });

        return { success: true };
      } catch (error) {
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to delete artwork: ${String(error)}`,
        });
      }
    }),
});
