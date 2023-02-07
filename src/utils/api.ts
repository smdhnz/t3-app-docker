import superjson from "superjson";
import nookies from "nookies";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "../server/api/root";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

// Client side tRPC API
export const api = createTRPCNext<AppRouter>({
  config({ ctx }) {
    return {
      // https://trpc.io/docs/data-transformers
      transformer: superjson,

      // https://trpc.io/docs/links
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          headers: () => {
            const cookies = nookies.get(ctx);
            const token = cookies["token"];
            return { Authorization: token ?? "" };
          },
        }),
      ],
    };
  },

  // https://trpc.io/docs/nextjs#ssr-boolean-default-false
  ssr: false,
});

// example => type HelloInput = RouterInputs['example']['hello']
export type RouterInputs = inferRouterInputs<AppRouter>;

// example => type HelloOutput = RouterOutputs['example']['hello']
export type RouterOutputs = inferRouterOutputs<AppRouter>;
