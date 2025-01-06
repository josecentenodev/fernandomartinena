import { z } from "zod";
import bcrypt from 'bcrypt'

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  registrar: publicProcedure
  .input(
    z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const { name, email, password } = input;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const usuarioExistente = await ctx.db.user.findUnique({
        where: {
          email: email,
        },
      });

      if (usuarioExistente) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Ya se ha registrado un usuario con este e-mail.",
        });
      }

      const user = await ctx.db.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      return {
        ...user,
        password: undefined,
      };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `No se ha podido realizar: ${error as string}`,
      });
    }
  }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.user.findMany();
    return users;
  }),
  getById: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    const { id } = input;

    try {
      const user = await ctx.db.user.findUnique({
        where: {
          id: id,
        },
      });
  
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Usuario no encontrado.",
        });
      }
  
      return user;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `No se ha podido realizar: ${error as string}`,
      });
    }
  }),
  update: protectedProcedure.input(z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    city: z.string().optional(),
    country: z.string().optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
    postalCode: z.string().optional(),
  })).mutation(async ({ ctx, input }) => {
    const { id, name, email } = input;

    const isAuthorized = ctx.session.user.id === id || ctx.session.user.userType === 'ADMIN';

    if (!isAuthorized) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "No tienes permisos para realizar esta acción.",
      });
    }
  
    try {
      
      const user = await ctx.db.user.update({
        where: {
          id: id,
        },
        data: {
          name,
          email,
        },
      });

      return user;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `No se ha podido realizar: ${error as string}`,
      });
    }
  }),
});
