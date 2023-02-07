import type { GetServerSideProps } from "next";
import nookies from "nookies";

import { getUserByToken, createToken } from "../utils/auth";

export const privateRoute: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  const token = cookies["token"];

  const redirectData = {
    redirect: {
      permanent: false,
      destination: "/login",
    },
  };

  if (!token) return redirectData;

  const user = await getUserByToken(token);

  if (!user) return redirectData;

  const refreshedToken = createToken(user.id);

  nookies.set(ctx, "token", refreshedToken);

  return { props: {} };
};
