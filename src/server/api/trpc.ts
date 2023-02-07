import superjson from "superjson";
import { initTRPC } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";

import { prisma } from "../db";
import { getUserByToken } from "../../utils/auth";

type CreateContextOptions = Record<string, never>;

// https://create.t3.gg/en/usage/trpc#-servertrpccontextts
export const createInnerTRPCContext = (_opts: CreateContextOptions) => {
  return {
    prisma,
  };
};

// https://trpc.io/docs/context
export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const authHeader = opts.req.headers.authorization;

  return {
    user: authHeader
      ? await getUserByToken(authHeader.replace("Bearer ", ""))
      : null,
    ...createInnerTRPCContext({}),
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

// https://trpc.io/docs/router
export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

export const privateProcedure = t.procedure.use(
  t.middleware(({ ctx, next }) => {
    const { user, prisma } = ctx;

    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "unauthorized",
      });
    }

    return next({
      ctx: {
        user,
        prisma,
      },
    });
  })
);
