import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials"
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

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        name: session.user.name,
        email: session.user.email,
        userType: session.user.userType
      },
    }),
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [CredentialsProvider({
    name: 'Credentials',
    credentials: {
      email: { label: "Email", type: "email", placeholder: "fernandomartinena@gmail.com" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, _req) {

      const user = await db.user.findFirst({
        where: {
          email: credentials!.email ?? ''
        }
      })

      if(!user) throw new Error("Credenciales incorrectas");
      
      const isValidPassword = bcrypt.compareSync(
        credentials!.password,
        user.password
      );

      if (!isValidPassword)
        throw new Error("Credenciales incorrectas");

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType,
      }
    }
  })],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
