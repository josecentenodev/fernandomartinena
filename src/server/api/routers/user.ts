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
});
