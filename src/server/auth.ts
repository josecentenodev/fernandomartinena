import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { env } from "@/env";
import { type Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/server/db";
import bcrypt from "bcrypt";
import { type UserType } from "@prisma/client";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;
      userType: UserType;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name: string;
    email: string;
    imageUrl: string | null;
    userType: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt: async ({ token, user }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.userType = user.userType;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.name = token.name!;
      session.user.email = token.email!;
      session.user.userType = token.userType as UserType;
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "fernandomartinena@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _req) {
        const user = await db.user.findFirst({
          where: {
            email: credentials!.email ?? "",
          },
        });

        if (!user) throw new Error("Credenciales incorrectas");

        const isValidPassword = bcrypt.compareSync(
          credentials!.password,
          user.password,
        );

        if (!isValidPassword) throw new Error("Credenciales incorrectas");


        return {
          id: user.id,
          name: user.name ?? "",
          email: user.email ?? "",
          imageUrl: user.imageUrl,
          userType: user.userType,
        };
      },
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
