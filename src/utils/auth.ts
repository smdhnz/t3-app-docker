import { verify, sign } from "jsonwebtoken";

import { prisma } from "../server/db";
import { env } from "../env.mjs";

type Token = {
  createdAt: number;
  userId: number;
};

export const timeoutCheck = (createdAt: number): boolean => {
  return Date.now() - createdAt > env.EFFECTIVE_DATETIME;
};

export const getUserByToken = async (token: string) => {
  const verifiedToken = verify(token, env.APP_SECRET) as Token;
  const isTimeout = timeoutCheck(verifiedToken.createdAt);
  const id = verifiedToken.userId;

  if (isTimeout) return null;

  return await prisma.user.findFirst({ where: { id } });
};

export const createToken = (userId: number) => {
  const createdAt = Date.now();
  return sign({ createdAt, userId }, env.APP_SECRET);
};
