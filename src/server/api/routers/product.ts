import { z } from "zod";
import { TRPCError } from "@trpc/server";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.product.findMany();
  }),
  getById: publicProcedure
    .input(z.object({ productId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { productId } = input;

      try {
        const product = await ctx.db.product.findUnique({
          where: { id: productId },
        });
        if (!product) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Producto no encontrado",
          });
        }
        return product;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `No se ha podido realizar: ${error as string}`,
        });
      }
    }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        price: z.number(),
        promotionId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name, description, price, promotionId } = input;
      try {
        const product = await ctx.db.product.create({
          data: {
            name,
            description,
            price,
            userId: ctx.session.user.id,
            promotionId,
          },
        });

        return product;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `No se ha podido realizar: ${error as string}`,
        });
      }
    }),
  update: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
        name: z.string(),
        description: z.string(),
        price: z.number(),
        promotionId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { productId, name, description, price, promotionId } = input;
      try {
        const product = await ctx.db.product.update({
          where: { id: productId },
          data: {
            name,
            description,
            price,
            promotionId,
          },
        });
        if (!product) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Producto no encontrado",
          });
        }

        return {
          success: true,
          message: "Producto actualizado correctamente",
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `No se ha podido realizar: ${error as string}`,
        });
      }
    }),
  delete: protectedProcedure
    .input(z.object({ productId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { productId } = input;
      try {
        const product = await ctx.db.product.delete({
          where: { id: productId },
        });
        if (!product) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Producto no encontrado",
          });
        }

        return {
          success: true,
          message: "Producto eliminado correctamente",
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `No se ha podido realizar: ${error as string}`,
        });
      }
    }),
});
