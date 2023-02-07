import { TRPCError } from "@trpc/server";
import { compare } from "bcryptjs";

import { createTRPCRouter, publicProcedure, privateProcedure } from "../trpc";
import { loginSchema, changePassSchema } from "../../../zodSchema";
import { createToken } from "../../../utils/auth";

export const userRouter = createTRPCRouter({
  login: publicProcedure.input(loginSchema).mutation(async ({ ctx, input }) => {
    const user = await ctx.prisma.user.findFirst({
      where: { username: input.username },
    });

    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "unauthorized",
      });
    }

    const isMatch = await compare(input.password, user.password);

    if (!isMatch) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "unauthorized",
      });
    }

    const token = createToken(user.id);
    return { token };
  }),

  current: privateProcedure.query(({ ctx }) => {
    const { password: _, ...user } = ctx.user;
    return user;
  }),

  changePass: privateProcedure
    .input(changePassSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.update({
        where: { id: ctx.user.id },
        data: { password: input.password },
      });

      return user;
    }),
});
