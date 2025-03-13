import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import * as trpc from "@trpc/server";
import { BannerCategory } from "@prisma/client";

export const bannersRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const banners = await ctx.db.bannerImage.findMany();
    return banners;
  }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string().optional(),
        imageUrl: z.string(),
        category: z.nativeEnum(BannerCategory),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const banner = await ctx.db.bannerImage.create({
        data: {
          title: input.title,
          description: input.description,
          imageUrl: input.imageUrl,
          category: input.category,
        },
      });
      return banner;
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string().optional(),
        category: z.enum([
          "ARTWORKS",
          "SERVICES",
          "PRODUCTS",
          "EVENTS",
          "NEWS",
          "CUSTOM",
        ]),
        imageUrl: z.string().url(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.bannerImage.update({
        where: { id },
        data,
      });
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.bannerImage.delete({
        where: { id: input.id },
      });
    }),
});
