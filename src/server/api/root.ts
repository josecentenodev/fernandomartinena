import { userRouter, artworkRouter, newRouter, productRouter } from "@/server/api/routers";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { bannersRouter } from "./routers/banners";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  users: userRouter,
  artworks: artworkRouter,
  posts: newRouter,
  products: productRouter,
  banners: bannersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
